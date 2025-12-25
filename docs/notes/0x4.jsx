import {
  Activity,
  ChevronRight,
  Database,
  Paperclip,
  Settings,
  Upload,
  X,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';

const EngineeringUploadOptimized = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([
    {
      id: 'F01',
      name: 'sys_config_v2.json',
      size: '12 KB',
      type: 'JSON',
      status: 'READY',
    },
    {
      id: 'F02',
      name: 'trace_log_2024.txt',
      size: '2.4 MB',
      type: 'TEXT',
      status: 'READY',
    },
  ]);

  const handleDrag = useCallback((e, state) => {
    e.preventDefault();
    setIsDragging(state);
  }, []);

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 md:p-12 font-sans text-[#0f172a] flex justify-center items-center">
      {/* MAIN CHASSIS: The primary container */}
      <div className="w-full max-w-3xl bg-white border border-[#cbd5e1] shadow-none relative flex flex-col">
        {/* TOP RULER MARKINGS (Decorative) */}
        <div className="absolute top-0 left-0 right-0 h-1 flex justify-between px-1 overflow-hidden opacity-50">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-px h-1 bg-[#cbd5e1]" />
          ))}
        </div>

        {/* HEADER: CAD Title Block Style */}
        <div className="grid grid-cols-[1fr_auto] border-b border-[#cbd5e1]">
          <div className="p-5 border-r border-[#cbd5e1]">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-[#0f172a]" />
              <h1 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
                Data_Ingestion_Unit
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none"></span>
                <span className="text-[10px] font-mono text-[#64748b]">
                  SYS_ONLINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#cbd5e1]">|</span>
              <span className="text-[10px] font-mono text-[#64748b]">
                PORT:8080
              </span>
            </div>
          </div>
          <div className="p-5 flex flex-col items-end justify-center bg-[#f8fafc]">
            <span className="text-[10px] font-mono text-[#64748b] uppercase">
              REF_ID
            </span>
            <span className="text-sm font-mono font-bold text-[#0f172a]">
              #UX-992-04
            </span>
          </div>
        </div>

        {/* BODY CONTAINER */}
        <div className="p-6 space-y-8">
          {/* MODULE 1: MANIFEST (File List) */}
          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] flex items-center gap-1.5">
                  <Database size={12} /> Mounted_Volumes
                </label>
                <div className="h-px flex-1 bg-[#cbd5e1] mx-4 opacity-50"></div>
                <span className="text-[10px] font-mono text-[#0f172a] bg-[#f1f5f9] px-1 border border-[#cbd5e1]">
                  CNT: {files.length}
                </span>
              </div>

              {/* Strict Data Grid */}
              <div className="border border-[#cbd5e1] text-xs font-mono">
                <div className="grid grid-cols-[3rem_1fr_4rem_3rem] gap-2 bg-[#f1f5f9] px-3 py-2 border-b border-[#cbd5e1] text-[#64748b] font-bold">
                  <span>ID</span>
                  <span>FILENAME</span>
                  <span>SIZE</span>
                  <span className="text-right">ACT</span>
                </div>
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="grid grid-cols-[3rem_1fr_4rem_3rem] gap-2 px-3 py-2.5 border-b border-[#cbd5e1] last:border-0 items-center hover:bg-[#f8fafc] group transition-colors"
                  >
                    <span className="text-[#94a3b8]">{file.id}</span>
                    <span className="text-[#0f172a] truncate font-medium">
                      {file.name}
                    </span>
                    <span className="text-[#64748b]">{file.size}</span>
                    <div className="text-right">
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-[#94a3b8] hover:text-red-600 hover:bg-red-50 p-1 -mr-1 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 2: INPUT TERMINAL */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] flex items-center gap-1.5">
              <ChevronRight size={12} /> Command_Stream
            </label>

            <div
              onDragOver={(e) => handleDrag(e, true)}
              onDragLeave={(e) => handleDrag(e, false)}
              onDrop={(e) => handleDrag(e, false)}
              className={`
                        relative group border-2 transition-all duration-200
                        ${
                          isDragging
                            ? 'border-[#0f172a] bg-[#f1f5f9]'
                            : 'border-[#cbd5e1] bg-white hover:border-[#94a3b8]'
                        }
                    `}
            >
              {/* Interactive Corners (Visible on Hover) */}
              <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-l-2 border-t-2 border-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-r-2 border-t-2 border-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-l-2 border-b-2 border-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r-2 border-b-2 border-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="> Initialize input sequence..."
                className="w-full h-32 p-4 font-mono text-sm bg-transparent outline-none resize-none placeholder:text-[#cbd5e1] text-[#0f172a]"
              />

              {/* Terminal Status Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#f8fafc] border-t border-[#cbd5e1]">
                <button className="flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase border border-[#cbd5e1] bg-white text-[#0f172a] hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white transition-all">
                  <Paperclip size={10} />
                  <span>Attach_Source</span>
                </button>

                <div className="text-[10px] font-mono text-[#94a3b8] flex gap-3">
                  <span>Ln 1, Col {message.length}</span>
                  <span>UTF-8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER: CONTROL PANEL */}
        <div className="mt-auto flex items-center justify-between p-5 border-t border-[#cbd5e1] bg-[#f8fafc]">
          <div className="flex gap-4">
            <button
              className="text-[#94a3b8] hover:text-[#0f172a] transition-colors"
              title="Settings"
            >
              <Settings size={18} strokeWidth={1.5} />
            </button>
          </div>

          <button className="group flex items-center gap-3 px-6 py-2.5 bg-[#0f172a] text-white hover:bg-[#1e293b] active:translate-y-px transition-all shadow-[2px_2px_0px_#cbd5e1] hover:shadow-none border border-[#0f172a]">
            <span className="text-xs font-bold uppercase tracking-widest">
              Execute_Upload
            </span>
            <Upload
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngineeringUploadOptimized;
