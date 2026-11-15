// Configuração numérica de cada indicador: eixos, faixas e rota do botão de ação.
// Valores ilustrativos, a validar pelo time médico da missão.
// Os textos (nome, unidade, orientações, rótulos das faixas) ficam em i18n/locales: ind.<id>.
// `src` e `when` são chaves de i18n (src.* e when.*); `bands` tem um rótulo por faixa, na mesma ordem.
export const IND_CFG = {
  pa: {
    src: 'manual', when: 'yPa', ranges: ['7d', '30d'], mode: 'line', dual: true, manual: true,
    lo: 60, hi: 140, ticks: [60, 80, 100, 120, 140], bands: [{ lo: 90, hi: 119 }, { lo: 60, hi: 79 }],
    cta: '/medir'
  },
  fc: {
    src: 'ring', when: 'ring', ranges: ['24h', '7d', '30d'], mode: 'line', wave: true,
    lo: 40, hi: 120, ticks: [40, 60, 80, 100, 120], bands: [{ lo: 50, hi: 95, tl: true }],
    cta: '/diario'
  },
  gl: {
    src: 'manual', when: 'yGl', ranges: ['7d', '30d'], mode: 'line', manual: true,
    lo: 60, hi: 140, ticks: [60, 80, 100, 120, 140], bands: [{ lo: 70, hi: 99 }],
    cta: '/medir'
  },
  tc: {
    src: 'ringManual', when: 'ring', ranges: ['24h', '7d', '30d'], mode: 'line', dec: 1,
    lo: 36, hi: 38, ticks: [36, 36.5, 37, 37.5, 38], bands: [{ lo: 36.1, hi: 37.5 }],
    cta: '/medir'
  },
  sn: {
    src: 'ring', when: 'wake', ranges: ['7d', '30d'], mode: 'bars', hm: true,
    lo: 0, hi: 10, ticks: [0, 2, 4, 6, 8, 10], bands: [{ lo: 7, hi: 9 }],
    cta: '/rotina'
  },
  hu: {
    src: 'you', when: 'yHu', ranges: ['7d', '30d'], mode: 'bars',
    lo: 0, hi: 5.5, ticks: [1, 2, 3, 4, 5], bands: [],
    cta: '/diario'
  }
};

// O humor fica só no Diário de bordo.
export const IND_ORDER = ['pa', 'fc', 'gl', 'tc', 'sn'];
export const IND_ICON = { pa: 'gauge', fc: 'heart', gl: 'droplet', tc: 'thermo', sn: 'moon', hu: 'smile' };
