/**
 * iframe: true
 */

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
import mermaid from 'mermaid';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from 'styled-components';

// ==========================================
// 1. THEME DEFINITIONS (主题定义)
// ==========================================

const sharedTheme = {
  fonts: {
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    sans: "'Inter', sans-serif",
  },
  spacing: { unit: 4 },
};

const lightTheme = {
  ...sharedTheme,
  name: 'light',
  colors: {
    bg: '#f0f2f5',
    panel: '#ffffff',
    border: '#1a1a1a',
    borderDim: '#d4d4d8',
    text: '#1a1a1a',
    textDim: '#71717a',
    accent: '#0055ff',
    warning: '#dc2626',
    grid: '#e5e7eb',
    shadow: 'rgba(0,0,0,1)',
    activeItem: '#f0f9ff',
    surfaceHover: '#f4f4f5',
    codeBg: '#f4f4f5',
  },
};

const darkTheme = {
  ...sharedTheme,
  name: 'dark',
  colors: {
    bg: '#09090b',
    panel: '#18181b',
    border: '#52525b',
    borderDim: '#27272a',
    text: '#e4e4e7',
    textDim: '#a1a1aa',
    accent: '#38bdf8',
    warning: '#f87171',
    grid: '#27272a',
    shadow: '#000000',
    activeItem: '#1e293b',
    surfaceHover: '#27272a',
    codeBg: '#27272a',
  },
};

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: ${(props) => props.theme.fonts.sans};
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    
    background-image: 
      linear-gradient(${(props) =>
        props.theme.colors.grid} 1px, transparent 1px),
      linear-gradient(90deg, ${(props) =>
        props.theme.colors.grid} 1px, transparent 1px);
    background-size: 20px 20px;
    height: 100vh;
    overflow: hidden;
  }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${(props) =>
    props.theme.colors.border}; }
`;

// ==========================================
// 2. LAYOUT & STRUCTURAL COMPONENTS (布局组件)
// ==========================================

const Frame = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  gap: 16px;
  overflow: hidden; /* 防止溢出 */
`;

const TechPanel = styled.div`
  background: ${(props) => props.theme.colors.panel};
  border: 2px solid ${(props) => props.theme.colors.border};
  box-shadow: 4px 4px 0px ${(props) => props.theme.colors.shadow};
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '+';
    position: absolute;
    top: -9px;
    right: -9px;
    background: ${(props) => props.theme.colors.bg};
    font-family: ${(props) => props.theme.fonts.mono};
    font-weight: bold;
    color: ${(props) => props.theme.colors.border};
    line-height: 1;
    width: 16px;
    text-align: center;
    transition: background 0.3s ease, color 0.3s ease;
  }
`;

const Sidebar = styled(TechPanel)`
  width: 340px;
  min-width: 340px;
  z-index: 2;
  /* 确保侧边栏内容垂直排列 */
  display: flex;
  flex-direction: column;
`;

const MainArea = styled(TechPanel)`
  flex: 1;
  z-index: 1;
  /* 确保主区域内容垂直排列 */
  display: flex;
  flex-direction: column;
  min-width: 0; /* 关键：防止 Flex 子元素内容溢出导致布局崩坏 */
`;

// ==========================================
// 3. SIDEBAR COMPONENTS (侧边栏组件)
// ==========================================

const HeaderBlock = styled.div`
  padding: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.panel};
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0; /* 防止头部被压缩 */
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppTitle = styled.div`
  font-family: ${(props) => props.theme.fonts.mono};
  font-weight: 800;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 8px;

  span.highlight {
    background: ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.panel};
    padding: 2px 6px;
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.textDim};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  height: 40px;

  &:focus-within {
    outline: 2px solid ${(props) => props.theme.colors.accent};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  height: 100%;
  padding: 0 12px;
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 12px;
  outline: none;
  background: transparent;
  color: ${(props) => props.theme.colors.text};

  &::placeholder {
    color: ${(props) => props.theme.colors.textDim};
    text-transform: uppercase;
  }
`;

const ActionButton = styled.button`
  height: 100%;
  padding: 0 12px;
  border: none;
  border-left: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) =>
    props.$primary ? props.theme.colors.text : 'transparent'};
  color: ${(props) =>
    props.$primary ? props.theme.colors.panel : props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.mono};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.1s;

  &:hover {
    background: ${(props) =>
      props.$primary ? props.theme.colors.text : props.theme.colors.grid};
    opacity: 0.9;
  }
`;

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const NoteItemWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) =>
    props.$active ? props.theme.colors.activeItem : 'transparent'};
  position: relative;
  transition: background 0.1s;
  cursor: pointer;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) =>
      props.$active ? props.theme.colors.accent : 'transparent'};
  }

  &:hover {
    background: ${(props) =>
      props.$active
        ? props.theme.colors.activeItem
        : props.theme.colors.surfaceHover};
  }
`;

