import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SparkLineChart } from '@tremor/react';
import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import DetailChart from '../components/DetailChart.jsx';
import Modal from '../components/Modal.jsx';
import IndicatorInfo from '../components/IndicatorInfo.jsx';
import MyReadings from '../components/MyReadings.jsx';
import { RegisterButton } from '../components/QuickEntry.jsx';
import { Glyph, StatusChip } from '../components/Status.jsx';
import { STATUS, classify } from '../lib/status.js';
import { useT } from '../i18n/index.jsx';
import { IND_CFG, IND_ICON, IND_ORDER } from '../data/indicadores.js';
import SERIES from '../data/series.json';
import WAVES from '../data/waves.json';

const ST_ORDER = ['ok', 'warn', 'crit'];

function fmtValue(id, v, { num, hm }) {
  if (id === 'pa') return `${v[0]}/${v[1]}`;
  if (id === 'sn') return hm(v);
  if (id === 'tc') return num(v, 1);
  return String(Math.round(v));
}

function lastValue(id) {
  const q = SERIES[id]['7d'];
  return id === 'pa' ? [q[0][q[0].length - 1], q[1][q[1].length - 1]] : q[q.length - 1];
}

const pad2 = (x) => String(x).padStart(2, '0');

/** Hora do ponto i no período de 24 h (um ponto a cada 30 min, a partir das 07:30 de ontem). */
function clock(i) {
  const mins = 7.5 * 60 + i * 30;
  return { time: `${pad2(Math.floor(mins / 60) % 24)}:${pad2(mins % 60)}`, yesterday: mins < 24 * 60 };
}

/** Rótulo do eixo X para cada ponto do período. */
function whenOf(range, i, n, bars, t) {
  if (range === '24h') {
    const c = clock(i);
    return c.yesterday ? t('time.yesterday', { time: c.time }) : c.time;
  }
  if (range === '7d') {
    if (bars || n === 7) return t('time.day', { n: 41 + i });
    const hours = 7 + i * 2;
    return t('time.dayHour', { n: 41 + Math.floor(hours / 24), time: `${pad2(hours % 24)}:00` });
  }
  return t('time.day', { n: 18 + i });
}

function WaveStrip({ title, data, color, label }) {
  const rows = data.map((v, i) => ({ i, v }));
  return (
    <div>
      <div className="mb-1.5 text-[15px] text-vn-muted">{title}</div>
      <div
        role="img"
        aria-label={label}
        className="h-[70px] rounded-sm"
        style={{ backgroundColor: '#071D38', backgroundImage: 'linear-gradient(#12365C 1px,transparent 1px),linear-gradient(90deg,#12365C 1px,transparent 1px)', backgroundSize: '20px 20px' }}
      >
        <SparkLineChart data={rows} index="i" categories={['v']} colors={[color]} minValue={-0.08} maxValue={1.08} className="h-full w-full" />
      </div>
    </div>
  );
}

