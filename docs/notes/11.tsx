import React, { useState, useEffect, useRef } from 'react';
import {
  Folder,
  Settings,
  Activity,
  FileText,
  Database,
  Youtube,
  Camera,
  Hexagon,
  Wifi,
  Calendar,
  Clock,
  X,
  Type,
  Layout,
  HardDrive,
  Terminal,
  Cpu,
  Maximize
} from 'lucide-react';

// --- Design Tokens (CSS Variables Mapping) ---
const COLORS = {
  bg: '#f8fafc',        // Outer Background
  canvas: '#ffffff',    // Component Background
  border: '#cbd5e1',    // Standard Border (Slate-300)
  borderStrong: '#0f172a', // Active/Strong Border (Slate-900)
  textMain: '#0f172a',  // Slate-900
  textSub: '#64748b',   // Slate-500
  accent: '#0f172a',    // Black accent
  danger: '#ef4444'     // Red for errors/close
};

const FONTS = {
  ui: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
};

// --- Mock Data ---
const DESKTOP_ITEMS = [
  { id: 'projects', label: 'PROJ_DIR', sub: 'Professional', icon: Folder, type: 'folder', x: 24, y: 24 },
  { id: 'portfolio', label: 'PORTFOLIO', sub: 'Main_View', icon: Layout, type: 'folder', x: 24, y: 130 },
  { id: 'about', label: 'ABOUT.TXT', sub: 'Read_Only', icon: FileText, type: 'file', x: 24, y: 236 },
  { id: 'youtube', label: 'YT_MUSIC', sub: 'App_Exec', icon: Youtube, type: 'app', x: 24, y: 342 },
  
  { id: 'settings', label: 'SYS_CONF', sub: 'Settings', icon: Settings, type: 'app', x: 140, y: 24 },
  { id: 'network', label: 'NET_STAT', sub: 'Monitor', icon: Activity, type: 'app', x: 140, y: 130 },
  { id: 'services', label: 'SERV_DB', sub: 'Database', icon: Database, type: 'file', x: 140, y: 236 },

  { id: 'next_app', label: 'INSTALLER', sub: 'Pending...', icon: HardDrive, type: 'app', badge: 'WAIT', right: 24, y: 24 },
  { id: 'blog', label: 'LINK_BLOG', sub: 'Shortcut', icon: Type, type: 'link', right: 24, y: 130 },
  { id: 'tumblr', label: 'LINK_TMBLR', sub: 'Shortcut', icon: Camera, type: 'app', right: 24, y: 236 },
  { id: 'storybook', label: 'STORYBOOK', sub: 'Dev_Tool', icon: Hexagon, type: 'app', right: 24, y: 342 },
];

// --- Components ---

// 1. Grid Background
const TechnicalGrid = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.4]" width="100%" height="100%">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.border} strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

// 2. Blueprint Icon
const BlueprintIcon = ({ item, onDoubleClick }) => {
  const { icon: Icon, label, sub, badge, right, x, y } = item;
  const style = right !== undefined 
    ? { right: `${right}px`, top: `${y}px` } 
    : { left: `${x}px`, top: `${y}px` };

  return (
    <div 
      className="absolute flex flex-col w-[100px] group cursor-pointer select-none"
      style={style}
      onDoubleClick={() => onDoubleClick(item)}
    >
      {/* Icon Box */}
      <div className="w-[100px] h-[70px] bg-white border border-slate-300 group-hover:border-slate-900 group-hover:border-2 transition-all flex items-center justify-center relative">
        <Icon size={28} strokeWidth={1.5} className="text-slate-900" />
        
        {/* Type Indicator (Top Left) */}
        <div className="absolute top-1 left-1 text-[8px] font-mono text-slate-400 uppercase">
            {item.type.substring(0,3)}
        </div>

        {/* Badge */}
        {badge && (
           <div className="absolute -top-2 -right-2 bg-white border border-slate-900 px-1 py-[2px] z-10">
              <span className="text-[10px] font-bold font-mono text-slate-900 block leading-none">{badge}</span>
           </div>
        )}
      </div>

      {/* Label Block */}
      <div className="mt-[-1px] border border-slate-300 bg-white p-1 group-hover:border-slate-900 group-hover:border-t-0">
         <div className="font-mono text-xs font-bold text-slate-900 leading-tight">{label}</div>
         <div className="font-sans text-[10px] text-slate-500 leading-tight">{sub}</div>
      </div>
    </div>
  );
};

