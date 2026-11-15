import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';
import Avatar from './Avatar.jsx';
import { useUser } from '../lib/user.jsx';
import { useT } from '../i18n/index.jsx';
import { TEAM } from '../data/crew.js';
import logo from '../assets/vento-norte-logo.png';
import patch from '../assets/patch-zagaia.png';

// [chave do texto, rota, ícone]
const NAV_MAIN = [
  ['today', '/hoje', 'home'],
  ['agenda', '/agenda', 'list'],
  ['indicators', '/indicadores', 'activity'],
  ['recommendation', '/recomendacao', 'clipboard'],
  ['measure', '/medir', 'gauge'],
  ['diary', '/diario', 'book'],
  ['routine', '/rotina', 'calendar'],
  ['achievements', '/conquistas', 'trophy']
];
const NAV_TEAM = [
  ['commander', '/comandante', 'shield', true],
  ['crewPanel', '/tripulacao', 'users']
];

function Item({ label, to, icon, collapsed }) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
      className={({ isActive }) =>
        'flex min-h-[clamp(36px,5vh,44px)] items-center rounded-sm py-1 text-base ' +
        (collapsed ? 'justify-center px-0 ' : 'gap-3 px-3 ') +
        (isActive ? 'bg-vn-surface2 font-semibold text-vn-text' : 'text-vn-muted hover:bg-vn-surface hover:text-vn-text')
      }
    >
      {({ isActive }) => (
        <>
          <Icon name={icon} color={isActive ? '#62C3FF' : 'currentColor'} />
          {!collapsed && <span>{label}</span>}
        </>
      )}
    </NavLink>
  );
}

function readCollapsed() {
  try { return localStorage.getItem('vn.sidebar') === '1'; } catch (e) { return false; }
}

export default function Sidebar({ onMission }) {
  const { me } = useUser();
  const { t } = useT();
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem('vn.sidebar', next ? '1' : '0'); } catch (e) { /* sem armazenamento */ }
  };
  const toggleLabel = collapsed ? t('nav.expand') : t('nav.collapse');
  return (
    <nav aria-label={t('nav.aria')} className={'flex-none border-r border-vn-line bg-vn-side ' + (collapsed ? 'w-[76px]' : 'w-[268px]')}>
      <div className={'no-scrollbar sticky top-0 flex h-screen flex-col gap-[clamp(8px,1.8vh,20px)] overflow-y-auto py-[clamp(8px,2vh,20px)] ' + (collapsed ? 'px-2.5' : 'px-4')}>
        <div className={'flex items-center ' + (collapsed ? 'flex-col gap-3' : 'gap-3')}>
          <img src={logo} width="44" height="44" alt={t('brand.logoAlt')} className="flex-none rounded-full" />
          {!collapsed && (
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[21px] font-bold leading-none">Vento Norte Health</span>
              <span className="text-[13px] text-vn-subtle">{t('brand.byline')}</span>
            </span>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-expanded={!collapsed}
            aria-label={toggleLabel}
            title={toggleLabel}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-sm border border-vn-line2 hover:border-vn-accent"
          >
            <Icon name="panelleft" size={19} color="#A9BDD2" />
          </button>
        </div>

        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={t('nav.missionOpen')}
          title={collapsed ? TEAM.name : undefined}
          onClick={onMission}
          className={'flex w-full items-center rounded-sm border border-vn-line bg-vn-surface text-left hover:border-vn-accent ' + (collapsed ? 'justify-center p-2' : 'gap-3 p-3')}
        >
          <img src={patch} width="50" height="48" alt={t('nav.patchAlt', { name: TEAM.name })} className={'flex-none object-contain ' + (collapsed ? 'h-9 w-9' : '')} />
          {!collapsed && (
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-vn-subtle">{t('mission.facts.challenge')}</span>
              <span className="font-semibold">{TEAM.name}</span>
              <span className="text-[13px] text-vn-muted">{t('team.missionId')}</span>
            </span>
          )}
        </button>

        <div className="flex flex-col gap-1">
          {!collapsed && <span className="px-3 pb-1 text-xs uppercase tracking-wider text-vn-subtle">{t('nav.myDay')}</span>}
          {NAV_MAIN.map(([k, to, icon]) => <Item key={to} label={t(`nav.${k}`)} to={to} icon={icon} collapsed={collapsed} />)}
        </div>
        <div className="flex flex-col gap-1">
          {!collapsed && <span className="px-3 pb-1 text-xs uppercase tracking-wider text-vn-subtle">{t('nav.teamSection')}</span>}
          {NAV_TEAM.filter(([, , , captainOnly]) => !captainOnly || me.captain).map(([k, to, icon]) => <Item key={to} label={t(`nav.${k}`)} to={to} icon={icon} collapsed={collapsed} />)}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <NavLink
            to="/tripulantes"
            title={collapsed ? `${me.name}. ${t('nav.switchCrew')}` : t('nav.switchCrew')}
            className={'flex items-center rounded-sm border border-vn-line bg-vn-surface text-vn-text hover:border-vn-accent ' + (collapsed ? 'justify-center p-2' : 'gap-3 p-3')}
          >
            <Avatar person={me} />
            {!collapsed && (
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] font-semibold">{me.name}</span>
                <span className="text-[13px] text-vn-muted">{t(`crew.${me.key}.role`)} · {t('nav.personalView')}</span>
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
