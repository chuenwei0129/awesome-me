import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

/**
 * CSS Definitions: Flat Engineering Blueprint Style
 */
const styles = `
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --font-ui: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 2rem;
  font-family: var(--font-ui);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Document Canvas */
.doc-canvas {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 800px;
  position: relative;
  /* Grid pattern background */
  background-image: radial-gradient(var(--c-border) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Header */
.doc-header {
  border-bottom: 1px solid var(--c-border);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}
.doc-title {
  font-family: var(--font-mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

/* Content Body */
.doc-body {
  padding: 3rem 4rem;
  background: rgba(255, 255, 255, 0.9); 
  font-size: 1rem;
  line-height: 1.8;
  color: var(--c-text-main);
  text-align: justify;
}

/* Citation Marker [N] */
.citation-marker {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  background: white;
  border: 1px solid var(--c-border);
  padding: 0 4px;
  margin: 0 4px;
  cursor: pointer;
  vertical-align: super;
  line-height: 1.2;
  transition: all 0.15s ease;
  user-select: none;
}

.citation-marker:hover,
.citation-marker.active {
  border-color: var(--c-text-main);
  background: var(--c-text-main);
  color: white;
}

/* Source Popover Card */
.source-popover {
  position: absolute;
  width: 320px;
  background: white;
  border: 1px solid var(--c-text-main); /* Strong border for overlay */
  z-index: 100;
  display: flex;
  flex-direction: column;
  /* Connector Line styling simulated by positioning or simple border */
}

/* Popover Header */
.pop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--c-border);
  background: #f8fafc;
}

.pop-counter {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
}

.pop-nav {
  display: flex;
  gap: 0;
  border: 1px solid var(--c-border);
  background: white;
}

.pop-btn {
  border: none;
  background: transparent;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--c-text-main);
  display: flex;
  align-items: center;
}
.pop-btn:hover { background: #f1f5f9; }
.pop-btn:first-child { border-right: 1px solid var(--c-border); }
.pop-btn:disabled { color: #cbd5e1; cursor: not-allowed; }

/* Popover Content */
.pop-content {
  padding: 1rem;
}

.pop-title {
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pop-desc {
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--c-text-sub);
  line-height: 1.5;
}

.pop-footer {
  padding: 0.5rem 1rem;
  border-top: 1px dashed var(--c-border);
  display: flex;
  justify-content: flex-end;
}
.link-btn {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-main);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}
.link-btn:hover { text-decoration: underline; }

/* Connecting Line (Optional decorative element) */
.connector-line {
  position: absolute;
  width: 1px;
  background: var(--c-text-main);
  height: 20px;
  /* Position logic would be dynamic in production */
}
`;

// Mock Data
const SOURCES = [
  {
    id: 1,
    title: 'Data Source Specification',
    content:
      'Artificial Intelligence, often abbreviated as AI, is a broad branch of computer science concerned with building smart machines capable of performing tasks that typically require human intelligence.',
    url: '#',
  },
  {
    id: 2,
    title: 'Agile R&D Workflow',
    content:
      'Rapid iteration cycles allow enterprise products to respond to market changes within 2-week sprint intervals.',
    url: '#',
  },
  {
    id: 3,
    title: 'Component Abstraction',
    content:
      "High reusability is achieved by decoupling logic from view layers, establishing a 'single source of truth' for design tokens.",
    url: '#',
  },
];

const CitationMarker = ({ id, activeId, onClick, markerRef }) => (
  <span
    ref={markerRef}
    className={`citation-marker ${activeId === id ? 'active' : ''}`}
    onClick={(e) => {
      e.stopPropagation();
      onClick(id);
    }}
  >
    [{id}]
  </span>
);

export default function SourceCitationComponent() {
  const [activeId, setActiveId] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  // Refs to store marker elements
  const markerRefs = useRef({});

  // Calculate Popover Position
  useEffect(() => {
    if (
      activeId !== null &&
      markerRefs.current[activeId] &&
      containerRef.current
    ) {
      const markerEl = markerRefs.current[activeId];
      const containerRect = containerRef.current.getBoundingClientRect();
      const markerRect = markerEl.getBoundingClientRect();

      // Position: Centered below the marker
      const top = markerRect.bottom - containerRect.top + 10; // 10px offset
      let left =
        markerRect.left - containerRect.left - 320 / 2 + markerRect.width / 2;

      // Boundary checks (simple)
      if (left < 20) left = 20;
      if (left > containerRect.width - 340) left = containerRect.width - 340;

      setPopoverPos({ top, left });
    }
  }, [activeId]);

  const handleNext = () => {
    if (activeId < SOURCES.length) setActiveId(activeId + 1);
  };

  const handlePrev = () => {
    if (activeId > 1) setActiveId(activeId - 1);
  };

  const closePopover = () => setActiveId(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = () => closePopover();
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const activeSource = SOURCES.find((s) => s.id === activeId);

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div
          className="doc-canvas"
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="doc-header">
            <span className="doc-title">TECH_SPEC_V2.0 // Overview</span>
            <BookOpen size={18} color="#64748b" />
          </header>

          {/* Body Text */}
          <div className="doc-body">
            <p>
              Ant Financial has a large number of enterprise-level products.
              With complex scenarios, we need to respond fast due to frequent
              changes in product demands and concurrent R&D workflows
              <CitationMarker
                id={1}
                activeId={activeId}
                onClick={setActiveId}
                markerRef={(el) => (markerRefs.current[1] = el)}
              />
              . Many similar contents exist in the process. Through abstraction,
              we could obtain some stable and highly reusable components and
              pages
              <CitationMarker
                id={2}
                activeId={activeId}
                onClick={setActiveId}
                markerRef={(el) => (markerRefs.current[2] = el)}
              />
              . This ensures consistency across the entire ecosystem while
              maintaining the flexibility required for individual business units
              <CitationMarker
                id={3}
                activeId={activeId}
                onClick={setActiveId}
                markerRef={(el) => (markerRefs.current[3] = el)}
              />
              .
            </p>
          </div>

          {/* Popover Card */}
          {activeId && activeSource && (
            <div
              className="source-popover"
              style={{ top: popoverPos.top, left: popoverPos.left }}
              onClick={(e) => e.stopPropagation()} // Prevent close on click inside
            >
              {/* Connector line visual (Optional) */}
              <div
                style={{
                  position: 'absolute',
                  top: -11,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '10px solid var(--c-text-main)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '10px solid white',
                }}
              />

              <div className="pop-header">
                <span className="pop-counter">
                  REF: {String(activeId).padStart(2, '0')}/
                  {String(SOURCES.length).padStart(2, '0')}
                </span>
                <div className="pop-nav">
                  <button
                    className="pop-btn"
                    onClick={handlePrev}
                    disabled={activeId === 1}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    className="pop-btn"
                    onClick={handleNext}
                    disabled={activeId === SOURCES.length}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="pop-content">
                <div className="pop-title">
                  <FileText size={14} />
                  {activeSource.title}
                </div>
                <div className="pop-desc">{activeSource.content}</div>
              </div>

              <div className="pop-footer">
                <a href={activeSource.url} className="link-btn">
                  VIEW_SOURCE <ExternalLink size={10} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
