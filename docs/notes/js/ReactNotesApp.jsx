/**
 * iframe: true
 */

import React, { useEffect, useRef, useState } from 'react';
// 图标库引入
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
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
// 流程图插件
import mermaid from 'mermaid';
// Markdown 渲染核心
import ReactMarkdown from 'react-markdown';

// 引入样式文件
import './ReactNotesApp.css';

// ==========================================
// KaTeX (数学公式) 相关引入
// ==========================================
import 'katex/dist/katex.min.css'; // 核心样式，必须引入，否则公式乱码
import rehypeKatex from 'rehype-katex'; // 插件：将解析后的数学公式渲染为 HTML
import remarkMath from 'remark-math'; // 插件：解析 Markdown 中的 $公式$ 语法

// ==========================================
// Markdown 其他插件引入
// ==========================================
import rehypeHighlight from 'rehype-highlight'; // 代码高亮
import rehypeRaw from 'rehype-raw'; // 允许解析 Markdown 中的原始 HTML
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'; // 安全净化（防止 XSS 攻击）
import remarkGfm from 'remark-gfm'; // 支持 GitHub 风格的 Markdown (表格、任务列表等)

// ==========================================
// 组件：Mermaid 流程图渲染器
// 描述：这是一个独立的封装组件，用于处理 Mermaid 的异步渲染逻辑
// ==========================================
const MermaidDiagram = ({ chart, themeName }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. 初始化 Mermaid 配置
    mermaid.initialize({
      startOnLoad: false,
      theme: themeName === 'dark' ? 'dark' : 'default', // 跟随主应用主题
      fontFamily: "'JetBrains Mono', monospace",
      securityLevel: 'loose',
    });

    // 2. 渲染图表函数
    const renderChart = async () => {
      if (containerRef.current) {
        try {
          // 生成唯一 ID，防止多个图表冲突
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          containerRef.current.innerHTML = '';
          // 调用 mermaid API 生成 SVG
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid error:', error);
          // 错误回退显示
          containerRef.current.innerHTML = `<div style="color:red; font-size:12px; font-family:monospace">SYNTAX ERROR</div>`;
        }
      }
    };
    renderChart();
  }, [chart, themeName]); // 当图表代码或主题变化时重新渲染

  return <div className="mermaid-wrapper" ref={containerRef} />;
};

// 工具函数：生成随机 ID
const generateId = () => Math.floor(Math.random() * 9000 + 1000).toString();

