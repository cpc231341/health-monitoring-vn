import GravityStation from './GravityStation.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import LinkStatus from './LinkStatus.jsx';
import MissionClock from './MissionClock.jsx';
import Notifications from './Notifications.jsx';
import RingBattery from './RingBattery.jsx';

/** Barra fixa no topo das telas internas: relógio da missão, ambiente, conexão com a Terra, bateria do anel, idioma e avisos. */
export default function TopBar() {
  return (
    <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-vn-line bg-vn-bg px-8 py-2.5">
      <MissionClock />
      <div className="flex items-center gap-2.5">
        <GravityStation />
        <LinkStatus />
        <RingBattery />
        <LanguageSwitcher />
        <Notifications />
      </div>
    </div>
  );
}
