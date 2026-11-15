import { Link } from 'react-router-dom';
import Shell, { PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import { TEAM } from '../data/crew.js';
import { useT } from '../i18n/index.jsx';

// Telas ainda não construídas: mantêm a navegação funcionando.
// Título e descrição ficam em i18n: soon.pages.<id>.
const ICONS = {
  medir: 'gauge',
  comandante: 'shield'
};

export default function EmBreve({ id }) {
  const { t } = useT();
  return (
    <Shell header={<PageHeader title={t(`soon.pages.${id}.title`)} sub={t('soon.sub', { name: TEAM.name })} />}>
      <div className="flex flex-1 items-center justify-center px-8 py-12">
        <div className="flex max-w-[520px] flex-col items-start gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-sm border border-vn-line2">
            <Icon name={ICONS[id]} size={26} color="#62C3FF" />
          </span>
          <h2 className="text-[26px] font-semibold">{t('soon.heading')}</h2>
          <p className="text-[17px] text-vn-muted">{t(`soon.pages.${id}.desc`)}</p>
          <Link to="/hoje" className="btn-p">{t('soon.back')}</Link>
        </div>
      </div>
    </Shell>
  );
}
