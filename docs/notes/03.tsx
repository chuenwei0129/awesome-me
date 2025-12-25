import { Info, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #f8fafc;        /* Outer Background */
    --c-canvas: #ffffff;    /* Diagram Background */
    --c-border: #cbd5e1;    /* Slate-300 */
    --c-text-main: #0f172a; /* Slate-900 */
    --c-text-sub: #64748b;  /* Slate-500 */
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    background-color: var(--c-bg);
    font-family: var(--font-ui);
    color: var(--c-text-main);
    margin: 0;
    padding: 2rem;
  }

  .blueprint-container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  /* Section Styles */
  .section-header {
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--c-text-main);
    padding-bottom: 0.5rem;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  .section-subtitle {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--c-text-sub);
    font-weight: 400;
  }

  .description {
    margin-bottom: 1rem;
    color: var(--c-text-sub);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .code-badge {
    font-family: var(--font-mono);
    background: #f1f5f9;
    padding: 0.1rem 0.4rem;
    border: 1px solid var(--c-border);
    font-size: 0.85em;
    color: var(--c-text-main);
  }

  /* Canvas Area */
  .diagram-canvas {
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 2rem;
    position: relative;
    /* Grid Pattern for Technical Look */
    background-image: 
      linear-gradient(var(--c-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--c-bg) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* Technical Marker in Corner */
  .diagram-canvas::after {
    content: "FIG-01 // RENDER_VIEW";
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--c-border);
    pointer-events: none;
  }

  /* Tag Component Styles */
  .tech-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border: 1px solid var(--c-border);
    background: var(--c-canvas);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--c-text-main);
    cursor: default;
    transition: all 0.15s ease;
    user-select: none;
  }

  .tech-tag:hover {
    border-color: var(--c-text-sub);
  }

  .tech-tag.selectable {
    cursor: pointer;
  }

  .tech-tag.selected {
    background: var(--c-text-main);
    color: var(--c-canvas);
    border-color: var(--c-text-main);
  }

  .tech-tag.dashed {
    border-style: dashed;
    color: var(--c-text-sub);
  }
  
  .tech-tag.dashed:hover {
    color: var(--c-text-main);
    border-color: var(--c-text-main);
    border-style: solid;
  }

  .tag-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  
  .tag-close-btn:hover {
    opacity: 1;
    color: #ef4444; /* Error red for action */
  }

  .flex-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

// --- Components ---

// 1. Basic Tag Component
const TechTag = ({
  children,
  icon: Icon,
  closable,
  onClose,
  selectable,
  selected,
  onClick,
  dashed,
  style,
}) => {
  return (
    <div
      className={`tech-tag ${selectable ? 'selectable' : ''} ${
        selected ? 'selected' : ''
      } ${dashed ? 'dashed' : ''}`}
      onClick={onClick}
      style={style}
    >
      {Icon && <Icon size={14} strokeWidth={2} />}
      <span>{children}</span>
      {closable && (
        <span
          className="tag-close-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClose && onClose();
          }}
        >
          <X size={14} strokeWidth={2} />
        </span>
      )}
    </div>
  );
};

// 2. Main Application
const App = () => {
  // State for "Dynamic Edit Tags"
  const [dynamicTags, setDynamicTags] = useState([
    { id: 1, text: 'Tag 1' },
    { id: 2, text: 'Tag 2' },
    { id: 3, text: 'Tag 3' },
    { id: 4, text: '1' },
    { id: 5, text: '1' },
  ]);

  // State for "Selectable"
  const [selectedTag, setSelectedTag] = useState('Tag1');

  // State for "Async" (simulated)
  const [asyncVisible, setAsyncVisible] = useState(true);

  const handleCloseDynamic = (id) => {
    setDynamicTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleAddTag = () => {
    const newId = Math.max(0, ...dynamicTags.map((t) => t.id)) + 1;
    setDynamicTags([...dynamicTags, { id: newId, text: `New Tag ${newId}` }]);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        {/* Section 1: Closable Tags */}
        <section>
          <div className="section-header">
            <h2 className="section-title">
              CLOSABLE TAGS
              <span className="section-subtitle">01_BASIC_INTERACTION</span>
            </h2>
          </div>
          <p className="description">
            Set <span className="code-badge">closable</span> property to enable
            tag dismissal. Triggers <span className="code-badge">onClose</span>{' '}
            event upon activation.
          </p>
          <div className="diagram-canvas">
            <div className="flex-row">
              <TechTag closable>Tag</TechTag>
              <TechTag icon={Info} closable>
                Tag
              </TechTag>
            </div>
          </div>
        </section>

        {/* Section 2: Selectable Tags */}
        <section>
          <div className="section-header">
            <h2 className="section-title">
              SELECTABLE
              <span className="section-subtitle">02_STATE_TOGGLE</span>
            </h2>
          </div>
          <p className="description">
            <span className="code-badge">Tag</span> component does not support
            selection by default. Use{' '}
            <span className="code-badge">CheckableTag</span> implementation for
            toggle states.
          </p>
          <div className="diagram-canvas">
            <div className="flex-row">
              {['Tag1', 'Tag2', 'Tag3'].map((text) => (
                <TechTag
                  key={text}
                  selectable
                  selected={selectedTag === text}
                  onClick={() => setSelectedTag(text)}
                >
                  {text}
                </TechTag>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Dynamic Edit Tags */}
        <section>
          <div className="section-header">
            <h2 className="section-title">
              DYNAMIC EDIT
              <span className="section-subtitle">03_ARRAY_MANIPULATION</span>
            </h2>
          </div>
          <p className="description">
            Supports dynamic addition and removal of tag elements within the
            DOM.
          </p>
          <div className="diagram-canvas">
            <div className="flex-row">
              {dynamicTags.map((tag) => (
                <TechTag
                  key={tag.id}
                  closable
                  onClose={() => handleCloseDynamic(tag.id)}
                >
                  {tag.text}
                </TechTag>
              ))}
              <TechTag dashed icon={Plus} selectable onClick={handleAddTag}>
                Add Tag
              </TechTag>
            </div>
          </div>
        </section>

        {/* Section 4: Async Close */}
        <section>
          <div className="section-header">
            <h2 className="section-title">
              ASYNC CLOSE
              <span className="section-subtitle">04_PROMISE_HANDLING</span>
            </h2>
          </div>
          <p className="description">
            Custom implementation for asynchronous dismissal logic.
          </p>
          <div className="diagram-canvas">
            <div className="flex-row">
              {asyncVisible && (
                <TechTag
                  closable
                  onClose={() => {
                    // Simulate async
                    setTimeout(() => setAsyncVisible(false), 500);
                  }}
                >
                  Tag
                </TechTag>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
