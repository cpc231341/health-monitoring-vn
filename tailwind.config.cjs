const path = require('path');

/** Tema do Vento Norte Health: azul-marinho de sala de controle, cantos retos. */
const tremorColors = {
  brand: { faint: '#0C2442', muted: '#133559', subtle: '#2F5C8A', DEFAULT: '#62C3FF', emphasis: '#8AD3FF', inverted: '#04162B' },
  background: { muted: '#071D38', subtle: '#133559', DEFAULT: '#0C2442', emphasis: '#E8F0F8' },
  border: { DEFAULT: '#1F4469' },
  ring: { DEFAULT: '#1F4469' },
  content: { subtle: '#8AA3BD', DEFAULT: '#A9BDD2', emphasis: '#E8F0F8', strong: '#FFFFFF', inverted: '#04162B' }
};

module.exports = {
  darkMode: 'class',
  content: [
    path.join(__dirname, 'src/renderer/index.html'),
    path.join(__dirname, 'src/renderer/**/*.{js,jsx}'),
    path.join(__dirname, 'node_modules/@tremor/**/*.{js,ts,jsx,tsx}')
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      fontFamily: { sans: ['"Source Sans 3"', '"Source Sans Pro"', '"Segoe UI"', 'system-ui', 'sans-serif'] },
      colors: {
        vn: {
          deep: '#030D1A', bg: '#06182E', side: '#041224', surface: '#0C2442', surface2: '#133559', field: '#071D38',
          line: '#1F4469', line2: '#2F5C8A', text: '#E8F0F8', muted: '#A9BDD2', subtle: '#8AA3BD',
          accent: '#62C3FF', accenthi: '#8AD3FF', ink: '#04162B', ok: '#46D39A', warn: '#FFC24B', crit: '#FF7B7B',
          pink: '#FF8FC7', gold: '#FFC24B'
        },
        // tons usados pelos gráficos do Tremor, ajustados para a paleta do app
        sky: { 500: '#62C3FF' },
        emerald: { 500: '#46D39A' },
        amber: { 500: '#FFC24B' },
        rose: { 500: '#FF7B7B' },
        slate: { 500: '#A9BDD2' },
        tremor: tremorColors,
        'dark-tremor': tremorColors
      },
      boxShadow: {
        'tremor-input': 'none', 'tremor-card': 'none', 'tremor-dropdown': '0 12px 32px rgba(0,0,0,.45)',
        'dark-tremor-input': 'none', 'dark-tremor-card': 'none', 'dark-tremor-dropdown': '0 12px 32px rgba(0,0,0,.45)'
      },
      borderRadius: { 'tremor-small': '2px', 'tremor-default': '2px', 'tremor-full': '9999px' },
      fontSize: {
        'tremor-label': ['0.8125rem', { lineHeight: '1.1rem' }],
        'tremor-default': ['0.9375rem', { lineHeight: '1.35rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
      },
      keyframes: { spin: { to: { transform: 'rotate(360deg)' } } }
    }
  },
  safelist: [
    { pattern: /^(bg|text|border|ring)-(sky|emerald|amber|rose|slate)-(500)$/, variants: ['hover'] },
    { pattern: /^(stroke|fill)-(sky|emerald|amber|rose|slate)-(500)$/ }
  ],
  plugins: []
};
