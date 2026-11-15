import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SparkAreaChart } from '@tremor/react';
import Shell, { Card } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import { Glyph, StatusChip } from '../components/Status.jsx';
import { useUser } from '../lib/user.jsx';
import { STATUS, classify } from '../lib/status.js';
import { useT } from '../i18n/index.jsx';
import IndicatorInfo from '../components/IndicatorInfo.jsx';
import FoodCard from '../components/FoodCard.jsx';
import { RegisterButton } from '../components/QuickEntry.jsx';
import { useMeasures } from '../lib/medidas.js';
import { useDemo } from '../lib/demo.jsx';
import { mockOn, setMock } from '../lib/mock.js';
import { CARDS, ENVIRONMENTS, SCENARIOS } from '../data/hoje.js';
import { chartHeight, clearLayout, defaultLayout, loadLayout, saveLayout } from '../lib/layout.js';

// O humor mostra só o desvio (sem faixa normal).
const SPARK = {
  pa: { lo: 80, hi: 140, band: [90, 119] },
  fc: { lo: 40, hi: 120, band: [50, 95] },
  gl: { lo: 60, hi: 140, band: [70, 99] },
  tc: { lo: 36, hi: 38.5, band: [36.1, 37.5] },
  sn: { lo: 4, hi: 10, band: [7, 9] },
  hu: { lo: 0.5, hi: 5.5, band: null }
};
const CARD_SHORT = ['o2', 'rad'];
const SIG_ICON = { pa: 'gauge', fc: 'heart', gl: 'droplet', tc: 'thermo', sn: 'moon', hu: 'smile' };
const last = (a) => a[a.length - 1];
const cardShort = (t, k) => (CARD_SHORT.includes(k) ? t(`cards.${k}.short`) : t(`cards.${k}.name`));

/** Calcula os valores de hoje a partir do cenário e do ambiente escolhidos. */
export function compute(sc, ev, { t, num, hm }) {
  const pa = last(sc.pa), fc = last(sc.fc), gl = last(sc.gl), tc = last(sc.tc), sn = last(sc.sn), hu = last(sc.hu);
  const mk = (id, v, value, unit, range, src, when, sig, series) => ({ id, st: classify(id, v), value, unit, range, src, when, sig, series });
  const R = {
    pa: mk('pa', pa, `${pa[0]}/${pa[1]}`, t('ind.pa.unit'), t('today.ranges.pa'), t('src.manual'), t('when.yPa'), `${pa[0]}/${pa[1]}`, sc.pa.map((q) => q[0])),
    fc: mk('fc', fc, String(fc), t('ind.fc.unit'), t('today.ranges.fc'), t('src.ring'), t('when.ring'), `${fc} ${t('ind.fc.unit')}`, sc.fc),
    gl: mk('gl', gl, String(gl), t('ind.gl.unit'), t('today.ranges.gl'), t('src.manual'), t('when.yGl'), `${gl} ${t('ind.gl.unit')}`, sc.gl),
    tc: mk('tc', tc, num(tc, 1), t('ind.tc.unit'), t('today.ranges.tc'), t('src.ringManual'), t('when.ring'), `${num(tc, 1)} ${t('ind.tc.unit')}`, sc.tc),
    sn: mk('sn', sn, hm(sn), t('today.units.sn'), t('today.ranges.sn'), t('src.ring'), t('when.wake'), hm(sn), sc.sn),
    hu: mk('hu', hu, String(hu), t('today.units.hu'), t('today.ranges.hu'), t('src.you'), t('when.yHu'), `${hu}/5`, sc.hu)
  };
  const ratio = sc.rad, radVal = ev.rad * ratio;
  R.o2 = { st: classify('o2', sc.o2), value: String(sc.o2), unit: t('today.units.o2'), cap: t('today.o2Cap') };
  R.kg = { st: 'ok', value: num(74.2, 1), unit: t('today.units.kg'), cap: t('today.kgCap') };
  R.rad = { st: classify('rad', ratio), value: radVal < 0.1 ? num(radVal, 3) : num(radVal, 2), unit: t('today.radUnit'), cap: ratio > 1 ? t('today.radCapHigh', { x: num(ratio, 1) }) : t('today.radCapOk') };
  R.ring = { st: 'ok', value: '78%', unit: t('today.units.ring'), cap: t('today.ringCap'), chip: t('today.ringChip') };
  return R;
}

