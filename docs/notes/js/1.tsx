import {
  AlertTriangle,
  Check,
  CheckSquare,
  Download,
  LayoutTemplate,
  Plus,
  Square,
  Terminal,
  Trash2,
  Upload,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// --- 1. Design System / Theme ---
const theme = {
  colors: {
    bg: '#f8fafc', // Page background
    canvas: '#ffffff', // Component background
    border: '#cbd5e1', // Structural borders
    borderStrong: '#94a3b8', // Stronger borders
    textMain: '#0f172a', // Primary Text
    textSub: '#64748b', // Secondary Text
    accent: '#0f172a', // Black accent
    error: '#ef4444', // Error state
  },
  fonts: {
    ui: '"Inter", "Helvetica Neue", Arial, sans-serif',
    mono: '"JetBrains Mono", "Consolas", monospace',
  },
};

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

  body {
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.textMain};
    font-family: ${(props) => props.theme.fonts.ui};
    margin: 0;
    padding: 2rem;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background-image: 
      linear-gradient(${(props) =>
        props.theme.colors.border} 1px, transparent 1px),
      linear-gradient(90deg, ${(props) =>
        props.theme.colors.border} 1px, transparent 1px);
    background-size: 40px 40px; /* Grid paper effect */
  }

  * { box-sizing: border-box; }
`;

// --- 2. Styled Components (Blueprint Style) ---

// Blueprint Container
const DiagramCanvas = styled.div`
  background: ${(props) => props.theme.colors.canvas};
  border: 2px solid ${(props) => props.theme.colors.textMain};
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  box-shadow: 8px 8px 0px ${(props) => props.theme.colors.borderStrong}; /* Flat block shadow */
  position: relative;
`;

// Technical Header
const HeaderBlock = styled.header`
  border-bottom: 2px solid ${(props) => props.theme.colors.textMain};
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.bg};
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: -1px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;

  &::before {
    content: 'FIG_01:';
    color: ${(props) => props.theme.colors.textSub};
    font-size: 0.8rem;
    font-weight: 400;
  }
`;

// Controls Area
const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  border-bottom: 2px solid ${(props) => props.theme.colors.textMain};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Input Section
const InputWrapper = styled.form`
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  border-right: 2px solid ${(props) => props.theme.colors.textMain};
  background: ${(props) => props.theme.colors.canvas};

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.textMain};
  }
`;

const TechInput = styled.input`
  flex: 1;
  border: 1px solid ${(props) => props.theme.colors.borderStrong};
  background: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.textMain};
  font-family: ${(props) => props.theme.fonts.mono};
  padding: 0.75rem;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.textMain};
    background: #fff;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSub};
    font-style: italic;
  }
`;

// Sidebar / Tools
const Sidebar = styled.aside`
  background: ${(props) => props.theme.colors.bg};
  display: flex;
  flex-direction: column;
`;

const SidebarSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textSub};
  margin: 0 0 0.75rem 0;
  font-weight: 600;
  letter-spacing: 1px;
`;

// Common Button
const BlueprintBtn = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.textMain};
  color: ${(props) => props.theme.colors.textMain};
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.1s;
  width: ${(props) => (props.$full ? '100%' : 'auto')};
  justify-content: ${(props) => (props.$full ? 'flex-start' : 'center')};
  margin-bottom: ${(props) => (props.$mb ? '0.5rem' : '0')};

  &:hover {
    background: ${(props) => props.theme.colors.textMain};
    color: ${(props) => props.theme.colors.canvas};
  }

  &:active {
    transform: translate(1px, 1px);
  }

  &.active {
    background: ${(props) => props.theme.colors.textMain};
    color: ${(props) => props.theme.colors.canvas};
  }

  &.danger:hover {
    border-color: ${(props) => props.theme.colors.error};
    background: ${(props) => props.theme.colors.error};
  }
`;

// Main List Area
const MainViewport = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 400px;
`;

const ListContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  max-height: 600px;
`;

const TodoRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) =>
    props.$completed ? props.theme.colors.bg : props.theme.colors.canvas};
  opacity: ${(props) => (props.$completed ? 0.6 : 1)};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.textMain};
  }
`;

