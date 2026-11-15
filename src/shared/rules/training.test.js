import { describe, it, expect } from 'vitest'
import {
  DEFAULT_ROUTINES,
  EXERCISES,
  adjustRoutine,
  addDays,
  bestEstimated1RM,
  buildDays,
  computeStreak,
  createExercise,
  createRoutine,
  createSet,
  createWorkout,
  estimate1RM,
  routineForDay,
  setVolume,
  setsPerMuscleGroup,
  suggestIntensity,
  toDateStr,
  totalPoints,
  validateRoutine,
  mergeRoutines,
  validateSet,
  validateWorkout,
  volumeByDay,
  workoutVolume
} from './training.js'

const set = (over = {}) => createSet({ exerciseId: 'squat', weightKg: 40, reps: 10, kind: 'normal', done: true, ...over })

describe('Treino: modelo', () => {
  it('cria exercício válido e recusa grupo muscular desconhecido', () => {
    expect(createExercise({ id: 'squat', muscleGroup: 'legs', type: 'compound' }).name).toBe('squat')
    expect(() => createExercise({ id: 'x', muscleGroup: 'feet', type: 'compound' })).toThrow()
  })

  it('cria rotina com descanso e carga padrão', () => {
    const r = createRoutine({ id: 'r', exercises: [{ exerciseId: 'squat', sets: 3, reps: 10 }] })
    expect(r.exercises[0]).toMatchObject({ restSec: 90, loadKg: 0 })
  })

  it('as rotinas padrão só usam exercícios conhecidos', () => {
    const ids = EXERCISES.map((e) => e.id)
    for (const r of DEFAULT_ROUTINES) for (const e of r.exercises) expect(ids).toContain(e.exerciseId)
  })

  it('valida série e treino', () => {
    expect(validateSet(set())).toEqual([])
    expect(validateSet(set({ reps: 0 }))).toContain('reps')
    expect(validateSet(set({ weightKg: -1 }))).toContain('weightKg')
    expect(validateSet(set({ kind: 'drop' }))).toContain('kind')
    expect(validateSet(set({ rpe: 11 }))).toContain('rpe')
    const ok = createWorkout({ astronautId: 'cristiano', routineId: 'full-a', date: '2026-11-15', sets: [set()] })
    expect(validateWorkout(ok)).toEqual({ valid: true, errors: [] })
    expect(validateWorkout({ ...ok, date: '15/11/2026' }).errors).toContain('date')
    expect(validateWorkout({ ...ok, sets: [] }).errors).toContain('sets')
    expect(validateWorkout({ ...ok, sets: [set({ reps: 0 })] }).errors).toEqual(['sets[0].reps'])
    expect(validateWorkout(null).valid).toBe(false)
  })
})

describe('Treino: volume, 1RM e séries por grupo', () => {
  it('volume = carga × repetições, só de séries normais e feitas', () => {
    expect(setVolume(set())).toBe(400)
    expect(setVolume(set({ kind: 'warmup' }))).toBe(0)
    expect(setVolume(set({ done: false }))).toBe(0)
    const w = createWorkout({ astronautId: 'a', date: '2026-11-15', sets: [set(), set({ weightKg: 20, reps: 5 }), set({ kind: 'warmup' })] })
    expect(workoutVolume(w)).toBe(500)
  })

  it('estima o 1RM pela fórmula de Epley', () => {
    expect(estimate1RM(100, 1)).toBe(100)
    expect(estimate1RM(100, 5)).toBe(116.7)
    expect(estimate1RM(60, 10)).toBe(80)
    expect(estimate1RM(100, 20)).toBe(0)
    expect(estimate1RM(0, 5)).toBe(0)
  })

  it('acha o melhor 1RM de um exercício ignorando aquecimento', () => {
    const w = createWorkout({ astronautId: 'a', date: '2026-11-15', sets: [set({ weightKg: 100, reps: 3, kind: 'warmup' }), set({ weightKg: 60, reps: 10 }), set({ weightKg: 70, reps: 5 })] })
    expect(bestEstimated1RM(w, 'squat')).toBe(81.7)
    expect(bestEstimated1RM([w], 'bench')).toBe(0)
  })

  it('conta séries feitas por grupo muscular', () => {
    const w = createWorkout({
      astronautId: 'a',
      date: '2026-11-15',
      sets: [set(), set(), set({ exerciseId: 'bench' }), set({ exerciseId: 'bench', done: false }), set({ exerciseId: 'squat', kind: 'warmup' })]
    })
    expect(setsPerMuscleGroup(w)).toEqual({ legs: 2, chest: 1, back: 0, shoulders: 0, core: 0 })
    expect(setsPerMuscleGroup([w, w]).legs).toBe(4)
  })
})

describe('Treino: datas e volume por dia', () => {
  it('soma dias sem depender de fuso', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01')
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28')
    expect(toDateStr(new Date(2026, 10, 5))).toBe('2026-11-05')
  })

  it('agrupa o volume dos últimos dias', () => {
    const w1 = createWorkout({ astronautId: 'a', date: '2026-11-15', sets: [set()] })
    const w2 = createWorkout({ astronautId: 'a', date: '2026-11-13', sets: [set({ weightKg: 10, reps: 10 })] })
    const out = volumeByDay([w1, w2, createWorkout({ astronautId: 'a', date: '2026-10-01', sets: [set()] })], 3, '2026-11-15')
    expect(out).toEqual([
      { date: '2026-11-13', volume: 100 },
      { date: '2026-11-14', volume: 0 },
      { date: '2026-11-15', volume: 400 }
    ])
  })
})

