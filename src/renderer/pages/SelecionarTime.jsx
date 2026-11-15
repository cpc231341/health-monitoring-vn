import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import Icon from '../components/Icon.jsx';
import LegalFooter from '../components/LegalFooter.jsx';
import { CREW, TEAM } from '../data/crew.js';
import { useT } from '../i18n/index.jsx';
import patch from '../assets/patch-zagaia.png';

const inputCls = (bad) => 'min-h-[48px] w-full rounded-sm border bg-vn-field px-3.5 text-base text-vn-text ' + (bad ? 'border-vn-crit' : 'border-vn-line2');

// Criação de missão: nome do time e duração em dias são obrigatórios (o ID é opcional).
function MissionForm({ onCancel, onCreate }) {
  const { t } = useT();
  const [team, setTeam] = useState('');
  const [id, setId] = useState('');
  const [days, setDays] = useState('');
  const [tried, setTried] = useState(false);
  const n = Number(days);
  const daysOk = days.trim() !== '' && Number.isInteger(n) && n > 0;
  const teamOk = team.trim() !== '';

  const submit = (e) => {
    e.preventDefault();
    setTried(true);
    if (!teamOk || !daysOk) return;
    onCreate({ team: team.trim(), id: id.trim() || '02', days: n });
  };

  return (
    <form onSubmit={submit} noValidate aria-labelledby="mf-t" className="flex flex-col gap-4 rounded-sm border border-vn-line2 bg-vn-field p-5">
      <h2 id="mf-t" className="text-xl font-semibold">{t('pickTeam.form.title')}</h2>
      <div>
        <label htmlFor="mf-team" className="mono-label mb-1.5 block text-vn-subtle">{t('pickTeam.form.teamName')} *</label>
        <input id="mf-team" value={team} onChange={(e) => setTeam(e.target.value)} aria-required="true" aria-invalid={tried && !teamOk} className={inputCls(tried && !teamOk)} />
        {tried && !teamOk && <p role="alert" className="mt-1.5 text-sm text-vn-crit">{t('pickTeam.form.required')}</p>}
      </div>
      <div>
        <label htmlFor="mf-id" className="mono-label mb-1.5 block text-vn-subtle">{t('pickTeam.form.missionId')}</label>
        <input id="mf-id" value={id} onChange={(e) => setId(e.target.value)} placeholder="02" className={inputCls(false)} />
      </div>
      <div>
        <label htmlFor="mf-days" className="mono-label mb-1.5 block text-vn-subtle">{t('pickTeam.form.days')} *</label>
        <input
          id="mf-days"
          type="number"
          inputMode="numeric"
          min="1"
          step="1"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          aria-required="true"
          aria-invalid={tried && !daysOk}
          aria-describedby="mf-days-h"
          className={inputCls(tried && !daysOk)}
        />
        <p id="mf-days-h" role={tried && !daysOk ? 'alert' : undefined} className={'mt-1.5 text-sm ' + (tried && !daysOk ? 'text-vn-crit' : 'text-vn-subtle')}>
          {tried && !daysOk ? t('pickTeam.form.daysError') : t('pickTeam.form.daysHint')}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button type="submit" className="btn-p">{t('pickTeam.form.title')}</button>
        <button type="button" className="btn-s" onClick={onCancel}>{t('pickTeam.form.cancel')}</button>
      </div>
    </form>
  );
}

export default function SelecionarTime() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState([]);
  const [msg, setMsg] = useState('');
  const box = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onDown); };
  }, [open]);

  const onCreate = (m) => {
    setCreated((c) => [...c, m]);
    setMsg(t('pickTeam.form.created', { id: m.id, team: m.team, days: m.days }));
    setCreating(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-vn-deep text-vn-text">
      <Brand />
      <main className="flex flex-1 justify-center px-6 pb-16 pt-14">
        <div className="flex w-full max-w-[640px] flex-col gap-7">
          <h1 className="text-[15px] font-medium uppercase tracking-[.14em]">{t('pickTeam.title')}</h1>
          <div className="relative" ref={box}>
            <label id="dd-l" htmlFor="dd" className="mono-label mb-2 block text-vn-subtle">{t('pickTeam.label')}</label>
            <button
              id="dd"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-labelledby="dd-l dd"
              onClick={() => setOpen(!open)}
              className="flex min-h-[76px] w-full items-center gap-4 rounded-sm border border-vn-line2 px-4 py-2.5 text-left hover:border-vn-accent"
            >
              <span className="flex-1 text-lg text-vn-muted">{t('pickTeam.choose')}</span>
              <Icon name="chevron" size={22} color="#A9BDD2" stroke={2} style={{ transform: open ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
            </button>
            {open && (
              <div role="listbox" aria-label={t('pickTeam.listAria')} className="absolute inset-x-0 top-full z-10 mt-2 rounded-sm border border-vn-line2 bg-vn-field p-1 shadow-[0_12px_32px_rgba(0,0,0,.4)]">
                <Link role="option" aria-selected="false" to="/tripulantes" className="flex min-h-[76px] w-full items-center gap-4 rounded-sm border border-transparent px-3 py-2 text-vn-text hover:border-vn-accent hover:text-vn-text">
                  <img src={patch} width="56" height="54" alt="" className="flex-none object-contain" />
                  <span className="flex flex-1 flex-col">
                    <span className="text-lg font-semibold leading-tight">{TEAM.name}</span>
                    <span className="text-[15px] text-vn-muted">{TEAM.org} · {TEAM.patchLabel} · {t('pickTeam.crewCount', { n: CREW.length })}</span>
                  </span>
                </Link>
                {created.map((m) => (
                  <div key={`${m.team}-${m.id}`} role="option" aria-selected="false" aria-disabled="true" className="mt-1 flex min-h-[64px] w-full items-center gap-4 rounded-sm border border-transparent px-3 py-2 opacity-80">
                    <span aria-hidden="true" className="flex h-[54px] w-14 flex-none items-center justify-center rounded-sm border-[1.5px] border-vn-line2"><Icon name="flag" size={22} color="#62C3FF" /></span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-lg font-semibold leading-tight">{m.team}</span>
                      <span className="text-[15px] text-vn-muted">{t('pickTeam.missionLine', { id: m.id, days: m.days })}</span>
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => { setOpen(false); setCreating(true); setMsg(''); }}
                  className="mt-1 flex min-h-[64px] w-full items-center gap-4 rounded-sm border border-transparent px-3 py-2 text-left hover:border-vn-accent"
                >
                  <span aria-hidden="true" className="flex h-[54px] w-14 flex-none items-center justify-center rounded-sm border-[1.5px] border-dashed border-vn-line2">
                    <Icon name="plus" size={24} color="#62C3FF" />
                  </span>
                  <span className="text-xl font-semibold">{t('pickTeam.newTeam')}</span>
                </button>
              </div>
            )}
          </div>
          {creating && <MissionForm onCancel={() => setCreating(false)} onCreate={onCreate} />}
          <div role="status" aria-live="polite" className="min-h-[24px] text-[15px] text-vn-muted">{msg}</div>
        </div>
      </main>
      <LegalFooter />
    </div>
  );
}
