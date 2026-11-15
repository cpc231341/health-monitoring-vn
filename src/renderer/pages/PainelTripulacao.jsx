import { ProgressBar, SparkAreaChart, SparkBarChart } from '@tremor/react';
import Shell, { Card } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { StatusChip } from '../components/Status.jsx';
import { CREW } from '../data/crew.js';
import { useCrew } from '../lib/crew.js';
import { useT } from '../i18n/index.jsx';
import { useWorkouts } from '../lib/training.js';
import { useTeamStockSummary } from '../lib/food.js';
import { useMeasureDays } from '../lib/medidas.js';
import { teamCount } from '../../shared/rules/measures.js';
import { addDays, toDateStr } from '../../shared/rules/training.js';

// Dados simulados. Só médias do time e sensores da cabine: nada de saúde individual aqui.
// Os textos (títulos, unidades, notas) ficam em i18n/locales: panel.avg, panel.sensors e panel.goals.
const wave = (base, amp, ph, drift = 0, n = 24) => Array.from({ length: n }, (_, i) => base + amp * Math.sin(i / 3.2 + ph) + drift * i);
const rows = (vals) => vals.map((v, i) => ({ i, v }));

// value: [número, casas decimais] ou null quando o texto já vem do dicionário.
const AVERAGES = [
  { k: 'sleep', icon: 'moon', st: 'warn', kind: 'bar', vals: [7.1, 6.9, 7.2, 6.6, 6.8, 6.7, 6.8], lo: 0, hi: 9, band: null, hours: 6.8, week: true },
  { k: 'mood', icon: 'smile', st: 'ok', kind: 'line', vals: [3.8, 3.6, 3.9, 3.5, 3.7, 3.4, 3.6], lo: 1, hi: 5, band: null, value: [3.6, 1], week: true },
  { k: 'train', icon: 'dumbbell', st: 'ok', kind: 'bar', vals: [3, 4, 5, 3, 4, 4, 4], lo: 0, hi: 5, band: null, done: 4, week: true }
];

const SENSORS = [
  { k: 'radiation', icon: 'atom', st: 'ok', vals: wave(0.6, 0.05, 0.2), lo: 0.3, hi: 1.0, band: [0.4, 0.8], value: [0.6, 2], w: 2 },
  { k: 'co2', icon: 'wind', st: 'ok', vals: wave(2800, 260, 1.0), lo: 1500, hi: 4500, band: [2000, 3600], value: [2800, 0], w: 2 },
  { k: 'temp', icon: 'thermo', st: 'ok', vals: wave(22.5, 0.5, 2.0), lo: 19, hi: 26, band: [20, 25], value: [22.5, 1], w: 2 },
  { k: 'humidity', icon: 'droplet', st: 'warn', vals: wave(55, 4, 0.5, 0.35), lo: 30, hi: 70, band: [40, 60], value: [63, 0], w: 3 },
  { k: 'pressure', icon: 'gauge', st: 'ok', vals: wave(101.3, 0.35, 1.6), lo: 98, hi: 104, band: [99, 103], value: [101.3, 1], w: 3 }
];

const GOALS = [
  { k: 'training', done: 18, total: 25 },
  { k: 'mood', done: 12, total: 14 },
  { k: 'reports', done: 46, total: 47 },
  { k: 'measures', done: 0, total: 15 }
];

const COLOR = { ok: 'emerald', warn: 'amber', crit: 'rose' };

function Tile({ t }) {
  const { t: tr, num, hm } = useT();
  const base = t.group + '.' + t.k;
  const title = tr(`${base}.title`);
  const unit = tr(`${base}.unit`);
  const foot = tr(`${base}.foot`, { n: CREW.length });
  let value;
  if (t.hours != null) value = hm(t.hours);
  else if (t.done != null) value = tr(`${base}.value`, { done: t.done, n: CREW.length });
  else value = num(t.value[0], t.value[1]);
  const yp = (v) => 100 - ((v - t.lo) / (t.hi - t.lo)) * 100;
  const span = t.week ? [tr('time.daysAgo7'), tr('time.today')] : [tr('time.hoursAgo24'), tr('time.now')];
  return (
    <Card className="flex min-w-0 flex-col gap-3 px-[18px] py-4" style={{ gridColumn: `span ${t.w || 2}` }}>
      <div className="flex items-center justify-between gap-2.5">
        <span className="flex items-center gap-2.5 text-[17px] font-semibold"><Icon name={t.icon} color="#62C3FF" />{title}</span>
        <StatusChip st={t.st} />
      </div>
      <div className="relative h-24 border border-vn-line bg-vn-field" role="img" aria-label={tr('panel.tileAria', { title, value, unit, foot })}>
        {t.band && (
          <div aria-hidden="true" className="absolute inset-x-0 bg-[rgba(70,211,154,0.12)]" style={{ top: `${yp(t.band[1])}%`, height: `${yp(t.band[0]) - yp(t.band[1])}%` }} />
        )}
        {t.kind === 'bar' ? (
          <SparkBarChart data={rows(t.vals)} index="i" categories={['v']} colors={[COLOR[t.st] === 'amber' ? 'emerald' : COLOR[t.st]]} minValue={t.lo} maxValue={t.hi} className="absolute inset-0 h-full w-full px-2" />
        ) : (
          <SparkAreaChart data={rows(t.vals)} index="i" categories={['v']} colors={[COLOR[t.st]]} minValue={t.lo} maxValue={t.hi} curveType="monotone" className="absolute inset-0 h-full w-full" />
        )}
      </div>
      <div aria-hidden="true" className="-mt-1.5 flex justify-between text-[13px] text-vn-subtle"><span>{span[0]}</span><span>{span[1]}</span></div>
      <div className="flex flex-wrap items-baseline gap-1.5">
        <span className="text-[30px] font-semibold leading-none tabular-nums">{value}</span>
        <span className="text-[15px] text-vn-muted">{unit}</span>
      </div>
      <div className="-mt-1 text-sm text-vn-subtle">{foot}</div>
    </Card>
  );
}

