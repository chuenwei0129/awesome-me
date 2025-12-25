import {
  Activity,
  Clock,
  Folder,
  Grid,
  HardDrive,
  Minus,
  Terminal,
  Wifi,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// --- App Definitions ---
// 定义系统中的应用及其初始状态
const INITIAL_APPS = [
  {
    id: 'sys_mon',
    title: 'System Monitor',
    subtitle: 'PID: 8821.A',
    icon: Activity,
    width: 320,
    height: 400,
    x: 40,
    y: 40,
    content: 'monitor',
  },
  {
    id: 'file_reg',
    title: 'File Registry',
    subtitle: 'MOUNT: /USR/LOCAL',
    icon: HardDrive,
    width: 500,
    height: 350,
    x: 400,
    y: 100,
    content: 'files',
  },
  {
    id: 'term_out',
    title: 'Terminal Output',
    subtitle: 'BASH // TTY1',
    icon: Terminal,
    width: 600,
    height: 300,
    x: 150,
    y: 450,
    content: 'terminal',
  },
];

export default function EngineeringOS() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false }),
  );

  // 窗口状态
  const [windows, setWindows] = useState(
    INITIAL_APPS.map((app) => ({
      ...app,
      isOpen: true,
      isMinimized: false,
      zIndex: 10,
    })),
  );

  // 拖拽状态
  const [dragState, setDragState] = useState({
    isDragging: false,
    id: null,
    offsetX: 0,
    offsetY: 0,
  });

  // 层级计数器，保证点击的窗口总是在最上层
  const [topZIndex, setTopZIndex] = useState(100);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  // --- Window Actions ---

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
    if (!target) return; // Should not happen based on static list

    if (!target.isOpen) {
      // Open it
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: topZIndex + 1 }
            : w,
        ),
      );
      setTopZIndex((prev) => prev + 1);
    } else if (target.isMinimized) {
      // Restore
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: topZIndex + 1 } : w,
        ),
      );
      setTopZIndex((prev) => prev + 1);
    } else {
      // If already active and focused, minimize it. If not focused, focus it.
      if (target.zIndex === topZIndex) {
        setWindows((prev) =>
          prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
        );
      } else {
        activateWindow(id);
      }
    }
  };

  const closeWindow = (id, e) => {
    e.stopPropagation();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)),
    );
  };

  const minimizeWindow = (id, e) => {
    e.stopPropagation();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    );
  };

  // --- Drag Logic ---

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    activateWindow(id);
    const win = windows.find((w) => w.id === id);
    setDragState({
      isDragging: true,
      id: id,
      offsetX: e.clientX - win.x,
      offsetY: e.clientY - win.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragState.isDragging) return;

    const newX = e.clientX - dragState.offsetX;
    const newY = e.clientY - dragState.offsetY;

    setWindows((prev) =>
      prev.map((w) => (w.id === dragState.id ? { ...w, x: newX, y: newY } : w)),
    );
  };

  const handleMouseUp = () => {
    setDragState({ isDragging: false, id: null, offsetX: 0, offsetY: 0 });
  };

  // Add global mouse listeners for dragging
  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState]);

  // --- Render Contents Helper ---
  const renderWindowContent = (type) => {
    switch (type) {
      case 'monitor':
        return (
          <>
            <div className="bg-slate-50 p-2">
              <div className="mb-2 border border-slate-300 bg-white p-2">
                <div className="mb-1 flex justify-between">
                  <span className="font-mono text-[10px] uppercase text-slate-500">
                    Core_Load_Graph
                  </span>
                  <span className="font-mono text-[10px] text-slate-900 animate-pulse">
                    RUNNING
                  </span>
                </div>
                <div className="flex h-16 items-end gap-1 border-b border-l border-slate-200 p-1">
                  {[40, 65, 32, 50, 78, 45, 60, 30, 55, 40].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-slate-900"
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white">
              <MetricRow label="MEMORY_USAGE" value="8,192" unit="MB" />
              <MetricRow label="SWAP_SPACE" value="1,024" unit="MB" />
              <MetricRow label="DISK_I/O" value="45.2" unit="MB/s" />
              <MetricRow label="UPTIME" value="14:22:01" unit="Hrs" />
            </div>
            <div className="border-t border-slate-300 bg-slate-50 p-2">
              <button className="w-full border border-slate-300 bg-white py-1 font-mono text-xs hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
                EXECUTE_DIAGNOSTICS
              </button>
            </div>
          </>
        );
      case 'files':
        return (
          <div className="flex h-full flex-col">
            <div className="flex flex-1">
              <div className="w-1/3 border-r border-slate-300 bg-slate-50 py-2">
                {['ROOT', 'BIN', 'ETC', 'VAR', 'HOME'].map((dir) => (
                  <div
                    key={dir}
                    className="flex cursor-pointer items-center gap-2 px-4 py-1.5 hover:bg-slate-200 hover:text-slate-900 text-slate-500"
                  >
                    <Folder size={12} />
                    <span className="font-mono text-xs">/{dir}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-white p-0 overflow-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-xs font-medium text-slate-500 sticky top-0">
                    <tr>
                      <th className="border-b border-slate-300 px-4 py-2 font-mono font-normal">
                        NAME
                      </th>
                      <th className="border-b border-slate-300 px-4 py-2 font-mono font-normal">
                        SIZE
                      </th>
                      <th className="border-b border-slate-300 px-4 py-2 font-mono font-normal">
                        MOD
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {[
                      { n: 'config.json', s: '2KB', d: 'Oct 24' },
                      { n: 'sys_log.txt', s: '14MB', d: 'Oct 23' },
                      { n: 'index.js', s: '45KB', d: 'Oct 22' },
                      { n: 'data_raw.csv', s: '102MB', d: 'Oct 20' },
                      { n: 'build_v2.sh', s: '1KB', d: 'Oct 19' },
                    ].map((f, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-100 hover:bg-slate-50 cursor-default select-none"
                      >
                        <td className="px-4 py-2 font-mono text-slate-900">
                          {f.n}
                        </td>
                        <td className="px-4 py-2 font-mono text-slate-500">
                          {f.s}
                        </td>
                        <td className="px-4 py-2 font-mono text-slate-400">
                          {f.d}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between border-t border-slate-300 bg-slate-50 px-3 py-1.5 shrink-0">
              <span className="font-mono text-[10px] text-slate-500">
                5 OBJECTS
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                TOTAL: 116.5MB
              </span>
            </div>
          </div>
        );
      case 'terminal':
        return (
          <div
            className="bg-white p-4 font-mono text-xs h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 text-slate-400">
              Last login: Thu Dec 25 06:29:30 on ttys000
            </div>
            <div className="mb-2">
              <span className="text-slate-500">user@sys-01:~$</span>{' '}
              <span className="text-slate-900">npm run build:prod</span>
            </div>
            <div className="mb-2 border-l-2 border-slate-300 pl-3 text-slate-500">
              <div>&gt; engineering-ui@1.0.0 build</div>
              <div>&gt; react-scripts build</div>
              <div className="mt-1">
                Creating an optimized production build...
              </div>
              <div className="text-slate-900">Compiled successfully.</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">user@sys-01:~$</span>
              <span className="h-4 w-2 animate-pulse bg-slate-900"></span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50 font-sans text-slate-900 selection:bg-slate-200 selection:text-slate-900 relative">
      {/* --- TOP SYSTEM BAR --- */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-300 bg-white px-4 z-50 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-slate-900 bg-slate-900 px-2 py-1 text-white">
            <Grid size={16} />
            <span className="font-mono text-xs font-bold tracking-widest">
              SYS_OS_V1
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            // ENGINEERING_RUNTIME
          </span>
        </div>

        <div className="flex items-center">
          <StatusBarItem icon={Wifi} label="NET" value="5G" />
          <StatusBarItem icon={Activity} label="MEM" value="42%" />
          <StatusBarItem icon={Clock} label="TIME" value={time} />
        </div>
      </header>

      {/* --- MAIN DESKTOP AREA --- */}
      <main
        className="relative flex-1 overflow-hidden p-6"
        onMouseDown={() => setTopZIndex((prev) => prev + 1)}
      >
        {' '}
        {/* Click bg clears focus conceptually */}
        {/* Grid Background */}
        <div className="pointer-events-none absolute inset-0 flex justify-between opacity-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full w-px bg-slate-900"></div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-px bg-slate-900"></div>
          ))}
        </div>
        {/* Windows Rendering */}
        {windows.map((win) => {
          if (!win.isOpen || win.isMinimized) return null;
          const isFocused = win.zIndex === topZIndex;

          return (
            <div
              key={win.id}
              className={`absolute flex flex-col border bg-white shadow-none transition-shadow ${
                isFocused ? 'border-slate-900 z-50' : 'border-slate-300'
              }`}
              style={{
                left: win.x,
                top: win.y,
                width: win.width,
                // height: win.height, // Auto height or fixed
                zIndex: win.zIndex,
              }}
              onMouseDown={() => activateWindow(win.id)}
            >
              {/* Window Header - Drag Handle */}
              <div
                className={`flex items-center justify-between border-b px-3 py-2 select-none cursor-move transition-colors
                  ${
                    isFocused
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }
                `}
                onMouseDown={(e) => handleMouseDown(e, win.id)}
              >
                <div className="flex items-center gap-2 pointer-events-none">
                  <win.icon
                    size={16}
                    className={isFocused ? 'text-white' : 'text-slate-900'}
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">
                      {win.title}
                    </span>
                    <span
                      className={`font-mono text-[10px] ${
                        isFocused ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {win.subtitle}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => minimizeWindow(win.id, e)}
                    className={`hover:opacity-100 opacity-60 ${
                      isFocused
                        ? 'text-white hover:text-slate-200'
                        : 'text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={(e) => closeWindow(win.id, e)}
                    className={`hover:opacity-100 opacity-60 ${
                      isFocused
                        ? 'text-white hover:text-red-400'
                        : 'text-slate-400 hover:text-red-600'
                    }`}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="flex-1 overflow-hidden relative">
                {renderWindowContent(win.content)}
              </div>
            </div>
          );
        })}
      </main>

      {/* --- BOTTOM DOCK --- */}
      <footer className="flex h-14 shrink-0 items-center justify-center border-t border-slate-300 bg-white px-4 z-50">
        <div className="flex items-center gap-6 border border-slate-300 bg-slate-50 px-6 py-2">
          <button className="flex h-8 w-8 items-center justify-center border border-transparent bg-slate-900 text-white hover:bg-slate-800 transition-colors">
            <Grid size={16} />
          </button>
          <div className="h-4 w-px bg-slate-300"></div>

          {windows.map((app) => {
            const isActive = app.isOpen && !app.isMinimized;
            const isFocused = isActive && app.zIndex === topZIndex;

            return (
              <button
                key={app.id}
                onClick={() => toggleApp(app.id)}
                className="group relative flex flex-col items-center gap-1"
              >
                <div
                  className={`
                      flex h-8 w-8 items-center justify-center border transition-all
                      ${
                        isActive
                          ? isFocused
                            ? 'border-slate-900 bg-white text-slate-900'
                            : 'border-slate-300 bg-white text-slate-500'
                          : 'border-transparent text-slate-400 hover:border-slate-300 hover:text-slate-900'
                      }
                   `}
                >
                  <app.icon size={18} strokeWidth={1.5} />
                </div>
                {/* Status Indicator (Dot) */}
                <div
                  className={`absolute -bottom-2 h-1 w-1 transition-colors ${
                    isActive ? 'bg-slate-900' : 'bg-transparent'
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}

// --- Sub Components ---

const MetricRow = ({ label, value, unit }) => (
  <div className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0 hover:bg-slate-50 px-4 group cursor-default">
    <span className="font-mono text-xs text-slate-500 group-hover:text-slate-700">
      {label}
    </span>
    <div className="flex items-baseline gap-1">
      <span className="font-mono text-sm font-semibold text-slate-900">
        {value}
      </span>
      {unit && (
        <span className="font-mono text-[10px] text-slate-400">{unit}</span>
      )}
    </div>
  </div>
);

const StatusBarItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 border-l border-slate-300 px-4 py-1 first:border-l-0">
    <Icon size={14} className="text-slate-500" />
    <span className="hidden font-sans text-xs font-medium text-slate-500 sm:inline">
      {label}
    </span>
    <span className="font-mono text-xs text-slate-900">{value}</span>
  </div>
);
