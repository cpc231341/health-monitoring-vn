// Faixas e estados dos indicadores. Valores ilustrativos, a validar pelo time médico da missão.
// O nome de cada estado (Normal, Atenção, Crítico) vem de i18n: t(`status.${st}`).

export const STATUS = {
  ok: { col: '#46D39A', bg: 'rgba(70,211,154,0.14)', bd: 'rgba(70,211,154,0.45)', tremor: 'emerald' },
  warn: { col: '#FFC24B', bg: 'rgba(255,194,75,0.14)', bd: 'rgba(255,194,75,0.45)', tremor: 'amber' },
  crit: { col: '#FF7B7B', bg: 'rgba(255,123,123,0.16)', bd: 'rgba(255,123,123,0.55)', tremor: 'rose' }
};

export function classify(id, v) {
  if (id === 'pa') {
    const [s, d] = v;
    if (s >= 140 || d >= 90 || s < 80 || d < 50) return 'crit';
    if (s >= 120 || d >= 80 || s < 90 || d < 60) return 'warn';
    return 'ok';
  }
  if (id === 'fc') return v > 110 || v < 40 ? 'crit' : v > 95 || v < 50 ? 'warn' : 'ok';
  if (id === 'gl') return v >= 126 || v < 54 ? 'crit' : v >= 100 || v < 70 ? 'warn' : 'ok';
  if (id === 'tc') return v >= 38 || v < 35 ? 'crit' : v >= 37.6 || v < 36.1 ? 'warn' : 'ok';
  if (id === 'sn') return v < 5 ? 'crit' : v < 7 || v > 9 ? 'warn' : 'ok';
  if (id === 'hu') return v <= 1 ? 'crit' : v <= 2 ? 'warn' : 'ok';
  if (id === 'o2') return v < 92 ? 'crit' : v < 95 ? 'warn' : 'ok';
  if (id === 'rad') return v >= 3 ? 'crit' : v >= 1.5 ? 'warn' : 'ok';
  return 'ok';
}
