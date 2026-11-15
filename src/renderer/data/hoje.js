// Cenários do modo demonstração (7 dias, o último é hoje) e ambientes da missão.
// Os textos (nomes, descrições, agenda) ficam em i18n/locales: scenarios, environments, agenda e cards.
export const SCENARIOS = {
  comum: { pa: [[116, 74], [118, 76], [115, 73], [119, 77], [117, 75], [118, 76], [118, 76]], fc: [60, 59, 61, 60, 62, 61, 61], gl: [94, 92, 95, 96, 93, 95, 96], tc: [36.6, 36.7, 36.6, 36.6, 36.7, 36.7, 36.7], sn: [7.4, 7.1, 7.6, 6.9, 7.2, 6.7, 6.08], hu: [4, 4, 3, 4, 4, 3, 3], o2: 97, rad: 1.0 },
  febre: { pa: [[116, 74], [117, 75], [118, 76], [119, 77], [121, 78], [123, 79], [124, 81]], fc: [60, 60, 62, 66, 74, 86, 98], gl: [94, 92, 95, 96, 93, 95, 97], tc: [36.7, 36.8, 36.9, 37.4, 37.8, 38.0, 38.2], sn: [7.2, 7.0, 6.5, 6.0, 5.6, 5.2, 5.4], hu: [4, 4, 3, 3, 3, 2, 2], o2: 96, rad: 1.0 },
  hipoxia: { pa: [[116, 74], [118, 76], [117, 75], [119, 77], [120, 78], [121, 79], [122, 80]], fc: [60, 61, 62, 64, 70, 88, 104], gl: [94, 92, 95, 96, 93, 95, 96], tc: [36.6, 36.7, 36.6, 36.6, 36.7, 36.7, 36.7], sn: [7.2, 7.1, 6.8, 6.6, 6.5, 6.4, 6.4], hu: [4, 4, 4, 3, 3, 3, 3], o2: 91, rad: 1.0 },
  estresse: { pa: [[116, 74], [120, 78], [124, 80], [128, 82], [130, 84], [133, 85], [134, 86]], fc: [60, 63, 66, 70, 74, 78, 80], gl: [94, 96, 98, 101, 104, 106, 108], tc: [36.6, 36.7, 36.6, 36.7, 36.7, 36.8, 36.8], sn: [7.2, 6.8, 6.4, 6.0, 5.7, 5.4, 5.3], hu: [4, 3, 3, 3, 2, 2, 2], o2: 97, rad: 1.0 },
  radiacao: { pa: [[116, 74], [118, 76], [117, 75], [119, 77], [117, 75], [118, 76], [118, 76]], fc: [60, 59, 61, 60, 62, 64, 68], gl: [94, 92, 95, 96, 93, 95, 96], tc: [36.6, 36.7, 36.6, 36.6, 36.7, 36.7, 36.7], sn: [7.2, 7.0, 7.3, 7.1, 7.4, 7.0, 7.1], hu: [4, 4, 3, 4, 3, 3, 3], o2: 97, rad: 4.2 }
};

export const ENVIRONMENTS = {
  estacao: { rad: 0.6 },
  lua: { rad: 1.4 },
  marte: { rad: 0.7 },
  terra: { rad: 0.007 }
};

export const AGENDA = [
  { k: 'sync', time: '06:45', icon: 'radio' },
  { k: 'medpa', time: '07:00', icon: 'gauge', to: '/medir?registrar=pa', kind: 'pa' },
  { k: 'medgl', time: '07:10', icon: 'droplet', to: '/medir?registrar=gl', kind: 'gl' },
  { k: 'medkg', time: '07:20', icon: 'scale', to: '/medir?registrar=kg', kind: 'kg' },
  { k: 'cafe', time: '08:00', icon: 'utensils', to: '/diario?aba=alimentacao&refeicao=cafe' },
  { k: 'almoco', time: '12:30', icon: 'utensils', to: '/diario?aba=alimentacao&refeicao=almoco' },
  { k: 'treino', time: '17:00', icon: 'dumbbell', to: '/rotina' },
  { k: 'diario', time: '21:30', icon: 'book', to: '/diario' },
  { k: 'sono', time: '22:30', icon: 'moon', to: '/rotina' }
];

// Cartões do painel Hoje: largura em colunas (de 12).
export const CARDS = [
  { k: 'pa', icon: 'gauge', span: 6, chart: true },
  { k: 'fc', icon: 'heart', span: 6, chart: true },
  { k: 'gl', icon: 'droplet', span: 6, chart: true },
  { k: 'tc', icon: 'thermo', span: 6, chart: true },
  { k: 'sn', icon: 'moon', span: 6, chart: true },
  { k: 'o2', icon: 'wind', span: 3 },
  { k: 'kg', icon: 'scale', span: 3 },
  { k: 'rad', icon: 'atom', span: 6 },
  { k: 'ring', icon: 'ring', span: 6 },
  { k: 'alim', icon: 'utensils', span: 12, wide: true }
];
