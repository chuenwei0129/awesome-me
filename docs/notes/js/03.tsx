import {
  Code,
  Download,
  Image as ImageIcon,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import mermaid from 'mermaid';
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
  align-items: flex-start;
}

/* Main Component Frame */
.diagram-frame {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
}

/* Toolbar Header */
.diagram-toolbar {
  border-bottom: 1px solid var(--c-border);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  z-index: 10;
}

/* Left: View Toggle */
.view-toggle {
  display: flex;
  border: 1px solid var(--c-border);
}
.toggle-btn {
  background: white;
  border: none;
  padding: 0.5rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--c-text-sub);
  transition: all 0.2s;
}
.toggle-btn:first-child { border-right: 1px solid var(--c-border); }
.toggle-btn:hover { background-color: #f1f5f9; }
.toggle-btn.active {
  background-color: var(--c-text-main);
  color: white;
}

/* Right: Action Buttons */
.action-group {
  display: flex;
  gap: 0.5rem;
}
.icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background: transparent;
  color: var(--c-text-main);
  cursor: pointer;
  transition: all 0.2s;
}
.icon-btn:hover {
  border-color: var(--c-border);
  background-color: #f8fafc;
}

/* Canvas Area */
.canvas-area {
  height: 500px;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  /* Grid Background for Blueprint feel */
  background-image: 
    linear-gradient(var(--c-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--c-border) 1px, transparent 1px);
  background-size: 40px 40px;
}

.mermaid-wrapper {
  transform-origin: 0 0;
  transition: transform 0.1s ease-out;
  padding: 2rem;
  min-width: 100%;
  min-height: 100%;
}

/* Source Editor Area */
.editor-area {
  width: 100%;
  height: 500px;
  border: none;
  resize: none;
  padding: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--c-text-main);
  background-color: #f8fafc;
  outline: none;
}

/* Force specific styles on Mermaid SVG elements to match Blueprint */
/* Note: These work in tandem with themeVariables config */
.mermaid svg {
  font-family: var(--font-mono) !important;
}
.mermaid .node rect, 
.mermaid .node circle, 
.mermaid .node polygon {
  fill: #ffffff !important;
  stroke: #0f172a !important;
  stroke-width: 1.5px !important;
}
.mermaid .edgePath .path {
  stroke: #0f172a !important;
  stroke-width: 1.5px !important;
}
.mermaid .marker {
  fill: #0f172a !important;
  stroke: #0f172a !important;
}
.mermaid .actor {
  fill: #fff !important;
  stroke: #0f172a !important;
  stroke-width: 1.5px !important;
}
`;

const INITIAL_CODE = `sequenceDiagram
    participant C as Client
    participant S as Server
    participant D as Database

    rect rgb(255, 255, 255)
    note right of C: AUTH_FLOW_INIT
    C->>S: POST /api/auth
    S->>D: QUERY user_id
    D-->>S: RETURN record
    S-->>C: 200 OK (Token)
    end`;

export default function BlueprintMermaid() {
  const [view, setView] = useState('diagram'); // 'diagram' | 'code'
  const [code, setCode] = useState(INITIAL_CODE);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mermaidRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize Mermaid with a theme that matches our style
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      fontFamily: 'JetBrains Mono',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#0f172a',
        primaryBorderColor: '#0f172a',
        lineColor: '#0f172a',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#fff',
      },
      securityLevel: 'loose',
    });
  }, []);

  // Render Diagram
  useEffect(() => {
    if (view === 'diagram' && mermaidRef.current) {
      mermaidRef.current.removeAttribute('data-processed');
      mermaid.contentLoaded();

      // Manually render for dynamic updates
      const renderDiagram = async () => {
        try {
          const { svg } = await mermaid.render('mermaid-svg', code);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid Syntax Error', error);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `<div style="color:red; font-family:monospace; padding:1rem;">SYNTAX_ERR: ${error.message}</div>`;
          }
        }
      };
      renderDiagram();
    }
  }, [code, view]);

  // Pan & Zoom Handlers
  const handleWheel = (e) => {
    if (view !== 'diagram') return;
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((prev) => Math.min(Math.max(prev * delta, 0.5), 3));
    }
  };

  const handleMouseDown = (e) => {
    if (view !== 'diagram') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleDownload = () => {
    const svgElement = mermaidRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'blueprint_diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="diagram-frame">
          {/* Header / Toolbar */}
          <div className="diagram-toolbar">
            <div className="view-toggle">
              <button
                className={`toggle-btn ${view === 'diagram' ? 'active' : ''}`}
                onClick={() => setView('diagram')}
              >
                <ImageIcon size={14} /> DIAGRAM
              </button>
              <button
                className={`toggle-btn ${view === 'code' ? 'active' : ''}`}
                onClick={() => setView('code')}
              >
                <Code size={14} /> SOURCE
              </button>
            </div>

            <div className="action-group">
              <button
                className="icon-btn"
                onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                className="icon-btn"
                onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                className="icon-btn"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                title="Reset View"
              >
                <RotateCcw size={16} />
              </button>
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: 'var(--c-border)',
                  margin: '0 4px',
                }}
              />
              <button
                className="icon-btn"
                onClick={handleDownload}
                title="Download SVG"
              >
                <Download size={16} />
              </button>
            </div>
          </div>

          {/* Main Content */}
          {view === 'diagram' ? (
            <div
              className="canvas-area"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {/* Info Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  background: 'white',
                  border: '1px solid var(--c-border)',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--c-text-sub)',
                  pointerEvents: 'none',
                }}
              >
                ZM: {(zoom * 100).toFixed(0)}% | POS: {pan.x},{pan.y}
              </div>

              <div
                ref={mermaidRef}
                className="mermaid-wrapper"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              />
            </div>
          ) : (
            <textarea
              className="editor-area"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
          )}

          {/* Footer Status */}
          <div
            style={{
              borderTop: '1px solid var(--c-border)',
              padding: '0.5rem 1rem',
              background: '#f1f5f9',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--c-text-sub)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>RENDER_ENGINE: MERMAID_JS_v10</span>
            <span>
              STATUS: {view === 'diagram' ? 'ACTIVE_RENDER' : 'EDIT_MODE'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
