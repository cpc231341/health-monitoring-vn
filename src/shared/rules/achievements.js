// Gamificação: pontos, nível, missão diária, escudos, selos, metas do time e retrospectiva da semana.
// Premia o hábito (registrar, treinar), nunca o valor medido, e não compara pessoas (RN06, RN07, RN14).
// Funções puras: recebem os registros já lidos e devolvem números e listas.
import { addDays, buildDays, computeStreak, toDateStr, POINTS_PER_WORKOUT } from './training.js'
import { KINDS, measureStreak, registeredOn } from './measures.js'

export const POINTS = { workout: POINTS_PER_WORKOUT, measure: 3, measuresComplete: 5, mood: 3, meal: 2, mission: 10 }
// Pontos mínimos de cada nível (o 1º começa em 0).
export const LEVEL_MIN = [0, 50, 150, 300, 500, 800]
// Escudos por mês: cada um cobre um dia perdido da sequência de missões.
export const SHIELDS_PER_MONTH = 2
// Meta coletiva (porcentagem) que libera o selo do time, e treinos por pessoa na semana.
export const TEAM_GOAL_PCT = 80
export const TEAM_TRAIN_PER_PERSON = 3

// Selos por marco. `metric` é uma chave de metricsFrom(); o nome vem de i18n (gm.badge.<metric>).
export const BADGES = [
  { id: 'measureStreak-3', metric: 'measureStreak', target: 3 },
  { id: 'measureStreak-7', metric: 'measureStreak', target: 7 },
  { id: 'measureStreak-14', metric: 'measureStreak', target: 14 },
  { id: 'trainStreak-3', metric: 'trainStreak', target: 3 },
  { id: 'trainStreak-7', metric: 'trainStreak', target: 7 },
  { id: 'workouts-10', metric: 'workouts', target: 10 },
  { id: 'moodDays-7', metric: 'moodDays', target: 7 },
  { id: 'mealDays-7', metric: 'mealDays', target: 7 },
  { id: 'missionStreak-3', metric: 'missionStreak', target: 3 },
  { id: 'missionStreak-7', metric: 'missionStreak', target: 7 }
]

const dateOf = (iso) => toDateStr(new Date(iso))
const mealDate = (l) => l.date || (l.timestamp ? dateOf(l.timestamp) : null)
const trainedOn = (workouts, date) => (workouts || []).some((w) => w.date === date && (w.sets || []).some((s) => s.done))

// ---------- um dia ----------

/** O que o tripulante fez em uma data. data: { crew, measures, workouts, moods: { 'AAAA-MM-DD': 1..5 }, meals } */
export function dayActivity(data, date) {
  return {
    measures: registeredOn(data.measures, data.crew, date),
    trained: trainedOn(data.workouts, date),
    mood: !!(data.moods && data.moods[date]),
    meal: (data.meals || []).some((l) => mealDate(l) === date)
  }
}

/** Missão diária: as 3 medidas, treinar (ou dia de descanso) e registrar o humor. */
export function missionItems(act, rest = false) {
  return { measures: act.measures.size === KINDS.length, train: act.trained || rest, mood: act.mood }
}
export const missionDone = (act, rest = false) => Object.values(missionItems(act, rest)).every(Boolean)

/** Pontos de um dia, sem contar a missão (que é somada em buildTimeline). */
export function dayPoints(act) {
  return (act.trained ? POINTS.workout : 0)
    + act.measures.size * POINTS.measure
    + (act.measures.size === KINDS.length ? POINTS.measuresComplete : 0)
    + (act.mood ? POINTS.mood : 0)
    + (act.meal ? POINTS.meal : 0)
}

// ---------- linha do tempo ----------

function firstDate(data, today) {
  const all = [
    ...(data.measures || []).filter((m) => m.crew === data.crew).map((m) => dateOf(m.at)),
    ...(data.workouts || []).map((w) => w.date),
    ...Object.keys(data.moods || {}),
    ...(data.meals || []).map(mealDate).filter(Boolean)
  ].sort()
  return all[0] && all[0] < today ? all[0] : today
}

/** Dias desde a primeira atividade até hoje. `restToday` dispensa o treino de hoje (alerta crítico). */
export function buildTimeline(data, today, { restToday = false } = {}) {
  const days = []
  for (let d = firstDate(data, today); d <= today; d = addDays(d, 1)) {
    const act = dayActivity(data, d)
    const rest = restToday && d === today
    const mission = missionDone(act, rest)
    days.push({ date: d, act, mission, points: dayPoints(act) + (mission ? POINTS.mission : 0) })
  }
  return days
}

