import { CARDS } from '../data/hoje.js';

export const defaultLayout = () => ({
  lay: Object.fromEntries(CARDS.map((c) => [c.k, { on: true, span: c.span }])),
  ord: CARDS.map((c) => c.k)
});

/** Layout do painel Hoje, guardado por tripulante neste computador. */
export function loadLayout(user) {
  try {
    const raw = localStorage.getItem('vn.layout.' + user);
    if (!raw) return defaultLayout();
    const saved = JSON.parse(raw);
    const base = defaultLayout();
    const lay = Object.assign(base.lay, saved.lay || {});
    const ord = (saved.ord || []).filter((k) => lay[k]);
    base.ord.forEach((k) => { if (!ord.includes(k)) ord.push(k); });
    return { lay, ord };
  } catch (e) {
    return defaultLayout();
  }
}

export function saveLayout(user, value) {
  try { localStorage.setItem('vn.layout.' + user, JSON.stringify(value)); } catch (e) { /* sem armazenamento */ }
}

export function clearLayout(user) {
  try { localStorage.removeItem('vn.layout.' + user); } catch (e) { /* sem armazenamento */ }
}

// Altura do gráfico conforme a largura do cartão (em colunas).
export const chartHeight = (span) => Math.round(84 + Math.max(0, Math.min(8, span - 4)) * 15.75);
