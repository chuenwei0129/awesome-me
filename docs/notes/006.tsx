import React, { useEffect, useRef, useState } from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --font-ui: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  .blueprint-container {
    font-family: var(--font-ui);
    padding: 2rem;
    background-color: var(--c-bg);
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .blueprint-select-wrapper {
    position: relative;
    width: 400px; /* Slightly wider for multi-tags */
  }

  /* Header / Label */
  .blueprint-label-group {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 2px;
  }

  .blueprint-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
    color: var(--c-text-main);
  }

  .blueprint-id-tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
  }

  /* Main Trigger Area */
  .blueprint-select-trigger {
    width: 100%;
    min-height: 42px;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 6px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border-color 0s;
    outline: none;
    user-select: none;
  }

  .blueprint-select-trigger:focus-within,
  .blueprint-select-trigger.is-open {
    border-color: var(--c-text-main);
    background-color: #fff;
  }

  /* Tags / Chips Container */
  .blueprint-tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex: 1;
    margin-right: 8px;
  }

  /* The "Tech Tag" Design */
  .blueprint-tag {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border: 1px solid var(--c-text-main);
    padding: 0 4px;
    height: 24px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--c-text-main);
  }

  .blueprint-tag-text {
    margin-right: 6px;
  }

  .blueprint-tag-close {
    cursor: pointer;
    font-weight: bold;
    color: var(--c-text-sub);
    padding: 0 2px;
  }
  .blueprint-tag-close:hover {
    color: #ef4444; /* Semantic Red for delete action */
    background: var(--c-text-main);
  }

  .blueprint-placeholder {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-sub);
    font-style: italic;
    padding-left: 4px;
  }

  /* Arrow Icon */
  .blueprint-arrow {
    width: 10px;
    height: 10px;
    border-right: 2px solid var(--c-text-main);
    border-bottom: 2px solid var(--c-text-main);
    transform: rotate(45deg) translateY(-2px);
    transition: transform 0s;
    flex-shrink: 0;
  }

  .blueprint-select-trigger.is-open .blueprint-arrow {
    transform: rotate(-135deg) translateY(-2px);
  }

  /* Dropdown List */
  .blueprint-options-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-text-main);
    border-top: none;
    margin-top: -1px;
    list-style: none;
    padding: 0;
    z-index: 10;
    max-height: 250px;
    overflow-y: auto;
  }

  .blueprint-option {
    padding: 8px 12px;
    border-bottom: 1px solid var(--c-border);
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  }

  .blueprint-option:last-child {
    border-bottom: none;
  }

  .blueprint-option:hover {
    background-color: #f1f5f9;
  }

  /* Checkbox Simulation using Monospace Text */
  .blueprint-checkbox {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--c-text-main);
    width: 20px;
    display: inline-block;
    font-weight: bold;
  }

  .blueprint-option-label {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-main);
    flex: 1;
  }

  .blueprint-option-id {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--c-text-sub);
  }

  /* Selected State in Dropdown */
  .blueprint-option.is-selected {
    background-color: #f8fafc;
  }
  .blueprint-option.is-selected .blueprint-option-label {
    text-decoration: underline; /* Technical emphasis */
  }

  /* Clear All Button (Footer) */
  .blueprint-footer {
    padding: 8px;
    border-top: 1px solid var(--c-border);
    display: flex;
    justify-content: flex-end;
    background: #f8fafc;
  }
  .blueprint-btn-clear {
    background: none;
    border: 1px solid var(--c-text-sub);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 2px 8px;
    cursor: pointer;
    color: var(--c-text-sub);
    text-transform: uppercase;
  }
  .blueprint-btn-clear:hover {
    background: var(--c-text-main);
    color: #fff;
    border-color: var(--c-text-main);
  }
`;

const BlueprintMultiSelect = ({
  options = [],
  label = 'Active Modules',
  placeholder = 'SELECT_COMPONENTS',
  id = 'CONF-ARRAY-01',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]); // Stores array of values
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const removeTag = (e, value) => {
    e.stopPropagation(); // Prevent dropdown toggle
    setSelectedValues((prev) => prev.filter((item) => item !== value));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelectedValues([]);
  };

  // Helper to get label from value
  const getLabel = (val) => options.find((o) => o.value === val)?.label || val;

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="blueprint-select-wrapper" ref={containerRef}>
          {/* Header */}
          <div className="blueprint-label-group">
            <span className="blueprint-label">{label}</span>
            <span className="blueprint-id-tag">
              TYPE: ARRAY[{selectedValues.length}]
            </span>
          </div>

          {/* Trigger */}
          <div
            className={`blueprint-select-trigger ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
          >
            <div className="blueprint-tags-container">
              {selectedValues.length === 0 && (
                <span className="blueprint-placeholder">
                  &lt;{placeholder}&gt;
                </span>
              )}

              {selectedValues.map((val) => (
                <div key={val} className="blueprint-tag">
                  <span className="blueprint-tag-text">{getLabel(val)}</span>
                  <span
                    className="blueprint-tag-close"
                    onClick={(e) => removeTag(e, val)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>

            <div className="blueprint-arrow"></div>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="blueprint-dropdown-container">
              <ul className="blueprint-options-list">
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <li
                      key={option.value}
                      className={`blueprint-option ${
                        isSelected ? 'is-selected' : ''
                      }`}
                      onClick={() => toggleOption(option.value)}
                    >
                      {/* Checkbox Simulation */}
                      <span className="blueprint-checkbox">
                        {isSelected ? '[x]' : '[ ]'}
                      </span>
                      <span className="blueprint-option-label">
                        {option.label}
                      </span>
                      <span className="blueprint-option-id">
                        ID:{option.value}
                      </span>
                    </li>
                  );
                })}

                {/* Optional Footer inside dropdown */}
                <div className="blueprint-footer">
                  <button className="blueprint-btn-clear" onClick={clearAll}>
                    // RESET_SELECTION
                  </button>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// --- Usage Example ---
export default function App() {
  const data = [
    { value: '01', label: 'THERMAL_SENSOR' },
    { value: '02', label: 'HYDRAULIC_PUMP' },
    { value: '03', label: 'VOLTAGE_REG' },
    { value: '04', label: 'BACKUP_GEN' },
    { value: '05', label: 'COOLANT_SYS' },
    { value: '06', label: 'MAIN_BUS_A' },
  ];

  return <BlueprintMultiSelect options={data} />;
}