const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px 8px 16px;
  gap: 8px;
`;

const NoteId = styled.span`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 10px;
  color: ${(props) => props.theme.colors.textDim};
  border: 1px solid ${(props) => props.theme.colors.borderDim};
  padding: 2px 4px;
  background: ${(props) =>
    props.theme.name === 'dark' ? 'rgba(255,255,255,0.05)' : '#f4f4f5'};
`;

const NoteTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.text};
`;

const ExpandTrigger = styled.div`
  padding: 4px;
  color: ${(props) => props.theme.colors.textDim};
  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const NoteContentPreview = styled.div`
  padding: 0 16px 16px 16px;
  margin-left: 24px;
  border-left: 1px dashed ${(props) => props.theme.colors.borderDim};

  p {
    margin: 0;
    font-family: ${(props) => props.theme.fonts.mono};
    font-size: 11px;
    color: ${(props) => props.theme.colors.textDim};
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// ==========================================
// 4. EDITOR & TOOLBAR (编辑器区域)
// ==========================================

const EditorToolbar = styled.div`
  height: 60px;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: ${(props) => props.theme.colors.panel};
  flex-shrink: 0;
`;

const Breadcrumb = styled.div`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 12px;
  color: ${(props) => props.theme.colors.textDim};
  display: flex;
  align-items: center;
  gap: 8px;

  .icon {
    color: ${(props) => props.theme.colors.accent};
  }
  strong {
    color: ${(props) => props.theme.colors.text};
    font-weight: 700;
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 10px;
  color: ${(props) => props.theme.colors.textDim};
  margin-right: 12px;
  padding-right: 12px;
  border-right: 1px solid ${(props) => props.theme.colors.borderDim};
  height: 20px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(props) =>
      props.$active ? props.theme.colors.accent : props.theme.colors.textDim};
    box-shadow: ${(props) =>
      props.$active ? `0 0 8px ${props.theme.colors.accent}` : 'none'};
  }
`;

const CmdButton = styled.button`
  height: 32px;
  padding: 0 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: transparent;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: ${(props) => props.theme.colors.surfaceHover};
    transform: translateY(-1px);
    box-shadow: 2px 2px 0px ${(props) => props.theme.colors.borderDim};
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  ${(props) =>
    props.$variant === 'primary' &&
    css`
      background: ${props.theme.colors.text};
      color: ${props.theme.colors.panel};
      border-color: ${props.theme.colors.text};
      &:hover {
        background: ${props.theme.colors.accent};
        border-color: ${props.theme.colors.accent};
        color: #fff;
      }
    `}

  ${(props) =>
    props.$variant === 'danger' &&
    css`
      color: ${props.theme.colors.warning};
      border-color: ${props.theme.colors.borderDim};
      &:hover {
        background: ${props.theme.colors.warning};
        color: white;
        border-color: ${props.theme.colors.warning};
      }
    `}
`;

const EditorCanvas = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(
    ${(props) => props.theme.colors.grid} 1px,
    transparent 1px
  );
  background-size: 100% 32px;
`;

const TitleInput = styled.input`
  font-family: ${(props) => props.theme.fonts.sans};
  font-weight: 800;
  font-size: 28px;
  padding: 32px 32px 16px;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.text};
  width: 100%;
  flex-shrink: 0;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.borderDim};
  }
`;

const ContentArea = styled.textarea`
  flex: 1;
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 14px;
  line-height: 32px;
  padding: 0 32px 32px;
  border: none;
  background: transparent;
  resize: none;
  color: ${(props) => props.theme.colors.text};

  &:focus {
    outline: none;
  }
`;

const ViewerScrollWrapper = styled.div`
  flex: 1;
  padding: 0 32px 32px;
  overflow-y: auto;
`;

const ViewerTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.sans};
  font-size: 28px;
  font-weight: 800;
  margin-top: 32px;
  margin-bottom: 24px;
  color: ${(props) => props.theme.colors.text};
`;

// ==========================================
// 5. MERMAID & MARKDOWN STYLES
// ==========================================

const MermaidWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${(props) =>
    props.theme.name === 'dark'
      ? 'rgba(255,255,255,0.02)'
      : 'rgba(0,0,0,0.02)'};
  border: 1px dashed ${(props) => props.theme.colors.borderDim};
  padding: 16px;
  margin: 16px 0;
  border-radius: 4px;

  svg {
    max-width: 100%;
    font-family: ${(props) => props.theme.fonts.mono} !important;
  }
