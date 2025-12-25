import {
  Calendar,
  LayoutGrid,
  Link as LinkIcon,
  Mail,
  Settings,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

/**
 * Design System: Flat Engineering Blueprint (High Visibility)
 * ----------------------------------------------------------
 * FIX LOG:
 * - Replaced SVG strokes with absolute positioned DIVs for +/- icons.
 * - Increased Toggle Box size to 14px (w-3.5).
 * - Lines are now 2px thick solid blocks. Impossible to miss.
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

// --- Helper ---
const findPathToKey = (nodes: MenuItem[], targetKey: string): string[] => {
  for (const node of nodes) {
    if (node.key === targetKey) return [node.key];
    if (node.children) {
      const path = findPathToKey(node.children, targetKey);
      if (path.length > 0) return [node.key, ...path];
    }
  }
  return [];
};

// --- Component ---
const BlueprintMenu: React.FC<BlueprintMenuProps> = ({
  items,
  defaultSelectedKey = '',
  defaultOpenKeys = [],
  className = '',
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const activePath = useMemo(
    () => findPathToKey(items, selectedKey),
    [items, selectedKey],
  );

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const renderTree = (
    nodes: MenuItem[],
    level: number,
    parentLines: boolean[],
  ) => {
    return nodes.map((node, index) => {
      const isLast = index === nodes.length - 1;
      const isOpen = openKeys.includes(node.key);
      const isSelected = selectedKey === node.key;
      const isActivePath = activePath.includes(node.key) && !isSelected;
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.key} className="select-none font-sans">
          <div
            className={`
              group relative flex items-center h-10 w-full pr-4 
              border-b border-slate-200 
              transition-colors duration-75
              ${isSelected ? 'bg-slate-900 z-10' : 'bg-white hover:bg-slate-50'}
              cursor-pointer
            `}
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggleOpen(node.key);
              else setSelectedKey(node.key);
            }}
          >
            {/* 1. GUIDE LINES */}
            {parentLines.map((lineActive, idx) => (
              <div
                key={idx}
                className={`h-full w-6 shrink-0 flex justify-center ${
                  lineActive ? 'border-r border-slate-300' : ''
                }`}
              />
            ))}

            {/* 2. BRANCH CONNECTOR */}
            {level > 0 && (
              <div className="relative h-full w-6 shrink-0 flex items-center justify-center">
                <div className="absolute left-[23px] top-0 h-1/2 w-[1px] bg-slate-300" />
                {!isLast && (
                  <div className="absolute left-[23px] top-1/2 h-1/2 w-[1px] bg-slate-300" />
                )}
                <div className="absolute left-[23px] top-1/2 w-[24px] h-[1px] bg-slate-300" />
              </div>
            )}

            {/* 3. TOGGLE / NODE INDICATOR */}
            <div className="relative w-8 shrink-0 flex items-center justify-center">
              {/* Horizontal Pass-through Line */}
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
                            relative z-20 w-3.5 h-3.5 flex items-center justify-center
                            border bg-white shadow-sm
                            ${
                              isSelected
                                ? 'border-slate-500'
                                : isActivePath
                                ? 'border-slate-900'
                                : 'border-slate-400 group-hover:border-slate-900'
                            }
                        `}
                >
                  {/* 
                          HIGH CONTRAST +/- SYMBOLS 
                          Using pure DIVs instead of SVG to guarantee visibility 
                       */}
                  <div className="relative w-2 h-2 flex items-center justify-center">
                    {/* Horizontal Line (Always visible) */}
                    <div
                      className={`absolute w-full h-[2px] ${
                        isSelected ? 'bg-slate-900' : 'bg-slate-900'
                      }`}
                    />

                    {/* Vertical Line (Only if closed) */}
                    {!isOpen && (
                      <div
                        className={`absolute h-full w-[2px] ${
                          isSelected ? 'bg-slate-900' : 'bg-slate-900'
                        }`}
                      />
                    )}
                  </div>
                </button>
              ) : (
                /* Leaf Node Endpoint */
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
              {node.icon && (
                <node.icon
                  size={14}
                  className={`shrink-0 ${
                    isSelected
                      ? 'text-white'
                      : isActivePath
                      ? 'text-slate-900'
                      : 'text-slate-500'
                  }`}
                  strokeWidth={1.5}
                />
              )}
              <span
                className={`
                    truncate leading-none pt-0.5
                    ${
                      level === 0
                        ? 'font-bold text-xs uppercase tracking-wider'
                        : 'font-mono text-[11px]'
                    }
                    ${
                      isSelected
                        ? 'text-white'
                        : isActivePath
                        ? 'text-slate-900 font-bold'
                        : 'text-slate-600'
                    }
                 `}
              >
                {node.label}
              </span>
            </div>

            {/* 5. BADGE */}
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
      <div className="h-10 border-b border-slate-300 bg-white flex items-center px-3 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-900" />
          <span className="font-bold text-slate-900 text-xs tracking-widest uppercase">
            SYS_NAV
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {renderTree(items, 0, [])}
      </div>
    </div>
  );
};

// --- Demo Usage ---

const items: MenuItem[] = [
  { key: 'nav1', label: 'Overview', icon: LayoutGrid },
  {
    key: 'nav2',
    label: 'Communications',
    icon: Mail,
    children: [
      { key: 'inbox', label: 'Inbox', badge: '12' },
      { key: 'sent', label: 'Sent Items' },
    ],
  },
  {
    key: 'nav3',
    label: 'Project Data',
    icon: Calendar,
    children: [
      { key: 'gantt', label: 'Gantt View' },
      {
        key: 'reports',
        label: 'Weekly Reports',
        children: [
          { key: 'q1', label: 'Q1_Financials.pdf' },
          { key: 'q2', label: 'Q2_Financials.pdf' },
        ],
      },
    ],
  },
  {
    key: 'nav4',
    label: 'System',
    icon: Settings,
    children: [
      { key: 'profile', label: 'User Profile' },
      { key: 'security', label: 'Security Logs' },
    ],
  },
  { key: 'link', label: 'Documentation', icon: LinkIcon },
];

const MenuShowcase = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-12 flex justify-center items-start">
      <BlueprintMenu
        items={items}
        defaultSelectedKey="q1"
        defaultOpenKeys={['nav3', 'reports']}
      />
    </div>
  );
};

export default MenuShowcase;
