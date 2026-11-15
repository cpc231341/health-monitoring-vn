// Medidas manuais (pressão, glicose em jejum e massa): validação, faixa, média dos últimos 3 registros,
// referência de massa, tendência de 7 dias e sequência de dias completos.
// Funções puras, sem acesso a disco. Faixas ilustrativas, a validar por profissional de saúde.
import { addDays, computeStreak, toDateStr } from './training.js'

export const KINDS = ['pa', 'gl', 'kg']
export const SOURCES = ['manual', 'ring']
// Aparelhos por medida (ids de src/renderer/data/equipamentos.js) e "other" para sem aparelho.
export const DEVICES = {
  pa: ['tempus', 'finapres', 'biomonitor', 'other'],
  gl: ['istat', 'cgm', 'other'],
  kg: ['slammd', 'bmmd', 'other']
}
// Limites físicos: valores fora daqui são erro de digitação e são recusados.
export const LIMITS = { sys: [60, 260], dia: [30, 160], gl: [20, 600], kg: [30, 250] }
// Quantos registros entram na média que define o estado (uma leitura ruim isolada não assusta).
export const AVERAGE_OF = 3
export const BASELINE_DAYS = 7
export const MASS_WARN_PCT = -1.5
export const MASS_CRIT_PCT = -3
// Horário sugerido de cada medida (lembrete). Pressão e glicose pela manhã; massa antes do café.
export const REMINDER_TIME = { pa: '07:00', gl: '07:10', kg: '07:20' }

const inRange = (v, [lo, hi]) => Number.isFinite(v) && v >= lo && v <= hi
const round1 = (n) => Math.round(n * 10) / 10

// ---------- modelo e validação ----------

export function createMeasure({ id, crew, kind, at, value, device = 'other', source = 'manual', note = '' }) {
  return { id: id || `m_${Date.now()}`, crew, kind, at: at || new Date().toISOString(), value, device, source, note }
}

export function validateMeasure(m) {
  const errors = []
  if (!m || typeof m.crew !== 'string' || !m.crew) errors.push('crew')
  if (!KINDS.includes(m?.kind)) {
    errors.push('kind')
    return { valid: false, errors }
  }
  if (!m.at || Number.isNaN(Date.parse(m.at))) errors.push('at')
  if (!DEVICES[m.kind].includes(m.device)) errors.push('device')
  if (!SOURCES.includes(m.source)) errors.push('source')
  const v = m.value || {}
  if (m.kind === 'pa') {
    if (!inRange(v.sys, LIMITS.sys)) errors.push('sys')
    if (!inRange(v.dia, LIMITS.dia)) errors.push('dia')
    if (!errors.includes('sys') && !errors.includes('dia') && v.sys <= v.dia) errors.push('sysDia')
  } else if (m.kind === 'gl') {
    if (!inRange(v.mgdl, LIMITS.gl)) errors.push('gl')
  } else if (!inRange(v.kg, LIMITS.kg)) {
    errors.push('kg')
  }
  return { valid: errors.length === 0, errors }
}

// ---------- faixa de uma leitura ----------

/** 'normal' | 'warning' | 'critical'. Para massa, `pct` é a variação sobre a referência. */
export function classifyReading(kind, value, pct = null) {
  if (kind === 'pa') {
    const { sys, dia } = value
    if (sys >= 140 || dia >= 90 || sys < 90 || dia < 60) return 'critical'
    if (sys >= 130 || dia >= 85) return 'warning'
    return 'normal'
  }
  if (kind === 'gl') {
    const g = value.mgdl
    if (g >= 126 || g < 70) return 'critical'
    if (g >= 100) return 'warning'
    return 'normal'
  }
  if (pct == null) return 'normal'
  if (pct < MASS_CRIT_PCT) return 'critical'
  if (pct < MASS_WARN_PCT) return 'warning'
  return 'normal'
}

// ---------- séries e médias ----------

const dateOf = (m) => toDateStr(new Date(m.at))
const byTime = (a, b) => Date.parse(a.at) - Date.parse(b.at)
const ofKind = (measures, kind) => (measures || []).filter((m) => m.kind === kind).sort(byTime)

