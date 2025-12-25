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
  Cpu,
  Terminal,
  Check,
  ToggleLeft,
  ToggleRight,
  Loader
} from 'lucide-react';

// --- Design Tokens ---
const STYLES = {
  bg: 'bg-[#f8fafc]',
  border: 'border-slate-300',
  borderStrong: 'border-slate-900',
  text: 'text-slate-900',
  textSub: 'text-slate-500',
  mono: 'font-mono'
};

// --- Pattern Definitions (SVG) for Themes ---
const Patterns = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      {/* Pattern 1: Diagonal Lines */}
      <pattern id="pat-diagonal" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#0f172a" strokeWidth="1" />
      </pattern>
      {/* Pattern 2: Dots */}
      <pattern id="pat-dots" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1" fill="#0f172a" />
      </pattern>
      {/* Pattern 3: Grid */}
      <pattern id="pat-grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0f172a" strokeWidth="0.5" />
      </pattern>
      {/* Pattern 4: Solid Gray */}
      <pattern id="pat-solid" width="1" height="1" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" fill="#cbd5e1" />
      </pattern>
    </defs>
  </svg>
);

// --- Data: Desktop Items ---
const DESKTOP_ITEMS = [
  // Left Column 1
  { id: 'projects', label: 'PROJ_DIR', type: 'DIR', icon: Folder, x: 24, y: 24 },
  { id: 'portfolio', label: 'PORTFOLIO_MAIN', type: 'DIR', icon: Layout, x: 24, y: 140 },
  { id: 'about', label: 'README.TXT', type: 'TXT', icon: FileText, x: 24, y: 256 },
  { id: 'youtube', label: 'AUDIO_OUT_APP', type: 'EXE', icon: Youtube, x: 24, y: 372 },

  // Left Column 2
  { id: 'settings', label: 'SYS_CONFIG', type: 'EXE', icon: Settings, x: 150, y: 24 },
  { id: 'network', label: 'NET_DIAG', type: 'EXE', icon: Activity, x: 150, y: 140 },
  { id: 'services', label: 'SERV_DB', type: 'DAT', icon: Database, x: 150, y: 256 },

  // Right Column
  { id: 'installing', label: 'INSTALLER_PKG', type: 'PKG', icon: HardDrive, right: 24, y: 24, status: 'LOADING' },
  { id: 'blog', label: 'LINK_BLOG', type: 'LNK', icon: Type, right: 24, y: 140 },
  { id: 'tumblr', label: 'LINK_TMBLR', type: 'LNK', icon: Camera, right: 24, y: 256 },
  { id: 'storybook', label: 'DEV_STORYBOOK', type: 'EXE', icon: Hexagon, right: 24, y: 372 },
];

// --- Components ---

// 1. Engineering Grid Background
const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* CSS Pattern Grid */}
    <div className="absolute inset-0 opacity-[0.15]" 
         style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>
    {/* Rulers */}
    <div className="absolute top-0 left-0 w-full h-6 border-b border-slate-900 bg-white flex justify-between px-2 items-end pb-1 font-mono text-[10px] text-slate-500">
       {[...Array(20)].map((_, i) => <span key={i}>{(i * 100).toString().padStart(4, '0')}</span>)}
    </div>
    <div className="absolute top-0 left-0 h-full w-6 border-r border-slate-900 bg-white flex flex-col justify-between py-2 items-end pr-1 font-mono text-[10px] text-slate-500 pt-8">
       {[...Array(10)].map((_, i) => <span key={i}>{(i * 100).toString().padStart(4, '0')}</span>)}
    </div>
  </div>
);

