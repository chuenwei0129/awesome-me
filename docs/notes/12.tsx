import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Cpu,
  Globe,
  HardDrive,
  Layout,
  Settings,
  Activity,
  Maximize,
  Minus,
  X,
  Square,
  Wifi,
  Battery,
  Search,
  ChevronRight
} from 'lucide-react';

// --- 配置常量 ---
const COLORS = {
  bg: '#f8fafc',
  border: '#cbd5e1',    // Inactive border
  borderActive: '#0f172a', // Active border
  text: '#0f172a',
  textSub: '#64748b',
  highlight: '#e2e8f0'
};

// --- 应用清单 (The "Modules") ---
const APPS = [
  { id: 'finder', name: 'SYS_FINDER', pid: 1001, icon: HardDrive, type: 'system' },
  { id: 'safari', name: 'NET_NAV', pid: 2048, icon: Globe, type: 'network' },
  { id: 'terminal', name: 'TERM_EXEC', pid: 8080, icon: Terminal, type: 'utility' },
  { id: 'activity', name: 'SYS_MON', pid: 3005, icon: Activity, type: 'utility' },
  { id: 'settings', name: 'CONFIG_REG', pid: 4040, icon: Settings, type: 'system' },
];

// --- 组件 ---

// 1. 工程背景网格
const EngineeringGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* 主网格 */}
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)"/>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#cbd5e1" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* 边缘刻度装饰 */}
    <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-slate-300 bg-[#f8fafc] flex flex-col justify-between py-2 items-center text-[8px] font-mono text-slate-400">
        <span>00</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span>
    </div>
  </div>
);

// 2. 顶部状态栏 (Blueprint Menu Bar)
const StatusBar = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => setInterval(() => setTime(new Date()), 1000), []);

  return (
    <div className="h-8 bg-white border-b border-slate-900 flex items-center justify-between px-3 text-xs font-mono select-none relative z-50">
      <div className="flex items-center gap-6">
        <span className="font-bold bg-slate-900 text-white px-2 py-0.5">OS_KERNEL_v2</span>
        <div className="flex gap-4 text-slate-600">
           <span className="hover:text-black cursor-pointer hover:underline">[FILE]</span>
           <span className="hover:text-black cursor-pointer hover:underline">[EDIT]</span>
           <span className="hover:text-black cursor-pointer hover:underline">[VIEW]</span>
           <span className="hover:text-black cursor-pointer hover:underline">[EXEC]</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-emerald-700">
           <Wifi size={12} />
           <span>LINK_OK</span>
        </div>
        <div className="flex items-center gap-1">
           <Battery size={12} />
           <span>PWR_100%</span>
        </div>
        <div className="border-l border-slate-300 pl-3">
           {time.toLocaleTimeString('en-GB')}
        </div>
      </div>
    </div>
  );
};

