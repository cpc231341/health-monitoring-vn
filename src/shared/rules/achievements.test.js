import { describe, it, expect } from 'vitest'
import {
  BADGES,
  LEVEL_MIN,
  POINTS,
  SHIELDS_PER_MONTH,
  badgeStatus,
  buildTimeline,
  dayActivity,
  dayPoints,
  levelOf,
  metricsFrom,
  missionDone,
  missionItems,
  missionStreak,
  teamProgress,
  totalPoints,
  weekRecap
} from './achievements.js'
import { createMeasure } from './measures.js'
import { createSet, createWorkout } from './training.js'

let n = 0
const at = (date) => `${date}T07:00:00`
const meas = (date, kind, crew = 'rita') => createMeasure({
  id: `m${n++}`, crew, kind, at: at(date), device: 'other',
  value: kind === 'pa' ? { sys: 118, dia: 76 } : kind === 'gl' ? { mgdl: 94 } : { kg: 74 }
})
const all3 = (date, crew = 'rita') => ['pa', 'gl', 'kg'].map((k) => meas(date, k, crew))
const workout = (date, astronautId = 'rita') => createWorkout({ id: `w${n++}`, astronautId, routineId: 'full-a', date, sets: [createSet({ exerciseId: 'squat', weightKg: 40, reps: 10, kind: 'normal', done: true })] })
const base = (over = {}) => ({ crew: 'rita', measures: [], workouts: [], moods: {}, meals: [], ...over })
// um dia de missão completa: 3 medidas, treino e humor
const missionDay = (date) => ({ measures: all3(date), workouts: [workout(date)], moods: { [date]: 4 } })
const merge = (...parts) => base({
  measures: parts.flatMap((p) => p.measures || []),
  workouts: parts.flatMap((p) => p.workouts || []),
  moods: Object.assign({}, ...parts.map((p) => p.moods || {})),
  meals: parts.flatMap((p) => p.meals || [])
})

describe('Gamificação: o dia e os pontos', () => {
  it('lê o que foi feito na data', () => {
    const data = base({ measures: [meas('2026-11-15', 'pa'), meas('2026-11-14', 'gl'), meas('2026-11-15', 'pa', 'mike')], workouts: [workout('2026-11-15')], moods: { '2026-11-15': 3 }, meals: [{ date: '2026-11-15' }] })
    const a = dayActivity(data, '2026-11-15')
    expect([...a.measures]).toEqual(['pa'])
    expect(a).toMatchObject({ trained: true, mood: true, meal: true })
    expect(dayActivity(data, '2026-11-13')).toMatchObject({ trained: false, mood: false, meal: false })
    expect(dayActivity(base({ meals: [{ timestamp: '2026-11-15T09:00:00' }] }), '2026-11-15').meal).toBe(true)
  })

  it('treino que não teve série feita não conta', () => {
    const w = createWorkout({ id: 'x', astronautId: 'rita', routineId: 'full-a', date: '2026-11-15', sets: [createSet({ exerciseId: 'squat', weightKg: 40, reps: 10, kind: 'normal', done: false })] })
    expect(dayActivity(base({ workouts: [w] }), '2026-11-15').trained).toBe(false)
  })

  it('pontua treino, cada medida, o bônus das 3 medidas, humor e refeição', () => {
    const none = dayActivity(base(), '2026-11-15')
    expect(dayPoints(none)).toBe(0)
    const full = dayActivity(base({ ...missionDay('2026-11-15'), meals: [{ date: '2026-11-15' }] }), '2026-11-15')
    expect(dayPoints(full)).toBe(POINTS.workout + 3 * POINTS.measure + POINTS.measuresComplete + POINTS.mood + POINTS.meal)
    const two = dayActivity(base({ measures: [meas('2026-11-15', 'pa'), meas('2026-11-15', 'gl')] }), '2026-11-15')
    expect(dayPoints(two)).toBe(2 * POINTS.measure)
  })

  it('a missão diária pede as 3 medidas, treino (ou descanso) e humor', () => {
    const act = dayActivity(base(missionDay('2026-11-15')), '2026-11-15')
    expect(missionDone(act)).toBe(true)
    const semTreino = dayActivity(base({ measures: all3('2026-11-15'), moods: { '2026-11-15': 4 } }), '2026-11-15')
    expect(missionItems(semTreino)).toEqual({ measures: true, train: false, mood: true })
    expect(missionDone(semTreino)).toBe(false)
    expect(missionDone(semTreino, true)).toBe(true)
  })
})