// 2. Technical Icon Block
const TechIcon = ({ item, onDoubleClick }) => {
  const { icon: Icon, label, type, status, x, y, right } = item;
  const positionStyle = right !== undefined ? { right: `${right}px`, top: `${y}px` } : { left: `${x}px`, top: `${y}px` };

  return (
    <div 
      className="absolute w-[100px] group cursor-pointer select-none z-10"
      style={positionStyle}
      onDoubleClick={() => onDoubleClick(item)}
    >
      {/* Component Box */}
      <div className={`
        relative h-[80px] bg-white border border-slate-300 flex flex-col items-center justify-center 
        transition-all duration-100
        group-hover:border-slate-900 group-hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]
        active:translate-y-[2px] active:shadow-none
      `}>
        {/* Connection Points (Decorations) */}
        <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-2 h-[2px] bg-white group-hover:bg-slate-900"></div>
        <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-2 h-[2px] bg-white group-hover:bg-slate-900"></div>

        {/* Status Indicator */}
        {status === 'LOADING' ? (
          <div className="absolute top-1 right-1">
             <Loader size={12} className="animate-spin text-slate-900"/>
          </div>
        ) : (
          <div className="absolute top-1 left-1 text-[8px] font-mono text-slate-400 border border-slate-200 px-1">
             {type}
          </div>
        )}

        <Icon size={32} strokeWidth={1} className="text-slate-900" />
      </div>

      {/* Label Tag */}
      <div className="mt-1 border-l-2 border-slate-900 pl-2 bg-white/50 backdrop-blur-sm">
        <div className="text-[10px] font-mono font-bold text-slate-900 leading-tight break-all uppercase">
           {label}
        </div>
      </div>
    </div>
  );
};

// 3. Website Settings Window Content (The Blueprint Version)
const SettingsContent = () => {
  const [selected, setSelected] = useState(0);
  const [motion, setMotion] = useState(true);

  const THEMES = [
    { id: 0, name: 'DIAGONAL_HATCH', pattern: 'url(#pat-diagonal)' },
    { id: 1, name: 'DOT_MATRIX', pattern: 'url(#pat-dots)' },
    { id: 2, name: 'GRID_LOCK', pattern: 'url(#pat-grid)' },
    { id: 3, name: 'SOLID_STATE', pattern: 'url(#pat-solid)' },
  ];

  return (
    <div className="flex flex-col h-full gap-6 p-2">
       {/* Section 1: Theme Array */}
       <div className="border border-slate-300 p-3 relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-mono font-bold text-slate-900 border border-slate-900">
             MODULE: VISUAL_THEME
          </div>
          
          <div className="grid grid-cols-2 gap-2 aspect-square mt-2">
             {THEMES.map((theme) => (
               <div 
                 key={theme.id}
                 onClick={() => setSelected(theme.id)}
                 className={`
                    relative border cursor-pointer h-full transition-all
                    ${selected === theme.id ? 'border-slate-900 ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-400'}
                 `}
               >
                 <div className="w-full h-full opacity-80" style={{ fill: theme.pattern }}>
                    <svg width="100%" height="100%">
                       <rect width="100%" height="100%" fill={theme.pattern} />
                    </svg>
                 </div>
                 
                 {selected === theme.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                       <div className="bg-slate-900 text-white p-1">
                          <Check size={16} />
                       </div>
                    </div>
                 )}
               </div>
             ))}
          </div>
          {/* Center Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-900 rounded-full flex items-center justify-center z-10">
             <div className="w-8 h-8 border border-slate-300 rounded-full flex items-center justify-center">
                <span className="text-[8px] font-mono">CTR</span>
             </div>
          </div>
       </div>

       {/* Section 2: Toggle Switch */}
       <div className="border border-slate-300 p-4 flex items-center justify-between bg-slate-50">
          <div className="flex flex-col">
             <span className="text-xs font-bold font-mono text-slate-900 uppercase">Motion_Engine</span>
             <span className="text-[10px] font-mono text-slate-500">> optimize_performance();</span>
          </div>
          <button onClick={() => setMotion(!motion)} className="focus:outline-none">
             {motion ? (
                <ToggleLeft size={32} className="text-slate-300 hover:text-slate-400" strokeWidth={1} />
             ) : (
                <ToggleRight size={32} className="text-slate-900" strokeWidth={1} />
             )}
          </button>
       </div>
    </div>
  );
};

