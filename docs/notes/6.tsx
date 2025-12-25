import React from 'react';

// Shared types for the demo
interface BlueprintOTPProps {
  length?: number;
  disabled?: boolean;
  value?: string[];
  variant?: 'outline' | 'filled';
  separator?: React.ReactNode;
  label: string;
  code: string; // Technical reference code
}

const BlueprintOTPShowcase = () => {
  // Reusable Slot Component
  const Slot = ({
    char,
    isActive,
    disabled,
    variant,
  }: {
    char: string;
    isActive?: boolean;
    disabled?: boolean;
    variant?: 'outline' | 'filled';
  }) => {
    return (
      <div
        className={`otp-slot ${variant} ${disabled ? 'disabled' : ''} ${
          isActive ? 'active' : ''
        }`}
      >
        <span className="slot-value">{char}</span>
        {/* Technical corner markers for 'active' slots */}
        {isActive && !disabled && (
          <>
            <div className="corner tr"></div>
            <div className="corner bl"></div>
          </>
        )}
      </div>
    );
  };

  // The OTP Group Component
  const BlueprintOTP = ({
    length = 6,
    disabled = false,
    value = [],
    variant = 'outline',
    separator,
    label,
    code,
  }: BlueprintOTPProps) => {
    // Generate array of slots
    const slots = Array.from({ length });

    return (
      <div className="spec-block">
        <div className="spec-header">
          <span className="spec-code">{code}</span>
          <span className="spec-label">{label}</span>
        </div>

        <div className="otp-container">
          {slots.map((_, index) => (
            <React.Fragment key={index}>
              <Slot
                char={value[index] || ''}
                isActive={!disabled && index === value.length && index < length} // Simulate cursor at next empty pos
                disabled={disabled}
                variant={variant}
              />
              {/* Render Separator if not the last item */}
              {separator && index < length - 1 && (
                <div className="separator-wrapper">
                  {typeof separator === 'function'
                    ? separator(index)
                    : separator}
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Technical Dimension Line */}
          <div className="dim-line-horizontal">
            <span className="dim-label">LEN: {length} UNITS</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="blueprint-wrapper">
      <div className="blueprint-canvas">
        <header className="doc-header">
          <h1 className="main-title">PIN_INPUT_MODULE</h1>
          <div className="meta-info">
            <span>FIG 3.0 // DISCRETE_INPUT_ARRAY</span>
            <span>SCALE: 1:1</span>
          </div>
        </header>

        <div className="grid-layout">
          {/* 1. With Formatter */}
          <BlueprintOTP
            code="CFG-01"
            label="FORMATTER: UPPERCASE"
            value={['2', '2', '2', '2', '2']}
          />

          {/* 2. With Disabled */}
          <BlueprintOTP
            code="CFG-02"
            label="STATE: DISABLED_MODE"
            disabled={true}
          />

          {/* 3. With Length (8) */}
          <BlueprintOTP
            code="CFG-03"
            label="ATTR: LENGTH_8"
            length={8}
            value={['1', '1', '1', '1', '1', '1', '1', '2']}
          />

          {/* 4. With Variant (Filled) */}
          <BlueprintOTP
            code="CFG-04"
            label="STYLE: SOLID_FILL"
            variant="filled"
            value={[]} // Empty example
          />

          {/* 5. Custom Display (Masked/Password intent in blueprint) */}
          <BlueprintOTP
            code="CFG-05"
            label="MASK: SECURE_CHAR"
            value={['*', '*', '*', '*', '*', '*']}
          />

          {/* 6. Custom ReactNode Separator */}
          <BlueprintOTP
            code="CFG-06"
            label="SEP: NODE_TYPE_SLASH"
            value={['', '', '', '', '', '']}
            separator={<span className="sep-char">/</span>}
          />

          {/* 7. Custom Function Separator */}
          <BlueprintOTP
            code="CFG-07"
            label="SEP: FUNC_TYPE_DASH"
            value={['', '', '', '', '', '']}
            separator={<span className="sep-char">-</span>}
          />
        </div>
      </div>

      <style>{`
        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-border-active: #0f172a;
          --c-text: #0f172a;
          --c-text-sub: #64748b;
          --font-tech: 'JetBrains Mono', 'Consolas', monospace;
          --font-label: 'Inter', sans-serif;
        }

        .blueprint-wrapper {
          background-color: var(--c-bg);
          padding: 40px;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .blueprint-canvas {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          padding: 48px;
          width: 100%;
          max-width: 800px;
        }

        /* Header */
        .doc-header {
          border-bottom: 2px solid var(--c-text);
          padding-bottom: 16px;
          margin-bottom: 48px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .main-title {
          font-family: var(--font-label);
          font-size: 24px;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .meta-info {
          font-family: var(--font-tech);
          font-size: 11px;
          color: var(--c-text-sub);
          text-align: right;
          display: flex;
          flex-direction: column;
        }

        /* Grid */
        .grid-layout {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* Component Block */
        .spec-block {
          position: relative;
        }

        .spec-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .spec-code {
          background: var(--c-text);
          color: #fff;
          font-family: var(--font-tech);
          font-size: 10px;
          padding: 2px 6px;
        }

        .spec-label {
          font-family: var(--font-label);
          font-size: 12px;
          font-weight: 600;
          color: var(--c-text-sub);
          text-transform: uppercase;
        }

        /* OTP Container */
        .otp-container {
          display: flex;
          align-items: center;
          gap: 8px; /* Gap between slots */
          position: relative;
          padding-bottom: 16px; /* Space for dim line */
        }

        /* The Slot (Box) */
        .otp-slot {
          width: 40px;
          height: 48px;
          border: 1px solid var(--c-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-tech);
          font-size: 16px;
          color: var(--c-text);
          background: #fff;
          position: relative;
        }

        /* Variant: Outline (Default) */
        .otp-slot.outline {
          /* standard border */
        }

        /* Variant: Filled */
        .otp-slot.filled {
          background-color: #f1f5f9;
          border-color: transparent;
        }

        /* State: Active (Simulated Focus) */
        .otp-slot.active {
          border: 2px solid var(--c-border-active);
          z-index: 1;
        }

        /* State: Disabled */
        .otp-slot.disabled {
          /* Hatching pattern */
          background-image: repeating-linear-gradient(
            45deg,
            var(--c-canvas),
            var(--c-canvas) 4px,
            #e2e8f0 4px,
            #e2e8f0 8px
          );
          color: var(--c-text-sub);
          border-color: var(--c-border);
        }

        /* Separator */
        .separator-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
        }

        .sep-char {
          font-family: var(--font-tech);
          color: var(--c-text-sub);
          font-size: 14px;
        }

        /* Technical Markers */
        .corner {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--c-text);
        }
        .tr { top: 0; right: 0; }
        .bl { bottom: 0; left: 0; }

        /* Dimension Line */
        .dim-line-horizontal {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 6px;
          border-left: 1px solid var(--c-border);
          border-right: 1px solid var(--c-border);
          display: flex;
          justify-content: center;
        }
        
        .dim-line-horizontal::before {
           content: '';
           position: absolute;
           top: 50%;
           left: 0;
           right: 0;
           height: 1px;
           background: var(--c-border);
        }

        .dim-label {
          background: var(--c-canvas);
          padding: 0 4px;
          font-family: var(--font-tech);
          font-size: 9px;
          color: var(--c-text-sub);
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default BlueprintOTPShowcase;
