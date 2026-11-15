import { describe, it, expect } from 'vitest'
import { CARDAPIO } from '../../renderer/data/cardapio.js'
import {
  CATEGORIES,
  FOOD_LIMITS,
  availableItems,
  categoryStock,
  consumption,
  createLog,
  dayCounters,
  daysAboveLimit,
  dessertLeftNotice,
  dessertsByDay,
  evaluateLog,
  isBread,
  mealNotices,
  MEALS,
  MEAL_CAPS,
  remainingStock,
  teamDessertsLow,
  unavailableReasons,
  validateLog
} from './food.js'

const C = CARDAPIO
const log = (over = {}) => createLog({ id: String(Math.random()), tripulante: 'cristiano', diaMissao: 47, hora: '08:00', refeicao: 'cafe', fase: 'orbita', itens: [], ...over })
const p = (itemId, porcoes = 1) => ({ itemId, porcoes })
const ctx = (logs = [], extra = {}) => ({ catalog: C, logs, tripulante: 'cristiano', diaMissao: 47, ...extra })
const counters = (logs, tripulante = 'cristiano', diaMissao = 47) => dayCounters(logs, C, { tripulante, diaMissao })
const codes = (list) => list.map((w) => w.code)

describe('Cardápio', () => {
  it('tem 28 itens, 5 categorias e ids únicos', () => {
    expect(C).toHaveLength(28)
    expect(new Set(C.map((i) => i.id)).size).toBe(28)
    expect(new Set(C.map((i) => i.categoria))).toEqual(new Set(CATEGORIES))
    expect(C.filter((i) => i.categoria === 'bebida')).toHaveLength(6)
    expect(C.filter((i) => i.categoria === 'sobremesa')).toHaveLength(5)
  })
})

describe('Disponibilidade por fase', () => {
  const find = (id) => C.find((i) => i.id === id)

  it('em órbita tudo está disponível', () => {
    expect(availableItems(C, 'orbita', []).every((x) => x.available)).toBe(true)
  })

  it('no lançamento e na reentrada só itens prontos', () => {
    for (const phase of ['lancamento', 'reentrada']) {
      const out = availableItems(C, phase, [])
      for (const x of out) expect(x.available).toBe(x.item.preparo === 'pronto')
    }
  })

  it('explica o motivo: água desligada ou aquecimento', () => {
    expect(unavailableReasons(find('aveia'), 'lancamento', null)).toEqual(['needs-water'])
    expect(unavailableReasons(find('brisket'), 'reentrada', 12)).toEqual(['needs-heat'])
    expect(unavailableReasons(find('amendoas'), 'lancamento', null)).toEqual([])
  })

  it('item esgotado fica indisponível e volta a aparecer ao apagar o registro', () => {
    const logs = [log({ itens: [p('brisket', 12)] })]
    expect(remainingStock(C, logs).brisket).toBe(0)
    const x = availableItems(C, 'orbita', logs).find((y) => y.item.id === 'brisket')
    expect(x).toMatchObject({ available: false, reasons: ['out-of-stock'] })
    expect(availableItems(C, 'orbita', []).find((y) => y.item.id === 'brisket').available).toBe(true)
  })
})

describe('Estoque coletivo', () => {
  it('soma o consumo de toda a tripulação', () => {
    const logs = [log({ itens: [p('bolo', 2)] }), log({ tripulante: 'mike', itens: [p('bolo'), p('pudim')] })]
    expect(consumption(logs)).toEqual({ bolo: 3, pudim: 1 })
    expect(remainingStock(C, logs).bolo).toBe(3)
    expect(remainingStock(C, logs).tortilhas).toBeNull()
  })

  it('soma o estoque por categoria e avisa quando as sobremesas do time acabam', () => {
    expect(categoryStock(C, [], 'sobremesa')).toEqual({ left: 30, total: 30 })
    expect(categoryStock(C, [], 'bebida')).toEqual({ left: 0, total: 0 })
    expect(teamDessertsLow(C, [])).toBe(false)
    const logs = [log({ itens: [p('bolo', 6), p('pudim', 6), p('muffin', 6), p('chocolate', 4)] })]
    expect(categoryStock(C, logs, 'sobremesa').left).toBe(8)
    expect(teamDessertsLow(C, logs, 9)).toBe(true)
    expect(teamDessertsLow(C, logs, 5)).toBe(false)
  })
})

