import { useMemo } from 'react';
import { CREW } from '../data/crew.js';
import { useT } from '../i18n/index.jsx';

/** Tripulação com função, atividade e horário no idioma atual. */
export function useCrew() {
  const { t } = useT();
  return useMemo(
    () => CREW.map((c) => ({
      ...c,
      role: t(`crew.${c.key}.role`),
      activity: t(`crew.${c.key}.activity`),
      until: c.hasUntil ? t(`crew.${c.key}.until`) : ''
    })),
    [t]
  );
}
