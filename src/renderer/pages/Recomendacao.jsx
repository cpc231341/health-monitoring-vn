import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import { StatusChip } from '../components/Status.jsx';
import { STATUS } from '../lib/status.js';
import { useDemo } from '../lib/demo.jsx';
import { toMinutes, useMissionClock } from '../lib/clock.jsx';
import { useT } from '../i18n/index.jsx';
import { ENVIRONMENTS, SCENARIOS } from '../data/hoje.js';
import { IND_ICON, IND_ORDER } from '../data/indicadores.js';
import { compute } from './Hoje.jsx';

// Rotina de medições do dia (horário, indicador e fonte). Os textos vêm de i18n: ind.<id>.name e src.<fonte>.
const ROUTINE = [
  { ind: 'fc', time: '06:45', src: 'ring' },
  { ind: 'sn', time: '06:45', src: 'ring' },
  { ind: 'tc', time: '06:45', src: 'ringManual' },
  { ind: 'pa', time: '07:30', src: 'manual' },
  { ind: 'gl', time: '07:45', src: 'manual' },
  { ind: 'hu', time: '21:30', src: 'you' }
];
const ST_ORDER = ['ok', 'warn', 'crit'];
const worst = (list) => (list.includes('crit') ? 'crit' : list.includes('warn') ? 'warn' : 'ok');

function Step({ n, title, sub, children }) {
  const { t } = useT();
  return (
    <Card className="flex flex-col gap-4 px-[22px] py-5">
      <section aria-labelledby={`rec-s${n}`} className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-vn-accent text-lg font-bold text-vn-ink">{n}</span>
          <div className="min-w-0">
            <div className="mono-label text-vn-subtle">{t('rec.step', { n })}</div>
            <h2 id={`rec-s${n}`} className="text-[24px] font-semibold leading-tight">{title}</h2>
            <p className="mt-0.5 text-[15px] text-vn-muted">{sub}</p>
          </div>
        </div>
        {children}
      </section>
    </Card>
  );
}

