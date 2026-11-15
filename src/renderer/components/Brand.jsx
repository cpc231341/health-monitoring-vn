import LanguageSwitcher from './LanguageSwitcher.jsx';
import MissionClock from './MissionClock.jsx';
import { useT } from '../i18n/index.jsx';
import logo from '../assets/vento-norte-logo.png';

/** Cabeçalho enxuto das telas de entrada. */
export default function Brand() {
  const { t } = useT();
  return (
    <header className="flex h-[72px] items-center gap-3.5 px-6">
      <img src={logo} width="40" height="40" alt={t('brand.logoAlt')} className="rounded-full" />
      <span className="text-xl uppercase tracking-[.14em]">Vento Norte Health</span>
      <div className="ml-auto flex items-center gap-5">
        <MissionClock compact />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