// ==========================================
// 组件：侧边栏笔记列表项
// ==========================================
const NoteItem = ({ note, isActive, onClick }) => {
  const [expanded, setExpanded] = useState(false); // 控制预览内容的折叠/展开

  return (
    <div className={`note-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="note-header">
        <span className="note-id">#{note.id}</span>
        <div className="note-title">{note.title || 'UNTITLED_LOG'}</div>
        {/* 折叠按钮：阻止冒泡，避免触发 onClick 切换笔记 */}
        <div
          className="expand-trigger"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </div>
      {/* 展开后的预览内容 */}
      {expanded && (
        <div className="note-content-preview">
          <p>{note.content || '// No data...'}</p>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 主组件：ReactNotesApp
// ==========================================
const ReactNotesApp = () => {
  // --- 状态管理 ---
  const [themeMode, setThemeMode] = useState('light'); // 主题状态
  const [notes, setNotes] = useState([
    // 初始示例数据
    {
      id: '8024',
      title: 'System Architecture',
      content: `# 01. SYSTEM SPECS

The system relies on a **flux capacitor** design.

## 02. MATH MODEL (KaTeX)

Lift($L$) can be determined by Lift Coefficient ($C_L$):

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$

## 03. DIAGRAMS

\`\`\`mermaid
graph LR
    A[Client] -->|HTTP/JSON| B(API Gateway)
    B --> C{Service Registry}
    D[(Database)]
\`\`\`
`,
      updatedAt: new Date().toISOString(),
    },
    {
      id: '1092',
      title: 'Daily Log',
      content: 'Use the `markdown` to write docs.',
      updatedAt: '2023-11-25T14:00:00',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState('8024'); // 当前选中的笔记 ID
  const [searchQuery, setSearchQuery] = useState(''); // 搜索关键词
  const [isEditing, setIsEditing] = useState(false); // 是否处于编辑模式
  const [editDraft, setEditDraft] = useState(null); // 编辑时的临时草稿（防止直接修改原数据）
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // 删除确认弹窗

  // --- 副作用 (Effects) ---

  // 初始化：从 localStorage 读取上次保存的主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('notes-theme');
    if (savedTheme) setThemeMode(savedTheme);
  }, []);

  // --- 事件处理函数 (Handlers) ---

  // 切换主题
  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('notes-theme', newTheme);
  };

  // 计算当前激活的笔记对象
  const activeNote = notes.find((n) => n.id === activeNoteId);

  // 搜索过滤逻辑
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 创建新笔记
  const handleCreate = () => {
    const newNote = {
      id: generateId(),
      title: 'UNTITLED',
      content: '',
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]); // 添加到列表头部
    setActiveNoteId(newNote.id); // 自动选中
    setIsEditing(true); // 自动进入编辑模式
    setEditDraft(newNote); // 初始化草稿
  };

  // 保存更改
  const handleSave = () => {
    if (!editDraft) return;
    setNotes(
      notes.map((n) =>
        n.id === editDraft.id
          ? { ...editDraft, updatedAt: new Date().toISOString() }
          : n,
      ),
    );
    setIsEditing(false); // 退出编辑模式
  };

  // 请求删除（显示弹窗）
  const handleDeleteRequest = () => setShowDeleteDialog(true);

  // 确认删除
  const confirmDelete = () => {
    setNotes(notes.filter((n) => n.id !== activeNoteId));
    setActiveNoteId(null);
    setIsEditing(false);
    setShowDeleteDialog(false);
  };

  // --- 核心配置：Markdown 净化规则 ---
  // 重要：rehype-sanitize 默认会移除 'className' 和 'style'。
  // 但 KaTeX（数学公式）和 Highlight.js（代码高亮）严重依赖 class 来显示样式。
  // 因此必须放宽这些限制。
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      '*': ['className', 'style', 'class'], // 允许所有标签携带 class 和 style
    },
    // 允许数学相关标签通过
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

  return (
    // 最外层容器：通过 className='light' 或 'dark' 控制 CSS 变量
    <div className={`app-container ${themeMode}`}>
      {/* 区域 1：侧边栏 (Sidebar) */}
      <div className="tech-panel sidebar">
        {/* 头部：标题与搜索 */}
        <div className="header-block">
          <div className="top-row">
            <div className="app-title">
              <Cpu size={18} />
              <span>React</span>
              <span className="highlight">NOTES_OS</span>
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title="Toggle System Mode"
            >
              {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>

          <div className="search-box">
            <div className="search-icon-wrapper">
              <Search size={14} />
            </div>
            <input
              className="search-input"
              placeholder="QUERY_DB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="action-button primary" onClick={handleCreate}>
              <Plus size={14} /> NEW
            </button>
          </div>
        </div>

        {/* 笔记列表 */}
        <div className="list-container">
          {filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isActive={note.id === activeNoteId}
              onClick={() => {
                // 如果正在编辑其他笔记，切换前先自动保存
                if (isEditing) handleSave();
                setActiveNoteId(note.id);
                setIsEditing(false);
              }}
            />
          ))}
        </div>

        <div className="sys-mode-footer">
          SYS_MODE: {themeMode.toUpperCase()}
        </div>
      </div>

      {/* 区域 2：主编辑/阅读区 (Main Area) */}
      <div className="tech-panel main-area">
        {!activeNote ? (
          // 空状态显示
          <div className="empty-state">
            <Terminal size={48} strokeWidth={1} style={{ marginBottom: 16 }} />
            <div>AWAITING INPUT...</div>
          </div>
        ) : (
          <>
            {/* 工具栏：面包屑与操作按钮 */}
            <div className="editor-toolbar">
              <div className="breadcrumb">
                <Hash size={14} className="icon" />
                <span>ROOT</span>
                <ChevronRight size={12} />
                <strong>{activeNote.title || 'UNTITLED'}</strong>
              </div>
              <div className="toolbar-actions">
                {isEditing ? (
                  // 编辑模式下的按钮
                  <>
                    <div className="status-indicator active">EDITING_MODE</div>
                    <button
                      className="cmd-button danger"
                      onClick={handleDeleteRequest}
                    >
                      <Trash2 size={14} /> DELETE
                    </button>
                    <button className="cmd-button primary" onClick={handleSave}>
                      <Save size={14} /> SAVE_CHANGES
                    </button>
                  </>
                ) : (
                  // 阅读模式下的按钮
                  <>
                    <div className="status-indicator">READ_ONLY</div>
                    <button
                      className="cmd-button"
                      onClick={() => {
                        setEditDraft({ ...activeNote }); // 将当前笔记载入草稿
                        setIsEditing(true);
                      }}
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 内容区域 */}
            <div className="editor-canvas">
              {isEditing ? (
                // --- 编辑模式：输入框 ---
                <>
                  <input
                    className="title-input"
                    value={editDraft?.title}
                    onChange={(e) =>
                      setEditDraft({ ...editDraft, title: e.target.value })
                    }
                    placeholder="ENTER_TITLE"
                  />
                  <textarea
                    className="content-area"
                    value={editDraft?.content}
                    onChange={(e) =>
                      setEditDraft({ ...editDraft, content: e.target.value })
                    }
                    placeholder="// BEGIN TRANSMISSION..."
                    spellCheck={false}
                  />
                </>
              ) : (
                // --- 阅读模式：Markdown 预览 ---
                <div className="viewer-scroll-wrapper">
                  <h1 className="viewer-title">{activeNote.title}</h1>
                  <div className="markdown-container">
                    <ReactMarkdown
                      // 1. Remark 插件：处理 Markdown 语法
                      remarkPlugins={[
                        remarkGfm, // 表格、任务列表
                        remarkMath, // 数学公式解析 ($...$)
                      ]}
                      // 2. Rehype 插件：处理 HTML AST
                      rehypePlugins={[
                        rehypeRaw, // 解析原生 HTML
                        [rehypeSanitize, sanitizeSchema], // 净化 HTML（允许 class）
                        rehypeHighlight, // 代码高亮
                        rehypeKatex, // 数学公式渲染
                      ]}
                      // 3. 自定义组件渲染
                      components={{
                        // 自定义图片渲染
                        img: ({ src, alt }) => (
                          <figure className="md-figure">
                            <img className="md-img" src={src} alt={alt} />
                            {alt && (
                              <figcaption className="md-caption">
                                {alt}
                              </figcaption>
                            )}
                          </figure>
                        ),
                        // 自定义代码块渲染（用于拦截 Mermaid）
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const isMermaid = match && match[1] === 'mermaid';

                          if (isMermaid) {
                            // 移除末尾换行符
                            const codeString = String(children).replace(
                              /\n$/,
                              '',
                            );
                            return (
                              <MermaidDiagram
                                chart={codeString}
                                themeName={themeMode}
                              />
                            );
                          }
                          // 普通代码块
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {activeNote.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 区域 3：删除确认弹窗 (Modal) */}
      {showDeleteDialog && (
        <div className="overlay" onClick={() => setShowDeleteDialog(false)}>
          <div className="dialog-panel" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-content">
              <AlertTriangle
                size={48}
                color={themeMode === 'light' ? '#dc2626' : '#f87171'}
                strokeWidth={1.5}
              />
              <h3 className="dialog-title">Confirm Protocol</h3>
              <p className="dialog-text">
                Are you sure you want to delete note{' '}
                <strong>#{activeNoteId}</strong>?
                <br />
                This action is irreversible and data will be lost.
              </p>
              <div className="button-group">
                <button
                  className="modal-button"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </button>
                <button className="modal-button danger" onClick={confirmDelete}>
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