/** Média dos últimos n registros (pressão: sys e dia; demais: um número). null sem registros. */
export function recentAverage(measures, kind, n = AVERAGE_OF) {
  const last = ofKind(measures, kind).slice(-n)
  if (last.length === 0) return null
  const mean = (f) => last.reduce((s, m) => s + f(m), 0) / last.length
  if (kind === 'pa') return { sys: Math.round(mean((m) => m.value.sys)), dia: Math.round(mean((m) => m.value.dia)), count: last.length }
  if (kind === 'gl') return { mgdl: Math.round(mean((m) => m.value.mgdl)), count: last.length }
  return { kg: round1(mean((m) => m.value.kg)), count: last.length }
}

/** Referência de massa: média dos registros dos primeiros 7 dias. null sem registros. */
export function massBaseline(measures) {
  const kgs = ofKind(measures, 'kg')
  if (kgs.length === 0) return null
  const first = dateOf(kgs[0])
  const last = addDays(first, BASELINE_DAYS - 1)
  const early = kgs.filter((m) => dateOf(m) <= last)
  return round1(early.reduce((s, m) => s + m.value.kg, 0) / early.length)
}

/** Estado final de uma medida: faixa da média dos últimos 3 registros (massa, sobre a referência). */
export function assess(measures, kind) {
  const avg = recentAverage(measures, kind)
  if (!avg) return { status: null, avg: null, pct: null, baseline: null }
  if (kind !== 'kg') return { status: classifyReading(kind, avg), avg, pct: null, baseline: null }
  const baseline = massBaseline(measures)
  const pct = baseline ? round1(((avg.kg - baseline) / baseline) * 100) : null
  return { status: classifyReading('kg', avg, pct), avg, pct, baseline }
}

/** Estado de uma medida no momento do registro: guardado junto dela, para o capitão ver o estado sem ver o valor. */
export function statusAtSave(previous, measure) {
  return assess([...(previous || []).filter((m) => m.crew === measure.crew), measure], measure.kind).status
}

/** Média por dia dos últimos `days` dias, terminando em `today` (null = sem registro no dia). */
export function trend(measures, kind, days, today) {
  const rows = []
  for (let i = days - 1; i >= 0; i--) rows.push({ date: addDays(today, -i), value: null })
  const per = {}
  for (const m of ofKind(measures, kind)) (per[dateOf(m)] ||= []).push(m)
  for (const row of rows) {
    const list = per[row.date]
    if (!list) continue
    const mean = (f) => list.reduce((s, m) => s + f(m), 0) / list.length
    row.value = kind === 'pa' ? { sys: Math.round(mean((m) => m.value.sys)), dia: Math.round(mean((m) => m.value.dia)) } : kind === 'gl' ? Math.round(mean((m) => m.value.mgdl)) : round1(mean((m) => m.value.kg))
  }
  return rows
}

// ---------- dia a dia ----------

/** Quais medidas um tripulante registrou em uma data. */
export function registeredOn(measures, crew, date) {
  return new Set((measures || []).filter((m) => m.crew === crew && dateOf(m) === date).map((m) => m.kind))
}

/** Quantas medidas (tripulante × tipo) foram registradas na data: só a contagem do time, sem nomes nem valores. */
export function teamCount(measures, date) {
  const seen = new Set()
  for (const m of measures || []) if (dateOf(m) === date) seen.add(`${m.crew}:${m.kind}`)
  return seen.size
}

/** Dias desde o primeiro registro (ou só hoje), com quantas das 3 medidas foram registradas. */
export function completeDays(measures, crew, today) {
  const mine = (measures || []).filter((m) => m.crew === crew)
  const first = mine.length ? dateOf(mine.slice().sort(byTime)[0]) : today
  const days = []
  for (let d = first; d <= today; d = addDays(d, 1)) {
    const n = registeredOn(mine, crew, d).size
    days.push({ date: d, count: n, trained: n === KINDS.length, excuse: null })
  }
  return days
}

/** Dias seguidos com as 3 medidas registradas. Hoje ainda em aberto não quebra a sequência. */
export function measureStreak(measures, crew, today) {
  return computeStreak(completeDays(measures, crew, today))
}

/** A medida está atrasada? (já passou do horário sugerido e ainda não foi registrada hoje) */
export function isDue(kind, minutesNow, registeredKinds) {
  const [h, m] = REMINDER_TIME[kind].split(':').map(Number)
  return minutesNow >= h * 60 + m && !registeredKinds.has(kind)
}
