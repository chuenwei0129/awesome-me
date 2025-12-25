import {
  Ban,
  Circle,
  CircleDot,
  Hash,
  MousePointer2,
  Shield,
} from 'lucide-react';
import React, { useState } from 'react';

// --- Types ---
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

// --- Blueprint Radio Component ---
const BlueprintRadio: React.FC<RadioProps> = ({
  label,
  disabled,
  readOnly,
  checked,
  description,
  className = '',
  ...props
}) => {
  // Determine state icon and styles based on props
  const isChecked = checked;
  const isDisabled = disabled;
  const isReadOnly = readOnly;

  // Icon Logic (Lucide)
  const Icon = isChecked ? CircleDot : Circle;

  // Style Logic (Flat Engineering)
  const baseColor = isDisabled ? 'text-slate-300' : 'text-slate-900';
  const labelColor = isDisabled ? 'text-slate-300' : 'text-slate-900';
  const cursorClass = isDisabled
    ? 'cursor-not-allowed'
    : isReadOnly
    ? 'cursor-default'
    : 'cursor-pointer';

  return (
    <label
      className={`group flex items-start gap-3 ${cursorClass} ${className}`}
    >
      <div className="relative flex items-center pt-0.5">
        <input
          type="radio"
          disabled={isDisabled}
          readOnly={isReadOnly}
          checked={isChecked}
          className="peer sr-only"
          {...props}
        />

        {/* Connector Line (Decorative for Blueprint Style) */}
        <div
          className={`absolute -left-4 top-1/2 w-3 h-[1px] bg-slate-200 transition-all group-hover:bg-slate-300 ${
            isDisabled ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Icon Control */}
        <Icon
          strokeWidth={1.5}
          size={20}
          className={`${baseColor} transition-colors duration-200`}
        />
      </div>

      <div className="flex flex-col">
        <span className={`font-sans text-sm font-medium ${labelColor}`}>
          {label}
        </span>

        {/* Technical Label (Monospace) */}
        {description && (
          <span className="font-mono text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};

// --- Main Specification Sheet Layout ---
const RadioSpecSheet = () => {
  // State for interactive demo (Row 1)
  const [selectedOpt, setSelectedOpt] = useState('default');

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans flex justify-center items-start">
      {/* DIAGRAM CANVAS */}
      <div className="w-full max-w-4xl bg-white border border-slate-300 shadow-none flex flex-col">
        {/* HEADER */}
        <header className="border-b border-slate-300 p-6 flex justify-between items-end bg-white">
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Hash size={14} />
              <span className="font-mono text-xs">SPEC-UI-01</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
              Radio Component
            </h1>
            <p className="font-mono text-xs text-slate-500 mt-1 uppercase tracking-wide">
              Flat Engineering Blueprint Style // Rev 1.0
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-mono text-xs text-slate-400">
              RENDER: VECTOR
            </div>
            <div className="font-mono text-xs text-slate-400">GRID: OFF</div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="p-8 grid gap-12">
          {/* SECTION 1: UNCHECKED STATE REPRESENTATION */}
          <section>
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-2">
              <div className="w-1.5 h-1.5 bg-slate-900" />
              <h2 className="font-mono text-sm font-bold text-slate-500 uppercase">
                01. Not Checked Style
              </h2>
              <div className="flex-1 border-t border-dashed border-slate-200 ml-4 h-px" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Item 1.1: Default */}
              <div className="relative border border-dashed border-slate-200 p-4">
                <div className="absolute top-0 right-0 p-1 bg-slate-50 border-b border-l border-slate-200">
                  <MousePointer2 size={12} className="text-slate-400" />
                </div>
                <BlueprintRadio
                  name="group1"
                  value="default"
                  label="Default"
                  checked={selectedOpt === 'other'} // Unchecked visual
                  onChange={() => setSelectedOpt('other')}
                  description="STATE: IDLE"
                />
              </div>

              {/* Item 1.2: Disabled */}
              <div className="relative border border-dashed border-slate-200 p-4 bg-slate-50/50">
                <div className="absolute top-0 right-0 p-1 bg-slate-100 border-b border-l border-slate-200">
                  <Ban size={12} className="text-slate-400" />
                </div>
                <BlueprintRadio
                  name="group1"
                  value="disabled"
                  label="Disabled"
                  disabled
                  checked={false}
                  description="OPACITY: 0.5"
                />
              </div>

              {/* Item 1.3: Readonly */}
              <div className="relative border border-dashed border-slate-200 p-4">
                <div className="absolute top-0 right-0 p-1 bg-slate-50 border-b border-l border-slate-200">
                  <Shield size={12} className="text-slate-400" />
                </div>
                <BlueprintRadio
                  name="group1"
                  value="readonly"
                  label="Readonly"
                  readOnly
                  checked={false}
                  description="INTERACTION: NONE"
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: CHECKED STATE REPRESENTATION */}
          <section>
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-2">
              <div className="w-1.5 h-1.5 bg-slate-900" />
              <h2 className="font-mono text-sm font-bold text-slate-500 uppercase">
                02. Checked Style
              </h2>
              <div className="flex-1 border-t border-dashed border-slate-200 ml-4 h-px" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Item 2.1: Default Checked */}
              <div className="relative border border-dashed border-slate-200 p-4">
                <BlueprintRadio
                  name="group2"
                  value="default_checked"
                  label="Default"
                  checked={true}
                  readOnly // Locked for display
                  description="ICON: CIRCLE_DOT"
                />

                {/* Technical Annotation Line */}
                <div className="absolute left-[26px] top-[28px] h-8 w-[1px] bg-slate-400" />
                <div className="absolute left-[26px] top-[60px] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border border-slate-400 bg-white" />
                  <span className="font-mono text-[10px] text-slate-500">
                    ACTIVE FILL #0F172A
                  </span>
                </div>
              </div>

              {/* Item 2.2: Disabled Checked */}
              <div className="relative border border-dashed border-slate-200 p-4 bg-slate-50/50">
                <BlueprintRadio
                  name="group2"
                  value="disabled_checked"
                  label="Disabled"
                  disabled
                  checked={true}
                  description="STROKE: SLATE-300"
                />
              </div>

              {/* Item 2.3: Readonly Checked */}
              <div className="relative border border-dashed border-slate-200 p-4">
                <BlueprintRadio
                  name="group2"
                  value="readonly_checked"
                  label="Readonly"
                  readOnly
                  checked={true}
                  description="INPUT: LOCKED"
                />
              </div>
            </div>
          </section>

          {/* FOOTER METADATA */}
          <footer className="mt-8 border-t border-slate-300 pt-6 flex flex-col md:flex-row justify-between text-xs font-mono text-slate-400">
            <div className="flex gap-8">
              <div>
                <span className="block text-slate-300 mb-1">COMPONENT ID</span>
                <span className="text-slate-500">RAD-001-BLU</span>
              </div>
              <div>
                <span className="block text-slate-300 mb-1">FRAMEWORK</span>
                <span className="text-slate-500">REACT / LUCIDE</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p>GENERATED OUTPUT</p>
              <p>NO DECORATIONS PERMITTED</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RadioSpecSheet;
