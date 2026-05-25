import { COEFF } from './constants.js';

// OLS prediction
export function predict(usd, gold, sp500) {
  return COEFF.b0 + COEFF.usd * usd + COEFF.gold * gold + COEFF.sp500 * sp500;
}

// Generate a random sparkline walk around a base price
export function genSpark(base, vol, n = 28) {
  const arr = [base];
  for (let i = 1; i < n; i++) {
    arr.push(arr[i - 1] * (1 + (Math.random() - 0.5) * vol));
  }
  return arr;
}

// Convert sparkline data array into an SVG polyline path string
export function sparkPath(data, w, h) {
  const mn = Math.min(...data);
  const mx = Math.max(...data);
  return (
    "M" +
    data
      .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / (mx - mn || 1)) * h}`)
      .join("L")
  );
}

// Map a correlation value to a colour on a red→amber→green scale
export function corrColor(v) {
  if (v >= 0.6)  return "#00e5a0";
  if (v >= 0.2)  return "#4ade80";
  if (v >= 0)    return "#f0a500";
  if (v >= -0.4) return "#fb923c";
  return "#ff4560";
}

// Call Claude API — returns the text content of the first text block
export async function claudeCall(prompt, maxTokens = 900) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content.find((b) => b.type === "text").text;
}
