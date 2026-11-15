import { Navigate } from 'react-router-dom';
import { ProgressBar } from '@tremor/react';
import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { StatusChip } from '../components/Status.jsx';
import { kindName } from '../components/QuickEntry.jsx';
import { useUser } from '../lib/user.jsx';
import { useCrew } from '../lib/crew.js';
import { useCaptain } from '../lib/capitao.js';
import { useT } from '../i18n/index.jsx';
import { KINDS } from '../../shared/rules/measures.js';
import { TEAM_GOAL_PCT } from '../../shared/rules/achievements.js';

const ST = { normal: 'ok', warning: 'warn', critical: 'crit' };
const h2 = 'flex items-center gap-2.5 text-[22px] font-semibold leading-tight';

function Panel() {
  const { t } = useT();
  const crew = useCrew();
  const { summaries, ready, team, queue, ack } = useCaptain();
  const person = (key) => crew.find((c) => c.key === key);

  return (
    <Shell header={<PageHeader title={t('nav.commander')} sub={t('cap.sub')} />}>
      <div className="flex flex-col gap-5 px-8 pb-12 pt-6">
        {/* fila de decisão (RN04): só aparece o que escalou depois da re-medição */}
        <Card className={'flex flex-col gap-3 px-[22px] py-5 ' + (queue.length ? 'border-[rgba(255,123,123,0.55)]' : '')}>
          <section aria-labelledby="cap-dec" className="flex flex-col gap-3">
            <h2 id="cap-dec" className={h2}><Icon name={queue.length ? 'alert' : 'checkc'} size={24} color={queue.length ? '#FF7B7B' : '#46D39A'} />{t('cap.decision.title')}</h2>
            <p className="text-[15px] text-vn-muted">{t('cap.decision.sub')}</p>
            {queue.length === 0 ? (
              <p className="text-[16px] text-vn-ok" role="status">{t('cap.decision.empty')}</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {queue.map((e) => {
                  const p = person(e.crew);
                  const name = p.first;
                  const measure = kindName(t, e.kind);
                  return (
                    <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[rgba(255,123,123,0.55)] bg-[rgba(255,123,123,0.12)] px-3.5 py-3">
                      <span className="flex min-w-0 items-center gap-3">
                        <Avatar person={p} size={40} />
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[16px] font-semibold">{t('cap.decision.item', { name, measure })}</span>
                          <span className="text-[14px] text-vn-muted">{t('cap.decision.hint')}</span>
                        </span>
                      </span>
                      <button type="button" className="btn-s" aria-label={t('cap.decision.ackAria', { name, measure })} onClick={() => ack(e.id)}>
                        <Icon name="check" size={17} stroke={2.2} />{t('cap.decision.ack')}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </Card>

        {/* estado de cada tripulante */}
        <section aria-labelledby="cap-crew" className="flex flex-col gap-3">
          <h2 id="cap-crew" className={h2}><Icon name="users" size={24} color="#4FB0FF" />{t('cap.crew.title')}</h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
            {summaries.map((s) => {
              const p = person(s.key);
              return (
                <li key={s.key} className={'flex min-w-0 flex-col gap-2.5 rounded-[4px] border bg-vn-surface p-3.5 ' + (s.status === 'critical' ? 'border-[rgba(255,123,123,0.55)]' : p.captain ? 'border-vn-gold' : 'border-vn-line')}>
                  <div className="flex items-center gap-3">
                    <Avatar person={p} size={44} />
                    <span className="flex min-w-0 flex-col">
                      <span className="font-semibold leading-tight">{p.name}</span>
                      <span className="text-sm text-vn-muted">{p.role}</span>
                    </span>
                  </div>
                  <StatusChip st={ST[s.status]} />
                  <div className="flex items-center justify-between gap-2 border-t border-vn-line pt-2.5">
                    <span className="text-[15px]">{p.activity}</span>
                    {p.eva && <span className="rounded-sm border border-vn-accent px-2 py-0.5 text-xs font-semibold tracking-wider text-vn-accent">{t('panel.eva')}</span>}
                  </div>
                  <ul className="flex flex-col gap-1 text-[14px] text-vn-muted">
                    <li className="flex items-center gap-2"><Icon name="gauge" size={15} />{t('cap.crew.measures', { n: s.measures })}{s.measures === KINDS.length && <Icon name="checkc" size={14} color="#46D39A" />}</li>
                    <li className="flex items-center gap-2"><Icon name="dumbbell" size={15} />{s.trained ? t('cap.crew.trained') : t('cap.crew.notTrained')}</li>
                    <li className="flex items-center gap-2"><Icon name="battery" size={15} color={s.charging ? '#FFC24B' : 'currentColor'} />{s.charging ? t('cap.crew.charging') : t('cap.crew.battery', { n: s.battery })}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex flex-wrap items-stretch gap-5">
          {/* prontidão da missão */}
          <Card className="flex min-w-0 flex-[1_1_320px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="cap-ready" className="flex flex-col gap-3">
              <h2 id="cap-ready" className={h2}><Icon name="shield" size={24} color="#4FB0FF" />{t('cap.ready.title')}</h2>
              <div className="text-[44px] font-semibold leading-none tabular-nums">{t('cap.ready.fit', { n: ready.fit, total: ready.total })}</div>
              <ul className="flex flex-col gap-1 text-[15px] text-vn-muted">
                <li>{t('cap.ready.attention', { n: ready.attention })}</li>
                <li>{t('cap.ready.charging', { n: ready.charging })}</li>
              </ul>
              <p className="text-[14px] text-vn-subtle">{t('cap.ready.note')}</p>
            </section>
          </Card>

          {/* metas do time: as mesmas das Conquistas, só totais */}
          <Card className="flex min-w-0 flex-[2_1_420px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="cap-goals" className="flex flex-col gap-3">
              <h2 id="cap-goals" className={h2}><Icon name="trophy" size={24} color="#FFC24B" />{t('gm.team.title')}</h2>
              {['measures', 'train'].map((k) => {
                const g = team[k];
                return (
                  <div key={k} className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-[16px] font-semibold">{t(`gm.team.${k}`)}</span>
                      <span className="text-[14px] text-vn-muted tabular-nums">{t('gm.team.count', { done: g.done, total: g.total })} · {t('gm.team.goal', { pct: TEAM_GOAL_PCT })}</span>
                    </div>
                    <ProgressBar value={g.pct} color={g.unlocked ? 'emerald' : 'sky'} aria-label={`${t(`gm.team.${k}`)}: ${g.pct}%`} />
                  </div>
                );
              })}
            </section>
          </Card>
        </div>

        <p className="flex items-start gap-2 text-[14px] text-vn-subtle"><Icon name="lock" size={16} />{t('cap.privacy')}</p>
      </div>
    </Shell>
  );
}

// Só o capitão entra aqui (RN06: o nível "Comandante" vê resumos).
export default function Comandante() {
  const { me } = useUser();
  return me.captain ? <Panel /> : <Navigate to="/hoje" replace />;
}
