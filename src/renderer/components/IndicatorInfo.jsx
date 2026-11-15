import { useState } from 'react';
import Icon from './Icon.jsx';
import Modal from './Modal.jsx';
import { useT } from '../i18n/index.jsx';

/** Botão "i" ao lado do título do indicador: abre a explicação de por que ele importa. */
export default function IndicatorInfo({ id }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const name = t(`ind.${id}.name`);
  const label = t('ind.infoOpen', { name });
  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        title={label}
        onClick={() => setOpen(true)}
        className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-vn-line2 hover:border-vn-accent"
      >
        <Icon name="info" size={17} color="#8AA3BD" />
      </button>
      {open && (
        <Modal eyebrow={t('ind.whyTitle')} title={name} onClose={() => setOpen(false)}>
          {t(`ind.${id}.why`).map((p) => <p key={p} className="text-[17px]">{p}</p>)}
        </Modal>
      )}
    </>
  );
}
