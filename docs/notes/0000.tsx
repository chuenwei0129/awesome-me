import React from 'react';

// --- CSS Styles ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-accent: #0f172a; /* Black for active */
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
    gap: 40px;
    flex-wrap: wrap;
    min-height: 300px;
  }

  /* --- AVATAR FRAME --- */
  .blueprint-avatar-wrapper {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
  }

  /* The actual image container */
  .blueprint-avatar-box {
    position: relative;
    border: 1px solid var(--c-text-main);
    background: var(--c-canvas);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    user-select: none;
  }

  /* Size Variants */
  .size-sm { width: 40px; height: 40px; }
  .size-md { width: 80px; height: 80px; }
  .size-lg { width: 140px; height: 140px; border-width: 2px; }

  /* Image styling: Grayscale & High Contrast */
  .blueprint-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1);
    transition: filter 0.2s;
  }
  
  /* Hover Effect: Reveal color slightly (optional) or invert */
  .blueprint-avatar-wrapper:hover .blueprint-avatar-img {
    filter: grayscale(0%) contrast(1);
  }

  /* Fallback Initials */
  .blueprint-avatar-initials {
    font-family: var(--font-mono);
    font-weight: 700;
    color: var(--c-text-main);
    letter-spacing: 0.05em;
  }
  .size-sm .blueprint-avatar-initials { font-size: 0.8rem; }
  .size-md .blueprint-avatar-initials { font-size: 1.5rem; }
  .size-lg .blueprint-avatar-initials { font-size: 3rem; }

  /* Technical Corner Marks (The "Scope" look) */
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

  /* --- STATUS BADGE --- */
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

  /* --- ID CARD LAYOUT (for Large) --- */
  .blueprint-id-card {
    margin-top: 8px;
    border-top: 1px solid var(--c-border);
    padding-top: 4px;
    width: 100%;
  }
  .blueprint-name {
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    display: block;
    color: var(--c-text-main);
  }
  .blueprint-role {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--c-text-sub);
    display: block;
  }
`;

const BlueprintAvatar = ({
  src,
  name = 'Unknown Unit',
  role,
  id = '000',
  size = 'md',
  status = 'offline', // active, busy, offline
}) => {
  // Extract initials
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="blueprint-avatar-wrapper">
      {/* The Image Box */}
      <div className={`blueprint-avatar-box size-${size}`}>
        {/* Decorative Corners */}
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

      {/* Status Tag (Attached to corner) */}
      <div className={`blueprint-status-tag status-${status}`}>
        <div className="status-indicator"></div>
        <span className="status-text">
          {status === 'active' ? 'ONL' : status === 'busy' ? 'BSY' : 'OFF'}
        </span>
      </div>

      {/* Extended Info (Only for Large sizes or explicit cards) */}
      {size === 'lg' && (
        <div className="blueprint-id-card">
          <span className="blueprint-name">{name}</span>
          <span className="blueprint-role">
            ID:{id} // {role || 'PERSONNEL'}
          </span>
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
      <div className="blueprint-container">
        {/* Small: Inline usage (e.g., in a table) */}
        <BlueprintAvatar name="Alice Chen" size="sm" status="active" />

        {/* Medium: Fallback (No Image) */}
        <BlueprintAvatar name="System Admin" size="md" status="busy" />

        {/* Large: Full ID Card Style */}
        <BlueprintAvatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
          name="Marcus Reed"
          role="CHIEF_ENGINEER"
          id="ENG-892"
          size="lg"
          status="active"
        />
      </div>
    </>
  );
}