function H2({ title, sub }) {
  return (
    <div className="flex flex-col gap-0.5">
      <h2 className="text-[22px] font-semibold">{title}</h2>
      <span className="text-[15px] text-vn-muted">{sub}</span>
    </div>
  );
}

export default function PainelTripulacao() {
  const { t } = useT();
  const crew = useCrew();
  // Treino do time vem dos treinos salvos de toda a tripulação.
  const { workouts } = useWorkouts();
  const today = toDateStr();
  const week = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  const perDay = week.map((d) => new Set(workouts.filter((w) => w.date === d).map((w) => w.astronautId)).size);
  const trainedToday = perDay[6];
  const sessions7 = workouts.filter((w) => week.includes(w.date)).length;
  // Estoque do cardápio: só totais do time, sem nomes.
  const foodStock = useTeamStockSummary();
  // Medidas registradas hoje: só a contagem do time, nunca valores nem nomes.
  const measureDays = useMeasureDays();
  const measuresToday = teamCount(measureDays, today);
  const header = (
    <header className="border-b border-vn-line px-8 py-5">
      <h1 className="text-[32px] font-semibold leading-tight">{t('panel.title')}</h1>
    </header>
  );
  return (
    <Shell header={header}>
      <div className="flex flex-col gap-[30px] px-8 pb-10 pt-6">
        <section className="flex flex-col gap-3.5">
          <H2 title={t('panel.whoTitle')} sub={t('panel.whoSub')} />
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3.5">
            {crew.map((c) => (
              <li key={c.key} className={'flex min-w-0 flex-col gap-2.5 rounded-[4px] border bg-vn-surface p-3.5 ' + (c.captain ? 'border-vn-gold' : 'border-vn-line')}>
                <div className="flex items-center gap-3">
                  <Avatar person={c} size={44} />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-semibold leading-tight">{c.name}</span>
                    <span className="text-sm text-vn-muted">{c.role}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-vn-line pt-2.5">
                  <span className="text-[15px]">{c.activity}</span>
                  {c.eva && <span className="rounded-sm border border-vn-accent px-2 py-0.5 text-xs font-semibold tracking-wider text-vn-accent">{t('panel.eva')}</span>}
                </div>
                <div className="flex min-h-[18px] items-center justify-between gap-2">
                  <span className="text-[13px] text-vn-subtle">{c.until || t('panel.nowLabel')}</span>
                  {c.captain && <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-vn-gold"><Icon name="star" size={12} color="#FFC24B" stroke={2.2} />{t('crew.captain')}</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3.5">
          <H2 title={t('panel.avgTitle')} sub={t('panel.avgSub', { n: CREW.length })} />
          <div className="grid grid-cols-6 gap-4">{AVERAGES.map((a) => <Tile key={a.k} t={{ ...a, ...(a.k === 'train' ? { done: trainedToday, vals: perDay } : {}), group: 'panel.avg' }} />)}</div>
        </section>

        <section className="flex flex-col gap-3.5">
          <H2 title={t('panel.sensorsTitle')} sub={t('panel.sensorsSub')} />
          <div className="grid grid-cols-6 gap-4">{SENSORS.map((s) => <Tile key={s.k} t={{ ...s, group: 'panel.sensors' }} />)}</div>
        </section>

        <section className="flex flex-col gap-3.5">
          <H2 title={t('panel.goalsTitle')} sub={t('panel.goalsSub')} />
          <Card className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[26px] px-[22px] py-5">
            {[...GOALS.map((goal) => (goal.k === 'training' ? { ...goal, done: sessions7 } : goal.k === 'measures' ? { ...goal, done: measuresToday, total: crew.length * 3 } : goal)), ...['principal', 'sobremesa'].map((cat) => ({ k: `stock-${cat}`, stock: cat, done: foodStock[cat].left, total: foodStock[cat].total }))].map((g) => {
              const pct = Math.round((g.done / g.total) * 100);
              return (
                <div key={g.k} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold">{g.stock ? `${t('food.stockTitle')} · ${t(`food.categories.${g.stock}`)}` : t(`panel.goals.${g.k}.title`)}</span>
                    <span className="text-[15px] tabular-nums text-vn-muted"><b className="text-lg text-vn-text">{g.done}</b> {t('panel.goalOf', { total: g.total, unit: g.stock ? t('food.portionsUnit') : t(`panel.goals.${g.k}.unit`) })}</span>
                  </div>
                  <ProgressBar value={(g.done / g.total) * 100} color="sky" aria-label={t('panel.goalAria', { pct })} />
                  <span className="text-sm text-vn-subtle">{g.stock ? t('food.stockSub') : t(`panel.goals.${g.k}.note`)}</span>
                </div>
              );
            })}
          </Card>
        </section>

        <p className="flex items-start gap-2.5 border-t border-vn-line pt-4 text-sm text-vn-subtle">
          <Icon name="info" size={18} color="#8AA3BD" />
          <span>{t('panel.footnote')}</span>
        </p>
      </div>
    </Shell>
  );
}
