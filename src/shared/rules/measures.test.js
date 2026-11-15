import { describe, it, expect } from 'vitest'
import {
  LIMITS,
  assess,
  classifyReading,
  completeDays,
  createMeasure,
  isDue,
  massBaseline,
  measureStreak,
  recentAverage,
  registeredOn,
  teamCount,
  trend,
  validateMeasure
} from './measures.js'

let n = 0
const at = (date, h = 7) => `${date}T${String(h).padStart(2, '0')}:00:00`
const pa = (date, sys, dia, over = {}) => createMeasure({ id: `a${n++}`, crew: 'rita', kind: 'pa', at: at(date), value: { sys, dia }, device: 'tempus', ...over })
const gl = (date, mgdl, over = {}) => createMeasure({ id: `g${n++}`, crew: 'rita', kind: 'gl', at: at(date), value: { mgdl }, device: 'istat', ...over })
const kg = (date, v, over = {}) => createMeasure({ id: `k${n++}`, crew: 'rita', kind: 'kg', at: at(date), value: { kg: v }, device: 'slammd', ...over })

describe('Medidas: validação', () => {
  it('aceita leituras normais', () => {
    expect(validateMeasure(pa('2026-11-15', 118, 76))).toEqual({ valid: true, errors: [] })
    expect(validateMeasure(gl('2026-11-15', 94)).valid).toBe(true)
    expect(validateMeasure(kg('2026-11-15', 74.2)).valid).toBe(true)
  })

  it('recusa valores fisicamente impossíveis (erro de digitação)', () => {
    expect(validateMeasure(pa('2026-11-15', 300, 80)).errors).toEqual(['sys'])
    expect(validateMeasure(pa('2026-11-15', 120, 10)).errors).toEqual(['dia'])
    expect(validateMeasure(gl('2026-11-15', 5)).errors).toEqual(['gl'])
    expect(validateMeasure(gl('2026-11-15', 900)).errors).toEqual(['gl'])
    expect(validateMeasure(kg('2026-11-15', 5)).errors).toEqual(['kg'])
    expect(validateMeasure(kg('2026-11-15', 400)).errors).toEqual(['kg'])
    expect(validateMeasure(kg('2026-11-15', NaN)).errors).toEqual(['kg'])
    expect(LIMITS.sys).toEqual([60, 260])
  })

  it('a sistólica tem de ser maior que a diastólica', () => {
    expect(validateMeasure(pa('2026-11-15', 80, 90)).errors).toEqual(['sysDia'])
    expect(validateMeasure(pa('2026-11-15', 90, 90)).errors).toEqual(['sysDia'])
  })

  it('confere tripulante, tipo, data, aparelho e origem', () => {
    expect(validateMeasure(null).valid).toBe(false)
    expect(validateMeasure({ ...pa('2026-11-15', 118, 76), kind: 'xx' }).errors).toContain('kind')
    expect(validateMeasure({ ...pa('2026-11-15', 118, 76), crew: '' }).errors).toContain('crew')
    expect(validateMeasure({ ...pa('2026-11-15', 118, 76), at: 'ontem' }).errors).toContain('at')
    expect(validateMeasure({ ...pa('2026-11-15', 118, 76), device: 'istat' }).errors).toContain('device')
    expect(validateMeasure({ ...gl('2026-11-15', 90), device: 'cgm' }).valid).toBe(true)
    expect(validateMeasure({ ...pa('2026-11-15', 118, 76), source: 'x' }).errors).toContain('source')
  })
})

