*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  min-height: 100vh;
  background: #080c10;
  color: #c8d8e8;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  height: 18px;
  background: transparent;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #f0a500;
  border: 2px solid #080c10;
  margin-top: -5px;
}

input[type=range]::-webkit-slider-runnable-track {
  height: 3px;
  background: #1a2535;
  border-radius: 2px;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes shimmer {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
