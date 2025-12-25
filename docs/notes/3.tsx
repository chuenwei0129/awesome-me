import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Loader2,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';

// --- CSS Styles ---
const styles = `
:root {
  /* 基础调色板 - Engineering Palette */
  --c-bg: #f8fafc;        /* Outer Background */
  --c-canvas: #ffffff;    /* Diagram Background */
  --c-border: #cbd5e1;    /* Slate-300 - Grid/Border Lines */
  --c-text-main: #0f172a; /* Slate-900 - Primary Text */
  --c-text-sub: #64748b;  /* Slate-500 - Metadata/Descriptions */
  
  /* 语义指示色 - High Contrast Solids */
  --c-brand:   #2563eb;  /* Blueprint Blue */
  --c-success: #16a34a;  /* Safety Green */
  --c-warning: #ea580c;  /* Alert Orange */
  --c-danger:  #dc2626;  /* Error Red */
  --c-white:   #ffffff;  /* Pure White */
  
  --font-ui: 'Inter', Helvetica, Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
}

body {
  background-color: var(--c-bg);
  color: var(--c-text-main);
  font-family: var(--font-ui);
  margin: 0;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

/* --- Blueprint Layout Container --- */
.blueprint-sheet {
  max-width: 800px;
  width: 100%;
  margin: 40px 20px;
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  padding: 40px;
  box-shadow: none;
}

.sheet-header {
  border-bottom: 2px solid var(--c-text-main);
  padding-bottom: 12px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.sheet-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sheet-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-text-sub);
}

/* --- Section Dividers --- */
.section-block {
  margin-bottom: 48px;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-text-sub);
  text-transform: uppercase;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--c-border);
  opacity: 0.5;
}

/* --- Component: Accordion --- */
.accordion-group {
  border: 1px solid var(--c-border);
  border-bottom: none; 
}

.acc-item {
  border-bottom: 1px solid var(--c-border);
}

.acc-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  background: transparent;
  transition: background 0.1s;
}
.acc-header:hover { background-color: #f1f5f9; }

.acc-index {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-sub);
  margin-right: 16px;
  padding: 2px 6px;
  border: 1px solid var(--c-border);
}

.acc-title {
  flex-grow: 1;
  font-weight: 600;
  font-size: 14px;
}

.acc-content {
  padding: 20px 20px 24px 58px;
  border-top: 1px dashed var(--c-border);
  background-color: #f8fafc;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  color: var(--c-text-sub);
}

/* --- Component: Button --- */
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-weight: 500;
  border: 1px solid transparent; /* Placeholder to maintain layout */
  cursor: pointer;
  transition: all 0.1s ease;
  box-sizing: border-box;
  text-decoration: none;
  line-height: 1;
  background: transparent;
}

/* Sizes */
.btn-sm { height: 28px; padding: 0 10px; font-size: 11px; }
.btn-md { height: 36px; padding: 0 16px; font-size: 12px; }
.btn-lg { height: 44px; padding: 0 24px; font-size: 13px; }

/* Variant: Solid (Filled) */
.btn-solid { background-color: var(--c-text-main); color: white; border-color: var(--c-text-main); }
.btn-solid.intent-primary { background: var(--c-brand); border-color: var(--c-brand); }
.btn-solid.intent-success { background: var(--c-success); border-color: var(--c-success); }
.btn-solid.intent-warning { background: var(--c-warning); border-color: var(--c-warning); }
.btn-solid.intent-danger  { background: var(--c-danger); border-color: var(--c-danger); }
.btn-solid:hover { opacity: 0.9; }

/* Variant: Outline (Bordered) */
.btn-outline { border-color: var(--c-border); color: var(--c-text-main); background: var(--c-canvas); }
.btn-outline.intent-primary { border-color: var(--c-brand); color: var(--c-brand); }
.btn-outline.intent-success { border-color: var(--c-success); color: var(--c-success); }
.btn-outline.intent-warning { border-color: var(--c-warning); color: var(--c-warning); }
.btn-outline.intent-danger  { border-color: var(--c-danger); color: var(--c-danger); }
.btn-outline.intent-white   { border-color: var(--c-white); color: var(--c-white); background: transparent; }
.btn-outline:hover { background-color: #f1f5f9; }
.btn-outline.intent-white:hover { background-color: rgba(255,255,255,0.1); }

/* Variant: Dashed */
.btn-dashed { border-style: dashed; border-color: var(--c-border); color: var(--c-text-main); }
.btn-dashed.intent-white { border-color: var(--c-white); color: var(--c-white); }
.btn-dashed:hover { border-color: var(--c-text-sub); }

/* Variant: Text (No Border) */
.btn-text { color: var(--c-text-main); }
.btn-text:hover { background-color: #f1f5f9; }

/* Variant: Link */
.btn-link { color: var(--c-brand); padding: 0; height: auto; border: none; }
.btn-link:hover { text-decoration: underline; }

/* State: Disabled (Hatch Pattern) */
.btn:disabled, .btn.is-disabled {
  cursor: not-allowed;
  background-image: repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 4px, #e2e8f0 4px, #e2e8f0 8px);
  background-color: #f1f5f9;
  border-color: #cbd5e1 !important;
  color: #94a3b8 !important;
}

/* State: Ghost Container */
.ghost-zone {
  background-color: #94a3b8; /* Slate 400 */
  padding: 24px;
  border: 1px solid var(--c-border);
  display: flex;
  gap: 16px;
  align-items: center;
}

/* Button Group */
.btn-group { display: flex; }
.btn-group .btn { margin-right: -1px; border-radius: 0; }
.btn-group .btn:hover { z-index: 2; position: relative; }
.btn-group .btn-solid { z-index: 1; }

.icon { width: 14px; height: 14px; stroke-width: 2px; }
`;