describe('Gamificação: linha do tempo, pontos totais e nível', () => {
  it('soma os pontos de cada dia e +10 na missão completa', () => {
    const data = merge(missionDay('2026-11-14'), { workouts: [workout('2026-11-15')] })
    const days = buildTimeline(data, '2026-11-15')
    expect(days.map((d) => d.date)).toEqual(['2026-11-14', '2026-11-15'])
    expect(days[0].mission).toBe(true)
    expect(days[0].points).toBe(POINTS.workout + 3 * POINTS.measure + POINTS.measuresComplete + POINTS.mood + POINTS.mission)
    expect(days[1].points).toBe(POINTS.workout)
    expect(totalPoints(days)).toBe(days[0].points + days[1].points)
  })

  it('sem atividade a linha do tempo é só hoje, com zero pontos', () => {
    const days = buildTimeline(base(), '2026-11-15')
    expect(days).toHaveLength(1)
    expect(totalPoints(days)).toBe(0)
  })

  it('o dia de descanso de hoje dispensa o treino da missão', () => {
    const data = base({ measures: all3('2026-11-15'), moods: { '2026-11-15': 4 } })
    expect(buildTimeline(data, '2026-11-15')[0].mission).toBe(false)
    expect(buildTimeline(data, '2026-11-15', { restToday: true })[0].mission).toBe(true)
  })

  it('calcula o nível, o que falta para o próximo e o nível máximo', () => {
    expect(levelOf(0)).toMatchObject({ index: 0, next: 50, toNext: 50, pct: 0 })
    expect(levelOf(49).index).toBe(0)
    expect(levelOf(50)).toMatchObject({ index: 1, toNext: 100, pct: 0 })
    expect(levelOf(100)).toMatchObject({ index: 1, pct: 50 })
    expect(levelOf(800)).toMatchObject({ index: LEVEL_MIN.length - 1, next: null, toNext: 0, pct: 100 })
    expect(levelOf(5000).index).toBe(LEVEL_MIN.length - 1)
  })
})

describe('Gamificação: sequência de missões e escudos', () => {
  const day = (date, mission) => ({ date, mission, points: 0, act: {} })

  it('conta dias seguidos e hoje em aberto não quebra', () => {
    expect(missionStreak([day('2026-11-13', true), day('2026-11-14', true), day('2026-11-15', true)]).streak).toBe(3)
    expect(missionStreak([day('2026-11-13', true), day('2026-11-14', true), day('2026-11-15', false)]).streak).toBe(2)
    expect(missionStreak([]).streak).toBe(0)
  })

  it('um escudo cobre um dia perdido e a sequência continua', () => {
    const r = missionStreak([day('2026-11-12', true), day('2026-11-13', false), day('2026-11-14', true), day('2026-11-15', true)])
    expect(r.streak).toBe(3)
    expect(r.used).toEqual({ '2026-11': 1 })
    expect(r.left).toBe(SHIELDS_PER_MONTH - 1)
  })

  it('sem escudos no mês, o dia perdido quebra a sequência', () => {
    const days = [day('2026-11-10', true), day('2026-11-11', false), day('2026-11-12', false), day('2026-11-13', false), day('2026-11-14', true), day('2026-11-15', true)]
    expect(missionStreak(days).streak).toBe(2)
    expect(missionStreak(days).left).toBe(0)
  })

  it('os escudos são por mês: o mês anterior tem os seus', () => {
    const days = [day('2026-10-29', true), day('2026-10-30', false), day('2026-10-31', false), day('2026-11-01', false), day('2026-11-02', true), day('2026-11-03', true)]
    const r = missionStreak(days)
    expect(r.streak).toBe(3)
    expect(r.used).toEqual({ '2026-11': 1, '2026-10': 2 })
    expect(r.left).toBe(1)
  })
})

