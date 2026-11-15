import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { I18nProvider, LANGS } from '../i18n/index.jsx';
import { UserProvider } from '../lib/user.jsx';
import { DemoProvider } from '../lib/demo.jsx';
import { EQUIP_TEXT } from '../data/equipamentos.js';
import Medir from './Medir.jsx';

// Gráficos dependem de medidas reais de tela; aqui só interessa o texto.
vi.mock('@tremor/react', () => ({ ProgressBar: () => null, SparkAreaChart: () => null, SparkBarChart: () => null, SparkLineChart: () => null }));
vi.mock('recharts', () => {
  const Null = () => null;
  return { Bar: Null, CartesianGrid: Null, Cell: Null, ComposedChart: Null, Line: Null, Area: Null, ReferenceArea: Null, ReferenceDot: Null, ResponsiveContainer: Null, Tooltip: Null, XAxis: Null, YAxis: Null };
});

function render(lang) {
  globalThis.localStorage = { getItem: (k) => (k === 'vn.lang' ? lang : null), setItem() {} };
  return renderToString(
    <I18nProvider>
      <UserProvider>
        <DemoProvider>
          <StaticRouter location="/medir"><Medir /></StaticRouter>
        </DemoProvider>
      </UserProvider>
    </I18nProvider>
  );
}

describe('tela Medir agora: equipamentos', () => {
  for (const { code } of LANGS) {
    it(`${code}: mostra pressão, glicose e peso, com os equipamentos de cada um`, () => {
      const html = render(code);
      const x = EQUIP_TEXT[code];
      for (const name of ['Tempus Pro', 'Portapres / Finapres', 'Bio-Monitor', 'i-STAT', 'Dexcom G6', 'SLAMMD', 'BMMD']) expect(html).toContain(name);
      expect(html).toContain(x.weight.name);
      expect(html.split(x.title).length - 1).toBe(3);
      expect(html).toContain(x.note);
      for (const step of x.weight.how) expect(html).toContain(step.replace(/'/g, '&#x27;'));
    });
  }
});
