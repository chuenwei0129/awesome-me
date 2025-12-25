import {
  Activity,
  Aperture,
  Box,
  // 装饰/功能图标
  Cpu,
  Crosshair,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Hexagon,
  Layout,
  Minus,
  Radio,
  Share2,
  ShieldCheck,
  Target,
  // 基础图标
  Terminal,
  Wifi,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// --- Assets / Icon Palette Definition ---
// 这里定义了一些具有高度工程感的图标，用于装饰或功能入口
const TECH_ICONS = [
  { icon: Crosshair, label: 'CALIBRATE' },
  { icon: Target, label: 'TARGETING' },
  { icon: Aperture, label: 'OPTICS' },
  { icon: Radio, label: 'SIGNAL' },
  { icon: ShieldCheck, label: 'SECURITY' },
  { icon: GitBranch, label: 'VERSION' },
  { icon: Zap, label: 'POWER_BUS' },
  { icon: Share2, label: 'NODES' },
];

const INITIAL_APPS = [
  {
    id: 'sys_mon',
    title: 'System Diagnostics',
    subtitle: 'KERNEL: 5.15.0',
    icon: Cpu,
    width: 340,
    x: 40,
    y: 60,
    content: 'monitor',
  },
  {
    id: 'net_top',
    title: 'Network Topology',
    subtitle: 'VLAN: 10.0.0.X',
    icon: Share2,
    width: 480,
    x: 420,
    y: 120,
    content: 'network',
  },
  {
    id: 'toolbox',
    title: 'Component Library',
    subtitle: 'LIB_VER: 2.0.4',
    icon: Box,
    width: 300,
    x: 100,
    y: 480,
    content: 'toolbox',
  },
];

export default function EngineeringOS() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false }),
  );
  const [windows, setWindows] = useState(
    INITIAL_APPS.map((app) => ({
      ...app,
      isOpen: true,
      isMinimized: false,
      zIndex: 10,
    })),
  );
  const [dragState, setDragState] = useState({
    isDragging: false,
    id: null,
    offsetX: 0,
    offsetY: 0,
  });
  const [topZIndex, setTopZIndex] = useState(100);

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  // --- Window Management Logic (Same as before) ---
  const activateWindow = (id) => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w,
      ),
    );
  };

  const toggleApp = (id) => {
    const target = windows.find((w) => w.id === id);
    if (!target) return;
    if (!target.isOpen || target.isMinimized) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: topZIndex + 1 }
            : w,
        ),
      );
      setTopZIndex((prev) => prev + 1);
    } else if (target.zIndex === topZIndex) {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
      );
    } else {
      activateWindow(id);
    }
  };

  const closeWindow = (id, e) => {
    e.stopPropagation();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)),
    );
  };

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    activateWindow(id);
    const win = windows.find((w) => w.id === id);
    setDragState({
      isDragging: true,
      id,
      offsetX: e.clientX - win.x,
      offsetY: e.clientY - win.y,
    });
  };

  useEffect(() => {
    const move = (e) => {
      if (!dragState.isDragging) return;
      setWindows((prev) =>
        prev.map((w) =>
          w.id === dragState.id
            ? {
                ...w,
                x: e.clientX - dragState.offsetX,
                y: e.clientY - dragState.offsetY,
              }
            : w,
        ),
      );
    };
    const up = () =>
      setDragState({ isDragging: false, id: null, offsetX: 0, offsetY: 0 });
    if (dragState.isDragging) {
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    }
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [dragState]);

  // --- Render Content ---
  const renderContent = (type) => {
    switch (type) {
      case 'monitor':
        return (
          <div className="bg-white p-0">
            {/* Status Grid */}
            <div className="grid grid-cols-2 gap-px bg-slate-200 border-b border-slate-300">
              <div className="bg-white p-3 flex items-center gap-3">
                <Activity size={20} className="text-slate-900" />
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    CPU_LOAD
                  </div>
                  <div className="text-lg font-mono font-bold leading-none">
                    34.2%
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 flex items-center gap-3">
                <Zap size={20} className="text-slate-900" />
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    POWER
                  </div>
                  <div className="text-lg font-mono font-bold leading-none">
                    45W
                  </div>
                </div>
              </div>
            </div>

            {/* Graph Area */}
            <div className="p-3 bg-slate-50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                  <Crosshair size={12} />
                  <span>SENSOR_DATA_STREAM</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-slate-900"></div>
                  <div className="w-1 h-1 bg-slate-300"></div>
                  <div className="w-1 h-1 bg-slate-300"></div>
                </div>
              </div>
              <div className="h-24 border border-slate-300 bg-white relative overflow-hidden flex items-end px-1 gap-1">
                {/* Simulated Graph */}
                {[
                  20, 40, 35, 50, 65, 45, 80, 55, 40, 60, 45, 30, 50, 70, 60,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-slate-900 opacity-80"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
                {/* Grid Overlay */}
                <div className="absolute inset-0 border-t border-slate-100 top-1/2"></div>
                <div className="absolute inset-0 border-t border-slate-100 top-1/4"></div>
                <div className="absolute inset-0 border-t border-slate-100 top-3/4"></div>
              </div>
            </div>
          </div>
        );
      case 'toolbox':
        return (
          <div className="bg-white p-4">
            <div className="grid grid-cols-4 gap-4">
              {TECH_ICONS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-10 h-10 border border-slate-300 flex items-center justify-center text-slate-500 group-hover:border-slate-900 group-hover:text-slate-900 group-hover:bg-slate-50 transition-all relative overflow-hidden">
                    <item.icon size={20} strokeWidth={1.5} />
                    {/* Hover corner accent */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-l border-b border-transparent group-hover:border-slate-300 transition-colors"></div>
                  </div>
                  <span className="font-mono text-[9px] text-slate-400 group-hover:text-slate-900">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-slate-200 pt-3">
              <div className="flex items-center gap-2 mb-2">
                <Database size={14} className="text-slate-500" />
                <span className="font-mono text-xs font-bold">
                  ASSETS_LOADED
                </span>
              </div>
              <div className="h-1 w-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-slate-900 w-2/3"></div>
              </div>
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="h-full bg-slate-50 flex flex-col">
            <div className="flex-1 p-6 relative flex items-center justify-center">
              {/* Abstract Node Diagram */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div
                  className="w-48 h-48 border border-slate-400 rounded-full border-dashed animate-spin-slow"
                  style={{ animationDuration: '20s' }}
                ></div>
                <div className="absolute w-32 h-32 border border-slate-400 transform rotate-45"></div>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-slate-900 flex items-center justify-center mb-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <HardDrive size={24} />
                  </div>
                  <span className="font-mono text-xs font-bold">DB_MST</span>
                </div>
                <div className="flex flex-col items-center pt-8">
                  <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center mb-2 ring-4 ring-slate-200">
                    <Globe size={28} />
                  </div>
                  <span className="font-mono text-xs font-bold">GATEWAY</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-slate-900 flex items-center justify-center mb-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <Terminal size={24} />
                  </div>
                  <span className="font-mono text-xs font-bold">CLI_01</span>
                </div>
              </div>
              {/* Connection Lines (SVG) */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full text-slate-300">
                <line
                  x1="30%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="70%"
                  y2="50%"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f8fafc] font-sans text-slate-900 relative">
      {/* --- HUD BACKGROUND DECORATION --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-slate-300"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-slate-300"></div>
        <div className="absolute bottom-16 left-4 w-8 h-8 border-b-2 border-l-2 border-slate-300"></div>
        <div className="absolute bottom-16 right-4 w-8 h-8 border-b-2 border-r-2 border-slate-300"></div>

        {/* Crosshairs Grid */}
        <div className="absolute top-1/3 left-1/4 text-slate-200">
          <Crosshair size={48} strokeWidth={1} />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-slate-200">
          <Crosshair size={48} strokeWidth={1} />
        </div>

        {/* Center Grid */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-[800px] h-[600px] border border-slate-900 grid grid-cols-4 grid-rows-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border border-slate-900"></div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SYSTEM HEADER --- */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-300 bg-white px-4 z-50 relative">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 text-white shadow-sm">
            <Hexagon size={16} fill="white" className="text-slate-900" />
            <span className="font-mono text-sm font-bold tracking-widest">
              ENG_OS
            </span>
          </div>

          <div className="hidden md:flex gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <GitBranch size={14} />
              <span className="font-mono text-[10px]">MAIN / PROD</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={14} />
              <span className="font-mono text-[10px]">SECURE</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Mini Status Indicators */}
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === 1 ? 'bg-red-500 animate-pulse' : 'bg-slate-300'
                }`}
              ></div>
            ))}
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <span className="font-mono text-xl font-medium tracking-tight">
            {time}
          </span>
        </div>
      </header>

      {/* --- DESKTOP --- */}
      <main
        className="relative flex-1 p-6 z-10"
        onMouseDown={() => setTopZIndex((prev) => prev + 1)}
      >
        {windows.map((win) => {
          if (!win.isOpen || win.isMinimized) return null;
          const isFocused = win.zIndex === topZIndex;

          return (
            <div
              key={win.id}
              className={`absolute flex flex-col bg-white shadow-xl shadow-slate-200/50 transition-all duration-75
                ${
                  isFocused
                    ? 'ring-1 ring-slate-900 z-50'
                    : 'ring-1 ring-slate-300'
                }`}
              style={{
                left: win.x,
                top: win.y,
                width: win.width,
                zIndex: win.zIndex,
              }}
              onMouseDown={() => activateWindow(win.id)}
            >
              {/* Decorative Corner Accents (Engineering Style) */}
              <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-slate-900 pointer-events-none"></div>
              <div className="absolute -top-px -right-px w-2 h-2 border-t-2 border-r-2 border-slate-900 pointer-events-none"></div>
              <div className="absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-slate-900 pointer-events-none"></div>
              <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-slate-900 pointer-events-none"></div>

              {/* Title Bar */}
              <div
                className={`flex items-center justify-between px-3 py-2 cursor-move border-b 
                  ${
                    isFocused
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-900 border-slate-200'
                  }
                `}
                onMouseDown={(e) => handleMouseDown(e, win.id)}
              >
                <div className="flex items-center gap-3">
                  <win.icon size={16} strokeWidth={2} />
                  <div className="flex flex-col leading-none gap-0.5">
                    <span className="font-bold font-sans text-[11px] tracking-wider uppercase">
                      {win.title}
                    </span>
                    <span
                      className={`font-mono text-[9px] ${
                        isFocused ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      {win.subtitle}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Technical Decorations in Header */}
                  <div className="flex gap-0.5 mr-2 opacity-50">
                    <div className="w-1 h-3 bg-current"></div>
                    <div className="w-1 h-3 bg-current"></div>
                  </div>
                  <button
                    onClick={(e) => toggleApp(win.id)}
                    className="hover:text-slate-300"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={(e) => closeWindow(win.id, e)}
                    className="hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative overflow-hidden">
                {renderContent(win.content)}
              </div>
            </div>
          );
        })}
      </main>

      {/* --- BOTTOM BAR --- */}
      <footer className="h-14 bg-white border-t border-slate-300 flex items-center px-6 justify-between z-50 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 border border-slate-300 hover:border-slate-900 cursor-pointer transition-colors group">
            <Layout
              size={16}
              className="text-slate-500 group-hover:text-slate-900"
            />
            <span className="font-mono text-xs font-bold text-slate-700 group-hover:text-slate-900">
              START_MENU
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2 h-full">
          {windows.map((app) => {
            const isActive = app.isOpen && !app.isMinimized;
            return (
              <button
                key={app.id}
                onClick={() => toggleApp(app.id)}
                className={`group h-full px-3 flex items-center justify-center relative transition-all w-14 hover:bg-slate-50
                            ${
                              isActive
                                ? 'border-b-2 border-slate-900'
                                : 'border-b-2 border-transparent'
                            }
                        `}
              >
                <app.icon
                  size={20}
                  strokeWidth={1.5}
                  className={`transition-all ${
                    isActive
                      ? 'text-slate-900'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                {/* Hover Label */}
                <div className="absolute bottom-14 bg-slate-900 text-white text-[10px] font-mono py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {app.title}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-[10px] text-slate-400">
              SYS_STATUS
            </div>
            <div className="font-mono text-xs font-bold text-green-600">
              ONLINE
            </div>
          </div>
          <Wifi size={16} className="text-slate-400" />
        </div>
      </footer>
    </div>
  );
}
