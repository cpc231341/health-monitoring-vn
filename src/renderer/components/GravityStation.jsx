import { useState } from 'react';
import Modal from './Modal.jsx';
import { useDemo } from '../lib/demo.jsx';
import { ENVIRONMENTS } from '../data/hoje.js';
import { useT } from '../i18n/index.jsx';
import station from '../assets/station.png';

/** Ícone da estação (acesso rápido) e janela com as informações do ambiente da missão. */
export default function GravityStation() {
  const { t, num } = useT();
  const { env } = useDemo();
  const [open, setOpen] = useState(false);
  const ev = ENVIRONMENTS[env];
  const label = t('topbar.gravity');
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={label}
        title={label}
        onClick={() => setOpen(true)}
        className="flex h-10 w-12 items-center justify-center rounded-sm border border-vn-line2 bg-vn-surface hover:border-vn-accent"
      >
        <img src={station} alt="" width="34" height="32" className="h-8 w-auto object-contain" />
      </button>
      {open && (
        <Modal eyebrow={label} title={t('today.envTitle', { name: t(`environments.${env}.name`) })} onClose={() => setOpen(false)}>
          {env === 'estacao' && <img src={station} alt="" className="mx-auto h-44 w-auto object-contain" />}
          <dl className="grid grid-cols-[minmax(112px,max-content)_minmax(0,1fr)] gap-x-[18px] gap-y-3">
            <dt className="text-vn-muted">{t('today.gravity')}</dt><dd className="font-semibold">{t(`environments.${env}.g`)}</dd>
            <dt className="text-vn-muted">{t('today.comms')}</dt><dd className="font-semibold">{t(`environments.${env}.delay`)}</dd>
            <dt className="text-vn-muted">{t('today.light')}</dt><dd className="font-semibold">{t(`environments.${env}.light`)}</dd>
            <dt className="text-vn-muted">{t('today.normalRad')}</dt><dd className="font-semibold">{ev.rad < 0.1 ? num(ev.rad, 3) : num(ev.rad, 1)} {t('today.radUnit')}</dd>
          </dl>
          <p className="rounded-sm bg-vn-field px-3.5 py-3 text-[15px] text-vn-muted">{t(`environments.${env}.note`)}</p>
          <p className="text-[13px] text-vn-subtle">{t('today.illustrative')}</p>
        </Modal>
      )}
    </>
  );
}
