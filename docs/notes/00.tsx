import { Hash, Monitor } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';

// --- Context for Radio Group (Reused for Logic) ---
interface RadioGroupContextType {
  value?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
}
const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

// --- Types ---
interface ButtonRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  className?: string;
}

// --- Blueprint Button Radio Item ---
const BlueprintButtonRadio: React.FC<ButtonRadioProps> = ({
  label,
  value,
  disabled,
  readOnly,
  className = '',
  icon,
  ...props
}) => {
  const groupContext = useContext(RadioGroupContext);

  const isChecked = groupContext ? groupContext.value === value : false;
  const isDisabled = disabled;

  // Handlers
  const handleClick = () => {
    if (isDisabled || readOnly) return;
    if (groupContext && groupContext.onChange) {
      groupContext.onChange(value);
    }
  };

  // --- STYLE LOGIC ---
  // 1. Base Structure: Sharp corners, mono-spaced alignment hints
  const baseStyles =
    'relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-150 select-none focus:outline-none';

  // 2. State Styles
  let stateStyles = '';

  if (isDisabled) {
    stateStyles = 'text-slate-300 cursor-not-allowed bg-transparent';
  } else if (isChecked) {
    // ACTIVE: High contrast, White BG, Solid Dark Border
    stateStyles =
      'bg-white text-slate-900 border border-slate-900 z-10 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.1)]';
  } else {
    // INACTIVE: Slate BG, Subtle Border, Dim Text
    stateStyles =
      'bg-slate-50 text-slate-500 border border-transparent hover:border-slate-300 hover:bg-white hover:text-slate-700 cursor-pointer';
  }

  return (
    <label className={`flex-1 ${className}`}>
      <input
        type="radio"
        name={groupContext?.name}
        value={value}
        disabled={isDisabled}
        checked={isChecked}
        onChange={() => {}} // Handled by div click for custom styling
        className="sr-only"
        {...props}
      />
      <div onClick={handleClick} className={`${baseStyles} ${stateStyles}`}>
        {/* Technical Corner Marker for Active State */}
        {isChecked && (
          <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-slate-900" />
        )}

        {icon && <span className="opacity-80">{icon}</span>}
        <span className={isChecked ? 'font-bold' : 'font-normal'}>{label}</span>
      </div>
    </label>
  );
};

// --- Blueprint Radio Group Container ---
const ButtonRadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value: controlledValue,
  defaultValue,
  onChange,
  name,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleGroupChange = (val: string | number) => {
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(val);
  };

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onChange: handleGroupChange, name }}
    >
      {/* Container: Slate-200 background acts as the "gap" or border between items */}
      <div
        className={`inline-flex bg-slate-200 p-[1px] border border-slate-300 gap-[1px] ${className}`}
        role="group"
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// --- Main Specification Sheet Layout ---
const ButtonRadioSpec = () => {
  const [fruit, setFruit] = useState<string | number>('Apple');

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white border border-slate-300 shadow-none flex flex-col">
        {/* HEADER */}
        <header className="border-b border-slate-300 p-6 flex justify-between items-end bg-white">
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Hash size={14} />
              <span className="font-mono text-xs">SPEC-UI-03</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
              Segmented Control
            </h1>
            <p className="font-mono text-xs text-slate-500 mt-1 uppercase tracking-wide">
              Style: Button Radio // Flat Engineering
            </p>
          </div>
          <div className="font-mono text-xs text-slate-400 text-right">
            <div>TYPE: SELECTOR</div>
            <div>BORDER-RADIUS: 0px</div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-8 grid gap-12">
          {/* SECTION: PREVIEW */}
          <section>
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-2">
              <div className="w-1.5 h-1.5 bg-slate-900" />
              <h2 className="font-mono text-sm font-bold text-slate-500 uppercase">
                01. Live Component
              </h2>
            </div>

            {/* THE COMPONENT RENDER */}
            <div className="border border-dashed border-slate-300 p-12 bg-slate-50/30 flex flex-col items-center justify-center gap-8">
              {/* Actual Button Radio Group */}
              <ButtonRadioGroup
                value={fruit}
                onChange={setFruit}
                className="w-full max-w-lg shadow-sm"
              >
                <BlueprintButtonRadio label="Apple" value="Apple" />
                <BlueprintButtonRadio label="Orange" value="Orange" />
                <BlueprintButtonRadio label="Banana" value="Banana" />
                <BlueprintButtonRadio
                  label="Watermelon"
                  value="Watermelon"
                  disabled
                />
              </ButtonRadioGroup>

              {/* Data Readout */}
              <div className="font-mono text-xs text-slate-400 flex items-center gap-2 mt-4">
                <Monitor size={12} />
                <span>
                  SELECTED_VALUE:{' '}
                  <span className="text-slate-900 font-bold">"{fruit}"</span>
                </span>
              </div>
            </div>
          </section>

          {/* SECTION: ANATOMY */}
          <section>
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-2">
              <div className="w-1.5 h-1.5 bg-slate-900" />
              <h2 className="font-mono text-sm font-bold text-slate-500 uppercase">
                02. Anatomy & States
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-slate-500">
              {/* State 1: Active */}
              <div className="border border-slate-200 p-4">
                <div className="mb-2 text-slate-400 uppercase">
                  Active State
                </div>
                <div className="bg-white border border-slate-900 text-slate-900 px-4 py-2 font-bold text-center relative mb-2">
                  Apple
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-slate-900" />
                </div>
                <ul className="list-disc list-inside space-y-1 text-[10px]">
                  <li>Bg: White (#ffffff)</li>
                  <li>Border: Solid 1px Slate-900</li>
                  <li>Corner Marker: Top-Right</li>
                </ul>
              </div>

              {/* State 2: Default */}
              <div className="border border-slate-200 p-4">
                <div className="mb-2 text-slate-400 uppercase">Idle State</div>
                <div className="bg-slate-50 text-slate-500 border border-transparent px-4 py-2 text-center mb-2">
                  Orange
                </div>
                <ul className="list-disc list-inside space-y-1 text-[10px]">
                  <li>Bg: Slate-50 (#f8fafc)</li>
                  <li>Text: Slate-500</li>
                  <li>Border: None (Spacer only)</li>
                </ul>
              </div>

              {/* State 3: Disabled */}
              <div className="border border-slate-200 p-4">
                <div className="mb-2 text-slate-400 uppercase">
                  Disabled State
                </div>
                <div className="bg-transparent text-slate-300 border border-transparent px-4 py-2 text-center mb-2 dashed border-slate-200">
                  Watermelon
                </div>
                <ul className="list-disc list-inside space-y-1 text-[10px]">
                  <li>Opacity: Reduced</li>
                  <li>Pointer: Not-Allowed</li>
                  <li>Interaction: Null</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ButtonRadioSpec;
