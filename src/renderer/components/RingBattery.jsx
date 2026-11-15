import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useUser } from '../lib/user.jsx';
import { useT } from '../i18n/index.jsx';
import { RING } from '../data/capitao.js';
import { ringState } from '../../shared/rules/ring.js';

/** Bateria do smartring no topo. Abaixo de 20% o anel está carregando: fica âmbar, com ícone e texto, e leva à sincronização. */
export default function RingBattery() {
  const { t } = useT();
  const { me } = useUser();
  const battery = RING[me.key]?.battery;
  if (battery == null) return null;
  const low = ringState(battery) === 'charging';
  const label = t(low ? 'topbar.ring.low' : 'topbar.ring.ok', { n: battery });
  const color = low ? '#FFC24B' : '#46D39A';
  return (
    <Link
      to="/sincronizar"
      aria-label={label}
      title={label}
      className={'flex h-10 items-center gap-2 rounded-sm border bg-vn-surface px-3 text-[15px] font-semibold tabular-nums hover:border-vn-accent ' + (low ? 'border-[rgba(255,194,75,0.6)]' : 'border-vn-line2')}
    >
      <Icon name="battery" size={20} color={color} />
      <span style={{ color }}>{battery}%</span>
    </Link>
  );
}
