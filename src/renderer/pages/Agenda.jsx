import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import { useDemo } from '../lib/demo.jsx';
import { useUser } from '../lib/user.jsx';
import { useTodayPlan } from '../lib/training.js';
import { useMeasures } from '../lib/medidas.js';
import { registeredOn } from '../../shared/rules/measures.js';
import { toDateStr } from '../../shared/rules/training.js';
import { useT } from '../i18n/index.jsx';
import { AGENDA, ENVIRONMENTS, SCENARIOS } from '../data/hoje.js';
import { compute } from './Hoje.jsx';

export default function Agenda() {
  const i18n = useT();
  const { t } = i18n;
  const { scen, env } = useDemo();
  const [done, setDone] = useState({ sync: true });
  const R = useMemo(() => compute(SCENARIOS[scen], ENVIRONMENTS[env], i18n), [scen, env, i18n]);
  const { me } = useUser();
  const { intensity, routine } = useTodayPlan(me.key, R);
  // As medições somem da pendência quando o registro do dia é feito.
  const { measures } = useMeasures(me.key);
  const registered = registeredOn(measures, me.key, toDateStr());
  const isDoneItem = (item) => !!done[item.k] || (item.kind ? registered.has(item.kind) : false);

  // O treino mostra a rotina planejada de hoje, já ajustada por sono curto ou alerta crítico.
  const planned = routine && routine.exercises.length > 0
    ? `${t(`train.routines.${routine.id}`)} · ${t('train.exercisesCount', { n: routine.exercises.length })}${intensity.level === 'light' ? ` · ${t('train.lighter')}` : ''}`
    : null;
  const detail = (k) => t(`today.details.${k}`);
  const details = {
    sync: detail('sync'),
    medpa: detail('med'),
    medgl: detail('medgl'),
    medkg: detail('medkg'),
    cafe: detail('cafe'),
    almoco: detail('almoco'),
    treino: planned || detail('treinoCrit'),
    diario: detail('diario'),
    sono: detail('sono')
  };
  const doneCount = AGENDA.filter(isDoneItem).length;

  return (
    <Shell
      header={
        <PageHeader
          title={t('nav.agenda')}
          sub={t('agendaPage.sub')}
          right={<span className="text-[15px] text-vn-muted">{t('today.agendaDone', { done: doneCount, total: AGENDA.length })}</span>}
        />
      }
    >
      <div className="px-8 pb-12 pt-6">
        <Card className="px-[22px] py-3">
          <ul aria-label={t('nav.agenda')}>
            {AGENDA.map((a) => {
              const isDone = isDoneItem(a);
              const title = t(`agenda.${a.k}`);
              return (
                <li key={a.k} className="grid grid-cols-[58px_24px_minmax(0,1fr)_auto_auto] items-center gap-x-3.5 gap-y-1.5 border-b border-vn-line py-3 last:border-b-0">
                  <span className="text-[15px] text-vn-muted">{a.time}</span>
                  <Icon name={a.icon} size={22} color="#62C3FF" />
                  <div className="min-w-0">
                    <div className="text-[17px] font-semibold">{title}</div>
                    <div className="text-[15px] text-vn-muted">{details[a.k]}</div>
                  </div>
                  <span>{a.to && <Link to={a.to} className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold">{t('today.open')}<Icon name="arrowright" size={16} /></Link>}</span>
                  <button
                    type="button"
                    aria-pressed={isDone}
                    aria-label={t('today.markDone', { title })}
                    onClick={() => setDone({ ...done, [a.k]: !isDone })}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px]"
                    style={{ borderColor: isDone ? '#46D39A' : '#2F5C8A', background: isDone ? '#46D39A' : 'transparent' }}
                  >
                    {isDone && <Icon name="check" color="#04162B" stroke={2.6} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </Shell>
  );
}
