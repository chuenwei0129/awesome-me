import {
  CheckCircle,
  ChevronsRight,
  Copy,
  Edit,
  FilePlus,
  Folder,
  Layers,
  Moon,
  Save,
  Search,
  Sun,
  Trash2,
  Wifi,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

/* ==========================================================================
   1. STYLES: Heavy Engineering Console
   ========================================================================== */
const styles = `
:root {
  /* Dimensions */
  --sidebar-l-w: 280px;
  --sidebar-r-w: 240px;
  --header-h: 54px;
  /* --- LIGHT THEME (Secondary) --- */
  --c-bg-light: #f0f2f5;
  --c-panel-light: #ffffff;
  --c-border-light: #cbd5e1;
  --c-text-light: #0f172a;
  --c-accent-light: #0f172a;
  --c-hover-light: #f1f5f9;
  --c-grid-light: rgba(15, 23, 42, 0.04);
  /* --- DARK THEME (Primary) --- */
  --c-bg-dark: #020617;
  --c-panel-dark: #0f172a;
  --c-border-dark: #1e293b;
  --c-border-strong-dark: #334155;
  --c-text-dark: #f8fafc;
  --c-text-sub-dark: #94a3b8;
  --c-accent-dark: #38bdf8;
  --c-hover-dark: #1e293b;
  --c-grid-dark: rgba(255, 255, 255, 0.03);
}

* { box-sizing: border-box; border-radius: 0; }
body { 
  font-family: 'Inter', system-ui, sans-serif; 
  margin: 0; 
  line-height: 1.6;
}
.font-mono { font-family: 'JetBrains Mono', monospace; }

/* --- Theme-aware variables --- */
body[data-theme='light'] {
  --c-bg: var(--c-bg-light); --c-panel: var(--c-panel-light); --c-border: var(--c-border-light);
  --c-text: var(--c-text-light); --c-text-sub: var(--c-text-sub-light);
  --c-accent: var(--c-accent-light); --c-hover: var(--c-hover-light); --c-grid: var(--c-grid-light);
  --c-border-strong: var(--c-border-strong-light);
}
body[data-theme='dark'] {
  --c-bg: var(--c-bg-dark); --c-panel: var(--c-panel-dark); --c-border: var(--c-border-dark);
  --c-text: var(--c-text-dark); --c-text-sub: var(--c-text-sub-dark);
  --c-accent: var(--c-accent-dark); --c-hover: var(--c-hover-dark); --c-grid: var(--c-grid-dark);
  --c-border-strong: var(--c-border-strong-dark);
}

body {
  background-color: var(--c-bg); color: var(--c-text);
  background-image: linear-gradient(var(--c-grid) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* --- App Layout --- */
.app-container { display: grid; grid-template-columns: var(--sidebar-l-w) 1fr; grid-template-rows: var(--header-h) 1fr; height: 100vh; overflow: hidden; }
.app-header { grid-column: 1 / -1; background: var(--c-panel); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; z-index: 100; }
.app-sidebar-l { grid-row: 2; background: var(--c-panel); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; height: calc(100vh - var(--header-h)); }
.app-main-container { grid-row: 2; overflow-y: auto; padding: 24px; }
.app-main-grid { display: grid; gap: 24px; grid-template-columns: 1fr var(--sidebar-r-w); }
.app-main-grid.edit-mode { grid-template-columns: 1fr; }
.main-content { min-width: 0; }
.app-sidebar-r { align-self: start; position: sticky; top: 0; }

/* --- Header --- */
.header-group { display: flex; align-items: center; gap: 10px; font-size: 13px; }
.status-indicator { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--c-text-sub); }

/* --- Left Sidebar (Directory) --- */
.dir-header { padding: 12px; border-bottom: 1px solid var(--c-border); }
.dir-search-bar { display: flex; gap: 8px; }
.dir-search-input { flex-grow: 1; background: var(--c-bg); border: 1px solid var(--c-border); padding: 8px 12px 8px 32px; font-size: 12px; color: var(--c-text); outline: none; }
.dir-list-container { list-style: none; padding: 0; margin: 0; flex-grow: 1; overflow-y: auto; }
.dir-item { padding: 10px 12px; border-bottom: 1px solid var(--c-border); cursor: pointer; }
.dir-item:hover { background: var(--c-hover); }
.dir-item.active { background: var(--c-hover); border-left: 2px solid var(--c-accent); padding-left: 10px; font-weight: 600; }
.dir-meta { font-size: 11px; color: var(--c-text-sub); margin-top: 2px; display: flex; justify-content: space-between; align-items: center; }
.dir-footer { padding: 10px 12px; border-top: 1px solid var(--c-border); flex-shrink: 0; font-size: 10px; color: var(--c-text-sub); display: flex; justify-content: space-between; gap: 12px; }

/* --- Main Content & Editor --- */
.doc-canvas { background: var(--c-panel); border: 1px solid var(--c-border); }
.doc-meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--c-border); }
.meta-item { padding: 8px 12px; border-right: 1px solid var(--c-border); }
.meta-item:last-child { border-right: none; }
.meta-label { font-size: 10px; text-transform: uppercase; color: var(--c-text-sub); }
.meta-value { font-size: 12px; font-weight: 600; }
.article-content { padding: 32px 48px; }
.edit-split-view { display: grid; grid-template-columns: 1fr 1fr; height: calc(100vh - var(--header-h) - 48px); border: 1px solid var(--c-border); }
.edit-pane { background: var(--c-panel); display: flex; flex-direction: column; }
.edit-pane:first-child { border-right: 1px solid var(--c-border); }
.pane-header { padding: 8px 12px; background: var(--c-bg); border-bottom: 1px solid var(--c-border); font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--c-text-sub); }
.md-editor { width: 100%; flex-grow: 1; background: var(--c-panel); color: var(--c-text); border: none; outline: none; resize: none; font-family: var(--font-mono); font-size: 14px; padding: 16px; line-height: 1.7; }

/* --- Right Sidebar (TOC) --- */
.toc-card { border: 1px solid var(--c-border); background: var(--c-panel); }
.toc-title { padding: 12px; font-size: 11px; font-weight: 600; color: var(--c-text-sub); text-transform: uppercase; border-bottom: 1px solid var(--c-border); }
.toc-list { list-style: none; padding: 12px; margin: 0; }
.toc-item { font-size: 12px; color: var(--c-text-sub); cursor: pointer; padding: 4px 0 4px 12px; position: relative; }
.toc-item::before { content: '—'; position: absolute; left: 0; color: var(--c-border-strong); }
.toc-item:hover { color: var(--c-text); }
.toc-item.active { color: var(--c-accent); font-weight: 600; }
.toc-item.active::before { color: var(--c-accent); }

/* --- Buttons & Indicators --- */
.btn { display: inline-flex; align-items: center; gap: 6px; background: var(--c-panel); color: var(--c-text); border: 1px solid var(--c-border-strong); padding: 6px 12px; cursor: pointer; font-size: 12px; font-weight: 500; }
.btn:hover { background: var(--c-hover); border-color: var(--c-accent); color: var(--c-accent); }
.btn-primary { background: var(--c-accent); color: #020617; border-color: var(--c-accent); font-weight: 700; }
.btn-primary:hover { background: var(--c-accent); color: #020617; opacity: 0.8; }
.btn-delete { border-color: #ef4444; color: #ef4444; }
.btn-delete:hover { background: #ef4444; color: #fff; }
.mode-indicator { display: flex; align-items: center; padding: 6px 12px; border: 1px dashed var(--c-accent); color: var(--c-accent); font-size: 11px; text-transform: uppercase; }
`;

/* ==========================================================================
   2\. MOCK DATA & COMPONENTS
   ========================================================================== */

const INITIAL_NOTES = [
  {
    id: 'SPEC-001',
    title: 'React Application Architecture',
    content: '# React Application Architecture...',
    modified: '2025.10.26',
    status: 'STABLE',
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `SPEC-${String(i + 2).padStart(3, '0')}`,
    title: `API Endpoint SPEC ${i + 1}`,
    content: `# API SPEC ${i + 1}`,
    modified: `2025.10.${String(i).padStart(2, '0')}`,
    status: i % 3 === 0 ? 'DRAFT' : 'ARCHIVED',
  })),
];

