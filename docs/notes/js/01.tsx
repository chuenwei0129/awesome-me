import { BarChart3, Image } from 'lucide-react';
import React, { useState } from 'react';

/**
 * CSS Definitions for the Flat Engineering Blueprint Style
 * usually injected via a global stylesheet or styled-components.
 * Included here for portability.
 */
const styles = `
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-border-strong: #94a3b8;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --c-accent: #0f172a;
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 2rem;
  font-family: var(--font-ui);
  color: var(--c-text-main);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.diagram-canvas {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 900px;
  box-shadow: none; /* NO Shadows */
  display: flex;
  flex-direction: column;
}

/* Header Section */
.diagram-header {
  border-bottom: 1px solid var(--c-border);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.diagram-title {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--c-text-main);
}

.diagram-subtitle {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
}

/* Content Canvas */
.diagram-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Skeleton Placeholder Styles */
.skeleton-block {
  background-color: #ffffff;
  border: 1px solid var(--c-border);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* "Active" animation represented as a technical indicator or simple pulse */
.skeleton-block.active::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(203, 213, 225, 0.3) 10px,
    rgba(203, 213, 225, 0.3) 20px
  );
  animation: blueprint-pulse 2s infinite linear;
}

@keyframes blueprint-pulse {
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
}

.skeleton-icon {
  color: var(--c-border);
  stroke-width: 1.5px;
}

/* Controls Section */
.controls-panel {
  border-top: 1px dashed var(--c-border); /* Dashed for abstract separation */
  padding: 1.5rem 2rem;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  min-width: 120px;
}

/* Blueprint Toggle / Checkbox */
.bp-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
}
.bp-toggle-box {
  width: 16px;
  height: 16px;
  border: 1px solid var(--c-text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}
.bp-toggle-inner {
  width: 8px;
  height: 8px;
  background-color: var(--c-text-main);
  opacity: 0;
}
.bp-toggle.checked .bp-toggle-inner {
  opacity: 1;
}
.bp-toggle-text {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Blueprint Button Group */
.bp-btn-group {
  display: flex;
  border: 1px solid var(--c-border);
}

.bp-btn {
  background: white;
  border: none;
  border-right: 1px solid var(--c-border);
  padding: 0.5rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
  color: var(--c-text-sub);
  transition: all 0.2s;
}
.bp-btn:last-child {
  border-right: none;
}
.bp-btn:hover {
  background-color: #f1f5f9;
}
.bp-btn.selected {
  background-color: var(--c-text-main);
  color: white;
}

/* Utility Classes for Shapes */
.shape-square { border-radius: 0; }
.shape-round { border-radius: 4px; } /* Minimal rounding */
.shape-circle { border-radius: 50%; }

/* Utility Classes for Sizes */
.size-small { height: 24px; padding: 0 8px; }
.size-default { height: 32px; padding: 0 12px; }
.size-large { height: 40px; padding: 0 16px; }

`;

// --- Components ---

const BlueprintToggle = ({ label, checked, onChange }) => (
  <div
    className={`bp-toggle ${checked ? 'checked' : ''}`}
    onClick={() => onChange(!checked)}
  >
    <div className="bp-toggle-box">
      <div className="bp-toggle-inner" />
    </div>
    <span className="bp-toggle-text">{label}</span>
  </div>
);