export default function Recomendacao() {
  const i18n = useT();
  const { t } = i18n;
  const { scen, env } = useDemo();
  const { minutes } = useMissionClock();
  const [params] = useSearchParams();
  const focus = IND_ORDER.includes(params.get('ind')) ? params.get('ind') : null;
  const R = useMemo(() => compute(SCENARIOS[scen], ENVIRONMENTS[env], i18n), [scen, env, i18n]);

  const overall = worst(IND_ORDER.map((k) => R[k].st));
  const nextTime = ROUTINE.map((r) => toMinutes(r.time)).find((m) => m >= minutes);
  const stateOf = (time) => {
    const m = toMinutes(time);
    return m < minutes ? 'done' : m === nextTime ? 'next' : 'later';
  };
  const actions = IND_ORDER.filter((k) => R[k].st !== 'ok' || k === focus).sort((a, b) => ST_ORDER.indexOf(R[b].st) - ST_ORDER.indexOf(R[a].st));
  const outOfRange = IND_ORDER.filter((k) => R[k].st !== 'ok');

  return (
    <Shell
      header={
        <PageHeader
          title={t('nav.recommendation')}
          sub={t('rec.sub')}
          right={
            <div className="flex items-center gap-2.5 text-[15px] text-vn-muted">
              {t('rec.overall')}
              <StatusChip st={overall} size={15} />
            </div>
          }
        />
      }
    >
      <div className="flex flex-col gap-5 px-8 pb-12 pt-6">
        <Step n={1} title={t('rec.s1.title')} sub={t('rec.s1.sub')}>
          <ul className="flex flex-col">
            {ROUTINE.map((r) => {
              const st = stateOf(r.time);
              return (
                <li key={`${r.ind}-${r.time}`} className="grid grid-cols-[58px_24px_minmax(0,1fr)_auto] items-center gap-x-3.5 border-t border-vn-line py-3">
                  <span className="text-[15px] text-vn-muted">{r.time}</span>
                  <Icon name={IND_ICON[r.ind]} size={21} color="#62C3FF" />
                  <span className="min-w-0">
                    <span className="text-[17px] font-semibold">{t(`ind.${r.ind}.name`)}</span>
                    <span className="ml-2 text-[15px] text-vn-muted">{t(`src.${r.src}`)}</span>
                  </span>
                  <span
                    className={'rounded-sm border px-2.5 py-0.5 text-sm font-semibold ' + (st === 'next' ? 'border-vn-accent text-vn-accent' : st === 'done' ? 'border-[rgba(70,211,154,0.45)] text-vn-ok' : 'border-vn-line2 text-vn-muted')}
                  >
                    {t(`rec.state.${st}`)}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link to="/medir" className="btn-s w-fit">{t('nav.measure')}<Icon name="arrowright" size={17} /></Link>
        </Step>

        <Step n={2} title={t('rec.s2.title')} sub={t('rec.s2.sub')}>
          <div className="flex flex-col">
            <div aria-hidden="true" className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)_110px] gap-x-3.5 pb-2 text-sm text-vn-subtle">
              <span />
              <span>{t('rec.valueCol')}</span>
              <span>{t('ind.normalLabel')}</span>
              <span />
            </div>
            {IND_ORDER.map((k) => (
              <div key={k} className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)_110px] items-center gap-x-3.5 border-t border-vn-line py-2.5">
                <span className="font-semibold">{t(`ind.${k}.name`)}</span>
                <span className="tabular-nums">{R[k].sig}</span>
                <span className="text-[15px] text-vn-muted">{k === 'hu' ? '' : t(`ind.${k}.range`)}</span>
                <span><StatusChip st={R[k].st} /></span>
              </div>
            ))}
          </div>
        </Step>

        <Step n={3} title={t('rec.s3.title')} sub={t('rec.s3.sub')}>
          {actions.length === 0 && <p className="text-[17px]">{t('rec.allGood')}</p>}
          <ul className="flex flex-col gap-3">
            {actions.map((k) => {
              const st = R[k].st;
              const act = t(`ind.${k}.acts`)[ST_ORDER.indexOf(st)];
              return (
                <li key={k} className="flex flex-col gap-2 rounded-sm border px-4 py-3.5" style={{ borderColor: STATUS[st].bd, background: STATUS[st].bg }}>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                    <span className="flex items-center gap-2.5 text-[18px] font-semibold">
                      <Icon name={IND_ICON[k]} color={STATUS[st].col} />
                      {t(`ind.${k}.name`)}
                      {k === focus && <span className="rounded-sm border border-vn-accent px-2 py-0.5 text-xs font-semibold tracking-wider text-vn-accent">{t('rec.focus')}</span>}
                    </span>
                    <StatusChip st={st} />
                  </div>
                  <p className="text-[17px]">{act.text}</p>
                  <Link to={`/indicadores?ind=${k}`} className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold">{t('rec.openIndicator')}<Icon name="arrowright" size={16} /></Link>
                </li>
              );
            })}
          </ul>
        </Step>

        <Step n={4} title={t('rec.s4.title')} sub={t('rec.s4.sub')}>
          <p className="text-[17px]">{t(`rec.notify.${overall}`)}</p>
          <div className="flex flex-col gap-2 rounded-sm border border-vn-line bg-vn-field px-4 py-3.5">
            <h3 className="text-lg font-semibold">{t('rec.baseTitle')}</h3>
            {outOfRange.map((k) => (
              <div key={k} className="flex flex-wrap items-center justify-between gap-2 text-[15px]">
                <span>{t(`ind.${k}.name`)} · <span className="tabular-nums">{R[k].sig}</span></span>
                <StatusChip st={R[k].st} />
              </div>
            ))}
            <p className="text-sm text-vn-subtle">{t('rec.baseHint', { delay: t(`environments.${env}.delay`) })}</p>
          </div>
        </Step>
      </div>
    </Shell>
  );
}
