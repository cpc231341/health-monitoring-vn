import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en.js';
import pt from './locales/pt.js';
import es from './locales/es.js';
import de from './locales/de.js';
import fr from './locales/fr.js';
import it from './locales/it.js';
import ja from './locales/ja.js';

/** Idiomas disponíveis. O inglês é o primeiro da lista e o idioma de reserva. */
export const LANGS = [
  { code: 'en', name: 'English',   locale: 'en-US', html: 'en',    flagCode: 'us' },
  { code: 'pt', name: 'Português', locale: 'pt-BR', html: 'pt-BR', flagCode: 'br' },
  { code: 'es', name: 'Español',   locale: 'es-ES', html: 'es',    flagCode: 'es' },
  { code: 'de', name: 'Deutsch',   locale: 'de-DE', html: 'de',    flagCode: 'de' },
  { code: 'fr', name: 'Français',  locale: 'fr-FR', html: 'fr',    flagCode: 'fr' },
  { code: 'it', name: 'Italiano',  locale: 'it-IT', html: 'it',    flagCode: 'it' },
  { code: 'ja', name: '日本語',    locale: 'ja-JP', html: 'ja',    flagCode: 'jp' }
];

export const DICTS = { en, pt, es, de, fr, it, ja };
const FALLBACK = 'en';
const STORAGE_KEY = 'vn.lang';

const isLang = (code) => LANGS.some((l) => l.code === code);

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch (e) { /* sem armazenamento */ }
  // Sem escolha salva: usa o idioma do sistema, se for um dos disponíveis.
  const sys = (typeof navigator !== 'undefined' && navigator.language ? navigator.language : '').slice(0, 2).toLowerCase();
  return isLang(sys) ? sys : FALLBACK;
}

function pick(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/** Troca {nome} pelos valores informados. */
export function fill(text, vars) {
  if (typeof text !== 'string' || !vars) return text;
  return text.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? String(vars[k]) : m));
}

/** Cria as funções de tradução e de formatação de um idioma. */
export function makeI18n(lang) {
  const meta = LANGS.find((l) => l.code === lang) || LANGS[0];
  const dict = DICTS[meta.code];
  const t = (key, vars) => {
    const v = pick(dict, key) ?? pick(DICTS[FALLBACK], key);
    return v === undefined ? key : fill(v, vars);
  };
  const num = (n, digits = 0) => new Intl.NumberFormat(meta.locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
  const hm = (h) => {
    const total = Math.round(h * 60);
    const mm = total % 60;
    return fill(pick(dict, 'time.hm'), { h: Math.floor(total / 60), m: mm < 10 ? '0' + mm : mm });
  };
  // Minúsculas para meio de frase. Em alemão os substantivos levam inicial maiúscula.
  const lc = (s) => (meta.code === 'de' ? s : String(s).toLowerCase());
  return { lang: meta.code, locale: meta.locale, t, num, hm, lc };
}

const I18nCtx = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const setLang = (code) => {
    if (!isLang(code)) return;
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* fica só na sessão */ }
  };
  const value = useMemo(() => ({ ...makeI18n(lang), setLang }), [lang]);
  useEffect(() => {
    document.documentElement.lang = (LANGS.find((l) => l.code === lang) || LANGS[0]).html;
  }, [lang]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useT = () => useContext(I18nCtx);
