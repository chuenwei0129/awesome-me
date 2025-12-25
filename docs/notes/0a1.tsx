import {
  Activity,
  CornerDownRight,
  Cpu,
  Database,
  HardDrive,
  Settings,
  Terminal,
} from 'lucide-react';
import React, { useState } from 'react';

// --- 辅助组件 ---
const Crosshair = ({ className }: { className?: string }) => (
  <div
    className={`absolute w-3 h-3 flex items-center justify-center pointer-events-none ${className}`}
  >
    <div className="w-full h-px bg-[#cbd5e1]"></div>
    <div className="h-full w-px bg-[#cbd5e1] absolute"></div>
  </div>
);

const Ruler = () => (
  <div className="flex justify-between w-full overflow-hidden opacity-30 select-none pointer-events-none">
    {Array.from({ length: 40 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-1 w-4">
        <div
          className={`w-px bg-[#0f172a] ${i % 5 === 0 ? 'h-2' : 'h-1'}`}
        ></div>
      </div>
    ))}
  </div>
);

// --- 模拟内容 ---
const TabContentRenderer = ({ type }: { type: string }) => {
  if (type === 'terminal') {
    return (
      <div className="font-mono text-xs text-[#64748b]">
        <div className="flex gap-2">
          <span className="text-[#0f172a]">$</span> npm run build:eng-ui
        </div>
        <div className="pl-4 text-[#22c55e]">
          ✓ Compiled successfully in 420ms
        </div>
        <div className="pl-4"> Asset Size Chunks Chunk Names</div>
        <div className="pl-4"> main.js 10KiB [emitted] main</div>
        <div className="flex gap-2 mt-2">
          <span className="text-[#0f172a]">$</span> _
        </div>
      </div>
    );
  }
  if (type === 'database') {
    return (
      <div className="w-full border border-[#cbd5e1] text-xs font-mono">
        <div className="grid grid-cols-3 bg-[#f1f5f9] border-b border-[#cbd5e1] p-2 font-bold text-[#0f172a]">
          <div>ID</div>
          <div>TIMESTAMP</div>
          <div>STATUS</div>
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid grid-cols-3 p-2 border-b border-[#cbd5e1] last:border-0 text-[#64748b]"
          >
            <div>UID_{1000 + i}</div>
            <div>2023-10-24 10:{20 + i}:00</div>
            <div>READY</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-full min-h-[100px] border border-dashed border-[#cbd5e1] bg-[#f8fafc]">
      <span className="text-xs font-mono text-[#94a3b8] uppercase">
        No Signal Input
      </span>
    </div>
  );
};

// --- 主组件 ---
export default function BlueprintTabs() {
  const [activeTab, setActiveTab] = useState('sys');

  const tabs = [
    {
      id: 'sys',
      label: 'SYSTEM_MON',
      icon: Activity,
      type: 'chart',
      meta: 'REFRESH: 5s',
    },
    {
      id: 'term',
      label: 'CONSOLE_LOG',
      icon: Terminal,
      type: 'terminal',
      meta: 'TTY: /dev/ttys001',
    },
    {
      id: 'data',
      label: 'DATA_STORE',
      icon: Database,
      type: 'database',
      meta: 'CONN: ESTABLISHED',
    },
    {
      id: 'conf',
      label: 'CONFIG_SET',
      icon: Settings,
      type: 'form',
      meta: 'READ_ONLY',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-12 flex items-center justify-center font-mono text-[#0f172a]">
      {/* 外部框体：机械外壳 */}
      <div className="relative w-full max-w-4xl flex flex-col gap-0">
        {/* 顶部标尺装饰 */}
        <div className="border-x border-t border-[#cbd5e1] bg-white h-6 flex items-end px-2">
          <Ruler />
        </div>

        {/* --- TABS HEADER RAIL --- */}
        <div className="flex items-end pl-4 pr-12 border-x border-[#cbd5e1] bg-[#f1f5f9] relative">
          {/* 背景导轨线 */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-[#0f172a] z-0"></div>

          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative z-10 group
                  flex flex-col items-start
                  pt-2 pb-0 px-0 mr-1
                  transition-all duration-200 ease-out
                  focus:outline-none
                `}
              >
                {/* Tab 上方的技术标签 */}
                <div
                  className={`
                  text-[9px] px-2 mb-1 transition-colors
                  ${
                    isActive
                      ? 'text-[#0f172a] font-bold'
                      : 'text-[#94a3b8] group-hover:text-[#64748b]'
                  }
                `}
                >
                  0{index + 1} // {tab.id.toUpperCase()}
                </div>

                {/* Tab 主体形状 */}
                <div
                  className={`
                  relative flex items-center gap-3 px-6 h-12 border-t border-x
                  transition-all
                  ${
                    isActive
                      ? 'bg-white border-[#0f172a] border-b-white translate-y-[1px]' // Active: 遮住底部线条
                      : 'bg-[#e2e8f0] border-[#cbd5e1] border-b-[#0f172a] hover:bg-[#cbd5e1] hover:text-[#0f172a] text-[#64748b]'
                  }
                `}
                >
                  {/* 顶部高亮条 (仅 Active 显示) */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#0f172a]"></div>
                  )}

                  <Icon size={16} strokeWidth={1.5} />
                  <span className="text-sm tracking-tight font-bold">
                    {tab.label}
                  </span>

                  {/* 状态灯 */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-[#ef4444] animate-pulse' : 'bg-[#94a3b8]'
                    }`}
                  ></div>
                </div>
              </button>
            );
          })}

          {/* 右侧剩余空间的填充与装饰 */}
          <div className="flex-1 h-12 border-b border-[#0f172a] flex items-center justify-end px-4 gap-4">
            <span className="text-[9px] text-[#64748b]">MODE: ENGINEERING</span>
            <span className="text-[9px] text-[#64748b]">V.2.4.0</span>
          </div>
        </div>

        {/* --- MAIN CONTENT PANEL --- */}
        <div className="relative bg-white border-x border-b border-[#0f172a] min-h-[400px] p-1">
          {/* 装饰：角落标记 */}
          <Crosshair className="top-2 left-2" />
          <Crosshair className="top-2 right-2" />
          <Crosshair className="bottom-2 left-2" />
          <Crosshair className="bottom-2 right-2" />

          {/* 内部容器 */}
          <div className="h-full border border-[#cbd5e1] p-6 relative overflow-hidden">
            {/* 背景网格 */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            ></div>

            {/* 内容 Header (显示当前 Tab 的元数据) */}
            <div className="flex justify-between items-start mb-6 border-b border-dashed border-[#cbd5e1] pb-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CornerDownRight size={20} className="text-[#64748b]" />
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <div className="text-xs text-[#64748b] flex gap-4 mt-1">
                  <span>MODULE_ID: {activeTab.toUpperCase()}_001</span>
                  <span>PRIORITY: HIGH</span>
                </div>
              </div>

              <div className="bg-[#0f172a] text-white text-[10px] px-2 py-1 font-mono">
                {tabs.find((t) => t.id === activeTab)?.meta}
              </div>
            </div>

            {/* 动态内容渲染 */}
            <div className="relative z-10">
              <TabContentRenderer
                type={tabs.find((t) => t.id === activeTab)?.type || 'default'}
              />
            </div>

            {/* 侧边技术参数栏 */}
            <div className="absolute right-4 top-20 bottom-4 w-12 border-l border-[#cbd5e1] flex flex-col items-center py-4 gap-4 text-[9px] text-[#64748b]">
              <div className="rotate-90 whitespace-nowrap origin-center translate-x-2">
                PARAMS
              </div>
              <div className="w-4 h-px bg-[#cbd5e1]"></div>
              <Cpu size={14} />
              <div className="w-4 h-px bg-[#cbd5e1]"></div>
              <HardDrive size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
