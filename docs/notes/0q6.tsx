import {
  Calendar,
  LayoutGrid,
  Link as LinkIcon,
  Mail,
  Minus,
  Plus,
  Settings,
} from 'lucide-react';
import React, { useState } from 'react';

/**
 * Design System: Flat Engineering Blueprint (Refined)
 * ---------------------------------------------------
 * Update Log:
 * - Removed clunky PlusSquare icons.
 * - Introduced "Micro-Node" toggles: tiny 12px boxes sitting exactly on grid lines.
 * - Toggles act as circuit junctions.
 * - Refined line alignment for pixel-perfect connectivity.
 */

// --- Types ---
interface MenuItem {
  key: string;
  label: string;
  icon?: React.ElementType;
  children?: MenuItem[];
  badge?: string;
}

interface BlueprintMenuProps {
  items: MenuItem[];
  defaultSelectedKey?: string;
  defaultOpenKeys?: string[];
  className?: string;
}

// --- Component ---
const BlueprintMenu: React.FC<BlueprintMenuProps> = ({
  items,
  defaultSelectedKey = '',
  defaultOpenKeys = [],
  className = '',
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  // --- Recursive Renderer ---
  const renderTree = (
    nodes: MenuItem[],
    level: number,
    parentLines: boolean[], // Tracks vertical guides for depth
  ) => {
    return nodes.map((node, index) => {
      const isLast = index === nodes.length - 1;
      const isOpen = openKeys.includes(node.key);
      const isSelected = selectedKey === node.key;
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.key} className="select-none font-sans">
          {/* ROW CONTAINER */}
          <div
            className={`
              group relative flex items-center h-10 w-full pr-4 
              border-b border-slate-200 
              transition-colors duration-100
              ${isSelected ? 'bg-slate-900 z-10' : 'bg-white hover:bg-slate-50'}
              cursor-pointer
            `}
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggleOpen(node.key);
              else setSelectedKey(node.key);
            }}
          >
            {/* 1. PARENT GUIDE LINES (The vertical trunk lines) */}
            {parentLines.map((lineActive, idx) => (
              <div
                key={idx}
                className={`h-full w-6 shrink-0 flex justify-center ${
                  lineActive ? 'border-r border-slate-300' : ''
                }`}
              />
            ))}

            {/* 2. CURRENT LEVEL CONNECTOR (The Branch) */}
            {level > 0 && (
              <div className="relative h-full w-6 shrink-0 flex items-center justify-center">
                {/* Vertical Segment (Up) */}
                <div className="absolute left-[23px] top-0 h-1/2 w-[1px] bg-slate-300" />
                {/* Vertical Segment (Down) - Only if not last */}
                {!isLast && (
                  <div className="absolute left-[23px] top-1/2 h-1/2 w-[1px] bg-slate-300" />
                )}

                {/* Horizontal Segment (To Right) */}
                <div className="absolute left-[23px] top-1/2 w-[24px] h-[1px] bg-slate-300" />
              </div>
            )}

            {/* 3. TOGGLE NODE OR SPACER */}
            <div className="relative w-8 shrink-0 flex items-center justify-center">
              {/* Connection line passing through for children */}
              {level > 0 && (
                <div className="absolute w-full top-1/2 h-[1px] bg-slate-300 left-[-12px]" />
              )}

              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOpen(node.key);
                  }}
                  className={`
                            relative z-20 w-3 h-3 flex items-center justify-center
                            border bg-white transition-colors
                            ${
                              isSelected
                                ? 'border-slate-500' // If row is black, button needs contrast
                                : 'border-slate-400 group-hover:border-slate-900'
                            }
                        `}
                >
                  {/* Tiny Plus/Minus Icons */}
                  {isOpen ? (
                    <Minus
                      size={8}
                      className="text-slate-900"
                      strokeWidth={3}
                    />
                  ) : (
                    <Plus size={8} className="text-slate-900" strokeWidth={3} />
                  )}
                </button>
              ) : (
                /* Leaf Node Decoration: A tiny dot on the line end */
                <div
                  className={`
                        relative z-20 w-1.5 h-1.5 border bg-white
                        ${
                          isSelected
                            ? 'border-white bg-slate-900'
                            : 'border-slate-400'
                        }
                    `}
                />
              )}
            </div>

            {/* 4. CONTENT */}
            <div className="flex items-center gap-3 min-w-0 flex-1 pl-1">
              {/* Icon */}
              {node.icon && (
                <node.icon
                  size={14}
                  className={`shrink-0 ${
                    isSelected ? 'text-white' : 'text-slate-500'
                  }`}
                  strokeWidth={1.5}
                />
              )}

              {/* Label */}
              <span
                className={`
                    truncate leading-none pt-0.5
                    ${
                      level === 0
                        ? 'font-bold text-xs uppercase tracking-wider'
                        : 'font-mono text-[11px]'
                    }
                    ${isSelected ? 'text-white' : 'text-slate-700'}
                 `}
              >
                {node.label}
              </span>
            </div>

            {/* 5. BADGE (Right) */}
            {node.badge && (
              <div
                className={`
                    text-[9px] font-mono px-1 border ml-2 h-4 flex items-center
                    ${
                      isSelected
                        ? 'border-slate-500 text-slate-300'
                        : 'border-slate-200 text-slate-400'
                    }
                  `}
              >
                {node.badge}
              </div>
            )}
          </div>

          {/* RECURSION */}
          {hasChildren && isOpen && (
            <div className="animate-in slide-in-from-top-1 duration-150">
              {/* Pass down whether the current level needs a vertical line (if it's not the last item) */}
              {renderTree(node.children!, level + 1, [...parentLines, !isLast])}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={`w-64 bg-[#f8fafc] border border-slate-300 flex flex-col h-full ${className}`}
    >
      {/* Header */}
      <div className="h-10 border-b border-slate-300 bg-white flex items-center px-3 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-900" />
          <span className="font-bold text-slate-900 text-xs tracking-widest uppercase">
            Project_Nav
          </span>
        </div>
      </div>

      {/* Tree View */}
      <div className="flex-1 overflow-y-auto py-2">
        {renderTree(items, 0, [])}
      </div>

      {/* Footer */}
      <div className="h-8 border-t border-slate-300 bg-slate-50 flex items-center px-3 justify-between shrink-0 text-[10px] font-mono text-slate-400">
        <span>OBJ: {items.length}</span>
        <span>READ_ONLY</span>
      </div>
    </div>
  );
};

// --- Demo Data ---
const items: MenuItem[] = [
  { key: 'nav1', label: 'Dashboard', icon: LayoutGrid },
  { key: 'nav2', label: 'Mailbox', icon: Mail, badge: '4' },
  {
    key: 'nav3',
    label: 'Resources',
    icon: Calendar,
    children: [
      { key: 'opt3', label: 'Timeline View' },
      { key: 'opt4', label: 'Gantt Chart', badge: 'BETA' },
      {
        key: 'sub1',
        label: 'Archives',
        children: [
          { key: 'opt5', label: '2023_Q4_Report' },
          { key: 'opt6', label: '2024_Q1_Plan' },
        ],
      },
    ],
  },
  {
    key: 'nav4',
    label: 'Settings',
    icon: Settings,
    children: [
      { key: 'opt7', label: 'Profile' },
      { key: 'opt8', label: 'Security' },
    ],
  },
  { key: 'link', label: 'External Ref', icon: LinkIcon },
];

const MenuShowcase = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-12 flex justify-center items-start">
      <BlueprintMenu
        items={items}
        defaultSelectedKey="opt5"
        defaultOpenKeys={['nav3', 'sub1']}
      />
    </div>
  );
};

export default MenuShowcase;
