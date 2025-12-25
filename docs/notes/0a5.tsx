import {
  AlertTriangle,
  Box,
  Check,
  ChevronDown,
  Cpu,
  Layers,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

// --- Theme & Constants ---
const C = {
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#0f172a',
  borderLight: '#cbd5e1',
  text: '#0f172a',
  textSub: '#64748b',
  accent: '#0f172a',
  highlight: '#fef08a',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

// --- Mock Data ---
type Status = 'stable' | 'beta' | 'deprecated';

interface OptionItem {
  uid: string;
  label: string;
  category: string;
  status: Status;
  desc: string;
}

const DATA_SOURCE: OptionItem[] = [
  {
    uid: 'SYS-001',
    label: 'Kernel_Bootloader',
    category: 'CORE_SYSTEM',
    status: 'stable',
    desc: 'Main boot sequence',
  },
  {
    uid: 'SYS-002',
    label: 'Memory_Allocator',
    category: 'CORE_SYSTEM',
    status: 'beta',
    desc: 'Dynamic heap mgmt',
  },
  {
    uid: 'UI-104',
    label: 'Button_Primary',
    category: 'INTERFACE',
    status: 'stable',
    desc: 'Action trigger',
  },
  {
    uid: 'UI-105',
    label: 'Modal_Overlay',
    category: 'INTERFACE',
    status: 'deprecated',
    desc: 'Use Dialog_V2 instead',
  },
  {
    uid: 'NET-200',
    label: 'HTTP_Client',
    category: 'NETWORK',
    status: 'stable',
    desc: 'Axios wrapper',
  },
  {
    uid: 'NET-202',
    label: 'Socket_Emitter',
    category: 'NETWORK',
    status: 'beta',
    desc: 'Real-time duplex',
  },
  {
    uid: 'DAT-301',
    label: 'Graph_Renderer',
    category: 'VISUALIZATION',
    status: 'stable',
    desc: 'D3 implementation',
  },
];

// --- Styled Components ---

const Wrapper = styled.div`
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  width: 100%;
  max-width: 500px;
  position: relative;
  color: ${C.text};
`;

const Label = styled.div`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: ${C.textSub};
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
`;

// 输入框外壳
const InputChassis = styled.div<{ $isOpen: boolean; $hasSelection: boolean }>`
  position: relative;
  background: ${C.white};
  border: 2px solid ${(props) => (props.$isOpen ? C.border : C.borderLight)};
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 4px;
  box-shadow: ${(props) =>
    props.$isOpen ? `6px 6px 0 0 rgba(15,23,42,0.1)` : 'none'};
  transition: all 0.2s;
  cursor: text;

  &:hover {
    border-color: ${C.border};
  }
`;

// 左侧装饰块
const DecoratorBlock = styled.div`
  width: 32px;
  height: 38px;
  background: ${C.bg};
  border: 1px solid ${C.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: ${C.textSub};
  flex-shrink: 0;
`;

// 实际输入框
const HiddenInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  color: ${C.text};
  background: transparent;
  min-width: 120px;
  height: 32px;

  &::placeholder {
    color: ${C.borderLight};
  }
`;

// 选中后的标签 (Chip)
const SelectionChip = styled.div`
  display: flex;
  align-items: center;
  background: ${C.accent};
  color: ${C.white};
  padding: 0 4px 0 8px;
  height: 32px;
  margin-right: 8px;
  font-size: 12px;
  border: 1px solid ${C.accent};

  /* 斜线纹理背景 */
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.1) 75%,
    transparent 75%,
    transparent
  );
  background-size: 4px 4px;
`;

const ChipRemove = styled.button`
  background: transparent;
  border: none;
  color: ${C.white};
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

// 下拉菜单
const Menu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${C.white};
  border: 1px solid ${C.border};
  z-index: 50;
  max-height: 400px;
  overflow-y: auto;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const CategoryHeader = styled.div`
  padding: 8px 12px;
  background: ${C.bg};
  border-bottom: 1px solid ${C.borderLight};
  border-top: 1px solid ${C.borderLight};
  font-size: 10px;
  font-weight: bold;
  color: ${C.textSub};
  display: flex;
  align-items: center;
  gap: 8px;

  &:first-child {
    border-top: none;
  }
`;

const OptionRow = styled.div<{ $isFocused: boolean; $status: Status }>`
  padding: 10px 12px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  border-bottom: 1px dashed ${C.borderLight};
  transition: background 0.1s;
  background-color: ${(props) =>
    props.$isFocused ? '#f1f5f9' : 'transparent'};
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  /* 聚焦时的左侧指示条 */
  ${(props) =>
    props.$isFocused &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: ${C.accent};
      }
    `}
`;

const ColId = styled.span`
  font-size: 11px;
  color: ${C.textSub};
  min-width: 60px;
  font-weight: bold;
`;

const ColMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ColStatus = styled.div<{ $status: Status }>`
  font-size: 9px;
  padding: 2px 6px;
  border: 1px solid;
  text-transform: uppercase;

  ${(props) => {
    switch (props.$status) {
      case 'stable':
        return css`
          border-color: ${C.success};
          color: ${C.success};
          background: rgba(16, 185, 129, 0.05);
        `;
      case 'beta':
        return css`
          border-color: ${C.warning};
          color: ${C.warning};
          background: rgba(245, 158, 11, 0.05);
        `;
      case 'deprecated':
        return css`
          border-color: ${C.danger};
          color: ${C.danger};
          text-decoration: line-through;
        `;
    }
  }}
