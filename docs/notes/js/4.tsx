/**
 * iframe: true
 */

import {
  ChevronDown,
  ChevronRight,
  Cpu,
  Edit2,
  Hash,
  Plus,
  Save,
  Search,
  Terminal,
  Trash2,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// --- 1. The Engineering Theme System ---

const theme = {
  colors: {
    bg: '#f0f2f5', // 工业灰背景
    panel: '#ffffff', // 面板白
    border: '#1a1a1a', // 强硬的黑色边框
    borderDim: '#d4d4d8', // 装饰性弱边框
    text: '#1a1a1a', // 主要文字
    textDim: '#71717a', // 次要文字 (Slate-500)
    accent: '#0055ff', // 蓝图蓝 (Blueprint Blue)
    warning: '#f97316', // 警戒橙
    grid: '#e5e7eb', // 网格线颜色
  },
  fonts: {
    mono: "'JetBrains Mono', 'Fira Code', monospace", // 核心字体
    sans: "'Inter', sans-serif",
  },
  spacing: {
    unit: 4, // 4px grid system
  },
};

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: ${theme.fonts.sans};
    background-color: ${theme.colors.bg};
    color: ${theme.colors.text};
    /* 核心：全屏工程网格背景 */
    background-image: 
      linear-gradient(${theme.colors.grid} 1px, transparent 1px),
      linear-gradient(90deg, ${theme.colors.grid} 1px, transparent 1px);
    background-size: 20px 20px;
    height: 100vh;
    overflow: hidden;
  }
  
  /* 自定义滚动条 - 机械风格 */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${theme.colors.border}; }
`;

// --- 2. Structural Components ---

const Frame = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 16px; // 外边距，让整个应用像漂浮的仪表盘
  gap: 16px;
`;

// 通用的“技术面板”样式
const TechPanel = styled.div`
  background: ${theme.colors.panel};
  border: 2px solid ${theme.colors.border};
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 1); // 硬朗的阴影
  display: flex;
  flex-direction: column;
  position: relative;

  /* 装饰：角落的十字准星 */
  &::after {
    content: '+';
    position: absolute;
    top: -9px;
    right: -9px;
    background: ${theme.colors.bg};
    font-family: ${theme.fonts.mono};
    font-weight: bold;
    color: ${theme.colors.border};
    line-height: 1;
    width: 16px;
    text-align: center;
  }
`;

const Sidebar = styled(TechPanel)`
  width: 340px;
  min-width: 340px;
  z-index: 2;
`;

const MainArea = styled(TechPanel)`
  flex: 1;
  z-index: 1;
`;

// --- 3. Sidebar Elements ---

const HeaderBlock = styled.div`
  padding: 20px;
  border-bottom: 2px solid ${theme.colors.border};
  background: ${theme.colors.panel};
`;

const AppTitle = styled.div`
  font-family: ${theme.fonts.mono};
  font-weight: 800;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  span.highlight {
    background: ${theme.colors.text};
    color: #fff;
    padding: 2px 6px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.border};
  height: 40px;

  &:focus-within {
    outline: 2px solid ${theme.colors.accent};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  height: 100%;
  padding: 0 12px;
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${theme.colors.textDim};
    text-transform: uppercase;
  }
`;

const ActionButton = styled.button`
  height: 100%;
  padding: 0 12px;
  border: none;
  border-left: 1px solid ${theme.colors.border};
  background: ${(props) =>
    props.$primary ? theme.colors.text : 'transparent'};
  color: ${(props) => (props.$primary ? '#fff' : theme.colors.text)};
  font-family: ${theme.fonts.mono};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => (props.$primary ? '#000' : '#f4f4f5')};
  }

  &:active {
    background: ${theme.colors.accent};
    color: white;
  }
`;

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`;

// --- 4. The "Tech" Note Item ---

const NoteItemWrapper = styled.div`
  border-bottom: 1px solid ${theme.colors.border};
  background: ${(props) => (props.$active ? '#f0f9ff' : 'transparent')};
  position: relative;
  transition: background 0.1s;
  cursor: pointer;

  /* Active State Indicator Strip */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) =>
      props.$active ? theme.colors.accent : 'transparent'};
  }

  &:hover {
    background: ${(props) => (props.$active ? '#f0f9ff' : '#fafafa')};
  }
`;

const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px 8px 16px;
  gap: 8px;
`;

const NoteId = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  color: ${theme.colors.textDim};
  background: #f4f4f5;
  padding: 2px 4px;
  border: 1px solid ${theme.colors.borderDim};
`;

const NoteTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExpandTrigger = styled.div`
  padding: 4px;
  color: ${theme.colors.textDim};
  &:hover {
    color: ${theme.colors.text};
  }
`;

const NoteContentPreview = styled.div`
  padding: 0 16px 16px 16px;
  margin-left: 24px; /* Align with title */
  border-left: 1px dashed ${theme.colors.borderDim};

  p {
    margin: 0;
    font-family: ${theme.fonts.mono};
    font-size: 11px;
    color: ${theme.colors.textDim};
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// --- 5. The "Schematic" Editor ---

const EditorToolbar = styled.div`
  height: 48px;
  border-bottom: 2px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fafafa;
`;

const Breadcrumb = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.textDim};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    color: ${theme.colors.text};
  }
`;

const StatusBadge = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) => (props.$editing ? theme.colors.warning : theme.colors.border)};
  color: ${(props) =>
    props.$editing ? theme.colors.warning : theme.colors.textDim};
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
`;

const EditorCanvas = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  /* Background grid specific to editor */
  background-image: linear-gradient(${theme.colors.grid} 1px, transparent 1px);
  background-size: 100% 32px; /* Horizontal lines like a notebook */
