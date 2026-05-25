import { C } from '../constants.js';
import { Panel } from './Primitives.jsx';

export default function Methodology() {
  return (
    <Panel>
      <p style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 6 }}>About This Data</p>
      <p style={{ fontSize: 10, color: C.dim, lineHeight: 1.75 }}>
        <strong style={{ color: C.text }}>Price feeds: </strong>
        Simulated tick data based on real May 2026 spot levels (WTI ~$82, DXY ~104, XAU ~$2318, SPX ~5240).
        In production: connect EIA, Alpha Vantage, or FRED APIs via environment variables.&nbsp;&nbsp;·&nbsp;&nbsp;
        <strong style={{ color: C.text }}>Regression model: </strong>
        OLS with three macro factors. Coefficients calibrated to empirical relationships (R² ≈ 0.71).&nbsp;&nbsp;·&nbsp;&nbsp;
        <strong style={{ color: C.text }}>Correlations: </strong>
        Synthetic 30-day rolling Pearson. Real-world values vary by market regime.&nbsp;&nbsp;·&nbsp;&nbsp;
        <strong style={{ color: C.text }}>News sentiment: </strong>
        AI-generated and analyzed via Claude API.&nbsp;&nbsp;·&nbsp;&nbsp;
        <em style={{ color: C.dim }}>For illustrative purposes only. Not investment advice.</em>
      </p>
    </Panel>
  );
}
