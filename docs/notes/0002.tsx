import React, { useEffect, useRef, useState } from 'react';

// --- CSS Styles ---
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

  .blueprint-demo-area {
    font-family: var(--font-ui);
    padding: 4rem;
    background-color: var(--c-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
    min-height: 400px;
  }

  /* --- POPOVER WRAPPER --- */
  .blueprint-popover-wrapper {
    position: relative;
    display: inline-block;
  }

  /* --- TRIGGER BUTTON --- */
  .blueprint-trigger-btn {
    background: var(--c-canvas);
    border: 1px solid var(--c-text-main);
    padding: 10px 16px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--c-text-main);
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .blueprint-trigger-btn:hover,
  .blueprint-trigger-btn.is-active {
    background: var(--c-text-main);
    color: #ffffff;
  }

  /* --- POPOVER CONTENT --- */
  .blueprint-popover-content {
    position: absolute;
    bottom: calc(100% + 12px); /* Position above trigger */
    left: 50%;
    transform: translateX(-50%);
    width: 280px;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-text-main);
    z-index: 50;
    /* No shadow - Flat design */
    box-shadow: 0 0 0 1px rgba(255,255,255,1); /* Outline hack for cleanliness */
  }

  /* Geometric Arrow */
  .blueprint-popover-content::after {
    content: '';
    position: absolute;
    bottom: -8px; /* Push out */
    left: 50%;
    margin-left: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--c-text-main);
  }

  /* --- HEADER --- */
  .blueprint-popover-header {
    background: var(--c-text-main);
    color: #ffffff;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blueprint-popover-title {
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .blueprint-close-btn {
    background: none;
    border: none;
    color: #ffffff;
    font-family: var(--font-mono);
    font-size: 1rem;
    cursor: pointer;
    line-height: 1;
    padding: 0 4px;
  }
  .blueprint-close-btn:hover {
    color: #cbd5e1;
  }

  /* --- BODY --- */
  .blueprint-popover-body {
    padding: 16px;
  }

  .blueprint-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }
  .blueprint-row:last-child { margin-bottom: 0; }

  .blueprint-key { color: var(--c-text-sub); }
  .blueprint-val { color: var(--c-text-main); font-weight: 600; }

  /* Decorative Divider */
  .blueprint-divider {
    height: 1px;
    background: var(--c-border);
    margin: 12px 0;
    position: relative;
  }
  .blueprint-divider::after {
    content: ''; /* Hatch mark on divider */
    position: absolute;
    right: 0;
    top: -2px;
    width: 4px;
    height: 4px;
    background: var(--c-text-main);
  }

  /* Actions */
  .blueprint-actions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
  }
  
  .blueprint-btn-sm {
    flex: 1;
    padding: 6px;
    border: 1px solid var(--c-text-main);
    background: transparent;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
  }
  .blueprint-btn-sm:hover {
    background: #f1f5f9;
  }
  .blueprint-btn-sm.primary {
    background: var(--c-text-main);
    color: #fff;
  }
  .blueprint-btn-sm.primary:hover {
    opacity: 0.9;
  }
`;

const BlueprintPopover = ({
  triggerLabel = 'Show Details',
  title = 'Component Specifications',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="blueprint-popover-wrapper" ref={containerRef}>
      {/* Trigger */}
      <button
        className={`blueprint-trigger-btn ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        [{isOpen ? '-' : '+'}] {triggerLabel}
      </button>

      {/* Popover Content */}
      {isOpen && (
        <div className="blueprint-popover-content">
          {/* Header */}
          <div className="blueprint-popover-header">
            <span className="blueprint-popover-title">{title}</span>
            <button
              className="blueprint-close-btn"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="blueprint-popover-body">{children}</div>
        </div>
      )}
    </div>
  );
};

// --- Usage Example ---
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-demo-area">
        {/* Example 1: Data View */}
        <BlueprintPopover triggerLabel="View Metrics" title="Unit_04_Telemetry">
          <div className="blueprint-row">
            <span className="blueprint-key">Uptime:</span>
            <span className="blueprint-val">842h 12m</span>
          </div>
          <div className="blueprint-row">
            <span className="blueprint-key">Load:</span>
            <span className="blueprint-val">42.5%</span>
          </div>
          <div className="blueprint-row">
            <span className="blueprint-key">Temp:</span>
            <span className="blueprint-val">68°C</span>
          </div>

          <div className="blueprint-divider"></div>

          <div className="blueprint-row">
            <span className="blueprint-key">Status:</span>
            <span className="blueprint-val" style={{ color: '#16a34a' }}>
              NOMINAL
            </span>
          </div>
        </BlueprintPopover>

        {/* Example 2: Interactive Menu */}
        <BlueprintPopover triggerLabel="Modify Config" title="Settings_Control">
          <div className="blueprint-row">
            <span className="blueprint-key">Mode:</span>
            <span className="blueprint-val">MANUAL_OVERRIDE</span>
          </div>

          <div className="blueprint-actions">
            <button className="blueprint-btn-sm">Reset</button>
            <button className="blueprint-btn-sm primary">Save</button>
          </div>
        </BlueprintPopover>
      </div>
    </>
  );
}
