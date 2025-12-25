import { Circle, CircleDot, GitMerge, Hash, Layers } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';

// --- Context for Radio Group ---
interface RadioGroupContextType {
  value?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
}
const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

// --- Types ---
interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string | number; // Value is mandatory for Group items
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  className?: string;
}

// --- Blueprint Radio Component (Updated) ---
const BlueprintRadio: React.FC<RadioProps> = ({
  label,
  value,
  disabled,
  readOnly,
  checked: propChecked,
  description,
  className = '',
  onChange,
  name,
  ...props
}) => {
  const groupContext = useContext(RadioGroupContext);

  // Logic: Use Group Context if available, otherwise fallback to local props
  const isChecked = groupContext ? groupContext.value === value : propChecked;
  const isDisabled = disabled; // Could extend to groupContext.disabled if needed
  const isReadOnly = readOnly;

  // Handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled || isReadOnly) return;

    if (groupContext && groupContext.onChange) {
      groupContext.onChange(value);
    }

    if (onChange) {
      onChange(e);
    }
  };

  // Styles & Icons
  const Icon = isChecked ? CircleDot : Circle;
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
          name={groupContext?.name || name}
          disabled={isDisabled}
          readOnly={isReadOnly}
          checked={isChecked}
          onChange={handleChange}
          value={value}
          className="peer sr-only"
          {...props}
        />

        {/* Connector Line (Decorative) */}
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
        {description && (
          <span className="font-mono text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};

// --- Blueprint Radio Group Component ---
const RadioGroup: React.FC<RadioGroupProps> = ({
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
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onChange: handleGroupChange, name }}
    >
      <div className={`flex flex-wrap gap-8 ${className}`} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// --- Main Specification Sheet Layout ---
const RadioGroupSpec = () => {
  // State for the interactive Group Demo
  const [groupValue, setGroupValue] = useState<string | number>('option3');

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans flex justify-center items-start">
      {/* DIAGRAM CANVAS */}
      <div className="w-full max-w-4xl bg-white border border-slate-300 shadow-none flex flex-col">
        {/* HEADER */}
        <header className="border-b border-slate-300 p-6 flex justify-between items-end bg-white">
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Hash size={14} />
              <span className="font-mono text-xs">SPEC-UI-02</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
              Radio Group
            </h1>
            <p className="font-mono text-xs text-slate-500 mt-1 uppercase tracking-wide">
              Logic & Layout // Rev 1.1
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-mono text-xs text-slate-400">
              STATUS: ACTIVE
            </div>
            <div className="font-mono text-xs text-slate-400">
              MODE: INTERACTIVE
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="p-8 grid gap-12">
          {/* SECTION: GROUP FUNCTIONALITY */}
          <section>
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-2">
              <div className="w-1.5 h-1.5 bg-slate-900" />
              <h2 className="font-mono text-sm font-bold text-slate-500 uppercase">
                01. Radio Group Logic
              </h2>
              <div className="flex-1 border-t border-dashed border-slate-200 ml-4 h-px" />
            </div>

            {/* Description Text from User Image, Styled as Tech Note */}
            <div className="mb-8 p-4 bg-slate-50 border-l-2 border-slate-300 text-sm text-slate-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <Layers
                  size={16}
                  className="mt-1 text-slate-400 flex-shrink-0"
                />
                <div>
                  <p className="mb-2">
                    Wrap multiple{' '}
                    <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded text-slate-800">
                      radio
                    </code>{' '}
                    components in a{' '}
                    <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded text-slate-800">
                      radio-group
                    </code>{' '}
                    component.
                  </p>
                  <p>
                    Note: You must set the{' '}
                    <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded text-slate-800">
                      defaultValue
                    </code>{' '}
                    or
                    <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded text-slate-800">
                      value
                    </code>{' '}
                    property to achieve the radio group functionality.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Demo Area */}
            <div className="relative border border-slate-300 p-8">
              {/* Technical Marker */}
              <div className="absolute top-0 left-0 bg-slate-900 text-white text-[10px] font-mono px-2 py-1 uppercase">
                Interactive Preview
              </div>

              {/* The Radio Group Implementation */}
              <RadioGroup
                name="demo-group"
                value={groupValue}
                onChange={setGroupValue}
              >
                <BlueprintRadio
                  label="Option 1"
                  value="option1"
                  description="VAL: 0x01"
                />
                <BlueprintRadio
                  label="Option 2"
                  value="option2"
                  description="VAL: 0x02"
                />
                <BlueprintRadio
                  label="Option 3"
                  value="option3"
                  description="VAL: 0x03"
                />
              </RadioGroup>

              {/* State Monitor (Data-Ink Ratio enhancement) */}
              <div className="mt-8 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <GitMerge size={12} />
                  <span>CURRENT_STATE_VALUE</span>
                </div>
                <div className="text-slate-900 bg-slate-100 px-2 py-1 border border-slate-200">
                  "{groupValue}"
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-4 border-t border-slate-300 pt-6 flex justify-between text-xs font-mono text-slate-400">
            <div>RAD-GRP-002 // REACT_CTX</div>
            <div>OUTPUT: VALID</div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RadioGroupSpec;
