// Treino: modelo (exercício, rotina, treino e série), cálculos de volume e 1RM,
// ajuste por sono curto ou alerta crítico e pontos/sequência (RN14).
// Funções puras, sem acesso a disco: o armazenamento fica em src/main/storage.js.

export const MUSCLE_GROUPS = ['legs', 'chest', 'back', 'shoulders', 'core']
export const EXERCISE_TYPES = ['compound', 'isolation', 'bodyweight']
export const SET_KINDS = ['warmup', 'normal']

// Biblioteca de exercícios. Os nomes ficam em i18n (train.ex.<id>).
export const EXERCISES = [
  { id: 'squat', muscleGroup: 'legs', type: 'compound' },
  { id: 'bench', muscleGroup: 'chest', type: 'compound' },
  { id: 'row', muscleGroup: 'back', type: 'compound' },
  { id: 'press', muscleGroup: 'shoulders', type: 'compound' },
  { id: 'rdl', muscleGroup: 'legs', type: 'compound' },
  { id: 'plank', muscleGroup: 'core', type: 'bodyweight' }
]

// Rotinas padrão (os nomes ficam em i18n: train.routines.<id>). Alternam por dia da missão.
export const DEFAULT_ROUTINES = [
  {
    id: 'full-a',
    exercises: [
      { exerciseId: 'squat', sets: 3, reps: 10, restSec: 90, loadKg: 40 },
      { exerciseId: 'bench', sets: 3, reps: 10, restSec: 90, loadKg: 30 },
      { exerciseId: 'row', sets: 3, reps: 10, restSec: 90, loadKg: 30 },
      { exerciseId: 'plank', sets: 3, reps: 30, restSec: 45, loadKg: 0 }
    ]
  },
  {
    id: 'full-b',
    exercises: [
      { exerciseId: 'rdl', sets: 3, reps: 10, restSec: 90, loadKg: 40 },
      { exerciseId: 'press', sets: 3, reps: 10, restSec: 90, loadKg: 20 },
      { exerciseId: 'row', sets: 3, reps: 10, restSec: 90, loadKg: 30 },
      { exerciseId: 'plank', sets: 3, reps: 30, restSec: 45, loadKg: 0 }
    ]
  }
]

const round1 = (n) => Math.round(n * 10) / 10
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

// ---------- modelo ----------

export function createExercise({ id, name, muscleGroup, type }) {
  if (!id || !MUSCLE_GROUPS.includes(muscleGroup) || !EXERCISE_TYPES.includes(type)) {
    throw new Error('Exercício inválido')
  }
  return { id, name: name || id, muscleGroup, type }
}

export function createRoutine({ id, name, exercises = [] }) {
  if (!id) throw new Error('Rotina inválida')
  return {
    id,
    name: name || id,
    exercises: exercises.map((e) => ({
      exerciseId: e.exerciseId,
      sets: e.sets,
      reps: e.reps,
      restSec: e.restSec ?? 90,
      loadKg: e.loadKg ?? 0
    }))
  }
}

export function createSet({ exerciseId, weightKg = 0, reps, kind = 'normal', rpe = null, done = false }) {
  return { exerciseId, weightKg, reps, kind, rpe, done }
}

export function createWorkout({ id, astronautId, routineId, date, sets = [] }) {
  return { id: id || String(Date.now()), astronautId, routineId, date, sets }
}

export function validateSet(set) {
  const errors = []
  if (!set || typeof set.exerciseId !== 'string' || !set.exerciseId) errors.push('exerciseId')
  if (!Number.isFinite(set?.weightKg) || set.weightKg < 0) errors.push('weightKg')
  if (!Number.isInteger(set?.reps) || set.reps < 1 || set.reps > 100) errors.push('reps')
  if (!SET_KINDS.includes(set?.kind)) errors.push('kind')
  if (set?.rpe != null && !(Number.isFinite(set.rpe) && set.rpe >= 1 && set.rpe <= 10)) errors.push('rpe')
  return errors
}

export function validateWorkout(workout) {
  const errors = []
  if (!workout || typeof workout.astronautId !== 'string' || !workout.astronautId) errors.push('astronautId')
  if (!workout || !DATE_RE.test(workout.date || '')) errors.push('date')
  if (!workout || !Array.isArray(workout.sets) || workout.sets.length === 0) {
    errors.push('sets')
  } else {
    workout.sets.forEach((s, i) => validateSet(s).forEach((e) => errors.push(`sets[${i}].${e}`)))
  }
  return { valid: errors.length === 0, errors }
}

// ---------- cálculos ----------

// Só conta série feita e normal: aquecimento não entra no volume.
export function setVolume(set) {
  if (!set || !set.done || set.kind !== 'normal') return 0
  return set.weightKg * set.reps
}

export function workoutVolume(workout) {
  return (workout?.sets || []).reduce((sum, s) => sum + setVolume(s), 0)
}

// 1RM estimado pela fórmula de Epley. Acima de 12 repetições a estimativa é pouco confiável: devolve 0.
export function estimate1RM(weightKg, reps) {
  if (!(weightKg > 0) || !(reps >= 1) || reps > 12) return 0
  if (reps === 1) return weightKg
  return round1(weightKg * (1 + reps / 30))
}

