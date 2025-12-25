import { Edit3, Link as LinkIcon } from 'lucide-react';
import React from 'react';

// --- CSS Styles ---
const styles = `
:root {
  /* 基础调色板 */
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  
  /* 语义颜色 */
  --c-primary: #0f172a;  /* Engineering Black */
  --c-brand:   #2563eb;  /* Blueprint Blue (用于 Link/Ghost Primary) */
  --c-success: #16a34a;
  --c-warning: #ea580c;
  --c-danger:  #dc2626;
  --c-white:   #ffffff;
  
  --font-ui: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

body {
  background-color: var(--c-bg);
  color: var(--c-text-main);
  font-family: var(--font-ui);
}

.blueprint-container {
  max-width: 900px;
  margin: 40px auto;
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  padding: 40px;
}

.section-title {
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 2px solid var(--c-text-main);
  padding-bottom: 8px;
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-desc {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-sub);
  margin-bottom: 24px;
  margin-top: -16px;
  background: #f1f5f9;
  display: inline-block;
  padding: 4px 8px;
}

.component-row {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  align-items: center;
}

/* --- Button Core --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-weight: 500;
  border: 1px solid transparent; /* 预留边框位置保持对齐 */
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
  text-decoration: none;
  line-height: 1;
  background-color: transparent;
}

/* Sizes */
.btn-sm { height: 32px; padding: 0 12px; font-size: 12px; }
.btn-md { height: 40px; padding: 0 20px; font-size: 13px; }
.btn-lg { height: 48px; padding: 0 32px; font-size: 14px; }

/* ================= VARIANTS ================= */

/* 1. Solid (实心) */
.btn-solid { background-color: var(--c-border); color: var(--c-text-main); } /* Default fallback */
.btn-solid.intent-primary { background: var(--c-brand); color: white; border-color: var(--c-brand); }
.btn-solid.intent-danger  { background: var(--c-danger); color: white; border-color: var(--c-danger); }
.btn-solid:hover { opacity: 0.9; }

/* 2. Outline (线框 - 默认 default 样式) */
.btn-outline { border-color: var(--c-border); color: var(--c-text-main); background: var(--c-canvas); }
.btn-outline.intent-primary { border-color: var(--c-brand); color: var(--c-brand); }
.btn-outline.intent-danger  { border-color: var(--c-danger); color: var(--c-danger); }
.btn-outline.intent-white   { border-color: var(--c-white);  color: var(--c-white); background: transparent; }
.btn-outline:hover { background-color: #f8fafc; }
.btn-outline.intent-white:hover { background-color: rgba(255,255,255,0.1); }

/* 3. Dashed (虚线) */
.btn-dashed { 
  border-style: dashed; 
  border-color: var(--c-border); 
  color: var(--c-text-main); 
  background: var(--c-canvas);
}
.btn-dashed.intent-white { border-color: var(--c-white); color: var(--c-white); background: transparent; }
.btn-dashed:hover { border-color: var(--c-text-sub); }

/* 4. Text (文本 - 无边框) */
.btn-text { 
  color: var(--c-text-main); 
  background: transparent;
  border-color: transparent; /* 保持占位 */
}
.btn-text:hover { background-color: #f1f5f9; }

/* 5. Link (链接) */
.btn-link {
  color: var(--c-brand);
  background: transparent;
  border-color: transparent;
}
.btn-link:hover { text-decoration: underline; }

/* Special Layout: Ghost Container */
.ghost-bg {
  background-color: #94a3b8; /* Slate 400 */
  padding: 24px;
  border: 1px solid var(--c-border);
  display: flex;
  gap: 16px;
  align-items: center;
}

/* Icons */
.btn-icon { width: 14px; height: 14px; }
`;

// --- React Component ---

type ButtonProps = {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'dashed' | 'text' | 'link';
  intent?: 'default' | 'primary' | 'danger' | 'white'; // Added 'white' for Ghost
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'outline', // Default to outline/default style
  intent = 'default',
  size = 'md',
  iconLeft,
  style,
}) => {
  // Determine intent class
  const intentClass = intent !== 'default' ? `intent-${intent}` : '';

  return (
    <button
      className={`btn btn-${size} btn-${variant} ${intentClass}`}
      style={style}
    >
      {iconLeft && <span className="btn-icon-wrapper">{iconLeft}</span>}
      {children}
    </button>
  );
};

// --- Documentation Page ---

export default function UpdatedButtonSpec() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        {/* 1. Standard Types */}
        <h2 className="section-title">
          01. Standard Types <Edit3 size={16} />
        </h2>
        <p className="section-desc">Core interaction variants.</p>
        <div className="component-row">
          <Button variant="solid" intent="primary">
            Primary Button
          </Button>
          <Button variant="outline">Default Button</Button>
          <Button variant="dashed">Dashed Button</Button>
          <Button variant="text">Text Button</Button>
          <Button variant="link">Link Button</Button>
        </div>

        {/* 2. Ghost Buttons */}
        <h2 className="section-title">02. Ghost Context</h2>
        <p className="section-desc">
          Inverse/Transparent background usage. // BG: Slate-400
        </p>

        {/* Ghost Context Container */}
        <div className="ghost-bg">
          {/* Primary Ghost: Blue Border/Text */}
          <Button
            variant="outline"
            intent="primary"
            style={{ backgroundColor: 'transparent' }}
          >
            Primary
          </Button>

          {/* Default Ghost: White Border/Text */}
          <Button variant="outline" intent="white">
            Default
          </Button>

          {/* Dashed Ghost: White Dashed Border */}
          <Button variant="dashed" intent="white">
            Dashed
          </Button>

          {/* Danger Ghost: Red Border/Text */}
          <Button
            variant="outline"
            intent="danger"
            style={{ backgroundColor: 'transparent' }}
          >
            Danger
          </Button>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#64748b',
            marginTop: '12px',
          }}
        >
          * Ghost buttons invert their content color based on background
          contrast.
        </p>

        {/* 3. Logic/Sugar View (Visualizing the concept) */}
        <h2 className="section-title">03. Logic Map</h2>
        <p className="section-desc">Syntactic sugar visualization.</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr',
            gap: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            border: '1px solid #e2e8f0',
            padding: '16px',
          }}
        >
          <div style={{ color: '#64748b' }}>type="primary"</div>
          <div>
            <Button variant="solid" intent="primary" size="sm">
              Submit
            </Button>
          </div>

          <div style={{ color: '#64748b' }}>type="dashed"</div>
          <div>
            <Button variant="dashed" size="sm">
              Add Item
            </Button>
          </div>

          <div style={{ color: '#64748b' }}>type="link"</div>
          <div>
            <Button variant="link" size="sm" iconLeft={<LinkIcon size={12} />}>
              Read Docs
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