export function alertFor(R, sc, delayText, { t, num, lc }) {
  const to = { pa: '/recomendacao?ind=pa', gl: '/recomendacao?ind=gl', tc: '/recomendacao?ind=tc', o2: '/recomendacao', fc: '/recomendacao?ind=fc', sn: '/recomendacao?ind=sn', hu: '/diario', rad: '/tripulacao' };
  const prio = ['tc', 'o2', 'rad', 'pa', 'fc', 'gl', 'sn', 'hu'];
  const crit = prio.filter((k) => R[k].st === 'crit');
  const warn = prio.filter((k) => R[k].st === 'warn');
  const delay = ' ' + t('today.alert.contact', { delay: lc(delayText) });
  if (crit.length) {
    const k = crit[0];
    const T = {
      tc: [t('today.alert.tcTitle', { value: R.tc.value }), t('today.alert.tcText'), t('today.alert.guide')],
      o2: [t('today.alert.o2Title', { value: sc.o2 }), t('today.alert.o2Text'), t('today.alert.guide')],
      rad: [t('today.alert.radTitle', { x: num(sc.rad, 1) }), t('today.alert.radText'), t('today.alert.cabin')]
    };
    const msg = T[k] || [t('today.alert.critTitle', { name: t(`names.${k}`) }), t('today.alert.critText'), t('today.alert.guide')];
    return { st: 'crit', title: msg[0], text: msg[1] + (k === 'rad' ? '' : delay), cta: msg[2], to: to[k] };
  }
  if (warn.length) {
    const k = warn[0];
    return {
      st: 'warn',
      title: warn.length === 1 ? t('today.alert.warnOne', { name: t(`names.${k}`) }) : t('today.alert.warnMany', { n: warn.length }),
      text: warn.length === 1
        ? (k === 'sn' ? t('today.alert.warnSleep', { value: R.sn.value }) : t('today.alert.warnText'))
        : warn.map((q) => t(`names.${q}`)).join(', ') + '.',
      cta: t('today.alert.seeWhat'),
      to: to[k]
    };
  }
  return null;
}

function Spark({ id, r, height }) {
  const { t, lc } = useT();
  const cfg = SPARK[id];
  const yp = (v) => 100 - ((v - cfg.lo) / (cfg.hi - cfg.lo)) * 100;
  const data = r.series.map((v, i) => ({ dia: t('time.day', { n: 41 + i }), v: Math.min(cfg.hi, Math.max(cfg.lo, v)) }));
  return (
    <div className="relative border-b border-l border-vn-line" style={{ height }}>
      {cfg.band && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bg-[rgba(70,211,154,0.10)]"
          style={{ top: `${yp(cfg.band[1])}%`, height: `${yp(cfg.band[0]) - yp(cfg.band[1])}%` }}
        />
      )}
      <SparkAreaChart
        data={data}
        index="dia"
        categories={['v']}
        colors={[STATUS[r.st].tremor]}
        minValue={cfg.lo}
        maxValue={cfg.hi}
        curveType="monotone"
        className="absolute inset-0 h-full w-full"
        aria-label={t('today.trend', { name: lc(t(`names.${id}`)), value: r.sig })}
        role="img"
      />
    </div>
  );
}

function EditTools({ k, onHide, onGrab }) {
  const { t } = useT();
  return (
    <div className="flex w-full items-center justify-between gap-2 border-b border-dashed border-vn-line2 pb-2.5">
      <span
        onPointerDown={(e) => onGrab(e, k)}
        role="img"
        aria-label={t('today.dragMove')}
        title={t('today.dragMove')}
        className="flex cursor-grab touch-none select-none p-2 active:cursor-grabbing"
      >
        <Icon name="grip" size={18} color="#8AA3BD" />
      </span>
      <button type="button" aria-label={t('today.archiveCard')} title={t('today.archive')} onClick={() => onHide(k)} className="flex h-9 w-9 items-center justify-center rounded-sm border border-vn-line2">
        <Icon name="archive" size={18} />
      </button>
    </div>
  );
}

