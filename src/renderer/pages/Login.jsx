import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import Icon from '../components/Icon.jsx';
import LegalFooter from '../components/LegalFooter.jsx';
import { CREW } from '../data/crew.js';
import { useUser } from '../lib/user.jsx';
import { useCrew } from '../lib/crew.js';
import { useT } from '../i18n/index.jsx';

// Login simulado do protótipo: a senha só precisa estar preenchida.
export default function Login() {
  const { key } = useParams();
  const { t } = useT();
  const { signIn } = useUser();
  const crew = useCrew();
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const person = crew.find((c) => c.key === key);
  if (!person || !CREW.some((c) => c.key === key)) return <Navigate to="/tripulantes" replace />;

  const submit = (e) => {
    e.preventDefault();
    if (!password.trim()) { setError(true); return; }
    signIn(person.key);
    nav('/sincronizar');
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-vn-deep text-vn-text">
      <Brand />
      <main className="flex min-h-0 flex-1 items-center justify-center px-8">
        <div className="flex w-full max-w-[900px] flex-wrap items-center justify-center gap-x-12 gap-y-4">
          <div className="flex w-[320px] flex-col gap-3">
          <Link to="/tripulantes" className="mono-label inline-flex min-h-[44px] w-fit items-center gap-2">
            <Icon name="chevron" size={22} style={{ transform: 'rotate(180deg)' }} /> {t('login.back')}
          </Link>
          <div className="overflow-hidden rounded-sm border border-vn-line bg-[#071426]">
            <div style={{ background: 'radial-gradient(ellipse at 50% 38%,#12355E 0%,#0A2142 55%,#071426 100%)' }}>
              <img src={person.photo} alt="" className="mx-auto block h-[min(300px,36vh)] w-auto object-contain object-bottom" />
            </div>
            <div className="flex flex-col gap-0.5 p-4">
              <span className="text-xl font-semibold leading-tight">{person.name}</span>
              <span className="text-[15px] text-vn-muted">{person.role}</span>
            </div>
          </div>
          </div>
          <form onSubmit={submit} noValidate className="flex w-[340px] flex-col gap-3.5">
            <h1 className="text-[15px] font-medium uppercase tracking-[.14em]">{t('login.as', { name: person.first })}</h1>
            <div>
              <label htmlFor="pw" className="mono-label mb-2 block text-vn-subtle">{t('login.password')}</label>
              <input
                id="pw"
                type="password"
                                autoComplete="off"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                aria-invalid={error}
                aria-describedby="pw-h"
                className={'min-h-[52px] w-full rounded-sm border bg-vn-field px-4 text-lg text-vn-text ' + (error ? 'border-vn-crit' : 'border-vn-line2')}
              />
              <p id="pw-h" role={error ? 'alert' : undefined} className="mt-2 min-h-[20px] text-sm text-vn-crit">{error ? t('login.error') : ''}</p>
            </div>
            <button type="submit" className="btn-p">{t('login.title')}</button>
          </form>
        </div>
      </main>
      <LegalFooter />
    </div>
  );
}
