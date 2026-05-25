import { C } from '../constants.js';
import { sparkPath } from '../utils.js';
import { Panel, Mono, Label } from './Primitives.jsx';

function Sparkline({ data, w = 72, h = 24, positive }) {
  return (
    <svg width={w} height={h}>
      <path
        d={sparkPath(data, w, h)}
        fill="none"
        stroke={positive ? C.green : C.red}
        strokeWidth={1.5}
      />
    </svg>
  );
}

export default function Ticker({ label, value, unit, change, spark }) {
  const positive = change >= 0;
  return (
    <Panel style={{ flex: 1, minWidth: 120 }}>
      <Label>{label}</Label>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 4 }}>
        <Mono style={{ fontSize: 20, color: C.text, fontWeight: 600 }}>
          {unit}{Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Mono>
        <Sparkline data={spark} positive={positive} />
      </div>
      <Mono style={{ fontSize: 11, color: positive ? C.green : C.red, marginTop: 3, display: "block" }}>
        {positive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
      </Mono>
    </Panel>
  );
}
