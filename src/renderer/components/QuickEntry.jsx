import { useState } from 'react';
import { SparkBarChart } from '@tremor/react';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';
import { StatusChip } from './Status.jsx';
import { useUser } from '../lib/user.jsx';
import { createMeasure, saveMeasure, useMeasures } from '../lib/medidas.js';
import { useT } from '../i18n/index.jsx';
import { EQUIPMENT } from '../data/equipamentos.js';
import { DEVICES, LIMITS, assess, trend, validateMeasure } from '../../shared/rules/measures.js';
import { toDateStr } from '../../shared/rules/training.js';

export const STATUS_OF = { normal: 'ok', warning: 'warn', critical: 'crit' };
export const UNIT = { pa: 'mmHg', gl: 'mg/dL', kg: 'kg' };
const inputCls = 'min-h-[52px] w-full rounded-sm border bg-vn-field px-3.5 text-xl tabular-nums text-vn-text';

/** Nome da medida no idioma atual (pressão, glicose em jejum ou peso corporal). */
export const kindName = (t, kind) => (kind === 'kg' ? t('cards.kg.name') : t(`ind.${kind}.name`));

/** Valor de uma medida como texto ("118/76", "94" ou "74,2"). */
export function valueText(kind, value, num) {
  if (kind === 'pa') return `${value.sys}/${value.dia}`;
  if (kind === 'gl') return String(value.mgdl);
  return num(value.kg, 1);
}

/** Aparelho: nome próprio de equipamentos.js ou "outro". */
export function deviceName(t, kind, id) {
  const gear = (EQUIPMENT[kind] || []).find((g) => g.id === id);
  return gear ? gear.name : t('measure.deviceOther');
}

function Feedback({ kind, result, onClose }) {
  const { t, num } = useT();
  const { assess: a, trend: tr } = result;
  const filled = tr.filter((d) => d.value != null);
  const series = tr.map((d, i) => ({ i, v: d.value == null ? 0 : kind === 'pa' ? d.value.sys : d.value }));
  const avgText = a.avg ? valueText(kind, a.avg, num) : '';
  return (
    <div className="flex flex-col gap-3.5" role="status" aria-live="polite">
      <div className="flex items-center gap-2.5 text-lg font-semibold text-vn-ok"><Icon name="checkc" size={22} color="#46D39A" />{t('measure.saved')}</div>
      {a.status && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-vn-muted">{t('measure.state')}</span>
          <StatusChip st={STATUS_OF[a.status]} size={15} />
        </div>
      )}
      <p className="text-[17px]">{a.avg.count === 1 ? `${t('measure.lastReg')}: ${avgText} ${UNIT[kind]}` : t('measure.avg', { n: a.avg.count, value: `${avgText} ${UNIT[kind]}` })}</p>
      {kind === 'kg' && (a.pct == null || a.avg.count < 1
        ? <p className="text-[15px] text-vn-muted">{t('measure.massNoBase')}</p>
        : <p className="text-[15px] text-vn-muted">{t('measure.massDelta', { pct: num(a.pct, 1) })}</p>)}
      <div className="flex flex-col gap-1.5">
        <span className="text-sm text-vn-subtle">{t('measure.trend')}</span>
        {filled.length >= 2 ? (
          <div className="relative h-16 border border-vn-line bg-vn-field" role="img" aria-label={filled.map((d) => (kind === 'pa' ? `${d.value.sys}/${d.value.dia}` : num(d.value, kind === 'kg' ? 1 : 0))).join(', ')}>
            <SparkBarChart data={series} index="i" categories={['v']} colors={['sky']} minValue={0} className="absolute inset-0 h-full w-full px-2" />
          </div>
        ) : <p className="text-[15px] text-vn-muted">{t('measure.noTrend')}</p>}
      </div>
      {a.status === 'critical' && <p className="rounded-sm border border-[rgba(255,123,123,0.55)] bg-[rgba(255,123,123,0.16)] px-3.5 py-2.5 text-[15px]">{t('measure.critical')}</p>}
      <button type="button" className="btn-p w-fit" onClick={onClose}>{t('mission.close')}</button>
    </div>
  );
}

