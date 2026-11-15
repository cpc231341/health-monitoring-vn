import { useEffect, useMemo, useState } from 'react';
import { ProgressBar, SparkBarChart } from '@tremor/react';
import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import { STATUS } from '../lib/status.js';
import { useUser } from '../lib/user.jsx';
import { useDemo } from '../lib/demo.jsx';
import { resetRoutine, saveRoutine, saveWorkout, useTodayPlan, useWorkouts } from '../lib/training.js';
import { useT } from '../i18n/index.jsx';
import { ENVIRONMENTS, SCENARIOS } from '../data/hoje.js';
import {
  EXERCISES,
  MUSCLE_GROUPS,
  bestEstimated1RM,
  buildDays,
  computeStreak,
  createSet,
  createWorkout,
  setsPerMuscleGroup,
  validateRoutine,
  toDateStr,
  totalPoints,
  volumeByDay,
  workoutVolume
} from '../../shared/rules/training.js';
import { compute } from './Hoje.jsx';

const LEVEL_STATUS = { rest: 'crit', light: 'warn', full: 'ok' };
const WEEKLY_SETS_TARGET = 10;
const fmtClock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const inputCls = 'min-h-[40px] w-full rounded-sm border border-vn-line2 bg-vn-field px-2.5 text-base tabular-nums text-vn-text';

/** Monta as séries da sessão: um aquecimento (50%) nos exercícios compostos com carga e as séries normais. */
function buildSession(routine) {
  const sets = [];
  routine.exercises.forEach((ex) => {
    const info = EXERCISES.find((e) => e.id === ex.exerciseId);
    if (info?.type === 'compound' && ex.loadKg > 0) {
      sets.push({ ...createSet({ exerciseId: ex.exerciseId, weightKg: Math.round((ex.loadKg / 2) * 2) / 2, reps: Math.min(ex.reps, 8), kind: 'warmup' }), restSec: 45, planReps: Math.min(ex.reps, 8) });
    }
    for (let i = 0; i < ex.sets; i++) {
      sets.push({ ...createSet({ exerciseId: ex.exerciseId, weightKg: ex.loadKg, reps: ex.reps, kind: 'normal' }), restSec: ex.restSec, planReps: ex.reps });
    }
  });
  return sets.map((s, i) => ({ ...s, key: i, weightKg: String(s.weightKg), reps: String(s.reps), rpe: '' }));
}

const parsed = (s) => ({ weightKg: Number(s.weightKg), reps: Number(s.reps), rpe: s.rpe === '' ? null : Number(s.rpe) });

