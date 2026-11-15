import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from '@tremor/react';
import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import { kindName } from '../components/QuickEntry.jsx';
import { useUser } from '../lib/user.jsx';
import { useAchievements } from '../lib/conquistas.js';
import { useMeasures } from '../lib/medidas.js';
import { useWorkouts } from '../lib/training.js';
import { useT } from '../i18n/index.jsx';
import { KINDS, measureStreak, registeredOn } from '../../shared/rules/measures.js';
import { POINTS, SHIELDS_PER_MONTH, TEAM_GOAL_PCT } from '../../shared/rules/achievements.js';
import { addDays, buildDays, computeStreak, toDateStr } from '../../shared/rules/training.js';

const ICON = { pa: 'gauge', gl: 'droplet', kg: 'scale' };
const BADGE_ICON = { measureStreak: 'gauge', trainStreak: 'flame', workouts: 'dumbbell', moodDays: 'smile', mealDays: 'utensils', missionStreak: 'star' };
const MISSION = [
  { k: 'measures', to: '/medir', icon: 'gauge' },
  { k: 'train', to: '/rotina', icon: 'dumbbell' },
  { k: 'mood', to: '/diario', icon: 'smile' }
];
const h2 = 'flex items-center gap-2.5 text-[22px] font-semibold leading-tight';

