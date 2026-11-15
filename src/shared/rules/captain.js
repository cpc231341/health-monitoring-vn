// Painel do capitão: estado de cada tripulante, sem valores pessoais (RN06 nível "Comandante").
// Críticos escalam ao capitão depois da re-medição (RN03, RN04). Funções puras sobre {crew, kind, at, status}.
import { KINDS } from './measures.js'
import { toDateStr } from './training.js'

export const STATUS_RANK = { normal: 0, warning: 1, critical: 2 }
// Bateria do anel abaixo disso conta como "anel carregando".
export const LOW_BATTERY = 20
// RN03: crítico só escala se a leitura seguinte (a re-medição) também for crítica.
export const ESCALATE_AFTER = 2

const dateOf = (iso) => toDateStr(new Date(iso))

/** O pior estado da lista (RN02). Vazio ou sem estado = normal. */
export function worstStatus(list) {
  return (list || []).filter((s) => s in STATUS_RANK).reduce((w, s) => (STATUS_RANK[s] > STATUS_RANK[w] ? s : w), 'normal')
}

const ofCrew = (days, crew) => (days || []).filter((d) => d.crew === crew).sort((a, b) => String(a.at).localeCompare(String(b.at)))

/** Último estado de cada tipo de medida do tripulante. */
export function latestStatuses(days, crew) {
  const out = {}
  for (const d of ofCrew(days, crew)) if (KINDS.includes(d.kind) && d.status) out[d.kind] = d.status
  return out
}

/** Estado geral do tripulante: pior entre o anel e o último estado de cada medida manual. */
export function crewStatus(days, crew, ringStatus = 'normal') {
  return worstStatus([ringStatus, ...Object.values(latestStatuses(days, crew))])
}

/** Fila de decisão (RN04): medidas cujas últimas ESCALATE_AFTER leituras foram críticas. Sem valores. */
export function escalations(days, crewKeys) {
  const out = []
  for (const crew of crewKeys) {
    for (const kind of KINDS) {
      const list = ofCrew(days, crew).filter((d) => d.kind === kind)
      const last = list.slice(-ESCALATE_AFTER)
      if (last.length === ESCALATE_AFTER && last.every((d) => d.status === 'critical')) {
        out.push({ id: `${crew}:${kind}:${last[last.length - 1].at}`, crew, kind, at: last[last.length - 1].at })
      }
    }
  }
  return out.sort((a, b) => String(b.at).localeCompare(String(a.at)))
}

/** Resumo por tripulante: estado, medidas do dia (n de 3), treino de hoje, anel. ring: { chave: { status, battery } } */
export function crewSummary({ days, workouts, crewKeys, today, ring = {} }) {
  return crewKeys.map((key) => {
    const r = ring[key] || {}
    const doneToday = new Set(ofCrew(days, key).filter((d) => dateOf(d.at) === today).map((d) => d.kind))
    return {
      key,
      status: crewStatus(days, key, r.status),
      measures: doneToday.size,
      trained: (workouts || []).some((w) => w.astronautId === key && w.date === today && (w.sets || []).some((s) => s.done)),
      battery: r.battery ?? null,
      charging: r.battery != null && r.battery < LOW_BATTERY
    }
  })
}

/** Prontidão: quantos estão aptos (sem estado crítico) e quantos anéis estão carregando. */
export function readiness(summaries) {
  return {
    total: summaries.length,
    fit: summaries.filter((s) => s.status !== 'critical').length,
    attention: summaries.filter((s) => s.status === 'warning').length,
    charging: summaries.filter((s) => s.charging).length
  }
}