describe('Medidas: faixas', () => {
  it('pressão: normal abaixo de 130/85, atenção 130–139/85–89, fora 140/90 ou mais, ou abaixo de 90/60', () => {
    expect(classifyReading('pa', { sys: 118, dia: 76 })).toBe('normal')
    expect(classifyReading('pa', { sys: 129, dia: 84 })).toBe('normal')
    expect(classifyReading('pa', { sys: 130, dia: 80 })).toBe('warning')
    expect(classifyReading('pa', { sys: 120, dia: 85 })).toBe('warning')
    expect(classifyReading('pa', { sys: 139, dia: 89 })).toBe('warning')
    expect(classifyReading('pa', { sys: 140, dia: 80 })).toBe('critical')
    expect(classifyReading('pa', { sys: 120, dia: 90 })).toBe('critical')
    expect(classifyReading('pa', { sys: 89, dia: 65 })).toBe('critical')
    expect(classifyReading('pa', { sys: 100, dia: 59 })).toBe('critical')
    expect(classifyReading('pa', { sys: 90, dia: 60 })).toBe('normal')
  })

  it('glicose em jejum: 70–99 normal, 100–125 atenção, 126 ou mais ou abaixo de 70 fora', () => {
    expect(classifyReading('gl', { mgdl: 70 })).toBe('normal')
    expect(classifyReading('gl', { mgdl: 99 })).toBe('normal')
    expect(classifyReading('gl', { mgdl: 100 })).toBe('warning')
    expect(classifyReading('gl', { mgdl: 125 })).toBe('warning')
    expect(classifyReading('gl', { mgdl: 126 })).toBe('critical')
    expect(classifyReading('gl', { mgdl: 69 })).toBe('critical')
  })

  it('massa: até −1,5% normal, −1,5% a −3% atenção, queda maior que 3% fora', () => {
    expect(classifyReading('kg', { kg: 74 }, 0)).toBe('normal')
    expect(classifyReading('kg', { kg: 74 }, 2)).toBe('normal')
    expect(classifyReading('kg', { kg: 74 }, -1.5)).toBe('normal')
    expect(classifyReading('kg', { kg: 74 }, -1.6)).toBe('warning')
    expect(classifyReading('kg', { kg: 74 }, -3)).toBe('warning')
    expect(classifyReading('kg', { kg: 74 }, -3.1)).toBe('critical')
    expect(classifyReading('kg', { kg: 74 }, null)).toBe('normal')
  })
})

describe('Medidas: estado pela média dos últimos 3 registros', () => {
  it('uma leitura ruim isolada não assusta', () => {
    const ms = [pa('2026-11-12', 118, 76), pa('2026-11-13', 120, 78), pa('2026-11-14', 119, 77), pa('2026-11-15', 150, 95)]
    const r = assess(ms, 'pa')
    expect(r.avg).toEqual({ sys: 130, dia: 83, count: 3 })
    expect(r.status).toBe('warning')
    // com a leitura ruim sozinha, o estado seria crítico
    expect(classifyReading('pa', { sys: 150, dia: 95 })).toBe('critical')
  })

  it('usa só os 3 últimos, em ordem de horário', () => {
    const ms = [gl('2026-11-15', 90), gl('2026-11-10', 200), gl('2026-11-13', 92), gl('2026-11-14', 94)]
    expect(recentAverage(ms, 'gl')).toEqual({ mgdl: 92, count: 3 })
    expect(assess(ms, 'gl').status).toBe('normal')
  })

  it('sem registros não há estado', () => {
    expect(assess([], 'gl')).toEqual({ status: null, avg: null, pct: null, baseline: null })
    expect(recentAverage([pa('2026-11-15', 118, 76)], 'gl')).toBeNull()
  })

  it('a massa usa a referência dos primeiros 7 dias', () => {
    const ms = [kg('2026-11-01', 74), kg('2026-11-03', 74.2), kg('2026-11-05', 73.8), kg('2026-11-20', 72), kg('2026-11-21', 72), kg('2026-11-22', 72)]
    expect(massBaseline(ms)).toBe(74)
    const r = assess(ms, 'kg')
    expect(r.avg.kg).toBe(72)
    expect(r.pct).toBe(-2.7)
    expect(r.status).toBe('warning')
    const drop = [...ms.slice(0, 3), kg('2026-11-20', 71), kg('2026-11-21', 71), kg('2026-11-22', 71)]
    expect(assess(drop, 'kg').status).toBe('critical')
  })

  it('a referência ignora registros depois dos primeiros 7 dias', () => {
    const ms = [kg('2026-11-01', 74), kg('2026-11-08', 70)]
    expect(massBaseline(ms)).toBe(74)
    expect(massBaseline([])).toBeNull()
  })
})

