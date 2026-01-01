import {
  Activity,
  CheckSquare,
  Code as CodeIcon,
  Database,
  Hash,
  Layers,
  Link as LinkIcon,
  MapPin,
  MoreVertical,
  Paperclip,
  Search,
} from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// --- Types ---
interface Memo {
  id: string;
  content: string;
  timestamp: string;
  tags: string[];
}

// --- Mock Data ---
const MOCK_MEMOS: Memo[] = [
  {
    id: 'M-1024',
    content: `Hello world. This is my first memo! #hello

> System initialized successfully.
`,
    timestamp: '2025-08-20T10:00:00',
    tags: ['hello'],
  },
  {
    id: 'M-1025',
    content: `And here are my **tasks**. #todo

- [x] deploy memos for myself;
- [ ] share to my friends;
- [ ] sounds good to me!`,
    timestamp: '2025-08-20T10:05:00',
    tags: ['todo'],
  },
  {
    id: 'M-1026',
    content: `Wow, it can be **referenced** too! REALLY GREAT!!! #features

Observed performance metrics within expected parameters.`,
    timestamp: '2025-08-20T12:30:00',
    tags: ['features'],
  },
];

const TAGS = ['features', 'hello', 'sponsor', 'todo', 'dev', 'sys'];

// --- Styles (Injected) ---
const STYLES = `
:root {
  --c-bg: #f8fafc;        /* Outer Background */
  --c-canvas: #ffffff;    /* Diagram Background */
  --c-border: #cbd5e1;    /* Slate-300 - Sturdy borders */
  --c-border-light: #e2e8f0;
  --c-text-main: #0f172a; /* Slate-900 */
  --c-text-sub: #64748b;  /* Slate-500 */
  --c-accent: #0f172a;    /* Black accent for active states */
  --c-accent-hover: #334155;
  
  --font-ui: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  --border-width: 1px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0;
  background-color: var(--c-bg);
  font-family: var(--font-ui);
  color: var(--c-text-main);
  -webkit-font-smoothing: antialiased;
}

/* Layout Grid */
.bp-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: var(--spacing-md);
  background-color: var(--c-bg);
  gap: var(--spacing-md);
}

.bp-frame {
  background-color: var(--c-canvas);
  border: var(--border-width) solid var(--c-border);
  display: flex;
  flex: 1;
  overflow: hidden; /* Contain scroll */
  position: relative;
}

/* Sidebar */
.bp-sidebar {
  width: 280px;
  flex-shrink: 0;
  border-right: var(--border-width) solid var(--c-border);
  display: flex;
  flex-direction: column;
  background-color: var(--c-canvas);
}

.bp-header {
  height: 60px;
  border-bottom: var(--border-width) solid var(--c-border);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
}

.bp-header__title {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.bp-search {
  padding: var(--spacing-md);
  border-bottom: var(--border-width) solid var(--c-border);
}

.bp-input-wrapper {
  display: flex;
  align-items: center;
  border: var(--border-width) solid var(--c-border);
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);
  background: var(--c-canvas);
}

.bp-input-wrapper:focus-within {
  border-color: var(--c-text-main);
}

.bp-input {
  border: none;
  background: transparent;
  width: 100%;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-main);
  outline: none;
}

.bp-nav {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow-y: auto;
}

.bp-section-title {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--c-text-sub);
  letter-spacing: 1px;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
}

.bp-menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  color: var(--c-text-sub);
  cursor: pointer;
  font-size: 14px;
  transition: color 0.1s;
}

.bp-menu-item:hover, .bp-menu-item--active {
  color: var(--c-text-main);
}

.bp-menu-item--active {
  font-weight: 600;
}

.bp-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.bp-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-text-sub);
  cursor: pointer;
}

.bp-tag::before { content: '#'; color: var(--c-border); margin-right: 2px; }
.bp-tag:hover { color: var(--c-text-main); text-decoration: underline; }

/* Main Content */
.bp-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--c-canvas);
  overflow: hidden;
}

.bp-editor-files {
  padding: var(--spacing-md);
  border-bottom: var(--border-width) solid var(--c-border);
}

.bp-editor-box {
  border: var(--border-width) solid var(--c-border);
  padding: var(--spacing-md);
}

.bp-textarea {
  width: 100%;
  border: none;
  resize: vertical;
  min-height: 80px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  outline: none;
  color: var(--c-text-main);
  background: transparent;
}

.bp-toolbar {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-sm);
  align-items: center;
}

.bp-tools {
  display: flex;
  gap: var(--spacing-sm);
}

.bp-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-text-sub);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bp-icon-btn:hover { color: var(--c-text-main); }

.bp-btn {
  background: var(--c-text-main);
  color: var(--c-canvas);
  border: none;
  padding: 6px 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}

.bp-btn:hover {
  opacity: 0.9;
}

/* Stream */
.bp-stream {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.bp-memo-card {
  border: var(--border-width) solid var(--c-border);
  background: var(--c-canvas);
}

.bp-memo-header {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: var(--border-width) solid var(--c-border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
}

.bp-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-text-sub);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bp-memo-content {
  padding: var(--spacing-md);
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-text-main);
}

.bp-memo-content p { margin: 0 0 10px 0; }
.bp-memo-content p:last-child { margin: 0; }
.bp-memo-content ul { padding-left: 20px; }
.bp-memo-content blockquote {
  border-left: 2px solid var(--c-border);
  margin: 0;
  padding-left: var(--spacing-md);
  color: var(--c-text-sub);
}

/* Utils */
.bp-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 2px 6px;
  border: 1px solid var(--c-border);
  color: var(--c-text-sub);
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--c-border); }
::-webkit-scrollbar-thumb:hover { background: var(--c-text-sub); }
`;