const Checkbox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.textMain};
`;

const TodoText = styled.span`
  font-family: ${(props) => props.theme.fonts.mono};
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  font-size: 0.9rem;
  cursor: text;
`;

// Empty State
const EmptyState = styled.div`
  padding: 2rem;
  text-align: left;
  color: ${(props) => props.theme.colors.textSub};
  font-family: ${(props) => props.theme.fonts.mono};
  line-height: 1.8;
  border: 1px dashed ${(props) => props.theme.colors.borderStrong};
  margin: 1.5rem;
`;

const StatusBar = styled.div`
  border-top: 2px solid ${(props) => props.theme.colors.textMain};
  padding: 0.75rem 1.5rem;
  background: ${(props) => props.theme.colors.bg};
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
`;

// Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(2px); // Minimal blur
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  background: ${(props) => props.theme.colors.canvas};
  border: 2px solid ${(props) => props.theme.colors.textMain};
  padding: 2rem;
  width: 400px;
  box-shadow: 12px 12px 0 ${(props) => props.theme.colors.textMain};
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  font-family: ${(props) => props.theme.fonts.ui};
  text-transform: uppercase;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

// --- 3. React Application Logic ---

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('engineering-todo-data');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [modalConfig, setModalConfig] = useState(null); // { type, title, action }

  useEffect(() => {
    localStorage.setItem('engineering-todo-data', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      timestamp: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
    setModalConfig(null);
  };

  const clearAll = () => {
    setTodos([]);
    setModalConfig(null);
  };

  const markAllCompleted = () => {
    setTodos(todos.map((t) => ({ ...t, completed: true })));
    setModalConfig(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todo_dump_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setTodos([...todos, ...imported]);
        }
      } catch (err) {
        alert('Invalid format');
      }
    };
    reader.readAsText(file);
  };

  // Filter Logic
  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {/* --- Main Diagram Interface --- */}
      <DiagramCanvas>
        {/* Top Header */}
        <HeaderBlock>
          <Title>
            <Terminal size={24} /> TODO_LIST.EXE
          </Title>
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: '0.8rem',
              color: theme.colors.textSub,
            }}
          >
            V 2.0.4 [BUILD_RELEASE]
          </div>
        </HeaderBlock>

        {/* Control Grid */}
        <ControlPanel>
          <InputWrapper onSubmit={addTodo}>
            <TechInput
              type="text"
              placeholder="> INPUT_NEW_TASK..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <BlueprintBtn type="submit">
              <Plus size={16} /> SUBMIT
            </BlueprintBtn>
          </InputWrapper>

          <Sidebar>
            {/* This space intentionally left for layout balance in this grid row */}
            <div
              style={{
                padding: '1rem',
                borderLeft: '1px solid #cbd5e1',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.75rem',
                fontFamily: theme.fonts.mono,
                color: theme.colors.textSub,
              }}
            >
              SYS_STATUS: ONLINE
            </div>
          </Sidebar>
        </ControlPanel>

        {/* Main Content Layout (Sidebar + List) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1fr',
            minHeight: '500px',
          }}
        >
          {/* Left: Task List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: '2px solid #0f172a',
            }}
          >
            <div
              style={{
                padding: '0.75rem',
                borderBottom: '1px solid #cbd5e1',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <BlueprintBtn
                onClick={() =>
                  setModalConfig({
                    type: 'markAll',
                    title: 'CONFIRM: COMPLETE ALL?',
                    action: markAllCompleted,
                  })
                }
              >
                <Check size={14} /> MARK_ALL_DONE
              </BlueprintBtn>
            </div>

            <ListContainer>
              {filteredTodos.length === 0 ? (
                <EmptyState>
                  <strong>// NO DATA FOUND IN CURRENT VIEW</strong>
                  <br />
                  <br />
                  [1] Use the input field above to append new records.
                  <br />
                  [2] Filters on the right sidebar toggle view modes.
                  <br />
                  [3] Data persists locally in browser storage.
                  <br />
                  [4] Export/Import functions available for backup.
                </EmptyState>
              ) : (
                filteredTodos.map((todo) => (
                  <TodoRow key={todo.id} $completed={todo.completed}>
                    <Checkbox onClick={() => toggleTodo(todo.id)}>
                      {todo.completed ? (
                        <CheckSquare size={20} />
                      ) : (
                        <Square size={20} />
                      )}
                    </Checkbox>
                    <TodoText
                      $completed={todo.completed}
                      onDoubleClick={() => {
                        const newText = prompt('EDIT_RECORD:', todo.text);
                        if (newText)
                          setTodos(
                            todos.map((t) =>
                              t.id === todo.id ? { ...t, text: newText } : t,
                            ),
                          );
                      }}
                    >
                      {todo.text}
                    </TodoText>
                    <BlueprintBtn
                      onClick={() => deleteTodo(todo.id)}
                      className="danger"
                      style={{ border: 'none', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </BlueprintBtn>
                  </TodoRow>
                ))
              )}
            </ListContainer>

            <div style={{ marginTop: 'auto' }}>
              <StatusBar>
                <span>RECORDS_PENDING: {activeCount}</span>
                <span>FILTER: {filter.toUpperCase()}</span>
              </StatusBar>
            </div>
          </div>

          {/* Right: Sidebar Controls */}
          <Sidebar>
            <SidebarSection>
              <SidebarTitle>View Filter</SidebarTitle>
              <BlueprintBtn
                $full
                $mb
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                <LayoutTemplate size={14} /> ALL
              </BlueprintBtn>
              <BlueprintBtn
                $full
                $mb
                className={filter === 'active' ? 'active' : ''}
                onClick={() => setFilter('active')}
              >
                <Square size={14} /> ACTIVE
              </BlueprintBtn>
              <BlueprintBtn
                $full
                $mb
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                <CheckSquare size={14} /> COMPLETED
              </BlueprintBtn>
            </SidebarSection>

            <SidebarSection>
              <SidebarTitle>Batch Operations</SidebarTitle>
              <BlueprintBtn
                $full
                $mb
                onClick={() =>
                  setModalConfig({
                    type: 'clearCompleted',
                    title: 'PURGE COMPLETED?',
                    action: clearCompleted,
                  })
                }
              >
                <Trash2 size={14} /> PURGE_DONE
              </BlueprintBtn>
              <BlueprintBtn
                $full
                $mb
                className="danger"
                onClick={() =>
                  setModalConfig({
                    type: 'clearAll',
                    title: 'WARNING: PURGE ALL?',
                    action: clearAll,
                  })
                }
              >
                <AlertTriangle size={14} /> PURGE_ALL
              </BlueprintBtn>
            </SidebarSection>

            <SidebarSection>
              <SidebarTitle>I/O Operations</SidebarTitle>
              <BlueprintBtn $full $mb onClick={handleExport}>
                <Download size={14} /> EXPORT.JSON
              </BlueprintBtn>
              <label style={{ width: '100%' }}>
                <BlueprintBtn $full as="span">
                  <Upload size={14} /> IMPORT_DATA
                </BlueprintBtn>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImport}
                  accept=".json"
                />
              </label>
            </SidebarSection>
          </Sidebar>
        </div>
      </DiagramCanvas>

      {/* --- Modal Dialog --- */}
      {modalConfig && (
        <ModalOverlay onClick={() => setModalConfig(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <AlertTriangle size={24} /> {modalConfig.title}
            </ModalHeader>
            <div
              style={{
                fontFamily: theme.fonts.mono,
                color: theme.colors.textSub,
              }}
            >
              Are you sure you want to execute this command? This action
              modifies the local database.
            </div>
            <ModalActions>
              <BlueprintBtn onClick={() => setModalConfig(null)}>
                CANCEL
              </BlueprintBtn>
              <BlueprintBtn className="active" onClick={modalConfig.action}>
                CONFIRM
              </BlueprintBtn>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
    </ThemeProvider>
  );
}

export default App;
