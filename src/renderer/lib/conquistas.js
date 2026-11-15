import { useMemo } from 'react';
import { useDemo } from './demo.jsx';
import { useUser } from './user.jsx';
import { useFood } from './food.js';
import { useMeasureDays, useMeasures } from './medidas.js';
import { intensityFrom, useWorkouts } from './training.js';
import { CREW } from '../data/crew.js';
import { ENVIRONMENTS, SCENARIOS } from '../data/hoje.js';
import { compute } from '../pages/Hoje.jsx';
import { useT } from '../i18n/index.jsx';
import { withMockMoods } from './mock.js';
import {
  badgeStatus, buildTimeline, levelOf, metricsFrom, missionItems, missionStreak, teamProgress, totalPoints, weekRecap, dayActivity
} from '../../shared/rules/achievements.js';
import { toDateStr } from '../../shared/rules/training.js';

// Humor por data, só neste computador: { 'AAAA-MM-DD': 1..5 }. O Diário grava, as Conquistas leem.
export const moodLogKey = (crew) => `vn.moodlog.${crew}`;
export function readMoodLog(crew) {
  let real = {};
  try { real = JSON.parse(localStorage.getItem(moodLogKey(crew)) || '{}') || {}; } catch (e) { /* sem armazenamento */ }
  return withMockMoods(real, crew);
}

/** Tudo da gamificação do tripulante logado. Pontos e selos vêm só dos próprios registros. */
export function useAchievements() {
  const i18n = useT();
  const { me } = useUser();
  const { scen, env } = useDemo();
  const { measures } = useMeasures(me.key);
  const { workouts } = useWorkouts(me.key);
  const { workouts: teamWorkouts } = useWorkouts();
  const measureDays = useMeasureDays();
  const { logs } = useFood(me.key);
  const today = toDateStr();

  return useMemo(() => {
    const R = compute(SCENARIOS[scen], ENVIRONMENTS[env], i18n);
    const rest = intensityFrom(R).level === 'rest';
    const data = { crew: me.key, measures, workouts, moods: readMoodLog(me.key), meals: logs };
    const days = buildTimeline(data, today, { restToday: rest });
    const points = totalPoints(days);
    const streak = missionStreak(days);
    const metrics = metricsFrom(data, days, today);
    const act = dayActivity(data, today);
    return {
      today,
      points,
      level: levelOf(points),
      mission: { items: missionItems(act, rest), rest, done: days[days.length - 1].mission },
      streak,
      badges: badgeStatus(metrics),
      recap: weekRecap(days, today),
      team: teamProgress(measureDays, teamWorkouts, CREW.length, today)
    };
    // i18n muda só o texto; compute precisa dele apenas para montar R
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.key, measures, workouts, logs, teamWorkouts, measureDays, scen, env, today]);
}
