import {
  Box,
  Check,
  ChevronDown,
  Command,
  FileText,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

/**
 * Design System: Flat Engineering Blueprint
 * Component: Dropdown / Context Menu
 *
 * Update Log:
 * - Fixed border overlapping issue by adding vertical spacing (mt-2).
 * - Added a visual "Circuit Line" connector to link trigger and menu.
 * - Removed hacky border patches for a cleaner render.
 */

// --- Types ---
interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  shortcut?: string;
  disabled?: boolean;
  variant?: 'default' | 'danger';
  onClick?: () => void;
  checked?: boolean;
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

// --- Helper Hook ---
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
  width = 'w-60',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div
      className="relative inline-block text-left font-sans"
      ref={containerRef}
    >
      {/* Trigger Wrapper */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10" // Ensure trigger stays strictly in its layer
      >
        {trigger}
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`
            absolute top-full mt-2 z-50 bg-white 
            border-2 border-slate-900 
            ${width}
            ${align === 'right' ? 'right-0' : 'left-0'}
            animate-in fade-in slide-in-from-top-2 duration-150 ease-out
          `}
        >
          {/* 
             Visual Connector: 
             A small vertical line connecting the button center to the menu.
             Adjusted based on alignment.
          */}
          <div
            className={`
             absolute -top-2 w-[1px] h-2 bg-slate-900
             ${align === 'right' ? 'right-4' : 'left-4'}
          `}
          ></div>

          {sections.map((section, sectionIdx) => (
            <div
              key={sectionIdx}
              className={sectionIdx > 0 ? 'border-t border-slate-200' : ''}
            >
              {/* Section Header */}
              {section.title && (
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-400 rounded-none" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                    {section.title}
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="p-1">
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
                      relative w-full flex items-center justify-between px-3 py-2 text-sm group
                      border border-transparent
                      transition-all duration-100
                      ${
                        item.disabled
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-slate-100 hover:border-slate-200 cursor-pointer'
                      }
                      ${
                        item.variant === 'danger'
                          ? 'hover:bg-red-50 hover:border-red-100'
                          : ''
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Selection Box State */}
                      <div
                        className={`
                        w-3.5 h-3.5 border flex items-center justify-center transition-colors
                        ${
                          item.checked
                            ? 'border-slate-900 bg-slate-900'
                            : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }
                      `}
                      >
                        {item.checked && (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>

                      <div
                        className={`
                        font-medium flex items-center gap-2
                        ${
                          item.variant === 'danger'
                            ? 'text-red-600'
                            : 'text-slate-700'
                        }
                      `}
                      >
                        {item.icon && (
                          <item.icon
                            size={14}
                            className={
                              item.variant === 'danger'
                                ? 'text-red-500'
                                : 'text-slate-400'
                            }
                          />
                        )}
                        {item.label}
                      </div>
                    </div>

                    {/* Shortcut Label */}
                    {item.shortcut && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1 border border-slate-200">
                        {item.shortcut}
                      </span>
                    )}

                    {/* Hover Decoration (Corner Tick) */}
                    {!item.disabled && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[4px] border-r-[4px] border-transparent group-hover:border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
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

// --- DEMO USAGE ---

const DropdownShowcase = () => {
  const [selectedSort, setSelectedSort] = useState('newest');

  // Helper to create a consistent Trigger Button style
  const BlueprintButton = ({ children, icon: Icon, active }: any) => (
    <button
      className={`
      flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-all
      ${
        active
          ? 'bg-slate-100 border-slate-900 text-slate-900 shadow-none'
          : 'bg-white border-slate-300 text-slate-600 hover:border-slate-500 hover:text-slate-900'
      }
    `}
    >
      {Icon && <Icon size={16} />}
      {children}
      <ChevronDown
        size={14}
        className={`ml-1 transition-transform ${active ? 'rotate-180' : ''}`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-12 font-sans flex flex-col gap-16 items-start">
      {/* 1. Left Aligned Standard */}
      <div>
        <h3 className="text-xs font-mono uppercase text-slate-400 mb-4">
          01. Standard Filter
        </h3>
        <BlueprintDropdown
          trigger={<BlueprintButton icon={Box}>Filter View</BlueprintButton>}
          sections={[
            {
              title: 'Sort By',
              items: [
                {
                  id: 'new',
                  label: 'Newest First',
                  checked: selectedSort === 'newest',
                  onClick: () => setSelectedSort('newest'),
                },
                {
                  id: 'old',
                  label: 'Oldest First',
                  checked: selectedSort === 'oldest',
                  onClick: () => setSelectedSort('oldest'),
                },
              ],
            },
            {
              items: [
                {
                  id: 'save',
                  label: 'Save View',
                  icon: FileText,
                  shortcut: '⌘S',
                },
              ],
            },
          ]}
        />
      </div>

      {/* 2. Right Aligned Context Menu */}
      <div className="pl-12">
        <h3 className="text-xs font-mono uppercase text-slate-400 mb-4">
          02. Action Menu (Right)
        </h3>
        <div className="w-[300px] border border-dashed border-slate-300 p-4 flex justify-between items-center bg-white">
          <span className="text-sm font-mono text-slate-500">
            PROJECT_ALPHA_V1.pdf
          </span>

          <BlueprintDropdown
            align="right"
            width="w-48"
            trigger={
              <button className="p-1 hover:bg-slate-100 border border-transparent hover:border-slate-200">
                <MoreVertical size={18} className="text-slate-600" />
              </button>
            }
            sections={[
              {
                items: [
                  { id: 'dl', label: 'Download', icon: FileText },
                  { id: 'ren', label: 'Rename', icon: Command, shortcut: 'F2' },
                ],
              },
              {
                items: [
                  {
                    id: 'del',
                    label: 'Delete',
                    icon: Trash2,
                    variant: 'danger',
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownShowcase;
