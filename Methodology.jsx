import { C, INIT } from '../constants.js';
import { Panel } from './Primitives.jsx';

const ARCS = [
  { start: 180, end: 240, color: "#ff4560" },
  { start: 240, end: 290, color: "#fb923c" },
  { start: 290, end: 330, color: "#f0a500" },
  { start: 330, end: 360, color: "#00e5a0" },
];

function arcPoint(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function OilGauge({ value }) {
  const base  = INIT.oil;
  const diff  = value - base;
  const pct   = ((diff / base) * 100).toFixed(1);
  const cx = 80, cy = 78, r = 52;

  // Clamp needle angle between $60 and $120
  const angle = Math.min(Math.max(((value - 60) / (120 - 60)) * 180, 0), 180);
  const needle = arcPoint(cx, cy, r, angle);

  return (
    <Panel style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 2, textAlign: "center" }}>Oil Gauge</p>
      <p style={{ fontSize: 10, color: C.dim, marginBottom: 10, textAlign: "center" }}>Live vs base</p>

      <svg width={160} height={96} viewBox="0 0 160 96">
        {/* Coloured arc segments */}
        {ARCS.map(({ start, end, color }, i) => {
          const p1 = arcPoint(cx, cy, r, start);
          const p2 = arcPoint(cx, cy, r, end);
          return (
            <path
              key={i}
              d={`M${p1.x},${p1.y} A${r},${r} 0 0,1 ${p2.x},${p2.y}`}
              stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.75}
            />
          );
        })}

        {/* Needle */}
        <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={C.accent} strokeWidth={2} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={4} fill={C.accent} />

        {/* Value labels */}
        <text x={cx} y={cy + 17} textAnchor="middle" fill={C.text}  fontSize={19} fontFamily="monospace" fontWeight={700}>${value.toFixed(1)}</text>
        <text x={cx} y={cy + 29} textAnchor="middle" fill={diff >= 0 ? C.green : C.red} fontSize={10} fontFamily="monospace">
          {diff >= 0 ? "+" : ""}{pct}%
        </text>
        <text x={20}  y={92} fill={C.dim} fontSize={9}>$60</text>
        <text x={132} y={92} fill={C.dim} fontSize={9}>$120</text>
      </svg>

      <span style={{ fontSize: 10, color: C.dim, letterSpacing: "0.1em", marginTop: 2 }}>WTI (USD/bbl)</span>
    </Panel>
  );
}