describe('Contadores do dia', () => {
  it('calculam a partir dos registros do tripulante e do dia', () => {
    const logs = [
      log({ refeicao: 'cafe', itens: [p('cafe'), p('aveia')] }),
      log({ refeicao: 'almoco', itens: [p('limonada'), p('bolo')] }),
      log({ refeicao: 'almoco', itens: [p('pudim')] }),
      log({ tripulante: 'mike', itens: [p('cafe')] }),
      log({ diaMissao: 46, itens: [p('cafe')] })
    ]
    expect(counters(logs)).toEqual({ registros: 3, refeicoes: 2, bebidasSaborizadas: 2, sobremesas: 2 })
    expect(counters(logs, 'mike').bebidasSaborizadas).toBe(1)
  })

  it('recalculam ao apagar um registro', () => {
    const a = log({ itens: [p('cafe')] })
    const b = log({ itens: [p('limonada')] })
    expect(counters([a, b]).bebidasSaborizadas).toBe(2)
    expect(counters([a]).bebidasSaborizadas).toBe(1)
  })

  it('conta dias seguidos acima do limite', () => {
    expect(daysAboveLimit({ 45: 3, 46: 4, 47: 3 }, 47, 2)).toBe(3)
    expect(daysAboveLimit({ 45: 3, 46: 2, 47: 3 }, 47, 2)).toBe(1)
    expect(daysAboveLimit({}, 47, 2)).toBe(0)
    const logs = [log({ diaMissao: 46, itens: [p('bolo', 3)] }), log({ itens: [p('bolo')] })]
    expect(dessertsByDay(logs, C, 'cristiano')).toEqual({ 46: 3, 47: 1 })
  })
})

describe('Avisos (nunca bloqueiam)', () => {
  it('quanto resta de sobremesa, ao abrir o seletor', () => {
    const logs = [log({ itens: [p('bolo')] })]
    expect(dessertLeftNotice(counters(logs))).toEqual({ code: 'dessert-left', level: 'info', params: { n: 1, max: FOOD_LIMITS.dessertsPerDay } })
  })

  it('última sobremesa do dia e acima do limite', () => {
    const before = [log({ itens: [p('bolo')] })]
    expect(codes(evaluateLog([p('pudim')], 'orbita', counters(before), ctx(before)))).toEqual(['dessert-last'])
    const two = [log({ itens: [p('bolo'), p('pudim')] })]
    const over = evaluateLog([p('muffin')], 'orbita', counters(two), ctx(two))
    expect(codes(over)).toEqual(['dessert-over'])
    expect(over[0].level).toBe('warning')
  })

  it('3 dias seguidos acima do limite', () => {
    const logs = [
      log({ diaMissao: 45, itens: [p('bolo', 3)] }),
      log({ diaMissao: 46, itens: [p('bolo', 3)] }),
      log({ itens: [p('bolo'), p('pudim')] })
    ]
    const out = evaluateLog([p('muffin')], 'orbita', counters(logs), ctx(logs))
    expect(codes(out)).toEqual(['dessert-over', 'dessert-streak'])
    const two = logs.slice(1)
    expect(codes(evaluateLog([p('muffin')], 'orbita', counters(two), ctx(two)))).toEqual(['dessert-over'])
  })

  it('bebida saborizada: última do dia e a terceira gera aviso, mas registra', () => {
    const one = [log({ itens: [p('cafe')] })]
    expect(codes(evaluateLog([p('limonada')], 'orbita', counters(one), ctx(one)))).toEqual(['drink-last'])
    const two = [log({ itens: [p('cafe'), p('limonada')] })]
    const third = evaluateLog([p('cidra')], 'orbita', counters(two), ctx(two))
    expect(codes(third)).toEqual(['drink-over'])
    expect(third[0].level).toBe('warning')
  })

  it('pão como item livre gera aviso de migalhas', () => {
    expect(codes(evaluateLog([{ livre: 'Pão francês', porcoes: 1 }], 'orbita', counters([]), ctx()))).toEqual(['bread'])
    expect(codes(evaluateLog([{ livre: 'maçã', porcoes: 1 }], 'orbita', counters([]), ctx()))).toEqual([])
    expect(isBread('2 pães')).toBe(true)
    expect(isBread('pano')).toBe(false)
    expect(isBread('bread')).toBe(true)
  })

  it('item fora da regra da fase gera aviso com o motivo', () => {
    const out = evaluateLog([p('aveia')], 'lancamento', counters([]), ctx())
    expect(out).toEqual([{ code: 'out-of-rule', level: 'warning', params: { item: 'aveia', reason: 'needs-water' } }])
    expect(codes(evaluateLog([p('amendoas')], 'lancamento', counters([]), ctx()))).toEqual([])
  })

  it('estoque coletivo baixo de sobremesa avisa quem registrar sobremesa', () => {
    const logs = [log({ tripulante: 'mike', itens: [p('bolo', 6), p('pudim', 6), p('muffin', 6), p('biscoito-bordo', 6), p('chocolate', 2)] })]
    const out = evaluateLog([p('chocolate')], 'orbita', counters(logs), ctx(logs))
    expect(codes(out)).toContain('team-stock-low')
  })
})

