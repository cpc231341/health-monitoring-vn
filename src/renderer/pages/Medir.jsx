import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import MeasurePanel from '../components/MeasurePanel.jsx';
import { useT } from '../i18n/index.jsx';
import { IND_ORDER } from '../data/indicadores.js';
import { EQUIPMENT, EQUIP_TEXT } from '../data/equipamentos.js';

// O peso entra depois dos indicadores: no espaço se mede a massa, com aparelho próprio.
const ITEMS = [...IND_ORDER, 'kg'];

function Equipment({ id, gear, x }) {
  return (
    <section aria-labelledby={`eq-${id}`} className="mb-3 border-t border-vn-line pt-3">
      <h3 id={`eq-${id}`} className="mb-2.5 text-[15px] font-semibold text-vn-muted">{x.title}</h3>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5">
        {gear.map((g) => (
          <li key={g.id} className="flex flex-col gap-1.5 rounded-sm border border-vn-line bg-vn-field px-3.5 py-3">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="text-[16px] font-semibold">{g.name}</span>
              <span className="rounded-sm border border-vn-line2 px-1.5 py-px text-xs font-semibold text-vn-accent">{x.kinds[g.kind]}</span>
            </div>
            <p className="text-[15px] text-vn-muted">{x.desc[g.id]}</p>
            <p className="text-sm text-vn-subtle">{x.source}: {g.src}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Orientações de como medir cada indicador e os equipamentos usados no espaço.
export default function Medir() {
  const { t, lang } = useT();
  const x = EQUIP_TEXT[lang] || EQUIP_TEXT.en;
  return (
    <Shell header={<PageHeader title={t('nav.measure')} sub={t('diary.howSub')} />}>
      <div className="flex flex-col gap-5 px-8 pb-12 pt-6">
        <MeasurePanel />
        <Card className="flex flex-col px-[22px] py-3">
          <h2 className="sr-only">{t('ind.howTitle')}</h2>
          {ITEMS.map((k) => {
            const weight = k === 'kg';
            const steps = weight ? x.weight.how : t(`ind.${k}.how`);
            const gear = EQUIPMENT[k] || [];
            return (
              <details key={k} className="group border-t border-vn-line py-1 first:border-t-0">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 text-[17px] font-semibold">
                  {weight ? x.weight.name : t(`ind.${k}.name`)}
                  <Icon name="chevron" size={18} color="#A9BDD2" className="transition-transform group-open:rotate-90" />
                </summary>
                {weight && <p className="pb-2 pt-1 text-[16px] text-vn-muted">{x.weight.intro}</p>}
                <ol className="flex flex-col gap-2.5 pb-3 pt-1">
                  {steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span aria-hidden="true" className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-vn-surface2 text-sm font-medium text-vn-accent">{i + 1}</span>
                      <span className="min-w-0 pt-0.5 text-[16px]">{step}</span>
                    </li>
                  ))}
                </ol>
                {gear.length > 0 && <Equipment id={k} gear={gear} x={x} />}
              </details>
            );
          })}
          <p className="border-t border-vn-line pb-1 pt-3 text-sm text-vn-subtle">{x.note}</p>
        </Card>
      </div>
    </Shell>
  );
}