const Header = ({
  currentNote,
  mode,
  setMode,
  copyStatus,
  isDark,
  setIsDark,
}) => (
  <header className="app-header font-mono">
    <div className="header-group">
      <Layers size={16} style={{ color: 'var(--c-accent)' }} />
      <span style={{ color: 'var(--c-text-sub)' }}>//:ROOT_DATABASE</span>
      <ChevronsRight size={16} style={{ color: 'var(--c-border-strong)' }} />
      <span>{currentNote?.id || '...'}</span>
    </div>
    <div className="header-group">
      <div className="status-indicator">
        <CheckCircle size={12} color="#22c55e" />
        <span>OPERATIONAL</span>
      </div>
      <div className="status-indicator">
        <Wifi size={12} />
        <span>CONN:SECURE</span>
      </div>
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
      </button>
      <span
        style={{ width: '1px', height: '20px', background: 'var(--c-border)' }}
      ></span>
      <button className="btn">
        <Copy size={12} /> {copyStatus}
      </button>
      {mode === 'read' ? (
        <button className="btn" onClick={() => setMode('edit')}>
          <Edit size={12} /> Edit
        </button>
      ) : (
        <>
          <div className="mode-indicator">EDIT MODE</div>
          <button className="btn btn-delete">
            <Trash2 size={12} /> Delete
          </button>
          <button className="btn btn-primary" onClick={() => setMode('read')}>
            <Save size={12} /> Commit Changes
          </button>
        </>
      )}
    </div>
  </header>
);