function ChartCard({ c, r, span, tools }) {
  const { t } = useT();
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-3 px-[18px] pb-3.5 pt-4 hover:border-vn-accent">
      {tools}
      <div className="flex items-center justify-between gap-2.5">
        <span className="flex min-w-0 items-center gap-2">
          <Link to={`/indicadores?ind=${c.k}`} className="flex min-w-0 items-center gap-2.5 text-[17px] font-semibold text-vn-text hover:text-vn-text">
            <Icon name={c.icon} color="#62C3FF" />{t(`cards.${c.k}.name`)}
          </Link>
          <IndicatorInfo id={c.k} />
        </span>
        <span className="flex flex-none items-center gap-2">
          {(c.k === 'pa' || c.k === 'gl') && <RegisterButton kind={c.k} compact />}
          <StatusChip st={r.st} />
        </span>
      </div>
      <Spark id={c.k} r={r} height={chartHeight(span)} />
      <div aria-hidden="true" className="-mt-1.5 flex justify-between text-[13px] text-vn-subtle"><span>{t('time.daysAgo7')}</span><span>{t('time.today')}</span></div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[30px] font-semibold leading-none tabular-nums">{r.value}</span>
          <span className="text-[15px] text-vn-muted">{r.unit}</span>
        </span>
        <span className="text-sm text-vn-subtle">{r.src} · {r.when}</span>
      </div>
      {c.k !== 'hu' && <div className="-mt-1.5 text-sm text-vn-subtle">{t('today.normal', { range: r.range })}</div>}
    </Card>
  );
}

function SmallCard({ c, r, tools }) {
  const { t } = useT();
  return (
    <Card className="flex min-w-0 flex-1 flex-col items-start gap-2.5 px-[18px] py-4">
      {tools}
      <span className="flex items-center gap-2 text-vn-muted"><Icon name={c.icon} size={19} color="#62C3FF" />{t(`cards.${c.k}.name`)}</span>
      <div className="flex flex-wrap items-baseline gap-1.5">
        <span className="text-[38px] font-semibold leading-none tabular-nums">{r.value}</span>
        <span className="text-[15px] text-vn-muted">{r.unit}</span>
      </div>
      <StatusChip st={r.st} text={r.chip} />
      {c.k === 'kg' && <RegisterButton kind="kg" compact />}
      <div className="text-sm text-vn-subtle">{r.cap}</div>
    </Card>
  );
}