describe('Gamificação: selos', () => {
  it('cada selo mostra o progresso e destrava no alvo', () => {
    const st = badgeStatus({ measureStreak: 5, trainStreak: 0, workouts: 10, moodDays: 3, mealDays: 0, missionStreak: 7 })
    const get = (id) => st.find((b) => b.id === id)
    expect(get('measureStreak-3')).toMatchObject({ unlocked: true, value: 3, pct: 100 })
    expect(get('measureStreak-7')).toMatchObject({ unlocked: false, value: 5, pct: 71 })
    expect(get('workouts-10').unlocked).toBe(true)
    expect(get('moodDays-7')).toMatchObject({ unlocked: false, pct: 43 })
    expect(get('trainStreak-3')).toMatchObject({ unlocked: false, value: 0, pct: 0 })
    expect(get('missionStreak-7').unlocked).toBe(true)
    expect(st).toHaveLength(BADGES.length)
  })

  it('as métricas saem dos registros', () => {
    const data = merge(missionDay('2026-11-14'), missionDay('2026-11-15'), { meals: [{ date: '2026-11-15' }] })
    const days = buildTimeline(data, '2026-11-15')
    expect(metricsFrom(data, days, '2026-11-15')).toEqual({ measureStreak: 2, trainStreak: 2, workouts: 2, moodDays: 2, mealDays: 1, missionStreak: 2 })
  })
})

describe('Gamificação: semana e metas do time', () => {
  it('resume a semana e compara com a semana anterior da própria pessoa', () => {
    const data = merge(missionDay('2026-11-15'), missionDay('2026-11-14'), missionDay('2026-11-05'))
    const days = buildTimeline(data, '2026-11-15')
    const r = weekRecap(days, '2026-11-15')
    expect(r).toMatchObject({ missions: 2, measures: 6, workouts: 2, moodDays: 2, mealDays: 0 })
    expect(r.points).toBe(2 * (POINTS.workout + 3 * POINTS.measure + POINTS.measuresComplete + POINTS.mood + POINTS.mission))
    expect(r.delta).toBe(r.points - days.find((d) => d.date === '2026-11-05').points)
  })

  it('a meta do time usa só totais e libera o selo em 80%', () => {
    const crew = ['a', 'b', 'c', 'd', 'e']
    const mDays = crew.flatMap((c) => ['2026-11-13', '2026-11-14', '2026-11-15'].flatMap((d) => ['pa', 'gl', 'kg'].map((k) => ({ crew: c, kind: k, at: at(d) }))))
    const wk = crew.slice(0, 4).flatMap((c) => ['2026-11-13', '2026-11-14', '2026-11-15'].map((d) => workout(d, c)))
    const r = teamProgress(mDays, wk, 5, '2026-11-15')
    expect(r.measures).toEqual({ done: 45, total: 105, pct: 43, unlocked: false })
    expect(r.train).toEqual({ done: 12, total: 15, pct: 80, unlocked: true })
    expect(Object.keys(r.measures)).not.toContain('crew')
    expect(teamProgress([], [], 5, '2026-11-15').measures.pct).toBe(0)
  })

  it('treinos e medidas de fora da semana não contam', () => {
    const r = teamProgress([{ crew: 'a', kind: 'pa', at: at('2026-10-01') }], [workout('2026-10-01', 'a')], 5, '2026-11-15')
    expect(r.measures.done).toBe(0)
    expect(r.train.done).toBe(0)
  })
})
