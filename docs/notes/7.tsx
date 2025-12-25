import { AlertCircle, Ban, Lock, X } from 'lucide-react';
import React, { useState } from 'react';

const BlueprintInputShowcase = () => {
  // 1. State management
  const [warningText, setWarningText] = useState('warning input');
  const [errorText, setErrorText] = useState('');

  // 2. Clear handler
  const handleClearWarning = () => {
    setWarningText('');
  };

  return (
    <div className="diagram-wrapper">
      <div className="diagram-canvas">
        {/* Header Section */}
        <header className="blueprint-header">
          <div className="header-main">
            <h1 className="title">INPUT_STATES</h1>
            <span className="subtitle">FIG 2.1 // FORM CONTROL VARIANTS</span>
          </div>
          <div className="header-meta">
            <span>SYS.UI.KIT</span>
            <span>REV: 2024-C</span>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="blueprint-grid">
          {/* 1. Warning Input (Conditional Clear Button) */}
          <div className="spec-block">
            <div className="spec-label">
              <span className="code">01. STATE: WARNING</span>
              <div className="connector-line"></div>
            </div>
            <div className="input-container warning-mode interactive">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={warningText}
                  onChange={(e) => setWarningText(e.target.value)}
                  className="blueprint-input"
                  placeholder="Type to see clear button..."
                />
              </div>

              {/* Conditional Rendering: Only show X when text exists */}
              <div className="icon-slot">
                {warningText.length > 0 && (
                  <div
                    className="icon-badge action-icon"
                    onClick={handleClearWarning}
                    title="Clear input"
                  >
                    <X size={14} strokeWidth={2} />
                  </div>
                )}
              </div>

              <div className="status-tag">WARN</div>
            </div>
            <div className="dim-lines">
              <span className="measure">LEN: {warningText.length} CHARS</span>
            </div>
          </div>

          {/* 2. Error Input */}
          <div className="spec-block">
            <div className="spec-label">
              <span className="code">02. STATE: ERROR</span>
              <div className="connector-line"></div>
            </div>
            <div className="input-container error-mode interactive">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter value..."
                  value={errorText}
                  onChange={(e) => setErrorText(e.target.value)}
                  className="blueprint-input"
                />
              </div>
              <div className="icon-slot">
                <div className="icon-badge error">
                  <AlertCircle size={14} strokeWidth={2} />
                </div>
              </div>
            </div>
            <div className="error-message-line">
              <span className="line-segment"></span>
              <span className="error-text">INVALID_INPUT_EXCEPTION</span>
            </div>
          </div>

          {/* 3. ReadOnly Input */}
          <div className="spec-block">
            <div className="spec-label">
              <span className="code">03. ATTR: READ_ONLY</span>
              <div className="connector-line"></div>
            </div>
            <div className="input-container readonly-mode">
              <div className="input-wrapper">
                <input
                  type="text"
                  defaultValue="readOnly input"
                  readOnly
                  className="blueprint-input"
                />
              </div>
              <div className="icon-slot">
                <div className="icon-badge">
                  <Lock size={14} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Disabled Input */}
          <div className="spec-block">
            <div className="spec-label">
              <span className="code">04. ATTR: DISABLED</span>
              <div className="connector-line"></div>
            </div>
            <div className="input-container disabled-mode">
              <div className="input-wrapper">
                <input
                  type="text"
                  defaultValue="disabled input"
                  disabled
                  className="blueprint-input"
                />
              </div>
              <div className="icon-slot">
                <div className="icon-badge disabled">
                  <Ban size={14} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Legend */}
        <div className="blueprint-footer">
          <div className="legend-item">
            <span className="box solid"></span> <span>ACTIVE</span>
          </div>
          <div className="legend-item">
            <span className="box hatch"></span> <span>INACTIVE</span>
          </div>
          <div className="legend-item">
            <span className="box error"></span> <span>CRITICAL</span>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-text-main: #0f172a;
          --c-text-sub: #64748b;
          --c-accent-error: #ef4444; 
          --font-ui: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-mono: 'JetBrains Mono', 'Consolas', monospace;
        }

        .diagram-wrapper {
          background-color: var(--c-bg);
          padding: 40px;
          display: flex;
          justify-content: center;
          font-family: var(--font-ui);
          color: var(--c-text-main);
        }

        .diagram-canvas {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          padding: 32px;
          width: 100%;
          max-width: 800px;
          box-shadow: none;
          position: relative;
        }

        /* Header */
        .blueprint-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 2px solid var(--c-text-main);
          padding-bottom: 16px;
          margin-bottom: 48px;
        }

        .title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0;
          text-transform: uppercase;
        }

        .subtitle {
          display: block;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--c-text-sub);
          margin-top: 4px;
        }

        .header-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          text-align: right;
          color: var(--c-text-sub);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* Grid */
        .blueprint-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px 32px;
        }

        /* Component Block */
        .spec-block {
          position: relative;
        }

        .spec-label {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          gap: 8px;
        }

        .code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          font-weight: 600;
        }

        .connector-line {
          flex-grow: 1;
          height: 1px;
          background-color: var(--c-border);
        }

        /* Input Container Base */
        .input-container {
          display: flex;
          align-items: center;
          border: 1px solid var(--c-border);
          height: 40px;
          padding: 0 12px;
          position: relative;
          background: var(--c-canvas);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        /* Interactive States */
        .input-container.interactive:hover {
           border-color: var(--c-text-sub); 
           cursor: text;
        }

        .input-container.interactive:focus-within {
           border-color: var(--c-text-main); 
           box-shadow: 0 0 0 1px var(--c-text-main); 
        }

        /* Warning Mode */
        .input-container.warning-mode {
          border: 2px solid var(--c-text-main);
        }
        .input-container.warning-mode:hover,
        .input-container.warning-mode:focus-within {
           border-color: var(--c-text-main); 
           box-shadow: none; /* Already thick enough */
        }

        .input-wrapper {
          flex-grow: 1;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden; /* Contains the text properly */
        }

        .blueprint-input {
          border: none;
          outline: none;
          width: 100%;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--c-text-main);
          background: transparent;
          /* Removed caret-color manipulation to use default native cursor */
        }

        .blueprint-input::placeholder {
          color: var(--c-text-sub);
          opacity: 0.5;
        }

        /* Icons & Slot */
        /* Fixed width slot for icons to prevent layout jumping */
        .icon-slot {
          width: 20px; 
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--c-text-sub);
          transition: color 0.2s;
        }

        .action-icon {
          cursor: pointer;
        }
        .action-icon:hover {
          color: var(--c-text-main);
        }

        .status-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          background: var(--c-text-main);
          color: var(--c-canvas);
          padding: 2px 4px;
          position: absolute;
          top: -8px;
          right: -1px;
        }

        /* 2. Error State */
        .input-container.error-mode {
          border: 1px solid var(--c-accent-error);
        }
        .input-container.error-mode:hover,
        .input-container.error-mode:focus-within {
          border-color: var(--c-accent-error);
          box-shadow: 0 0 0 1px var(--c-accent-error);
        }

        .input-container.error-mode .blueprint-input::placeholder {
            color: var(--c-accent-error);
            opacity: 0.6;
        }

        .icon-badge.error {
          color: var(--c-accent-error);
        }

        .error-message-line {
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .line-segment {
            width: 12px;
            height: 1px;
            background: var(--c-accent-error);
        }

        .error-text {
            font-family: var(--font-mono);
            font-size: 9px;
            color: var(--c-accent-error);
        }

        /* 3. ReadOnly State */
        .input-container.readonly-mode {
           border-style: dashed; 
           cursor: not-allowed;
        }
        .input-container.readonly-mode:hover {
           border-color: var(--c-border); 
        }

        /* 4. Disabled State */
        .input-container.disabled-mode {
          background-image: repeating-linear-gradient(
            45deg,
            var(--c-canvas),
            var(--c-canvas) 4px,
            #f1f5f9 4px,
            #f1f5f9 8px
          );
          color: var(--c-text-sub);
          cursor: not-allowed;
        }

        .input-container.disabled-mode .blueprint-input {
          color: var(--c-text-sub);
          cursor: not-allowed;
        }

        /* Dimensions / Technical Markings */
        .dim-lines {
          position: absolute;
          bottom: -16px;
          left: 0;
          width: 100%;
          border-left: 1px solid var(--c-border);
          border-right: 1px solid var(--c-border);
          height: 6px;
          display: flex;
          justify-content: center;
        }
        
        .dim-lines::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: var(--c-border);
        }

        .measure {
          background: var(--c-canvas);
          padding: 0 4px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--c-text-sub);
          position: relative;
          z-index: 1;
        }

        /* Footer Legend */
        .blueprint-footer {
          margin-top: 64px;
          padding-top: 16px;
          border-top: 1px solid var(--c-border);
          display: flex;
          gap: 24px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
        }

        .box {
          width: 12px;
          height: 12px;
          border: 1px solid var(--c-border);
        }
        
        .box.solid { background: var(--c-canvas); border-color: var(--c-text-main); }
        .box.error { border-color: var(--c-accent-error); }
        .box.hatch { 
          background-image: repeating-linear-gradient(
            45deg,
            var(--c-canvas),
            var(--c-canvas) 2px,
            #cbd5e1 2px,
            #cbd5e1 4px
          ); 
        }
      `}</style>
    </div>
  );
};

export default BlueprintInputShowcase;
