import React, { useEffect, useState } from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --font-ui: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  .blueprint-container {
    font-family: var(--font-ui);
    padding: 2rem;
    background-color: var(--c-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
    flex-direction: column;
    gap: 2rem;
  }

  .blueprint-progress-wrapper {
    width: 400px;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 16px;
    position: relative;
  }

  /* Header: Label and ID */
  .blueprint-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 4px;
  }

  .blueprint-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 800;
    color: var(--c-text-main);
    letter-spacing: 0.05em;
  }

  .blueprint-meta {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
  }

  /* TRACK: The container of the bar */
  .blueprint-track {
    width: 100%;
    height: 24px;
    background-color: #ffffff;
    border: 1px solid var(--c-text-main); /* Strong border */
    position: relative;
    /* Grid background to look like graph paper inside */
    background-image: 
      linear-gradient(to right, #f1f5f9 1px, transparent 1px),
      linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* FILL: The actual progress */
  .blueprint-fill {
    height: 100%;
    background-color: var(--c-text-main);
    /* Engineering Hatch Pattern (Diagonal Stripes) */
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 5px,
      rgba(255, 255, 255, 0.2) 5px,
      rgba(255, 255, 255, 0.2) 10px
    );
    transition: width 0.2s linear; /* Mechanical movement */
    border-right: 1px solid var(--c-canvas);
    position: relative;
  }

  /* The "Head" of the progress bar */
  .blueprint-fill::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #000;
  }

  /* RULER SCALE */
  .blueprint-scale {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--c-text-sub);
    position: relative;
    height: 15px;
  }

  /* Ticks for 0, 25, 50, 75, 100 */
  .blueprint-tick {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blueprint-tick::before {
    content: '';
    width: 1px;
    height: 6px;
    background-color: var(--c-text-sub);
    margin-bottom: 2px;
  }
  
  /* Fix first and last alignment */
  .blueprint-tick:first-child { transform: translateX(0); align-items: flex-start; }
  .blueprint-tick:last-child { transform: translateX(-100%); align-items: flex-end; }

  /* INFO FOOTER: Percentage and Status */
  .blueprint-info-row {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    align-items: center;
  }

  .blueprint-value-box {
    border: 1px solid var(--c-text-main);
    padding: 2px 6px;
    min-width: 80px;
    text-align: right;
    background: #f8fafc;
  }

  .blueprint-value-text {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: bold;
    color: var(--c-text-main);
  }

  .blueprint-status-text {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--c-text-sub);
    text-transform: uppercase;
  }
`;

const BlueprintProgress = ({
  value = 0,
  max = 100,
  label = 'System Load',
  id = 'PROC_01',
}) => {
  // Clamp value between 0 and max
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  // Determine status text based on percentage
  let status = 'IDLE';
  if (percentage > 0 && percentage < 100) status = 'PROCESSING...';
  if (percentage === 100) status = 'COMPLETE';

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-progress-wrapper">
        {/* Header */}
        <div className="blueprint-header-row">
          <span className="blueprint-label">{label}</span>
          <span className="blueprint-meta">PID: {id}</span>
        </div>

        {/* Progress Track */}
        <div className="blueprint-track">
          <div
            className="blueprint-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Ruler / Scale */}
        <div className="blueprint-scale">
          {[0, 25, 50, 75, 100].map((tick) => (
            <div
              key={tick}
              className="blueprint-tick"
              style={{ left: `${tick}%` }}
            >
              {tick}
            </div>
          ))}
        </div>

        {/* Data Footer */}
        <div className="blueprint-info-row">
          <div className="blueprint-status-text">STATUS: {status}</div>
          <div className="blueprint-value-box">
            <span className="blueprint-value-text">
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Usage Example (Simulation) ---
export default function App() {
  const [progress, setProgress] = useState(12);

  // Simulate a loading process
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0; // Loop for demo
        // Random increment to simulate real network traffic
        return prev + Math.random() * 5;
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="blueprint-container">
      <BlueprintProgress
        value={progress}
        label="Data Migration"
        id="JOB-8842"
      />

      {/* Static Example */}
      <BlueprintProgress value={100} label="Disk Usage" id="VOL-C" />
    </div>
  );
}