`;

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
      if (containerRef.current) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          containerRef.current.innerHTML = '';
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid error:', error);
          containerRef.current.innerHTML = `<div style="color:red; font-size:12px; font-family:monospace">SYNTAX ERROR</div>`;
        }
      }
    };
    renderChart();
  }, [chart, themeName]);

  return <MermaidWrapper ref={containerRef} />;
};

const MarkdownContainer = styled.div`
  font-family: ${(props) => props.theme.fonts.sans};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.text};

  /* Headings */
  h1,
  h2,
  h3,
  h4 {
    font-family: ${(props) => props.theme.fonts.sans};
    font-weight: 800;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.colors.text};
  }
  h1 {
    font-size: 2em;
    border-bottom: 2px solid ${(props) => props.theme.colors.border};
    padding-bottom: 0.2em;
  }
  h2 {
    font-size: 1.5em;
  }

  /* Paragraphs */
  p {
    margin-bottom: 1em;
  }

  /* Links */
  a {
    color: ${(props) => props.theme.colors.accent};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-bottom-color 0.2s;
    &:hover {
      border-bottom-color: ${(props) => props.theme.colors.accent};
    }
  }

  /* Lists */
  ul,
  ol {
    padding-left: 1.5em;
    margin-bottom: 1em;
  }
  li {
    margin-bottom: 0.25em;
  }

  /* Inline Code */
  code {
    font-family: ${(props) => props.theme.fonts.mono};
    background: ${(props) => props.theme.colors.codeBg};
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 0.9em;
    border: 1px solid ${(props) => props.theme.colors.borderDim};
    color: ${(props) => props.theme.colors.accent};
  }

  /* Code Blocks (Pre) */
  pre {
    background: ${(props) => props.theme.colors.codeBg};
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    border: 1px solid ${(props) => props.theme.colors.borderDim};
    margin: 1em 0;

    code {
      background: transparent;
      padding: 0;
      border: none;
      color: ${(props) => props.theme.colors.text};
      font-size: 0.9em;
    }
  }

  /* Blockquotes */
  blockquote {
    border-left: 4px solid ${(props) => props.theme.colors.accent};
    margin: 1em 0;
    padding-left: 1em;
    font-style: italic;
    color: ${(props) => props.theme.colors.textDim};
  }

  /* Table */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 0.9em;
  }
  th,
  td {
    border: 1px solid ${(props) => props.theme.colors.borderDim};
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: ${(props) => props.theme.colors.surfaceHover};
    font-weight: 600;
  }
`;

// ==========================================
// 6. MODAL COMPONENTS (弹窗)
// ==========================================

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogPanel = styled.div`
  width: 400px;
  background: ${(props) => props.theme.colors.panel};
  border: 2px solid ${(props) => props.theme.colors.warning};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    height: 12px;
    width: 100%;
    background: repeating-linear-gradient(
      45deg,
      ${(props) => props.theme.colors.warning},
      ${(props) => props.theme.colors.warning} 10px,
      transparent 10px,
      transparent 20px
    );
    border-bottom: 1px solid ${(props) => props.theme.colors.warning};
  }
`;

const DialogContent = styled.div`
  padding: 32px 24px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DialogTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.mono};
  text-transform: uppercase;
  font-size: 16px;
  margin: 16px 0 8px;
  color: ${(props) => props.theme.colors.text};
`;

const DialogText = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textDim};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const ModalButton = styled.button`
  flex: 1;
  height: 40px;
  border: 1px solid
    ${(props) =>
      props.$variant === 'danger'
        ? props.theme.colors.warning
        : props.theme.colors.border};
  background: ${(props) =>
    props.$variant === 'danger' ? props.theme.colors.warning : 'transparent'};
  color: ${(props) =>
    props.$variant === 'danger' ? '#fff' : props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.mono};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.$variant === 'danger'
        ? '#b91c1c'
        : props.theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
`;

// ==========================================
// 7. APP LOGIC (业务逻辑)
// ==========================================

const generateId = () => Math.floor(Math.random() * 9000 + 1000).toString();

const NoteItem = ({ note, isActive, onClick }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <NoteItemWrapper $active={isActive} onClick={onClick}>
      <NoteHeader>
        <NoteId>#{note.id}</NoteId>
        <NoteTitle>{note.title || 'UNTITLED_LOG'}</NoteTitle>
        <ExpandTrigger
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </ExpandTrigger>
      </NoteHeader>
      {expanded && (
        <NoteContentPreview>
          <p>{note.content || '// No data...'}</p>
        </NoteContentPreview>
      )}
    </NoteItemWrapper>
  );
};

const ReactNotesApp = () => {
  const [themeMode, setThemeMode] = useState('light');

  const [notes, setNotes] = useState([
    {
      id: '8024',
      title: 'System Architecture',
      content: `# System Specs

The system relies on a **flux capacitor** design.

## Components
- [x] React Frontend
- [ ] Node Backend

