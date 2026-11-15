import { describe, it, expect } from 'vitest'
import { LOW_BATTERY, crewStatus, crewSummary, escalations, latestStatuses, readiness, worstStatus } from './captain.js'
import { createMeasure, statusAtSave } from './measures.js'

const at = (d, h = 7) => `${d}T${String(h).padStart(2, '0')}:00:00`
const day = (crew, kind, date, status, h) => ({ crew, kind, at: at(date, h), status })

describe('Painel do capitão: estado', () => {
  it('o pior estado vence e vazio é normal (RN02)', () => {
    expect(worstStatus(['normal', 'warning'])).toBe('warning')
    expect(worstStatus(['normal', 'critical', 'warning'])).toBe('critical')
    expect(worstStatus([])).toBe('normal')
    expect(worstStatus([null, undefined, 'x'])).toBe('normal')
  })

  it('usa o último estado de cada tipo, e o anel entra no pior estado', () => {
    const days = [day('ruan', 'pa', '2026-11-13', 'critical'), day('ruan', 'pa', '2026-11-14', 'normal'), day('ruan', 'gl', '2026-11-14', 'warning')]
    expect(latestStatuses(days, 'ruan')).toEqual({ pa: 'normal', gl: 'warning' })
    expect(crewStatus(days, 'ruan')).toBe('warning')
    expect(crewStatus(days, 'ruan', 'critical')).toBe('critical')
    expect(crewStatus([], 'rita')).toBe('normal')
  })

  it('registros antigos sem estado não contam', () => {
    expect(crewStatus([{ crew: 'a', kind: 'pa', at: at('2026-11-14') }], 'a')).toBe('normal')
  })
})

describe('Painel do capitão: fila de decisão (RN03, RN04)', () => {
  it('um crítico isolado ainda pede re-medição e não escala', () => {
    expect(escalations([day('ruan', 'pa', '2026-11-15', 'critical')], ['ruan'])).toEqual([])
  })

  it('dois críticos seguidos escalam, com id estável e sem valores', () => {
    const days = [day('ruan', 'pa', '2026-11-14', 'critical'), day('ruan', 'pa', '2026-11-15', 'critical')]
    const q = escalations(days, ['ruan', 'rita'])
    expect(q).toHaveLength(1)
    expect(q[0]).toEqual({ id: 'ruan:pa:2026-11-15T07:00:00', crew: 'ruan', kind: 'pa', at: '2026-11-15T07:00:00' })
    expect(Object.keys(q[0])).not.toContain('value')
  })

  it('a re-medição normal desfaz a escalação', () => {
    const days = [day('ruan', 'pa', '2026-11-14', 'critical'), day('ruan', 'pa', '2026-11-15', 'normal')]
    expect(escalations(days, ['ruan'])).toEqual([])
  })

  it('atenção só registra, nunca escala', () => {
    const days = [day('a', 'gl', '2026-11-14', 'warning'), day('a', 'gl', '2026-11-15', 'warning')]
    expect(escalations(days, ['a'])).toEqual([])
  })

  it('o estado é gravado no registro pela média dos últimos 3', () => {
    const m = (id, sys, dia, d) => createMeasure({ id, crew: 'ruan', kind: 'pa', at: at(d), value: { sys, dia } })
    expect(statusAtSave([], m('1', 118, 76, '2026-11-13'))).toBe('normal')
    expect(statusAtSave([m('1', 150, 95, '2026-11-13'), m('2', 152, 96, '2026-11-14')], m('3', 151, 96, '2026-11-15'))).toBe('critical')
    expect(statusAtSave([m('x', 150, 95, '2026-11-13')], { ...m('y', 118, 76, '2026-11-14'), crew: 'rita' })).toBe('normal')
  })
})

describe('Painel do capitão: resumo e prontidão', () => {
  const days = [day('ruan', 'pa', '2026-11-15', 'critical'), day('ruan', 'gl', '2026-11-15', 'normal'), day('rita', 'pa', '2026-11-14', 'normal')]
  const workouts = [{ astronautId: 'rita', date: '2026-11-15', sets: [{ done: true }] }, { astronautId: 'ruan', date: '2026-11-15', sets: [{ done: false }] }]
  const s = crewSummary({ days, workouts, crewKeys: ['ruan', 'rita', 'mike'], today: '2026-11-15', ring: { mike: { battery: LOW_BATTERY - 1 }, rita: { battery: 90 } } })

  it('conta as medidas de hoje, o treino e o anel de cada um', () => {
    expect(s.find((x) => x.key === 'ruan')).toMatchObject({ status: 'critical', measures: 2, trained: false, charging: false, battery: null })
    expect(s.find((x) => x.key === 'rita')).toMatchObject({ status: 'normal', measures: 0, trained: true, battery: 90 })
    expect(s.find((x) => x.key === 'mike')).toMatchObject({ charging: true })
  })

  it('a prontidão conta aptos, em atenção e anéis carregando', () => {
    expect(readiness(s)).toEqual({ total: 3, fit: 2, attention: 0, charging: 1 })
  })
})
