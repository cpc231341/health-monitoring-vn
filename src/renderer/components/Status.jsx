import { STATUS } from '../lib/status.js';
import { useT } from '../i18n/index.jsx';

/** Forma + cor + texto: o estado nunca depende só da cor. */
export function Glyph({ st, size = 11 }) {
  const col = STATUS[st].col;
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" className="flex-none">
      {st === 'ok' && <circle cx="6" cy="6" r="5" fill={col} />}
      {st === 'warn' && <path d="M6 0.8 11.6 11H0.4z" fill={col} />}
      {st === 'crit' && <path d="M6 0.4 11.6 6 6 11.6 0.4 6z" fill={col} />}
    </svg>
  );
}

export function StatusChip({ st, text, size = 13 }) {
  const { t } = useT();
  const s = STATUS[st];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-0.5 font-semibold leading-snug"
      style={{ fontSize: size, color: s.col, background: s.bg, border: `1px solid ${s.bd}` }}
    >
      <Glyph st={st} />
      {text || t(`status.${st}`)}
    </span>
  );
}