// Premia o hábito (registrar, treinar), nunca o valor medido, e só compara a pessoa com ela mesma.
export default function Conquistas() {
  const { t } = useT();
  const { me } = useUser();
  const { measures } = useMeasures(me.key);
  const { workouts } = useWorkouts(me.key);
  const ach = useAchievements();
  const today = toDateStr();
  const streak = measureStreak(measures, me.key, today);
  const trainStreak = computeStreak(buildDays(workouts, today));
  const grid = useMemo(
    () => Array.from({ length: 14 }, (_, i) => {
      const date = addDays(today, i - 13);
      return { date, kinds: registeredOn(measures, me.key, date) };
    }),
    [measures, me.key, today]
  );
  const { level, mission, recap, team } = ach;
  const earned = ach.badges.filter((b) => b.unlocked).length;
  const delta = recap.delta;

  return (
    <Shell header={<PageHeader title={t('nav.achievements')} sub={t('gm.sub')} />}>
      <div className="flex flex-col gap-5 px-8 pb-12 pt-6">
        {/* nível e pontos */}
        <Card className="flex flex-col gap-3 px-[22px] py-5">
          <section aria-labelledby="gm-level" className="flex flex-col gap-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h2 id="gm-level" className="mono-label text-vn-subtle">{t('gm.level.title')}</h2>
                <div className="flex items-center gap-3 text-[34px] font-semibold leading-none">
                  <Icon name="star" size={32} color="#FFC24B" />
                  <span>{t(`gm.level.l${level.index}`)}</span>
                  <span className="text-[18px] font-normal text-vn-muted">{t('gm.level.points', { n: ach.points })}</span>
                </div>
              </div>
              <span className="text-[15px] text-vn-muted">
                {level.next == null ? t('gm.level.max') : t('gm.level.toNext', { n: level.toNext, name: t(`gm.level.l${level.index + 1}`) })}
              </span>
            </div>
            <ProgressBar value={level.pct} color="amber" aria-label={`${t('gm.level.title')}: ${level.pct}%`} />
            <p className="text-[14px] text-vn-subtle">
              <span className="font-semibold text-vn-muted">{t('gm.level.howTitle')}: </span>
              {t('gm.level.how', { workout: POINTS.workout, measure: POINTS.measure, complete: POINTS.measuresComplete, mood: POINTS.mood, meal: POINTS.meal, mission: POINTS.mission })}
            </p>
          </section>
        </Card>

        <div className="flex flex-wrap items-stretch gap-5">
          {/* missão do dia */}
          <Card className="flex min-w-0 flex-[3_1_420px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="gm-mission" className="flex flex-col gap-3">
              <h2 id="gm-mission" className={h2}><Icon name="check" size={24} color="#46D39A" />{t('gm.mission.title')}</h2>
              <p className="text-[15px] text-vn-muted">{t('gm.mission.sub')}</p>
              <ul className="flex flex-col gap-2">
                {MISSION.map(({ k, to, icon }) => {
                  const done = mission.items[k];
                  const label = k === 'train' && mission.rest ? t('gm.mission.rest') : t(`gm.mission.${k}`);
                  return (
                    <li key={k} className={'flex items-center justify-between gap-3 rounded-sm border px-3.5 py-2.5 ' + (done ? 'border-vn-ok bg-[rgba(70,211,154,0.10)]' : 'border-vn-line bg-vn-field')}>
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon name={icon} size={20} color={done ? '#46D39A' : '#8FB3D6'} />
                        <span className="text-[16px]">{label}</span>
                      </span>
                      <span className="flex flex-none items-center gap-3">
                        <span className={'flex items-center gap-1.5 text-sm font-semibold ' + (done ? 'text-vn-ok' : 'text-vn-muted')}>
                          <Icon name={done ? 'checkc' : 'clock'} size={16} color={done ? '#46D39A' : '#8FB3D6'} />
                          {done ? t('gm.mission.done') : t('gm.mission.todo')}
                        </span>
                        {!done && <Link to={to} className="text-sm font-semibold text-vn-accent underline-offset-2 hover:underline">{t('gm.mission.open')}</Link>}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className={'text-[15px] ' + (mission.done ? 'font-semibold text-vn-ok' : 'text-vn-muted')} role="status">
                {mission.done ? t('gm.mission.complete', { n: POINTS.mission }) : t('gm.mission.reward', { n: POINTS.mission })}
              </p>
            </section>
          </Card>

          {/* sequência de missões e escudos */}
          <Card className="flex min-w-0 flex-[2_1_300px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="gm-streak" className="flex flex-col gap-3">
              <h2 id="gm-streak" className={h2}><Icon name="flame" size={24} color="#FFC24B" />{t('gm.streak.title')}</h2>
              <div className="text-[56px] font-semibold leading-none tabular-nums">{t('measure.ach.days', { n: ach.streak.streak })}</div>
              <div className="flex items-center gap-2" role="img" aria-label={t('gm.streak.shields', { left: ach.streak.left, max: SHIELDS_PER_MONTH })}>
                {Array.from({ length: SHIELDS_PER_MONTH }, (_, i) => (
                  <Icon key={i} name="shield" size={24} color={i < ach.streak.left ? '#4FB0FF' : '#3C5A78'} stroke={2} />
                ))}
                <span className="text-[15px] text-vn-muted">{t('gm.streak.shields', { left: ach.streak.left, max: SHIELDS_PER_MONTH })}</span>
              </div>
              <p className="text-[14px] text-vn-subtle">{t('gm.streak.note')}</p>
            </section>
          </Card>
        </div>

        {/* selos */}
        <Card className="flex flex-col gap-3 px-[22px] py-5">
          <section aria-labelledby="gm-badges" className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="gm-badges" className={h2}><Icon name="trophy" size={24} color="#FFC24B" />{t('gm.badge.title')}</h2>
              <span className="text-[15px] text-vn-muted tabular-nums">{earned} / {ach.badges.length}</span>
            </div>
            <p className="text-[15px] text-vn-muted">{t('gm.badge.sub')}</p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {ach.badges.map((b) => (
                <li key={b.id} className={'flex flex-col gap-2 rounded-sm border px-3.5 py-3 ' + (b.unlocked ? 'border-[#FFC24B] bg-[rgba(255,194,75,0.10)]' : 'border-vn-line bg-vn-field')}>
                  <div className="flex items-start gap-2.5">
                    <Icon name={BADGE_ICON[b.metric]} size={22} color={b.unlocked ? '#FFC24B' : '#5B7894'} />
                    <span className={'text-[15px] font-semibold leading-snug ' + (b.unlocked ? '' : 'text-vn-muted')}>{t(`gm.badge.${b.metric}`, { n: b.target })}</span>
                  </div>
                  {b.unlocked ? (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-[#FFC24B]"><Icon name="checkc" size={16} color="#FFC24B" />{t('gm.badge.earned')}</span>
                  ) : (
                    <>
                      <ProgressBar value={b.pct} color="sky" aria-label={t('gm.badge.progress', { value: b.value, target: b.target })} />
                      <span className="text-[13px] text-vn-subtle tabular-nums">{t('gm.badge.progress', { value: b.value, target: b.target })}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </Card>

        <div className="flex flex-wrap items-stretch gap-5">
          {/* metas do time: só totais */}
          <Card className="flex min-w-0 flex-[1_1_380px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="gm-team" className="flex flex-col gap-3">
              <h2 id="gm-team" className={h2}><Icon name="users" size={24} color="#4FB0FF" />{t('gm.team.title')}</h2>
              <p className="text-[14px] text-vn-subtle">{t('gm.team.note')}</p>
              {[['measures', 'badgeMeasures'], ['train', 'badgeTrain']].map(([k, badge]) => {
                const g = team[k];
                return (
                  <div key={k} className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-[16px] font-semibold">{t(`gm.team.${k}`)}</span>
                      <span className="text-[14px] text-vn-muted tabular-nums">{t('gm.team.count', { done: g.done, total: g.total })} · {t('gm.team.goal', { pct: TEAM_GOAL_PCT })}</span>
                    </div>
                    <ProgressBar value={g.pct} color={g.unlocked ? 'emerald' : 'sky'} aria-label={`${t(`gm.team.${k}`)}: ${g.pct}%`} />
                    {g.unlocked && (
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-vn-ok"><Icon name="trophy" size={16} color="#46D39A" />{t('gm.team.reached')} · {t(`gm.team.${badge}`)}</span>
                    )}
                  </div>
                );
              })}
            </section>
          </Card>

          {/* retrospectiva da semana: só contra a própria semana anterior */}
          <Card className="flex min-w-0 flex-[1_1_380px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="gm-recap" className="flex flex-col gap-3">
              <h2 id="gm-recap" className={h2}><Icon name="activity" size={24} color="#4FB0FF" />{t('gm.recap.title')}</h2>
              <p className="text-[14px] text-vn-subtle">{t('gm.recap.sub')}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[15px]">
                {['points', 'missions', 'measures', 'workouts', 'moodDays', 'mealDays'].map((k) => (
                  <div key={k} className="flex items-baseline justify-between gap-2 border-b border-vn-line pb-1.5">
                    <dt className="text-vn-muted">{t(`gm.recap.${k}`)}</dt>
                    <dd className="font-semibold tabular-nums">{recap[k]}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-[15px]" role="status">
                {delta > 0 ? t('gm.recap.up', { n: delta }) : delta < 0 ? t('gm.recap.down', { n: Math.abs(delta) }) : t('gm.recap.same')}
              </p>
            </section>
          </Card>
        </div>

        {/* sequências de hábito (medidas e treino) */}
        <div className="flex flex-wrap items-stretch gap-5">
          <Card className="flex min-w-0 flex-[3_1_460px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="ach-s" className="flex flex-col gap-3">
              <h2 id="ach-s" className="flex items-center gap-2.5 text-[26px] font-semibold leading-tight"><Icon name="trophy" size={26} color="#FFC24B" />{t('measure.ach.streak')}</h2>
              <div className="text-[56px] font-semibold leading-none tabular-nums">{t('measure.ach.days', { n: streak })}</div>
              <p className="text-[15px] text-vn-muted">{t('measure.ach.streakNote')}</p>
            </section>
          </Card>
          <Card className="flex min-w-0 flex-[2_1_300px] flex-col gap-3 px-[22px] py-5">
            <section aria-labelledby="ach-t" className="flex flex-col gap-3">
              <h2 id="ach-t" className="flex items-center gap-2.5 text-[26px] font-semibold leading-tight"><Icon name="flame" size={26} color="#FFC24B" />{t('nav.routine')}</h2>
              <div className="text-[56px] font-semibold leading-none tabular-nums">{t('measure.ach.days', { n: trainStreak })}</div>
              <p className="text-[15px] text-vn-muted">{t('train.streakNote')}</p>
            </section>
          </Card>
        </div>

        <Card className="flex flex-col gap-3 px-[22px] py-5">
          <section aria-labelledby="ach-g" className="flex flex-col gap-3">
            <h2 id="ach-g" className="text-[22px] font-semibold leading-tight">{t('measure.ach.grid')}</h2>
            <ul className="grid grid-cols-7 gap-2 sm:grid-cols-[repeat(14,minmax(0,1fr))]">
              {grid.map(({ date, kinds }) => (
                <li key={date} aria-label={t('measure.ach.dayAria', { date, n: kinds.size })} className={'flex flex-col items-center gap-1 rounded-sm border px-1 py-2 ' + (kinds.size === KINDS.length ? 'border-vn-ok bg-[rgba(70,211,154,0.12)]' : 'border-vn-line bg-vn-field')}>
                  <span aria-hidden="true" className="text-[11px] text-vn-muted">{date.slice(8)}</span>
                  {KINDS.map((k) => (
                    <span key={k} title={kindName(t, k)} aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: kinds.has(k) ? '#46D39A' : 'transparent', border: kinds.has(k) ? 'none' : '1px solid #2F5C8A' }}>
                      <Icon name={ICON[k]} size={12} color={kinds.has(k) ? '#04162B' : '#5B7894'} stroke={2.2} />
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </section>
        </Card>
      </div>
    </Shell>
  );
}
