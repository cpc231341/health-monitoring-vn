import { useState, useRef, useEffect } from 'react';
import { LANGS, useT } from '../i18n/index.jsx';
import FlagIcon from './FlagIcon.jsx';

/** Seletor de idioma compacto: mostra a bandeira do idioma atual; abre dropdown com todas as opções. */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className={'relative ' + className} aria-label={t('lang.label')}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-9 items-center gap-2 rounded-sm border border-vn-line2 bg-vn-surface px-2 hover:border-vn-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vn-accent"
        title={current.name}
      >
        <FlagIcon code={current.flagCode} size={18} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('lang.label')}
          className="absolute right-0 top-full z-50 mt-1 min-w-[160px] overflow-hidden rounded-sm border border-vn-line2 bg-vn-surface shadow-lg"
        >
          {LANGS.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                lang={l.html}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={
                  'flex w-full items-center gap-3 px-3.5 py-2.5 text-[15px] hover:bg-vn-field ' +
                  (l.code === lang ? 'font-semibold text-vn-accent' : 'text-vn-text')
                }
              >
                <FlagIcon code={l.flagCode} size={16} />
                <span>{l.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
