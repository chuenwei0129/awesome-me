import React, { useState } from 'react';
import { 
  Mail, 
  Calendar, 
  LayoutGrid, 
  Settings, 
  Link as LinkIcon, 
  PlusSquare, 
  MinusSquare,
  CornerDownRight,
  FileText,
  Folder,
  FolderOpen,
  Hash
} from 'lucide-react';

/**
 * Design System: Flat Engineering Blueprint (Hardcore Mode)
 * ---------------------------------------------------------
 * Visual Style: CAD Object Browser / IDE Tree View
 * - Connectors: Explicit 'L' shaped lines connecting parents to children.
 * - Typography: JetBrains Mono for everything deep in the tree.
 * - Interaction: High contrast, inverse colors for selection.
 */

// --- Types ---
interface MenuItem {
  key: string;
  label: string; // Plain string for technical rendering
  icon?: React.ElementType;
  children?: MenuItem[];
  badge?: string; // e.g. "ERR", "12", "NEW"
}

interface BlueprintMenuProps {
  items: MenuItem[];
  defaultSelectedKey?: string;
  defaultOpenKeys?: string[];
  className?: string;
}

// --- Recursive Tree Item Component ---
const TreeItem: React.FC<{
  item: MenuItem;
  level: number;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (key: string) => void;
  onSelect: (key: string) => void;
  isLast: boolean; // To handle connector line ending
  parentLines: boolean[]; // Array tracking which levels need vertical lines
}> = ({ item, level, isOpen, isSelected, onToggle, onSelect, isLast, parentLines }) => {
  
  const hasChildren = item.children && item.children.length > 0;
  
  // Icon Logic: Dynamic folder state or custom icon
  const Icon = item.icon || (hasChildren ? (isOpen ? FolderOpen : Folder) : FileText);

  return (
    <div className="relative font-sans text-sm">
      {/* 
        ROW RENDERER 
        - h-10: Fixed height for grid alignment
        - border-b: Spreadsheet feel
      */}
      <div 
        className={`
          relative flex items-center h-10 w-full pr-4
          border-b border-slate-200 
          transition-colors duration-75
          ${isSelected ? 'bg-slate-900' : 'hover:bg-slate-50 bg-white'}
        `}
        onClick={(e) => {
          e.stopPropagation();
          if (hasChildren) onToggle(item.key);
          else onSelect(item.key);
        }}
      >
        {/* 
           INDENTATION & GUIDELINES GENERATOR 
           We draw vertical lines for parent levels to create the "Tree" look.
        */}
        <div className="flex shrink-0 h-full select-none" style={{ width: `${level * 24}px` }}>
          {parentLines.map((needsLine, idx) => (
            <div 
              key={idx} 
              className={`w-6 h-full flex justify-center ${needsLine ? 'border-r border-slate-300' : ''}`} 
            />
          ))}
        </div>

        {/* 
           CONNECTOR NODE (The "L" or "T" shape junction)
           Only for level > 0
        */}
        {level > 0 && (
          <div className="w-6 h-full flex items-center justify-center relative shrink-0">
             {/* Horizontal Line to text */}
             <div className={`absolute w-3 h-[1px] bg-slate-400 right-0 ${isSelected ? 'opacity-20' : ''}`} />
             {/* Vertical Line fix for current node */}
             <div className="absolute w-[1px] h-full bg-slate-300 left-[-1px] -ml-[1px]" />
             {/* Corner Node */}
             <div className={`w-1.5 h-1.5 border border-slate-400 bg-white z-10 ${isSelected ? 'bg-slate-900 border-white' : ''}`} />
          </div>
        )}

        {/* 
           CONTENT AREA 
        */}
        <div className={`
           flex items-center gap-2 flex-1 pl-2 truncate
           ${isSelected ? 'text-white' : 'text-slate-700'}
        `}>
          {/* Toggle Button for Groups */}
          {hasChildren ? (
             <button 
                className={`z-20 hover:text-blue-500 ${isSelected ? 'text-white' : 'text-slate-400'}`}
                onClick={(e) => { e.stopPropagation(); onToggle(item.key); }}
             >
                {isOpen ? <MinusSquare size={14} /> : <PlusSquare size={14} />}
             </button>
          ) : (
             /* Spacer for leaf nodes to align text */
             <div className="w-[14px]" /> 
          )}

          {/* Main Icon */}
          <Icon size={16} strokeWidth={1.5} className={isSelected ? 'text-slate-300' : 'text-slate-500'} />
          
          {/* Text Label */}
          <span className={`
            ${level === 0 ? 'font-bold uppercase tracking-tight' : 'font-mono text-xs'}
            ${isSelected ? 'text-white' : ''}
          `}>
            {item.label}
          </span>
          
          {/* Technical Badge (Right Aligned) */}
          {item.badge && !hasChildren && (
             <span className={`
                ml-auto text-[10px] font-mono px-1 border
                ${isSelected ? 'border-white text-white' : 'border-slate-300 text-slate-500'}
             `}>
                {item.badge}
             </span>
          )}
        </div>
        
        {/* Active Indicator Strip (Right Side) */}
        {isSelected && <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500" />}
      </div>

      {/* RECURSION */}
      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child, index) => (
            <TreeItem
              key={child.key}
              item={child}
              level={level + 1}
              isOpen={isOpen} // Pass down logic if needed, usually managed by parent state
              // In this recursive model, we need to pass the global state down or check logic
              // For simplicity in this demo, we rely on the parent wrapper logic, 
              // but here we are inside the component. 
              // *Correction*: We need to pass the global props down.
              // Ideally, this component should just render based on props.
              // Let's assume the wrapper handles the `isOpen` logic for *this* level's children.
              // Wait, `isOpen` passed here is for the CURRENT item.
              // We need to check if CHILD is open.
              
              // Refactoring slightly for the recursive call below in the main component
              // to avoid prop drilling hell, but for this structure:
              isOpen={false} // This will be overridden by the main loop logic
              isSelected={false} // Overridden
              onToggle={onToggle}
              onSelect={onSelect}
              isLast={index === item.children!.length - 1}
              parentLines={[...parentLines, !isLast]} // Track vertical lines
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Controller Component ---
const BlueprintMenu: React.FC<BlueprintMenuProps> = ({ 
  items, 
  defaultSelectedKey = '', 
  defaultOpenKeys = [],
  className = '' 
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const toggleOpen = (key: string) => {
    setOpenKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // Helper to render recursively
  const renderTree = (
    nodes: MenuItem[], 
    level: number, 
    parentLines: boolean[] // array of booleans: true if a vertical line should be drawn at that depth index
  ) => {
    return nodes.map((node, index) => {
      const isLast = index === nodes.length - 1;
      const isOpen = openKeys.includes(node.key);
      const isSelected = selectedKey === node.key;
      const hasChildren = node.children && node.children.length > 0;

      // Icon Resolution
      const Icon = node.icon || (hasChildren ? (isOpen ? FolderOpen : Folder) : FileText);

      return (
        <div key={node.key} className="select-none">
           {/* ROW */}
           <div 
            className={`
              group relative flex items-center h-11 w-full pr-4 border-b border-slate-200
              ${isSelected ? 'bg-slate-900' : 'bg-white hover:bg-slate-50'}
              cursor-pointer
            `}
            onClick={(e) => {
               e.stopPropagation();
               if (hasChildren) toggleOpen(node.key);
               else setSelectedKey(node.key);
            }}
           >
              {/* Vertical Guide Lines for Parents */}
              {parentLines.map((lineActive, idx) => (
                 <div key={idx} className={`h-full w-8 shrink-0 flex justify-center ${lineActive ? 'border-r border-slate-300' : ''}`} />
              ))}

              {/* Current Level Connector */}
              {level > 0 && (
                 <div className="relative h-full w-8 shrink-0 flex items-center justify-center">
                    {/* Vertical line segment connecting to previous sibling */}
                    <div className="absolute left-[31px] top-0 h-full w-[1px] bg-slate-300" 
                         style={{ display: isLast ? 'none' : 'block' }} // Hide full vertical if last, but need partial?
                    /> 
                    {/* L-Shape Logic for Last Item */}
                    {isLast && <div className="absolute left-[31px] top-0 h-1/2 w-[1px] bg-slate-300" />}
                    {!isLast && <div className="absolute left-[31px] top-0 h-full w-[1px] bg-slate-300" />}

                    {/* Horizontal Connector */}
                    <div className="absolute left-[31px] top-1/2 w-4 h-[1px] bg-slate-300" />
                    
                    {/* Node Dot */}
                    <div className={`relative z-10 w-1.5 h-1.5 border border-slate-400 bg-white ${isSelected ? 'border-white bg-slate-900' : ''}`} />
                 </div>
              )}

              {/* Level 0 Indent Adjustment */}
              {level === 0 && <div className="w-4 shrink-0" />}

              {/* Content */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                 {/* Expand/Collapse Icon */}
                 {hasChildren ? (
                    <button onClick={(e) => { e.stopPropagation(); toggleOpen(node.key); }}>
                       {isOpen 
                         ? <MinusSquare size={14} className={isSelected ? 'text-slate-400' : 'text-slate-500'} /> 
                         : <PlusSquare size={14} className={isSelected ? 'text-slate-400' : 'text-slate-500'} />
                       }
                    </button>
                 ) : (
                    <div className="w-3.5" /> // Spacer
                 )}

                 {/* Main Icon */}
                 {node.icon && (
                    <node.icon size={16} className={isSelected ? 'text-white' : 'text-slate-500'} />
                 )}
                 
                 {/* Label */}
                 <span className={`
                    truncate
                    ${level === 0 ? 'font-bold text-sm tracking-wide uppercase' : 'font-mono text-xs'}
                    ${isSelected ? 'text-white' : 'text-slate-700'}
                 `}>
                    {node.label}
                 </span>
              </div>
              
              {/* Right Side Meta */}
              {node.badge && (
                  <div className={`
                    text-[9px] font-mono px-1.5 border ml-2
                    ${isSelected ? 'border-slate-600 text-slate-400' : 'border-slate-200 text-slate-400'}
                  `}>
                    {node.badge}
                  </div>
              )}

              {/* Selection Marker */}
              {isSelected && !hasChildren && (
                 <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-slate-400" />
              )}
           </div>

           {/* Recursive Render */}
           {hasChildren && isOpen && (
              <div className="animate-in slide-in-from-top-1 duration-100">
                 {renderTree(node.children!, level + 1, [...parentLines, !isLast])}
              </div>
           )}
        </div>
      );
    });
  };

  return (
    <div className={`w-72 bg-[#f8fafc] border border-slate-300 shadow-sm flex flex-col h-full ${className}`}>
       {/* Engineering Header */}
       <div className="h-12 border-b-2 border-slate-900 bg-white flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-2">
             <Hash size={16} className="text-slate-900" />
             <span className="font-bold text-slate-900 tracking-tighter">NAV_SYSTEM</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">V.2.0.4</span>
       </div>

       {/* Scroll Area */}
       <div className="flex-1 overflow-y-auto bg-[linear-gradient(rgba(203,213,225,0.1)_1px,transparent_1px)] bg-[size:100%_44px]">
          {renderTree(items, 0, [])}
       </div>
       
       {/* Footer Status */}
       <div className="h-8 border-t border-slate-300 bg-slate-100 flex items-center px-4 justify-between shrink-0">
           <span className="text-[10px] font-mono text-slate-500 uppercase">Status: Online</span>
           <div className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
       </div>
    </div>
  );
};

// --- Demo Data & Layout ---

const items: MenuItem[] = [
  {
    key: 'nav1',
    label: 'Navigation One',
    icon: Mail,
    badge: 'MSG'
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
      { key: 'opt4', label: 'Option 4', badge: 'UPD' },
      { 
        key: 'sub1', 
        label: 'Submenu', 
        children: [
            { key: 'opt5', label: 'Option 5' },
            { key: 'opt6', label: 'Option 6' },
        ]
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
    label: 'Ant Design Ref',
    icon: LinkIcon,
    badge: 'EXT'
  },
];

const MenuShowcase = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-12 flex justify-center items-start font-sans">
        <BlueprintMenu 
            items={items} 
            defaultSelectedKey="opt4"
            defaultOpenKeys={['nav3', 'nav4']}
        />
        
        {/* Context Visual */}
        <div className="ml-8 w-96 hidden md:block opacity-50">
           <div className="border border-slate-300 p-4 bg-white mb-4">
              <h3 className="text-xs font-mono uppercase border-b border-slate-200 pb-2 mb-2">Component Notes</h3>
              <p className="text-xs text-slate-600 mb-2">
                 > Hierarchical visual structure enforced via explicit vertical grid lines.
              </p>
              <p className="text-xs text-slate-600">
                 > Selection state uses high-contrast inversion (Slate-900) instead of brand colors.
              </p>
           </div>
        </div>
    </div>
  );
};

export default MenuShowcase;
