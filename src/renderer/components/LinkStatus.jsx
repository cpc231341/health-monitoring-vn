import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { useT } from '../i18n/index.jsx';
import earthBase from '../assets/earth-base.png';

// Estado da conexão com a base na Terra. Os estados são simulados para a demonstração.
// Textos de cada estado em i18n: link.states.<chave>. `ago` é o tempo desde o último envio.
// Sem contato sempre usa cor de alerta (âmbar ou vermelho).
const STATES = {
  online: { col: '#46D39A', bg: 'rgba(70,211,154,0.14)', bd: 'rgba(70,211,154,0.45)', icon: 'wifi', ago: '2m', contact: true },
  lag: { col: '#62C3FF', bg: 'rgba(98,195,255,0.12)', bd: 'rgba(98,195,255,0.45)', icon: 'clock', ago: '2m', contact: true },
  off: { col: '#FFC24B', bg: 'rgba(255,194,75,0.16)', bd: 'rgba(255,194,75,0.6)', icon: 'wifioff', ago: '30m', contact: false },
  send: { col: '#62C3FF', bg: 'rgba(98,195,255,0.12)', bd: 'rgba(98,195,255,0.45)', icon: 'refresh', ago: '30m', contact: true, spin: true },
  warn: { col: '#FF7B7B', bg: 'rgba(255,123,123,0.16)', bd: 'rgba(255,123,123,0.6)', icon: 'alert', ago: '6h 02m', contact: false }
};

export default function LinkStatus() {
  const { t } = useT();
  const [k, setK] = useState('online');
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const s = STATES[k];
  const txt = (key, field) => t(`link.states.${key}.${field}`);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onDown); };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="lk-panel"
        aria-label={t('link.openAria', { status: txt(k, 'label') })}
        title={txt(k, 'label')}
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-sm px-2.5 text-[15px] font-semibold"
        style={{ color: s.col, background: s.bg, border: `1px solid ${s.bd}` }}
      >
        <img src={earthBase} alt="" width="34" height="22" className="h-[26px] w-auto object-contain" />
        <Icon name={s.icon} size={18} className={s.spin ? 'animate-[spin_1.2s_linear_infinite] motion-reduce:animate-none' : ''} />
        <span className="hidden whitespace-nowrap lg:inline">{txt(k, 'name')}</span>
      </button>
      {open && (
        <div id="lk-panel" role="dialog" aria-label={t('link.title')} className="absolute right-0 top-full z-50 mt-2 w-[min(420px,calc(100vw-48px))] rounded-sm border border-vn-line2 bg-vn-field p-4 shadow-[0_12px_32px_rgba(0,0,0,.45)]">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-3 text-lg font-semibold">
              <img src={earthBase} alt="" width="48" height="31" className="h-8 w-auto object-contain" />
              {t('link.title')}
            </span>
            <button type="button" aria-label={t('link.close')} onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-sm">
              <Icon name="x" size={18} color="#A9BDD2" />
            </button>
          </div>
          <div role="status" className="mt-3 flex items-center gap-2 rounded-sm px-3 py-2 font-semibold" style={{ color: s.col, background: s.bg, border: `1px solid ${s.bd}` }}>
            <Icon name={s.icon} size={20} className={s.spin ? 'animate-[spin_1.2s_linear_infinite] motion-reduce:animate-none' : ''} />
            <span>{txt(k, 'label')}</span>
          </div>
          <p className="mt-3 text-[15px]">{txt(k, 'flow')}</p>
          <p className="mt-1 text-sm text-vn-muted">{t(s.contact ? 'link.lastSent' : 'link.lastSentOffline', { ago: s.ago })}</p>
          {!s.contact && (
            <div className="mt-3">
              <button type="button" className="btn-s" onClick={() => setK('send')}>{t('link.sendNow')}</button>
            </div>
          )}
          <div className="mt-3.5 border-t border-vn-line pt-3">
            <div className="mb-2 text-xs uppercase tracking-widest text-vn-subtle">{t('link.demoState')}</div>
            <div role="group" aria-label={t('link.stateAria')} className="flex flex-wrap gap-1.5">
              {Object.keys(STATES).map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={o === k}
                  onClick={() => setK(o)}
                  className={'min-h-[36px] rounded-sm border px-3 py-1 text-sm ' + (o === k ? 'border-vn-accent bg-vn-surface2' : 'border-vn-line2')}
                >
                  {txt(o, 'name')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
