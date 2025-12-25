import {
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
  LayoutTemplate,
  MinusSquare,
  PlusSquare,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

// --- Data Structure ---
const TREE_DATA = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      {
        key: '0-0-0',
        title: 'parent 1-0',
        children: [
          { key: '0-0-0-0', title: 'leaf', isLeaf: true },
          { key: '0-0-0-1', title: 'leaf', isLeaf: true },
        ],
      },
      {
        key: '0-0-1',
        title: 'parent 1-1',
        children: [{ key: '0-0-1-0', title: 'leaf', isLeaf: true }],
      },
      {
        key: '0-0-2',
        title: 'parent 1-2',
        children: [
          { key: '0-0-2-0', title: 'leaf', isLeaf: true },
          { key: '0-0-2-1', title: 'leaf', isLeaf: true, icon: 'edit' },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: 'parent 2',
    children: [{ key: '0-1-0', title: 'leaf', isLeaf: true }],
  },
];

// --- Styled Primitives ---

const BlueprintWrapper = styled.div`
  background: #f8fafc;
  padding: 3rem;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  min-height: 600px;
  display: flex;
  justify-content: center;
`;

const ComponentFrame = styled.div`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  position: relative;

  /* Technical markings */
  &::before {
    content: 'TREE_VIEW_COMPONENT';
    position: absolute;
    top: -24px;
    left: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: #64748b;
  }
`;

const ControlPanel = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: #f8fafc;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #64748b;
  min-width: 120px;
`;

// --- Mechanical Switch ---
const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  border: 1px solid #94a3b8;
  transition: 0.2s;

  &::before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: #94a3b8;
    transition: 0.2s;
    border-radius: 0; /* Square slider for technical feel */
  }

  ${SwitchInput}:checked + & {
    border-color: #0f172a; /* Active Border */
  }

  ${SwitchInput}:checked + &::before {
    transform: translateX(22px);
    background-color: #0f172a; /* Active Color */
  }
`;

// --- Flat Dropdown ---
const Select = styled.div`
  border: 1px solid #cbd5e1;
  background: #fff;
  padding: 0.25rem 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  cursor: pointer;

  &:hover {
    border-color: #94a3b8;
  }
`;

// --- Tree Styles ---

const TreeArea = styled.div`
  padding: 1.5rem;
  overflow: auto;
  font-family: 'JetBrains Mono', monospace; /* Monospace for structure */
  font-size: 0.9rem;
`;

const TreeNodeRow = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
  cursor: pointer;
  position: relative;

  &:hover {
    background: #f1f5f9;
  }

  ${(props) =>
    props.$selected &&
    css`
      background: #e2e8f0;

      /* Active indicator strip */
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: #0f172a;
      }
    `}
`;

const ExpanderBox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #64748b;
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: #0f172a;
  }
`;

const NodeContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 8px;
`;

const IndentGuide = styled.div`
  display: inline-block;
  width: 28px; /* Indent width */
  height: 100%;
  position: relative;
  flex-shrink: 0;

  /* Vertical Line */
  ${(props) =>
    props.$showLine &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 10px; /* Center of width */
        border-left: 1px dashed #cbd5e1;
      }
    `}
`;

// Special component for the last connector elbow
const ConnectorElbow = styled.div`
  width: 20px;
  height: 28px; /* Taller to connect to prev sibling */
  position: absolute;
  left: -20px;
  top: -14px;
  pointer-events: none;

  border-left: 1px dashed #cbd5e1;
  border-bottom: 1px dashed #cbd5e1;
`;

// --- Logic ---

const TreeNode = ({
  node,
  level = 0,
  expandedKeys,
  selectedKey,
  onExpand,
  onSelect,
  showLine,
  showIcon,
}) => {
  const isExpanded = expandedKeys.includes(node.key);
  const isSelected = selectedKey === node.key;
  const hasChildren = node.children && node.children.length > 0;

  const handleExpand = (e) => {
    e.stopPropagation();
    onExpand(node.key);
  };

  const Icon = hasChildren
    ? isExpanded
      ? FolderOpen
      : Folder
    : node.icon === 'edit'
    ? LayoutTemplate
    : FileText;

  return (
    <div style={{ position: 'relative' }}>
      <TreeNodeRow
        $selected={isSelected}
        onClick={() => onSelect(node.key)}
        style={{ paddingLeft: `${level * 28}px` }}
      >
        {/* Connector Lines Logic for Deep Nesting (Visual approximation) */}
        {showLine && level > 0 && (
          <div
            style={{
              position: 'absolute',
              left: `${level * 28 - 18}px`,
              top: '-10px',
              bottom: '50%',
              width: '1px',
              borderLeft: '1px dashed #cbd5e1',
            }}
          />
        )}
        {showLine && level > 0 && (
          <div
            style={{
              position: 'absolute',
              left: `${level * 28 - 18}px`,
              top: '50%',
              width: '18px',
              borderTop: '1px dashed #cbd5e1',
            }}
          />
        )}

        <ExpanderBox onClick={handleExpand}>
          {hasChildren ? (
            isExpanded ? (
              <MinusSquare size={16} strokeWidth={1.5} />
            ) : (
              <PlusSquare size={16} strokeWidth={1.5} />
            )
          ) : (
            <span style={{ width: 16 }} />
          )}
        </ExpanderBox>

        <NodeContent>
          {showIcon && (
            <Icon
              size={14}
              strokeWidth={1.5}
              color={isSelected ? '#0f172a' : '#64748b'}
            />
          )}
          <span>{node.title}</span>
        </NodeContent>
      </TreeNodeRow>

      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.key}
              node={child}
              level={level + 1}
              expandedKeys={expandedKeys}
              selectedKey={selectedKey}
              onExpand={onExpand}
              onSelect={onSelect}
              showLine={showLine}
              showIcon={showIcon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const BlueprintTreeLayout = () => {
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-1', '0-0-2']);
  const [selectedKey, setSelectedKey] = useState('0-0');
  const [showLine, setShowLine] = useState(true);
  const [showIcon, setShowIcon] = useState(false);

  const toggleExpand = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <BlueprintWrapper>
      <ComponentFrame>
        <ControlPanel>
          <ControlRow>
            <Label>showLine:</Label>
            <SwitchLabel>
              <SwitchInput
                type="checkbox"
                checked={showLine}
                onChange={() => setShowLine(!showLine)}
              />
              <Slider />
            </SwitchLabel>
          </ControlRow>

          <ControlRow>
            <Label>showIcon:</Label>
            <SwitchLabel>
              <SwitchInput
                type="checkbox"
                checked={showIcon}
                onChange={() => setShowIcon(!showIcon)}
              />
              <Slider />
            </SwitchLabel>
          </ControlRow>

          <ControlRow>
            <Label>showLeafIcon:</Label>
            <Select>
              <span>False</span>
              <ChevronDown size={14} />
            </Select>
          </ControlRow>
        </ControlPanel>

        <TreeArea>
          {TREE_DATA.map((node) => (
            <TreeNode
              key={node.key}
              node={node}
              expandedKeys={expandedKeys}
              selectedKey={selectedKey}
              onExpand={toggleExpand}
              onSelect={setSelectedKey}
              showLine={showLine}
              showIcon={showIcon}
            />
          ))}
        </TreeArea>

        {/* Footer info */}
        <div
          style={{
            borderTop: '1px solid #cbd5e1',
            padding: '0.75rem 1.5rem',
            fontSize: '0.75rem',
            color: '#94a3b8',
            fontFamily: 'JetBrains Mono',
          }}
        >
          SELECTED_NODE: {selectedKey ? `ID<${selectedKey}>` : 'NULL'}
        </div>
      </ComponentFrame>
    </BlueprintWrapper>
  );
};

export default BlueprintTreeLayout;
