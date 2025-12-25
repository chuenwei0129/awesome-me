import {
  Check,
  ChevronDown,
  Command,
  FileText,
  LogOut,
  MoreVertical,
  Settings,
  Trash2,
  User,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

/**
 * Design System: Flat Engineering Blueprint
 * Component: Dropdown / Context Menu
 */

// --- Types ---
interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  shortcut?: string; // e.g., "⌘K"
  disabled?: boolean;
  variant?: 'default' | 'danger';
  onClick?: () => void;
  checked?: boolean; // For selection mode
}

interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

interface BlueprintDropdownProps {
  trigger: React.ReactNode;
  sections: DropdownSection[];
  align?: 'left' | 'right';
  width?: string;
}

// --- Helper Hook: Click Outside ---
function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// --- Component ---
const BlueprintDropdown: React.FC<BlueprintDropdownProps> = ({
  trigger,
  sections,
  align = 'left',
  width = 'w-56',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div
      className="relative inline-block text-left font-sans"
      ref={containerRef}
    >
      {/* Trigger Area */}
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`
            absolute top-full mt-[-1px] z-50 bg-white 
            border-2 border-slate-900 
            ${width}
            ${align === 'right' ? 'right-0' : 'left-0'}
            animate-in fade-in zoom-in-95 duration-100 ease-out origin-top
          `}
        >
          {/* Engineering "Connector" Visual (Optional aesthetic detail) */}
          <div className="absolute top-0 left-0 w-2 h-0.5 bg-slate-900 -mt-0.5" />
          <div className="absolute top-0 right-0 w-2 h-0.5 bg-slate-900 -mt-0.5" />

          {sections.map((section, sectionIdx) => (
            <div
              key={sectionIdx}
              className={sectionIdx > 0 ? 'border-t border-slate-200' : ''}
            >
              {/* Section Title (Tiny Blueprint Label) */}
              {section.title && (
                <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                    {section.title}
                  </span>
                </div>
              )}

              {/* Items */}
              <div className="py-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.disabled) return;
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    disabled={item.disabled}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-sm group
                      transition-colors duration-150
                      ${
                        item.disabled
                          ? 'opacity-50 cursor-not-allowed bg-slate-50'
                          : 'hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                      }
                      ${
                        item.variant === 'danger'
                          ? 'hover:bg-red-50 hover:text-red-600'
                          : 'text-slate-600'
                      }
                    `}
                  >
                    {/* Left Content: Icon + Label */}
                    <div className="flex items-center gap-3">
                      {/* Checkmark slot for selection items */}
                      {item.checked !== undefined && (
                        <div
                          className={`
                          w-3 h-3 border flex items-center justify-center
                          ${
                            item.checked
                              ? 'border-slate-900 bg-slate-900'
                              : 'border-slate-300'
                          }
                        `}
                        >
                          {item.checked && (
                            <Check size={10} className="text-white" />
                          )}
                        </div>
                      )}

                      {/* Regular Icon */}
                      {item.icon && !item.checked && (
                        <item.icon
                          size={14}
                          className={`
                            ${
                              item.variant === 'danger'
                                ? 'text-red-500'
                                : 'text-slate-400 group-hover:text-slate-900'
                            }
                          `}
                        />
                      )}

                      <span className="font-medium">{item.label}</span>
                    </div>

                    {/* Right Content: Shortcut */}
                    {item.shortcut && (
                      <span className="text-xs font-mono text-slate-400 ml-4 group-hover:text-slate-600">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- SHOWCASE DEMO ---

const DropdownShowcase = () => {
  const [selectedSort, setSelectedSort] = useState('newest');

  // Trigger Style 1: The "Select Box"
  const SelectTrigger = (
    <button
      className="
      group flex items-center justify-between gap-3 min-w-[160px]
      bg-white border border-slate-300 px-3 py-2
      hover:border-slate-900 active:bg-slate-50 transition-all
    "
    >
      <span className="text-sm font-medium text-slate-700">
        Display Options
      </span>
      <ChevronDown
        size={14}
        className="text-slate-400 group-hover:text-slate-900 transition-colors"
      />
    </button>
  );

  // Trigger Style 2: The "Icon Button"
  const IconTrigger = (
    <button
      className="
      w-9 h-9 flex items-center justify-center
      border border-transparent hover:border-slate-300 hover:bg-white
      transition-all
    "
    >
      <MoreVertical size={16} className="text-slate-600" />
    </button>
  );

  // Trigger Style 3: The "User Profile"
  const UserTrigger = (
    <button className="flex items-center gap-3 px-3 py-1.5 border border-slate-200 hover:border-slate-900 bg-white transition-colors">
      <div className="w-6 h-6 bg-slate-100 border border-slate-300 flex items-center justify-center">
        <User size={14} className="text-slate-500" />
      </div>
      <div className="text-left">
        <div className="text-xs font-bold text-slate-900 leading-tight">
          ENGINEER_01
        </div>
        <div className="text-[10px] text-slate-500 font-mono leading-tight">
          ADMIN
        </div>
      </div>
      <ChevronDown size={12} className="text-slate-400 ml-1" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10 font-sans flex flex-col gap-12 items-start">
      {/* Scenario 1: Feature Selection */}
      <div>
        <h3 className="text-xs font-mono uppercase text-slate-500 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-slate-900" />
          01. Standard Select
        </h3>
        <BlueprintDropdown
          trigger={SelectTrigger}
          sections={[
            {
              title: 'Sort Order',
              items: [
                {
                  id: '1',
                  label: 'Newest First',
                  checked: selectedSort === 'newest',
                  onClick: () => setSelectedSort('newest'),
                },
                {
                  id: '2',
                  label: 'Oldest First',
                  checked: selectedSort === 'oldest',
                  onClick: () => setSelectedSort('oldest'),
                },
                {
                  id: '3',
                  label: 'Alphabetical',
                  checked: selectedSort === 'alpha',
                  onClick: () => setSelectedSort('alpha'),
                },
              ],
            },
            {
              items: [
                {
                  id: '4',
                  label: 'Show Deleted',
                  icon: Trash2,
                  shortcut: 'ALT+D',
                },
              ],
            },
          ]}
        />
      </div>

      {/* Scenario 2: Context Menu (Right Aligned) */}
      <div className="pl-20">
        {' '}
        {/* Indent to test alignment */}
        <h3 className="text-xs font-mono uppercase text-slate-500 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 border border-slate-900" />
          02. Context Menu (Icon Trigger)
        </h3>
        <div className="flex items-center gap-4 bg-white border border-slate-300 p-2 w-[300px] justify-between">
          <span className="text-sm font-mono text-slate-600">
            FILE_CONFIG.JSON
          </span>

          <BlueprintDropdown
            align="right"
            width="w-48"
            trigger={IconTrigger}
            sections={[
              {
                items: [
                  {
                    id: 'edit',
                    label: 'Edit File',
                    icon: FileText,
                    shortcut: 'E',
                  },
                  {
                    id: 'dup',
                    label: 'Duplicate',
                    icon: Command,
                    shortcut: '⌘D',
                  },
                ],
              },
              {
                items: [
                  {
                    id: 'del',
                    label: 'Delete Asset',
                    icon: Trash2,
                    variant: 'danger',
                    shortcut: 'DEL',
                  },
                ],
              },
            ]}
          />
        </div>
      </div>

      {/* Scenario 3: User Menu */}
      <div>
        <h3 className="text-xs font-mono uppercase text-slate-500 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-slate-300" />
          03. User Navigation
        </h3>
        <BlueprintDropdown
          trigger={UserTrigger}
          width="w-64"
          sections={[
            {
              title: 'Account',
              items: [
                { id: 'p', label: 'Profile Settings', icon: Settings },
                { id: 'b', label: 'Billing & Usage', icon: FileText },
              ],
            },
            {
              items: [
                { id: 'l', label: 'Log Out', icon: LogOut, shortcut: '⇧Q' },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DropdownShowcase;
