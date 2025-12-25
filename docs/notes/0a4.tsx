import { ChevronRight, Database, Loader2, Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// --- Theme Constants ---
const C = {
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#0f172a', // Slate 900
  borderSub: '#cbd5e1', // Slate 300
  text: '#0f172a',
  textSub: '#64748b',
  highlight: '#fef08a', // Yellow 200 for highlights
  highlightText: '#854d0e',
  accent: '#0f172a',
};

// --- Animations ---
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

// --- Styled Components ---

const Container = styled.div`
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  width: 100%;
  max-width: 480px;
  position: relative;
  color: ${C.text};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4px;
  padding: 0 2px;
`;

const Label = styled.label`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: ${C.textSub};
  text-transform: uppercase;
`;

const StatusText = styled.span`
  font-size: 9px;
  color: ${C.textSub};
  opacity: 0.7;
`;

// Input Chassis
const InputWrapper = styled.div<{ $isFocused: boolean; $isLoading: boolean }>`
  position: relative;
  background: ${C.white};
  border: 2px solid ${(props) => (props.$isFocused ? C.border : C.borderSub)};
  height: 48px;
  display: flex;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.$isFocused ? `4px 4px 0 0 ${C.borderSub}` : 'none'};
  z-index: 20;

  /* State Indicator Light */
  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 12px;
    background-color: ${(props) => {
      if (props.$isLoading) return '#f59e0b'; // Amber
      if (props.$isFocused) return '#10b981'; // Green
      return C.borderSub; // Gray
    }};
    transition: background-color 0.3s;
  }
`;

const IconSlot = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${C.borderSub};
  color: ${C.textSub};
  background-color: ${C.bg};
`;

const StyledInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 16px;
  font-family: inherit;
  font-size: 14px;
  color: ${C.text};

  &::placeholder {
    color: ${C.textSub};
    opacity: 0.5;
  }
`;

const ActionSlot = styled.div`
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${C.textSub};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${C.text};
    background-color: ${C.bg};
  }
`;

const Spinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
  color: ${C.text};
`;

// Dropdown "Monitor"
const DropdownPanel = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px); /* Gap */
  left: 0;
  right: 0;
  background: ${C.white};
  border: 1px solid ${C.border};
  z-index: 10;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform: ${(props) =>
    props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
  transition: all 0.15s ease-out;
  box-shadow: 8px 8px 0 0 rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 320px;
`;

const DropdownHeader = styled.div`
  background-color: ${C.bg};
  border-bottom: 1px solid ${C.borderSub};
  padding: 4px 8px;
  font-size: 10px;
  color: ${C.textSub};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
  position: relative;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: ${C.bg};
  }
  &::-webkit-scrollbar-thumb {
    background: ${C.borderSub};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${C.textSub};
  }
`;

const Item = styled.li<{ $isActive: boolean }>`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-bottom: 1px dashed ${C.borderSub};
  position: relative;
  background-color: ${(props) => (props.$isActive ? '#f1f5f9' : 'transparent')};
  color: ${(props) => (props.$isActive ? C.text : C.textSub)};

  &:last-child {
    border-bottom: none;
  }

  /* Active Indicator Bar */
  ${(props) =>
    props.$isActive &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background-color: ${C.border};
      }
    `}
`;

const IndexTag = styled.span`
  font-size: 10px;
  opacity: 0.5;
  min-width: 24px;
`;

const Highlight = styled.span`
  background-color: ${C.highlight};
  color: ${C.highlightText};
  font-weight: bold;
  border: 1px solid #eab308;
  padding: 0 2px;
`;

const EmptyState = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${C.textSub};
  font-size: 12px;
  gap: 8px;
`;

const KeyboardHint = styled.div`
  display: flex;
  gap: 12px;
  font-size: 10px;
  color: ${C.textSub};
`;

const Kbd = styled.kbd`
  background: ${C.white};
  border: 1px solid ${C.borderSub};
  border-bottom-width: 2px;
  padding: 1px 4px;
  border-radius: 2px;
  font-family: inherit;
  font-size: 9px;
`;

// --- Helper: Data & Logic ---

