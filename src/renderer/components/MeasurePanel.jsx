import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from './Shell.jsx';
import Icon from './Icon.jsx';
import { StatusChip } from './Status.jsx';
import MyReadings from './MyReadings.jsx';
import { RegisterButton, STATUS_OF, UNIT, kindName, valueText } from './QuickEntry.jsx';
import { useUser } from '../lib/user.jsx';
import { useMeasures } from '../lib/medidas.js';
import { useT } from '../i18n/index.jsx';
import { KINDS, REMINDER_TIME, assess } from '../../shared/rules/measures.js';

const ICON = { pa: 'gauge', gl: 'droplet', kg: 'scale' };

/** Topo da tela Medir agora: registrar as 3 medidas, por que medir cada uma e os registros pessoais. */
export default function MeasurePanel() {
  const { t, num } = useT();
  const { me } = useUser();
  const [params] = useSearchParams();
  const { measures } = useMeasures(me.key);
  const auto = KINDS.includes(params.get('registrar')) ? params.get('registrar') : null;
  const states = useMemo(() => Object.fromEntries(KINDS.map((k) => [k, assess(measures, k)])), [measures]);
  const last = (k) => measures.filter((m) => m.kind === k).sort((a, b) => Date.parse(b.at) - Date.parse(a.at))[0];

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col gap-4 px-[22px] py-5">
        <section aria-labelledby="mp-now" className="flex flex-col gap-4">
          <div>
            <h2 id="mp-now" className="text-[26px] font-semibold leading-tight">{t('measure.registerNow')}</h2>
            <p className="mt-0.5 text-[15px] text-vn-muted">{t('measure.hint')}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
            {KINDS.map((k) => {
              const l = last(k);
              return (
                <div key={k} className="flex flex-col gap-2.5 rounded-sm border border-vn-line bg-vn-field p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-[17px] font-semibold"><Icon name={ICON[k]} color="#62C3FF" />{kindName(t, k)}</span>
                    {states[k].status && <StatusChip st={STATUS_OF[states[k].status]} />}
                  </div>
                  <div className="min-h-[34px] text-[15px] text-vn-muted">
                    {l ? <><span className="text-[26px] font-semibold tabular-nums text-vn-text">{valueText(k, l.value, num)}</span> {UNIT[k]} · {t('measure.lastReg')}</> : t('measure.mineEmpty')}
                  </div>
                  <div className="text-sm text-vn-subtle">{t('measure.why.when')}: {REMINDER_TIME[k]} · {t(`measure.why.freq${k[0].toUpperCase()}${k.slice(1)}`)}</div>
                  <RegisterButton kind={k} defaultOpen={auto === k} className="w-fit" />
                </div>
              );
            })}
          </div>
        </section>
      </Card>

      <Card className="flex flex-col gap-3 px-[22px] py-5">
        <section aria-labelledby="mp-why" className="flex flex-col gap-3">
          <h2 id="mp-why" className="text-[26px] font-semibold leading-tight">{t('measure.why.title')}</h2>
          <p className="text-[16px] text-vn-muted">{t('measure.why.intro')}</p>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
            {KINDS.map((k) => (
              <li key={k} className="flex flex-col gap-1.5 rounded-sm border border-vn-line bg-vn-field p-4">
                <span className="flex items-center gap-2 text-[17px] font-semibold"><Icon name={ICON[k]} color="#62C3FF" />{kindName(t, k)}</span>
                <p className="text-[15px]">{t(`measure.why.${k}`)}</p>
              </li>
            ))}
          </ul>
          <p className="rounded-sm border border-vn-line2 bg-vn-surface px-4 py-3 text-[16px] font-semibold">{t('measure.why.message')}</p>
          <p className="flex items-start gap-2.5 text-sm text-vn-subtle"><Icon name="info" size={18} color="#8AA3BD" className="mt-px" /><span>{t('measure.why.disclaimer')}</span></p>
        </section>
      </Card>

      <MyReadings kinds={KINDS} />
    </div>
  );
}
