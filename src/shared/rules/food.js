// Alimentação a bordo (cardápio de espaço profundo): disponibilidade por fase, contadores do dia,
// estoque coletivo e avisos. Funções puras, sem acesso a disco.
// O diário registra a realidade: nada aqui bloqueia um registro, só devolve avisos.

export const PHASES = ['lancamento', 'orbita', 'reentrada']
export const MEALS = ['cafe', 'almoco', 'jantar', 'lanche']
export const CATEGORIES = ['principal', 'acompanhamento', 'cafe-lanche', 'sobremesa', 'bebida']
export const PREPARATIONS = ['pronto', 'agua', 'aquece']

// RN15: refeições programadas por dia (o café, o almoço e o jantar valem uma vez; o lanche, até duas).
export const MEAL_MAX_ENTRIES = { cafe: 1, almoco: 1, jantar: 1, lanche: 2 }
export const SCHEDULED_MEALS = ['cafe', 'almoco', 'jantar']

// RN17: teto de porções por categoria em cada refeição (proposta do time, a validar com nutrição).
// Categoria ausente = não combina com a refeição (o aviso vem da RN16).
export const MEAL_CAPS = {
  cafe: { 'cafe-lanche': 3, acompanhamento: 1, sobremesa: 1, bebida: 2 },
  almoco: { principal: 1, acompanhamento: 2, sobremesa: 1, bebida: 2 },
  jantar: { principal: 1, acompanhamento: 2, sobremesa: 1, bebida: 2 },
  lanche: { 'cafe-lanche': 2, acompanhamento: 1, sobremesa: 1, bebida: 1 }
}

// Valores provisórios: dependem das perguntas 2, 3 e 4 do plano (bebidas, sobremesas e estoque).
export const FOOD_LIMITS = {
  flavoredDrinksPerDay: 2,
  dessertsPerDay: 2,
  dessertStreakDays: 3,
  teamDessertMin: 5
}

// No lançamento e na reentrada o dispensador de água fica desligado e só valem itens prontos.
const RESTRICTED_PHASES = ['lancamento', 'reentrada']
const BREAD_RE = /\b(p[aã]o|p[aã]es|bread|pan|brot|pain|pane|パン)\b/i

export function isBread(text) {
  return BREAD_RE.test(String(text || '').normalize('NFC'))
}

// ---------- estoque ----------

/** Porções consumidas por item, somando os registros de toda a tripulação. */
export function consumption(logs) {
  const out = {}
  for (const log of logs || []) {
    for (const it of log.itens || []) {
      if (it.itemId) out[it.itemId] = (out[it.itemId] || 0) + (it.porcoes || 0)
    }
  }
  return out
}

/** Estoque restante por item (null = sem controle de estoque). */
export function remainingStock(catalog, logs) {
  const used = consumption(logs)
  return Object.fromEntries(catalog.map((i) => [i.id, i.estoqueInicial == null ? null : Math.max(0, i.estoqueInicial - (used[i.id] || 0))]))
}

/** Soma do estoque restante e inicial de uma categoria (só itens com estoque controlado). */
export function categoryStock(catalog, logs, category) {
  const rest = remainingStock(catalog, logs)
  const items = catalog.filter((i) => i.categoria === category && i.estoqueInicial != null)
  return {
    left: items.reduce((s, i) => s + rest[i.id], 0),
    total: items.reduce((s, i) => s + i.estoqueInicial, 0)
  }
}

export function teamDessertsLow(catalog, logs, min = FOOD_LIMITS.teamDessertMin) {
  const { left, total } = categoryStock(catalog, logs, 'sobremesa')
  return total > 0 && left < min
}

// ---------- disponibilidade ----------

