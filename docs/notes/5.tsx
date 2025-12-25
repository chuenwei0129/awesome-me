import {
  AlertCircle,
  Ban,
  Eye,
  EyeOff,
  Info,
  Lock,
  Search,
  User,
} from 'lucide-react';
import React, { useState } from 'react';

const BlueprintComponentSheet = () => {
  // State for password toggle
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="blueprint-wrapper">
      <div className="blueprint-canvas">
        {/* Document Header */}
        <header className="doc-header">
          <div className="header-left">
            <h1 className="main-title">UI_COMPONENTS_SHEET</h1>
            <div className="sub-title">
              REF_IMG: SCR-20251225 // ALL_INPUT_VARIANTS
            </div>
          </div>
          <div className="header-right">
            <div className="meta-box">
              <span>PROJ: FLUID_DESIGN</span>
              <span>DATE: 2024-12-26</span>
            </div>
          </div>
        </header>

        {/* --- SECTION 1: BASIC USAGE --- */}
        <section className="spec-section">
          <div className="section-title">
            <span className="sec-num">01</span>
            <h3>BASIC_USAGE</h3>
            <div className="sec-line"></div>
          </div>
          <div className="component-row">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter text..."
                className="bp-input"
              />
              <div className="tech-mark">W:AUTO</div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: INPUT STATES --- */}
        <section className="spec-section">
          <div className="section-title">
            <span className="sec-num">02</span>
            <h3>INPUT_STATES</h3>
            <div className="sec-line"></div>
          </div>
          <div className="grid-2-col">
            {/* Warning */}
            <div className="input-group warning">
              <label className="bp-label">STATE: WARNING</label>
              <div className="input-box-wrapper thick-border">
                <input
                  type="text"
                  defaultValue="warning input"
                  className="bp-input"
                />
                <div className="icon-right">
                  <Info size={14} />
                </div>
              </div>
            </div>

            {/* Error */}
            <div className="input-group error">
              <label className="bp-label">STATE: ERROR</label>
              <div className="input-box-wrapper error-border">
                <input
                  type="text"
                  placeholder="Error state"
                  className="bp-input"
                />
                <div className="icon-right error-text">
                  <AlertCircle size={14} />
                </div>
              </div>
            </div>

            {/* ReadOnly */}
            <div className="input-group">
              <label className="bp-label">ATTR: READ_ONLY</label>
              <div className="input-box-wrapper dashed-border">
                <input
                  type="text"
                  defaultValue="readOnly input"
                  readOnly
                  className="bp-input"
                />
                <div className="icon-right">
                  <Lock size={14} />
                </div>
              </div>
            </div>

            {/* Disabled */}
            <div className="input-group">
              <label className="bp-label">ATTR: DISABLED</label>
              <div className="input-box-wrapper disabled-fill">
                <input
                  type="text"
                  defaultValue="disabled input"
                  disabled
                  className="bp-input disabled-text"
                />
                <div className="icon-right">
                  <Ban size={14} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: PRE / POST FIX (Icons inside) --- */}
        <section className="spec-section">
          <div className="section-title">
            <span className="sec-num">03</span>
            <h3>PREFIX_SUFFIX_ELEMENTS</h3>
            <div className="sec-line"></div>
          </div>
          <div className="grid-2-col">
            {/* Prefix Icon */}
            <div className="input-group">
              <div className="input-box-wrapper">
                <div className="addon-internal prefix">
                  <User size={14} />
                  <div className="divider-v"></div>
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="bp-input"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
            </div>

            {/* Suffix Icon */}
            <div className="input-group">
              <div className="input-box-wrapper">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bp-input"
                />
                <div className="addon-internal suffix">
                  <div className="divider-v"></div>
                  <Search size={14} />
                </div>
              </div>
            </div>

            {/* Prefix Text */}
            <div className="input-group">
              <div className="input-box-wrapper">
                <div className="addon-internal prefix text-addon">
                  <span>+86</span>
                  <div className="divider-v"></div>
                </div>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="bp-input"
                  style={{ paddingLeft: '48px' }}
                />
              </div>
            </div>

            {/* Suffix Text */}
            <div className="input-group">
              <div className="input-box-wrapper">
                <input type="text" placeholder="Amount" className="bp-input" />
                <div className="addon-internal suffix text-addon">
                  <div className="divider-v"></div>
                  <span>RMB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: PRE / POST TAGS (Addons outside) --- */}
        <section className="spec-section">
          <div className="section-title">
            <span className="sec-num">04</span>
            <h3>ADDON_TAGS</h3>
            <div className="sec-line"></div>
          </div>

          <div className="component-col">
            {/* Addon Before */}
            <div className="input-group flex-row">
              <div className="addon-external">http://</div>
              <div className="input-box-wrapper flex-grow">
                <input type="text" placeholder="mysite" className="bp-input" />
              </div>
              <div className="addon-external">.com</div>
            </div>

            {/* Addon Complex */}
            <div className="input-group flex-row mt-4">
              <div className="addon-external select-look">
                <span>Select</span>
                <div className="triangle-down"></div>
              </div>
              <div className="input-box-wrapper flex-grow">
                <input type="text" defaultValue="mysite" className="bp-input" />
              </div>
              <div className="addon-external icon-btn">
                <Search size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: WORD COUNT --- */}
        <section className="spec-section">
          <div className="section-title">
            <span className="sec-num">05</span>
            <h3>DATA_METRICS</h3>
            <div className="sec-line"></div>
          </div>
          <div className="grid-2-col">
            <div className="input-group">
              <div className="input-box-wrapper">
                <input
                  type="text"
                  placeholder="Enter text"
                  className="bp-input"
                />
                <div className="word-count">0/10</div>
              </div>
            </div>

            <div className="input-group error">
              <div className="input-box-wrapper error-border">
                <input
                  type="text"
                  defaultValue="More than 10 letters will be error"
                  className="bp-input error-text-input"
                />
                <div className="word-count error-text">34/10</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: SEARCH & PASSWORD --- */}
        <section className="spec-section">
          <div className="section-title">
            <span className="sec-num">06</span>
            <h3>SPECIAL_INPUTS</h3>
            <div className="sec-line"></div>
          </div>
          <div className="grid-2-col">
            {/* Search Bar */}
            <div className="input-group">
              <label className="bp-label">TYPE: SEARCH_BAR</label>
              <div className="input-box-wrapper round-cap-left">
                <input
                  type="text"
                  placeholder="Search website..."
                  className="bp-input"
                />
                <button className="search-btn">
                  <Search size={14} />
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="bp-label">TYPE: PASSWORD</label>
              <div className="input-box-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  defaultValue="password123"
                  className="bp-input"
                />
                <button
                  className="icon-btn-internal"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* --- CSS VARIABLES & RESET --- */
        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-border-dark: #94a3b8;
          --c-text-main: #0f172a;
          --c-text-sub: #64748b;
          --c-error: #ef4444;
          --font-ui: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .blueprint-wrapper {
          background-color: var(--c-bg);
          padding: 40px;
          min-height: 100vh;
          font-family: var(--font-ui);
          color: var(--c-text-main);
          display: flex;
          justify-content: center;
        }

        .blueprint-canvas {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          padding: 40px;
          width: 100%;
          max-width: 900px;
          box-shadow: none;
        }

        /* --- HEADER --- */
        .doc-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid var(--c-text-main);
          padding-bottom: 20px;
          margin-bottom: 40px;
        }
        .main-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          text-transform: uppercase;
          margin: 0;
        }
        .sub-title {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--c-text-sub);
          margin-top: 4px;
        }
        .meta-box {
          text-align: right;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          display: flex;
          flex-direction: column;
        }

        /* --- SECTIONS --- */
        .spec-section {
          margin-bottom: 48px;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .sec-num {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: bold;
          background: var(--c-text-main);
          color: #fff;
          padding: 2px 6px;
        }
        .section-title h3 {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          margin: 0;
          white-space: nowrap;
        }
        .sec-line {
          height: 1px;
          background: var(--c-border);
          width: 100%;
        }

        /* --- LAYOUT GRID --- */
        .grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .component-row {
          margin-bottom: 24px;
        }
        .component-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .flex-row {
          display: flex;
          align-items: stretch;
        }
        .flex-grow {
          flex-grow: 1;
        }
        .mt-4 { margin-top: 16px; }

        /* --- INPUT COMPONENT STYLES --- */
        .input-group {
          position: relative;
        }
        .bp-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        /* Wrapper Box */
        .input-box-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid var(--c-border-dark);
          height: 38px;
          background: #fff;
          position: relative;
          transition: none;
        }
        
        .thick-border { border: 2px solid var(--c-text-main); }
        .error-border { border: 1px solid var(--c-error); }
        .dashed-border { border-style: dashed; }
        .disabled-fill { 
          background-image: repeating-linear-gradient(
            45deg,
            var(--c-bg),
            var(--c-bg) 4px,
            #e2e8f0 4px,
            #e2e8f0 8px
          );
        }

        /* The Input Field itself */
        .bp-input {
          border: none;
          outline: none;
          background: transparent;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--c-text-main);
          width: 100%;
          padding: 0 12px;
          height: 100%;
        }
        .bp-input::placeholder {
          color: #94a3b8;
          font-family: var(--font-ui); /* Placeholder in UI font */
        }
        .disabled-text { color: var(--c-text-sub); }
        .error-text-input { color: var(--c-error); }

        /* --- ICONS & ADDONS INTERNAL --- */
        .icon-right {
          padding-right: 12px;
          display: flex;
          align-items: center;
          color: var(--c-text-sub);
        }
        .error-text { color: var(--c-error); }

        .addon-internal {
          position: absolute;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--c-text-sub);
          z-index: 1;
        }
        .prefix { left: 0; padding-left: 12px; }
        .suffix { right: 0; padding-right: 12px; }
        
        .divider-v {
          width: 1px;
          height: 20px;
          background: var(--c-border);
          margin: 0 8px;
        }
        .text-addon {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--c-text-main);
        }

        /* --- ADDONS EXTERNAL (TAGS) --- */
        .addon-external {
          background: #f1f5f9;
          border: 1px solid var(--c-border-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--c-text-sub);
        }
        /* Remove double borders when joined */
        .addon-external:first-child { border-right: none; }
        .addon-external:last-child { border-left: none; }
        
        .select-look {
          gap: 6px;
          cursor: pointer;
        }
        .triangle-down {
          width: 0; 
          height: 0; 
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid var(--c-text-sub);
        }
        .icon-btn {
          cursor: pointer;
        }

        /* --- WORD COUNT --- */
        .word-count {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          padding-right: 12px;
          white-space: nowrap;
        }

        /* --- SEARCH & BUTTONS --- */
        .search-btn {
          height: 100%;
          border: none;
          border-left: 1px solid var(--c-border-dark);
          background: #f1f5f9;
          color: var(--c-text-main);
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .search-btn:hover {
          background: #e2e8f0;
        }
        
        .icon-btn-internal {
          background: transparent;
          border: none;
          padding: 0 12px;
          cursor: pointer;
          color: var(--c-text-sub);
          display: flex;
          align-items: center;
        }
        .icon-btn-internal:hover { color: var(--c-text-main); }

        /* Technical Marks */
        .tech-mark {
          position: absolute;
          bottom: -18px;
          right: 0;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--c-text-sub);
        }

      `}</style>
    </div>
  );
};

export default BlueprintComponentSheet;
