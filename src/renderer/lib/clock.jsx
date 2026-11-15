import { useEffect, useState } from 'react';
import { TEAM } from '../data/crew.js';

// Relógio da missão sincronizado com o horário de Houston, Texas (centro de controle).
const TZ = 'America/Chicago';
const pad = (x) => String(x).padStart(2, '0');
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

export const formatClock = (min) => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
};
export const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const nowMinutes = () => toMinutes(fmt.format(new Date()));

export function useMissionClock() {
  const [min, setMin] = useState(nowMinutes);
  useEffect(() => {
    const id = setInterval(() => setMin(nowMinutes()), 10000);
    return () => clearInterval(id);
  }, []);
  return { minutes: min, time: formatClock(min), day: TEAM.day };
}