/** Registro rápido de pressão, glicose ou massa: um campo (dois na pressão), com retorno logo após salvar. */
export default function QuickEntry({ kind, onClose }) {
  const { t } = useT();
  const { me } = useUser();
  const { measures, reload } = useMeasures(me.key);
  const [sys, setSys] = useState('');
  const [dia, setDia] = useState('');
  const [val, setVal] = useState('');
  const [device, setDevice] = useState('other');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const range = (k) => t('measure.err.range', { min: LIMITS[k][0], max: LIMITS[k][1] });
  const messageFor = (errors) => {
    if (errors.includes('sysDia')) return t('measure.err.sysdia');
    const k = ['sys', 'dia', 'gl', 'kg'].find((e) => errors.includes(e));
    return k ? range(k) : t('measure.err.required');
  };

  const submit = async (e) => {
    e.preventDefault();
    const empty = kind === 'pa' ? sys.trim() === '' || dia.trim() === '' : val.trim() === '';
    if (empty) { setError(t('measure.err.required')); return; }
    const value = kind === 'pa' ? { sys: Number(sys), dia: Number(dia) } : kind === 'gl' ? { mgdl: Number(val) } : { kg: Number(val.replace(',', '.')) };
    const measure = createMeasure({ crew: me.key, kind, value, device, source: 'manual', note: note.trim() });
    const v = validateMeasure(measure);
    if (!v.valid) { setError(messageFor(v.errors)); return; }
    const res = await saveMeasure(measure);
    if (!res?.success) { setError(messageFor(res?.errors || [])); return; }
    const all = [...measures, measure];
    setResult({ assess: assess(all, kind), trend: trend(all, kind, 7, toDateStr()) });
    reload();
  };

  const field = (id, label, value, set, extra) => (
    <div>
      <label htmlFor={id} className="mono-label mb-1.5 block text-vn-subtle">{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step={extra.step}
        min={extra.min}
        max={extra.max}
        value={value}
        onChange={(e) => { set(e.target.value); setError(''); }}
        aria-invalid={!!error}
        aria-describedby="qe-msg"
        className={inputCls + (error ? ' border-vn-crit' : ' border-vn-line2')}
      />
    </div>
  );

  return (
    <Modal eyebrow={t('measure.open')} title={t('measure.title', { name: kindName(t, kind) })} onClose={onClose} width={520}>
      {result ? (
        <Feedback kind={kind} result={result} onClose={onClose} />
      ) : (
        <form onSubmit={submit} noValidate className="flex flex-col gap-4">
          {kind === 'pa' && (
            <div className="grid grid-cols-2 gap-3">
              {field('qe-sys', t('measure.field.sys'), sys, setSys, { step: 1, min: LIMITS.sys[0], max: LIMITS.sys[1] })}
              {field('qe-dia', t('measure.field.dia'), dia, setDia, { step: 1, min: LIMITS.dia[0], max: LIMITS.dia[1] })}
            </div>
          )}
          {kind === 'gl' && field('qe-val', t('measure.field.gl'), val, setVal, { step: 1, min: LIMITS.gl[0], max: LIMITS.gl[1] })}
          {kind === 'kg' && field('qe-val', t('measure.field.kg'), val, setVal, { step: 0.1, min: LIMITS.kg[0], max: LIMITS.kg[1] })}
          <div>
            <label htmlFor="qe-dev" className="mono-label mb-1.5 block text-vn-subtle">{t('measure.field.device')}</label>
            <select id="qe-dev" value={device} onChange={(e) => setDevice(e.target.value)} className="min-h-[44px] w-full rounded-sm border border-vn-line2 bg-vn-field px-3 text-base text-vn-text [color-scheme:dark]">
              {DEVICES[kind].map((d) => <option key={d} value={d}>{deviceName(t, kind, d)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="qe-note" className="mono-label mb-1.5 block text-vn-subtle">{t('measure.field.note')}</label>
            <input id="qe-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={120} className="min-h-[44px] w-full rounded-sm border border-vn-line2 bg-vn-field px-3 text-base text-vn-text" />
          </div>
          <p id="qe-msg" role={error ? 'alert' : undefined} className={'min-h-[22px] text-sm ' + (error ? 'text-vn-crit' : 'text-vn-subtle')}>{error || t('measure.hint')}</p>
          <button type="submit" className="btn-p w-fit">{t('measure.save')}</button>
        </form>
      )}
    </Modal>
  );
}

/** Botão "Registrar" de uma medida: abre o registro rápido. */
export function RegisterButton({ kind, compact = false, defaultOpen = false, className = '' }) {
  const { t } = useT();
  const [open, setOpen] = useState(defaultOpen);
  const name = kindName(t, kind);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${t('measure.open')}: ${name}`}
        title={`${t('measure.open')}: ${name}`}
        onClick={() => setOpen(true)}
        className={(compact ? 'inline-flex min-h-[32px] items-center gap-1.5 rounded-sm border border-vn-line2 px-2.5 text-sm font-semibold text-vn-text hover:border-vn-accent ' : 'btn-s ') + className}
      >
        <Icon name="plus" size={compact ? 15 : 17} stroke={2.2} />{t('measure.open')}
      </button>
      {open && <QuickEntry kind={kind} onClose={() => setOpen(false)} />}
    </>
  );
}