export default function Hoje() {
  const { me } = useUser();
  const i18n = useT();
  const { t } = i18n;
  const { scen, setScen, env, setEnv, fase, setFase } = useDemo();
  const mock = mockOn();
  const { measures } = useMeasures(me.key);
  const [edit, setEdit] = useState(false);
  const [layout, setLayout] = useState(() => loadLayout(me.key));
  // Destaque do cartão-alvo enquanto arrasta (direto no DOM, sem re-renderizar a cada movimento).
  const overEl = useRef(null);
  const setOverEl = (el) => {
    if (overEl.current === el) return;
    if (overEl.current) overEl.current.style.outline = 'none';
    overEl.current = el;
    if (el) el.style.outline = '2px dashed #62C3FF';
  };
  const grid = useRef(null);

  useEffect(() => { setLayout(loadLayout(me.key)); }, [me.key]);
  // Avisa o processo principal (camada de dados) do cenário da demonstração, quando a ponte existir.
  useEffect(() => { window.api?.setScenario?.(scen); }, [scen]);
  const update = (fn) => setLayout((cur) => { const next = fn(cur); saveLayout(me.key, next); return next; });

  const sc = SCENARIOS[scen], ev = ENVIRONMENTS[env];
  const R = useMemo(() => compute(sc, ev, i18n), [sc, ev, i18n]);
  const envName = t(`environments.${env}.name`);
  const alert = alertFor(R, sc, t(`environments.${env}.delay`), i18n);
  // A massa mostra o último registro do tripulante, quando existe.
  const lastKg = measures.filter((x) => x.kind === 'kg').sort((x, y) => Date.parse(y.at) - Date.parse(x.at))[0];
  const viewR = (k) => (k === 'kg' && lastKg ? { ...R.kg, value: i18n.num(lastKg.value.kg, 1), cap: t('measure.lastReg') } : R[k]);


  // ---- personalização ----
  const hide = (k) => update((cur) => ({ ...cur, lay: { ...cur.lay, [k]: { ...cur.lay[k], on: false } } }));
  const show = (k) => update((cur) => ({ ...cur, lay: { ...cur.lay, [k]: { ...cur.lay[k], on: true } } }));
  const setSpan = (k, span) => update((cur) => (cur.lay[k].span === span ? cur : { ...cur, lay: { ...cur.lay, [k]: { ...cur.lay[k], span } } }));
  // Arrastar para reordenar com eventos de ponteiro (mouse, caneta e toque).
  const onGrab = (e, from) => {
    e.preventDefault();
    const src = e.currentTarget.closest('[data-vn-card]');
    src.style.opacity = '0.55';
    document.body.style.cursor = 'grabbing';
    let target = null;
    const move = (ev) => {
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const card = el && el.closest('[data-vn-card]');
      setOverEl(card && card !== src ? card : null);
      target = card && card !== src ? card.dataset.k : null;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      src.style.opacity = '';
      document.body.style.cursor = '';
      setOverEl(null);
      if (!target || target === from) return;
      const to = target;
      update((cur) => {
        // para frente entra depois do alvo; para trás, antes dele
        const forward = cur.ord.indexOf(from) < cur.ord.indexOf(to);
        const ord = cur.ord.filter((x) => x !== from);
        ord.splice(ord.indexOf(to) + (forward ? 1 : 0), 0, from);
        return { ...cur, ord };
      });
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };
  const startResize = (e, k, min) => {
    e.preventDefault();
    const el = e.currentTarget.closest('[data-vn-card]');
    const g = grid.current;
    const gap = parseFloat(getComputedStyle(g).columnGap) || 0;
    const col = (g.getBoundingClientRect().width + gap) / 12;
    const x0 = e.clientX, w0 = el.getBoundingClientRect().width;
    const move = (ev2) => setSpan(k, Math.max(min, Math.min(12, Math.round((w0 + (ev2.clientX - x0) + gap) / col))));
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };
  const hidden = CARDS.filter((c) => !layout.lay[c.k].on);

  const header = (
    <header className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 border-b border-vn-line px-8 py-5">
      <div className="min-w-0">
        <h1 className="text-[32px] font-semibold leading-tight">{t('today.greeting', { name: me.first })}</h1>
        <div className="mt-1 text-base text-vn-muted">{envName}</div>
      </div>
      <div role="group" aria-label={t('today.signalsAria')} className="flex flex-wrap gap-2">
        {['pa', 'fc', 'gl', 'tc', 'sn'].map((k) => (
          <div key={k} title={t('today.signalTitle', { name: t(`names.${k}`), value: R[k].sig, status: t(`status.${R[k].st}`) })} className="flex min-h-[34px] items-center gap-2 rounded-full border bg-vn-surface px-3 py-1.5" style={{ borderColor: STATUS[R[k].st].bd }}>
            <Glyph st={R[k].st} />
            <Icon name={SIG_ICON[k]} size={17} color={STATUS[R[k].st].col} />
            <span className="text-[15px] font-semibold tabular-nums">{R[k].sig}</span>
            <span className="sr-only">{t(`names.${k}`)}, {t(`status.${R[k].st}`)}</span>
          </div>
        ))}
      </div>
    </header>
  );

  return (
    <Shell header={header}>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2.5 border-b border-vn-line bg-vn-side px-8 py-3">
        <span className="mono-label text-vn-accent">{t('today.demo')}</span>
        <div role="group" aria-label={t('today.scenario')} className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] text-vn-muted">{t('today.scenario')}</span>
          {Object.entries(SCENARIOS).map(([k, v]) => (
            <button key={k} type="button" aria-pressed={scen === k} onClick={() => setScen(k)} className={'pill ' + (scen === k ? 'pill-on' : 'pill-off')}>{t(`scenarios.${k}`)}</button>
          ))}
        </div>
        <div role="group" aria-label={t('today.environment')} className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] text-vn-muted">{t('today.environment')}</span>
          {Object.entries(ENVIRONMENTS).map(([k, v]) => (
            <button key={k} type="button" aria-pressed={env === k} onClick={() => setEnv(k)} className={'pill ' + (env === k ? 'pill-on' : 'pill-off')}>{t(`environments.${k}.label`)}</button>
          ))}
        </div>
        <div role="group" aria-label={t('food.phaseLabel')} className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] text-vn-muted">{t('food.phaseLabel')}</span>
          {['lancamento', 'orbita', 'reentrada'].map((k) => (
            <button key={k} type="button" aria-pressed={fase === k} onClick={() => setFase(k)} className={'pill ' + (fase === k ? 'pill-on' : 'pill-off')}>{t(`food.phase.${k}`)}</button>
          ))}
        </div>
        <div role="group" aria-label={t('today.mock.label')} title={t('today.mock.note')} className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] text-vn-muted">{t('today.mock.label')}</span>
          {[true, false].map((on) => (
            <button key={String(on)} type="button" aria-pressed={mock === on} onClick={() => { setMock(on); location.reload(); }} className={'pill ' + (mock === on ? 'pill-on' : 'pill-off')}>{t(on ? 'today.mock.on' : 'today.mock.off')}</button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[22px] px-8 pb-12 pt-6">
        {alert && (
          <div role="alert" className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-sm border px-5 py-[18px]" style={{ background: STATUS[alert.st].bg, borderColor: STATUS[alert.st].bd }}>
            <div className="flex min-w-0 flex-[1_1_380px] items-start gap-3.5">
              <Icon name={alert.st === 'crit' ? 'octagon' : 'alert'} size={28} color={STATUS[alert.st].col} />
              <div>
                <div className="text-[19px] font-semibold leading-snug">{alert.title}</div>
                <div className="mt-0.5 text-base opacity-90">{alert.text}</div>
              </div>
            </div>
            <Link to={alert.to} className="btn-p">{alert.cta}</Link>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
          <span className="text-[15px] text-vn-muted">{edit ? t('today.editHint') : ''}</span>
          <div className="flex flex-wrap gap-2">
            {edit && <button type="button" className="btn-s" onClick={() => { clearLayout(me.key); setLayout(defaultLayout()); }}>{t('today.restore')}</button>}
            <button type="button" className="btn-s" onClick={() => setEdit(!edit)}>{edit ? t('today.finish') : t('today.customize')}</button>
          </div>
        </div>
        {edit && hidden.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 rounded-sm border border-dashed border-vn-line2 px-3.5 py-3">
            <span className="text-[15px] text-vn-muted">{t('today.addToPanel')}</span>
            {hidden.map((c) => (
              <button key={c.k} type="button" onClick={() => show(c.k)} className="flex min-h-[36px] items-center gap-1.5 rounded-sm border border-vn-line2 px-3 py-1 text-sm">
                <Icon name="plus" size={16} />{cardShort(t, c.k)}
              </button>
            ))}
          </div>
        )}

        <section ref={grid} aria-label={t('today.indicatorsAria')} className="grid grid-cols-12 items-stretch gap-4" style={{ gridAutoFlow: 'row dense' }}>
          {CARDS.filter((c) => layout.lay[c.k].on).map((c) => {
            const span = layout.lay[c.k].span;
            const tools = edit ? <EditTools k={c.k} onHide={hide} onGrab={onGrab} /> : null;
            return (
              <div
                key={c.k}
                data-vn-card
                data-k={c.k}
                className="relative flex min-w-0 flex-col"
                style={{ gridColumn: `span ${span}`, order: layout.ord.indexOf(c.k), outlineOffset: 4 }}
              >
                {c.k === 'alim' ? <FoodCard tools={tools} /> : c.chart ? <ChartCard c={c} r={R[c.k]} span={span} tools={tools} /> : <SmallCard c={c} r={viewR(c.k)} tools={tools} />}
                {edit && (
                  <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-label={t('today.resize')}
                    title={t('today.resize')}
                    onPointerDown={(e) => startResize(e, c.k, c.chart || c.wide ? 4 : 3)}
                    className="absolute -right-2 bottom-0 top-0 z-[2] flex w-4 cursor-col-resize touch-none items-center justify-center"
                  >
                    <span className="h-11 w-1 rounded-sm bg-vn-accent opacity-85" />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </Shell>
  );
}
