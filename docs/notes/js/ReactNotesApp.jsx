import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  Edit2,
  Hash,
  Moon,
  Plus,
  Save,
  Search,
  Sun,
  Terminal,
  Trash2,
} from 'lucide-react';
import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ReactNotesApp.css';

// Markdown & Katex Imports
import 'katex/dist/katex.min.css';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

// ... (MermaidDiagram 组件保持不变，省略以节省空间) ...
const MermaidDiagram = ({ chart, themeName }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: themeName === 'dark' ? 'dark' : 'default',
      fontFamily: "'JetBrains Mono', monospace",
      securityLevel: 'loose',
    });
    const renderChart = async () => {
      if (!containerRef.current) return;
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        containerRef.current.innerHTML = '';
        const { svg } = await mermaid.render(id, chart);
        if (containerRef.current) containerRef.current.innerHTML = svg;
      } catch (error) {
        if (containerRef.current)
          containerRef.current.innerHTML = `<div style="color:red; font-size:12px; font-family:monospace">SYNTAX ERROR</div>`;
      }
    };
    renderChart();
  }, [chart, themeName]);
  return <div className="markdown__mermaid" ref={containerRef} />;
};

// ... (NoteItem 组件保持不变，省略以节省空间) ...
const NoteItem = ({ note, isActive, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`note-item ${isActive ? 'note-item--active' : ''}`}
      onClick={onClick}
    >
      <div className="note-item__header">
        <span className="note-item__id">#{note.id}</span>
        <div className="note-item__title">{note.title || 'UNTITLED_LOG'}</div>
        <div
          className="note-item__toggle"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </div>
      {expanded && (
        <div className="note-item__preview">
          <p className="note-item__preview-text">
            {note.content || '// No data...'}
          </p>
        </div>
      )}
    </div>
  );
};

const generateId = () => Math.floor(Math.random() * 9000 + 1000).toString();

