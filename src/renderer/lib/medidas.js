import { useCallback, useEffect, useMemo, useState } from 'react';
import { createMeasure, statusAtSave, validateMeasure } from '../../shared/rules/measures.js';
import { withMockMeasureDays, withMockMeasures } from './mock.js';

// Medidas manuais (pressão, glicose e massa): usa a API do Electron (measurements.json) quando existe;
// no navegador (testes, demonstração) guarda no localStorage. O valor é pessoal: só a contagem do time sai daqui.
const KEY = 'vn.measures';
const api = () => (typeof window !== 'undefined' ? window.api : undefined);

function readLocal() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
}
function writeLocal(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; }
}

export async function listMeasures(crew) {
  const real = api()?.listMeasures ? await api().listMeasures(crew) : readLocal().filter((m) => m.crew === crew);
  return withMockMeasures(real, crew);
}

/** Só crew, tipo e horário de todos os registros (sem valores), para a contagem do time. */
export async function listMeasureDays() {
  const real = api()?.listMeasureDays ? await api().listMeasureDays() : readLocal().map(({ crew, kind, at, status }) => ({ crew, kind, at, status }));
  return withMockMeasureDays(real);
}

export async function saveMeasure(measure) {
  const { valid, errors } = validateMeasure(measure);
  if (!valid) return { success: false, errors };
  if (api()?.submitMeasure) return api().submitMeasure(measure);
  const all = readLocal();
  return { success: writeLocal([...all, { ...measure, status: statusAtSave(all, measure) }]) };
}

export { createMeasure };

/** Registros do tripulante, recarregáveis. */
export function useMeasures(crew) {
  const [measures, setMeasures] = useState([]);
  const reload = useCallback(() => listMeasures(crew).then((m) => setMeasures(m || [])).catch(() => {}), [crew]);
  useEffect(() => { reload(); }, [reload]);
  return { measures, reload };
}

/** Contagem do time por dia, sem valores. */
export function useMeasureDays() {
  const [days, setDays] = useState([]);
  useEffect(() => { listMeasureDays().then((d) => setDays(d || [])).catch(() => {}); }, []);
  return useMemo(() => days, [days]);
}
