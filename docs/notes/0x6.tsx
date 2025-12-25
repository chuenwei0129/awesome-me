import { AlignCenter, AlignLeft, AlignRight, Hash, Minus } from 'lucide-react';
import React from 'react';

/**
 * Design System: Flat Engineering Blueprint
 * Colors:
 * - Border/Lines: Slate-300 (#cbd5e1)
 * - Text Main: Slate-900 (#0f172a)
 * - Text Sub: Slate-500 (#64748b)
 * - Background: White (#ffffff)
 */

interface BlueprintDividerProps {
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  variant?: 'solid' | 'dashed' | 'dotted';
  margin?: number; // Custom margin in pixels for left/right alignment
  icon?: React.ElementType; // Optional Lucide icon
  className?: string;
}

const BlueprintDivider: React.FC<BlueprintDividerProps> = ({
  children,
  align = 'center',
  variant = 'solid',
  margin = 0,
  icon: Icon,
  className = '',
}) => {
  // Line Styles mapping
  const lineStyles = {
    solid: 'border-t border-slate-300',
    dashed: 'border-t border-dashed border-slate-300',
    dotted: 'border-t border-dotted border-slate-300',
  };

  // Common line class
  const lineClass = `flex-grow ${lineStyles[variant]}`;

  // Content styles (Technical Label Look)
  const contentClass =
    'flex items-center gap-2 px-3 text-sm font-medium text-slate-900 font-sans whitespace-nowrap';

  return (
    <div
      className={`flex items-center w-full py-4 ${className}`}
      role="separator"
    >
      {/* Left Line logic */}
      {align === 'center' && <div className={lineClass} />}
      {align === 'right' && <div className={lineClass} />}
      {align === 'left' && margin > 0 && (
        <div style={{ width: `${margin}px`, flexGrow: 0 }} />
      )}

      {/* Content */}
      {(children || Icon) && (
        <div className={contentClass}>
          {Icon && <Icon size={16} className="text-slate-500 stroke-[1.5]" />}
          {children}
        </div>
      )}

      {/* Right Line logic */}
      {align === 'center' && <div className={lineClass} />}
      {align === 'left' && <div className={lineClass} />}
      {align === 'right' && margin > 0 && (
        <div style={{ width: `${margin}px`, flexGrow: 0 }} />
      )}
    </div>
  );
};

// --- Demo Presentation Component ---
// This component simulates the "Technical Spec Sheet" look requested.

const DividerShowcase = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-slate-300 shadow-none">
        {/* Header - Engineering Blueprint Style */}
        <div className="border-b border-slate-300 p-6">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
            Component Specification: Divider
          </h1>
          <div className="flex gap-4 mt-2 text-xs font-mono text-slate-500">
            <span>VER: 1.0.2</span>
            <span>UID: DIV-001</span>
            <span>STATUS: PROTOTYPE</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Section 1: Line Variants */}
          <section>
            <h2 className="text-xs font-mono uppercase text-slate-500 mb-4 border-l-2 border-slate-900 pl-2">
              01. Line Variants
            </h2>
            <div className="space-y-2">
              <p className="text-slate-600 text-sm mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                nonne merninisti licere mihi ista probare.
              </p>

              <BlueprintDivider variant="solid">Solid</BlueprintDivider>

              <p className="text-slate-600 text-sm py-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <BlueprintDivider variant="dotted" icon={Hash}>
                Dotted
              </BlueprintDivider>

              <p className="text-slate-600 text-sm py-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <BlueprintDivider variant="dashed" icon={Minus}>
                Dashed
              </BlueprintDivider>
            </div>
          </section>

          {/* Section 2: Alignment & Margins */}
          <section className="mt-12">
            <h2 className="text-xs font-mono uppercase text-slate-500 mb-4 border-l-2 border-slate-900 pl-2">
              02. Alignment & Offset Data
            </h2>

            <div className="space-y-6">
              {/* Center */}
              <div>
                <BlueprintDivider align="center" icon={AlignCenter}>
                  Text Center
                </BlueprintDivider>
                <p className="text-slate-600 text-sm mt-2">
                  Standard center alignment splits the canvas width equally.
                </p>
              </div>

              {/* Left Default */}
              <div>
                <BlueprintDivider align="left" icon={AlignLeft}>
                  Left Text
                </BlueprintDivider>
                <p className="text-slate-600 text-sm mt-2">
                  Left aligned content flows from the start vector.
                </p>
              </div>

              {/* Right Default */}
              <div>
                <BlueprintDivider align="right" icon={AlignRight}>
                  Right Text
                </BlueprintDivider>
              </div>

              {/* Margins */}
              <div>
                <BlueprintDivider align="left" margin={0} variant="dashed">
                  Left Text margin 0
                </BlueprintDivider>
                <BlueprintDivider align="right" margin={50} variant="dashed">
                  Right Text margin 50px
                </BlueprintDivider>
                <p className="text-slate-600 text-sm mt-2">
                  Custom margins applied to mimic engineering tolerances.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DividerShowcase;