export default function Rotina() {
  const i18n = useT();
  const { t, num } = i18n;
  const { me } = useUser();
  const { scen, env } = useDemo();
  const R = useMemo(() => compute(SCENARIOS[scen], ENVIRONMENTS[env], i18n), [scen, env, i18n]);
  const { intensity, routine, base, reloadRoutines } = useTodayPlan(me.key, R);
  const { workouts, reload } = useWorkouts(me.key);

  const [session, setSession] = useState(null);
  const [restLeft, setRestLeft] = useState(null);
  const [msg, setMsg] = useState('');
  const [draft, setDraft] = useState(null);
  const [draftError, setDraftError] = useState('');

  useEffect(() => {
    if (restLeft == null || restLeft <= 0) return undefined;
    const id = setTimeout(() => setRestLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [restLeft]);

  const today = toDateStr();
  const excuse = intensity.hasCritical ? 'alert' : me.eva ? 'eva' : null;
  const days = useMemo(() => buildDays(workouts, today, excuse), [workouts, today, excuse]);
  const streak = computeStreak(days);
  const points = totalPoints(days);
  const vol7 = useMemo(() => volumeByDay(workouts, 7, today), [workouts, today]);
  const recent = useMemo(() => workouts.filter((w) => vol7.some((d) => d.date === w.date)), [workouts, vol7]);
  const groups = setsPerMuscleGroup(recent);
  const sorted = useMemo(() => [...workouts].sort((a, b) => (b.timestamp || b.date).localeCompare(a.timestamp || a.date)), [workouts]);
  const last = sorted[0];
  const best = EXERCISES.map((e) => ({ id: e.id, v: bestEstimated1RM(workouts, e.id) })).filter((x) => x.v > 0);
  const routineName = (id) => t(`train.routines.${id}`);
  const st = LEVEL_STATUS[intensity.level];

  // ---------- personalização da rotina ----------
  const startEdit = () => {
    setMsg('');
    setDraftError('');
    setDraft(base.exercises.map((e) => ({ exerciseId: e.exerciseId, sets: String(e.sets), reps: String(e.reps), restSec: String(e.restSec), loadKg: String(e.loadKg) })));
  };
  const patchRow = (i, field, value) => setDraft((cur) => cur.map((r, k) => (k === i ? { ...r, [field]: value } : r)));
  const addRow = () => setDraft((cur) => [...cur, { exerciseId: EXERCISES[0].id, sets: '3', reps: '10', restSec: '90', loadKg: '0' }]);
  const removeRow = (i) => setDraft((cur) => cur.filter((_, k) => k !== i));
  const saveDraft = async () => {
    const routineDraft = {
      id: base.id,
      astronautId: me.key,
      exercises: draft.map((r) => ({ exerciseId: r.exerciseId, sets: Number(r.sets), reps: Number(r.reps), restSec: Number(r.restSec), loadKg: Number(r.loadKg) }))
    };
    const { valid, errors } = validateRoutine(routineDraft);
    if (!valid) { setDraftError(errors.includes('exercises') ? t('train.emptyRoutine') : t('train.invalidRoutine')); return; }
    const res = await saveRoutine(routineDraft);
    if (res?.success) { setDraft(null); setMsg(t('train.routineSaved')); reloadRoutines(); }
  };
  const resetDraft = async () => {
    const res = await resetRoutine(me.key, base.id);
    if (res?.success) { setDraft(null); setMsg(t('train.routineReset')); reloadRoutines(); }
  };

  const start = () => { setSession(buildSession(routine)); setRestLeft(null); setMsg(''); };
  const patch = (key, field, value) => setSession((cur) => cur.map((s) => (s.key === key ? { ...s, [field]: value } : s)));
  const toggle = (s) => {
    const p = parsed(s);
    if (!s.done && !(Number.isInteger(p.reps) && p.reps >= 1 && p.weightKg >= 0)) return;
    patch(s.key, 'done', !s.done);
    setMsg('');
    setRestLeft(!s.done ? s.restSec : null);
  };
  const finish = async () => {
    const done = session.filter((s) => s.done).map((s) => createSet({ exerciseId: s.exerciseId, kind: s.kind, done: true, ...parsed(s) }));
    if (done.length === 0) { setMsg(t('train.needSet')); return; }
    const workout = createWorkout({ astronautId: me.key, routineId: routine.id, date: today, sets: done });
    const res = await saveWorkout(workout);
    if (res?.success) {
      setSession(null);
      setRestLeft(null);
      setMsg(t('train.saved', { volume: num(workoutVolume(workout), 0) }));
      reload();
    }
  };

  const chip = (icon, label, value) => (
    <span className="flex items-center gap-2.5 rounded-sm border border-vn-line2 px-3.5 py-2 text-[15px]">
      <Icon name={icon} size={18} color="#62C3FF" />
      <span className="text-vn-muted">{label}</span>
      <b className="tabular-nums">{value}</b>
    </span>
  );

  const header = (
    <PageHeader
      title={t('nav.routine')}
      sub={t('train.sub')}
      right={<div className="flex flex-wrap gap-2.5">{chip('flame', t('train.streak'), t('train.streakDays', { n: streak }))}{chip('trophy', t('train.points'), points)}</div>}
    />
  );

  return (
    <Shell header={header}>
      <div className="flex flex-col gap-5 px-8 pb-12 pt-6">
        <div role="status" className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border px-5 py-4" style={{ background: STATUS[st].bg, borderColor: STATUS[st].bd }}>
          <Icon name={st === 'crit' ? 'octagon' : st === 'warn' ? 'alert' : 'checkc'} size={26} color={STATUS[st].col} />
          <span className="min-w-0 flex-1 text-[17px] font-semibold">{t(`train.suggest.${intensity.level}`)}</span>
        </div>
        <p className="-mt-2 text-sm text-vn-subtle">{t('train.streakNote')}</p>

        <Card className="flex flex-col gap-4 px-[22px] py-5">
          <section aria-labelledby="tr-today" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 id="tr-today" className="text-[26px] font-semibold leading-tight">{t('train.todayTitle')}</h2>
                <p className="mt-0.5 text-[15px] text-vn-muted">
                  {routine && routineName(routine.id)}
                  {base?.customized && <> · {t('train.customized')}</>}
                  {routine && routine.exercises.length > 0 && <> · {t('train.exercisesCount', { n: routine.exercises.length })}</>}
                  {intensity.level === 'light' && <> · {t('train.lighter')}</>}
                </p>
              </div>
              {!session && !draft && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <button type="button" className="btn-s" onClick={startEdit}><Icon name="grip" size={17} />{t('train.customize')}</button>
                  {intensity.level === 'rest'
                    ? <span className="rounded-sm border border-vn-line2 px-3.5 py-2 text-[15px] text-vn-muted">{t('train.restDay')}</span>
                    : <button type="button" className="btn-p" onClick={start}><Icon name="dumbbell" size={18} color="#04162B" stroke={2.2} />{t('train.start')}</button>}
                </div>
              )}
            </div>

            {!session && !draft && routine && routine.exercises.length > 0 && (
              <ul>
                {routine.exercises.map((e) => (
                  <li key={e.exerciseId} className="flex flex-wrap items-center justify-between gap-2 border-t border-vn-line py-2.5">
                    <span className="font-semibold">{t(`train.ex.${e.exerciseId}`)}</span>
                    <span className="text-[15px] tabular-nums text-vn-muted">{t('train.setsReps', { sets: e.sets, reps: e.reps })}{e.loadKg > 0 && ` · ${num(e.loadKg, 0)} kg`}</span>
                  </li>
                ))}
              </ul>
            )}

            {draft && (
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold">{t('train.editTitle', { routine: routineName(base.id) })}</h3>
                <div className="overflow-x-auto">
                  <div className="min-w-[640px]">
                    <div aria-hidden="true" className="grid grid-cols-[minmax(0,2fr)_72px_72px_92px_92px_44px] gap-x-3 pb-2 text-sm text-vn-subtle">
                      <span>{t('train.col.exercise')}</span><span>{t('train.col.sets')}</span><span>{t('train.col.reps')}</span><span>{t('train.col.load')}</span><span>{t('train.col.restSec')}</span><span />
                    </div>
                    {draft.map((r, i) => {
                      const name = t(`train.ex.${r.exerciseId}`);
                      return (
                        <div key={i} className="grid grid-cols-[minmax(0,2fr)_72px_72px_92px_92px_44px] items-center gap-x-3 border-t border-vn-line py-2">
                          <select aria-label={`${i + 1} · ${t('train.col.exercise')}`} value={r.exerciseId} onChange={(e) => patchRow(i, 'exerciseId', e.target.value)} className={inputCls + ' [color-scheme:dark]'}>
                            {EXERCISES.map((ex) => <option key={ex.id} value={ex.id}>{t(`train.ex.${ex.id}`)}</option>)}
                          </select>
                          <input type="number" min="1" max="10" step="1" inputMode="numeric" aria-label={`${name} · ${t('train.col.sets')}`} value={r.sets} onChange={(e) => patchRow(i, 'sets', e.target.value)} className={inputCls} />
                          <input type="number" min="1" max="100" step="1" inputMode="numeric" aria-label={`${name} · ${t('train.col.reps')}`} value={r.reps} onChange={(e) => patchRow(i, 'reps', e.target.value)} className={inputCls} />
                          <input type="number" min="0" step="0.5" inputMode="decimal" aria-label={`${name} · ${t('train.col.load')}`} value={r.loadKg} onChange={(e) => patchRow(i, 'loadKg', e.target.value)} className={inputCls} />
                          <input type="number" min="0" max="600" step="5" inputMode="numeric" aria-label={`${name} · ${t('train.col.restSec')}`} value={r.restSec} onChange={(e) => patchRow(i, 'restSec', e.target.value)} className={inputCls} />
                          <button type="button" aria-label={t('train.removeExercise', { exercise: name })} title={t('train.removeExercise', { exercise: name })} onClick={() => removeRow(i)} className="flex h-10 w-10 items-center justify-center rounded-sm border border-vn-line2 hover:border-vn-accent">
                            <Icon name="x" size={17} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button type="button" className="btn-s w-fit" onClick={addRow}><Icon name="plus" size={17} />{t('train.addExercise')}</button>
                <p role="alert" className="min-h-[20px] text-sm text-vn-crit">{draftError}</p>
                <div className="flex flex-wrap gap-2.5">
                  <button type="button" className="btn-p" onClick={saveDraft}>{t('train.saveRoutine')}</button>
                  <button type="button" className="btn-s" onClick={() => setDraft(null)}>{t('pickTeam.form.cancel')}</button>
                  {base?.customized && <button type="button" className="btn-s ml-auto" onClick={resetDraft}>{t('train.resetRoutine')}</button>}
                </div>
              </div>
            )}

            {session && (
              <div className="flex flex-col gap-3">
                {restLeft != null && (
                  <div role="timer" aria-live="polite" className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border border-vn-accent bg-vn-field px-4 py-3">
                    <Icon name="clock" size={22} color="#62C3FF" />
                    <span className="text-[26px] font-semibold tabular-nums">{fmtClock(Math.max(restLeft, 0))}</span>
                    <span className="text-[15px] text-vn-muted">{restLeft > 0 ? t('train.rest') : t('train.restDone')}</span>
                    <button type="button" className="btn-s ml-auto" onClick={() => setRestLeft(null)}>{t('train.restSkip')}</button>
                  </div>
                )}
                <div className="overflow-x-auto">
                  <div className="min-w-[720px]">
                    <div aria-hidden="true" className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)_70px_92px_80px_80px_56px] gap-x-3 pb-2 text-sm text-vn-subtle">
                      <span>{t('train.col.exercise')}</span><span>{t('train.col.kind')}</span><span>{t('train.col.plan')}</span>
                      <span>{t('train.col.load')}</span><span>{t('train.col.reps')}</span><span title={t('train.rpeHint')}>{t('train.col.rpe')}</span><span>{t('train.col.done')}</span>
                    </div>
                    {session.map((s, idx) => {
                      const n = session.slice(0, idx + 1).filter((x) => x.exerciseId === s.exerciseId).length;
                      const name = t(`train.ex.${s.exerciseId}`);
                      return (
                        <div key={s.key} className={'grid grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)_70px_92px_80px_80px_56px] items-center gap-x-3 border-t border-vn-line py-2 ' + (s.done ? 'opacity-70' : '')}>
                          <span className="min-w-0 font-semibold">{name} <span className="font-normal text-vn-muted">#{n}</span></span>
                          <span className={'text-[15px] ' + (s.kind === 'warmup' ? 'text-vn-warn' : 'text-vn-muted')}>{t(`train.kind.${s.kind}`)}</span>
                          <span className="text-[15px] tabular-nums text-vn-muted">{s.planReps}</span>
                          <input type="number" min="0" step="0.5" inputMode="decimal" aria-label={`${name} · ${t('train.col.load')}`} value={s.weightKg} onChange={(e) => patch(s.key, 'weightKg', e.target.value)} className={inputCls} />
                          <input type="number" min="1" max="100" step="1" inputMode="numeric" aria-label={`${name} · ${t('train.col.reps')}`} value={s.reps} onChange={(e) => patch(s.key, 'reps', e.target.value)} className={inputCls} />
                          <input type="number" min="1" max="10" step="1" inputMode="numeric" aria-label={`${name} · ${t('train.col.rpe')}`} title={t('train.rpeHint')} value={s.rpe} onChange={(e) => patch(s.key, 'rpe', e.target.value)} className={inputCls} />
                          <button
                            type="button"
                            aria-pressed={!!s.done}
                            aria-label={t('train.setAria', { n, exercise: name })}
                            onClick={() => toggle(s)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px]"
                            style={{ borderColor: s.done ? '#46D39A' : '#2F5C8A', background: s.done ? '#46D39A' : 'transparent' }}
                          >
                            {s.done && <Icon name="check" color="#04162B" stroke={2.6} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-sm text-vn-subtle">{t('train.rpeHint')}</p>
                <div className="flex flex-wrap gap-2.5">
                  <button type="button" className="btn-p" onClick={finish}>{t('train.finish')}</button>
                  <button type="button" className="btn-s" onClick={() => { setSession(null); setRestLeft(null); setMsg(''); }}>{t('pickTeam.form.cancel')}</button>
                </div>
              </div>
            )}
            <div role="status" aria-live="polite" className="min-h-[22px] text-[15px] text-vn-accent">{msg}</div>
          </section>
        </Card>

        <div className="flex flex-wrap items-stretch gap-5">
          <Card className="flex min-w-0 flex-[3_1_460px] flex-col gap-3.5 px-[22px] py-5">
            <section aria-labelledby="tr-vol" className="flex flex-col gap-3.5">
              <h2 id="tr-vol" className="text-[26px] font-semibold leading-tight">{t('train.volumeTitle')}</h2>
              <div className="relative h-24 border border-vn-line bg-vn-field" role="img" aria-label={t('train.volumeAria', { values: vol7.map((d) => num(d.volume, 0)).join(', ') })}>
                <SparkBarChart data={vol7.map((d, i) => ({ i, v: d.volume }))} index="i" categories={['v']} colors={['sky']} minValue={0} className="absolute inset-0 h-full w-full px-2" />
              </div>
              <div aria-hidden="true" className="-mt-1.5 flex justify-between text-[13px] text-vn-subtle"><span>{t('time.daysAgo7')}</span><span>{t('time.today')}</span></div>
              <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                <div className="rounded-sm border border-vn-line bg-vn-field p-3">
                  <dt className="text-sm text-vn-muted">{t('train.lastVolume')}</dt>
                  <dd className="mt-0.5 text-2xl font-semibold tabular-nums">{last ? `${num(workoutVolume(last), 0)} kg` : '—'}</dd>
                </div>
                {best.slice(0, 3).map((b) => (
                  <div key={b.id} className="rounded-sm border border-vn-line bg-vn-field p-3">
                    <dt className="text-sm text-vn-muted">{t('train.best1rm')} · {t(`train.ex.${b.id}`)}</dt>
                    <dd className="mt-0.5 text-2xl font-semibold tabular-nums">{num(b.v, 1)} kg</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Card>

          <Card className="flex min-w-0 flex-[2_1_340px] flex-col gap-3.5 px-[22px] py-5">
            <section aria-labelledby="tr-grp" className="flex flex-col gap-3">
              <h2 id="tr-grp" className="text-[22px] font-semibold leading-tight">{t('train.setsByGroup')}</h2>
              {MUSCLE_GROUPS.map((g) => (
                <div key={g} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-3 text-[15px]">
                    <span className="font-semibold">{t(`train.mg.${g}`)}</span>
                    <span className="tabular-nums text-vn-muted">{groups[g]} {t('train.setsUnit')}</span>
                  </div>
                  <ProgressBar value={Math.min(100, (groups[g] / WEEKLY_SETS_TARGET) * 100)} color="sky" aria-label={`${t(`train.mg.${g}`)}: ${groups[g]}`} />
                </div>
              ))}
            </section>
          </Card>
        </div>

        <Card className="flex flex-col gap-2 px-[22px] py-5">
          <section aria-labelledby="tr-hist">
            <h2 id="tr-hist" className="mb-2 text-[26px] font-semibold leading-tight">{t('train.historyTitle')}</h2>
            {sorted.length === 0 && <p className="text-[15px] text-vn-muted">{t('train.historyEmpty')}</p>}
            <ul>
              {sorted.slice(0, 8).map((w) => (
                <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-vn-line py-2.5">
                  <span className="font-semibold">{t('train.workoutLine', { routine: routineName(w.routineId), sets: w.sets.filter((s) => s.done && s.kind === 'normal').length, volume: num(workoutVolume(w), 0) })}</span>
                  <span className="text-[15px] tabular-nums text-vn-muted">{w.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </Card>
      </div>
    </Shell>
  );
}
