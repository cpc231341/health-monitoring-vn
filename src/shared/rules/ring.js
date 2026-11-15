// Estado do anel na sincronização (RF27). Anel com a bateria abaixo do mínimo está na base carregando:
// não envia leituras novas, e isso não quebra a sequência de hábitos (RN14).
import { LOW_BATTERY } from './captain.js'

// Passos mostrados ao sincronizar, na ordem.
export const SYNC_STEPS = ['find', 'fetch', 'check']

/** 'charging' (na base, sem leituras novas) ou 'connected'. battery: 0 a 100, ou null se não houver anel. */
export function ringState(battery) {
  return battery != null && battery < LOW_BATTERY ? 'charging' : 'connected'
}

/** Resultado de cada passo para o estado final: ok, ou 'warn' quando o anel não pôde enviar leituras. */
export function stepOutcome(step, state) {
  if (state === 'charging' && (step === 'find' || step === 'fetch')) return 'warn'
  return 'ok'
}
