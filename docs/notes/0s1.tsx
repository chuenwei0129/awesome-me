import { ChevronDown, ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';

// --- Data Structure ---
const DATA_SOURCE = [
  {
    id: 'zhejiang',
    label: 'Zhejiang',
    type: 'PROVINCE', // Metadata for "Engineering" look
    children: [
      {
        id: 'hangzhou',
        label: 'Hangzhou',
        type: 'CITY',
        children: [
          { id: 'west_lake', label: 'West Lake', type: 'DISTRICT' },
          { id: 'binjiang', label: 'Binjiang', type: 'DISTRICT' },
        ],
      },
      {
        id: 'ningbo',
        label: 'Ningbo',
        type: 'CITY',
        children: [{ id: 'haishu', label: 'Haishu', type: 'DISTRICT' }],
      },
    ],
  },
  {
    id: 'jiangsu',
    label: 'Jiangsu',
    type: 'PROVINCE',
    children: [
      {
        id: 'nanjing',
        label: 'Nanjing',
        type: 'CITY',
        children: [{ id: 'xuanwu', label: 'Xuanwu', type: 'DISTRICT' }],
      },
    ],
  },
];

const BlueprintCascader = () => {
  const [isOpen, setIsOpen] = useState(true); // Default open for demo
  const [selectedPath, setSelectedPath] = useState([]); // Array of full objects
  const [activePath, setActivePath] = useState([]); // For navigation (hover/click) before confirming

  // --- Logic ---

  // Find the list of items to display for a specific column index
  const getColumnData = (columnIndex) => {
    if (columnIndex === 0) return DATA_SOURCE;
    const parentItem = activePath[columnIndex - 1];
    return parentItem && parentItem.children ? parentItem.children : [];
  };

  const handleItemClick = (item, level) => {
    // Slicing ensures we replace the path from this level onwards
    const newPath = [...activePath.slice(0, level), item];
    setActivePath(newPath);

    // If leaf node, select and close (optional logic, usually requires button in specs)
    if (!item.children || item.children.length === 0) {
      setSelectedPath(newPath);
      // setIsOpen(false); // Keep open to show style
    }
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    setSelectedPath([]);
    setActivePath([]);
  };

  const getDisplayValue = () => {
    if (selectedPath.length === 0) return 'UNSELECTED';
    return selectedPath.map((i) => i.label).join(' / ');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans text-slate-900 flex flex-col items-center justify-center">
      {/* --- Diagram Container (The Canvas) --- */}
      <div className="w-full max-w-4xl bg-white border border-slate-300 p-8 relative shadow-none">
        {/* Header / Title Block */}
        <div className="border-b-2 border-slate-900 pb-4 mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">
              Component Spec: Cascader_V1
            </h1>
            <p className="text-slate-500 font-mono text-sm mt-1">
              FIG. 2.1 - HIERARCHICAL SELECTION
            </p>
          </div>
          <div className="font-mono text-xs text-right text-slate-400">
            STATUS: ACTIVE
            <br />
            RENDER: REACT_DOM
          </div>
        </div>

        {/* --- The Component Implementation --- */}
        <div className="relative w-full max-w-xl mx-auto">
          {/* Label Line */}
          <div className="absolute -left-4 top-1/2 -translate-x-full w-12 h-[1px] bg-slate-400 hidden md:block"></div>
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 -translate-x-full font-mono text-xs text-slate-400 hidden md:block">
            INPUT_NODE
          </div>

          {/* Trigger Box */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`
              group relative cursor-pointer bg-white 
              border-2 ${isOpen ? 'border-slate-900' : 'border-slate-300'} 
              h-12 flex items-center px-4 justify-between
              hover:border-slate-900 transition-colors duration-0
            `}
          >
            <span
              className={`font-mono text-sm ${
                selectedPath.length
                  ? 'text-slate-900 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {getDisplayValue()}
            </span>

            <div className="flex items-center gap-2">
              {selectedPath.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="hover:bg-slate-100 p-1 border border-transparent hover:border-slate-300"
                >
                  <X size={14} />
                </button>
              )}
              <div
                className={`border-l border-slate-200 pl-2 ml-1 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Technical Annotation: Width */}
            <div className="absolute -bottom-6 left-0 w-full flex justify-between text-[10px] font-mono text-slate-400 pointer-events-none">
              <span>|</span>
              <span>WIDTH: AUTO</span>
              <span>|</span>
            </div>
          </div>

          {/* Dropdown Panel */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-[1px] w-full bg-white border-2 border-slate-900 z-10 flex shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]">
              {/* Render Columns */}
              {[0, 1, 2].map((colIndex) => {
                const items = getColumnData(colIndex);
                if (
                  items.length === 0 &&
                  colIndex > 0 &&
                  !activePath[colIndex - 1]?.children
                )
                  return null;
                // Always show at least empty state or stop rendering if parent has no children
                if (items.length === 0 && colIndex > 0) return null;

                return (
                  <div
                    key={colIndex}
                    className={`
                      flex-1 min-w-[140px] max-h-[240px] overflow-y-auto
                      ${colIndex !== 0 ? 'border-l border-slate-200' : ''}
                    `}
                  >
                    {/* Column Header (Blueprint Style) */}
                    <div className="sticky top-0 bg-slate-50 border-b border-slate-200 px-3 py-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      LEVEL_{colIndex}
                    </div>

                    {items.length > 0 ? (
                      items.map((item) => {
                        const isActive = activePath[colIndex]?.id === item.id;
                        const isSelectedLeaf =
                          selectedPath[selectedPath.length - 1]?.id === item.id;

                        return (
                          <div
                            key={item.id}
                            onClick={() => handleItemClick(item, colIndex)}
                            className={`
                            group flex items-center justify-between px-3 py-2 cursor-pointer text-sm select-none
                            ${
                              isActive
                                ? 'bg-slate-100 font-bold text-slate-900'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }
                          `}
                          >
                            <span className="flex items-center gap-2">
                              {/* Optional: Icon based on type */}
                              {isActive && (
                                <div className="w-1.5 h-1.5 bg-slate-900"></div>
                              )}
                              {item.label}
                            </span>

                            {item.children && item.children.length > 0 ? (
                              <ChevronRight
                                size={14}
                                className="text-slate-400 group-hover:text-slate-900"
                              />
                            ) : (
                              isSelectedLeaf && (
                                <div className="w-2 h-2 border border-slate-900 bg-slate-900" />
                              )
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 text-xs font-mono text-slate-300 text-center">
                        NO_DATA
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Connector Line Logic (Visual Flair) */}
          {isOpen && (
            <>
              <div className="absolute top-12 left-8 w-[1px] h-4 bg-slate-900"></div>
              <div className="absolute top-12 right-8 w-[1px] h-4 bg-slate-900"></div>
            </>
          )}
        </div>

        {/* Legend / Footer */}
        <div className="mt-24 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 font-mono text-xs text-slate-500">
          <div>
            <span className="inline-block w-3 h-3 bg-slate-100 border border-transparent align-middle mr-2"></span>
            <span className="align-middle">ACTIVE_STATE</span>
          </div>
          <div>
            <span className="inline-block w-3 h-3 border border-slate-900 align-middle mr-2"></span>
            <span className="align-middle">SELECTION_BOUNDARY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintCascader;