const NotesSidebar = ({ notes, activeNoteId, onSelect, onAddNew }) => (
  <aside className="app-sidebar-l">
    <div className="dir-header font-mono">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
        }}
      >
        {' '}
        <Folder size={14} /> <span>//:DIR_SCAN</span>
      </div>
      <div className="dir-search-bar">
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <Search
            size={12}
            style={{
              position: 'absolute',
              left: 10,
              top: 10,
              color: 'var(--c-text-sub)',
            }}
          />
          <input
            className="dir-search-input font-mono"
            placeholder="Filter specs..."
          />
        </div>
        <button onClick={onAddNew} className="btn" style={{ padding: '8px' }}>
          <FilePlus size={14} />
        </button>
      </div>
    </div>
    <ul className="dir-list-container">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`dir-item ${activeNoteId === note.id ? 'active' : ''}`}
          onClick={() => onSelect(note.id)}
        >
          <div>{note.title}</div>
          <div className="dir-meta font-mono">
            <span>[MODIFIED: {note.modified}]</span>
            <span
              style={{
                color:
                  note.status === 'STABLE'
                    ? '#22c55e'
                    : note.status === 'DRAFT'
                    ? '#eab308'
                    : 'var(--c-text-sub)',
              }}
            >
              ● {note.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
    <div className="dir-footer font-mono">
      <span>
        [LOAD: {notes.length}/{notes.length}]
      </span>
      <span>[MODE: ASYNC]</span>
      <span>[NET: STABLE]</span>
    </div>
  </aside>
);

const ArticleView = ({ note }) => (
  <div className="doc-canvas">
    <div className="doc-meta-grid font-mono">
      <div className="meta-item">
        <div className="meta-label">SPEC_ID</div>
        <div className="meta-value">{note.id}</div>
      </div>
      <div className="meta-item">
        <div className="meta-label">REVISION</div>
        <div className="meta-value">4.2a</div>
      </div>
      <div className="meta-item">
        <div className="meta-label">STATUS</div>
        <div className="meta-value" style={{ color: '#22c55e' }}>
          {note.status}
        </div>
      </div>
      <div className="meta-item">
        <div className="meta-label">AUTH_LEVEL</div>
        <div className="meta-value">ADMIN</div>
      </div>
    </div>
    <article className="article-content">
      <ReactMarkdown>{note.content}</ReactMarkdown>
    </article>
  </div>
);

/* ==========================================================================
   3\. MAIN LAYOUT
   ========================================================================== */
export default function HeavyTechLayout() {
  const [isDark, setIsDark] = useState(true);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState('SPEC-001');
  const [mode, setMode] = useState('read');
  const [copyStatus, setCopyStatus] = useState('Copy Source');
  const currentNote = useMemo(
    () => notes.find((n) => n.id === activeNoteId),
    [notes, activeNoteId],
  );
  const [markdown, setMarkdown] = useState(currentNote?.content || '');

  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  useEffect(() => {
    setMarkdown(currentNote?.content || '');
  }, [currentNote]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus('Copy Source'), 2000);
  };
  const handleAddNew = () => {
    const newId = `SPEC-${String(notes.length + 1).padStart(3, '0')}`;
    const newNote = {
      id: newId,
      title: 'Untitled Specification',
      content: '# Untitled Specification',
      modified: '2025.10.27',
      status: 'DRAFT',
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newId);
    setMode('edit');
  };
  const handleDelete = () => {
    if (window.confirm(`PERMANENT DELETION: "${currentNote.title}"?`)) {
      const remaining = notes.filter((n) => n.id !== activeNoteId);
      setNotes(remaining);
      setActiveNoteId(remaining[0]?.id || null);
      setMode('read');
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        <Header
          {...{
            currentNote,
            mode,
            setMode,
            copyStatus,
            isDark,
            setIsDark,
          }}
        />
        <NotesSidebar
          notes={notes}
          activeNoteId={activeNoteId}
          onSelect={(id) => {
            setActiveNoteId(id);
            setMode('read');
          }}
          onAddNew={handleAddNew}
        />
        <div className="app-main-container">
          <div className={`app-main-grid ${mode}-mode`}>
            <main className="main-content">
              {mode === 'read' ? (
                <ArticleView note={currentNote} />
              ) : (
                <div className="edit-split-view">
                  <div className="edit-pane">
                    <div className="pane-header font-mono">//:SRC_EDITOR</div>
                    <textarea
                      className="md-editor"
                      value={markdown}
                      onChange={(e) => setMarkdown(e.target.value)}
                    />
                  </div>
                  <div className="edit-pane">
                    <div className="pane-header font-mono">
                      //:PREVIEW_RENDER
                    </div>
                    <article
                      className="article-content"
                      style={{ height: '100%', overflowY: 'auto' }}
                    >
                      <ReactMarkdown>{markdown}</ReactMarkdown>
                    </article>
                  </div>
                </div>
              )}
            </main>
            {mode === 'read' && (
              <aside className="app-sidebar-r">
                <div className="toc-card">
                  <div className="toc-title font-mono">//:PAGE_INDEX</div>
                  <ul className="toc-list font-mono">
                    <li className="toc-item active">State Management</li>
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