const BlueprintButtonGroup = ({ options, value, onChange }) => (
  <div className="bp-btn-group">
    {options.map((opt) => (
      <button
        key={opt}
        className={`bp-btn ${value === opt ? 'selected' : ''}`}
        onClick={() => onChange(opt)}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default function SkeletonSpecification() {
  // State matching the controls in the user image
  const [active, setActive] = useState(true);
  const [showTopBlock, setShowTopBlock] = useState(true);
  const [size, setSize] = useState('Default');
  const [btnShape, setBtnShape] = useState('Default');
  const [avatarShape, setAvatarShape] = useState('Circle');

  // Helper to map size to pixel height for rows
  const getSizeHeight = (s) => {
    if (s === 'Small') return 'h-6';
    if (s === 'Large') return 'h-10';
    return 'h-8';
  };

  const pxHeight = size === 'Small' ? 24 : size === 'Large' ? 40 : 32;

  // Determine border radius class based on selection
  const getRadius = (shape) => {
    switch (shape) {
      case 'Square':
        return 'shape-square';
      case 'Round':
        return 'shape-round';
      case 'Circle':
        return 'shape-circle';
      default:
        return 'shape-round'; // Default maps to slightly rounded in standard UI, but flat here implies minimal
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="diagram-canvas">
          {/* 1. Header */}
          <header className="diagram-header">
            <span className="diagram-title">Skeleton Component Spec</span>
            <span className="diagram-subtitle">REF-UI-0042</span>
          </header>

          {/* 2. Main Canvas (Skeleton Visualization) */}
          <div className="diagram-body">
            {/* Top Row: Button / Avatar / Input */}
            {showTopBlock && (
              <div
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                {/* Button Placeholder */}
                <div
                  className={`skeleton-block ${
                    active ? 'active' : ''
                  } ${getRadius(btnShape)}`}
                  style={{ width: 80, height: pxHeight }}
                />

                {/* Avatar Placeholder */}
                <div
                  className={`skeleton-block ${
                    active ? 'active' : ''
                  } ${getRadius(avatarShape)}`}
                  style={{ width: pxHeight, height: pxHeight }}
                />

                {/* Input Placeholder */}
                <div
                  className={`skeleton-block ${
                    active ? 'active' : ''
                  } shape-round`}
                  style={{ flex: 1, height: pxHeight }}
                />
              </div>
            )}

            {/* Middle Rows: Text Lines */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div
                className={`skeleton-block ${
                  active ? 'active' : ''
                } shape-square`}
                style={{ width: '100%', height: pxHeight }}
              />
              <div
                className={`skeleton-block ${
                  active ? 'active' : ''
                } shape-square`}
                style={{ width: '100%', height: pxHeight }}
              />
            </div>

            {/* Bottom Row: Image/Card Blocks */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Card with Image Icon */}
              <div
                className={`skeleton-block ${
                  active ? 'active' : ''
                } shape-square`}
                style={{ width: 100, height: 100 }}
              >
                <Image className="skeleton-icon" size={24} />
              </div>

              {/* Blank Card */}
              <div
                className={`skeleton-block ${
                  active ? 'active' : ''
                } shape-square`}
                style={{ width: 140, height: 100 }}
              />

              {/* Card with Chart Icon */}
              <div
                className={`skeleton-block ${
                  active ? 'active' : ''
                } shape-square`}
                style={{ width: 100, height: 100 }}
              >
                <BarChart3 className="skeleton-icon" size={24} />
              </div>
            </div>
          </div>

          {/* 3. Controls Panel */}
          <div className="controls-panel">
            <div className="control-row">
              <div className="control-label">STATUS_OP</div>
              <BlueprintToggle
                label={active ? 'ACTIVE [ON]' : 'INACTIVE [OFF]'}
                checked={active}
                onChange={setActive}
              />
            </div>

            <div className="control-row">
              <div className="control-label">VISIBILITY_TOP</div>
              <BlueprintToggle
                label={showTopBlock ? 'VISIBLE' : 'HIDDEN'}
                checked={showTopBlock}
                onChange={setShowTopBlock}
              />
            </div>

            <div className="control-row">
              <div className="control-label">DIMENSIONS</div>
              <BlueprintButtonGroup
                options={['Default', 'Large', 'Small']}
                value={size}
                onChange={setSize}
              />
            </div>

            <div className="control-row">
              <div className="control-label">SHAPE_BTN</div>
              <BlueprintButtonGroup
                options={['Default', 'Square', 'Round', 'Circle']}
                value={btnShape}
                onChange={setBtnShape}
              />
            </div>

            <div className="control-row">
              <div className="control-label">SHAPE_AVT</div>
              <BlueprintButtonGroup
                options={['Square', 'Circle']}
                value={avatarShape}
                onChange={setAvatarShape}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
