import { Bar, CartesianGrid, Cell, ComposedChart, Line, Area, ReferenceArea, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { STATUS } from '../lib/status.js';
import { useT } from '../i18n/index.jsx';

const AXIS = { stroke: '#1F4469', tick: { fill: '#A9BDD2', fontSize: 13 }, tickLine: false };

function Tip({ active, payload, fmt }) {
  const { t } = useT();
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-sm border border-vn-line2 bg-vn-field px-3 py-2 text-sm text-vn-text shadow-lg">
      <div className="text-vn-muted">{p.when}</div>
      <div className="font-semibold">{fmt(p)}</div>
      <div style={{ color: STATUS[p.st].col }}>{t(`status.${p.st}`)}</div>
    </div>
  );
}

function dot(color, size) {
  return function Dot({ cx, cy, payload, dataKey }) {
    if (cx == null || cy == null) return null;
    const out = dataKey === 'b' ? payload.outB : payload.outA;
    const st = out ? payload.st : 'ok';
    const c = st === 'ok' ? color : STATUS[st].col;
    return <circle key={`${dataKey}-${cx}`} cx={cx} cy={cy} r={st === 'ok' ? size : size + 1.5} fill={c} stroke="#0C2442" strokeWidth={st === 'ok' ? 0 : 1.5} />;
  };
}

/**
 * Gráfico detalhado de um indicador (Recharts, a mesma base dos gráficos do Tremor),
 * com faixa normal sombreada e pontos fora da faixa destacados.
 */
export default function DetailChart({ data, cfg, isBars, dual, xTicks, xLabel, fmt, label, showDots }) {
  const { num } = useT();
  const fmtTick = (v) => num(v, Number.isInteger(v) ? 0 : 1);
  const n = data.length;
  const lastP = data[n - 1];
  return (
    <div role="img" aria-label={label} className="h-[300px] w-full">
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 14, right: 18, bottom: 4, left: 0 }}>
          <CartesianGrid vertical={false} stroke="#1F4469" />
          {cfg.bands.map((b) => (
            <ReferenceArea
              key={b.label}
              y1={b.lo}
              y2={b.hi}
              fill="rgba(70,211,154,0.12)"
              stroke="none"
              ifOverflow="hidden"
              label={{ value: b.label, position: b.tl ? 'insideTopLeft' : 'insideBottomRight', fill: '#46D39A', fontSize: 13 }}
            />
          ))}
          <YAxis {...AXIS} axisLine={false} width={52} domain={[cfg.lo, cfg.hi]} ticks={cfg.ticks} allowDataOverflow tickFormatter={(tick) => (cfg.dec ? fmtTick(tick) : tick)} />
          {isBars ? (
            <XAxis {...AXIS} dataKey="i" type="category" ticks={xTicks} tickFormatter={xLabel} />
          ) : (
            <XAxis {...AXIS} dataKey="i" type="number" domain={[0, n - 1]} ticks={xTicks} tickFormatter={xLabel} />
          )}
          <Tooltip content={<Tip fmt={fmt} />} cursor={{ stroke: '#2F5C8A', fill: 'rgba(98,195,255,0.06)' }} />
          {isBars ? (
            <Bar dataKey="a" radius={[2, 2, 0, 0]} isAnimationActive={false} label={n <= 8 ? { position: 'top', fill: '#A9BDD2', fontSize: 13, formatter: (v) => fmt({ a: v }) } : false}>
              {data.map((p) => <Cell key={p.i} fill={p.st === 'ok' ? '#62C3FF' : STATUS[p.st].col} />)}
            </Bar>
          ) : (
            <>
              {!dual && <Area dataKey="a" type="monotone" stroke="none" fill="#62C3FF" fillOpacity={0.08} isAnimationActive={false} />}
              <Line dataKey="a" type="monotone" stroke="#62C3FF" strokeWidth={2.5} dot={showDots ? dot('#62C3FF', 3.5) : false} activeDot={{ r: 5 }} isAnimationActive={false} />
              {dual && <Line dataKey="b" type="monotone" stroke="#A9BDD2" strokeWidth={2.5} strokeDasharray="7 5" dot={showDots ? dot('#A9BDD2', 3.5) : false} activeDot={{ r: 5 }} isAnimationActive={false} />}
              <ReferenceDot x={lastP.i} y={lastP.a} r={7} fill={STATUS[lastP.st].col} stroke="#0C2442" strokeWidth={3} ifOverflow="visible" />
              {dual && <ReferenceDot x={lastP.i} y={lastP.b} r={7} fill={STATUS[lastP.st].col} stroke="#0C2442" strokeWidth={3} ifOverflow="visible" />}
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