/** Motivos para um item estar indisponível na fase e na refeição (vazio = disponível). */
export function unavailableReasons(item, phase, left, meal) {
  const reasons = []
  if (RESTRICTED_PHASES.includes(phase)) {
    if (item.preparo === 'agua') reasons.push('needs-water')
    if (item.preparo === 'aquece') reasons.push('needs-heat')
  }
  if (meal && item.refeicoes && !item.refeicoes.includes(meal)) reasons.push('wrong-meal')
  if (left === 0) reasons.push('out-of-stock')
  return reasons
}

export function availableItems(catalog, phase, logs, meal) {
  const rest = remainingStock(catalog, logs)
  return catalog.map((item) => {
    const reasons = unavailableReasons(item, phase, rest[item.id], meal)
    return { item, available: reasons.length === 0, reasons, left: rest[item.id] }
  })
}

// ---------- contadores do dia ----------

const byId = (catalog) => Object.fromEntries(catalog.map((i) => [i.id, i]))

function sumPortions(logs, catalog, pred) {
  const items = byId(catalog)
  let n = 0
  for (const log of logs) {
    for (const it of log.itens || []) {
      const item = items[it.itemId]
      if (item && pred(item)) n += it.porcoes || 0
    }
  }
  return n
}

/** Contadores de um tripulante em um dia da missão, calculados a partir dos registros. */
export function dayCounters(logs, catalog, { tripulante, diaMissao }) {
  const mine = (logs || []).filter((l) => l.tripulante === tripulante && l.diaMissao === diaMissao)
  return {
    registros: mine.length,
    refeicoes: new Set(mine.map((l) => l.refeicao)).size,
    bebidasSaborizadas: sumPortions(mine, catalog, (i) => i.saborizada),
    sobremesas: sumPortions(mine, catalog, (i) => i.categoria === 'sobremesa')
  }
}

/** Sobremesas por dia da missão de um tripulante. */
export function dessertsByDay(logs, catalog, tripulante) {
  const out = {}
  for (const log of (logs || []).filter((l) => l.tripulante === tripulante)) {
    out[log.diaMissao] = (out[log.diaMissao] || 0) + sumPortions([log], catalog, (i) => i.categoria === 'sobremesa')
  }
  return out
}

/** Dias seguidos acima do limite, terminando em `day` (inclusive). */
export function daysAboveLimit(perDay, day, limit = FOOD_LIMITS.dessertsPerDay) {
  let n = 0
  for (let d = day; (perDay[d] || 0) > limit; d--) n += 1
  return n
}

// ---------- avisos ----------

const warn = (code, level, params = {}) => ({ code, level, params })

/** Aviso informativo ao abrir o seletor de sobremesas. */
export function dessertLeftNotice(counters, max = FOOD_LIMITS.dessertsPerDay) {
  return warn('dessert-left', 'info', { n: counters.sobremesas, max })
}

/** Avisos da própria refeição (RN15): sem refeição programada em lançamento/reentrada e registros repetidos. */
export function mealNotices(meal, phase, ctx) {
  const out = []
  if (!meal) return out
  if (RESTRICTED_PHASES.includes(phase) && SCHEDULED_MEALS.includes(meal)) out.push(warn('meal-not-scheduled', 'warning'))
  const mine = (ctx.myLogs || ctx.logs || []).filter((l) => l.tripulante === ctx.tripulante && l.diaMissao === ctx.diaMissao && l.refeicao === meal)
  const max = MEAL_MAX_ENTRIES[meal]
  if (max && mine.length >= max) out.push(warn('meal-duplicate', 'warning', { meal, max }))
  return out
}

/**
 * Avisos de um registro, dados os contadores de ANTES dele.
 * ctx: { catalog, logs (todos), myLogs, tripulante, diaMissao, meal }. Nunca bloqueia.
 */
