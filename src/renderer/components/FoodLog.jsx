import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProgressBar } from '@tremor/react';
import { Card } from './Shell.jsx';
import Icon from './Icon.jsx';
import { StatusChip } from './Status.jsx';
import { STATUS } from '../lib/status.js';
import { useUser } from '../lib/user.jsx';
import { useFood } from '../lib/food.js';
import { useMissionClock } from '../lib/clock.jsx';
import { useT } from '../i18n/index.jsx';
import { CARDAPIO } from '../data/cardapio.js';
import { CATEGORIES, FOOD_LIMITS, MEALS, MEAL_CAPS, availableItems, categoryStock, dessertLeftNotice } from '../../shared/rules/food.js';

const PHASE_ICON = { lancamento: 'send', orbita: 'globe', reentrada: 'flame' };
const INFO = { col: '#62C3FF', bg: 'rgba(98,195,255,0.12)', bd: 'rgba(98,195,255,0.45)' };
const mealByHour = (minutes) => (minutes < 10 * 60 ? 'cafe' : minutes < 15 * 60 ? 'almoco' : minutes < 18 * 60 ? 'lanche' : 'jantar');

/** Aviso com ícone, texto e cor (nunca só cor). */
export function Notice({ w }) {
  const { t } = useT();
  const info = w.level === 'info';
  const tone = info ? INFO : STATUS.warn;
  const params = { ...w.params };
  if (params.item) params.item = t(`food.items.${params.item}`);
  if (params.category) params.category = t(`food.categories.${params.category}`).toLowerCase();
  if (params.meal) params.meal = t(`food.meals.${params.meal}`);
  if (params.reason) params.reason = t(`food.reasons.${params.reason}`);
  return (
    <li className="flex items-start gap-3 rounded-sm border px-3.5 py-2.5" style={{ background: tone.bg, borderColor: tone.bd }}>
      <Icon name={info ? 'info' : 'alert'} size={20} color={tone.col} />
      <span className="min-w-0 text-[15px]">
        <b className="mr-2" style={{ color: tone.col }}>{info ? t('food.info') : t('status.warn')}</b>
        {t(`food.warn.${w.code}`, params)}
      </span>
    </li>
  );
}

