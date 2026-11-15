import { useCallback, useEffect, useMemo, useState } from 'react';
import { CARDAPIO } from '../data/cardapio.js';
import { TEAM } from '../data/crew.js';
import { useDemo } from './demo.jsx';
import { withMockFood } from './mock.js';
import { useMissionClock } from './clock.jsx';
import {
  NOTIFY_CODES,
  categoryStock,
  consumption,
  createLog,
  dayCounters,
  evaluateLog,
  mealNotices,
  remainingStock,
  teamDessertsLow,
  validateLog
} from '../../shared/rules/food.js';

// Alimentação: usa a API do Electron (food.json) quando existe; no navegador (testes, demonstração)
// guarda tudo no localStorage. O detalhe é pessoal; o estoque do time usa só totais por item, sem nomes.
const KEY = 'vn.food';
const api = () => (typeof window !== 'undefined' ? window.api : undefined);

function readLocal() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
}
function writeLocal(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; }
}

// Migração única: registros que já estavam no localStorage passam para o food.json.
async function migrate() {
  const local = readLocal();
  if (!api()?.saveFood || local.length === 0) return;
  for (const log of local) await api().saveFood(log);
  try { localStorage.removeItem(KEY); } catch (e) { /* sem armazenamento */ }
}

export async function listFood(tripulante) {
  if (api()?.listFood) { await migrate(); return withMockFood(await api().listFood(tripulante), tripulante); }
  return withMockFood(readLocal().filter((l) => l.tripulante === tripulante), tripulante);
}

/** Porções consumidas por item, somando todo o time (sem nomes). */
export async function teamConsumption() {
  if (api()?.teamStock) return api().teamStock();
  return consumption(readLocal());
}

export async function saveFood(log) {
  const { valid, errors } = validateLog(log);
  if (!valid) return { success: false, errors };
  if (api()?.saveFood) return api().saveFood(log);
  return { success: writeLocal([...readLocal(), { ...log, timestamp: new Date().toISOString() }]) };
}

export async function deleteFood(tripulante, id) {
  if (api()?.deleteFood) return api().deleteFood(tripulante, id);
  return { success: writeLocal(readLocal().filter((l) => !(l.id === id && l.tripulante === tripulante))) };
}

const pseudoLog = (used) => ({ itens: Object.entries(used).map(([itemId, porcoes]) => ({ itemId, porcoes })) });

/** Estoque do time (porções restantes por item) a partir do consumo total. */
export function useTeamStock() {
  const [used, setUsed] = useState({});
  const reload = useCallback(() => teamConsumption().then((u) => setUsed(u || {})).catch(() => {}), []);
  useEffect(() => { reload(); }, [reload]);
  return { used, reload, stock: useMemo(() => remainingStock(CARDAPIO, [pseudoLog(used)]), [used]) };
}

/** Registros do tripulante, contadores do dia, avisos e estoque do time. */
export function useFood(tripulante) {
  const { fase } = useDemo();
  const { time } = useMissionClock();
  const [logs, setLogs] = useState([]);
  const { used, reload: reloadStock } = useTeamStock();
  const reload = useCallback(() => {
    listFood(tripulante).then((l) => setLogs(l || [])).catch(() => {});
    reloadStock();
  }, [tripulante, reloadStock]);
  useEffect(() => { reload(); }, [reload]);

  const stockLogs = useMemo(() => [pseudoLog(used)], [used]);
  const today = useMemo(() => logs.filter((l) => l.diaMissao === TEAM.day), [logs]);
  const counters = useMemo(() => dayCounters(logs, CARDAPIO, { tripulante, diaMissao: TEAM.day }), [logs, tripulante]);

  // Avisos de um registro que ainda vai ser salvo (contadores de antes dele).
  const evaluate = useCallback(
    (itens, meal) => evaluateLog(itens, fase, counters, { catalog: CARDAPIO, logs: stockLogs, myLogs: logs, tripulante, diaMissao: TEAM.day, meal }),
    [fase, counters, stockLogs, logs, tripulante]
  );
  const noticesFor = useCallback(
    (meal) => mealNotices(meal, fase, { myLogs: logs, tripulante, diaMissao: TEAM.day }),
    [fase, counters, stockLogs, logs, tripulante]
  );

  const save = useCallback(async ({ refeicao, itens, nota = '' }) => {
    const avisos = evaluate(itens, refeicao);
    const log = createLog({ tripulante, diaMissao: TEAM.day, hora: time, refeicao, fase, itens, nota, avisos });
    const res = await saveFood(log);
    if (res?.success) reload();
    return { ...res, avisos };
  }, [evaluate, tripulante, time, fase, reload]);

  const remove = useCallback(async (id) => { await deleteFood(tripulante, id); reload(); }, [tripulante, reload]);

  // Avisos que viram notificação: os do próprio dia (só do tripulante) e o de estoque coletivo (de todos).
  const alerts = useMemo(() => {
    const out = [];
    const seen = new Set();
    for (const l of today) {
      for (const w of l.avisos || []) {
        if (NOTIFY_CODES.includes(w.code) && w.code !== 'team-stock-low' && !seen.has(w.code)) { seen.add(w.code); out.push({ id: `food-${w.code}`, ...w }); }
      }
    }
    if (teamDessertsLow(CARDAPIO, stockLogs)) out.push({ id: 'food-team-stock-low', code: 'team-stock-low', level: 'warning', params: {} });
    return out;
  }, [today, stockLogs]);

  return { logs, today, counters, evaluate, noticesFor, save, remove, reload, alerts, stock: useMemo(() => remainingStock(CARDAPIO, stockLogs), [stockLogs]), stockLogs, fase };
}

/** Estoque coletivo por categoria (porções restantes e iniciais), sem nomes de pessoas. */
export function useTeamStockSummary() {
  const { used } = useTeamStock();
  return useMemo(() => {
    const logs = [pseudoLog(used)];
    return { principal: categoryStock(CARDAPIO, logs, 'principal'), sobremesa: categoryStock(CARDAPIO, logs, 'sobremesa') };
  }, [used]);
}