// --- Components ---

const Sidebar = () => (
  <aside className="bp-sidebar">
    <div className="bp-header">
      <div className="bp-header__title">
        <Database size={16} />
        MEMO-ENGINE-V1
      </div>
    </div>

    <div className="bp-search">
      <div className="bp-input-wrapper">
        <Search size={14} className="bp-icon-btn" />
        <input className="bp-input" placeholder="SEARCH_MEMOS..." />
        <span className="bp-badge">CTRL+K</span>
      </div>
    </div>

    <nav className="bp-nav">
      <div>
        <div className="bp-section-title">Timeline</div>
        <div className="bp-menu-item bp-menu-item--active">
          <Activity size={16} />
          <span>Stream</span>
        </div>
        <div className="bp-menu-item">
          <Layers size={16} />
          <span>Resources</span>
        </div>
      </div>

      <div>
        <div className="bp-section-title">Filter By Tags</div>
        <div className="bp-tag-list">
          {TAGS.map((tag) => (
            <span key={tag} className="bp-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </nav>
  </aside>
);

const Editor = ({ onSave }: { onSave: (text: string) => void }) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(text);
    setText('');
  };

  return (
    <div className="bp-editor-files">
      <div className="bp-editor-box">
        <textarea
          className="bp-textarea"
          placeholder="Input thought stream..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="bp-toolbar">
          <div className="bp-tools">
            <button className="bp-icon-btn">
              <Hash size={14} />
            </button>
            <button className="bp-icon-btn">
              <CheckSquare size={14} />
            </button>
            <button className="bp-icon-btn">
              <LinkIcon size={14} />
            </button>
            <button className="bp-icon-btn">
              <CodeIcon size={14} />
            </button>
            <button className="bp-icon-btn">
              <MapPin size={14} />
            </button>
            <button className="bp-icon-btn">
              <Paperclip size={14} />
            </button>
          </div>
          <button className="bp-btn" onClick={handleSave}>
            Process Input
          </button>
        </div>
      </div>
    </div>
  );
};

const MemoCard = ({ memo }: { memo: Memo }) => {
  return (
    <div className="bp-memo-card">
      <div className="bp-memo-header">
        <span className="bp-meta">
          {new Date(memo.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          <span style={{ margin: '0 8px', color: 'var(--c-border)' }}>|</span>
          ID: {memo.id}
        </span>
        <button className="bp-icon-btn">
          <MoreVertical size={14} />
        </button>
      </div>
      <div className="bp-memo-content">
        <ReactMarkdown>{memo.content}</ReactMarkdown>
      </div>
    </div>
  );
};

// --- Main Application ---
const BlueprintMemos: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>(MOCK_MEMOS);

  const addMemo = (content: string) => {
    const newMemo: Memo = {
      // id: \`M-\${1027 + memos.length}\`,
      content,
      timestamp: new Date().toISOString(),
      tags: [],
    };
    setMemos([newMemo, ...memos]);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="bp-layout">
        <div className="bp-frame">
          <Sidebar />
          <main className="bp-main">
            <Editor onSave={addMemo} />
            <div className="bp-stream">
              {memos.map((memo) => (
                <MemoCard key={memo.id} memo={memo} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default BlueprintMemos;