// 4. Draggable Blueprint Window
const BlueprintWindow = ({ id, title, content, onClose, isActive, onFocus, initialPos }) => {
  const [pos, setPos] = useState(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
        if (!isDragging) return;
        setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const handleUp = () => setIsDragging(false);
    if(isDragging) {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);
    }
    return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
    }
  }, [isDragging]);

  return (
    <div 
      className="absolute bg-white shadow-xl flex flex-col"
      style={{
        left: pos.x, top: pos.y, width: 400,
        zIndex: isActive ? 50 : 10,
        border: isActive ? '2px solid #0f172a' : '1px solid #cbd5e1',
        boxShadow: isActive ? '8px 8px 0px 0px rgba(15, 23, 42, 0.2)' : 'none'
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div 
        className={`h-8 border-b ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-between px-2 select-none`}
        onMouseDown={(e) => {
            setIsDragging(true);
            offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
            onFocus(id);
        }}
      >
         <div className="flex items-center gap-2 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider">{title}</span>
            <span className="opacity-50 text-[10px]">ID:0x{id.length}</span>
         </div>
         <button onClick={(e) => { e.stopPropagation(); onClose(id); }} className="hover:text-red-400">
            <X size={14} />
         </button>
      </div>

      {/* Content */}
      <div className="p-4 bg-white font-mono text-sm h-auto min-h-[300px]">
         {content}
      </div>

      {/* Footer */}
      <div className="h-5 bg-slate-50 border-t border-slate-200 flex items-center justify-end px-2 gap-4 text-[9px] font-mono text-slate-400">
         <span>STATUS: READY</span>
         <span>MEM: 64KB</span>
      </div>
    </div>
  );
};

// --- Main App ---
const EngineeringDesktop = () => {
  const [windows, setWindows] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const openWindow = (item) => {
     if(windows.find(w => w.id === item.id)) {
         setActiveId(item.id);
         return;
     }
     
     const newWin = {
         id: item.id,
         title: item.label,
         type: item.id === 'settings' ? 'settings' : 'default',
         pos: { x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 200 }
     };
     setWindows([...windows, newWin]);
     setActiveId(item.id);
  };

  const closeWindow = (id) => {
      setWindows(windows.filter(w => w.id !== id));
      if(activeId === id) setActiveId(null);
  };

  const renderWindowContent = (win) => {
      if (win.type === 'settings') return <SettingsContent />;
      
      return (
          <div className="flex flex-col gap-4 text-slate-500">
              <div className="border-l-2 border-slate-300 pl-4 py-2">
                 <h3 className="font-bold text-slate-900">FILE_HEADER</h3>
                 <p className="text-xs">Date: {new Date().toLocaleDateString()}</p>
                 <p className="text-xs">Type: {win.title.split('_')[0]}</p>
              </div>
              <div className="p-4 border border-dashed border-slate-300 bg-slate-50 text-xs font-mono">
                 > parsing_content...<br/>
                 > stream_opened<br/>
                 > [END_OF_FILE]
              </div>
          </div>
      )
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] text-[#0f172a] font-sans overflow-hidden relative selection:bg-slate-900 selection:text-white">
      <Patterns />
      
      {/* 1. Header Bar */}
      <header className="h-10 border-b border-slate-900 bg-white flex justify-between items-center px-4 relative z-50">
         <div className="flex items-center gap-2">
             <div className="w-4 h-4 bg-slate-900"></div>
             <span className="font-mono text-sm font-bold tracking-tight">ENG_BLUEPRINT_OS</span>
         </div>
         <div className="flex items-center gap-6 font-mono text-xs">
             <div className="flex items-center gap-1">
                 <Calendar size={12} />
                 <span>2025-12-25</span>
             </div>
             <div className="flex items-center gap-1">
                 <Clock size={12} />
                 <span>06:17:42</span>
             </div>
             <div className="w-px h-4 bg-slate-300"></div>
             <Wifi size={14} />
         </div>
      </header>

      {/* 2. Main Desktop Area */}
      <main className="relative w-full h-full">
         <GridBackground />

         {/* Icons */}
         {DESKTOP_ITEMS.map(item => (
            <TechIcon 
                key={item.id} 
                item={item} 
                onDoubleClick={openWindow} 
            />
         ))}

         {/* Windows */}
         {windows.map(win => (
            <BlueprintWindow
                key={win.id}
                id={win.id}
                title={win.title}
                content={renderWindowContent(win)}
                isActive={activeId === win.id}
                onClose={closeWindow}
                onFocus={setActiveId}
                initialPos={win.pos}
            />
         ))}
      </main>

      {/* 3. Footer / Status Line */}
      <div className="fixed bottom-0 left-0 w-full h-6 border-t border-slate-900 bg-white flex items-center justify-between px-4 font-mono text-[9px] text-slate-400 z-50">
          <span>SYS_STATUS: NOMINAL</span>
          <span>COORDS: X:{Math.floor(Math.random()*1000)} Y:{Math.floor(Math.random()*1000)}</span>
      </div>
    </div>
  );
};

export default EngineeringDesktop;
