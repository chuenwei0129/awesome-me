import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

// 类型定义
interface PaginationProps {
  totalItems: number;
  defaultPageSize?: number;
}

export default function EngineeringPagination({
  totalItems = 50,
  defaultPageSize = 10,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [jumpTo, setJumpTo] = useState('');

  const totalPages = Math.ceil(totalItems / pageSize);

  // 处理页码变更
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 生成页码数组 (简化版逻辑，模拟图片显示 1-5)
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    // DO NOT COPY: Outer container for presentation purpose only (simulating the 'diagram-canvas')
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans text-[#0f172a] flex items-center justify-center">
      {/* DIAGRAM CANVAS: Structural Container */}
      <div className="w-full max-w-5xl bg-white border border-[#cbd5e1] shadow-none">
        {/* HEADER: Technical Spec Header */}
        <div className="border-b border-[#cbd5e1] p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">
              Pagination Control
            </h1>
            <p className="text-xs font-mono text-[#64748b] mt-1">
              SPEC-UI-002 // REV. 1.0
            </p>
          </div>
          <div className="font-mono text-xs text-[#64748b] text-right">
            STATUS: PRODUCTION
            <br />
            THEME: FLAT_ENG_BLUEPRINT
          </div>
        </div>

        {/* CANVAS CONTENT: The Component Render Area */}
        <div className="p-12 flex flex-col items-center justify-center gap-12 bg-white min-h-[300px]">
          {/* --- COMPONENT START --- */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-sm select-none">
            {/* Total Count Label */}
            <span className="text-[#0f172a] mr-2">
              Total {totalItems} items
            </span>

            {/* Navigation Controls */}
            <div className="flex items-center gap-[-1px]">
              {' '}
              {/* gap-[-1px] to merge borders if needed, but using gap-2 for this style */}
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                  h-8 w-8 flex items-center justify-center border border-[#cbd5e1] transition-all
                  ${
                    currentPage === 1
                      ? 'text-[#cbd5e1] cursor-not-allowed bg-white'
                      : 'text-[#0f172a] hover:bg-[#f8fafc] hover:border-[#0f172a] active:bg-[#0f172a] active:text-white'
                  }
                `}
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              {/* Page Numbers */}
              <div className="flex items-center gap-2 mx-2">
                {renderPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`
                      h-8 w-8 flex items-center justify-center border transition-all
                      ${
                        page === currentPage
                          ? 'bg-[#0f172a] border-[#0f172a] text-white font-bold' // Active: Solid Black Block
                          : 'bg-white border-transparent hover:border-[#cbd5e1] text-[#0f172a]'
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}
              </div>
              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                  h-8 w-8 flex items-center justify-center border border-[#cbd5e1] transition-all
                  ${
                    currentPage === totalPages
                      ? 'text-[#cbd5e1] cursor-not-allowed bg-white'
                      : 'text-[#0f172a] hover:bg-[#f8fafc] hover:border-[#0f172a] active:bg-[#0f172a] active:text-white'
                  }
                `}
                aria-label="Next Page"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Divider (Optional visual separator for engineering look) */}
            <div className="h-4 w-px bg-[#cbd5e1] mx-2 hidden sm:block"></div>

            {/* Page Size Selector */}
            <div className="relative group">
              <div className="flex items-center justify-between h-8 px-3 border border-[#cbd5e1] bg-white text-[#0f172a] cursor-pointer hover:border-[#0f172a] transition-colors min-w-[100px]">
                <span>{pageSize} 条/页</span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className="ml-2 text-[#64748b]"
                />
              </div>
              {/* Dropdown visualization (hidden in static view usually, but structured here) */}
            </div>

            {/* Jump To Input */}
            <div className="flex items-center gap-2 ml-2">
              <span className="text-[#0f172a]">跳至</span>
              <input
                type="text"
                value={jumpTo}
                onChange={(e) => setJumpTo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = parseInt(jumpTo);
                    if (!isNaN(page)) handlePageChange(page);
                    setJumpTo('');
                  }
                }}
                className="h-8 w-12 border border-[#cbd5e1] text-center text-[#0f172a] outline-none focus:border-[#0f172a] focus:ring-0 bg-white placeholder-[#cbd5e1]"
                placeholder=""
              />
              <span className="text-[#0f172a]">页</span>
            </div>
          </div>
          {/* --- COMPONENT END --- */}
        </div>

        {/* FOOTER: Technical Annotations */}
        <div className="border-t border-[#cbd5e1] p-3 bg-[#f8fafc] flex gap-6 font-mono text-[10px] text-[#64748b] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#0f172a]"></span>
            <span>Active State</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 border border-[#cbd5e1] bg-white"></span>
            <span>Interactive</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 border border-[#cbd5e1] bg-transparent text-[#cbd5e1] relative overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center transform -rotate-45 scale-150 border-t border-[#cbd5e1]"></span>
            </span>
            <span>Disabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
