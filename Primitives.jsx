import { useState } from 'react';
import { C, CLIENTS } from '../constants.js';
import { predict } from '../utils.js';
import { Panel, Label, Mono } from './Primitives.jsx';

const SLIDERS = [
  { key: "usd",   label: "USD Index",     range: [-10, 10], color: C.blue   },
  { key: "gold",  label: "Gold XAU/USD",  range: [-15, 15], color: C.accent },
  { key: "sp500", label: "S&P 500",       range: [-20, 20], color: C.green  },
];

export default function ScenarioPanel({ base }) {
  const [deltas, setDeltas] = useState({ usd: 0, gold: 0, sp500: 0 });
  const [client, setClient] = useState(CLIENTS[0]);

  const newUSD  = base.usd   * (1 + deltas.usd   / 100);
  const newGold = base.gold  * (1 + deltas.gold  / 100);
  const newSP   = base.sp500 * (1 + deltas.sp500 / 100);

  const predicted = predict(newUSD, newGold, newSP);
  const diff      = predicted - base.oil;
  const pct       = ((diff / base.oil) * 100).toFixed(2);
  const impact    = diff * client.mul;

  const resultColor = diff === 0 ? C.border : diff > 0 ? C.green : C.red;

  return (
    <Panel>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>What-If Analysis</p>
      <p style={{ fontSize: 11, color: C.dim, marginBottom: 10 }}>Stress-test oil under macro scenarios</p>

      {/* Client context selector */}
      <div style={{ marginBottom: 14 }}>
        <Label>Client Context</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 }}>
          {CLIENTS.map(c => (
            <button
              key={c.id}
              onClick={() => setClient(c)}
              style={{
                fontSize: 10, padding: "3px 8px", borderRadius: 20, fontFamily: "monospace",
                background: client.id === c.id ? `${C.accent}22` : "transparent",
                border: `1px solid ${client.id === c.id ? C.accent : C.border}`,
                color: client.id === c.id ? C.accent : C.dim,
                transition: "all 0.12s",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 10, color: C.dim, marginTop: 6, fontStyle: "italic" }}>{client.note}</p>
      </div>

      {/* Sliders */}
      {SLIDERS.map(({ key, label, range, color }) => (
        <div key={key} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: C.text }}>{label}</span>
            <Mono style={{ fontSize: 11, color: deltas[key] === 0 ? C.dim : deltas[key] > 0 ? C.green : C.red }}>
              {deltas[key] > 0 ? "+" : ""}{deltas[key]}%
            </Mono>
          </div>
          <input
            type="range"
            min={range[0]} max={range[1]} step={0.5}
            value={deltas[key]}
            style={{ accentColor: color }}
            onChange={e => setDeltas(d => ({ ...d, [key]: parseFloat(e.target.value) }))}
          />
        </div>
      ))}

      {/* Result box */}
      <div style={{
        background: `${resultColor}15`,
        border: `1px solid ${resultColor}`,
        borderRadius: 6, padding: "12px 14px", marginTop: 4,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <Label>Predicted WTI</Label>
            <Mono style={{ fontSize: 24, color: C.text, fontWeight: 700, display: "block", marginTop: 2 }}>
              ${predicted.toFixed(2)}
            </Mono>
          </div>
          <div style={{ textAlign: "right" }}>
            <Label>vs Spot</Label>
            <Mono style={{ fontSize: 16, color: diff >= 0 ? C.green : C.red, display: "block", marginTop: 2 }}>
              {diff >= 0 ? "▲" : "▼"} {Math.abs(pct)}%
            </Mono>
            <Mono style={{ fontSize: 11, color: diff >= 0 ? C.green : C.red }}>
              {diff >= 0 ? "+" : ""}{diff.toFixed(2)} USD
            </Mono>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
          <Label>Client impact ({client.label})</Label>
          <p style={{ fontSize: 11, fontFamily: "monospace", color: impact >= 0 ? C.green : C.red, marginTop: 3 }}>
            {impact >= 0 ? "Favourable" : "Adverse"} — {impact >= 0 ? "+" : ""}{impact.toFixed(2)} USD/bbl
          </p>
        </div>
      </div>
    </Panel>
  );
}
