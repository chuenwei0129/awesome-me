import { PackageOpen, ServerCrash } from 'lucide-react';
import React from 'react';

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
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  /* Section Headers */
  h2 {
    font-size: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  h2::before {
    content: "//";
    color: var(--c-text-sub);
    font-family: var(--font-mono);
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

  /* Canvas/Playground */
  .diagram-canvas {
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 3rem;
  }

  /* --- Empty Component Styles --- */
  
  .blueprint-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    
    /* Technical "Void" Styling */
    border: 1px dashed var(--c-border);
    background-image: repeating-linear-gradient(
      45deg,
      var(--c-bg),
      var(--c-bg) 10px,
      transparent 10px,
      transparent 20px
    );
    min-height: 200px;
  }

  .empty-icon-wrapper {
    margin-bottom: 1rem;
    color: var(--c-border); /* Muted icon color */
    
    /* Optional: Add a technical circle backdrop */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 1px solid var(--c-border);
    border-radius: 50%; /* Only place where circle is allowed for icon container */
    background: var(--c-canvas);
  }

  .empty-description {
    font-family: var(--font-mono);
    color: var(--c-text-sub);
    font-size: 0.875rem;
    text-align: center;
  }

  /* Variant: Simple (No circle container) */
  .blueprint-empty.simple .empty-icon-wrapper {
    border: none;
    background: transparent;
    border-radius: 0;
    width: auto;
    height: auto;
    color: var(--c-text-sub);
  }

  .btn-action {
    margin-top: 1rem;
    padding: 8px 16px;
    background: var(--c-canvas);
    border: 1px solid var(--c-text-main);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    cursor: pointer;
    text-transform: uppercase;
  }

  .btn-action:hover {
    background: var(--c-text-main);
    color: var(--c-canvas);
  }
`;

// --- Components ---

const Empty = ({
  icon: Icon = PackageOpen, // Default technical icon
  description = 'NO_DATA_FOUND',
  children,
  simple = false,
}) => {
  return (
    <div className={`blueprint-empty ${simple ? 'simple' : ''}`}>
      <div className="empty-icon-wrapper">
        <Icon size={simple ? 48 : 32} strokeWidth={1.5} />
      </div>
      <div className="empty-description">{description}</div>
      {children && <div style={{ marginTop: '12px' }}>{children}</div>}
    </div>
  );
};

const App = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="doc-container">
        {/* Section 1: Basic Usage */}
        <section>
          <h2>Basic Usage</h2>
          <p>
            Basic usage of Empty state component. Represents a null return value
            or initial state.
          </p>
          <div className="diagram-canvas">
            <Empty />
          </div>
        </section>

        {/* Section 2: Custom Styles */}
        <section>
          <h2>Custom Styles</h2>
          <p>
            Customize via <span className="code-badge">icon</span> prop for
            specific context,
            <span className="code-badge">description</span> for system messages.
          </p>
          <div className="diagram-canvas">
            <Empty
              icon={ServerCrash}
              description={
                <>
                  <span>ERR_CONNECTION_REFUSED</span>
                  <br />
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    Please reload resource
                  </span>
                </>
              }
              simple={true} // Cleaner look
            >
              <button className="btn-action">Reload System</button>
            </Empty>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
