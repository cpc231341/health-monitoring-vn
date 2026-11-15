import { describe, it, expect } from 'vitest';
import { buildMock, mockOn, withMockMeasures, withMockWorkouts } from './mock.js';
import { CREW } from '../data/crew.js';
import { validateMeasure } from '../../shared/rules/measures.js';
import { validateWorkout } from '../../shared/rules/training.js';
import { validateLog } from '../../shared/rules/food.js';
import { crewSummary, escalations } from '../../shared/rules/captain.js';
import { badgeStatus, buildTimeline, levelOf, metricsFrom, missionStreak, teamProgress, totalPoints } from '../../shared/rules/achievements.js';

const NOW = new Date(2026, 10, 15, 12, 0, 0);
const TODAY = '2026-11-15';
const m = buildMock(NOW);

describe('Dados de demonstração', () => {
  it('é repetível: o mesmo dia gera sempre os mesmos dados', () => {
    expect(buildMock(NOW)).toEqual(m);
  });

  it('todos os registros passam nas validações das regras', () => {
    expect(m.measures.every((x) => validateMeasure(x).valid)).toBe(true);
    expect(m.workouts.every((x) => validateWorkout(x).valid)).toBe(true);
    expect(m.food.every((x) => validateLog(x).valid)).toBe(true);
    expect(new Set(m.measures.map((x) => x.id)).size).toBe(m.measures.length);
  });

  it('cobre os 5 tripulantes', () => {
    for (const { key } of CREW) {
      expect(m.measures.some((x) => x.crew === key)).toBe(true);
      expect(m.workouts.some((x) => x.astronautId === key)).toBe(true);
      expect(Object.keys(m.moods[key]).length).toBeGreaterThan(0);
    }
  });

  it('o Cristiano tem hoje só pressão e glicose, para a missão ficar em aberto', () => {
    const hoje = m.measures.filter((x) => x.crew === 'cristiano' && x.at.startsWith(TODAY));
    expect(hoje.map((x) => x.kind).sort()).toEqual(['gl', 'pa']);
  });

  it('as Conquistas do Cristiano ficam cheias: nível, escudos e selos', () => {
    const data = { crew: 'cristiano', measures: m.measures.filter((x) => x.crew === 'cristiano'), workouts: m.workouts.filter((x) => x.astronautId === 'cristiano'), moods: m.moods.cristiano, meals: m.food.filter((x) => x.tripulante === 'cristiano') };
    const days = buildTimeline(data, TODAY);
    expect(levelOf(totalPoints(days)).index).toBeGreaterThanOrEqual(2);
    const s = missionStreak(days);
    expect(s.streak).toBeGreaterThanOrEqual(3);
    expect(s.left).toBe(0);
    const earned = badgeStatus(metricsFrom(data, days, TODAY)).filter((b) => b.unlocked);
    expect(earned.length).toBeGreaterThanOrEqual(5);
  });

  it('a meta do time: medidas batidas e treinos ainda faltando', () => {
    const r = teamProgress(m.measures, m.workouts, CREW.length, TODAY);
    expect(r.measures.unlocked).toBe(true);
    expect(r.train.unlocked).toBe(false);
  });

  it('o painel do capitão tem o que mostrar: o Ruan escala (RN04) e o Luis Felipe fica em atenção', () => {
    const days = m.measures.map(({ crew, kind, at, status }) => ({ crew, kind, at, status }));
    const keys = CREW.map((c) => c.key);
    const q = escalations(days, keys);
    expect(q.map((e) => `${e.crew}:${e.kind}`)).toEqual(['ruan:pa']);
    const s = crewSummary({ days, workouts: m.workouts, crewKeys: keys, today: TODAY });
    expect(s.find((x) => x.key === 'ruan').status).toBe('critical');
    expect(s.find((x) => x.key === 'luis-felipe').status).toBe('warning');
    for (const k of ['cristiano', 'mike', 'rita']) expect(s.find((x) => x.key === k).status).not.toBe('critical');
    expect(m.measures.every((x) => ['normal', 'warning', 'critical'].includes(x.status))).toBe(true);
  });

  it('nos testes fica desligado e não altera a lista real', () => {
    expect(mockOn()).toBe(false);
    const real = [{ id: 'a', crew: 'rita' }];
    expect(withMockMeasures(real, 'rita')).toBe(real);
    expect(withMockWorkouts(real)).toBe(real);
  });
});
