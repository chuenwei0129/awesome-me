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
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .blueprint-select-wrapper {
    position: relative;
    width: 320px;
  }

  /* Label Area looking like a spec sheet header */
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

  /* Main Trigger Button */
  .blueprint-select-trigger {
    width: 100%;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0s; /* No soft transitions */
    outline: none;
    user-select: none;
  }

  .blueprint-select-trigger:focus,
  .blueprint-select-trigger.is-open {
    border-color: var(--c-text-main);
    background-color: #fff;
  }

  .blueprint-value {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-main);
  }

  .blueprint-placeholder {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-sub);
    font-style: italic;
  }

  /* Technical Arrow Icon */
  .blueprint-arrow {
    width: 10px;
    height: 10px;
    border-right: 2px solid var(--c-text-main);
    border-bottom: 2px solid var(--c-text-main);
    transform: rotate(45deg) translateY(-2px);
    transition: transform 0s;
  }

  .blueprint-select-trigger.is-open .blueprint-arrow {
    transform: rotate(-135deg) translateY(-2px);
  }

  /* Dropdown Menu - Technical Sheet Style */
  .blueprint-options-list {
    position: absolute;
    top: 100%; /* flush with trigger */
    left: 0;
    right: 0;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-text-main); /* High contrast border when active */
    border-top: none;
    margin-top: -1px; /* Overlap border */
    list-style: none;
    padding: 0;
    z-index: 10;
    max-height: 250px;
    overflow-y: auto;
    box-shadow: none; /* RULE: No shadows */
  }

  .blueprint-option {
    padding: 10px 12px;
    border-bottom: 1px solid var(--c-border);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blueprint-option:last-child {
    border-bottom: none;
  }

  .blueprint-option:hover {
    background-color: #f1f5f9;
  }

  .blueprint-option.is-selected {
    background-color: var(--c-text-main);
  }

  .blueprint-option.is-selected .blueprint-option-label {
    color: #ffffff;
  }
  
  .blueprint-option.is-selected .blueprint-option-id {
    color: #94a3b8;
  }

  .blueprint-option-label {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-main);
  }

  .blueprint-option-id {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--c-text-sub);
  }

  /* Technical decorative markings */
  .tech-mark {
    position: absolute;
    width: 4px;
    height: 1px;
    background: var(--c-text-main);
    right: -5px;
    top: 50%;
  }
`;

const BlueprintSelect = ({
  options = [],
  label = 'Configuration Profile',
  placeholder = 'SELECT_MODULE',
  id = 'COMP-01',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  // Close when clicking outside
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

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="blueprint-select-wrapper" ref={containerRef}>
          {/* Header Section */}
          <div className="blueprint-label-group">
            <span className="blueprint-label">{label}</span>
            <span className="blueprint-id-tag">REF: {id}</span>
          </div>

          {/* Trigger */}
          <div
            className={`blueprint-select-trigger ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
          >
            {selected ? (
              <span className="blueprint-value">{selected.label}</span>
            ) : (
              <span className="blueprint-placeholder">
                &lt;{placeholder}&gt;
              </span>
            )}

            <div className="blueprint-arrow"></div>
            {/* Decorative engineering tick mark */}
            <div className="tech-mark"></div>
          </div>

          {/* Dropdown Options */}
          {isOpen && (
            <ul className="blueprint-options-list">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`blueprint-option ${
                    selected?.value === option.value ? 'is-selected' : ''
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="blueprint-option-label">{option.label}</span>
                  <span className="blueprint-option-id">ID:{option.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

// --- Usage Example ---
export default function App() {
  const data = [
    { value: 'sys_01', label: 'SYSTEM_CORE_V1' },
    { value: 'sys_02', label: 'NET_MODULE_ALPHA' },
    { value: 'sys_03', label: 'DB_SHARD_04' },
    { value: 'sys_04', label: 'AUTH_GATEWAY_X' },
  ];

  return <BlueprintSelect options={data} />;
}
