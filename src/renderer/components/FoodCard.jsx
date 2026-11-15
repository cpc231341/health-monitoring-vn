import { Link } from 'react-router-dom';
import { Card } from './Shell.jsx';
import Icon from './Icon.jsx';
import { StatusChip } from './Status.jsx';
import { Notice } from './FoodLog.jsx';
import { useUser } from '../lib/user.jsx';
import { useFood } from '../lib/food.js';
import { useT } from '../i18n/index.jsx';
import { FOOD_LIMITS, MEALS } from '../../shared/rules/food.js';

/** Cartão "Alimentação" do Hoje: refeições, bebidas e sobremesas do dia. Arrastável como os demais. */
export default function FoodCard({ tools }) {
  const { t } = useT();
  const { me } = useUser();
  const { counters, today } = useFood(me.key);
  const warnings = today.flatMap((l) => (l.avisos || []).filter((w) => w.level === 'warning'));
  const stats = [
    ['meals', t('food.ofMax', { n: counters.refeicoes, max: MEALS.length })],
    ['drinks', t('food.ofMax', { n: counters.bebidasSaborizadas, max: FOOD_LIMITS.flavoredDrinksPerDay })],
    ['desserts', t('food.ofMax', { n: counters.sobremesas, max: FOOD_LIMITS.dessertsPerDay })]
  ];
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-3 px-[18px] py-4 hover:border-vn-accent">
      {tools}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <Link to="/diario?aba=alimentacao" className="flex items-center gap-2.5 text-[17px] font-semibold text-vn-text hover:text-vn-text">
          <Icon name="utensils" color="#62C3FF" />{t('cards.alim.name')}
        </Link>
        {warnings.length > 0 && <StatusChip st="warn" />}
      </div>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {stats.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-0.5">
            <dt className="text-sm text-vn-muted">{t(`food.counter.${k}`)}</dt>
            <dd className="text-[30px] font-semibold leading-none tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      {warnings.length > 0 && <ul><Notice w={warnings[warnings.length - 1]} /></ul>}
    </Card>
  );
}