describe('Registro', () => {
  const ok = createLog({ tripulante: 'cristiano', diaMissao: 47, hora: '08:00', refeicao: 'cafe', fase: 'orbita', itens: [p('cafe')] })

  it('valida os campos', () => {
    expect(validateLog(ok)).toEqual({ valid: true, errors: [] })
    expect(validateLog({ ...ok, refeicao: 'ceia' }).errors).toContain('refeicao')
    expect(validateLog({ ...ok, fase: 'lua' }).errors).toContain('fase')
    expect(validateLog({ ...ok, hora: '8h' }).errors).toContain('hora')
    expect(validateLog({ ...ok, itens: [] }).errors).toContain('itens')
    expect(validateLog({ ...ok, itens: [p('cafe', 0)] }).errors).toEqual(['itens[0].porcoes'])
    expect(validateLog({ ...ok, itens: [{ porcoes: 1 }] }).errors).toEqual(['itens[0]'])
    expect(validateLog({ ...ok, itens: [{ livre: 'pão', porcoes: 1 }] }).valid).toBe(true)
    expect(validateLog(null).valid).toBe(false)
  })
})

describe('RN15: refeições programadas', () => {
  const mctx = (meal, logs = [], extra = {}) => ({ ...ctx(logs), myLogs: logs, meal, ...extra })

  it('em lançamento e reentrada não há café, almoço nem jantar programados, só lanche', () => {
    for (const phase of ['lancamento', 'reentrada']) {
      for (const meal of ['cafe', 'almoco', 'jantar']) {
        expect(codes(evaluateLog([p('amendoas')], phase, counters([]), mctx(meal)))).toContain('meal-not-scheduled')
      }
      expect(codes(evaluateLog([p('amendoas')], phase, counters([]), mctx('lanche')))).not.toContain('meal-not-scheduled')
    }
    expect(codes(evaluateLog([p('amendoas')], 'orbita', counters([]), mctx('cafe')))).not.toContain('meal-not-scheduled')
  })

  it('café, almoço e jantar valem um registro por dia; o lanche, dois', () => {
    const logs = [log({ refeicao: 'cafe', itens: [p('aveia')] }), log({ refeicao: 'lanche', itens: [p('amendoas')] })]
    expect(codes(evaluateLog([p('ovos-mexidos')], 'orbita', counters(logs), mctx('cafe', logs)))).toContain('meal-duplicate')
    expect(codes(evaluateLog([p('amendoas')], 'orbita', counters(logs), mctx('lanche', logs)))).not.toContain('meal-duplicate')
    const two = [...logs, log({ refeicao: 'lanche', itens: [p('amendoas')] })]
    expect(codes(evaluateLog([p('amendoas')], 'orbita', counters(two), mctx('lanche', two)))).toContain('meal-duplicate')
    const other = [log({ refeicao: 'cafe', diaMissao: 46, itens: [p('aveia')] }), log({ refeicao: 'cafe', tripulante: 'mike', itens: [p('aveia')] })]
    expect(codes(evaluateLog([p('aveia')], 'orbita', counters(other), mctx('cafe', other)))).not.toContain('meal-duplicate')
  })

  it('mealNotices dá o aviso antes de escolher itens', () => {
    expect(codes(mealNotices('almoco', 'lancamento', { myLogs: [], tripulante: 'cristiano', diaMissao: 47 }))).toEqual(['meal-not-scheduled'])
    expect(mealNotices(undefined, 'orbita', {})).toEqual([])
  })
})

