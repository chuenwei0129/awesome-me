import React, { useState } from 'react';

/**
 * CSS Definitions: Right-Aligned Hierarchy Indicators
 */
const styles = `
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --c-line: #cbd5e1;
  --c-accent: #0f172a;
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 3rem;
  font-family: var(--font-ui);
  display: flex;
  justify-content: center;
  color: var(--c-text-main);
  min-height: 100vh;
}

.doc-canvas {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-line);
  width: 100%;
  max-width: 800px;
  padding: 4rem 5rem;
  box-shadow: 10px 10px 0 rgba(15, 23, 42, 0.03);
}

/* --- Common Wrapper Behavior --- */
.bp-header-wrapper {
  position: relative;
  cursor: pointer;
  user-select: none;
  /* Visual cue that it's interactive */
  transition: opacity 0.2s;
}
.bp-header-wrapper:hover {
  opacity: 0.8;
}

/* The Source Tag (Common) */
.source-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  background: #f1f5f9;
  border: 1px solid var(--c-line);
  padding: 2px 8px;
  opacity: 0; /* Hidden by default */
  transform: translateX(-10px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  font-weight: normal; /* Reset weight from headers */
  letter-spacing: 0;
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
}

/* Active State: Show Tag */
.bp-header-wrapper.active .source-tag {
  opacity: 1;
  transform: translateX(0);
}


/* --- H1 & H2: Structural (Full Width Layout) --- */
/* These headers use Flexbox to push the tag to the far right */
.layout-structural {
  display: flex;
  justify-content: space-between;
  align-items: baseline; 
}

h1.layout-structural {
  font-family: var(--font-ui);
  font-weight: 800;
  font-size: 2.5rem;
  text-transform: uppercase;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1.5rem;
  border-bottom: 4px solid var(--c-text-main);
  width: 100%;
}

h2.layout-structural {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 1.75rem;
  margin: 3.5rem 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--c-line);
  width: 100%;
}


/* --- H3 - H6: Content (Inline Layout) --- */
/* These headers use Flexbox to keep tag next to text */
.layout-inline {
  display: flex;
  align-items: center; /* Center vertically for visual balance */
  gap: 1rem; /* Space between text and tag */
}

h3.layout-inline {
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 1.4rem;
  margin: 2.5rem 0 1rem 0;
  color: var(--c-text-main);
}

h4.layout-inline {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.125rem;
  margin: 2rem 0 1rem 0;
  color: var(--c-text-main);
}
/* Style specific to H4 content */
.h4-content {
  background: #f8fafc;
  padding: 4px 8px;
  border: 1px dashed var(--c-line);
}

h5.layout-inline {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 1.5rem 0 0.5rem 0;
  color: var(--c-text-sub);
}

h6.layout-inline {
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 0.875rem;
  font-style: italic;
  color: #94a3b8;
  margin: 1rem 0;
}


/* Body Text */
p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 1.5rem;
  max-width: 65ch;
}
`;

const Header = ({ level, md, children }) => {
  const [active, setActive] = useState(false);

  // Decide Layout based on level
  const isStructural = level === 1 || level === 2;
  const layoutClass = isStructural ? 'layout-structural' : 'layout-inline';
  const Tag = `h${level}`;

  // Tag Display Content
  const tagContent = `[ ${md} ]`;

  return (
    <Tag
      className={`bp-header-wrapper ${layoutClass} ${active ? 'active' : ''}`}
      onClick={() => setActive(!active)}
      title="Click to toggle Markdown source"
    >
      {level === 4 ? <span className="h4-content">{children}</span> : children}
      <span className="source-tag">{tagContent}</span>
    </Tag>
  );
};

export default function RightHierarchyDemo() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <article className="doc-canvas">
          <Header level={1} md="#">
            System Architecture
          </Header>

          <p>
            Clicking any header will reveal its Markdown level on the right
            side. Level 1 and 2 headers align the tag to the far right edge,
            reinforcing their status as structural dividers.
          </p>

          <Header level={2} md="##">
            01. Rendering Pipeline
          </Header>

          <p>
            The pipeline is the core of the visual output system. It processes
            geometry and rasterizes it into the frame buffer.
          </p>

          <Header level={3} md="###">
            Geometry Processing
          </Header>

          <p>
            Note how Level 3+ headers keep the tag close to the text. This
            prevents the eye from losing track when reading shorter subtitles.
          </p>

          <Header level={4} md="####">
            Vertex_Shader_Core()
          </Header>

          <p>
            Technical components (Level 4) maintain their monospace, code-like
            appearance, with the hierarchy tag appearing as a parameter or
            annotation.
          </p>

          <Header level={5} md="#####">
            Input Parameters
          </Header>

          <p>Level 5 is used for property groups or labeled lists.</p>

          <Header level={6} md="######">
            // TODO: Refactor for performance
          </Header>

          <p>
            Comments and annotations (Level 6) sit quietly in the flow until
            inspected.
          </p>
        </article>
      </div>
    </>
  );
}