// 3. Technical Window
const TechWindow = ({ id, title, type, content, onClose, isActive, onFocus, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition || { x: 200, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    onFocus();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={`absolute flex flex-col bg-white overflow-hidden`}
      style={{
        left: position.x,
        top: position.y,
        width: '450px',
        zIndex: isActive ? 50 : 10,
        // Active windows get a thick black border, inactive get a thin slate border
        border: isActive ? `2px solid ${COLORS.borderStrong}` : `1px solid ${COLORS.border}`,
        boxShadow: isActive ? '8px 8px 0px 0px rgba(203, 213, 225, 0.5)' : 'none'
      }}
      onMouseDown={onFocus}
    >
      {/* Window Header */}
      <div 
        className={`h-8 border-b ${isActive ? 'border-slate-900 bg-slate-50' : 'border-slate-300 bg-white'} flex items-center justify-between pl-2 pr-1 select-none`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-mono text-xs text-slate-500">WIN_ID:{id.substring(0,4).toUpperCase()}</span>
          <div className="h-3 w-[1px] bg-slate-300"></div>
          <span className="font-bold text-xs font-sans text-slate-900 uppercase tracking-wide">{title}</span>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onClose(id); }}
          className="w-6 h-6 flex items-center justify-center border border-transparent hover:border-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-all"
        >
          <X size={14} className="text-slate-900" />
        </button>
      </div>

      {/* Sub-header / Toolbar */}
      <div className="h-6 border-b border-slate-200 bg-white flex items-center px-2 gap-4">
         <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
            <span>STATUS:</span>
            <span className="text-emerald-600">ACTIVE</span>
         </div>
         <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
            <span>TYPE:</span>
            <span className="uppercase">{type}</span>
         </div>
      </div>

      {/* Content Area */}
      <div className="bg-white min-h-[250px] relative p-4 font-mono text-sm text-slate-800">
         {content}
      </div>
      
      {/* Footer Status */}
      <div className="h-5 border-t border-slate-200 bg-slate-50 flex items-center justify-end px-2">
         <span className="text-[10px] font-mono text-slate-400">MEM_USAGE: 24KB</span>
      </div>
    </div>
  );
};

// 4. Header Bar
const SpecSheetHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => setInterval(() => setTime(new Date()), 1000), []);

  return (
    <header className="h-12 bg-white border-b border-slate-300 flex justify-between items-center px-6 shrink-0 z-50">
      {/* Left: Branding */}
      <div className="flex flex-col">
        <h1 className="text-sm font-bold text-slate-900 tracking-wider uppercase font-sans">Engineering Interface</h1>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-mono text-slate-500">V.2.0.4</span>
           <span className="text-[10px] font-mono text-slate-300">|</span>
           <span className="text-[10px] font-mono text-slate-500">USER: YAHYA</span>
        </div>
      </div>

      {/* Center: System Status */}
      <div className="hidden md:flex items-center gap-8 border-x border-slate-100 px-8 h-full">
         <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-slate-400 font-sans uppercase">CPU Load</span>
            <span className="text-xs font-mono text-slate-900">12%</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-slate-400 font-sans uppercase">Memory</span>
            <span className="text-xs font-mono text-slate-900">4.2GB</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-slate-400 font-sans uppercase">Network</span>
            <span className="text-xs font-mono text-emerald-600">ONLINE</span>
         </div>
      </div>
      
      {/* Right: Time */}
      <div className="flex items-center gap-4 text-right">
        <div>
          <div className="text-xs font-mono text-slate-900 font-bold">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            {time.toLocaleDateString('en-US').toUpperCase()}
          </div>
        </div>
        <div className="w-8 h-8 border border-slate-200 flex items-center justify-center">
           <Wifi size={14} className="text-slate-900" />
        </div>
      </div>
    </header>
  );
};