export const totalPoints = (days) => days.reduce((s, d) => s + d.points, 0)

/** Sequência de missões diárias, com escudos: cobre um dia perdido (até SHIELDS_PER_MONTH por mês). */
export function missionStreak(days, shieldsPerMonth = SHIELDS_PER_MONTH) {
  const used = {}
  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    const d = days[i]
    if (d.mission) { streak += 1; continue }
    if (i === days.length - 1) continue // hoje ainda não acabou
    const month = d.date.slice(0, 7)
    if ((used[month] || 0) < shieldsPerMonth) { used[month] = (used[month] || 0) + 1; continue }
    break
  }
  const today = days.length ? days[days.length - 1].date : toDateStr()
  return { streak, used, left: Math.max(0, shieldsPerMonth - (used[today.slice(0, 7)] || 0)) }
}

// ---------- nível ----------

export function levelOf(points) {
  let index = 0
  LEVEL_MIN.forEach((min, i) => { if (points >= min) index = i })
  const next = LEVEL_MIN[index + 1]
  return {
    index,
    min: LEVEL_MIN[index],
    next: next ?? null,
    toNext: next == null ? 0 : next - points,
    pct: next == null ? 100 : Math.round(((points - LEVEL_MIN[index]) / (next - LEVEL_MIN[index])) * 100)
  }
}

// ---------- selos ----------

export function metricsFrom(data, days, today) {
  return {
    measureStreak: measureStreak(data.measures, data.crew, today),
    trainStreak: computeStreak(buildDays(data.workouts, today)),
    workouts: (data.workouts || []).filter((w) => (w.sets || []).some((s) => s.done)).length,
    moodDays: Object.keys(data.moods || {}).length,
    mealDays: new Set((data.meals || []).map(mealDate).filter(Boolean)).size,
    missionStreak: missionStreak(days).streak
  }
}

export function badgeStatus(metrics) {
  return BADGES.map((b) => {
    const value = metrics[b.metric] || 0
    return { ...b, value: Math.min(value, b.target), unlocked: value >= b.target, pct: Math.min(100, Math.round((value / b.target) * 100)) }
  })
}

// ---------- retrospectiva da semana (só a própria pessoa, contra a semana anterior dela) ----------

export function weekRecap(days, today) {
  const sum = (from, to) => {
    const list = days.filter((d) => d.date >= from && d.date <= to)
    return {
      points: list.reduce((s, d) => s + d.points, 0),
      missions: list.filter((d) => d.mission).length,
      measures: list.reduce((s, d) => s + d.act.measures.size, 0),
      workouts: list.filter((d) => d.act.trained).length,
      moodDays: list.filter((d) => d.act.mood).length,
      mealDays: list.filter((d) => d.act.meal).length
    }
  }
  const cur = sum(addDays(today, -6), today)
  const prev = sum(addDays(today, -13), addDays(today, -7))
  return { ...cur, delta: cur.points - prev.points }
}

// ---------- metas do time (só totais, sem nomes nem valores) ----------

/** measureDays: [{ crew, kind, at }]; workouts: de toda a tripulação. */
export function teamProgress(measureDays, workouts, crewCount, today) {
  const week = new Set(Array.from({ length: 7 }, (_, i) => addDays(today, i - 6)))
  const seen = new Set()
  for (const m of measureDays || []) if (week.has(dateOf(m.at))) seen.add(`${m.crew}:${m.kind}:${dateOf(m.at)}`)
  const sessions = new Set((workouts || []).filter((w) => week.has(w.date)).map((w) => `${w.astronautId}:${w.date}`)).size
  const mTarget = crewCount * KINDS.length * 7
  const tTarget = crewCount * TEAM_TRAIN_PER_PERSON
  const mPct = Math.min(100, Math.round((seen.size / mTarget) * 100))
  const tPct = Math.min(100, Math.round((sessions / tTarget) * 100))
  return {
    measures: { done: seen.size, total: mTarget, pct: mPct, unlocked: mPct >= TEAM_GOAL_PCT },
    train: { done: sessions, total: tTarget, pct: tPct, unlocked: tPct >= TEAM_GOAL_PCT }
  }
}
