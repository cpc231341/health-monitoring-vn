import { useCallback, useMemo, useState } from 'react';
import { useDemo } from './demo.jsx';
import { useMeasureDays } from './medidas.js';
import { useWorkouts } from './training.js';
import { useT } from '../i18n/index.jsx';
import { CREW } from '../data/crew.js';
import { RING } from '../data/capitao.js';
import { ENVIRONMENTS, SCENARIOS } from '../data/hoje.js';
import { compute } from '../pages/Hoje.jsx';
import { crewSummary, escalations, readiness, worstStatus } from '../../shared/rules/captain.js';
import { teamProgress } from '../../shared/rules/achievements.js';
import { toDateStr } from '../../shared/rules/training.js';

// "Marcar como acompanhado": o capitão dispensa uma escalação já tratada. Fica só neste computador.
const ACK = 'vn.captain.ack';
const ST = { ok: 'normal', warn: 'warning', crit: 'critical' };

function readAck() {
  try { return JSON.parse(localStorage.getItem(ACK) || '[]') || []; } catch (e) { return []; }
}

/** Fila de decisão do capitão (RN04): escalações ainda não acompanhadas. Só estado, nunca valores. */
export function useEscalations() {
  const days = useMeasureDays();
  const [acked, setAcked] = useState(readAck);
  const queue = useMemo(() => escalations(days, CREW.map((c) => c.key)).filter((e) => !acked.includes(e.id)), [days, acked]);
  const ack = useCallback((id) => {
    setAcked((a) => {
      const next = a.includes(id) ? a : [...a, id];
      try { localStorage.setItem(ACK, JSON.stringify(next)); } catch (e) { /* sem armazenamento */ }
      return next;
    });
  }, []);
  return { queue, ack };
}

/** Tudo do painel do capitão: resumo por tripulante, prontidão e fila de decisão. */
export function useCaptain() {
  const i18n = useT();
  const { scen, env } = useDemo();
  const days = useMeasureDays();
  const { workouts } = useWorkouts();
  const { queue, ack } = useEscalations();
  const today = toDateStr();

  return useMemo(() => {
    // O anel do Cristiano segue o cenário do modo demonstração; o dos outros vem de data/capitao.js.
    const R = compute(SCENARIOS[scen], ENVIRONMENTS[env], i18n);
    const mine = worstStatus(Object.values(R).map((r) => ST[r.st]));
    const ring = { ...RING, [CREW[0].key]: { ...RING[CREW[0].key], status: mine } };
    const summaries = crewSummary({ days, workouts, crewKeys: CREW.map((c) => c.key), today, ring });
    return { summaries, ready: readiness(summaries), team: teamProgress(days, workouts, CREW.length, today), queue, ack };
    // i18n só muda o texto; compute usa-o para montar R
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, workouts, queue, ack, scen, env, today]);
}
