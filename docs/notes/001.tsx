import {
  Activity,
  Clock,
  Cpu,
  Database,
  Folder,
  Grid,
  HardDrive,
  Maximize2,
  Minus,
  Settings,
  Terminal,
  Wifi,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// --- Styles Configuration (Mapping to your specific palette) ---
// Using Tailwind classes that approximate the hex codes:
// Bg Outer: bg-slate-50 (#f8fafc)
// Canvas: bg-white (#ffffff)
// Border: border-slate-300 (#cbd5e1)
// Text Main: text-slate-900 (#0f172a)
// Text Sub: text-slate-500 (#64748b)

const BlueprintWindow = ({
  title,
  subtitle,
  icon: Icon,
  children,
  className = '',
  x = 0,
  y = 0,
  width = 'w-96',
}) => {
  return (
    <div
      className={`absolute border border-slate-300 bg-white shadow-none ${width} ${className}`}
      style={{ left: x, top: y }}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between border-b border-slate-300 bg-slate-50 px-3 py-2 select-none cursor-move">
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon size={16} className="text-slate-900" strokeWidth={1.5} />
          )}
          <div className="flex flex-col leading-none">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900">
              {title}
            </span>
            {subtitle && (
              <span className="font-mono text-[10px] text-slate-500">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <button className="text-slate-400 hover:text-slate-900">
            <Minus size={14} />
          </button>
          <button className="text-slate-400 hover:text-slate-900">
            <Maximize2 size={14} />
          </button>
          <button className="text-slate-400 hover:text-red-600">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-0">{children}</div>
    </div>
  );
};

const MetricRow = ({ label, value, unit }) => (
  <div className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0 hover:bg-slate-50 px-4">
    <span className="font-mono text-xs text-slate-500">{label}</span>
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

export default function EngineeringOS() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false }),
  );

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50 font-sans text-slate-900 selection:bg-slate-200 selection:text-slate-900">
      {/* --- TOP SYSTEM BAR --- */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-300 bg-white px-4">
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
          <StatusBarItem icon={Wifi} label="NET_STS" value="CONNECTED_5G" />
          <StatusBarItem icon={Cpu} label="CPU_LD" value="12%" />
          <StatusBarItem icon={Clock} label="LOC_TIME" value={time} />
        </div>
      </header>

      {/* --- MAIN DESKTOP AREA --- */}
      <main className="relative flex-1 overflow-hidden p-6">
        {/* Background Grid Lines (Abstract) */}
        <div className="pointer-events-none absolute inset-0 flex justify-between opacity-10">
          <div className="h-full w-px bg-slate-900"></div>
          <div className="h-full w-px bg-slate-900"></div>
          <div className="h-full w-px bg-slate-900"></div>
          <div className="h-full w-px bg-slate-900"></div>
        </div>

        {/* Window 1: System Monitor */}
        <BlueprintWindow
          title="System Monitor"
          subtitle="PID: 8821.A"
          icon={Activity}
          x="5%"
          y="5%"
          width="w-80"
        >
          <div className="bg-slate-50 p-2">
            <div className="mb-2 border border-slate-300 bg-white p-2">
              <div className="mb-1 flex justify-between">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Core_Load_Graph
                </span>
                <span className="font-mono text-[10px] text-slate-900">
                  RUNNING
                </span>
              </div>
              <div className="flex h-16 items-end gap-1 border-b border-l border-slate-200 p-1">
                {[40, 65, 32, 50, 78, 45, 60, 30, 55, 40].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-slate-900 hover:bg-slate-700"
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
          <div className="border-t border-slate-300 bg-slate-50 p-2 text-center">
            <button className="w-full border border-slate-300 bg-white py-1 font-mono text-xs hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
              EXECUTE_DIAGNOSTICS
            </button>
          </div>
        </BlueprintWindow>

        {/* Window 2: File Explorer */}
        <BlueprintWindow
          title="File Registry"
          subtitle="MOUNT: /USR/LOCAL"
          icon={HardDrive}
          x="40%"
          y="15%"
          width="w-[500px]"
        >
          <div className="flex h-64">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-slate-300 bg-slate-50 py-2">
              {['ROOT', 'BIN', 'ETC', 'VAR', 'HOME'].map((dir) => (
                <div
                  key={dir}
                  className="flex cursor-pointer items-center gap-2 px-4 py-1.5 hover:bg-slate-200"
                >
                  <Folder size={12} className="text-slate-500" />
                  <span className="font-mono text-xs text-slate-900">
                    /{dir}
                  </span>
                </div>
              ))}
            </div>
            {/* File List */}
            <div className="flex-1 bg-white p-0">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-medium text-slate-500">
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
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2 font-mono text-slate-900">
                      config.json
                    </td>
                    <td className="px-4 py-2 font-mono text-slate-500">2KB</td>
                    <td className="px-4 py-2 font-mono text-slate-400">
                      Oct 24
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2 font-mono text-slate-900">
                      sys_log.txt
                    </td>
                    <td className="px-4 py-2 font-mono text-slate-500">14MB</td>
                    <td className="px-4 py-2 font-mono text-slate-400">
                      Oct 23
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2 font-mono text-slate-900">
                      index.js
                    </td>
                    <td className="px-4 py-2 font-mono text-slate-500">45KB</td>
                    <td className="px-4 py-2 font-mono text-slate-400">
                      Oct 22
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between border-t border-slate-300 bg-slate-50 px-3 py-1.5">
            <span className="font-mono text-[10px] text-slate-500">
              3 OBJECTS SELECTED
            </span>
            <span className="font-mono text-[10px] text-slate-500">
              TOTAL: 14.5MB
            </span>
          </div>
        </BlueprintWindow>

        {/* Window 3: Terminal */}
        <BlueprintWindow
          title="Terminal Output"
          subtitle="BASH // TTY1"
          icon={Terminal}
          x="25%"
          y="55%"
          width="w-[600px]"
        >
          <div className="bg-white p-4 font-mono text-xs">
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
              <div>File sizes after gzip:</div>
              <div className="mt-1 flex gap-4">
                <span>46.23 KB</span>
                <span className="text-slate-400">build/static/js/main.js</span>
              </div>
              <div className="flex gap-4">
                <span>1.45 KB</span>
                <span className="text-slate-400">
                  build/static/css/main.css
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">user@sys-01:~$</span>
              <span className="h-4 w-2 animate-pulse bg-slate-900"></span>
            </div>
          </div>
        </BlueprintWindow>
      </main>

      {/* --- BOTTOM DOCK --- */}
      <footer className="flex h-14 shrink-0 items-center justify-center border-t border-slate-300 bg-white px-4">
        <div className="flex items-center gap-6 rounded-none border border-slate-300 bg-slate-50 px-6 py-2">
          <button className="group flex flex-col items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center border border-transparent bg-slate-900 text-white transition-all group-hover:border-slate-900 group-hover:bg-white group-hover:text-slate-900">
              <Grid size={16} />
            </div>
          </button>
          <div className="h-4 w-px bg-slate-300"></div>
          {[Terminal, Folder, Activity, Database, Settings].map((Icon, idx) => (
            <button
              key={idx}
              className="group relative flex flex-col items-center gap-1"
            >
              <div className="flex h-8 w-8 items-center justify-center border border-transparent text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-900 active:translate-y-px transition-all">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              {/* Indicator for active app */}
              {idx === 0 && (
                <div className="absolute -bottom-3 h-1 w-1 bg-slate-900"></div>
              )}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
