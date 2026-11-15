import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { useT } from '../i18n/index.jsx';

/** Janela modal simples: Esc e clique fora fecham, e o foco volta para quem abriu. */
export default function Modal({ title, eyebrow, onClose, children, width = 560 }) {
  const { t } = useT();
  const closeRef = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (opener && opener.focus) opener.focus();
    };
  }, [onClose]);
  return (
    <div onClick={onClose} className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[rgba(2,9,18,0.82)] px-6 py-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-t"
        onClick={(e) => e.stopPropagation()}
        style={{ width: `min(${width}px,100%)` }}
        className="my-auto flex flex-col rounded-sm border border-vn-line2 bg-vn-bg"
      >
        <div className="flex items-center justify-between gap-3 border-b border-vn-line px-5 py-3.5">
          <div className="min-w-0">
            {eyebrow && <div className="mono-label text-vn-accent">{eyebrow}</div>}
            <h2 id="modal-t" className="text-[22px] font-semibold leading-tight">{title}</h2>
          </div>
          <button ref={closeRef} type="button" aria-label={t('mission.close')} onClick={onClose} className="flex h-10 w-10 flex-none items-center justify-center rounded-sm border border-vn-line2">
            <Icon name="x" size={18} color="#A9BDD2" />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