export function bestEstimated1RM(workouts, exerciseId) {
  let best = 0
  for (const w of [].concat(workouts || [])) {
    for (const s of w.sets || []) {
      if (s.exerciseId === exerciseId && s.done && s.kind === 'normal') {
        best = Math.max(best, estimate1RM(s.weightKg, s.reps))
      }
    }
  }
  return best
}

// Séries feitas (normais) por grupo muscular, em um treino ou em uma lista de treinos.
export function setsPerMuscleGroup(workouts, exercises = EXERCISES) {
  const groupOf = Object.fromEntries(exercises.map((e) => [e.id, e.muscleGroup]))
  const out = Object.fromEntries(MUSCLE_GROUPS.map((g) => [g, 0]))
  for (const w of [].concat(workouts || [])) {
    for (const s of w.sets || []) {
      const g = groupOf[s.exerciseId]
      if (g && s.done && s.kind === 'normal') out[g] += 1
    }
  }
  return out
}

// ---------- datas ('AAAA-MM-DD', sem fuso) ----------

export function toDateStr(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`
}

export function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d + n))
  return t.toISOString().slice(0, 10)
}

// Volume dos últimos `days` dias (do mais antigo ao mais recente, terminando em `today`).
export function volumeByDay(workouts, days, today) {
  const rows = []
  for (let i = days - 1; i >= 0; i--) rows.push({ date: addDays(today, -i), volume: 0 })
  for (const w of workouts || []) {
    const row = rows.find((r) => r.date === w.date)
    if (row) row.volume += workoutVolume(w)
  }
  return rows
}

// ---------- ajuste do dia ----------

// Alerta crítico suspende o treino; sono curto (ou humor baixo) deixa 30% mais leve.
export function suggestIntensity({ sleepStatus = 'normal', hasCritical = false } = {}) {
  if (hasCritical) return { level: 'rest', factor: 0 }
  if (sleepStatus !== 'normal') return { level: 'light', factor: 0.7 }
  return { level: 'full', factor: 1 }
}

export function adjustRoutine(routine, factor) {
  if (!routine) return null
  if (factor <= 0) return { ...routine, exercises: [] }
  if (factor >= 1) return routine
  return {
    ...routine,
    exercises: routine.exercises.map((e) => ({ ...e, reps: Math.max(1, Math.round(e.reps * factor)) }))
  }
}

export function routineForDay(routines, day) {
  if (!routines || routines.length === 0) return null
  return routines[((day % routines.length) + routines.length) % routines.length]
}

// ---------- RN14: pontos e sequência ----------

export const POINTS_PER_WORKOUT = 10
// Dias com alerta, atividade extraveicular ou anel carregando não quebram a sequência.
export const DAY_EXCUSES = ['alert', 'eva', 'ringCharging']

// days: do mais antigo ao mais recente, [{ date, trained, excuse }].
export function computeStreak(days) {
  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    const d = days[i]
    if (d.trained) streak += 1
    else if (DAY_EXCUSES.includes(d.excuse)) continue
    else if (i === days.length - 1) continue // hoje ainda não acabou
    else break
  }
  return streak
}

export function totalPoints(days) {
  return days.filter((d) => d.trained).length * POINTS_PER_WORKOUT
}

// Monta a lista de dias desde o primeiro treino até hoje. `todayExcuse` vale só para hoje.
export function buildDays(workouts, today, todayExcuse = null) {
  const trained = new Set((workouts || []).filter((w) => workoutVolume(w) > 0 || (w.sets || []).some((s) => s.done)).map((w) => w.date))
  const first = [...trained].sort()[0] || today
  const days = []
  for (let d = first; d <= today; d = addDays(d, 1)) {
    days.push({ date: d, trained: trained.has(d), excuse: d === today ? todayExcuse : null })
  }
  return days
}

// ---------- personalização da rotina ----------

export function validateRoutine(routine) {
  const errors = []
  if (!routine || typeof routine.id !== 'string' || !routine.id) errors.push('id')
  if (!routine || !Array.isArray(routine.exercises) || routine.exercises.length === 0) {
    errors.push('exercises')
  } else {
    const known = EXERCISES.map((e) => e.id)
    routine.exercises.forEach((e, i) => {
      if (!known.includes(e.exerciseId)) errors.push(`exercises[${i}].exerciseId`)
      if (!Number.isInteger(e.sets) || e.sets < 1 || e.sets > 10) errors.push(`exercises[${i}].sets`)
      if (!Number.isInteger(e.reps) || e.reps < 1 || e.reps > 100) errors.push(`exercises[${i}].reps`)
      if (!Number.isInteger(e.restSec) || e.restSec < 0 || e.restSec > 600) errors.push(`exercises[${i}].restSec`)
      if (!Number.isFinite(e.loadKg) || e.loadKg < 0) errors.push(`exercises[${i}].loadKg`)
    })
  }
  return { valid: errors.length === 0, errors }
}

// Rotinas padrão com as personalizadas do astronauta por cima (mesmo id substitui).
export function mergeRoutines(defaults, saved, astronautId) {
  const mine = (saved || []).filter((r) => r.astronautId === astronautId)
  const merged = defaults.map((d) => {
    const own = mine.find((r) => r.id === d.id)
    return own ? { ...own, customized: true } : d
  })
  const extra = mine.filter((r) => !defaults.some((d) => d.id === r.id)).map((r) => ({ ...r, customized: true }))
  return [...merged, ...extra]
}