## Diagram
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
    setNotes(
      notes.map((n) =>
        n.id === editDraft.id
          ? { ...editDraft, updatedAt: new Date().toISOString() }
          : n,
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

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Frame>
        {/* SIDEBAR */}
        <Sidebar>
          <HeaderBlock>
            <TopRow>
              <AppTitle>
                <Cpu size={18} />
                <span>React</span>
                <span className="highlight">NOTES_OS</span>
              </AppTitle>
              <ThemeToggle onClick={toggleTheme} title="Toggle System Mode">
                {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </ThemeToggle>
            </TopRow>
            <SearchBox>
              <div
                style={{
                  paddingLeft: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Search size={14} />
              </div>
              <SearchInput
                placeholder="QUERY_DB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ActionButton $primary onClick={handleCreate}>
                <Plus size={14} /> NEW
              </ActionButton>
            </SearchBox>
          </HeaderBlock>
          <ListContainer>
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
          </ListContainer>
          <div
            style={{
              padding: '8px',
              borderTop: `1px solid ${
                themeMode === 'light' ? '#e5e5e5' : '#333'
              }`,
              fontFamily: 'monospace',
              fontSize: '10px',
              opacity: 0.6,
              textAlign: 'center',
              marginTop: 'auto',
            }}
          >
            SYS_MODE: {themeMode.toUpperCase()}
          </div>
        </Sidebar>

        {/* MAIN AREA */}
        <MainArea>
          {!activeNote ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                opacity: 0.5,
                fontFamily: 'monospace',
              }}
            >
              <Terminal
                size={48}
                strokeWidth={1}
                style={{ marginBottom: 16 }}
              />
              <div>AWAITING INPUT...</div>
            </div>
          ) : (
            <>
              <EditorToolbar>
                <Breadcrumb>
                  <Hash size={14} className="icon" />
                  <span>ROOT</span>
                  <ChevronRight size={12} />
                  <strong>{activeNote.title || 'UNTITLED'}</strong>
                </Breadcrumb>
                <ToolbarActions>
                  {isEditing ? (
                    <>
                      <StatusIndicator $active={true}>
                        EDITING_MODE
                      </StatusIndicator>
                      <CmdButton
                        $variant="danger"
                        onClick={handleDeleteRequest}
                      >
                        <Trash2 size={14} /> DELETE
                      </CmdButton>
                      <CmdButton $variant="primary" onClick={handleSave}>
                        <Save size={14} /> SAVE_CHANGES
                      </CmdButton>
                    </>
                  ) : (
                    <>
                      <StatusIndicator $active={false}>
                        READ_ONLY
                      </StatusIndicator>
                      <CmdButton
                        onClick={() => {
                          setEditDraft({ ...activeNote });
                          setIsEditing(true);
                        }}
                      >
                        <Edit2 size={14} /> EDIT
                      </CmdButton>
                    </>
                  )}
                </ToolbarActions>
              </EditorToolbar>

              <EditorCanvas>
                {isEditing ? (
                  <>
                    <TitleInput
                      value={editDraft?.title}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, title: e.target.value })
                      }
                      placeholder="ENTER_TITLE"
                    />
                    <ContentArea
                      value={editDraft?.content}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, content: e.target.value })
                      }
                      placeholder="// BEGIN TRANSMISSION..."
                      spellCheck={false}
                    />
                  </>
                ) : (
                  <ViewerScrollWrapper>
                    <ViewerTitle>{activeNote.title}</ViewerTitle>
                    <MarkdownContainer>
                      <ReactMarkdown
                        components={{
                          code(props) {
                            const { children, className, node, ...rest } =
                              props;
                            const match = /language-(\w+)/.exec(
                              className || '',
                            );
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
                              <code className={className} {...rest}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {activeNote.content}
                      </ReactMarkdown>
                    </MarkdownContainer>
                  </ViewerScrollWrapper>
                )}
              </EditorCanvas>
            </>
          )}
        </MainArea>
      </Frame>

      {/* CONFIRMATION MODAL */}
      {showDeleteDialog && (
        <Overlay onClick={() => setShowDeleteDialog(false)}>
          <DialogPanel onClick={(e) => e.stopPropagation()}>
            <DialogContent>
              <AlertTriangle
                size={48}
                color={themeMode === 'light' ? '#dc2626' : '#f87171'}
                strokeWidth={1.5}
              />
              <DialogTitle>Confirm Protocol</DialogTitle>
              <DialogText>
                Are you sure you want to delete note{' '}
                <strong>#{activeNoteId}</strong>?<br />
                This action is irreversible and data will be lost.
              </DialogText>
              <ButtonGroup>
                <ModalButton onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </ModalButton>
                <ModalButton $variant="danger" onClick={confirmDelete}>
                  Confirm Delete
                </ModalButton>
              </ButtonGroup>
            </DialogContent>
          </DialogPanel>
        </Overlay>
      )}
    </ThemeProvider>
  );
};

export default ReactNotesApp;
