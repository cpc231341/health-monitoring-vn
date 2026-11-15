import { CREW, TEAM } from '../data/crew.js';
import { createMeasure, statusAtSave } from '../../shared/rules/measures.js';
import { createSet, createWorkout, addDays, toDateStr } from '../../shared/rules/training.js';
import { createLog } from '../../shared/rules/food.js';

// Dados de demonstração: histórico de 3 semanas da tripulação, gerado a partir de hoje.
// Não é gravado em disco: entra por cima dos registros reais enquanto o interruptor estiver ligado,
// então desligar volta ao estado real sem sujar o measurements.json, workouts.json nem food.json.
const FLAG = 'vn.mock';
const DAYS = 21;

/** Ligado por padrão fora dos testes (é um protótipo de demonstração); o botão do modo demo troca. */
export function mockOn() {
  try {
    const v = localStorage.getItem(FLAG);
    if (v === '1') return true;
    if (v === '0') return false;
  } catch (e) { /* sem armazenamento */ }
  return import.meta.env.MODE !== 'test';
}

export function setMock(on) {
  try { localStorage.setItem(FLAG, on ? '1' : '0'); } catch (e) { /* sem armazenamento */ }
}

// Sorteio repetível: o mesmo tripulante e o mesmo dia dão sempre o mesmo número entre 0 e 1.
function rnd(...parts) {
  let h = 2166136261;
  for (const ch of parts.join('|')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13;
  return ((h >>> 0) % 10000) / 10000;
}

const MEAL_PICKS = {
  cafe: [['aveia', 'cafe'], ['granola-mirtilo', 'cha-verde'], ['ovos-mexidos', 'cafe'], ['cereal-morango', 'achocolatado']],
  almoco: [['brisket', 'abobora', 'limonada'], ['curry-camarao', 'cuscuz-castanhas', 'cha-verde'], ['quiche-vegetais', 'vagem-apimentada', 'smoothie']],
  jantar: [['macarrao-queijo', 'brocolis-gratinado', 'cha-verde'], ['mordidas-salmao', 'tortilhas', 'limonada'], ['brisket', 'vagem-apimentada', 'cidra']]
};
const HOUR = { cafe: '07:30', almoco: '12:30', jantar: '19:00' };

// Roteiro do Cristiano (o usuário padrão): mostra de propósito a sequência, os escudos e um dia pendente.
const SCRIPT = {
  cristiano: {
    measures: (off) => off >= 1 && off <= 12,
    workouts: [1, 2, 3, 5, 6, 8, 10, 11],
    mood: (off) => off >= 1 && off <= 12 && off !== 7,
    meals: (off) => off >= 1 && off <= 10
  }
};
const TODAY_PARTIAL = { cristiano: ['pa', 'gl'] };
// Para o painel do capitão ter o que mostrar: o Ruan com pressão crítica nos últimos 3 dias (escala pela RN03/RN04)
// e o Luis Felipe com glicose em atenção. Valor: dias recentes em que a medida é forçada.
const FORCED = { ruan: { pa: 2 }, 'luis-felipe': { gl: 2 } };

function reading(crew, kind, off) {
  const r = rnd(crew, kind, off);
  const base = { 'luis-felipe': 76.5, mike: 82, ruan: 79, rita: 61.5, cristiano: 74 }[crew] || 75;
  if (off <= (FORCED[crew]?.[kind] ?? -1)) return kind === 'pa' ? { sys: 158 - off, dia: 96 } : { mgdl: 112 + off };
  if (kind === 'pa') {
    if (crew === 'cristiano' && off === 6) return { sys: 134, dia: 86 }; // um dia em atenção
    return { sys: 110 + Math.round(r * 14), dia: 70 + Math.round(rnd(crew, 'dia', off) * 10) };
  }
  if (kind === 'gl') return { mgdl: 84 + Math.round(r * 14) };
  return { kg: Math.round((base + (r - 0.5) * 0.6) * 10) / 10 };
}

/** Histórico de demonstração. now: instante atual (injetável nos testes). */
export function buildMock(now = new Date()) {
  const today = toDateStr(now);
  const measures = [];
  const workouts = [];
  const food = [];
  const moods = {};
  const stamp = (date, hhmm) => (date === today ? now.toISOString() : `${date}T${hhmm}:00`);

  for (const { key } of CREW) {
    const script = SCRIPT[key];
    moods[key] = {};
    const mine = [];
    for (let off = 0; off < DAYS; off++) {
      const date = addDays(today, -off);

      for (const [k, kind] of ['pa', 'gl', 'kg'].entries()) {
        const forced = off <= (FORCED[key]?.[kind] ?? -1);
        const has = forced || (off === 0
          ? (TODAY_PARTIAL[key] ? TODAY_PARTIAL[key].includes(kind) : rnd(key, kind, 'hoje') < 0.5)
          : script ? script.measures(off) : rnd(key, kind, 'm', off) < 0.85);
        if (!has) continue;
        mine.push([off, createMeasure({
          id: `mock-${key}-${kind}-${off}`, crew: key, kind, at: stamp(date, `07:${String(k * 10).padStart(2, '0')}`),
          value: reading(key, kind, off), device: 'other', source: 'manual'
        })]);
      }

      const trained = off > 0 && (script ? script.workouts.includes(off) : rnd(key, 'w', off) < 0.22);
      if (trained) {
        workouts.push(createWorkout({
          id: `mock-w-${key}-${off}`, astronautId: key, routineId: off % 2 ? 'full-a' : 'full-b', date,
          sets: [
            createSet({ exerciseId: 'squat', weightKg: 40, reps: 10, kind: 'normal', rpe: 7, done: true }),
            createSet({ exerciseId: 'row', weightKg: 30, reps: 10, kind: 'normal', rpe: 7, done: true }),
            createSet({ exerciseId: 'plank', weightKg: 0, reps: 30, kind: 'normal', done: true })
          ]
        }));
      }

      const mood = off > 0 && (script ? script.mood(off) : rnd(key, 'h', off) < 0.6);
      if (mood) moods[key][date] = 3 + Math.floor(rnd(key, 'mood', off) * 3);

      if (off > 0 && (script ? script.meals(off) : rnd(key, 'f', off) < 0.7)) {
        for (const meal of ['cafe', 'almoco', 'jantar']) {
          const pick = MEAL_PICKS[meal][Math.floor(rnd(key, meal, off) * MEAL_PICKS[meal].length)];
          food.push({
            ...createLog({
              id: `mock-f-${key}-${meal}-${off}`, tripulante: key, diaMissao: TEAM.day - off, hora: HOUR[meal],
              refeicao: meal, fase: 'orbita', itens: pick.map((itemId) => ({ itemId, porcoes: 1 }))
            }),
            date
          });
        }
      }
    }
    // O estado de cada medida é calculado do mais antigo ao mais novo, como no registro de verdade.
    const done = [];
    for (const [, m] of mine.sort((a, b) => b[0] - a[0])) {
      const rec = { ...m, status: statusAtSave(done, m) };
      done.push(rec);
      measures.push(rec);
    }
  }
  return { measures, workouts, food, moods };
}

let cache = null;
function mock() {
  const day = toDateStr();
  if (!cache || cache.day !== day) cache = { day, data: buildMock() };
  return cache.data;
}

const merge = (real, extra) => {
  const seen = new Set((real || []).map((x) => x.id));
  return [...(real || []), ...extra.filter((x) => !seen.has(x.id))];
};

export const withMockMeasures = (real, crew) => (mockOn() ? merge(real, mock().measures.filter((m) => !crew || m.crew === crew)) : real);
export const withMockMeasureDays = (real) => (mockOn() ? [...(real || []), ...mock().measures.map(({ crew, kind, at, status }) => ({ crew, kind, at, status }))] : real);
export const withMockWorkouts = (real, astronautId) => (mockOn() ? merge(real, mock().workouts.filter((w) => !astronautId || w.astronautId === astronautId)) : real);
export const withMockFood = (real, tripulante) => (mockOn() ? merge(real, mock().food.filter((l) => l.tripulante === tripulante)) : real);
export const withMockMoods = (real, crew) => (mockOn() ? { ...(mock().moods[crew] || {}), ...real } : real);
