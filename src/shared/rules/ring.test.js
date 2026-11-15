import { describe, it, expect } from 'vitest'
import { SYNC_STEPS, ringState, stepOutcome } from './ring.js'
import { LOW_BATTERY } from './captain.js'

describe('Sincronização do anel (RF27)', () => {
  it('bateria baixa significa anel carregando; o resto, conectado', () => {
    expect(ringState(LOW_BATTERY - 1)).toBe('charging')
    expect(ringState(0)).toBe('charging')
    expect(ringState(LOW_BATTERY)).toBe('connected')
    expect(ringState(90)).toBe('connected')
    expect(ringState(null)).toBe('connected')
  })

  it('anel carregando avisa nos passos de achar e baixar, mas conferir as medidas segue normal', () => {
    expect(SYNC_STEPS).toEqual(['find', 'fetch', 'check'])
    expect(SYNC_STEPS.map((s) => stepOutcome(s, 'charging'))).toEqual(['warn', 'warn', 'ok'])
    expect(SYNC_STEPS.map((s) => stepOutcome(s, 'connected'))).toEqual(['ok', 'ok', 'ok'])
  })
})