// --- React Components ---

// 1. Button Component
const Button = ({
  children,
  variant = 'outline',
  intent,
  size = 'md',
  isDisabled,
  isLoading,
  iconLeft,
  iconRight,
  style,
}) => {
  const intentClass = intent ? `intent-${intent}` : '';
  const loadingIcon = <Loader2 className="icon animate-spin" />;

  return (
    <button
      className={`btn btn-${size} btn-${variant} ${intentClass} ${
        isDisabled ? 'is-disabled' : ''
      }`}
      disabled={isDisabled || isLoading}
      style={style}
    >
      {isLoading
        ? loadingIcon
        : iconLeft && <span className="icon-wrap">{iconLeft}</span>}
      {children}
      {!isLoading && iconRight && (
        <span className="icon-wrap">{iconRight}</span>
      )}
    </button>
  );
};

// 2. Button Group Component
const ButtonGroup = ({ children }) => (
  <div className="btn-group">{children}</div>
);

// 3. Accordion Component
const AccordionItem = ({ index, title, children, isOpen, onClick }) => {
  return (
    <div className={`acc-item ${isOpen ? 'active' : ''}`}>
      <div className="acc-header" onClick={onClick}>
        <span className="acc-index">{index}</span>
        <span className="acc-title">{title}</span>
        {isOpen ? (
          <ChevronUp className="icon" />
        ) : (
          <ChevronDown className="icon" />
        )}
      </div>
      {isOpen && <div className="acc-content">{children}</div>}
    </div>
  );
};

