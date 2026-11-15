import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { TEAM } from '../data/crew.js';
import { useCrew } from '../lib/crew.js';
import { useT } from '../i18n/index.jsx';
import patch from '../assets/patch-zagaia.png';

const SEX_ICON = { f: { icon: 'female', col: '#FF8FC7' }, m: { icon: 'male', col: '#62C3FF' } };

export default function MissionDialog({ onClose }) {
  const { t } = useT();
  const crew = useCrew();
  const closeRef = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (opener && opener.focus) opener.focus();
    };
  }, [onClose]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-[rgba(2,9,18,0.82)] p-6">
      <div role="dialog" aria-modal="true" aria-labelledby="mis-t" onClick={(e) => e.stopPropagation()} className="flex max-h-full w-[min(720px,100%)] flex-col overflow-hidden rounded-sm border border-vn-line2 bg-vn-bg">
        <div className="flex items-center justify-between gap-3 border-b border-vn-line px-5 py-3.5">
          <span className="text-xs font-semibold tracking-[.12em] text-vn-accent">{t('mission.label')}</span>
          <button ref={closeRef} type="button" aria-label={t('mission.close')} onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-sm border border-vn-line2">
            <Icon name="x" size={18} color="#A9BDD2" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-6 px-6 pb-1 pt-4">
          <img src={patch} width="96" height="92" alt={t('mission.patchAlt', { name: TEAM.name, org: TEAM.org, label: TEAM.patchLabel })} className="flex-none object-contain" />
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-2">
            <h2 id="mis-t" className="text-3xl font-bold leading-none">Vento Norte Health</h2>
            <p className="text-base text-vn-muted">{t('mission.tagline')}</p>
          </div>
        </div>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-7 px-6 pb-1 pt-2">
          <dt className="border-b border-vn-line py-2 text-vn-subtle">{t('mission.facts.team')}</dt>
          <dd className="border-b border-vn-line py-2">
            <div>{TEAM.org}</div>
            <div className="mt-0.5 text-[15px] text-vn-muted">{t('mission.teamDesc')}</div>
          </dd>
          <dt className="border-b border-vn-line py-2 text-vn-subtle">{t('mission.facts.challenge')}</dt>
          <dd className="border-b border-vn-line py-2">{TEAM.name} · {t('mission.challengeValue')}</dd>
          <dt className="border-b border-vn-line py-2 text-vn-subtle">{t('mission.facts.missionId')}</dt>
          <dd className="border-b border-vn-line py-2">{t('mission.missionIdValue', { day: TEAM.day })}</dd>
        </dl>
        <div className="px-6 pb-4 pt-2">
          <div className="pb-2.5 text-xs font-semibold tracking-[.12em] text-vn-subtle">{t('mission.facts.crew').toUpperCase()}</div>
          <ul className="grid grid-cols-2 gap-x-6 border-t border-vn-line">
            {crew.map((c) => {
              const sx = SEX_ICON[c.sex];
              return (
                <li key={c.key} className="flex items-center gap-2 border-b border-vn-line py-2">
                  <Icon name={sx.icon} size={19} color={sx.col} stroke={2.2} label={t(`crew.sex.${c.sex}`)} />
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-vn-muted">· {c.role}</span>
                  {c.captain && <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-vn-gold"><Icon name="star" size={12} color="#FFC24B" stroke={2.2} />{t('crew.captain')}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