export default function Indicadores() {
  const i18n = useT();
  const { t, num, hm, lc } = i18n;
  const [params, setParams] = useSearchParams();
  const id = IND_ORDER.includes(params.get('ind')) ? params.get('ind') : 'sn';
  const cf = IND_CFG[id];
  const tx = (k) => t(`ind.${id}.${k}`);
  const unit = tx('unit');
  const [rangeSel, setRange] = useState('7d');
  const [showVal, setShowVal] = useState(false);
  const range = cf.ranges.includes(rangeSel) ? rangeSel : '7d';
  const dual = !!cf.dual;
  const isBars = cf.mode === 'bars';

  const view = useMemo(() => {
    const raw = SERIES[id][range];
    const A = dual ? raw[0] : raw;
    const B = dual ? raw[1] : null;
    const n = A.length;
    const data = A.map((a, i) => {
      const v = dual ? [a, B[i]] : a;
      const st = classify(id, v);
      return {
        i, a, b: dual ? B[i] : undefined, st,
        outA: dual ? a >= 120 || a < 90 : st !== 'ok',
        outB: dual ? B[i] >= 80 || B[i] < 60 : false,
        when: whenOf(range, i, n, isBars, t)
      };
    });
    const lastP = data[n - 1];
    const avg = (arr) => arr.reduce((x, y) => x + y, 0) / arr.length;
    const outN = data.filter((p) => p.st !== 'ok').length;
    let stats;
    if (dual) stats = [`${Math.round(avg(A))}/${Math.round(avg(B))}`, `${Math.min(...A)}/${Math.min(...B)}`, `${Math.max(...A)}/${Math.max(...B)}`];
    else if (id === 'hu') stats = [num(avg(A), 1), String(Math.min(...A)), String(Math.max(...A))];
    else stats = [fmtValue(id, avg(A), i18n), fmtValue(id, Math.min(...A), i18n), fmtValue(id, Math.max(...A), i18n)];
    // marcas do eixo X
    let xTicks;
    if (range === '24h') xTicks = [0, 12, 24, 36, n - 1];
    else if (range === '7d') xTicks = isBars || n === 7 ? data.map((p) => p.i) : [0, 1, 2, 3, 4, 5, 6].map((d) => Math.min(n - 1, d * 12));
    else xTicks = [0, 7, 15, 22, n - 1];
    const xLabel = (i) => {
      if (range === '24h') return i === n - 1 ? t('time.now') : clock(i).time;
      if (range === '7d' && !(isBars || n === 7)) return t('time.day', { n: 41 + Math.round(i / 12) });
      return whenOf(range, i, n, isBars, t);
    };
    return { data, lastP, stats, outN, n, xTicks, xLabel };
  }, [id, range, dual, isBars, i18n]);

  const lastSt = view.lastP.st;
  const valueTxt = dual ? `${view.lastP.a}/${view.lastP.b}` : fmtValue(id, view.lastP.a, i18n);
  const fmtPoint = (p) => (dual ? `${p.a}/${p.b} ${unit}` : id === 'sn' ? hm(p.a) : id === 'tc' ? `${num(p.a, 1)} ${unit}` : `${p.a} ${unit}`);
  const fmtBar = (p) => (id === 'sn' ? num(p.a, 1) : String(p.a));
  const manualLike = cf.manual || isBars;
  const per = range === '24h' ? t('ind.per.h24')
    : range === '7d' ? (manualLike ? t('ind.per.d7manual', { per: tx('per') }) : t('ind.per.d7'))
      : (manualLike ? t('ind.per.d30manual', { per: tx('per') }) : t('ind.per.d30'));
  const alt = t('ind.alt', {
    name: lc(tx('name')),
    range: t(`ind.ranges.${range}`),
    value: valueTxt,
    unit,
    status: lc(t(`status.${lastSt}`)),
    avg: view.stats[0],
    min: view.stats[1],
    max: view.stats[2],
    out: view.outN,
    n: view.n
  });
  // faixas normais com o rótulo no idioma atual
  const chartCfg = { ...cf, bands: cf.bands.map((b, i) => ({ ...b, label: tx('bands')[i] })) };

  const header = (
    <PageHeader
      title={t('ind.title')}
      sub={t('ind.sub')}
      right={<div className="flex items-center gap-2.5 text-[15px] text-vn-muted"><Icon name="radio" color="#62C3FF" /><span>{t('ind.ringSync')}</span></div>}
    />
  );

  return (
    <Shell header={header}>
      <div className="px-8 pt-[22px]">
        <div role="group" aria-label={t('ind.pickAria')} className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
          {IND_ORDER.map((k) => {
            const v = lastValue(k);
            const st = classify(k, v);
            const on = k === id;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => setParams({ ind: k })}
                className={'flex min-w-0 flex-col items-start justify-between gap-2.5 rounded-sm border px-3.5 py-3 text-left hover:border-vn-accent ' + (on ? 'border-vn-accent bg-vn-surface2 shadow-[inset_0_-4px_0_#62C3FF]' : 'border-vn-line bg-vn-surface')}
              >
                <span className="flex items-center gap-2 text-[15px] leading-tight text-vn-muted"><Icon name={IND_ICON[k]} size={18} color="#62C3FF" />{t(`ind.${k}.short`)}</span>
                <span className="flex items-center gap-2">
                  <span className="text-[26px] font-semibold leading-none tabular-nums">{fmtValue(k, v, i18n)}</span>
                  <Glyph st={st} />
                  <span className="sr-only">{t(`status.${st}`)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5 px-8 pb-12 pt-5">
        <div className="flex flex-wrap items-start gap-5">
          <div className="flex min-w-0 flex-[5_1_520px] flex-col gap-5">
            <Card className="flex min-w-0 flex-col gap-4 px-[22px] py-5">
              <section aria-labelledby="chh" className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-x-[18px] gap-y-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h2 id="chh" className="text-[26px] font-semibold leading-tight">{tx('name')}</h2>
                      <IndicatorInfo id={id} />
                      {(id === 'pa' || id === 'gl') && <RegisterButton kind={id} compact />}
                      <button type="button" aria-haspopup="dialog" onClick={() => setShowVal(true)} className="flex min-h-[36px] items-center gap-2 rounded-sm border border-vn-line2 px-3 text-[17px] font-semibold tabular-nums hover:border-vn-accent">
                        <Glyph st={lastSt} />{valueTxt}<span className="text-sm font-normal text-vn-muted">{unit}</span>
                      </button>
                    </div>
                    <div className="mt-0.5 text-[15px] text-vn-muted">{per} · {tx('axis')}</div>
                  </div>
                  <div role="group" aria-label={t('ind.periodAria')} className="flex gap-1 rounded-sm border border-vn-line bg-vn-field p-1">
                    {cf.ranges.map((r) => (
                      <button key={r} type="button" aria-pressed={r === range} onClick={() => setRange(r)} className={'min-h-[40px] rounded-sm px-3.5 py-1.5 text-[15px] font-semibold ' + (r === range ? 'bg-vn-accent text-vn-ink' : 'text-vn-text')}>
                        {t(`ind.ranges.${r}`)}
                      </button>
                    ))}
                  </div>
                </div>
                <DetailChart
                  data={view.data}
                  cfg={chartCfg}
                  isBars={isBars}
                  dual={dual}
                  xTicks={view.xTicks}
                  xLabel={view.xLabel}
                  fmt={isBars ? fmtBar : fmtPoint}
                  label={alt}
                  showDots={view.n <= 31}
                />
                <ul aria-label={t('ind.legendAria')} className="flex flex-wrap gap-x-5 gap-y-2">
                  {dual && <li className="flex items-center gap-2 text-sm text-vn-muted"><span className="w-[22px] border-t-[3px] border-vn-accent" />{t('ind.systolic')}</li>}
                  {dual && <li className="flex items-center gap-2 text-sm text-vn-muted"><span className="w-[22px] border-t-[3px] border-dashed border-vn-muted" />{t('ind.diastolic')}</li>}
                  {cf.bands.length > 0 && <li className="flex items-center gap-2 text-sm text-vn-muted"><span className="h-3 w-[18px] bg-[rgba(70,211,154,0.25)]" />{t('ind.normalBand')}</li>}
                  {!isBars && <li className="flex items-center gap-2 text-sm text-vn-muted"><span className="h-[11px] w-[11px] rounded-full bg-vn-warn" />{t('ind.outBand')}</li>}
                  {isBars && ST_ORDER.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-vn-muted"><span className="h-3.5 w-3.5 rounded-sm" style={{ background: s === 'ok' ? '#62C3FF' : STATUS[s].col }} />{t(`status.${s}`)}</li>
                  ))}
                </ul>
                <dl className="grid grid-cols-[repeat(auto-fit,minmax(112px,1fr))] gap-3">
                  {[[t('ind.stat.avg'), view.stats[0]], [t('ind.stat.min'), view.stats[1]], [t('ind.stat.max'), view.stats[2]], [t('ind.stat.out'), t('ind.outOf', { a: view.outN, b: view.n })]].map(([k, v]) => (
                    <div key={k} className="min-w-0 rounded-sm border border-vn-line bg-vn-field p-3">
                      <dt className="text-sm text-vn-muted">{k}</dt>
                      <dd className="mt-0.5 whitespace-nowrap text-2xl font-semibold leading-tight tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Card>

            {(id === 'pa' || id === 'gl') && <MyReadings kinds={[id]} />}

            {cf.wave && (
              <Card className="flex min-w-0 flex-col gap-3.5 px-[22px] py-5">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <h2 className="text-[26px] font-semibold leading-tight">{t('ind.wave.title')}</h2>
                  <span className="rounded-full border border-dashed border-vn-line2 px-2.5 py-0.5 text-xs tracking-wider text-vn-muted">{t('ind.wave.simulated')}</span>
                </div>
                <WaveStrip title={t('ind.wave.ppg')} data={WAVES.ppg} color="sky" label={t('ind.wave.ppgAlt')} />
                <WaveStrip title={t('ind.wave.ecg')} data={WAVES.ecg} color="emerald" label={t('ind.wave.ecgAlt')} />
                <p className="text-sm text-vn-subtle">{t('ind.wave.note')}</p>
              </Card>
            )}

            <Card className="flex min-w-0 flex-col gap-3.5 px-[22px] py-5">
              <h2 className="text-[26px] font-semibold leading-tight">{t('ind.howTitle')}</h2>
              <ol className="flex flex-col gap-3.5">
                {tx('how').map((step, i) => (
                  <li key={step} className="flex items-start gap-3.5">
                    <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-vn-surface2 text-[15px] font-medium text-vn-accent">{i + 1}</span>
                    <span className="min-w-0 pt-0.5 text-[17px]">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

        </div>
        <Link to={cf.cta} className="btn-p w-full">{tx('cta')}<Icon name="arrowright" size={18} color="#04162B" stroke={2.2} /></Link>
        <p className="flex items-start gap-2.5 text-sm text-vn-subtle">
          <Icon name="info" size={18} color="#8AA3BD" className="mt-px" />
          <span>{t('ind.disclaimer')}</span>
        </p>
      </div>
      {showVal && (
        <Modal eyebrow={tx('name')} title={t('ind.lastValue')} onClose={() => setShowVal(false)} width={760}>
        <Card className="flex min-w-0 flex-wrap items-center gap-x-8 gap-y-4 px-[22px] py-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-[56px] font-semibold leading-none tabular-nums">{valueTxt}</span>
              <span className="text-lg text-vn-muted">{unit}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
              <StatusChip st={lastSt} size={15} />
            </div>
          </div>
          <div className="flex min-w-[220px] flex-1 flex-col gap-3 border-l border-vn-line pl-8">
            <p className="text-[17px]">{t(`ind.${id}.msg.${lastSt}`)}</p>
            <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-[18px] gap-y-2.5">
              {cf.bands.length > 0 && <><dt className="text-vn-muted">{t('ind.normalLabel')}</dt><dd className="font-semibold">{tx('range')}</dd></>}
              <dt className="text-vn-muted">{t('ind.baseline')}</dt><dd className="font-semibold">{tx('base')}</dd>
              <dt className="text-vn-muted">{t('ind.measurement')}</dt><dd className="font-semibold">{t(`src.${cf.src}`)} · {t(`when.${cf.when}`)}</dd>
            </dl>
          </div>
        </Card>

        <Card className="flex min-w-0 flex-col gap-3.5 px-[22px] py-5">
          <h2 className="text-[26px] font-semibold leading-tight">{t('ind.whatToDo')}</h2>
          <ul className="flex flex-col gap-2.5">
            {tx('acts').map(({ rule, text }, i) => ({ rule, text, i })).filter(({ i }) => ST_ORDER[i] === lastSt).map(({ rule, text, i }) => {
              const st = ST_ORDER[i];
              const here = st === lastSt;
              return (
                <li key={rule} aria-current={here ? 'true' : undefined} className="flex min-w-0 flex-col gap-2 rounded-sm border px-4 py-3.5" style={{ borderColor: here ? STATUS[st].bd : '#1F4469', background: here ? STATUS[st].bg : '#071D38' }}>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                    <StatusChip st={st} size={14} />
                    <span className="text-sm text-vn-muted">{rule}</span>
                  </div>
                  <div className={here ? 'text-vn-text' : 'text-vn-muted'}>{text}</div>
                </li>
              );
            })}
          </ul>
          <Link to={`/recomendacao?ind=${id}`} className="btn-s w-full">{t('ind.openRecommendation')}<Icon name="arrowright" size={17} /></Link>
        </Card>
        </Modal>
      )}
    </Shell>
  );
}
