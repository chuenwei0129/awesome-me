import React from 'react';

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

  .blueprint-container {
    font-family: var(--font-ui);
    padding: 2rem;
    background-color: var(--c-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px; /* Increased gap for tooltip space */
    min-height: 300px;
  }

  /* --- AVATAR WRAPPER --- */
  .blueprint-avatar-wrapper {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: help; /* Indicates info available */
  }

  /* --- AVATAR BOX (Existing Logic) --- */
  .blueprint-avatar-box {
    position: relative;
    border: 1px solid var(--c-text-main);
    background: var(--c-canvas);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    user-select: none;
    z-index: 1; /* Keep below tooltip */
  }

  .size-sm { width: 40px; height: 40px; }
  .size-md { width: 80px; height: 80px; }
  .size-lg { width: 140px; height: 140px; border-width: 2px; }

  .blueprint-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1);
    transition: filter 0.2s;
  }
  
  /* Hover: Restore color */
  .blueprint-avatar-wrapper:hover .blueprint-avatar-img {
    filter: grayscale(0%) contrast(1);
  }

  .blueprint-avatar-initials {
    font-family: var(--font-mono);
    font-weight: 700;
    color: var(--c-text-main);
  }
  .size-sm .blueprint-avatar-initials { font-size: 0.8rem; }
  .size-md .blueprint-avatar-initials { font-size: 1.5rem; }
  .size-lg .blueprint-avatar-initials { font-size: 3rem; }

  /* Corner Marks */
  .corner-mark {
    position: absolute;
    width: 6px;
    height: 6px;
    border-color: var(--c-text-main);
    border-style: solid;
    pointer-events: none;
    z-index: 2;
  }
  .tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
  .tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
  .bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
  .br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

  /* --- TOOLTIP / CALLOUT --- */
  .blueprint-tooltip {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: 100%; /* Above the avatar */
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    width: 200px;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-text-main);
    padding: 0;
    z-index: 100;
    box-shadow: none; /* No shadow, just flat border */
    transition: opacity 0.1s step-end, visibility 0.1s step-end; /* Instant snap */
    pointer-events: none;
  }

  /* Show on Hover */
  .blueprint-avatar-wrapper:hover .blueprint-tooltip {
    visibility: visible;
    opacity: 1;
    transition-delay: 0.2s; /* Slight delay for cleaner UX */
  }

  /* Tooltip Arrow (Geometric Triangle) */
  .blueprint-tooltip::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    margin-left: -6px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--c-text-main);
  }

  /* Tooltip Header */
  .tooltip-header {
    background: var(--c-text-main);
    color: #fff;
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    justify-content: space-between;
  }

  /* Tooltip Content Table */
  .tooltip-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4px 12px;
    padding: 8px;
  }

  .tooltip-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--c-text-sub);
    text-align: right;
  }

  .tooltip-value {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--c-text-main);
    font-weight: 600;
  }

  /* Status Tag (Bottom Right) */
  .blueprint-status-tag {
    position: absolute;
    bottom: -6px;
    right: -6px;
    background: var(--c-canvas);
    border: 1px solid var(--c-text-main);
    padding: 2px 4px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-indicator {
    width: 6px;
    height: 6px;
    border: 1px solid var(--c-text-main);
  }
  .status-active .status-indicator { background: var(--c-text-main); }
  .status-busy .status-indicator { background: repeating-linear-gradient(45deg, #000, #000 2px, #fff 2px, #fff 4px); }
  .status-offline .status-indicator { background: #fff; }

  .status-text {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: bold;
    color: var(--c-text-main);
    line-height: 1;
  }
`;

const BlueprintAvatar = ({
  src,
  name = 'Unknown Unit',
  role = 'OPERATOR',
  id = '000',
  size = 'md',
  status = 'offline',
  lastSeen = 'NOW',
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="blueprint-avatar-wrapper">
      {/* --- TOOLTIP START --- */}
      <div className="blueprint-tooltip">
        <div className="tooltip-header">
          <span>{name}</span>
        </div>
        <div className="tooltip-grid">
          <span className="tooltip-label">ID:</span>
          <span className="tooltip-value">{id}</span>

          <span className="tooltip-label">ROLE:</span>
          <span className="tooltip-value">{role}</span>

          <span className="tooltip-label">STATUS:</span>
          <span className="tooltip-value">{status.toUpperCase()}</span>

          <span className="tooltip-label">LAST_ACK:</span>
          <span className="tooltip-value">{lastSeen}</span>
        </div>
      </div>
      {/* --- TOOLTIP END --- */}

      {/* Avatar Visuals */}
      <div className={`blueprint-avatar-box size-${size}`}>
        <div className="corner-mark tl"></div>
        <div className="corner-mark tr"></div>
        <div className="corner-mark bl"></div>
        <div className="corner-mark br"></div>

        {src ? (
          <img src={src} alt={name} className="blueprint-avatar-img" />
        ) : (
          <span className="blueprint-avatar-initials">{initials}</span>
        )}
      </div>

      {/* Status Tag */}
      <div className={`blueprint-status-tag status-${status}`}>
        <div className="status-indicator"></div>
        <span className="status-text">
          {status === 'active' ? 'ONL' : status === 'busy' ? 'BSY' : 'OFF'}
        </span>
      </div>
    </div>
  );
};

// --- Usage Example ---
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        {/* Example 1: Active User */}
        <BlueprintAvatar
          name="Sarah Connor"
          role="SEC_LEAD"
          id="SC-909"
          size="md"
          status="active"
          lastSeen="T-00:01:20"
        />

        {/* Example 2: Busy / Image */}
        <BlueprintAvatar
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80"
          name="Miles Dyson"
          role="SYS_ARCH"
          id="MD-101"
          size="lg"
          status="busy"
          lastSeen="T-04:00:00"
        />

        {/* Example 3: Small / Offline */}
        <BlueprintAvatar
          name="T-800"
          role="UNIT_800"
          id="CYB-101"
          size="sm"
          status="offline"
          lastSeen="UNKNOWN"
        />
      </div>
    </>
  );
}