describe('RN16: o item combina com a refeição', () => {
  const find = (id) => C.find((i) => i.id === id)

  it('todo item tem ao menos uma refeição válida', () => {
    for (const i of C) {
      expect(i.refeicoes.length).toBeGreaterThan(0)
      for (const m of i.refeicoes) expect(MEALS).toContain(m)
    }
  })

  it('prato principal só no almoço e no jantar; itens de café só no café', () => {
    expect(find('brisket').refeicoes).toEqual(['almoco', 'jantar'])
    expect(find('ovos-mexidos').refeicoes).toEqual(['cafe'])
    expect(find('amendoas').refeicoes).toEqual(['cafe', 'lanche'])
    expect(find('tortilhas').refeicoes).toEqual(MEALS)
    expect(C.filter((i) => i.categoria === 'bebida').every((i) => i.refeicoes.length === 4)).toBe(true)
    expect(C.filter((i) => i.categoria === 'sobremesa' && i.id !== 'muffin').every((i) => !i.refeicoes.includes('cafe'))).toBe(true)
  })

  it('motivo wrong-meal aparece só quando a refeição é informada', () => {
    expect(unavailableReasons(find('brisket'), 'orbita', 12)).toEqual([])
    expect(unavailableReasons(find('brisket'), 'orbita', 12, 'cafe')).toEqual(['wrong-meal'])
    expect(unavailableReasons(find('brisket'), 'orbita', 12, 'jantar')).toEqual([])
    expect(unavailableReasons(find('aveia'), 'lancamento', null, 'almoco')).toEqual(['needs-water', 'wrong-meal'])
  })

  it('o seletor marca os itens que não combinam com a refeição escolhida', () => {
    const cafe = availableItems(C, 'orbita', [], 'cafe')
    expect(cafe.filter((x) => x.available).map((x) => x.item.id)).toContain('aveia')
    expect(cafe.find((x) => x.item.id === 'brisket')).toMatchObject({ available: false, reasons: ['wrong-meal'] })
    expect(availableItems(C, 'orbita', [], 'jantar').find((x) => x.item.id === 'aveia').reasons).toEqual(['wrong-meal'])
  })

  it('registrar fora da refeição avisa com o motivo, mas registra', () => {
    const out = evaluateLog([p('brisket')], 'orbita', counters([]), { ...ctx([]), meal: 'cafe' })
    expect(out).toEqual([{ code: 'out-of-rule', level: 'warning', params: { item: 'brisket', reason: 'wrong-meal' } }])
  })
})

describe('RN17: composição da refeição', () => {
  const mctx = (meal) => ({ ...ctx([]), meal })

  it('todo teto é inteiro positivo e só cita categorias do cardápio', () => {
    for (const caps of Object.values(MEAL_CAPS)) {
      for (const [cat, n] of Object.entries(caps)) {
        expect(CATEGORIES).toContain(cat)
        expect(Number.isInteger(n) && n > 0).toBe(true)
      }
    }
    expect(Object.keys(MEAL_CAPS).sort()).toEqual([...MEALS].sort())
  })

  it('no máximo um prato principal por refeição', () => {
    expect(codes(evaluateLog([p('brisket')], 'orbita', counters([]), mctx('almoco')))).toEqual([])
    const two = evaluateLog([p('brisket'), p('curry-camarao')], 'orbita', counters([]), mctx('jantar'))
    expect(two).toEqual([{ code: 'meal-over-cap', level: 'warning', params: { category: 'principal', max: 1 } }])
    const portions = evaluateLog([p('brisket', 2)], 'orbita', counters([]), mctx('jantar'))
    expect(codes(portions)).toEqual(['meal-over-cap'])
  })

  it('no café da manhã até três itens de café e lanches', () => {
    expect(codes(evaluateLog([p('ovos-mexidos'), p('salsichas'), p('aveia')], 'orbita', counters([]), mctx('cafe')))).toEqual([])
    expect(codes(evaluateLog([p('ovos-mexidos'), p('salsichas'), p('aveia'), p('granola-mirtilo')], 'orbita', counters([]), mctx('cafe')))).toEqual(['meal-over-cap'])
  })

  it('uma sobremesa por refeição, além do limite do dia', () => {
    const out = evaluateLog([p('bolo'), p('pudim')], 'orbita', counters([]), mctx('almoco'))
    expect(codes(out)).toEqual(['meal-over-cap', 'dessert-last'])
  })

  it('refeição sem a regra (sem meal) não aplica tetos', () => {
    expect(codes(evaluateLog([p('brisket'), p('curry-camarao')], 'orbita', counters([]), ctx([])))).toEqual([])
  })
})