/** Controle de porções: − diminui (no zero tira o item) e + soma. */
function Stepper({ name, qty, onChange }) {
  const { t } = useT();
  const btn = 'flex h-9 w-9 flex-none items-center justify-center rounded-sm border border-vn-line2 bg-vn-field hover:border-vn-accent';
  return (
    <span role="group" aria-label={t('food.qtyAria', { item: name, n: qty })} className="inline-flex items-center gap-1.5">
      <button type="button" aria-label={t('food.qtyLess', { item: name })} title={t('food.qtyLess', { item: name })} onClick={() => onChange(-1)} className={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /></svg>
      </button>
      <span aria-hidden="true" className="min-w-[28px] text-center text-lg font-bold tabular-nums text-vn-accent">{qty}</span>
      <button type="button" aria-label={t('food.qtyMore', { item: name })} title={t('food.qtyMore', { item: name })} onClick={() => onChange(1)} className={btn}>
        <Icon name="plus" size={16} stroke={2.4} />
      </button>
    </span>
  );
}

export default function FoodLog() {
  const { t } = useT();
  const { me } = useUser();
  const [params] = useSearchParams();
  const { minutes } = useMissionClock();
  const { today, counters, evaluate, noticesFor, save, remove, stockLogs, fase } = useFood(me.key);

  const initial = MEALS.includes(params.get('refeicao')) ? params.get('refeicao') : mealByHour(minutes);
  const [meal, setMeal] = useState(initial);
  useEffect(() => { if (MEALS.includes(params.get('refeicao'))) setMeal(params.get('refeicao')); }, [params]);
  const [pending, setPending] = useState([]);
  const [free, setFree] = useState('');
  const [lastWarnings, setLastWarnings] = useState([]);
  const [msg, setMsg] = useState('');
  const [showOthers, setShowOthers] = useState(false);
  const [openCat, setOpenCat] = useState(CATEGORIES.includes(params.get('categoria')) ? params.get('categoria') : null);

  const rows = useMemo(() => availableItems(CARDAPIO, fase, stockLogs, meal), [fase, stockLogs, meal]);
  const restricted = fase !== 'orbita';
  const maxDrinks = FOOD_LIMITS.flavoredDrinksPerDay;
  const maxDesserts = FOOD_LIMITS.dessertsPerDay;
  const dessertsLeft = Math.max(0, maxDesserts - counters.sobremesas);

  const itens = pending.map(({ itemId, livre, porcoes, foraDaRegra }) => ({ ...(itemId ? { itemId } : { livre }), porcoes, foraDaRegra }));
  const liveWarnings = pending.length > 0 ? evaluate(itens, meal) : [...noticesFor(meal), ...lastWarnings.filter((w) => !noticesFor(meal).some((n) => n.code === w.code))];

  const tap = (row) => {
    setMsg('');
    setPending((cur) => {
      const i = cur.findIndex((p) => p.itemId === row.item.id);
      if (i >= 0) return cur.map((p, k) => (k === i ? { ...p, porcoes: Math.min(20, p.porcoes + 1) } : p));
      return [...cur, { itemId: row.item.id, porcoes: 1, foraDaRegra: row.reasons }];
    });
  };
  const addFree = () => {
    const text = free.trim();
    if (!text) return;
    setPending((cur) => [...cur, { livre: text, porcoes: 1, foraDaRegra: [] }]);
    setFree('');
    setMsg('');
  };
  const changeQty = (i, delta) => setPending((cur) => cur.flatMap((p, k) => (k !== i ? [p] : p.porcoes + delta < 1 ? [] : [{ ...p, porcoes: Math.min(20, p.porcoes + delta) }])));
  const removeAt = (i) => setPending((cur) => cur.filter((_, k) => k !== i));
  const nameOf = (p) => (p.itemId ? t(`food.items.${p.itemId}`) : p.livre);

  const submit = async () => {
    if (pending.length === 0) return;
    const res = await save({ refeicao: meal, itens });
    if (res?.success) {
      setLastWarnings(res.avisos);
      setPending([]);
      setMsg(t('food.saved'));
    }
  };

  const phaseTone = restricted ? STATUS.warn : STATUS.ok;
  const counterTile = (key, value, over, note) => (
    <Card className="flex min-w-0 flex-1 flex-col gap-1.5 px-[18px] py-4" key={key}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[15px] text-vn-muted">{t(`food.counter.${key}`)}</span>
        {over && <StatusChip st="warn" />}
      </div>
      <span className="text-[30px] font-semibold leading-none tabular-nums">{value}</span>
      {note && <span className="text-sm text-vn-subtle">{note}</span>}
    </Card>
  );

  return (
    <div className="flex flex-col gap-5">
      <div role="status" className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border px-5 py-4" style={{ background: phaseTone.bg, borderColor: phaseTone.bd }}>
        <Icon name={PHASE_ICON[fase]} size={26} color={phaseTone.col} />
        <div className="min-w-0 flex-1">
          <div className="text-[19px] font-semibold">{t('food.phaseLabel')}: {t(`food.phase.${fase}`)}</div>
          <div className="text-[15px] opacity-90">{t(`food.phaseNote.${fase}`)}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {counterTile('meals', t('food.ofMax', { n: counters.refeicoes, max: MEALS.length }), false)}
        {counterTile('drinks', t('food.ofMax', { n: counters.bebidasSaborizadas, max: maxDrinks }), counters.bebidasSaborizadas > maxDrinks)}
        {counterTile('desserts', t('food.ofMax', { n: counters.sobremesas, max: maxDesserts }), counters.sobremesas > maxDesserts, t('food.dessertsLeft', { n: dessertsLeft }))}
      </div>

      <Card className="flex flex-col gap-3 px-[22px] py-5">
        <section aria-labelledby="fl-warn" className="flex flex-col gap-2.5">
          <h2 id="fl-warn" className="text-[22px] font-semibold leading-tight">{t('food.warningsTitle')}</h2>
          {liveWarnings.length === 0 ? <p className="text-[15px] text-vn-muted">{t('food.noWarnings')}</p> : <ul className="flex flex-col gap-2">{liveWarnings.map((w, i) => <Notice key={`${w.code}-${i}`} w={w} />)}</ul>}
        </section>
      </Card>

      <Card className="flex flex-col gap-4 px-[22px] py-5">
        <section aria-labelledby="fl-reg" className="flex flex-col gap-4">
          <div>
            <h2 id="fl-reg" className="text-[26px] font-semibold leading-tight">{t('food.register')}</h2>
            <p className="mt-0.5 text-[15px] text-vn-muted">{t('food.pick')}</p>
          </div>
          <div role="group" aria-label={t('food.meal')} className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] text-vn-muted">{t('food.meal')}</span>
            {MEALS.map((m) => (
              <button key={m} type="button" aria-pressed={meal === m} onClick={() => setMeal(m)} className={'pill ' + (meal === m ? 'pill-on' : 'pill-off')}>{t(`food.meals.${m}`)}</button>
            ))}
          </div>

          {(() => {
            const cats = CATEGORIES.filter((cat) => showOthers || rows.some((r) => r.item.categoria === cat && !r.reasons.includes('wrong-meal')));
            const current = cats.includes(openCat) ? openCat : openCat === 'none' ? null : cats[0];
            return cats.map((cat) => {
              const open = current === cat;
              const catRows = rows.filter((r) => r.item.categoria === cat && (showOthers || !r.reasons.includes('wrong-meal')));
              const selected = pending.reduce((n, p) => n + (catRows.some((r) => r.item.id === p.itemId) ? p.porcoes : 0), 0);
              return (
                <div key={cat} className="rounded-sm border border-vn-line bg-vn-field">
                  <button
                    type="button"
                    id={`cat-${cat}`}
                    aria-expanded={open}
                    aria-controls={`cat-panel-${cat}`}
                    onClick={() => setOpenCat(open ? 'none' : cat)}
                    className="flex min-h-[52px] w-full items-center gap-3 px-4 py-2 text-left"
                  >
                    <Icon name="chevron" size={18} color="#A9BDD2" className="transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'none' }} />
                    <span className="flex-1 text-lg font-semibold">{t(`food.categories.${cat}`)}</span>
                    <span className="hidden text-sm text-vn-muted sm:inline">
                      {MEAL_CAPS[meal]?.[cat] ? t('food.capHint', { n: MEAL_CAPS[meal][cat] }) : ''}
                      {cat === 'sobremesa' && ` · ${t('food.dessertsLeft', { n: dessertsLeft })}`}
                    </span>
                    {selected > 0 && <span className="rounded-full bg-vn-accent px-2.5 text-sm font-bold text-vn-ink" title={t('food.selectedCount', { n: selected })}>{selected}</span>}
                  </button>
                  {open && (
                    <div id={`cat-panel-${cat}`} role="region" aria-labelledby={`cat-${cat}`} className="flex flex-col gap-3 border-t border-vn-line px-4 pb-4 pt-3">
                      {cat === 'sobremesa' && <ul><Notice w={dessertLeftNotice(counters, maxDesserts)} /></ul>}
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5">
                        {catRows.map((row) => {
                          const idx = pending.findIndex((p) => p.itemId === row.item.id);
                          const picked = idx >= 0 ? pending[idx] : null;
                          const name = t(`food.items.${row.item.id}`);
                          return (
                            <div key={row.item.id} className={'flex min-h-[52px] items-stretch rounded-sm border ' + (row.available ? (picked ? 'border-vn-accent bg-vn-surface2' : 'border-vn-line2 bg-vn-bg') : 'border-dashed border-vn-line2 bg-transparent text-vn-muted')}>
                              <button
                                type="button"
                                onClick={() => (picked ? changeQty(idx, 1) : tap(row))}
                                aria-label={row.available ? name : `${name}: ${row.reasons.map((r) => t(`food.reasons.${r}`)).join(', ')}. ${t('food.forceHint')}`}
                                className="flex min-h-[52px] flex-1 flex-col items-start justify-center gap-0.5 rounded-sm px-3 py-2 text-left hover:bg-vn-surface"
                              >
                                <span className="font-semibold leading-tight">{name}</span>
                                {!row.available && (
                                  <span className="text-[13px] leading-tight text-vn-warn">{row.reasons.map((r) => t(`food.reasons.${r}`)).join(', ')} · {t('food.forceHint')}</span>
                                )}
                              </button>
                              {picked && (
                                <div className="flex flex-none items-center border-l border-vn-line px-2">
                                  <Stepper name={name} qty={picked.porcoes} onChange={(d) => changeQty(idx, d)} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })()}

          <button type="button" aria-pressed={showOthers} onClick={() => setShowOthers((v) => !v)} className="btn-s w-fit">{showOthers ? t('food.hideOthers') : t('food.showOthers')}</button>

          <div className="flex flex-col gap-3 rounded-sm border border-vn-line bg-vn-field p-4">
            <h3 className="text-lg font-semibold">{t('food.pending')}</h3>
            {pending.length === 0 && <p className="text-[15px] text-vn-muted">{t('food.pendingEmpty')}</p>}
            <ul className="flex flex-col gap-1.5">
              {pending.map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-3 border-t border-vn-line py-1.5 first:border-t-0">
                  <span className="min-w-0 flex-1 font-semibold">{nameOf(p)}</span>
                  <Stepper name={nameOf(p)} qty={p.porcoes} onChange={(d) => changeQty(i, d)} />
                  <button type="button" aria-label={t('food.removeItem', { item: nameOf(p) })} title={t('food.removeItem', { item: nameOf(p) })} onClick={() => removeAt(i)} className="flex h-10 w-10 flex-none items-center justify-center rounded-sm border border-vn-line2"><Icon name="x" size={17} /></button>
                </li>
              ))}
            </ul>
            <form onSubmit={(e) => { e.preventDefault(); addFree(); }} className="flex flex-wrap items-center gap-2.5">
              <label htmlFor="fl-free" className="text-[15px] text-vn-muted">{t('food.freeItem')}</label>
              <input id="fl-free" value={free} onChange={(e) => setFree(e.target.value)} placeholder={t('food.freePlaceholder')} className="min-h-[44px] min-w-[200px] flex-1 rounded-sm border border-vn-line2 bg-vn-bg px-3 text-base text-vn-text placeholder:text-vn-subtle" />
              <button type="submit" className="btn-s" disabled={!free.trim()}>{t('food.addFree')}</button>
            </form>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn-p disabled:cursor-not-allowed disabled:opacity-50" disabled={pending.length === 0} onClick={submit}>{t('food.save')} · {t(`food.meals.${meal}`)}</button>
              <span role="status" aria-live="polite" className="text-[15px] text-vn-accent">{msg}</span>
            </div>
          </div>
        </section>
      </Card>

      <div className="flex flex-wrap items-stretch gap-5">
        <Card className="flex min-w-0 flex-[2_1_340px] flex-col gap-3 px-[22px] py-5">
          <section aria-labelledby="fl-stock" className="flex flex-col gap-3">
            <div>
              <h2 id="fl-stock" className="text-[22px] font-semibold leading-tight">{t('food.stockTitle')}</h2>
              <p className="mt-0.5 text-sm text-vn-subtle">{t('food.stockSub')}</p>
            </div>
            {['principal', 'sobremesa'].map((cat) => {
              const s = categoryStock(CARDAPIO, stockLogs, cat);
              return (
                <div key={cat} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-3 text-[15px]">
                    <span className="font-semibold">{t(`food.categories.${cat}`)}</span>
                    <span className="tabular-nums text-vn-muted">{t('food.stockLeft', { left: s.left, total: s.total })}</span>
                  </div>
                  <ProgressBar value={s.total ? (s.left / s.total) * 100 : 0} color="sky" aria-label={`${t(`food.categories.${cat}`)}: ${t('food.stockLeft', { left: s.left, total: s.total })}`} />
                </div>
              );
            })}
          </section>
        </Card>

        <Card className="flex min-w-0 flex-[3_1_460px] flex-col gap-2 px-[22px] py-5">
          <section aria-labelledby="fl-today">
            <h2 id="fl-today" className="mb-2 text-[22px] font-semibold leading-tight">{t('food.todayTitle')}</h2>
            {today.length === 0 && <p className="text-[15px] text-vn-muted">{t('food.historyEmpty')}</p>}
            <ul>
              {[...today].reverse().map((l) => (
                <li key={l.id} className="flex flex-col gap-2 border-t border-vn-line py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold">{t(`food.meals.${l.refeicao}`)} <span className="font-normal text-vn-muted">· {l.hora}</span></span>
                    <button type="button" aria-label={t('food.delete')} title={t('food.delete')} onClick={() => remove(l.id)} className="flex h-9 w-9 items-center justify-center rounded-sm border border-vn-line2"><Icon name="x" size={16} /></button>
                  </div>
                  <span className="text-[15px] text-vn-muted">{l.itens.map((p) => `${p.itemId ? t(`food.items.${p.itemId}`) : p.livre} ×${p.porcoes}`).join(', ')}</span>
                  {(l.avisos || []).length > 0 && <ul className="flex flex-col gap-1.5">{l.avisos.map((w, i) => <Notice key={`${w.code}-${i}`} w={w} />)}</ul>}
                </li>
              ))}
            </ul>
          </section>
        </Card>
      </div>

      <p className="flex items-start gap-2.5 text-sm text-vn-subtle">
        <Icon name="info" size={18} color="#8AA3BD" className="mt-px" />
        <span>{t('food.disclaimer')}</span>
      </p>
    </div>
  );
}
