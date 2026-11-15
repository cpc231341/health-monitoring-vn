import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import Icon from '../components/Icon.jsx';
import LegalFooter from '../components/LegalFooter.jsx';
import { useUser } from '../lib/user.jsx';
import { useMeasures } from '../lib/medidas.js';
import { RING } from '../data/capitao.js';
import { useT } from '../i18n/index.jsx';
import { KINDS, registeredOn } from '../../shared/rules/measures.js';
import { SYNC_STEPS, ringState, stepOutcome } from '../../shared/rules/ring.js';
import { toDateStr } from '../../shared/rules/training.js';

const STEP_MS = 900;
const COLOR = { ok: '#46D39A', warn: '#FFC24B' };

// Entre a senha e o painel: o app busca as leituras do anel e confere as medidas do dia (RF27).
// Anel carregando não bloqueia: não há leituras novas, a sequência não quebra (RN14) e dá para medir à mão.
export default function Sincronizar() {
  const { t } = useT();
  const { me, authed, markSynced } = useUser();
  const nav = useNavigate();
  const { measures } = useMeasures(me.key);
  const [done, setDone] = useState(0);
  const battery = RING[me.key]?.battery ?? null;
  const state = ringState(battery);
  const finished = done >= SYNC_STEPS.length;

  useEffect(() => {
    if (finished) return undefined;
    const id = setTimeout(() => setDone((n) => n + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [done, finished]);

  if (!authed) return <Navigate to="/" replace />;

  const enter = () => { markSynced(); nav('/hoje'); };
  const registered = registeredOn(measures, me.key, toDateStr()).size;
  const label = (step, i) => {
    if (i >= done) return t(`syncPage.steps.${step}`);
    return t(`syncPage.done.${step}${stepOutcome(step, state) === 'warn' ? 'Warn' : 'Ok'}`);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-vn-deep text-vn-text">
      <Brand />
      <main className="flex min-h-0 flex-1 items-center justify-center px-8">
        <div className="flex w-full max-w-[560px] flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="mono-label text-vn-subtle">{t('syncPage.hello', { name: me.first })}</span>
            <h1 className="text-[32px] font-semibold leading-tight">{t('syncPage.title')}</h1>
            <p className="text-[16px] text-vn-muted">{t('syncPage.sub')}</p>
          </div>

          <div className="flex flex-col gap-4 rounded-[4px] border border-vn-line bg-vn-surface px-[22px] py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 text-[18px] font-semibold">
                <Icon name="ring" size={24} color={finished ? COLOR[state === 'charging' ? 'warn' : 'ok'] : '#4FB0FF'} />
                {finished ? t(`syncPage.ring.${state}`) : t('syncPage.running')}
              </span>
              {battery != null && <span className="text-[15px] text-vn-muted tabular-nums">{t('syncPage.ring.battery', { n: battery })}</span>}
            </div>

            <ol className="flex flex-col gap-2.5" aria-live="polite">
              {SYNC_STEPS.map((step, i) => {
                const outcome = stepOutcome(step, state);
                const isDone = i < done;
                const running = i === done;
                return (
                  <li key={step} className={'flex items-center gap-3 text-[16px] ' + (isDone ? '' : running ? '' : 'text-vn-subtle')}>
                    {isDone
                      ? <Icon name={outcome === 'warn' ? 'alert' : 'checkc'} size={20} color={COLOR[outcome]} />
                      : running
                        ? <Icon name="refresh" size={20} color="#4FB0FF" className="animate-spin motion-reduce:animate-none" />
                        : <Icon name="clock" size={20} color="#5B7894" />}
                    <span>{label(step, i)}</span>
                  </li>
                );
              })}
            </ol>

            {finished && (
              <div className="flex flex-col gap-2 border-t border-vn-line pt-4" role="status">
                <p className={'text-[16px] ' + (state === 'charging' ? 'text-vn-warn' : 'text-vn-ok')}>{t(`syncPage.result.${state}`)}</p>
                <p className="text-[15px] text-vn-muted tabular-nums">{t('syncPage.today', { n: registered, total: KINDS.length })}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn-p disabled:cursor-not-allowed disabled:opacity-50" disabled={!finished} onClick={enter}>{t('syncPage.enter')}</button>
            {finished && state === 'charging' && <button type="button" className="btn-s" onClick={() => setDone(0)}>{t('syncPage.retry')}</button>}
            {!finished && <button type="button" className="btn-s" onClick={enter}>{t('syncPage.skip')}</button>}
          </div>
        </div>
      </main>
      <LegalFooter />
    </div>
  );
}