`;

const TitleInput = styled.input`
  font-family: ${theme.fonts.sans};
  font-weight: 800;
  font-size: 28px;
  padding: 32px 32px 16px;
  border: none;
  background: transparent;
  color: ${theme.colors.text};
  width: 100%;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #d4d4d8;
  }
`;

const ContentArea = styled.textarea`
  flex: 1;
  font-family: ${theme.fonts.mono}; /* Writing code/technical notes */
  font-size: 14px;
  line-height: 32px; /* Matches grid lines */
  padding: 0 32px 32px;
  border: none;
  background: transparent;
  resize: none;
  color: ${theme.colors.text};

  &:focus {
    outline: none;
  }
`;

const ViewerArea = styled.div`
  flex: 1;
  padding: 0 32px 32px;
  overflow-y: auto;
  font-family: ${theme.fonts.sans};

  h1 {
    font-size: 28px;
    font-weight: 800;
    margin-top: 32px;
    margin-bottom: 16px;
  }
  p {
    font-size: 15px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 16px;
  }

  code {
    font-family: ${theme.fonts.mono};
    background: #f4f4f5;
    padding: 2px 4px;
    border: 1px solid #e4e4e7;
    font-size: 0.9em;
  }
`;

// --- 6. Helper Components & Logic ---

const generateId = () => Math.floor(Math.random() * 9000 + 1000).toString(); // 4-digit ID

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
          <div
            style={{
              marginTop: '8px',
              fontSize: '10px',
              color: theme.colors.textDim,
              display: 'flex',
              gap: '8px',
            }}
          >
            <span>UPD: {new Date(note.updatedAt).toLocaleDateString()}</span>
            <span>LEN: {note.content.length}b</span>
          </div>
        </NoteContentPreview>
      )}
    </NoteItemWrapper>
  );
};

// --- 7. Main App ---

const ReactNotesApp = () => {
  const [notes, setNotes] = useState([
    {
      id: '8024',
      title: 'System Architecture',
      content:
        'The system relies on a **flux capacitor** design.\n\nKey components:\n- React Frontend\n- Node Backend',
      updatedAt: new Date().toISOString(),
    },
    {
      id: '1092',
      title: 'Daily Log 11-25',
      content: '// TODO:\n1. Refactor grid layout\n2. Fix border collision',
      updatedAt: '2023-11-25T14:00:00',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState('8024');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(null);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  // Filter
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handlers
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

  const handleStartEdit = () => {
    if (activeNote) {
      setEditDraft({ ...activeNote });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!editDraft) return;
    const updated = notes.map((n) =>
      n.id === editDraft.id
        ? { ...editDraft, updatedAt: new Date().toISOString() }
        : n,
    );
    setNotes(updated);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(`CONFIRM DELETION OF SECTOR #${id}?`)) {
      setNotes(notes.filter((n) => n.id !== id));
      if (activeNoteId === id) {
        setActiveNoteId(null);
        setIsEditing(false);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Frame>
        {/* SIDEBAR */}
        <Sidebar>
          <HeaderBlock>
            <AppTitle>
              <Cpu size={18} />
              <span>React</span>
              <span className="highlight">NOTES_OS</span>
            </AppTitle>
            <SearchBox>
              <div
                style={{
                  paddingLeft: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Search size={14} color={theme.colors.textDim} />
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
                key={note.id} // Essential for state preservation
                note={note}
                isActive={note.id === activeNoteId}
                onClick={() => {
                  if (isEditing) handleSave(); // Auto save
                  setActiveNoteId(note.id);
                  setIsEditing(false);
                }}
              />
            ))}
          </ListContainer>

          <div
            style={{
              padding: '8px',
              borderTop: `1px solid ${theme.colors.border}`,
              fontFamily: theme.fonts.mono,
              fontSize: '10px',
              color: theme.colors.textDim,
              textAlign: 'center',
            }}
          >
            SYS_STATUS: ONLINE • ITEMS: {notes.length}
          </div>
        </Sidebar>

        {/* MAIN EDITOR */}
        <MainArea>
          {!activeNote ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: theme.colors.textDim,
                fontFamily: theme.fonts.mono,
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
                  <Hash size={12} />
                  <span>ROOT</span>
                  <ChevronRight size={10} />
                  <strong>{activeNote.title || 'NULL'}</strong>
                  <span style={{ color: theme.colors.textDim }}>.md</span>
                </Breadcrumb>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {isEditing ? (
                    <>
                      <ActionButton
                        onClick={() => handleDelete(activeNoteId)}
                        style={{
                          color: theme.colors.warning,
                          border: `1px solid ${theme.colors.border}`,
                        }}
                      >
                        <Trash2 size={14} />
                      </ActionButton>
                      <ActionButton $primary onClick={handleSave}>
                        <Save size={14} /> SAVE_CHANGES
                      </ActionButton>
                    </>
                  ) : (
                    <>
                      <StatusBadge>READ_ONLY</StatusBadge>
                      <ActionButton onClick={handleStartEdit}>
                        <Edit2 size={14} /> EDIT
                      </ActionButton>
                    </>
                  )}
                </div>
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
                  <ViewerArea>
                    <h1>{activeNote.title}</h1>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {activeNote.content.split('\n').map((line, i) => (
                        <div key={i}>{line || '\u00A0'}</div>
                      ))}
                    </div>
                  </ViewerArea>
                )}
              </EditorCanvas>
            </>
          )}
        </MainArea>
      </Frame>
    </ThemeProvider>
  );
};

export default ReactNotesApp;
