/**
 * iframe: true
 */

import {
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
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// --- 1. THEME DEFINITIONS ---

// Shared geometry and spacing
const sharedTheme = {
  fonts: {
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    sans: "'Inter', sans-serif",
  },
  spacing: { unit: 4 },
};

// LIGHT: The "Engineering Blueprint"
const lightTheme = {
  ...sharedTheme,
  name: 'light',
  colors: {
    bg: '#f0f2f5', // Industrial Gray
    panel: '#ffffff', // White Panel
    border: '#1a1a1a', // Hard Black Border
    borderDim: '#d4d4d8',
    text: '#1a1a1a',
    textDim: '#71717a',
    accent: '#0055ff', // Blueprint Blue
    warning: '#f97316',
    grid: '#e5e7eb', // Light Grid
    shadow: 'rgba(0,0,0,1)', // Hard Black Shadow
    activeItem: '#f0f9ff',
  },
};

// DARK: The "Night Ops / Terminal"
const darkTheme = {
  ...sharedTheme,
  name: 'dark',
  colors: {
    bg: '#09090b', // Deepest Void
    panel: '#18181b', // Zinc-900 Panel
    border: '#52525b', // Zinc-600 (Visible Grey Border)
    borderDim: '#27272a',
    text: '#e4e4e7', // Zinc-200
    textDim: '#71717a', // Zinc-500
    accent: '#38bdf8', // Cyan/Sky Blue (Glowing effect)
    warning: '#fb923c',
    grid: '#27272a', // Dark Grid
    shadow: '#000000', // Deep Black Shadow
    activeItem: '#1e293b', // Dark Slate Highlight
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
    
    /* Dynamic Grid based on Theme */
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

// --- 2. STRUCTURAL COMPONENTS ---

const Frame = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  gap: 16px;
`;

const TechPanel = styled.div`
  background: ${(props) => props.theme.colors.panel};
  border: 2px solid ${(props) => props.theme.colors.border};
  /* Hard shadow color changes based on theme */
  box-shadow: 4px 4px 0px ${(props) => props.theme.colors.shadow};
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;

  /* Corner Crosshair Decoration */
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
`;

const MainArea = styled(TechPanel)`
  flex: 1;
  z-index: 1;
`;

// --- 3. SIDEBAR ELEMENTS ---

const HeaderBlock = styled.div`
  padding: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.panel};
  display: flex;
  flex-direction: column;
  gap: 16px;
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
    color: ${(props) => props.theme.colors.panel}; // Inverted text
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
`;

// --- 4. NOTE ITEM COMPONENT ---

const NoteItemWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) =>
    props.$active ? props.theme.colors.activeItem : 'transparent'};
  position: relative;
  transition: background 0.1s;
  cursor: pointer;

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
      props.$active ? props.theme.colors.activeItem : props.theme.colors.grid};
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

// --- 5. EDITOR COMPONENTS ---

const EditorToolbar = styled.div`
  height: 48px;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: ${(props) =>
    props.theme.colors.name === 'dark'
      ? props.theme.colors.activeItem
      : '#fafafa'};
`;

const Breadcrumb = styled.div`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 11px;
  color: ${(props) => props.theme.colors.textDim};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    color: ${(props) => props.theme.colors.text};
  }
`;

const StatusBadge = styled.div`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 10px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) =>
      props.$editing ? props.theme.colors.warning : props.theme.colors.border};
  color: ${(props) =>
    props.$editing ? props.theme.colors.warning : props.theme.colors.textDim};
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

const ViewerArea = styled.div`
  flex: 1;
  padding: 0 32px 32px;
  overflow-y: auto;
  font-family: ${(props) => props.theme.fonts.sans};

  h1 {
    font-size: 28px;
    font-weight: 800;
    margin-top: 32px;
    margin-bottom: 16px;
    color: ${(props) => props.theme.colors.text};
  }
  p {
    font-size: 15px;
    line-height: 1.6;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 16px;
  }

  code {
    font-family: ${(props) => props.theme.fonts.mono};
    background: ${(props) => props.theme.colors.grid};
    color: ${(props) => props.theme.colors.accent};
    padding: 2px 4px;
    border: 1px solid ${(props) => props.theme.colors.borderDim};
    font-size: 0.9em;
  }
`;

// --- 6. HELPER LOGIC ---

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

// --- 7. MAIN APP & THEME TOGGLE LOGIC ---

const ReactNotesApp = () => {
  // Theme State
  const [themeMode, setThemeMode] = useState('light'); // 'light' or 'dark'

  // Notes State
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
      title: 'Dark Mode Specs',
      content:
        '// REQUIREMENTS:\n1. Low brightness background\n2. Cyan accents\n3. Preserved grid lines',
      updatedAt: '2023-11-25T14:00:00',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState('8024');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('notes-theme');
    if (savedTheme) setThemeMode(savedTheme);
  }, []);

  // Toggle Function
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
    // Dynamic Theme Provider
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Frame>
        <Sidebar>
          <HeaderBlock>
            <TopRow>
              <AppTitle>
                <Cpu size={18} />
                <span>React</span>
                <span className="highlight">NOTES_OS</span>
              </AppTitle>

              {/* Theme Toggle Button */}
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
            }}
          >
            SYS_MODE: {themeMode.toUpperCase()}
          </div>
        </Sidebar>

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
                  <Hash size={12} />
                  <span>ROOT</span>
                  <ChevronRight size={10} />
                  <strong>{activeNote.title || 'NULL'}</strong>
                </Breadcrumb>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {isEditing ? (
                    <>
                      <ActionButton
                        onClick={() => handleDelete(activeNoteId)}
                        style={{
                          color: '#f97316',
                          border: '1px solid currentColor',
                        }}
                      >
                        <Trash2 size={14} />
                      </ActionButton>
                      <ActionButton $primary onClick={handleSave}>
                        <Save size={14} /> SAVE
                      </ActionButton>
                    </>
                  ) : (
                    <>
                      <StatusBadge>READ</StatusBadge>
                      <ActionButton
                        onClick={() => {
                          setEditDraft({ ...activeNote });
                          setIsEditing(true);
                        }}
                      >
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