// ==========================================
// 主组件：ReactNotesApp
// ==========================================
const ReactNotesApp = () => {
  // ... (State 逻辑保持不变) ...
  const [themeMode, setThemeMode] = useState('light');
  const [notes, setNotes] = useState([
    {
      id: '8024',
      title: 'System Architecture',
      content: `# 01. SYSTEM SPECS\nThe system relies on a **flux capacitor** design.\n\n## 02. MATH MODEL\n$$ L = \\frac{1}{2} \\rho v^2 S C_L $$\n\n## 03. DIAGRAMS\n\`\`\`mermaid\ngraph LR\n    A[Client] -->|HTTP/JSON| B(API Gateway)\n    B --> C{Service}\n    D[(Database)]\n\`\`\``,
      updatedAt: new Date().toISOString(),
    },
    {
      id: '1092',
      title: 'Daily Log',
      content: 'Use the `markdown` to write docs.',
      updatedAt: '2023-11-25T14:00:00.000Z',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState('8024');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('notes-theme');
    if (savedTheme) setThemeMode(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('notes-theme', newTheme);
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreate = () => {
    const newNote = {
      id: generateId(),
      title: 'UNTITLED',
      content: '',
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setIsEditing(true);
    setEditDraft(newNote);
  };

  const handleSave = () => {
    if (!editDraft) return;
    const currentTime = new Date().toISOString();
    setNotes(
      notes.map((n) =>
        n.id === editDraft.id ? { ...editDraft, updatedAt: currentTime } : n,
      ),
    );
    setIsEditing(false);
  };

  const handleDeleteRequest = () => setShowDeleteDialog(true);
  const confirmDelete = () => {
    setNotes(notes.filter((n) => n.id !== activeNoteId));
    setActiveNoteId(null);
    setIsEditing(false);
    setShowDeleteDialog(false);
  };

  // Markdown 配置
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      '*': ['className', 'style', 'class'],
    },
    tagNames: [
      ...defaultSchema.tagNames,
      'math',
      'mi',
      'mn',
      'mo',
      'msup',
      'mrow',
      'annotation',
      'semantics',
    ],
  };

  const markdownConfig = {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeRaw,
      [rehypeSanitize, sanitizeSchema],
      rehypeHighlight,
      rehypeKatex,
    ],
    components: {
      img: ({ src, alt }) => (
        <figure className="markdown__figure">
          <img className="markdown__img" src={src} alt={alt} />
          {alt && <figcaption className="markdown__caption">{alt}</figcaption>}
        </figure>
      ),
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const isMermaid = match && match[1] === 'mermaid';
        if (isMermaid) {
          return (
            <MermaidDiagram
              chart={String(children).replace(/\n$/, '')}
              themeName={themeMode}
            />
          );
        }
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    },
  };

  return (
    <div className={`app app--${themeMode}`}>
      {/* Sidebar 保持不变 */}
      <aside className="panel sidebar">
        <div className="sidebar__header">
          <div className="sidebar__top-row">
            <div className="sidebar__title">
              <Cpu size={18} />
              <span>React</span>
              <span className="sidebar__title-highlight">NOTES_OS</span>
            </div>
            <button className="btn btn--icon" onClick={toggleTheme}>
              {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
          <div className="search">
            <div className="search__icon">
              <Search size={14} />
            </div>
            <input
              className="search__input"
              placeholder="QUERY_DB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search__btn btn--primary" onClick={handleCreate}>
              <Plus size={14} /> NEW
            </button>
          </div>
        </div>
        <div className="sidebar__list">
          {filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isActive={note.id === activeNoteId}
              onClick={() => {
                if (isEditing) handleSave();
                setActiveNoteId(note.id);
                setIsEditing(false);
              }}
            />
          ))}
        </div>
        <div className="sidebar__footer">
          SYS_MODE: {themeMode.toUpperCase()}
        </div>
      </aside>

      {/* Editor Panel */}
      <main className="panel editor">
        {!activeNote ? (
          <div className="editor__empty">
            <Terminal size={48} strokeWidth={1} style={{ marginBottom: 16 }} />
            <div>AWAITING INPUT...</div>
          </div>
        ) : (
          <>
            <div className="editor__toolbar">
              <div className="editor__breadcrumb">
                <Hash size={14} className="editor__breadcrumb-icon" />
                <span>ROOT</span>
                <ChevronRight size={12} />
                <strong className="editor__breadcrumb-text">
                  {activeNote.title || 'UNTITLED'}
                </strong>
              </div>
              <div className="editor__actions">
                {isEditing ? (
                  <>
                    <div className="editor__status editor__status--active">
                      EDITING_MODE
                    </div>
                    <button
                      className="btn btn--cmd btn--danger"
                      onClick={handleDeleteRequest}
                    >
                      <Trash2 size={14} /> DELETE
                    </button>
                    <button
                      className="btn btn--cmd btn--primary"
                      onClick={handleSave}
                    >
                      <Save size={14} /> SAVE_CHANGES
                    </button>
                  </>
                ) : (
                  <>
                    <div className="editor__status">READ_ONLY</div>
                    <button
                      className="btn btn--cmd"
                      onClick={() => {
                        setEditDraft({ ...activeNote });
                        setIsEditing(true);
                      }}
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="editor__canvas">
              {isEditing ? (
                <>
                  {/* 编辑模式：标题 (带标签) */}
                  <div className="pane-wrapper pane-wrapper--title">
                    <span className="pane-label">METADATA // TITLE</span>
                    <input
                      className="editor__input-title"
                      value={editDraft?.title}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, title: e.target.value })
                      }
                      placeholder="ENTER_TITLE"
                    />
                  </div>

                  {/* 编辑模式：分栏 (带标签) */}
                  <div className="editor__split">
                    {/* 左侧：源码 */}
                    <div className="pane-wrapper pane-wrapper--scroll">
                      <span className="pane-label">INPUT // SOURCE</span>
                      <textarea
                        className="editor__input-content"
                        value={editDraft?.content}
                        onChange={(e) =>
                          setEditDraft({
                            ...editDraft,
                            content: e.target.value,
                          })
                        }
                        placeholder="// BEGIN TRANSMISSION..."
                        spellCheck={false}
                      />
                    </div>

                    {/* 右侧：预览 */}
                    <div className="pane-wrapper pane-wrapper--scroll pane-wrapper--preview-bg">
                      <span className="pane-label">OUTPUT // PREVIEW</span>
                      <div className="editor__viewer editor__viewer--preview">
                        <div className="markdown">
                          <ReactMarkdown {...markdownConfig}>
                            {editDraft.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* 阅读模式：单栏 (带标签) */
                <div className="editor__viewer">
                  {/* 标题区 */}
                  <div className="pane-wrapper pane-wrapper--title">
                    <span className="pane-label">DOC // HEADER</span>
                    <h1 className="editor__viewer-title">{activeNote.title}</h1>
                    <div className="editor__meta">
                      <Clock size={12} style={{ marginRight: 6 }} />
                      LAST UPDATED:{' '}
                      {new Date(activeNote.updatedAt).toLocaleString()}
                    </div>
                  </div>

                  {/* 正文区 */}
                  <div className="pane-wrapper">
                    <span className="pane-label">DOC // BODY</span>
                    <div className="markdown">
                      <ReactMarkdown {...markdownConfig}>
                        {activeNote.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Modal 部分保持不变 */}
      {showDeleteDialog && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteDialog(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__content">
              <AlertTriangle
                size={48}
                color={themeMode === 'light' ? '#dc2626' : '#f87171'}
                strokeWidth={1.5}
              />
              <h3 className="modal__title">Confirm Protocol</h3>
              <p className="modal__text">
                Are you sure you want to delete note{' '}
                <strong>#{activeNoteId}</strong>?
              </p>
              <div className="modal__actions">
                <button
                  className="modal__btn"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="modal__btn modal__btn--danger"
                  onClick={confirmDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactNotesApp;
