import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_ROUTINES,
  adjustRoutine,
  mergeRoutines,
  routineForDay,
  suggestIntensity,
  validateRoutine,
  validateWorkout
} from '../../shared/rules/training.js';
import { TEAM } from '../data/crew.js';
import { withMockWorkouts } from './mock.js';

// Treinos e rotinas: usa a API do Electron (workouts.json / routines.json) quando existe;
// no navegador (testes, demonstração) guarda no localStorage.
const KEY = 'vn.workouts';
const ROUTINES_KEY = 'vn.routines';
const api = () => (typeof window !== 'undefined' ? window.api : undefined);

function readLocal(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
}
function writeLocal(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
}

export async function listWorkouts(astronautId) {
  if (api()?.listWorkouts) return withMockWorkouts(await api().listWorkouts(astronautId), astronautId);
  const all = readLocal(KEY);
  return withMockWorkouts(astronautId ? all.filter((w) => w.astronautId === astronautId) : all, astronautId);
}

export async function listRoutines(astronautId) {
  if (api()?.listRoutines) return api().listRoutines(astronautId);
  return mergeRoutines(DEFAULT_ROUTINES, readLocal(ROUTINES_KEY), astronautId);
}

export async function saveWorkout(workout) {
  const { valid, errors } = validateWorkout(workout);
  if (!valid) return { success: false, errors };
  if (api()?.saveWorkout) return api().saveWorkout(workout);
  return { success: writeLocal(KEY, [...readLocal(KEY), { ...workout, timestamp: new Date().toISOString() }]) };
}

/** Salva a rotina personalizada de um astronauta (substitui a padrão de mesmo id). */
export async function saveRoutine(routine) {
  const { customized, ...clean } = routine;
  const { valid, errors } = validateRoutine(clean);
  if (!valid) return { success: false, errors };
  if (api()?.saveRoutine) return api().saveRoutine(clean);
  const rest = readLocal(ROUTINES_KEY).filter((r) => !(r.id === clean.id && r.astronautId === clean.astronautId));
  return { success: writeLocal(ROUTINES_KEY, [...rest, clean]) };
}

export async function resetRoutine(astronautId, routineId) {
  if (api()?.resetRoutine) return api().resetRoutine(astronautId, routineId);
  return { success: writeLocal(ROUTINES_KEY, readLocal(ROUTINES_KEY).filter((r) => !(r.id === routineId && r.astronautId === astronautId))) };
}

/** Treinos de um tripulante (ou de todos, sem argumento), recarregáveis. */
export function useWorkouts(astronautId) {
  const [workouts, setWorkouts] = useState([]);
  const reload = useCallback(() => listWorkouts(astronautId).then((w) => setWorkouts(w || [])).catch(() => {}), [astronautId]);
  useEffect(() => { reload(); }, [reload]);
  return { workouts, reload };
}

export function useRoutines(astronautId) {
  const [routines, setRoutines] = useState(DEFAULT_ROUTINES);
  const reload = useCallback(() => listRoutines(astronautId).then((r) => { if (r && r.length) setRoutines(r); }).catch(() => {}), [astronautId]);
  useEffect(() => { reload(); }, [reload]);
  return { routines, reload };
}

/** Intensidade do dia a partir do estado dos indicadores (sono curto, humor baixo ou alerta crítico). */
export function intensityFrom(R) {
  const hasCritical = ['pa', 'fc', 'gl', 'tc', 'sn', 'hu', 'o2', 'rad'].some((k) => R[k].st === 'crit');
  const sleepStatus = R.sn.st !== 'ok' || R.hu.st === 'warn' ? 'warning' : 'normal';
  return { ...suggestIntensity({ sleepStatus, hasCritical }), hasCritical };
}

/** Treino planejado de hoje (a rotina do astronauta, já ajustada pela intensidade). */
export function useTodayPlan(astronautId, R) {
  const { routines, reload } = useRoutines(astronautId);
  const plan = useMemo(() => {
    const intensity = intensityFrom(R);
    const base = routineForDay(routines, TEAM.day);
    return { intensity, base, routine: adjustRoutine(base, intensity.factor) };
  }, [routines, R]);
  return { ...plan, reloadRoutines: reload };
}
