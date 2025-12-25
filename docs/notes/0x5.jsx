import { FileJson, FileText, MessageSquare, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

const BlueprintFloatButton = () => {
  const [isOpen, setIsOpen] = useState(true);

  // 模拟点击操作
  const handleAction = (label) => {
    console.log(`EXECUTE_CMD: ${label}`);
  };

  return (
    <div className="min-h-[400px] bg-[#f8fafc] p-12 relative font-sans flex items-center justify-center border border-dashed border-slate-300">
      {/* 说明文字，非组件部分 */}
      <div className="absolute top-4 left-4 text-xs font-mono text-slate-400">
        // INTERFACE: FLOATING_CONTROL_MOD_V1
      </div>

      {/* --- 组件开始: FLOAT BUTTON GROUP --- */}
      <div className="fixed bottom-12 right-12 flex flex-col items-end gap-4 z-50">
        {/* ACTION MENU (The "Pill" turned into a "Stack") */}
        {/* 只有在 isOpen 为 true 时显示，或者通过 CSS transition 控制显示 */}
        <div
          className={`
                flex flex-col border border-[#cbd5e1] bg-white transition-all duration-200 origin-bottom
                ${
                  isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                }
            `}
        >
          {/* 装饰性：连接线/数据端口标记 */}
          <div className="absolute -left-1 top-2 w-1 h-1 bg-[#0f172a]" />
          <div className="absolute -left-1 bottom-2 w-1 h-1 bg-[#0f172a]" />

          {/* Action Item 1: Document */}
          <button
            onClick={() => handleAction('NEW_DOC')}
            className="group relative p-4 flex items-center justify-center border-b border-[#cbd5e1] hover:bg-[#f1f5f9] transition-colors"
            title="Create Document"
          >
            <FileText className="w-5 h-5 text-[#0f172a]" strokeWidth={1.5} />
            {/* Tooltip Label (Engineering Style) */}
            <span className="absolute right-full mr-4 px-2 py-1 bg-[#0f172a] text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              INIT_DOC_STREAM
            </span>
            {/* 装饰性连接线 */}
            <div className="absolute right-full mr-0 w-4 h-px bg-[#0f172a] opacity-0 group-hover:opacity-100" />
          </button>

          {/* Action Item 2: Log/JSON */}
          <button
            onClick={() => handleAction('VIEW_LOGS')}
            className="group relative p-4 flex items-center justify-center border-b border-[#cbd5e1] hover:bg-[#f1f5f9] transition-colors"
            title="View Logs"
          >
            <FileJson className="w-5 h-5 text-[#0f172a]" strokeWidth={1.5} />
            <span className="absolute right-full mr-4 px-2 py-1 bg-[#0f172a] text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              READ_SYS_LOGS
            </span>
            <div className="absolute right-full mr-0 w-4 h-px bg-[#0f172a] opacity-0 group-hover:opacity-100" />
          </button>

          {/* Action Item 3: Chat */}
          <button
            onClick={() => handleAction('OPEN_COMMS')}
            className="group relative p-4 flex items-center justify-center hover:bg-[#f1f5f9] transition-colors"
            title="Open Chat"
          >
            <MessageSquare
              className="w-5 h-5 text-[#0f172a]"
              strokeWidth={1.5}
            />
            <span className="absolute right-full mr-4 px-2 py-1 bg-[#0f172a] text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              OPEN_COMMS_CH
            </span>
            <div className="absolute right-full mr-0 w-4 h-px bg-[#0f172a] opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* MAIN TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
                group flex items-center justify-center w-14 h-14 border border-[#0f172a] transition-all duration-300
                ${isOpen ? 'bg-white' : 'bg-[#0f172a]'}
            `}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <X
              className={`
                        absolute w-6 h-6 transition-all duration-300
                        ${
                          isOpen
                            ? 'rotate-0 opacity-100 text-[#0f172a]'
                            : 'rotate-90 opacity-0 text-white'
                        }
                    `}
            />
            <Plus
              className={`
                        absolute w-6 h-6 transition-all duration-300
                        ${
                          isOpen
                            ? '-rotate-90 opacity-0 text-[#0f172a]'
                            : 'rotate-0 opacity-100 text-white'
                        }
                    `}
            />
          </div>

          {/* 角落装饰标记，模拟取景器 */}
          <div
            className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors ${
              isOpen ? 'border-[#0f172a]' : 'border-white'
            }`}
          />
          <div
            className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors ${
              isOpen ? 'border-[#0f172a]' : 'border-white'
            }`}
          />
        </button>
      </div>
      {/* --- 组件结束 --- */}
    </div>
  );
};

export default BlueprintFloatButton;