`;

const Highlight = styled.span`
  background-color: ${C.highlight};
  padding: 0 1px;
`;

// --- Helpers ---

// 分组逻辑
const groupOptions = (options: OptionItem[]) => {
  return options.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, OptionItem[]>);
};

// 高亮组件
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Highlight key={i}>{part}</Highlight>
        ) : (
          part
        ),
      )}
    </span>
  );
};

// --- Component ---

export default function EngineeringSelect() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<OptionItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. 过滤逻辑
  const filteredOptions = useMemo(() => {
    return DATA_SOURCE.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.uid.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  // 2. 将过滤后的数据分组（用于渲染）和 展平（用于键盘导航）
  const grouped = useMemo(
    () => groupOptions(filteredOptions),
    [filteredOptions],
  );
  const flatList = filteredOptions; // 展平的列表用于计算 focusedIndex

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: OptionItem) => {
    setSelected(item);
    setQuery('');
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : flatList.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && flatList[focusedIndex]) {
        handleSelect(flatList[focusedIndex]);
      } else if (flatList.length > 0) {
        handleSelect(flatList[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Backspace' && !query && selected) {
      setSelected(null);
    }
  };

  return (
    <div
      style={{
        padding: '4rem',
        background: '#f1f5f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Wrapper ref={containerRef}>
        <Label>
          <span>MODULE_SELECTOR</span>
          <span>{isOpen ? 'SELECT_MODE' : 'IDLE'}</span>
        </Label>

        <InputChassis
          $isOpen={isOpen}
          $hasSelection={!!selected}
          onClick={() => inputRef.current?.focus()}
        >
          {/* 左侧装饰：如果是选中状态，显示 Check，否则显示 Search */}
          <DecoratorBlock>
            {selected ? <Check size={16} /> : <Search size={16} />}
          </DecoratorBlock>

          {/* 选中态：Chip */}
          {selected && (
            <SelectionChip>
              <Box size={12} style={{ marginRight: 6 }} />
              <span>
                {selected.uid} // {selected.label}
              </span>
              <ChipRemove onClick={handleRemove}>
                <X size={12} />
              </ChipRemove>
            </SelectionChip>
          )}

          {/* 输入框：有选中时 placeholder 为空 */}
          <HiddenInput
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              // 如果用户输入，且有选中项，通常我们会保持选中项直到用户删除它，或者这里可以设计为自动清除选中项
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selected ? '' : 'Search by ID or Name...'}
          />

          <ChevronDown
            size={14}
            color={C.textSub}
            style={{
              marginRight: 8,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
            }}
          />
        </InputChassis>

        {/* Dropdown Menu */}
        <Menu $isOpen={isOpen && filteredOptions.length > 0}>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <CategoryHeader>
                {category === 'CORE_SYSTEM' ? (
                  <Cpu size={12} />
                ) : category === 'NETWORK' ? (
                  <Layers size={12} />
                ) : (
                  <Box size={12} />
                )}
                {category}
              </CategoryHeader>

              {items.map((item) => {
                // 计算在 flatList 中的全局索引，用于高亮
                const globalIndex = flatList.findIndex(
                  (i) => i.uid === item.uid,
                );

                return (
                  <OptionRow
                    key={item.uid}
                    $isFocused={globalIndex === focusedIndex}
                    $status={item.status}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setFocusedIndex(globalIndex)}
                  >
                    <ColId>
                      <HighlightText text={item.uid} query={query} />
                    </ColId>

                    <ColMain>
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                        <HighlightText text={item.label} query={query} />
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          color: C.textSub,
                          marginTop: 2,
                        }}
                      >
                        {item.desc}
                      </span>
                    </ColMain>

                    <ColStatus $status={item.status}>
                      {item.status === 'deprecated' && (
                        <AlertTriangle
                          size={8}
                          style={{ marginRight: 4, verticalAlign: 'middle' }}
                        />
                      )}
                      {item.status === 'stable' && (
                        <ShieldCheck
                          size={8}
                          style={{ marginRight: 4, verticalAlign: 'middle' }}
                        />
                      )}
                      {item.status}
                    </ColStatus>
                  </OptionRow>
                );
              })}
            </div>
          ))}

          {/* Footer Info */}
          <div
            style={{
              padding: '8px 12px',
              background: C.bg,
              borderTop: `1px solid ${C.borderLight}`,
              fontSize: '9px',
              color: C.textSub,
              textAlign: 'right',
            }}
          >
            {filteredOptions.length} RECORDS FOUND
          </div>
        </Menu>

        {/* 底部空状态或提示 */}
        {isOpen && filteredOptions.length === 0 && (
          <Menu $isOpen={true}>
            <div
              style={{
                padding: '24px',
                textAlign: 'center',
                color: C.textSub,
                fontSize: '12px',
              }}
            >
              NO_MATCHING_MODULES
            </div>
          </Menu>
        )}
      </Wrapper>
    </div>
  );
}
