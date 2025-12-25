import { Check, Minus } from 'lucide-react';
import React, { useState } from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    background-color: var(--c-bg);
    color: var(--c-text-main);
    font-family: var(--font-ui);
    padding: 2rem;
  }

  .doc-container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Typography */
  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  p {
    color: var(--c-text-sub);
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .code-badge {
    font-family: var(--font-mono);
    background: #e2e8f0;
    padding: 2px 6px;
    font-size: 0.85em;
    border: 1px solid var(--c-border);
  }

  /* Canvas */
  .diagram-canvas {
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 3rem;
  }

  /* --- Checkbox Component Styles --- */
  .blueprint-checkbox-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    margin-right: 24px;
    margin-bottom: 12px;
  }

  .blueprint-checkbox {
    width: 18px;
    height: 18px;
    border: 1px solid var(--c-border);
    background: var(--c-canvas);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
    color: transparent; /* Hide icon by default */
  }

  /* Checked State: Solid Black */
  .blueprint-checkbox.checked {
    background: var(--c-text-main);
    border-color: var(--c-text-main);
    color: var(--c-canvas);
  }

  /* Indeterminate State: White with Black Border & Icon */
  .blueprint-checkbox.indeterminate {
    background: var(--c-canvas);
    border-color: var(--c-text-main);
    color: var(--c-text-main);
    border-width: 2px; /* Thicker border for semi-state emphasis */
  }

  .blueprint-checkbox-wrapper:hover .blueprint-checkbox {
    border-color: var(--c-text-main);
  }

  .checkbox-label {
    font-family: var(--font-ui);
    font-size: 0.95rem;
    color: var(--c-text-main);
  }

  .group-separator {
    height: 1px;
    background: var(--c-border);
    width: 100%;
    margin: 16px 0;
    border: none; /* Reset hr */
    border-bottom: 1px dashed var(--c-border); /* Dashed line for grouping */
    background: transparent;
  }

  .options-container {
    padding-left: 28px; /* Indent options */
    display: flex;
    flex-wrap: wrap;
  }
`;

// --- Components ---

const BlueprintCheckbox = ({ label, checked, indeterminate, onChange }) => {
  return (
    <div className="blueprint-checkbox-wrapper" onClick={onChange}>
      <div
        className={`blueprint-checkbox ${checked ? 'checked' : ''} ${
          indeterminate ? 'indeterminate' : ''
        }`}
      >
        {/* Logic for Icon Display */}
        {indeterminate ? (
          <Minus size={14} strokeWidth={3} />
        ) : checked ? (
          <Check size={14} strokeWidth={3} />
        ) : null}
      </div>
      {label && <span className="checkbox-label">{label}</span>}
    </div>
  );
};

const App = () => {
  // State: List of options
  const [options, setOptions] = useState([
    { id: 1, label: 'Option 1', checked: true },
    { id: 2, label: 'Option 2', checked: true },
    { id: 3, label: 'Option 3', checked: false },
  ]);

  // Derived State
  const allChecked = options.every((opt) => opt.checked);
  const isIndeterminate = options.some((opt) => opt.checked) && !allChecked;

  // Handlers
  const handleToggleAll = () => {
    const newState = !allChecked && !isIndeterminate; // If indeterminate, we want to check all usually, or uncheck.
    // Standard UX: If Indeterminate -> Check All. If All Checked -> Uncheck All. If None Checked -> Check All.
    // Simplified: If not all are checked, check them all. Otherwise uncheck all.
    const targetState = isIndeterminate ? true : !allChecked;

    setOptions(options.map((opt) => ({ ...opt, checked: targetState })));
  };

  const handleToggleOption = (id) => {
    setOptions(
      options.map((opt) =>
        opt.id === id ? { ...opt, checked: !opt.checked } : opt,
      ),
    );
  };

  return (
    <>
      <style>{styles}</style>
      <div className="doc-container">
        {/* Header */}
        <section>
          <h1>Indeterminate Group</h1>
          <p>
            Use the <span className="code-badge">indeterminate</span> property
            to achieve a semi-selected state. Useful for nested data structures
            or bulk actions.
          </p>
        </section>

        {/* Component Canvas */}
        <div className="diagram-canvas">
          {/* Master Checkbox */}
          <div style={{ marginBottom: '8px' }}>
            <BlueprintCheckbox
              label="Check All"
              checked={allChecked}
              indeterminate={isIndeterminate}
              onChange={handleToggleAll}
            />
          </div>

          {/* Visual Divider (Technical Line) */}
          <hr className="group-separator" />

          {/* Options Group */}
          <div className="options-container">
            {options.map((opt) => (
              <BlueprintCheckbox
                key={opt.id}
                label={opt.label}
                checked={opt.checked}
                onChange={() => handleToggleOption(opt.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
