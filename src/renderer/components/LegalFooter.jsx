import { useT } from '../i18n/index.jsx';

/** Aviso legal do protótipo, no rodapé de todas as telas. */
export default function LegalFooter() {
  const { t } = useT();
  return (
    <footer className="mt-auto border-t border-vn-line px-8 py-4">
      <p className="mx-auto max-w-[1100px] text-xs text-vn-subtle">{t('mission.footer')}</p>
    </footer>
  );
}
