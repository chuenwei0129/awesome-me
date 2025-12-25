import { Activity, Cpu, Layout, Lock, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

// --- 类型定义 ---
interface TabItem {
  key: string;
  label: string;
  closable: boolean;
  content: React.ReactNode;
  status: 'active' | 'idle' | 'error';
}

// --- 辅助：斜线纹理背景 (Hatched Pattern) ---
// 用于表示未使用的插槽区域
const HatchPattern = () => (
  <div
    className="absolute inset-0 opacity-10 pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(45deg, #0f172a 25%, transparent 25%, transparent 50%, #0f172a 50%, #0f172a 75%, transparent 75%, transparent)',
      backgroundSize: '8px 8px',
    }}
  />
);

export default function EngineeringTabs() {
  // 初始数据：模拟系统核心模块 (不可关闭) 和普通模块
  const initialTabs: TabItem[] = [
    {
      key: 'SYS_CORE',
      label: 'SYSTEM_CORE',
      closable: false,
      status: 'active',
      content: (
        <div className="p-4 text-xs font-mono">
          CORE KERNEL RUNNING... <br />
          UPTIME: 99.9%
        </div>
      ),
    },
    {
      key: 'MOD_01',
      label: 'NET_BRIDGE',
      closable: true,
      status: 'idle',
      content: (
        <div className="p-4 text-xs font-mono text-[#64748b]">
          NETWORK BRIDGE INITIALIZED.
          <br />
          WAITING FOR TRAFFIC.
        </div>
      ),
    },
    {
      key: 'MOD_02',
      label: 'LOG_STREAM',
      closable: true,
      status: 'idle',
      content: <div className="p-4 text-xs font-mono">STREAMING LOGS...</div>,
    },
  ];

  const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
  const [activeKey, setActiveKey] = useState<string>('SYS_CORE');
  const [counter, setCounter] = useState(3); // 用于生成新 ID

  // --- Actions ---

  const handleAdd = () => {
    const newKey = `MOD_0${counter}`;
    const newTab: TabItem = {
      key: newKey,
      label: `MODULE_${counter.toString().padStart(2, '0')}`,
      closable: true, // 新增的默认可关闭
      status: 'idle',
      content: (
        <div className="p-4 flex flex-col items-center justify-center h-40 border border-dashed border-[#cbd5e1] bg-[#f8fafc]">
          <Activity className="mb-2 text-[#94a3b8]" />
          <span className="text-xs font-mono text-[#64748b]">
            NEW MODULE MOUNTED
          </span>
          <span className="text-[10px] font-mono text-[#cbd5e1]">
            ADDR: 0x{Math.floor(Math.random() * 10000).toString(16)}
          </span>
        </div>
      ),
    };
    setTabs([...tabs, newTab]);
    setActiveKey(newKey); // 自动切换到新 Tab
    setCounter((c) => c + 1);
  };

  const handleClose = (e: React.MouseEvent, targetKey: string) => {
    e.stopPropagation(); // 防止触发点击 Tab 切换

    // 1. 找到要删除的索引
    const targetIndex = tabs.findIndex((t) => t.key === targetKey);
    if (targetIndex === -1) return;

    // 2. 计算新的激活 Key (如果删除的是当前激活的 Tab)
    let newActiveKey = activeKey;
    if (activeKey === targetKey) {
      if (targetIndex > 0) {
        newActiveKey = tabs[targetIndex - 1].key;
      } else if (targetIndex < tabs.length - 1) {
        newActiveKey = tabs[targetIndex + 1].key;
      } else {
        newActiveKey = ''; // 删光了
      }
    }

    // 3. 更新状态
    setTabs(tabs.filter((t) => t.key !== targetKey));
    if (newActiveKey !== activeKey) {
      setActiveKey(newActiveKey);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-12 flex items-center justify-center font-mono text-[#0f172a]">
      {/* 组件外壳 */}
      <div className="w-full max-w-4xl flex flex-col bg-white border-2 border-[#0f172a] shadow-[8px_8px_0px_0px_rgba(203,213,225,1)]">
        {/* Header Title */}
        <div className="bg-[#0f172a] text-white px-4 py-2 text-xs flex justify-between items-center tracking-widest">
          <span>DYNAMIC_MODULE_LOADER_V3</span>
          <span>{tabs.length} MODULES ACTIVE</span>
        </div>

        {/* --- Tab Rail (轨道) --- */}
        <div className="relative flex items-end px-2 pt-4 bg-[#f1f5f9] border-b border-[#0f172a] overflow-x-auto">
          {/* 背景纹理：表示空的插槽区域 */}
          <HatchPattern />

          {/* Tab 列表 */}
          {tabs.map((tab) => {
            const isActive = activeKey === tab.key;

            return (
              <div
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                className={`
                  group relative flex flex-col justify-end mr-1 cursor-pointer select-none transition-all
                  ${isActive ? 'z-10' : 'z-0 hover:z-10'}
                `}
                style={{ marginBottom: '-1px' }} // 让 Active Tab 盖住底部分割线
              >
                {/* 物理标签凸起 (Top Tab Shape) */}
                <div
                  className={`
                  h-10 px-4 min-w-[140px] flex items-center justify-between border-t border-x gap-2
                  transition-all duration-150
                  ${
                    isActive
                      ? 'bg-white border-[#0f172a] pb-1' // Active: 白底，与下方连通
                      : 'bg-[#e2e8f0] border-[#cbd5e1] text-[#64748b] hover:bg-[#cbd5e1] hover:text-[#0f172a]'
                  }
                `}
                >
                  {/* Active 顶部高亮线条 */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0f172a]" />
                  )}

                  <div className="flex items-center gap-2 overflow-hidden">
                    {/* 状态指示灯 */}
                    <div
                      className={`w-1.5 h-1.5 shrink-0 ${
                        isActive ? 'bg-[#22c55e]' : 'bg-[#94a3b8]'
                      }`}
                    ></div>
                    <span className="text-xs font-bold truncate">
                      {tab.label}
                    </span>
                  </div>

                  {/* 关闭按钮 或 锁定图标 */}
                  {tab.closable ? (
                    <button
                      onClick={(e) => handleClose(e, tab.key)}
                      className={`
                        w-4 h-4 flex items-center justify-center rounded-none border border-transparent
                        hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-colors
                        ${isActive ? 'text-[#cbd5e1]' : 'text-[#94a3b8]'}
                      `}
                      aria-label="Close Tab"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  ) : (
                    <Lock size={10} className="text-[#cbd5e1] shrink-0" />
                  )}
                </div>

                {/* 底部遮挡条 (用于 Active 状态遮挡边框) */}
                {isActive && <div className="h-[1px] bg-white mx-[1px]"></div>}
              </div>
            );
          })}

          {/* 新增按钮 (插槽) */}
          <button
            onClick={handleAdd}
            className="
              ml-2 mb-2 w-8 h-8 flex items-center justify-center 
              border border-dashed border-[#94a3b8] text-[#94a3b8] bg-transparent
              hover:border-solid hover:border-[#0f172a] hover:text-[#0f172a] hover:bg-white
              transition-all z-0
            "
            title="Mount New Module"
          >
            <Plus size={16} />
          </button>

          {/* 填充剩余空间 */}
          <div className="flex-1"></div>
        </div>

        {/* --- Content Area --- */}
        <div className="relative bg-white min-h-[300px] p-6">
          {tabs.length > 0 ? (
            <div className="h-full">
              {/* 元数据 Header */}
              <div className="flex items-baseline justify-between border-b border-[#cbd5e1] pb-2 mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Layout size={20} />
                  {tabs.find((t) => t.key === activeKey)?.label || 'UNKNOWN'}
                </h2>
                <span className="font-mono text-[10px] text-[#64748b]">
                  ID: {tabs.find((t) => t.key === activeKey)?.key} //{' '}
                  {tabs.find((t) => t.key === activeKey)?.closable
                    ? 'RW'
                    : 'RO'}
                </span>
              </div>

              {/* 渲染内容 */}
              <div className="animate-in fade-in duration-200">
                {tabs.find((t) => t.key === activeKey)?.content}
              </div>
            </div>
          ) : (
            // 空状态 (全部关闭后)
            <div className="h-full flex flex-col items-center justify-center text-[#cbd5e1] min-h-[250px]">
              <Cpu size={48} strokeWidth={1} />
              <span className="mt-4 font-mono text-sm">NO MODULES MOUNTED</span>
              <button
                onClick={handleAdd}
                className="mt-4 px-4 py-2 border border-[#cbd5e1] text-[#0f172a] text-xs hover:bg-[#0f172a] hover:text-white transition-colors"
              >
                INITIALIZE NEW MODULE
              </button>
            </div>
          )}
        </div>

        {/* Footer Status */}
        <div className="bg-[#f1f5f9] border-t border-[#0f172a] p-1 flex justify-end">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1 h-3 ${
                  i <= tabs.length ? 'bg-[#0f172a]' : 'bg-[#cbd5e1]'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
