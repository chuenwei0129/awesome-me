import {
  Check,
  ChevronDown,
  ChevronUp,
  Edit3,
  FileText,
  Plus,
  Trash2,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from 'styled-components';

// --- 1. Design Tokens & Global Styles (Engineering Blueprint Theme) ---

const theme = {
  colors: {
    bg: '#f8fafc', // Outer Background
    canvas: '#ffffff', // Component Background
    border: '#cbd5e1', // Slate-300
    textMain: '#0f172a', // Slate-900
    textSub: '#64748b', // Slate-500
    accent: '#0f172a', // Black for primary actions
    danger: '#ef4444', // Red for destructive
    highlight: '#e2e8f0', // Slate-200 for selection
  },
  fonts: {
    ui: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Consolas', monospace",
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.ui};
    background-color: ${theme.colors.bg};
    color: ${theme.colors.textMain};
    -webkit-font-smoothing: antialiased;
  }

  /* Scrollbar Styling for technical look */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.bg};
    border-left: 1px solid ${theme.colors.border};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border: 1px solid ${theme.colors.bg};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textSub};
  }
`;

// --- 2. Styled Primitives ---

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${theme.colors.bg};
`;

const Sidebar = styled.aside`
  width: 320px;
  min-width: 320px;
  background-color: ${theme.colors.bg};
  border-right: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.bg};
`;

const Logo = styled.div`
  font-family: ${theme.fonts.mono};
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMain};
  margin-bottom: ${theme.spacing.lg};

  svg {
    stroke-width: 2px;
  }
`;

const SearchRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const Input = styled.input`
  flex: 1;
  background: ${theme.colors.canvas};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.ui};
  font-size: 14px;
  color: ${theme.colors.textMain};
  outline: none;

  &:focus {
    border-color: ${theme.colors.textMain};
  }

  &::placeholder {
    color: ${theme.colors.textSub};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${(props) =>
    props.$primary ? theme.colors.accent : theme.colors.canvas};
  color: ${(props) => (props.$primary ? '#fff' : theme.colors.textMain)};
  border: 1px solid
    ${(props) => (props.$primary ? theme.colors.accent : theme.colors.border)};
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => (props.$primary ? '#1e293b' : '#f1f5f9')};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${(props) =>
    props.$danger &&
    css`
      color: ${theme.colors.danger};
      border-color: ${theme.colors.danger};
      &:hover {
        background: #fef2f2;
      }
    `}
`;

const NoteList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const NoteCard = styled.div`
  background: ${(props) => (props.$active ? '#e0f2fe' : theme.colors.canvas)};
  border: 1px solid
    ${(props) => (props.$active ? '#7dd3fc' : theme.colors.border)};
  padding: ${theme.spacing.md};
  cursor: pointer;
  position: relative;
  transition: border-color 0.1s;

  &:hover {
    border-color: ${(props) =>
      props.$active ? '#7dd3fc' : theme.colors.textSub};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.xs};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.textMain};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 85%;
`;

const CardMeta = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.textSub};
  margin-top: ${theme.spacing.xs};
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${theme.colors.textSub};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.textMain};
  }
`;

const CardSnippet = styled.div`
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border}; // dashed style simulation
  border-top-style: dashed;
  font-size: 13px;
  color: ${theme.colors.textSub};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MainArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.canvas};
  overflow: hidden;
  position: relative;
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};
`;

const NoteTitleDisplay = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: ${theme.colors.textMain};
  letter-spacing: -0.5px;
`;

const NoteMetaDisplay = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.textSub};
  margin-bottom: ${theme.spacing.md};
`;

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xl};
  overflow-y: auto;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

const TitleInput = styled.input`
  font-size: 24px;
  font-weight: 700;
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  font-family: ${theme.fonts.ui};
  color: ${theme.colors.textMain};

  &:focus {
    outline: 2px solid ${theme.colors.textMain};
    outline-offset: -2px;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.md};
  font-family: ${theme.fonts.mono};
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  color: ${theme.colors.textMain};
  background: #fdfdfd;

  &:focus {
    outline: 2px solid ${theme.colors.textMain};
    outline-offset: -2px;
  }
`;

const ContentDisplay = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.textMain};
  white-space: pre-wrap;

  /* Mock Markdown Styling for Blueprint look */
  h1,
  h2,
  h3 {
    font-family: ${theme.fonts.ui};
    font-weight: 700;
    margin-top: 1.5em;
  }
  code {
    font-family: ${theme.fonts.mono};
    background: ${theme.colors.bg};
    padding: 2px 4px;
    border: 1px solid ${theme.colors.border};
  }
  blockquote {
    border-left: 2px solid ${theme.colors.textMain};
    margin-left: 0;
    padding-left: 1rem;
    color: ${theme.colors.textSub};
  }
  a {
    color: ${theme.colors.textMain};
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textSub};
  font-family: ${theme.fonts.mono};

  svg {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.border};
  }
`;

// --- 3. Helper Components ---

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

// Date formatter
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
};

const formatFullDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `Last updated on ${date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })} at ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

// --- 4. Main Application ---

const NoteItem = ({ note, isActive, onClick }) => {
  // INTERNAL STATE for expansion.
  // Because the parent uses note.id as key, this state persists even if the list order changes.
  const [expanded, setExpanded] = useState(false);

  return (
    <NoteCard $active={isActive} onClick={onClick}>
      <CardHeader>
        <CardTitle>{note.title || 'Untitled'}</CardTitle>
        <ExpandButton
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </ExpandButton>
      </CardHeader>

      <CardMeta>{formatDate(note.updatedAt)}</CardMeta>

      {expanded && <CardSnippet>{note.content || 'No content...'}</CardSnippet>}
    </NoteCard>
  );
};

const ReactNotesApp = () => {
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Make a thing',
      content:
        "It's very easy to make some words **bold** and other words *italic* with Markdown.\n\nYou can even [link to React's website!](https://react.dev).",
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Meeting Notes',
      content: 'Discussion points:\n- Design System\n- Q4 Goals',
      updatedAt: '2023-10-30T10:00:00',
    },
    {
      id: '3',
      title: 'Ideas',
      content: 'Random thoughts about the universe.',
      updatedAt: '2023-11-24T15:30:00',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(null);

  // Derived state
  const activeNote = notes.find((n) => n.id === activeNoteId);
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateNote = () => {
    const newNote = {
      id: generateId(),
      title: 'Untitled',
      content: '',
      updatedAt: new Date().toISOString(),
    };
    // Add new note to the top
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setIsEditing(true);
    setEditDraft(newNote);
  };

  const handleDeleteNote = (id) => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
    if (activeNoteId === id) {
      setActiveNoteId(null);
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    if (activeNote) {
      setEditDraft({ ...activeNote });
      setIsEditing(true);
    }
  };

  const saveNote = () => {
    if (!editDraft) return;
    const updatedNotes = notes.map((n) =>
      n.id === editDraft.id
        ? { ...editDraft, updatedAt: new Date().toISOString() }
        : n,
    );
    setNotes(updatedNotes); // Updates list order/content, but expanded states persist due to keys!
    setIsEditing(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        {/* Left Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <Logo>
              <FileText size={18} />
              React Notes
            </Logo>
            <SearchRow>
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button $primary onClick={handleCreateNote}>
                <Plus size={14} /> NEW
              </Button>
            </SearchRow>
          </SidebarHeader>

          <NoteList>
            {filteredNotes.map((note) => (
              <NoteItem
                key={note.id} // CRITICAL: Preserves component state (isExpanded) across re-renders
                note={note}
                isActive={note.id === activeNoteId}
                onClick={() => {
                  if (isEditing) {
                    if (window.confirm('Discard unsaved changes?')) {
                      setIsEditing(false);
                      setActiveNoteId(note.id);
                    }
                  } else {
                    setActiveNoteId(note.id);
                  }
                }}
              />
            ))}
            {filteredNotes.length === 0 && (
              <div
                style={{
                  padding: '16px',
                  color: theme.colors.textSub,
                  fontFamily: theme.fonts.mono,
                  fontSize: '12px',
                }}
              >
                No notes found.
              </div>
            )}
          </NoteList>
        </Sidebar>

        {/* Right Main Area */}
        <MainArea>
          {!activeNote ? (
            <EmptyState>
              <FileText size={48} strokeWidth={1} />
              <p>Click a note on the left to view something! 🥺</p>
            </EmptyState>
          ) : isEditing ? (
            // EDIT MODE
            <>
              <MainHeader>
                <div style={{ flex: 1, marginRight: '16px' }}>
                  <div
                    style={{
                      fontFamily: theme.fonts.mono,
                      fontSize: '12px',
                      color: theme.colors.textSub,
                      marginBottom: '8px',
                    }}
                  >
                    EDITING MODE
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    $danger
                    onClick={() => handleDeleteNote(activeNoteId)}
                  >
                    <Trash2 size={14} /> Delete
                  </Button>
                  <Button $primary onClick={saveNote}>
                    <Check size={14} /> Done
                  </Button>
                </div>
              </MainHeader>
              <EditorContainer>
                <TitleInput
                  value={editDraft?.title}
                  onChange={(e) =>
                    setEditDraft({ ...editDraft, title: e.target.value })
                  }
                  placeholder="Note Title"
                />
                <TextArea
                  value={editDraft?.content}
                  onChange={(e) =>
                    setEditDraft({ ...editDraft, content: e.target.value })
                  }
                  placeholder="Write your note in markdown..."
                />
              </EditorContainer>
            </>
          ) : (
            // VIEW MODE
            <>
              <MainHeader>
                <div style={{ flex: 1 }}></div>
                <Button onClick={startEditing}>
                  <Edit3 size={14} /> Edit
                </Button>
              </MainHeader>
              <EditorContainer>
                <NoteMetaDisplay>
                  {formatFullDate(activeNote.updatedAt)}
                </NoteMetaDisplay>
                <NoteTitleDisplay>{activeNote.title}</NoteTitleDisplay>
                <div style={{ height: '32px' }} />
                <ContentDisplay>{activeNote.content}</ContentDisplay>
              </EditorContainer>
            </>
          )}
        </MainArea>
      </Container>
    </ThemeProvider>
  );
};

export default ReactNotesApp;
