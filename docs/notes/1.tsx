import { ArrowRight, Home, Loader2 } from 'lucide-react';
import React from 'react';

// --- CSS Styles (可以将此部分放入单独的 CSS 文件或 style 标签中) ---
const styles = `
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  
  --c-primary: #0f172a;  /* Slate 900 */
  --c-success: #16a34a;  /* Green 600 */
  --c-warning: #ea580c;  /* Orange 600 */
  --c-danger:  #dc2626;  /* Red 600 */
  
  --font-ui: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

body {
  background-color: var(--c-bg);
  color: var(--c-text-main);
  font-family: var(--font-ui);
}

/* 蓝图容器 */
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
}

.section-desc {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-sub);
  margin-bottom: 24px;
  margin-top: -16px;
}

.component-row {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  align-items: center;
}

/* --- Button Component Styles --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.1s ease;
  box-sizing: border-box;
  text-decoration: none;
  line-height: 1;
}

/* Sizes */
.btn-sm { height: 32px; padding: 0 12px; font-size: 12px; }
.btn-md { height: 40px; padding: 0 20px; font-size: 13px; }
.btn-lg { height: 48px; padding: 0 32px; font-size: 14px; }

/* Variants: Solid */
.btn-solid.intent-primary { background: var(--c-primary); color: white; border-color: var(--c-primary); }
.btn-solid.intent-success { background: var(--c-success); color: white; border-color: var(--c-success); }
.btn-solid.intent-warning { background: var(--c-warning); color: white; border-color: var(--c-warning); }
.btn-solid.intent-danger  { background: var(--c-danger);  color: white; border-color: var(--c-danger); }

/* Variants: Outline */
.btn-outline { background: var(--c-canvas); }
.btn-outline.intent-primary { border-color: var(--c-primary); color: var(--c-primary); }
.btn-outline.intent-success { border-color: var(--c-success); color: var(--c-success); }
.btn-outline.intent-warning { border-color: var(--c-warning); color: var(--c-warning); }
.btn-outline.intent-danger  { border-color: var(--c-danger);  color: var(--c-danger); }

/* Hover Effects (Engineering Style: Invert or Thicken) */
.btn-solid:hover { opacity: 0.9; }
.btn-outline:hover { background-color: #f1f5f9; }

/* Disabled State: Engineering Hatch Pattern */
.btn:disabled, .btn.is-disabled {
  cursor: not-allowed;
  background-image: repeating-linear-gradient(
    45deg,
    #e2e8f0,
    #e2e8f0 4px,
    #f1f5f9 4px,
    #f1f5f9 8px
  );
  background-color: #f1f5f9;
  border-color: #cbd5e1 !important;
  color: #94a3b8 !important;
}

/* Button Group */
.btn-group {
  display: flex;
}
.btn-group .btn {
  margin-right: -1px; /* Overlap borders */
}
.btn-group .btn:hover {
  z-index: 1; /* Bring hovered to top */
  position: relative;
}

/* Icons */
.btn-icon { width: 16px; height: 16px; }
`;

// --- React Components ---

type ButtonProps = {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline';
  intent?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  // For demo purposes mostly
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  intent = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  iconLeft,
  iconRight,
  style,
}) => {
  const loadingIcon = <Loader2 className="btn-icon animate-spin" />;

  return (
    <button
      className={`btn btn-${size} btn-${variant} intent-${intent} ${
        isDisabled ? 'is-disabled' : ''
      }`}
      disabled={isDisabled || isLoading}
      style={style}
    >
      {isLoading && loadingIcon}
      {!isLoading && iconLeft && (
        <span className="btn-icon-wrapper">{iconLeft}</span>
      )}
      {children}
      {!isLoading && iconRight && (
        <span className="btn-icon-wrapper">{iconRight}</span>
      )}
    </button>
  );
};

const ButtonGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="btn-group">{children}</div>;
};

// --- Main Page / Documentation ---

export default function ButtonSpecSheet() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        {/* 1. Basic Usage */}
        <h2 className="section-title">01. Basic Usage</h2>
        <p className="section-desc">
          Standard interaction elements. // REF: Brand vs Outline
        </p>
        <div className="component-row">
          <Button variant="solid" intent="primary">
            Brand
          </Button>
          <Button variant="outline" intent="primary">
            Outline
          </Button>
        </div>

        {/* 2. Icon Buttons */}
        <h2 className="section-title">02. Icon Interface</h2>
        <p className="section-desc">Glyph-based inputs. // LIB: Lucide React</p>
        <div className="component-row">
          <Button variant="solid" intent="primary" size="md">
            <Home className="btn-icon" />
          </Button>
          <Button
            variant="solid"
            intent="primary"
            iconRight={<ArrowRight className="btn-icon" />}
          >
            Go
          </Button>
        </div>

        {/* 3. Button States & Colors */}
        <h2 className="section-title">03. Signal States</h2>
        <p className="section-desc">
          Semantic color mapping. // Primary, Warning, Error, Success
        </p>

        {/* Row 1: Solid */}
        <div className="component-row">
          <Button intent="primary">Primary</Button>
          <Button intent="warning">Warning</Button>
          <Button intent="danger">Error</Button>
          <Button intent="success">Success</Button>
        </div>

        {/* Row 2: Outline */}
        <div className="component-row">
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

        {/* 4. Disabled State */}
        <h2 className="section-title">04. Disabled State</h2>
        <p className="section-desc">
          Non-interactive elements. // VISUAL: Hatch Pattern
        </p>
        <div className="component-row">
          <Button isDisabled intent="primary">
            Primary
          </Button>
          <Button isDisabled intent="warning">
            Warning
          </Button>
          <Button isDisabled variant="outline" intent="danger">
            Error
          </Button>
        </div>

        {/* 5. Loading State */}
        <h2 className="section-title">05. Async State</h2>
        <p className="section-desc">Process indicators. // ANIM: Spin</p>
        <div className="component-row">
          <Button isLoading intent="primary">
            Loading
          </Button>
          <Button isLoading variant="outline" intent="warning">
            Wait
          </Button>
          <Button isLoading variant="outline" intent="primary" size="lg">
            Processing
          </Button>
        </div>

        {/* 6. Dimensions */}
        <h2 className="section-title">06. Dimensions</h2>
        <p className="section-desc">
          Size variants. // SM (32px), MD (40px), LG (48px)
        </p>
        <div className="component-row" style={{ alignItems: 'flex-start' }}>
          <Button size="sm" intent="primary">
            Small
          </Button>
          <Button size="md" intent="primary">
            Default
          </Button>
          <Button size="lg" intent="primary">
            Large
          </Button>
        </div>

        {/* 7. Grouped */}
        <h2 className="section-title">07. Control Groups</h2>
        <p className="section-desc">
          Combined inputs. // LAYOUT: Flex / Overlap
        </p>
        <div className="component-row">
          <ButtonGroup>
            <Button variant="outline" intent="primary">
              Left
            </Button>
            <Button variant="outline" intent="primary">
              Middle
            </Button>
            <Button variant="outline" intent="primary">
              Right
            </Button>
          </ButtonGroup>

          <div style={{ width: 20 }}></div>

          <ButtonGroup>
            <Button variant="solid" intent="primary">
              Year
            </Button>
            <Button variant="outline" intent="primary">
              Month
            </Button>
            <Button variant="outline" intent="primary">
              Day
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
