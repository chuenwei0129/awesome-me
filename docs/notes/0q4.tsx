import {
  Box,
  Calendar,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  Link as LinkIcon,
  Mail,
  Settings,
} from 'lucide-react';
import React, { useState } from 'react';

/**
 * Design System: Flat Engineering Blueprint
 * Component: Vertical Menu / Sidebar
 */

// --- Types ---
interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ElementType;
  children?: MenuItem[];
  type?: 'group'; // For grouping without collapse (optional)
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

  // Toggle Submenu
  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  // Handle Selection
  const handleSelect = (key: string) => {
    setSelectedKey(key);
  };

  // Check if a submenu has a selected child (for parent highlighting)
  const hasSelectedChild = (item: MenuItem): boolean => {
    if (item.key === selectedKey) return true;
    return item.children
      ? item.children.some((child) => hasSelectedChild(child))
      : false;
  };

  // Recursive Item Renderer
  const renderItems = (menuItems: MenuItem[], level: number = 0) => {
    return menuItems.map((item) => {
      const isOpen = openKeys.includes(item.key);
      const isSelected = selectedKey === item.key;
      const hasChildren = item.children && item.children.length > 0;

      // Indentation logic: Level 0 = 0px, Level 1+ = handled by border-l padding
      const paddingLeft = level === 0 ? 'px-4' : 'pl-4 pr-4';

      return (
        <div key={item.key} className="w-full font-sans select-none">
          {/* Menu Item Content */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) {
                toggleOpen(item.key);
              } else {
                handleSelect(item.key);
              }
            }}
            className={`
              relative flex items-center justify-between py-3 cursor-pointer
              transition-all duration-150 group
              ${paddingLeft}
              ${
                /* Selected State (Leaf nodes only) */
                isSelected && !hasChildren
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }
              ${
                /* Parent of selected item (Optional visual cue) */
                hasChildren && hasSelectedChild(item) && !isOpen
                  ? 'text-slate-900 font-bold'
                  : ''
              }
            `}
          >
            {/* Left Content: Icon + Label */}
            <div className="flex items-center gap-3 overflow-hidden">
              {/* Selection Marker for Active Item (Left Border) */}
              {isSelected && !hasChildren && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" /> // Using an accent color or keeping it slate-900
              )}

              {item.icon && (
                <item.icon
                  size={16}
                  className={`
                     shrink-0
                     ${
                       isSelected && !hasChildren
                         ? 'text-white'
                         : 'text-slate-400 group-hover:text-slate-900'
                     }
                   `}
                />
              )}
              <span
                className={`text-sm ${
                  level > 0 ? 'font-mono text-xs' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* Right Content: Arrow */}
            {hasChildren && (
              <div className="text-slate-400 group-hover:text-slate-900">
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </div>
            )}
          </div>

          {/* Recursive Children (Submenu) */}
          {hasChildren && isOpen && (
            <div
              className={`
                relative overflow-hidden
                /* Tree Line Logic */
                ml-6 border-l border-slate-300
                animate-in slide-in-from-top-2 duration-200
            `}
            >
              {renderItems(item.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={`w-64 bg-white border-r border-slate-300 h-full flex flex-col ${className}`}
    >
      {/* Optional: Menu Header */}
      <div className="p-4 border-b border-slate-300 mb-2">
        <div className="flex items-center gap-2 text-slate-900">
          <Box size={20} strokeWidth={2} />
          <span className="font-bold tracking-tight uppercase">System Nav</span>
        </div>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-2">{renderItems(items)}</div>
    </div>
  );
};

// --- Demo Data & Layout ---

const items: MenuItem[] = [
  {
    key: 'nav1',
    label: 'Navigation One',
    icon: Mail,
  },
  {
    key: 'nav2',
    label: 'Navigation Two',
    icon: Calendar,
  },
  {
    key: 'nav3',
    label: 'Navigation Two',
    icon: LayoutGrid,
    children: [
      { key: 'opt3', label: 'Option 3' },
      { key: 'opt4', label: 'Option 4' },
      {
        key: 'sub1',
        label: 'Submenu',
        children: [
          { key: 'opt5', label: 'Option 5' },
          { key: 'opt6', label: 'Option 6' },
        ],
      },
    ],
  },
  {
    key: 'nav4',
    label: 'Navigation Three',
    icon: Settings,
    children: [
      { key: 'opt7', label: 'Option 7' },
      { key: 'opt8', label: 'Option 8' },
      { key: 'opt9', label: 'Option 9' },
      { key: 'opt10', label: 'Option 10' },
    ],
  },
  {
    key: 'link',
    label: (
      <a
        href="https://ant.design"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline decoration-slate-400 underline-offset-4"
      >
        Ant Design Ref
      </a>
    ),
    icon: LinkIcon,
  },
];

const MenuShowcase = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-10 flex items-start justify-center font-sans">
      {/* Menu Container */}
      <div className="h-[600px] shadow-none border border-slate-300 flex">
        <BlueprintMenu
          items={items}
          defaultSelectedKey="nav1"
          defaultOpenKeys={['nav3', 'nav4']}
        />

        {/* Right Side Content Placeholder (to show context) */}
        <div className="w-[400px] bg-white p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Dashboard</h1>
          <p className="text-slate-500 text-sm font-mono border-l-2 border-slate-200 pl-4 py-2">
            // CONTENT_AREA
            <br />
            Select a navigation item to view details.
          </p>
          <div className="mt-8 border border-dashed border-slate-300 h-64 w-full flex items-center justify-center text-slate-300">
            EMPTY_STATE
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuShowcase;