// 3. 蓝图风格窗口 (Blueprint Window)
const BlueprintWindow = ({ id, title, pid, content, isMinimized, isActive, zIndex, onClose, onMinimize, onFocus, initialPos }) => {
  const [pos, setPos] = useState(initialPos || { x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    onFocus(id);
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    const move = (e) => { if (isDragging) setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y }); };
    const stop = () => setIsDragging(false);
    if (isDragging) { window.addEventListener('mousemove', move); window.addEventListener('mouseup', stop); }
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', stop); }
  }, [isDragging]);

  // 如果最小化，在视觉上隐藏 (display: none)，但保留组件状态
  if (isMinimized) return null;

  return (
    <div
      className="absolute bg-white flex flex-col"
      style={{
        left: pos.x, top: pos.y, width: 600, height: 400, zIndex,
        // Active 状态下边框变粗变黑
        border: isActive ? `2px solid ${COLORS.borderActive}` : `1px solid ${COLORS.border}`,
        boxShadow: isActive ? '8px 8px 0px 0px rgba(15, 23, 42, 0.1)' : 'none'
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Window Header (The "Title Bar") */}
      <div 
        className={`h-8 border-b ${isActive ? 'bg-slate-100 border-slate-900' : 'bg-white border-slate-300'} flex items-center justify-between px-2 select-none cursor-grab active:cursor-grabbing`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="font-bold text-slate-900 uppercase">[{title}]</span>
          <span className="text-slate-400">PID:{pid}</span>
        </div>

        {/* Window Controls (The "Traffic Lights" Blueprint Version) */}
        <div className="flex gap-[-1px]">
           <button onClick={(e) => { e.stopPropagation(); onMinimize(id); }} className="px-2 py-0.5 border border-slate-300 hover:bg-slate-200 text-[10px] font-mono hover:border-slate-900 transition-colors">[MIN]</button>
           <button onClick={(e) => { e.stopPropagation(); /* Maximize Logic Placeholder */ }} className="px-2 py-0.5 border-y border-r border-slate-300 hover:bg-slate-200 text-[10px] font-mono hover:border-slate-900 transition-colors">[MAX]</button>
           <button onClick={(e) => { e.stopPropagation(); onClose(id); }} className="px-2 py-0.5 border-y border-r border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-600 text-[10px] font-mono transition-colors">[KILL]</button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm relative">
         {/* Corner Markers */}
         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-900"></div>
         <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-900"></div>
         <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-900"></div>
         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-900"></div>
         
         {content}
      </div>

      {/* Footer Status */}
      <div className="h-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between px-2 text-[10px] font-mono text-slate-500">
         <span>MEM_USAGE: {(Math.random() * 50 + 10).toFixed(1)} MB</span>
         <span>THREAD: ACTIVE</span>
      </div>
    </div>
  );
};

// 4. 组件机架 (The "Dock")
const ComponentRack = ({ apps, openApps, activeAppId, onAppClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#f8fafc] border-t border-slate-900 z-50 flex justify-center items-end pb-4">
       {/* Rack Label */}
       <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-400 tracking-widest">MODULE_RACK_01</div>
       
       <div className="flex gap-4 px-8 py-2 border border-slate-300 bg-white shadow-[0_-4px_0_0_rgba(203,213,225,0.3)]">
          {apps.map((app, index) => {
            const isOpen = openApps.includes(app.id);
            const isActive = activeAppId === app.id;
            
            return (
              <div 
                key={app.id}
                onClick={() => onAppClick(app.id)}
                className={`
                  group relative w-12 h-12 flex flex-col items-center justify-center cursor-pointer transition-all
                  border ${isActive ? 'border-slate-900 bg-slate-100' : 'border-slate-300 hover:border-slate-400'}
                `}
              >
                <app.icon size={20} strokeWidth={1.5} className={isActive ? 'text-slate-900' : 'text-slate-500'} />
                
                {/* Index Number */}
                <span className="absolute top-0.5 left-1 text-[8px] font-mono text-slate-300">0{index + 1}</span>
                
                {/* Status Indicator (The "Dot") */}
                {isOpen && (
                   <div className="absolute -bottom-2 text-[8px] font-mono font-bold text-slate-900 tracking-tighter">
                      [RUN]
                   </div>
                )}
                
                {/* Tooltip (Label) */}
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] px-2 py-0.5 font-mono pointer-events-none transition-opacity">
                   {app.name}
                </div>
              </div>
            )
          })}
       </div>
    </div>
  );
};

