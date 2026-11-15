import { useMissionClock } from '../lib/clock.jsx';
import { useT } from '../i18n/index.jsx';

/** Horário atual com o dia da missão logo abaixo, na mesma largura do horário. */
export default function MissionClock({ compact = false }) {
  const { t } = useT();
  const { time, day } = useMissionClock();
  return (
    <div role="timer" aria-label={t('clock.aria', { day, time })} className="inline-flex flex-col gap-1">
      <span className={(compact ? 'text-base' : 'text-[22px]') + ' font-semibold leading-none tabular-nums'}>{time}</span>
      <span aria-hidden="true" className="mono-label flex justify-between font-semibold leading-none text-vn-accent">
        {[...t('clock.day', { day })].map((ch, i) => <span key={i}>{ch === ' ' ? '\u00A0' : ch}</span>)}
      </span>
    </div>
  );
}