// Mock Data
const DATABASE = [
  'React Component Library',
  'React Hooks Pattern',
  'Redux State Management',
  'Styled Components System',
  'Tailwind CSS Configuration',
  'TypeScript Interface Definition',
  'Webpack Bundle Analyzer',
  'Vite Build Tooling',
  'Node.js Runtime Environment',
  'Docker Container Service',
  'Kubernetes Cluster Manager',
  'PostgreSQL Database Sharding',
  'Redis Cache Layer',
  'Nginx Reverse Proxy',
  'AWS Lambda Functions',
  'GraphQL API Schema',
];

// Highlight Text Helper
const HighlightText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim()) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Highlight key={i}>{part}</Highlight>
        ) : (
          part
        ),
      )}
    </span>
  );
};

// --- Main Component ---

export default function EngineeringAutoComplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced Search Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsLoading(true);
        setIsOpen(true);
        // Mock API Call
        setTimeout(() => {
          const filtered = DATABASE.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase()),
          );
          setResults(filtered);
          setIsLoading(false);
          setActiveIndex(-1); // Reset selection
        }, 600); // 600ms delay
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click Outside to Close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        selectItem(results[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectItem = (item: string) => {
    setQuery(item);
    setIsOpen(false);
    // Optional: trigger search action here
  };

  const clearInput = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        padding: '4rem',
        background: '#f1f5f9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Container>
        <LabelRow>
          <Label>System_Query_Interface</Label>
          <StatusText>
            {isOpen
              ? isLoading
                ? 'FETCHING_DATA...'
                : `READY [${results.length} MATCHES]`
              : 'IDLE'}
          </StatusText>
        </LabelRow>

        <InputWrapper $isFocused={isOpen || isLoading} $isLoading={isLoading}>
          <IconSlot>
            <Search size={18} strokeWidth={2} />
          </IconSlot>

          <StyledInput
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query) setIsOpen(true);
            }}
            placeholder="Enter command or search param..."
            spellCheck={false}
          />

          <ActionSlot>
            {isLoading && <Spinner size={16} />}
            {query && !isLoading && (
              <ClearButton onClick={clearInput} tabIndex={-1}>
                <X size={16} />
              </ClearButton>
            )}
          </ActionSlot>
        </InputWrapper>

        {/* Dropdown Results */}
        <DropdownPanel
          ref={dropdownRef}
          $isOpen={isOpen && (results.length > 0 || !isLoading)}
        >
          <DropdownHeader>
            <span>QUERY_RESULT_SET</span>
            <KeyboardHint>
              <span>NAV:</span> <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <span>SEL:</span> <Kbd>⏎</Kbd>
            </KeyboardHint>
          </DropdownHeader>

          {results.length > 0 ? (
            <ResultList>
              {results.map((item, index) => (
                <Item
                  key={index}
                  $isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectItem(item)}
                >
                  <IndexTag>{(index + 1).toString().padStart(2, '0')}</IndexTag>
                  <span style={{ flex: 1 }}>
                    <HighlightText text={item} highlight={query} />
                  </span>
                  {index === activeIndex && (
                    <ChevronRight size={14} strokeWidth={3} />
                  )}
                </Item>
              ))}
            </ResultList>
          ) : (
            !isLoading &&
            query && (
              <EmptyState>
                <Database size={32} strokeWidth={1} style={{ opacity: 0.3 }} />
                <span>NO_RECORDS_FOUND</span>
                <span style={{ fontSize: '10px', opacity: 0.5 }}>
                  ERROR_CODE: 404_DATA_NULL
                </span>
              </EmptyState>
            )
          )}

          {/* Footer Decoration */}
          <div
            style={{
              borderTop: `1px solid ${C.borderSub}`,
              height: '4px',
              background: `repeating-linear-gradient(90deg, ${C.borderSub}, ${C.borderSub} 1px, transparent 1px, transparent 4px)`,
            }}
          ></div>
        </DropdownPanel>

        {/* Decorative Grid Lines under the input (optional) */}
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            opacity: 0.3,
          }}
        >
          <div
            style={{ width: '1px', height: '10px', background: C.border }}
          ></div>
          <div
            style={{ width: '1px', height: '10px', background: C.border }}
          ></div>
        </div>
      </Container>
    </div>
  );
}
