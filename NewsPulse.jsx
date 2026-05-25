import { useState } from 'react';
import { C, CORR, CORR_LABELS } from '../constants.js';
import { corrColor } from '../utils.js';
import { Panel, Label } from './Primitives.jsx';

export default function Heatmap() {
  const [hovered, setHovered] = useState(null);
  const sz = 46;

  return (
    <Panel>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>Correlation Matrix</p>
      <p style={{ fontSize: 11, color: C.dim, marginBottom: 12 }}>30-day rolling Pearson — Oil vs macro</p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", fontSize: 11, fontFamily: "monospace" }}>
          <thead>
            <tr>
              <th style={{ width: 52, color: C.dim }} />
              {CORR_LABELS.map(l => (
                <th key={l} style={{ width: sz, textAlign: "center", color: C.dim, fontWeight: 500, paddingBottom: 4, fontSize: 10 }}>
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CORR.map((row, i) => (
              <tr key={i}>
                <td style={{ color: C.dim, paddingRight: 8, textAlign: "right", fontSize: 10 }}>
                  {CORR_LABELS[i]}
                </td>
                {row.map((v, j) => {
                  const key = `${i}-${j}`;
                  const isHov = hovered === key;
                  const col = corrColor(v);
                  return (
                    <td
                      key={j}
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        width: sz, height: sz, textAlign: "center", cursor: "default",
                        background: isHov ? `${col}33` : `${col}1a`,
                        border: isHov ? `1px solid ${col}` : `1px solid transparent`,
                        transition: "all 0.12s", borderRadius: 3,
                        color: col, fontWeight: i === j ? 700 : 400, fontSize: 11,
                      }}
                    >
                      {v.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div style={{ display: "flex", gap: 4, marginTop: 8, alignItems: "center" }}>
          <span style={{ fontSize: 9, color: C.dim }}>−1</span>
          {[-1, -0.6, -0.3, 0, 0.3, 0.6, 1].map(v => (
            <div key={v} style={{ width: 14, height: 7, borderRadius: 2, background: corrColor(v) }} />
          ))}
          <span style={{ fontSize: 9, color: C.dim }}>+1</span>
        </div>
      </div>
    </Panel>
  );
}