// --- Main Application / Spec Sheet ---
export default function FlatEngineeringDesign() {
  const [openSection, setOpenSection] = useState(0);

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-sheet">
        {/* Header */}
        <header className="sheet-header">
          <div className="sheet-title">System_UI_Kit // Ver. 3.0</div>
          <div className="sheet-meta">STYLE: FLAT ENG. // ID: 89-XJ</div>
        </header>

        {/* Module 01: Information Architecture */}
        <section className="section-block">
          <div className="section-label">01 // Information Architecture</div>

          <div className="accordion-group">
            <AccordionItem
              index="01"
              title="What is Base UI?"
              isOpen={openSection === 0}
              onClick={() => setOpenSection(0)}
            >
              Base UI is a library of high-quality unstyled React components for
              design systems. It provides the structural logic without imposing
              specific visual styles.
            </AccordionItem>

            <AccordionItem
              index="02"
              title="How do I get started?"
              isOpen={openSection === 1}
              onClick={() => setOpenSection(1)}
            >
              Install the package via npm or yarn. Configuration files can be
              generated using the CLI tool 'npx init-base-ui'.
            </AccordionItem>

            <AccordionItem
              index="03"
              title="Licensing Details"
              isOpen={openSection === 2}
              onClick={() => setOpenSection(2)}
            >
              MIT License. Free for commercial and personal use. Attribution is
              appreciated but not strictly required.
            </AccordionItem>
          </div>
        </section>

        {/* Module 02: Control Elements */}
        <section className="section-block">
          <div className="section-label">02 // Control Elements (Buttons)</div>

          {/* 2.1 Standard Types */}
          <div className="btn-row">
            <Button variant="solid" intent="primary">
              Primary Button
            </Button>
            <Button variant="outline">Default Button</Button>
            <Button variant="dashed">Dashed Button</Button>
            <Button variant="text">Text Button</Button>
            <Button variant="link" iconLeft={<LinkIcon size={12} />}>
              Link Button
            </Button>
          </div>

          {/* 2.2 Semantic States */}
          <div className="btn-row">
            <Button variant="solid" intent="primary">
              Save
            </Button>
            <Button
              variant="solid"
              intent="warning"
              iconLeft={<AlertTriangle size={12} />}
            >
              Warning
            </Button>
            <Button
              variant="solid"
              intent="danger"
              iconLeft={<XCircle size={12} />}
            >
              Error
            </Button>
            <Button
              variant="solid"
              intent="success"
              iconLeft={<CheckCircle2 size={12} />}
            >
              Success
            </Button>
          </div>

          {/* 2.3 Outline States */}
          <div className="btn-row">
            <Button variant="outline" intent="primary">
              Primary
            </Button>
            <Button variant="outline" intent="warning">
              Warning
            </Button>
            <Button variant="outline" intent="danger">
              Error
            </Button>
            <Button variant="outline" intent="success">
              Success
            </Button>
          </div>

          {/* 2.4 Functional States (Loading / Disabled / Sizes) */}
          <div className="btn-row">
            <Button isLoading intent="primary">
              Loading
            </Button>
            <Button isDisabled>Disabled</Button>
            <div
              style={{
                width: 1,
                height: 20,
                background: '#cbd5e1',
                margin: '0 10px',
              }}
            ></div>
            <Button size="sm" intent="primary">
              Small
            </Button>
            <Button size="md" intent="primary">
              Medium
            </Button>
            <Button size="lg" intent="primary">
              Large
            </Button>
          </div>

          {/* 2.5 Button Group */}
          <div className="btn-row">
            <ButtonGroup>
              <Button variant="outline" intent="primary">
                Left
              </Button>
              <Button variant="outline" intent="primary">
                Center
              </Button>
              <Button variant="outline" intent="primary">
                Right
              </Button>
            </ButtonGroup>
          </div>
        </section>

        {/* Module 03: Contextual Variants (Ghost) */}
        <section className="section-block">
          <div className="section-label">
            03 // Ghost Context (Dark Background)
          </div>

          <div className="ghost-zone">
            {/* Primary Ghost: Blue Border/Text on Grey */}
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
              fontSize: 11,
              color: 'var(--c-text-sub)',
              marginTop: 8,
            }}
          >
            * Ghost buttons utilize 'intent-white' or transparent backgrounds
            for high contrast on slate-400.
          </p>
        </section>
      </div>
    </>
  );
}
