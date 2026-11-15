import { useT } from '../i18n/index.jsx';

/** Recorte do rosto a partir da foto de corpo inteiro. */
export default function Avatar({ person, size = 40 }) {
  const { t } = useT();
  return (
    <span
      role="img"
      aria-label={t('crew.photoOf', { name: person.name })}
      className="flex-none rounded-full bg-vn-surface2"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${person.photo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '230% auto',
        backgroundPosition: '50% 9%'
      }}
    />
  );
}
