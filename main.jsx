export const C = {
  bg: "#080c10",
  panel: "#0d1318",
  border: "#1a2535",
  accent: "#f0a500",
  green: "#00e5a0",
  red: "#ff4560",
  blue: "#3b82f6",
  muted: "#4a5a6a",
  text: "#c8d8e8",
  dim: "#5a7080",
};

export const INIT = { oil: 82.4, usd: 104.2, gold: 2318, sp500: 5240 };

// OLS regression coefficients: Oil = b0 + b1*USD + b2*Gold + b3*SP500
export const COEFF = { b0: 120, usd: -0.72, gold: 0.012, sp500: 0.004 };

// 30-day rolling Pearson correlation matrix
export const CORR = [
  [1.0,  -0.68, 0.41, 0.53],
  [-0.68, 1.0, -0.32, 0.28],
  [0.41, -0.32,  1.0, 0.62],
  [0.53,  0.28, 0.62,  1.0],
];

export const CORR_LABELS = ["Oil", "USD", "Gold", "S&P"];

export const CLIENTS = [
  { id: "airline",   label: "✈ Airline (hedging fuel)",      mul: -1,  note: "Rising oil = higher cost base. Monitor hedge breakevens." },
  { id: "fund",      label: "⛽ Energy fund (long crude)",    mul:  1,  note: "Bullish macro setup. Watch USD weakness as primary tailwind." },
  { id: "sovereign", label: "🏛 EM sovereign (oil revenues)", mul:  1,  note: "Fiscal sensitivity to price. Track vs budget breakeven." },
  { id: "refiner",   label: "🏭 Refiner (crack spread)",      mul: 0.5, note: "Crack spread dynamics matter more than outright price." },
];

export const FALLBACK_NEWS = [
  { headline: "OPEC+ signals 500k bpd output cut ahead of summer demand peak", sentiment: "bullish", delta: "+0.8%", source: "Reuters",   time: "4m ago"  },
  { headline: "Fed minutes reveal hawkish tilt; DXY climbs toward 105.5",       sentiment: "bearish", delta: "-1.2%", source: "Bloomberg", time: "11m ago" },
  { headline: "EIA crude draw 4.2M bbl beats -1.8M consensus sharply",          sentiment: "bullish", delta: "+1.4%", source: "EIA",       time: "22m ago" },
  { headline: "China PMI contracts second consecutive month, demand fears rise", sentiment: "bearish", delta: "-0.9%", source: "WSJ",       time: "35m ago" },
  { headline: "IEA lifts 2024 demand growth 0.3M bpd on air travel surge",      sentiment: "bullish", delta: "+0.5%", source: "IEA",       time: "48m ago" },
  { headline: "Goldman raises Brent target to $90 on tight summer supply",       sentiment: "bullish", delta: "+0.3%", source: "FT",        time: "1h ago"  },
];

export const FALLBACK_BRIEF =
  "Crude markets trading cautiously amid mixed signals: supply-side OPEC discipline supports prices while macro headwinds from dollar strength and soft China demand cap the upside. Bias remains rangebound near-term; watch EIA inventories and Fed communication as key catalysts.";
