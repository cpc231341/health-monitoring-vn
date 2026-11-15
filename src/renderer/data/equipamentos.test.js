import { describe, expect, it } from 'vitest';
import { EQUIPMENT, EQUIP_TEXT } from './equipamentos.js';
import { LANGS } from '../i18n/index.jsx';

/** Lista "caminho" de todas as folhas; listas entram com o índice no caminho. */
function leaves(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) v.forEach((item, i) => { out[`${path}[${i}]`] = item; });
    else if (v && typeof v === 'object') Object.assign(out, leaves(v, path));
    else out[path] = v;
  }
  return out;
}

const base = leaves(EQUIP_TEXT.pt);

describe('equipamentos no espaço', () => {
  it('tem texto para todos os idiomas do app', () => {
    expect(Object.keys(EQUIP_TEXT).sort()).toEqual(LANGS.map((l) => l.code).sort());
  });

  for (const [code, dict] of Object.entries(EQUIP_TEXT)) {
    it(`${code}: mesmas chaves do português e nenhum texto vazio`, () => {
      const other = leaves(dict);
      expect(Object.keys(other).sort()).toEqual(Object.keys(base).sort());
      expect(Object.values(other).filter((v) => String(v).trim() === '')).toEqual([]);
    });

    it(`${code}: descrição e tipo existem para cada equipamento`, () => {
      for (const list of Object.values(EQUIPMENT)) {
        for (const g of list) {
          expect(dict.desc[g.id], g.id).toBeTruthy();
          expect(dict.kinds[g.kind], g.kind).toBeTruthy();
        }
      }
      expect(dict.weight.how).toHaveLength(4);
    });
  }

  it('pressão, glicose e peso têm equipamentos; ids são únicos', () => {
    expect(Object.keys(EQUIPMENT).sort()).toEqual(['gl', 'kg', 'pa']);
    const ids = Object.values(EQUIPMENT).flat().map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['tempus', 'finapres', 'biomonitor', 'istat', 'cgm', 'slammd', 'bmmd']));
  });
});