export function evaluateLog(items, phase, counters, ctx) {
  const out = [...mealNotices(ctx.meal, phase, ctx)]
  const idx = byId(ctx.catalog)
  const perCategory = {}
  const rest = remainingStock(ctx.catalog, ctx.logs)
  let drinks = 0
  let desserts = 0

  for (const it of items) {
    if (it.livre) {
      if (isBread(it.livre)) out.push(warn('bread', 'warning'))
      continue
    }
    const item = idx[it.itemId]
    if (!item) continue
    if (item.saborizada) drinks += it.porcoes
    perCategory[item.categoria] = (perCategory[item.categoria] || 0) + it.porcoes
    if (item.categoria === 'sobremesa') desserts += it.porcoes
    const reasons = unavailableReasons(item, phase, rest[item.id], ctx.meal)
    if (reasons.length > 0) out.push(warn('out-of-rule', 'warning', { item: item.id, reason: reasons[0] }))
  }

  // RN17: teto por categoria na refeição
  const caps = MEAL_CAPS[ctx.meal]
  if (caps) {
    for (const [cat, n] of Object.entries(perCategory)) {
      if (caps[cat] !== undefined && n > caps[cat]) out.push(warn('meal-over-cap', 'warning', { category: cat, max: caps[cat] }))
    }
  }

  if (drinks > 0) {
    const total = counters.bebidasSaborizadas + drinks
    if (total > FOOD_LIMITS.flavoredDrinksPerDay) out.push(warn('drink-over', 'warning', { max: FOOD_LIMITS.flavoredDrinksPerDay }))
    else if (total === FOOD_LIMITS.flavoredDrinksPerDay) out.push(warn('drink-last', 'info'))
  }

  if (desserts > 0) {
    const total = counters.sobremesas + desserts
    const max = FOOD_LIMITS.dessertsPerDay
    if (total > max) {
      out.push(warn('dessert-over', 'warning'))
      const perDay = dessertsByDay(ctx.myLogs || ctx.logs, ctx.catalog, ctx.tripulante)
      perDay[ctx.diaMissao] = total
      if (daysAboveLimit(perDay, ctx.diaMissao, max) >= FOOD_LIMITS.dessertStreakDays) out.push(warn('dessert-streak', 'warning'))
    } else if (total === max) {
      out.push(warn('dessert-last', 'info'))
    }
    if (teamDessertsLow(ctx.catalog, ctx.logs)) out.push(warn('team-stock-low', 'warning'))
  }
  return dedupe(out)
}

function dedupe(list) {
  const seen = new Set()
  return list.filter((w) => {
    const k = `${w.code}:${w.params.item || ''}:${w.params.category || ''}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// ---------- registro ----------

export function createLog({ id, tripulante, diaMissao, hora, refeicao, fase, itens, nota = '', avisos = [] }) {
  return { id: id || String(Date.now()), tripulante, diaMissao, hora, refeicao, fase, itens, nota, avisos }
}

export function validateLog(log) {
  const errors = []
  if (!log || typeof log.tripulante !== 'string' || !log.tripulante) errors.push('tripulante')
  if (!Number.isInteger(log?.diaMissao) || log.diaMissao < 0) errors.push('diaMissao')
  if (!/^\d{2}:\d{2}$/.test(log?.hora || '')) errors.push('hora')
  if (!MEALS.includes(log?.refeicao)) errors.push('refeicao')
  if (!PHASES.includes(log?.fase)) errors.push('fase')
  if (!Array.isArray(log?.itens) || log.itens.length === 0) {
    errors.push('itens')
  } else {
    log.itens.forEach((it, i) => {
      const hasItem = typeof it.itemId === 'string' && it.itemId
      const hasFree = typeof it.livre === 'string' && it.livre.trim()
      if (!hasItem && !hasFree) errors.push(`itens[${i}]`)
      if (!Number.isInteger(it.porcoes) || it.porcoes < 1 || it.porcoes > 20) errors.push(`itens[${i}].porcoes`)
    })
  }
  return { valid: errors.length === 0, errors }
}

/** Códigos de aviso que viram notificação (os informativos ficam só na tela). */
export const NOTIFY_CODES = ['dessert-over', 'dessert-streak', 'drink-over', 'team-stock-low']
