import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import React, { useState } from 'react';

// --- 辅助组件：工程标注线 ---
const DimensionLabel = ({ width, label }: { width: string; label: string }) => (
  <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
    <div className="flex items-end w-full">
      <div className="h-2 border-l border-t border-[#64748b] flex-1"></div>
      <span className="text-[9px] font-mono mx-1 -mb-1.5 text-[#64748b]">
        {label}
      </span>
      <div className="h-2 border-r border-t border-[#64748b] flex-1"></div>
    </div>
    <div className={`h-px bg-[#64748b] ${width}`}></div>
  </div>
);

const Crosshair = ({ className }: { className?: string }) => (
  <div
    className={`absolute w-3 h-3 flex items-center justify-center pointer-events-none ${className}`}
  >
    <div className="w-full h-px bg-[#cbd5e1]"></div>
    <div className="h-full w-px bg-[#cbd5e1] absolute"></div>
  </div>
);

// --- 主组件 ---
export default function BlueprintPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 50;
  const totalPages = 5;

  return (
    // 外层容器：模拟工程图纸背景
    <div className="min-h-screen bg-[#f8fafc] p-12 flex items-center justify-center font-mono text-[#0f172a]">
      {/* 蓝图 Canvas */}
      <div className="relative bg-white border-2 border-[#0f172a] p-1 shadow-none max-w-6xl w-full">
        {/* 角落装饰：十字准星 */}
        <Crosshair className="-top-1.5 -left-1.5" />
        <Crosshair className="-top-1.5 -right-1.5" />
        <Crosshair className="-bottom-1.5 -left-1.5" />
        <Crosshair className="-bottom-1.5 -right-1.5" />

        {/* 顶部元数据栏 */}
        <div className="flex justify-between items-center border-b border-[#0f172a] px-4 py-2 text-[10px] tracking-widest text-[#64748b] bg-[#f1f5f9]">
          <span>COMPONENT: PAGINATION_CTRL</span>
          <span>REF: UI-ENG-02</span>
          <span>SCALE: 1:1</span>
        </div>

        {/* 核心交互区 - 使用网格背景增加工程感 */}
        <div
          className="relative p-8"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* 对齐辅助线 (水平贯穿) */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-[#cbd5e1] -z-10 border-t border-dashed border-[#94a3b8]"></div>

          {/* 控件容器：像一个物理控制盒 */}
          <div className="flex flex-wrap items-stretch border border-[#0f172a] bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            {/* 区域 1: 数据统计 */}
            <div className="flex flex-col justify-center px-4 py-2 border-r border-[#cbd5e1] min-w-[120px]">
              <span className="text-[10px] text-[#64748b] mb-1">
                DATA_COUNT
              </span>
              <div className="text-sm font-bold flex items-baseline gap-1">
                {total}{' '}
                <span className="text-[10px] font-normal text-[#64748b]">
                  ITEMS
                </span>
              </div>
            </div>

            {/* 区域 2: 翻页控制器 */}
            <div className="flex items-center px-4 gap-2 border-r border-[#cbd5e1] bg-[#f8fafc]">
              {/* Prev */}
              <button
                className="w-8 h-8 flex items-center justify-center border border-[#0f172a] hover:bg-[#0f172a] hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
              >
                <ChevronLeft size={14} />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1 px-2 relative">
                {/* 装饰：上方标注 */}
                <div className="absolute -top-5 left-0 w-full flex justify-center">
                  <span className="text-[9px] text-[#64748b] bg-[#f8fafc] px-1">
                    PAGES_ARRAY
                  </span>
                </div>

                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`
                      w-8 h-8 text-sm flex items-center justify-center border transition-all relative group
                      ${
                        p === currentPage
                          ? 'bg-[#0f172a] text-white border-[#0f172a]'
                          : 'bg-white border-[#cbd5e1] hover:border-[#0f172a] text-[#64748b] hover:text-[#0f172a]'
                      }
                    `}
                  >
                    {p}
                    {/* Active Indicator Corner */}
                    {p === currentPage && (
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                className="w-8 h-8 flex items-center justify-center border border-[#0f172a] hover:bg-[#0f172a] hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((c) => Math.min(totalPages, c + 1))
                }
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* 区域 3: 每页数量 (Select) */}
            <div className="flex flex-col justify-center px-4 border-r border-[#cbd5e1] relative group cursor-pointer hover:bg-[#f1f5f9] transition-colors">
              <span className="text-[9px] text-[#64748b] mb-0.5">
                SIZE_CTRL
              </span>
              <div className="flex items-center gap-2 text-sm text-[#0f172a]">
                <span>{pageSize}/PAGE</span>
                <ChevronDown size={12} />
              </div>
              {/* 装饰：选中状态角标 */}
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#0f172a] opacity-0 group-hover:opacity-100"></div>
            </div>

            {/* 区域 4: 跳转 (Input) */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white">
              <span className="text-xs font-bold text-[#0f172a]">JUMP_TO</span>
              <div className="relative">
                <input
                  type="text"
                  className="w-12 h-8 border-b-2 border-[#cbd5e1] text-center bg-transparent focus:border-[#0f172a] focus:outline-none placeholder:text-[#e2e8f0]"
                  placeholder="_"
                />
                <span className="absolute right-0 top-0 text-[8px] text-[#64748b] -mt-2">
                  INT
                </span>
              </div>
              <button className="h-8 w-8 flex items-center justify-center border border-dashed border-[#cbd5e1] hover:border-solid hover:border-[#0f172a] text-[#0f172a]">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* 底部标注区 */}
          <div className="mt-4 flex gap-8">
            <DimensionLabel width="w-32" label="GAP: 120px" />

            {/* 状态指示器 */}
            <div className="flex items-center gap-2 text-[10px] text-[#64748b] border border-dashed border-[#cbd5e1] px-2 py-1">
              <div className="w-1.5 h-1.5 bg-[#22c55e]"></div>
              <span>READY_STATE</span>
            </div>
          </div>
        </div>

        {/* 底部技术信息 */}
        <div className="bg-[#0f172a] text-white p-2 text-[10px] flex justify-between font-mono">
          <div>
            <span className="text-[#64748b] mr-2">COORD:</span>
            X:1024 Y:768
          </div>
          <div className="flex gap-4">
            <span>RENDER_TIME: 0.2ms</span>
            <span>DOM_NODES: 24</span>
          </div>
        </div>
      </div>
    </div>
  );
}
