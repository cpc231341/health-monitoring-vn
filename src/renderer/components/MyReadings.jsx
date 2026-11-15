import { useMemo } from 'react';
import { Card } from './Shell.jsx';
import { StatusChip } from './Status.jsx';
import { STATUS_OF, UNIT, deviceName, kindName, valueText } from './QuickEntry.jsx';
import { useUser } from '../lib/user.jsx';
import { useMeasures } from '../lib/medidas.js';
import { useT } from '../i18n/index.jsx';
import { assess } from '../../shared/rules/measures.js';

/** Registros do próprio tripulante (pessoais) e o estado pela média dos últimos 3. */
export default function MyReadings({ kinds, limit = 7 }) {
  const { t, num } = useT();
  const { me } = useUser();
  const { measures } = useMeasures(me.key);
  const rows = useMemo(
    () => kinds.map((kind) => ({
      kind,
      list: measures.filter((m) => m.kind === kind).sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, limit),
      state: assess(measures, kind)
    })),
    [kinds, measures, limit]
  );
  return (
    <Card className="flex flex-col gap-3 px-[22px] py-5">
      <section aria-labelledby="my-readings" className="flex flex-col gap-3">
        <h2 id="my-readings" className="text-[26px] font-semibold leading-tight">{t('measure.mine')}</h2>
        {rows.map(({ kind, list, state }) => (
          <div key={kind} className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-vn-line pt-3">
              <h3 className="text-lg font-semibold">{kindName(t, kind)}</h3>
              {state.status && <StatusChip st={STATUS_OF[state.status]} />}
            </div>
            {list.length === 0 && <p className="text-[15px] text-vn-muted">{t('measure.mineEmpty')}</p>}
            <ul>
              {list.map((m) => (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5 py-1.5 text-[15px]">
                  <span className="font-semibold tabular-nums">{valueText(kind, m.value, num)} <span className="font-normal text-vn-muted">{UNIT[kind]}</span></span>
                  <span className="text-vn-muted">{deviceName(t, kind, m.device)} · {new Date(m.at).toLocaleString(undefined, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Card>
  );
}
