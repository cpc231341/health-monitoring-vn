import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { CREW } from '../data/crew.js';
import { useUser } from '../lib/user.jsx';
import { useFood } from '../lib/food.js';
import { useMeasures } from '../lib/medidas.js';
import { useEscalations } from '../lib/capitao.js';
import { useMissionClock } from '../lib/clock.jsx';
import { kindName } from './QuickEntry.jsx';
import { KINDS, isDue, registeredOn } from '../../shared/rules/measures.js';
import { toDateStr } from '../../shared/rules/training.js';
import { useT } from '../i18n/index.jsx';

// Avisos para o time se cuidar mutuamente. Falam só de registros e atividades, nunca de valores de saúde.
// `ind` leva à Recomendação já com o indicador em foco.
const NOTIFS = [
  { id: 'mood-rita', k: 'mood', who: 'rita' },
  { id: 'sync-mike', k: 'sync', who: 'mike', ind: 'fc' },
  { id: 'eva-ruan', k: 'eva', who: 'ruan' }
];

export default function Notifications() {
  const { t } = useT();
  const { me } = useUser();
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState([]);
  const box = useRef(null);
  const { alerts } = useFood(me.key);
  // Lembrete discreto das medidas do dia: some sozinho depois do registro, sem cobrança.
  const { measures } = useMeasures(me.key);
  const { minutes } = useMissionClock();
  const registered = registeredOn(measures, me.key, toDateStr());
  const reminders = KINDS.filter((k) => isDue(k, minutes, registered)).map((k) => ({ id: `measure-${k}`, measure: k }));
  // Avisos de alimentação: os do próprio tripulante e o de estoque coletivo (sem nomes) entram primeiro.
  const foodItems = alerts.map((a) => ({ id: a.id, food: a }));
  // RN04: crítico que continuou crítico na re-medição avisa o capitão (só o estado, nunca o valor).
  const { queue } = useEscalations();
  const critical = me.captain ? queue.map((e) => ({ id: `crit-${e.id}`, crit: e })) : [];
  const items = [...critical, ...foodItems, ...reminders, ...NOTIFS.filter((n) => n.who !== me.key)];
  const unread = items.filter((n) => !read.includes(n.id)).length;
  const label = t('topbar.notifications');

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
        aria-haspopup="true"
        aria-label={unread ? `${label}, ${t('notif.count', { n: unread })}` : label}
        title={label}
        onClick={() => setOpen(!open)}
        className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-vn-line2 bg-vn-surface hover:border-vn-accent"
      >
        <Icon name="bell" size={21} color="#E8F0F8" />
        {unread > 0 && (
          <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-vn-warn px-1 text-xs font-bold text-vn-ink">{unread}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(380px,calc(100vw-48px))] rounded-sm border border-vn-line2 bg-vn-field p-4 shadow-[0_12px_32px_rgba(0,0,0,.45)]">
          <div className="text-lg font-semibold">{label}</div>
          <p className="mb-2.5 text-sm text-vn-muted">{t('notif.sub')}</p>
          {items.length === 0 && <p className="py-2 text-[15px] text-vn-muted">{t('notif.empty')}</p>}
          <ul>
            {items.map((n) => {
              const person = n.who ? CREW.find((c) => c.key === n.who) : null;
              const isNew = !read.includes(n.id);
              return (
                <li key={n.id} className="border-t border-vn-line">
                  <Link
                    to={n.crit ? '/comandante' : n.measure ? `/medir?registrar=${n.measure}` : n.food ? '/diario?aba=alimentacao' : n.ind ? `/recomendacao?ind=${n.ind}` : '/recomendacao'}
                    onClick={() => { setRead((r) => (r.includes(n.id) ? r : [...r, n.id])); setOpen(false); }}
                    className="flex items-start gap-3 py-3 text-vn-text hover:text-vn-text"
                  >
                    <span aria-hidden="true" className={'mt-1.5 h-2.5 w-2.5 flex-none rounded-full ' + (isNew ? 'bg-vn-warn' : 'bg-vn-line2')} />
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[15px]">{n.crit ? t('cap.notify', { name: CREW.find((c) => c.key === n.crit.crew).first, measure: kindName(t, n.crit.kind) }) : n.measure ? t('measure.remind', { name: kindName(t, n.measure) }) : n.food ? t(`food.warn.${n.food.code}`, n.food.params) : t(`notif.items.${n.k}`, { name: person.first })}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-vn-accent">{n.crit ? t('cap.go') : n.measure ? t('measure.registerNow') : n.food ? t('food.openLog') : t('notif.go')}<Icon name="arrowright" size={15} /></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