// --- Main App ---
const EngineeringOS = () => {
  const [windows, setWindows] = useState([
    { 
      id: 'readme', 
      title: 'README.md', 
      type: 'doc',
      zIndex: 10,
      position: { x: typeof window !== 'undefined' ? window.innerWidth/2 - 225 : 100, y: 200 }
    }
  ]);
  const [activeWindowId, setActiveWindowId] = useState('readme');
  const [nextZIndex, setNextZIndex] = useState(20);

  const openWindow = (item) => {
    const existing = windows.find(w => w.id === item.id);
    if (existing) {
      bringToFront(item.id);
      return;
    }
    const offset = (windows.length * 30) % 150;
    const newWin = {
      id: item.id,
      title: item.label,
      type: item.type,
      zIndex: nextZIndex,
      position: { x: 100 + offset, y: 100 + offset }
    };
    setWindows([...windows, newWin]);
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(item.id);
  };

  const closeWindow = (id) => setWindows(prev => prev.filter(w => w.id !== id));
  
  const bringToFront = (id) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(prev => prev + 1);
  };

  // Content Renderer
  const renderContent = (win) => {
    if (win.id === 'readme') {
        return (
            <div className="space-y-4">
                <div className="border-l-2 border-slate-900 pl-3">
                    <h3 className="font-bold text-slate-900 text-lg uppercase">Welcome to Blueprint OS</h3>
                    <p className="text-slate-500 text-xs mt-1">Version 2.0.4 (Stable)</p>
                </div>
                <p>
                    This interface is designed for high-precision data management. 
                    All decorative elements have been removed to maximize data-ink ratio.
                </p>
                <div className="bg-slate-50 border border-slate-200 p-2 text-xs">
                    <p>> initializing core modules...</p>
                    <p>> loading user profile...</p>
                    <p className="text-emerald-600">> system ready.</p>
                </div>
            </div>
        )
    }
    if (win.type === 'folder') {
        return (
            <div className="grid grid-cols-2 gap-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="flex items-center gap-2 border border-slate-200 p-2 hover:bg-slate-50 cursor-pointer">
                        <FileText size={16} className="text-slate-400" />
                        <span className="text-xs">Project_Spec_{i}.pdf</span>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2 min-h-[150px]">
            <Cpu size={32} strokeWidth={1} />
            <span className="text-xs uppercase">Process Running...</span>
        </div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-slate-200">
      <SpecSheetHeader />
      
      <main className="flex-1 relative overflow-hidden bg-white m-4 border border-slate-300 shadow-sm">
        {/* Technical Grid Background */}
        <TechnicalGrid />
        
        {/* Corner Decorators (Blueprint marks) */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-slate-900"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-slate-900"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-slate-900"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-slate-900"></div>

        {/* Desktop Icons */}
        {DESKTOP_ITEMS.map(item => (
          <BlueprintIcon 
            key={item.id} 
            item={item} 
            onDoubleClick={openWindow} 
          />
        ))}

        {/* Windows */}
        {windows.map(win => (
          <TechWindow
            key={win.id}
            {...win}
            content={renderContent(win)}
            isActive={activeWindowId === win.id}
            onClose={closeWindow}
            onFocus={() => bringToFront(win.id)}
            initialPosition={win.position}
          />
        ))}

        {/* Bottom Right Label */}
        <div className="absolute bottom-4 right-6 text-slate-300 font-mono text-4xl select-none pointer-events-none opacity-50">
          A-01
        </div>
      </main>
    </div>
  );
};

export default EngineeringOS;