// --- 主程序 ---
const BlueprintOS = () => {
  const [windows, setWindows] = useState([
    { id: 'finder', zIndex: 1, isMinimized: false, pos: {x: 50, y: 50} }
  ]);
  const [activeWindowId, setActiveWindowId] = useState('finder');
  const [maxZIndex, setMaxZIndex] = useState(1);

  // Logic mirrors macOS behavior exactly
  const handleAppClick = (appId) => {
    const existing = windows.find(w => w.id === appId);
    if (existing) {
      if (existing.isMinimized) {
        // Restore from Dock
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w));
        setActiveWindowId(appId);
        setMaxZIndex(prev => prev + 1);
      } else {
        // Bring to front
        focusWindow(appId);
      }
    } else {
      // Launch new
      const offset = (windows.length * 20) + 50;
      setWindows([...windows, { 
        id: appId, 
        zIndex: maxZIndex + 1, 
        isMinimized: false, 
        pos: { x: offset, y: offset } 
      }]);
      setActiveWindowId(appId);
      setMaxZIndex(prev => prev + 1);
    }
  };

  const closeWindow = (id) => setWindows(prev => prev.filter(w => w.id !== id));
  
  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    // If minimizing active window, set active to null
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id) => {
    if (activeWindowId === id) return;
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w));
    setMaxZIndex(prev => prev + 1);
  };

  // Content Generators
  const renderContent = (id) => {
     switch(id) {
         case 'finder': return (
             <div className="space-y-2">
                 <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                     <ChevronRight size={14}/> <span className="font-bold">/ROOT/USR/DOCS</span>
                 </div>
                 {[1,2,3,4].map(i => (
                     <div key={i} className="flex justify-between hover:bg-slate-100 cursor-pointer p-1">
                         <span>project_alpha_{i}.dwg</span>
                         <span className="text-slate-400">1{i}2 KB</span>
                     </div>
                 ))}
             </div>
         );
         case 'terminal': return (
             <div className="font-mono text-xs">
                 <p>> initialize_sequence.sh</p>
                 <p className="text-slate-400">... loading libraries</p>
                 <p className="text-slate-400">... allocating memory</p>
                 <p className="text-emerald-700">> SUCCESS: System stable.</p>
                 <p className="animate-pulse">_</p>
             </div>
         );
         case 'safari': return (
             <div className="flex flex-col h-full gap-4 items-center justify-center border border-dashed border-slate-300">
                 <Globe size={48} className="text-slate-200" strokeWidth={1} />
                 <div className="text-center">
                     <div className="font-bold">CONNECTION_ESTABLISHED</div>
                     <div className="text-xs text-slate-400">Packet Loss: 0%</div>
                 </div>
             </div>
         );
         default: return (
             <div className="h-full flex items-center justify-center text-slate-300">
                 NO_DATA_STREAM
             </div>
         )
     }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-slate-900 selection:text-white flex flex-col">
      <StatusBar />
      
      <main className="flex-1 relative overflow-hidden pl-8">
        <EngineeringGrid />

        {/* Desktop Icons (Files) */}
        <div className="absolute top-8 right-8 flex flex-col gap-4 items-end z-0">
             <div className="w-20 border border-slate-300 bg-white p-2 flex flex-col items-center gap-2 hover:border-slate-900 cursor-pointer group">
                 <Layout size={24} strokeWidth={1} />
                 <span className="text-[10px] font-mono text-center leading-tight group-hover:bg-slate-900 group-hover:text-white px-1">README.md</span>
             </div>
             <div className="w-20 border border-slate-300 bg-white p-2 flex flex-col items-center gap-2 hover:border-slate-900 cursor-pointer group">
                 <Square size={24} strokeWidth={1} />
                 <span className="text-[10px] font-mono text-center leading-tight group-hover:bg-slate-900 group-hover:text-white px-1">IMG_001.raw</span>
             </div>
        </div>

        {/* Windows Layer */}
        {windows.map(win => {
            const appInfo = APPS.find(a => a.id === win.id);
            return (
                <BlueprintWindow 
                    key={win.id}
                    id={win.id}
                    title={appInfo.name}
                    pid={appInfo.pid}
                    content={renderContent(win.id)}
                    zIndex={win.zIndex}
                    isMinimized={win.isMinimized}
                    isActive={activeWindowId === win.id}
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    onFocus={focusWindow}
                    initialPos={win.pos}
                />
            )
        })}
      </main>
      
      {/* The "Dock" */}
      <ComponentRack 
          apps={APPS} 
          openApps={windows.map(w => w.id)} 
          activeAppId={activeWindowId}
          onAppClick={handleAppClick}
      />
    </div>
  );
};

export default BlueprintOS;