describe('Treino: ajuste do dia', () => {
  it('alerta crítico suspende, sono curto deixa mais leve e o resto é completo', () => {
    expect(suggestIntensity({ hasCritical: true, sleepStatus: 'warning' })).toEqual({ level: 'rest', factor: 0 })
    expect(suggestIntensity({ sleepStatus: 'warning' })).toEqual({ level: 'light', factor: 0.7 })
    expect(suggestIntensity({ sleepStatus: 'critical' }).level).toBe('light')
    expect(suggestIntensity({})).toEqual({ level: 'full', factor: 1 })
  })

  it('reduz 30% das repetições, suspende e mantém o plano completo', () => {
    const r = DEFAULT_ROUTINES[0]
    expect(adjustRoutine(r, 0.7).exercises[0].reps).toBe(7)
    expect(adjustRoutine(r, 0.7).exercises[0].loadKg).toBe(40)
    expect(adjustRoutine(r, 0).exercises).toEqual([])
    expect(adjustRoutine(r, 1)).toBe(r)
    expect(adjustRoutine(null, 0.7)).toBeNull()
    expect(adjustRoutine({ id: 'x', exercises: [{ exerciseId: 'squat', sets: 1, reps: 1 }] }, 0.7).exercises[0].reps).toBe(1)
  })

  it('escolhe a rotina do dia alternando', () => {
    expect(routineForDay(DEFAULT_ROUTINES, 46).id).toBe('full-a')
    expect(routineForDay(DEFAULT_ROUTINES, 47).id).toBe('full-b')
    expect(routineForDay([], 47)).toBeNull()
  })
})

describe('Treino: pontos e sequência (RN14)', () => {
  const d = (date, trained, excuse = null) => ({ date, trained, excuse })

  it('conta dias seguidos treinados', () => {
    expect(computeStreak([d('1', true), d('2', true), d('3', true)])).toBe(3)
  })

  it('falta sem justificativa quebra a sequência', () => {
    expect(computeStreak([d('1', true), d('2', false), d('3', true)])).toBe(1)
  })

  it('alerta, atividade extraveicular e anel carregando não quebram', () => {
    for (const excuse of ['alert', 'eva', 'ringCharging']) {
      expect(computeStreak([d('1', true), d('2', false, excuse), d('3', true)])).toBe(2)
    }
  })

  it('hoje sem treino ainda não quebra; ontem sem treino quebra', () => {
    expect(computeStreak([d('1', true), d('2', true), d('3', false)])).toBe(2)
    expect(computeStreak([d('1', true), d('2', false), d('3', false)])).toBe(0)
  })

  it('pontua 10 por dia treinado', () => {
    expect(totalPoints([d('1', true), d('2', false), d('3', true)])).toBe(20)
  })

  it('monta os dias a partir dos treinos e aplica a justificativa só em hoje', () => {
    const w = createWorkout({ astronautId: 'a', date: '2026-11-13', sets: [set()] })
    const days = buildDays([w], '2026-11-15', 'eva')
    expect(days.map((x) => x.date)).toEqual(['2026-11-13', '2026-11-14', '2026-11-15'])
    expect(days.map((x) => x.trained)).toEqual([true, false, false])
    expect(days[2].excuse).toBe('eva')
    expect(days[1].excuse).toBeNull()
    expect(computeStreak(days)).toBe(0)
    expect(buildDays([], '2026-11-15')).toHaveLength(1)
  })
})

describe('Treino: personalização da rotina', () => {
  const base = DEFAULT_ROUTINES[0]

  it('valida a rotina', () => {
    expect(validateRoutine(base).valid).toBe(true)
    expect(validateRoutine({ id: 'x', exercises: [] }).errors).toContain('exercises')
    expect(validateRoutine({ ...base, exercises: [{ ...base.exercises[0], sets: 0 }] }).errors).toEqual(['exercises[0].sets'])
    expect(validateRoutine({ ...base, exercises: [{ ...base.exercises[0], exerciseId: 'nope' }] }).errors).toEqual(['exercises[0].exerciseId'])
    expect(validateRoutine({ ...base, exercises: [{ ...base.exercises[0], reps: 1.5, restSec: -1, loadKg: -2 }] }).errors).toEqual(['exercises[0].reps', 'exercises[0].restSec', 'exercises[0].loadKg'])
    expect(validateRoutine(null).valid).toBe(false)
  })

  it('a rotina personalizada substitui a padrão só para aquele astronauta', () => {
    const mine = { id: 'full-a', astronautId: 'cristiano', exercises: [{ exerciseId: 'squat', sets: 5, reps: 5, restSec: 120, loadKg: 60 }] }
    const other = { id: 'full-b', astronautId: 'mike', exercises: [{ exerciseId: 'plank', sets: 2, reps: 20, restSec: 30, loadKg: 0 }] }
    const out = mergeRoutines(DEFAULT_ROUTINES, [mine, other], 'cristiano')
    expect(out).toHaveLength(2)
    expect(out[0]).toMatchObject({ id: 'full-a', customized: true })
    expect(out[0].exercises[0].sets).toBe(5)
    expect(out[1]).toBe(DEFAULT_ROUTINES[1])
    expect(mergeRoutines(DEFAULT_ROUTINES, [mine], 'ruan')).toEqual(DEFAULT_ROUTINES)
  })

  it('rotinas novas do astronauta entram no fim da lista', () => {
    const extra = { id: 'minha', astronautId: 'cristiano', exercises: [{ exerciseId: 'press', sets: 3, reps: 8, restSec: 60, loadKg: 15 }] }
    const out = mergeRoutines(DEFAULT_ROUTINES, [extra], 'cristiano')
    expect(out.map((r) => r.id)).toEqual(['full-a', 'full-b', 'minha'])
  })
})
