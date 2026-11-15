import { Link, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import Icon from '../components/Icon.jsx';
import LegalFooter from '../components/LegalFooter.jsx';
import { TEAM } from '../data/crew.js';
import { useCrew } from '../lib/crew.js';
import { useT } from '../i18n/index.jsx';
import patch from '../assets/patch-zagaia.png';

const SEX = { f: { icon: 'female', col: '#FF8FC7' }, m: { icon: 'male', col: '#62C3FF' } };

function CrewCard({ p, onPick }) {
  const { t } = useT();
  const sx = SEX[p.sex];
  const sexLabel = t(`crew.sex.${p.sex}`);
  const aria = [p.name, p.role, p.captain && t('crew.captainLabel'), sexLabel].filter(Boolean).join(', ');
  return (
    <button
      type="button"
      onClick={onPick}
      aria-label={aria}
      className={'relative flex min-w-[150px] flex-[1_1_170px] flex-col overflow-hidden rounded-sm border bg-[#071426] text-left text-vn-text hover:border-vn-accent ' + (p.captain ? 'max-w-[230px] border-vn-gold' : 'max-w-[210px] border-vn-line')}
    >
      <div className="relative w-full" style={{ background: 'radial-gradient(ellipse at 50% 38%,#12355E 0%,#0A2142 55%,#071426 100%)' }}>
        <img src={p.photo} alt="" className="block aspect-[3/4] w-full object-contain object-bottom" />
        {p.captain && (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-sm bg-vn-gold px-2 py-1 text-[11px] font-semibold tracking-[.12em] text-vn-ink">
            <Icon name="star" size={13} color="#04162B" stroke={2.2} /> {t('crew.captain')}
          </span>
        )}
      </div>
      <span className="flex w-full flex-1 items-stretch justify-between gap-2 p-3.5">
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-lg font-semibold leading-tight">{p.name}</span>
          <span className="text-[15px] text-vn-muted">{p.role}</span>
        </span>
        <Icon name={sx.icon} size={20} color={sx.col} stroke={2.2} className="self-end" label={sexLabel} />
      </span>
    </button>
  );
}

export default function Tripulantes() {
  const { t } = useT();
  const crew = useCrew();
  const nav = useNavigate();
  // capitão no meio
  const others = crew.filter((c) => !c.captain);
  const mid = Math.floor(others.length / 2);
  const ordered = [...others.slice(0, mid), ...crew.filter((c) => c.captain), ...others.slice(mid)];
  return (
    <div className="flex min-h-screen flex-col bg-vn-deep text-vn-text">
      <Brand />
      <main className="flex flex-1 justify-center px-8 pb-16 pt-12">
        <div className="flex w-full max-w-[1100px] flex-col gap-7">
          <Link to="/" className="mono-label inline-flex min-h-[44px] w-fit items-center gap-2">
            <Icon name="chevron" size={22} style={{ transform: 'rotate(180deg)' }} /> {t('pickCrew.switchTeam')}
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <h1 className="text-[15px] font-medium uppercase tracking-[.14em]">{t('pickCrew.who')}</h1>
            <div className="flex items-center gap-3.5 rounded-sm border border-vn-line px-4 py-2.5">
              <img src={patch} width="48" height="46" alt="" className="object-contain" />
              <span className="flex flex-col">
                <span className="mono-label text-[11px] text-vn-subtle">{t('pickCrew.team')}</span>
                <span className="text-lg font-semibold">{TEAM.name}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-[18px]">
            {ordered.map((p) => (
              <CrewCard key={p.key} p={p} onPick={() => nav(`/login/${p.key}`)} />
            ))}
          </div>
        </div>
      </main>
      <LegalFooter />
    </div>
  );
}