describe('Medidas: tendência de 7 dias', () => {
  it('média por dia, com buracos para dias sem registro', () => {
    const ms = [pa('2026-11-13', 120, 80), createMeasure({ crew: 'rita', kind: 'pa', at: at('2026-11-13', 19), value: { sys: 124, dia: 84 }, device: 'tempus' }), pa('2026-11-15', 118, 76)]
    const t = trend(ms, 'pa', 4, '2026-11-15')
    expect(t.map((x) => x.date)).toEqual(['2026-11-12', '2026-11-13', '2026-11-14', '2026-11-15'])
    expect(t.map((x) => x.value)).toEqual([null, { sys: 122, dia: 82 }, null, { sys: 118, dia: 76 }])
  })

  it('glicose e massa em número simples', () => {
    expect(trend([gl('2026-11-15', 94)], 'gl', 1, '2026-11-15')[0].value).toBe(94)
    expect(trend([kg('2026-11-15', 74.24)], 'kg', 1, '2026-11-15')[0].value).toBe(74.2)
  })
})

describe('Medidas: dia a dia, sequência e lembrete', () => {
  const full = (d) => [pa(d, 118, 76), gl(d, 94), kg(d, 74)]

  it('diz o que cada pessoa registrou e conta só o total do time', () => {
    const ms = [...full('2026-11-15'), pa('2026-11-15', 120, 78, { crew: 'mike' }), pa('2026-11-14', 120, 78, { crew: 'mike' })]
    expect([...registeredOn(ms, 'rita', '2026-11-15')].sort()).toEqual(['gl', 'kg', 'pa'])
    expect([...registeredOn(ms, 'mike', '2026-11-15')]).toEqual(['pa'])
    expect(teamCount(ms, '2026-11-15')).toBe(4)
    expect(typeof teamCount(ms, '2026-11-15')).toBe('number')
    expect(teamCount([], '2026-11-15')).toBe(0)
  })

  it('a sequência conta dias com as 3 medidas', () => {
    const ms = [...full('2026-11-13'), ...full('2026-11-14'), ...full('2026-11-15')]
    expect(measureStreak(ms, 'rita', '2026-11-15')).toBe(3)
  })

  it('só 2 de 3 medidas não conta; hoje em aberto não quebra; ontem incompleto quebra', () => {
    const ms = [...full('2026-11-13'), pa('2026-11-14', 118, 76), gl('2026-11-14', 94), ...full('2026-11-15')]
    expect(measureStreak(ms, 'rita', '2026-11-15')).toBe(1)
    const hojeAberto = [...full('2026-11-13'), ...full('2026-11-14'), pa('2026-11-15', 118, 76)]
    expect(measureStreak(hojeAberto, 'rita', '2026-11-15')).toBe(2)
    expect(measureStreak([], 'rita', '2026-11-15')).toBe(0)
  })

  it('cada pessoa tem a sua sequência', () => {
    const ms = [...full('2026-11-15'), ...full('2026-11-14').map((m) => ({ ...m, crew: 'mike' }))]
    expect(measureStreak(ms, 'rita', '2026-11-15')).toBe(1)
    expect(measureStreak(ms, 'mike', '2026-11-15')).toBe(1)
    expect(completeDays(ms, 'mike', '2026-11-15').map((d) => d.count)).toEqual([3, 0])
  })

  it('o lembrete vale a partir do horário e some depois do registro', () => {
    expect(isDue('pa', 6 * 60 + 59, new Set())).toBe(false)
    expect(isDue('pa', 7 * 60, new Set())).toBe(true)
    expect(isDue('pa', 7 * 60, new Set(['pa']))).toBe(false)
    expect(isDue('kg', 7 * 60 + 19, new Set())).toBe(false)
    expect(isDue('kg', 12 * 60, new Set(['pa', 'gl']))).toBe(true)
  })
})
