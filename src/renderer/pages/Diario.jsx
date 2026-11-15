import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Shell, { Card, PageHeader } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import Modal from '../components/Modal.jsx';
import FoodLog from '../components/FoodLog.jsx';
import { useUser } from '../lib/user.jsx';
import { useDemo } from '../lib/demo.jsx';
import { useMissionClock } from '../lib/clock.jsx';
import { classify, STATUS } from '../lib/status.js';
import { useT } from '../i18n/index.jsx';
import { moodLogKey } from '../lib/conquistas.js';
import { toDateStr } from '../../shared/rules/training.js';
import { SCENARIOS } from '../data/hoje.js';
import { TEAM } from '../data/crew.js';
import face1 from '../assets/mood/mood-1.png';
import face2 from '../assets/mood/mood-2.png';
import face3 from '../assets/mood/mood-3.png';
import face4 from '../assets/mood/mood-4.png';
import face5 from '../assets/mood/mood-5.png';

const FACES = { 1: face1, 2: face2, 3: face3, 4: face4, 5: face5 };
const SCALE = [1, 2, 3, 4, 5];

function load(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* sem armazenamento */ }
}

// O diário é privado: fica só neste computador, separado por tripulante.
export default function Diario() {
  const { t } = useT();
  const { me } = useUser();
  const { scen } = useDemo();
  const { day, time } = useMissionClock();
  const moodKey = `vn.mood.${me.key}`;
  const diaryKey = `vn.diary.${me.key}`;
  const [mood, setMood] = useState(() => load(moodKey, null));
  const [entries, setEntries] = useState(() => load(diaryKey, []));
  const [text, setText] = useState('');
  const [sensitive, setSensitive] = useState(false);
  const [shown, setShown] = useState([]);
  const [showPrivate, setShowPrivate] = useState(false);
  const [params, setParams] = useSearchParams();
  const tab = params.get('aba') === 'alimentacao' ? 'alimentacao' : 'humor';
  const setTab = (aba) => setParams(aba === 'humor' ? {} : { aba });

  // O humor também entra num registro por data (só neste computador), que alimenta as Conquistas.
  const pick = (n) => {
    setMood(n);
    save(moodKey, n);
    save(moodLogKey(me.key), { ...load(moodLogKey(me.key), {}), [toDateStr()]: n });
  };
  const add = (e) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    const next = [{ id: Date.now(), day, time, mood, text: body, sensitive }, ...entries];
    setEntries(next);
    save(diaryKey, next);
    setText('');
    setSensitive(false);
  };
  const remove = (id) => {
    const next = entries.filter((x) => x.id !== id);
    setEntries(next);
    save(diaryKey, next);
  };
  const toggle = (id) => setShown((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  // últimos 7 dias: seis do cenário da demonstração e o de hoje (o escolhido aqui, se houver)
  const week = SCENARIOS[scen].hu.map((v, i, a) => (i === a.length - 1 && mood ? mood : v));
  const lowDays = week.filter((v) => classify('hu', v) !== 'ok').length;

  const header = (
    <PageHeader
      title={t('nav.diary')}
      sub={t('diary.sub')}
      right={<button type="button" aria-haspopup="dialog" onClick={() => setShowPrivate(true)} className="inline-flex items-center gap-2 rounded-sm border border-vn-line2 px-3.5 py-2 text-[15px] hover:border-vn-accent"><Icon name="lock" size={18} color="#62C3FF" />{t('diary.private')}</button>}
    />
  );

  return (
    <Shell header={header}>
      <div role="tablist" aria-label={t('diary.tabsAria')} className="flex gap-1 border-b border-vn-line px-8 pt-3">
        {[['humor', t('diary.tabMood')], ['alimentacao', t('food.tab')]].map(([k, label]) => (
          <button
            key={k}
            id={`tab-${k}`}
            type="button"
            role="tab"
            aria-selected={tab === k}
            aria-controls={`panel-${k}`}
            onClick={() => setTab(k)}
            className={'min-h-[44px] rounded-t-sm border-b-[3px] px-5 text-[17px] font-semibold ' + (tab === k ? 'border-vn-accent text-vn-text' : 'border-transparent text-vn-muted hover:text-vn-text')}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === 'alimentacao' && (
        <div id="panel-alimentacao" role="tabpanel" aria-labelledby="tab-alimentacao" className="px-8 pb-12 pt-6">
          <FoodLog />
        </div>
      )}
      <div id="panel-humor" role="tabpanel" aria-labelledby="tab-humor" className={tab === 'humor' ? 'flex flex-col gap-5 px-8 pb-12 pt-6' : 'hidden'}>
        <div className="flex flex-wrap items-stretch gap-5">
          <Card className="flex min-w-0 flex-[3_1_460px] flex-col gap-4 px-[22px] py-5">
            <section aria-labelledby="dm" className="flex flex-col gap-4">
              <div>
                <h2 id="dm" className="text-[26px] font-semibold leading-tight">{t('diary.moodTitle')}</h2>
                <p className="mt-0.5 text-[15px] text-vn-muted">{t('diary.moodHint')}</p>
              </div>
              <div role="group" aria-label={t('diary.moodTitle')} className="grid grid-cols-5 gap-2.5">
                {SCALE.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={mood === n}
                    onClick={() => pick(n)}
                    className={'flex flex-col items-center gap-1.5 rounded-sm border px-1 pb-2.5 pt-2 hover:border-vn-accent ' + (mood === n ? 'border-vn-accent bg-vn-surface2' : 'border-vn-line bg-vn-field')}
                  >
                    <img src={FACES[n]} alt="" className="h-[68px] w-auto object-contain" />
                    <span className="text-lg font-semibold leading-none">{n}</span>
                    <span className="text-center text-[13px] leading-tight text-vn-muted">{t(`diary.mood.${n}`)}</span>
                  </button>
                ))}
              </div>
              <div role="status" aria-live="polite" className="min-h-[22px] text-[15px] text-vn-accent">{mood ? t('diary.savedMood', { label: t(`diary.mood.${mood}`) }) : ''}</div>
            </section>
          </Card>

          <Card className="flex min-w-0 flex-[2_1_340px] flex-col gap-3.5 px-[22px] py-5">
            <section aria-labelledby="dw" className="flex flex-col gap-3.5">
              <h2 id="dw" className="text-[26px] font-semibold leading-tight">{t('diary.weekTitle')}</h2>
              <ul className="grid grid-cols-7 gap-1.5">
                {week.map((v, i) => {
                  const st = classify('hu', v);
                  const low = st !== 'ok';
                  return (
                    <li
                      key={i}
                      className={'flex flex-col items-center gap-1 rounded-sm border px-0.5 py-1.5 ' + (low ? '' : 'border-transparent opacity-75')}
                      style={low ? { borderColor: STATUS[st].bd, background: STATUS[st].bg } : undefined}
                    >
                      <img src={FACES[v]} alt="" className="h-9 w-auto object-contain" />
                      <span className="text-[11px] text-vn-muted">{TEAM.day - 6 + i}</span>
                      <span className="sr-only">{t('time.day', { n: TEAM.day - 6 + i })}: {t(`diary.mood.${v}`)}, {t(`status.${st}`)}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-sm text-vn-subtle">{lowDays > 0 ? t('diary.weekAlert') : t('diary.weekOk')}</p>
            </section>
          </Card>
        </div>

        <Card className="flex flex-col gap-4 px-[22px] py-5">
          <section aria-labelledby="dn" className="flex flex-col gap-4">
            <h2 id="dn" className="text-[26px] font-semibold leading-tight">{t('diary.noteTitle')}</h2>
            <form onSubmit={add} className="flex flex-col gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                aria-label={t('diary.noteTitle')}
                placeholder={t('diary.notePlaceholder')}
                className="w-full resize-y rounded-sm border border-vn-line2 bg-vn-field p-3 text-base text-vn-text placeholder:text-vn-subtle"
              />
              <label className="flex items-start gap-2.5 text-[15px]">
                <input type="checkbox" checked={sensitive} onChange={(e) => setSensitive(e.target.checked)} className="mt-1 h-4 w-4 accent-[#62C3FF]" />
                <span>
                  {t('diary.sensitive')}
                  <span className="block text-sm text-vn-subtle">{t('diary.sensitiveHint')}</span>
                </span>
              </label>
              <button type="submit" disabled={!text.trim()} className="btn-p w-fit disabled:cursor-not-allowed disabled:opacity-50">{t('diary.save')}</button>
            </form>

            <div className="border-t border-vn-line pt-4">
              <h3 className="mb-2 text-lg font-semibold">{t('diary.entriesTitle')}</h3>
              {entries.length === 0 && <p className="text-[15px] text-vn-muted">{t('diary.empty')}</p>}
              <ul className="flex flex-col gap-2.5">
                {entries.map((en) => {
                  const open = !en.sensitive || shown.includes(en.id);
                  return (
                    <li key={en.id} className="flex items-start gap-3 rounded-sm border border-vn-line bg-vn-field px-3.5 py-3">
                      {en.mood && <img src={FACES[en.mood]} alt={t(`diary.mood.${en.mood}`)} className="h-10 w-auto flex-none object-contain" />}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-vn-muted">
                          <span>{t('time.dayHour', { n: en.day, time: en.time })}</span>
                          {en.sensitive && <span className="inline-flex items-center gap-1 rounded-sm border border-vn-warn px-1.5 py-px text-xs font-semibold text-vn-warn"><Icon name="lock" size={12} color="#FFC24B" />{t('diary.sensitiveTag')}</span>}
                        </div>
                        {open
                          ? <p className="mt-1 whitespace-pre-wrap break-words text-[16px]">{en.text}</p>
                          : <p className="mt-1 select-none text-[16px] tracking-[.3em] text-vn-subtle" aria-label={t('diary.masked')}>••••••••••••</p>}
                      </div>
                      <div className="flex flex-none gap-1.5">
                        {en.sensitive && (
                          <button type="button" aria-pressed={open} aria-label={open ? t('diary.hide') : t('diary.show')} title={open ? t('diary.hide') : t('diary.show')} onClick={() => toggle(en.id)} className="flex h-9 w-9 items-center justify-center rounded-sm border border-vn-line2">
                            <Icon name={open ? 'eyeoff' : 'eye'} size={18} />
                          </button>
                        )}
                        <button type="button" aria-label={t('diary.remove')} title={t('diary.remove')} onClick={() => remove(en.id)} className="flex h-9 w-9 items-center justify-center rounded-sm border border-vn-line2">
                          <Icon name="x" size={17} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Card>
      </div>
      {showPrivate && (
        <Modal eyebrow={t('nav.diary')} title={t('diary.private')} onClose={() => setShowPrivate(false)} width={480}>
          <p className="text-[17px]">{t('diary.privateInfo')}</p>
        </Modal>
      )}
    </Shell>
  );
}
