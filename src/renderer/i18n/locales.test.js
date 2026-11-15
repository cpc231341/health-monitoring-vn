import { describe, expect, it } from 'vitest';
import pt from './locales/pt.js';
import en from './locales/en.js';
import es from './locales/es.js';
import de from './locales/de.js';
import fr from './locales/fr.js';
import itLocale from './locales/it.js';
import jaLocale from './locales/ja.js';

const LOCALES = { en, es, de, fr, it: itLocale, ja: jaLocale };

/** Lista "caminho => valor" de todas as folhas; listas entram com o índice no caminho. */
function leaves(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (item && typeof item === 'object') Object.assign(out, leaves(item, `${path}[${i}]`));
        else out[`${path}[${i}]`] = item;
      });
    } else if (v && typeof v === 'object') Object.assign(out, leaves(v, path));
    else out[path] = v;
  }
  return out;
}

const placeholders = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join(',');
const base = leaves(pt);

describe('traduções', () => {
  for (const [code, dict] of Object.entries(LOCALES)) {
    const other = leaves(dict);

    it(`${code}: tem exatamente as mesmas chaves do português`, () => {
      const missing = Object.keys(base).filter((k) => !(k in other));
      const extra = Object.keys(other).filter((k) => !(k in base));
      expect({ missing, extra }).toEqual({ missing: [], extra: [] });
    });

    it(`${code}: usa os mesmos {marcadores} do português`, () => {
      const wrong = Object.keys(base).filter((k) => k in other && placeholders(base[k]) !== placeholders(other[k]));
      expect(wrong).toEqual([]);
    });

    it(`${code}: nenhum texto está vazio`, () => {
      const empty = Object.keys(other).filter((k) => String(other[k]).trim() === '');
      expect(empty).toEqual([]);
    });
  }
});

// Termos que a equipe pediu para sair do sistema (em cada idioma).
const REMOVED = {
  pt: [/expedi[çc]/i, /dados simulados\. nada/i, /medição isolada diz pouco/i, /guia de ação/i, /fun[çc]ões de bordo/i, /cinco riscos/i, /todos veem este painel/i],
  en: [/expedition/i, /simulated\. nothing here/i, /single measurement says little/i, /action guide/i, /five risks/i, /everyone sees this panel/i],
  es: [/expedici[óo]n/i, /simulados\. nada aqu/i, /gu[íi]a de acci[óo]n/i, /cinco riesgos/i],
  de: [/expedition/i, /handlungsleitfaden/i, /fünf risiken/i],
  fr: [/exp[ée]dition/i, /guide d.action/i, /cinq risques/i],
  it: [/spedizione/i, /guida alle azioni/i, /cinque rischi/i],
  ja: [/遠征/, /アクションガイド/, /5つのリスク/]
};

describe('textos removidos e atualizados', () => {
  for (const [code, dict] of Object.entries({ pt, ...LOCALES })) {
    it(`${code}: não restam os termos retirados`, () => {
      const all = Object.values(leaves(dict)).join('\n');
      for (const re of REMOVED[code]) expect(all).not.toMatch(re);
    });
  }

  it('a tripulação padrão tem cargos definidos e o Cristiano é o capitão', () => {
    expect(pt.crew.cristiano.role).toBe('Capitão');
    expect(pt.crew.rita.role).toBe('Especialista em missão');
    expect(pt.crew.mike.role).toBe('Especialista em missão');
    expect(pt.crew.ruan.role).toBe('Piloto');
    expect(pt.crew['luis-felipe'].role).toBeTruthy();
  });

  it('o ID da missão substitui a expedição e o desafio tem o novo texto', () => {
    expect(pt.mission.facts.missionId).toBe('ID da Missão');
    expect(pt.mission.challengeValue).toBe('7ª edição da Latin American Space Challenge (LASC 2026)');
    expect(pt.mission.teamDesc).toBe('Primeira equipe universitária de foguetemodelismo e alta potência (high power rocketry) do Estado do Amazonas e da Região Norte do Brasil');
    expect(pt.mission.footer).toContain('NeuroKit2 e IA do Claude Code');
  });

  it('o último envio usa o formato oficial', () => {
    expect(pt.link.lastSent).toBe('Último envio: há {ago} · Confirmação de envio para a base será enviada em até 12min');
  });
});
