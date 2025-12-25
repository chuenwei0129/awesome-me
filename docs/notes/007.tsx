import React, { useState } from 'react';

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
    min-height: 200px;
  }

  /* --- SWITCH CONTAINER --- */
  .blueprint-switch-wrapper {
    width: 300px;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  /* Decorative Corner Marks */
  .blueprint-switch-wrapper::before,
  .blueprint-switch-wrapper::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border: 1px solid var(--c-text-main);
    transition: background 0.1s;
  }
  .blueprint-switch-wrapper::before { top: -1px; left: -1px; border-right: none; border-bottom: none; }
  .blueprint-switch-wrapper::after { bottom: -1px; right: -1px; border-left: none; border-top: none; }

  /* Header / Label */
  .blueprint-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 4px;
    margin-bottom: 4px;
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

  /* --- CONTROL ROW --- */
  .blueprint-control-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* The Mechanical Switch Mechanism */
  .blueprint-switch-track {
    display: flex;
    border: 1px solid var(--c-text-main);
    cursor: pointer;
    background: #fff;
    user-select: none;
  }

  .blueprint-switch-state {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 6px 16px;
    min-width: 60px;
    text-align: center;
    color: var(--c-text-sub);
    transition: all 0s; /* No animation */
  }

  /* Active Logic: Invert Colors */
  .blueprint-switch-state.is-active {
    background-color: var(--c-text-main);
    color: #ffffff;
    font-weight: bold;
  }

  /* Hover effect for the inactive part */
  .blueprint-switch-state:not(.is-active):hover {
    background-color: #f1f5f9;
    color: var(--c-text-main);
  }

  /* Status Indicator Text */
  .blueprint-status-display {
    text-align: right;
  }
  
  .blueprint-status-label {
    display: block;
    font-size: 0.65rem;
    color: var(--c-text-sub);
    text-transform: uppercase;
  }

  .blueprint-status-value {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-main);
    font-weight: bold;
  }
  
  /* Blinking cursor effect for 'live' feel */
  .cursor-blink {
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const BlueprintSwitch = ({
  label = 'Power Circuit',
  id = 'SW-MAIN-01',
  defaultChecked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const toggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) onChange(newState);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="blueprint-switch-wrapper">
          {/* Component Header */}
          <div className="blueprint-header">
            <span className="blueprint-label">{label}</span>
            <span className="blueprint-meta">REF: {id}</span>
          </div>

          {/* Interactive Area */}
          <div className="blueprint-control-row">
            {/* The Rocker Switch */}
            <div
              className="blueprint-switch-track"
              onClick={toggle}
              role="switch"
              aria-checked={isChecked}
            >
              <div
                className={`blueprint-switch-state ${
                  !isChecked ? 'is-active' : ''
                }`}
              >
                OFF
              </div>
              {/* Vertical Divider Line */}
              <div
                style={{ width: '1px', background: 'var(--c-text-main)' }}
              ></div>
              <div
                className={`blueprint-switch-state ${
                  isChecked ? 'is-active' : ''
                }`}
              >
                ON
              </div>
            </div>

            {/* Technical Readout */}
            <div className="blueprint-status-display">
              <span className="blueprint-status-label">Signal_State</span>
              <span className="blueprint-status-value">
                {isChecked ? '1_HIGH' : '0_LOW'}
                <span className="cursor-blink">_</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Usage Example ---
export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: '#f8fafc',
      }}
    >
      <BlueprintSwitch
        label="Master Power"
        id="PWR-001"
        defaultChecked={true}
      />
      <BlueprintSwitch
        label="Emergency Stop"
        id="EMG-999"
        defaultChecked={false}
      />
    </div>
  );
}
