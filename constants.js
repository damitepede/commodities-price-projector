import { C } from '../constants.js';

export function Panel({ children, style = {} }) {
  return (
    <div style={{
      background: C.panel,
      border: `1px solid ${C.border}`,
      borderRadius: 6,
      padding: "14px 16px",
      ...style,
    }}>
      {children}
    </div>
  );
}

export function Label({ children, style = {} }) {
  return (
    <span style={{
      fontSize: 10,
      color: C.dim,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      ...style,
    }}>
      {children}
    </span>
  );
}

export function Mono({ children, style = {} }) {
  return (
    <span style={{ fontFamily: "monospace", ...style }}>
      {children}
    </span>
  );
}

export function SentimentTag({ color, children }) {
  return (
    <span style={{
      fontSize: 10,
      background: `${color}22`,
      color,
      border: `1px solid ${color}55`,
      borderRadius: 20,
      padding: "2px 8px",
      fontFamily: "monospace",
    }}>
      {children}
    </span>
  );
}
