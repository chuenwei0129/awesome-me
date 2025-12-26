/**
 * iframe: true;
 */

import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Clock,
  Cpu,
  Database,
  Edit2,
  Hash,
  List,
  Moon,
  Plus,
  Save,
  Search,
  Sun, // 新增图标：用于 Metadata
  Tag,
  Terminal,
  Trash2,
} from 'lucide-react';
import mermaid from 'mermaid';
import { useEffect, useMemo, useRef, useState } from 'react'; // 引入 useMemo
import ReactMarkdown from 'react-markdown';
import './ReactNotesApp.css';

// Markdown Imports
import 'katex/dist/katex.min.css';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkFrontmatter from 'remark-frontmatter'; // <--- 新增插件
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

// ... (slugify, extractHeadings, MermaidDiagram, CodeBlock 保持不变，省略以节省空间) ...
// 请保留之前的 CodeBlock, MermaidDiagram, NoteItem 组件代码
const slugify = (text) => {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const extractHeadings = (markdown) => {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const headings = [];
  const headingRegex = /^(#{1,6})\s+(.*)$/;
  lines.forEach((line) => {
    const match = line.match(headingRegex);
    if (match)
      headings.push({
        level: match[1].length,
        text: match[2],
        id: slugify(match[2]),
      });
  });
  return headings;
};

// ... (MermaidDiagram, CodeBlock, NoteItem 代码同上一次回答) ...
// 为了代码简洁，这里假设你已经保留了 MermaidDiagram, CodeBlock, NoteItem 组件

// ==========================================
// 工具：Front Matter 解析器
// ==========================================
const parseFrontMatter = (text) => {
  if (!text) return { metadata: {}, content: '' };

  // 匹配开头的 YAML 块
  const regex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
  const match = text.match(regex);

  if (match) {
    const yamlBlock = match[1];
    const content = text.replace(regex, '').trim(); // 去除头部后的正文
    const metadata = {};

    // 简单的 YAML 解析 (Key: Value)
    yamlBlock.split('\n').forEach((line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts
          .slice(1)
          .join(':')
          .trim()
          .replace(/(^"|"$)/g, '')
          .replace(/(^'|'$)/g, ''); // 去引号
        // 处理数组格式 [a, b, c]
        if (value.startsWith('[') && value.endsWith(']')) {
          metadata[key] = value
            .slice(1, -1)
            .split(',')
            .map((v) => v.trim());
        } else {
          metadata[key] = value;
        }
      }
    });

    return { metadata, content };
  }

  return { metadata: {}, content: text };
};

// ==========================================
// 组件：Metadata Panel (侧边栏显示元数据)
// ==========================================
const MetadataPanel = ({ metadata }) => {
  const keys = Object.keys(metadata);
  if (keys.length === 0) return null;

  return (
    <div className="meta-panel">
      <div className="meta-panel__header">
        <Database size={12} /> <span>METADATA_LAYER</span>
      </div>
      <div className="meta-panel__grid">
        {keys.map((key) => (
          <div key={key} className="meta-row">
            <span className="meta-key">{key}</span>
            <span className="meta-val">
              {Array.isArray(metadata[key]) ? (
                <div className="meta-tags">
                  {metadata[key].map((tag, i) => (
                    <span key={i} className="meta-tag">
                      <Tag size={8} /> {tag}
                    </span>
                  ))}
                </div>
              ) : (
                metadata[key]
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ... (CodeBlock, NoteItem, TOC 组件同上) ...
// 必须重新定义一次 TableOfContents 及其依赖，确保完整性
const TableOfContents = ({ markdown }) => {
  // 这里的 markdown 应该是去除 metadata 后的 content
  const headings = extractHeadings(markdown);
  if (headings.length === 0)
    return <div className="toc-empty">NO_HEADERS_FOUND</div>;
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <nav className="toc">
      <ul className="toc__list">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`toc__item toc__item--h${heading.level}`}
            onClick={() => handleScroll(heading.id)}
          >
            <span className="toc__link">
              <span className="toc__prefix">{'>'.repeat(heading.level)}</span>
              {heading.text}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const CodeBlock = ({ language, children, className, ...props }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const handleCopy = () => {
    if (codeRef.current) {
      const text = codeRef.current.innerText || codeRef.current.textContent;
      navigator.clipboard.writeText(text.replace(/\n$/, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__lang">{language || 'TEXT'}</span>
        <button
          className={`code-block__copy ${
            copied ? 'code-block__copy--active' : ''
          }`}
          onClick={handleCopy}
          title="Copy"
        >
          {copied ? <Check size={14} /> : <Clipboard size={14} />}{' '}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
      <pre className="code-block__pre">
        <code ref={codeRef} className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

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
// 主组件
// ==========================================
const ReactNotesApp = () => {
  const [themeMode, setThemeMode] = useState('light');
  // 更新默认笔记，包含 metadata 示例
  const [notes, setNotes] = useState([
    {
      id: '8024',
      title: 'System Architecture',
      content: `---\nauthor: Dr. Brown\nstatus: Confidential\ntags: [flux, time-travel, physics]\nversion: 1.2.0\n---\n\n# 01. SYSTEM SPECS\nThe system relies on a **flux capacitor** design.\n\n## 02. CODE\n\`\`\`javascript\nconst time = Date.now();\n\`\`\``,
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
      content: '---\ncreated: now\n---\n',
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

  // --- 关键：实时解析 Metadata ---
  // 使用 useMemo 避免每次渲染都重新解析
  const { metadata: parsedMetadata, content: parsedContent } = useMemo(() => {
    const targetContent = isEditing ? editDraft?.content : activeNote?.content;
    return parseFrontMatter(targetContent);
  }, [isEditing, editDraft?.content, activeNote?.content]);

  // --- Config ---
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      '*': ['className', 'style', 'class', 'id'],
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

  const HeadingRenderer = ({ level, children, ...props }) => {
    const textContent = Array.isArray(children)
      ? children.filter((c) => typeof c === 'string').join('')
      : typeof children === 'string'
      ? children
      : '';
    const id = slugify(textContent);
    const Tag = `h${level}`;
    return (
      <Tag id={id} {...props}>
        {children}
      </Tag>
    );
  };

  const markdownConfig = {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkFrontmatter, // 告诉 remark 忽略 frontmatter 部分的渲染
    ],
    rehypePlugins: [
      rehypeRaw,
      [rehypeSanitize, sanitizeSchema],
      rehypeHighlight,
      rehypeKatex,
    ],
    components: {
      h1: (props) => <HeadingRenderer level={1} {...props} />,
      h2: (props) => <HeadingRenderer level={2} {...props} />,
      h3: (props) => <HeadingRenderer level={3} {...props} />,
      h4: (props) => <HeadingRenderer level={4} {...props} />,
      h5: (props) => <HeadingRenderer level={5} {...props} />,
      h6: (props) => <HeadingRenderer level={6} {...props} />,
      img: ({ src, alt }) => (
        <figure className="markdown__figure">
          <img className="markdown__img" src={src} alt={alt} />
          {alt && <figcaption className="markdown__caption">{alt}</figcaption>}
        </figure>
      ),
      pre: ({ children }) => <>{children}</>,
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const isMermaid = match && match[1] === 'mermaid';
        if (inline)
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        if (isMermaid)
          return (
            <MermaidDiagram
              chart={String(children).replace(/\n$/, '')}
              themeName={themeMode}
            />
          );
        return (
          <CodeBlock
            language={match ? match[1].toUpperCase() : null}
            className={className}
            {...props}
          >
            {children}
          </CodeBlock>
        );
      },
    },
  };

  return (
    <div className={`app app--${themeMode}`}>
      {/* Sidebar 保持不变 */}
      <aside className="panel sidebar">
        <div className="sidebar__header">
          {/* ... Header Content ... */}
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
                {/* 优先显示 metadata 中的 title，如果没有则显示数据库 title */}
                <strong className="editor__breadcrumb-text">
                  {parsedMetadata.title || activeNote.title || 'UNTITLED'}
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
                  <div className="editor__split">
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
                    <div className="pane-wrapper pane-wrapper--scroll pane-wrapper--preview-bg">
                      <span className="pane-label">OUTPUT // PREVIEW</span>
                      <div className="editor__viewer editor__viewer--preview">
                        <div className="markdown">
                          {/* 预览模式下：只显示去除 metadata 后的 content */}
                          <ReactMarkdown {...markdownConfig}>
                            {parsedContent}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="read-layout">
                  <div className="read-layout__main">
                    <div className="pane-wrapper pane-wrapper--title">
                      <span className="pane-label">DOC // HEADER</span>
                      {/* 这里也优先展示 Metadata 的标题 */}
                      <h1 className="editor__viewer-title">
                        {parsedMetadata.title || activeNote.title}
                      </h1>
                      <div className="editor__meta">
                        <Clock size={12} style={{ marginRight: 6 }} />
                        LAST UPDATED:{' '}
                        {new Date(activeNote.updatedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="pane-wrapper">
                      <span className="pane-label">DOC // BODY</span>
                      <div className="editor__viewer-content">
                        <div className="markdown">
                          {/* 阅读模式下：只显示去除 metadata 后的 content */}
                          <ReactMarkdown {...markdownConfig}>
                            {parsedContent}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="read-layout__sidebar">
                    <div className="pane-wrapper pane-wrapper--scroll">
                      <span className="pane-label">SYS // INFO</span>
                      <div className="toc-container">
                        {/* 新增：Metadata 面板 */}
                        <MetadataPanel metadata={parsedMetadata} />

                        <div className="toc-header">
                          <List size={14} /> <span>INDEX</span>
                        </div>
                        <TableOfContents markdown={parsedContent} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Modal 部分 */}
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
