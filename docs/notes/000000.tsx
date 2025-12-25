import React, { useCallback, useEffect, useState } from 'react';

// --- 1. 图标定义 (SVG) ---
const Icons = {
  info: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  warning: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  loading: (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
};

// --- 2. 样式配置 (Tailwind 映射) ---
const Styles = {
  info: {
    border: 'border-slate-300',
    iconBox: 'border-slate-900 text-slate-900',
    progress: 'bg-slate-900',
  },
  success: {
    border: 'border-slate-300', // 保持外框统一灰色，只在内部做区分
    iconBox: 'border-green-700 text-green-700',
    progress: 'bg-green-700',
  },
  warning: {
    border: 'border-slate-300',
    iconBox: 'border-amber-700 text-amber-700',
    progress: 'bg-amber-700',
  },
  error: {
    border: 'border-slate-300',
    iconBox: 'border-red-700 text-red-700',
    progress: 'bg-red-700',
  },
  loading: {
    border: 'border-slate-300',
    iconBox: 'border-slate-500 text-slate-500',
    progress: 'bg-slate-500',
  },
};

// --- 3. 单个 Toast 组件 ---
const ToastItem = ({ id, type, content, duration, showClose, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const style = Styles[type];

  // 处理关闭动画
  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(id), 200); // 等待 CSS 动画结束
  }, [id, onClose]);

  // 自动关闭逻辑
  useEffect(() => {
    if (duration === null || type === 'loading') return;
    const timer = setTimeout(triggerClose, duration);
    return () => clearTimeout(timer);
  }, [duration, type, triggerClose]);

  return (
    <div
      className={`
        relative w-96 bg-white border-2 transition-all duration-200 ease-out mb-3
        ${style.border}
        ${isClosing ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
      `}
    >
      {/* HEADER: 模仿图纸标题栏 */}
      <div className="flex justify-between items-center bg-slate-50 border-b border-slate-200 px-3 py-1.5 select-none">
        <span className="font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          TYPE: {type}
        </span>
        {showClose && (
          <button
            onClick={triggerClose}
            className="font-mono text-[10px] text-slate-400 hover:text-slate-900 hover:bg-slate-200 px-1 border border-transparent hover:border-slate-300 transition-colors"
          >
            [CLOSE]
          </button>
        )}
      </div>

      {/* BODY: 内容区域 */}
      <div className="flex items-start gap-3 p-4">
        {/* ICON BOX */}
        <div
          className={`flex items-center justify-center w-6 h-6 border bg-slate-50 flex-shrink-0 ${style.iconBox}`}
        >
          {Icons[type]}
        </div>
        {/* TEXT */}
        <p className="font-sans text-sm font-medium text-slate-900 leading-snug">
          {content}
        </p>
      </div>

      {/* FOOTER: 进度条 (仅当有持续时间且非 loading 时显示) */}
      {duration !== null && type !== 'loading' && (
        <div className="w-full h-1 bg-slate-100 border-t border-slate-200 overflow-hidden relative">
          <div
            className={`h-full absolute left-0 top-0 ${style.progress}`}
            style={{
              width: '100%',
              animation: `progress-shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* 全局 Style 用于 Keyframes (放在这里是为了演示方便，实际项目建议放在 CSS 文件中) */}
      <style>{`
        @keyframes progress-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// --- 4. 容器与 Hook ---

// 全局 Toast 上下文（为了简化 Demo，这里直接在组件内实现）
// 在真实项目中，你通常会将这个逻辑放入 Context Provider

export const ToastSystem = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, content, options = {}) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      type,
      content,
      duration: options.duration !== undefined ? options.duration : 3000,
      showClose: options.showClose !== undefined ? options.showClose : true,
    };
    // 堆叠逻辑：新消息追加到数组末尾
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 暴露 API 给演示按钮
  const toast = {
    info: (msg, opts) => addToast('info', msg, opts),
    success: (msg, opts) => addToast('success', msg, opts),
    warning: (msg, opts) => addToast('warning', msg, opts),
    error: (msg, opts) => addToast('error', msg, opts),
    loading: (msg, opts) => addToast('loading', msg, opts),
  };

  return { toasts, toast, removeToast };
};

// --- 5. 主页面 Demo ---
export default function BlueprintToastDemo() {
  const { toasts, toast, removeToast } = ToastSystem();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10 font-sans text-slate-900">
      {/* 页面标题区 */}
      <div className="max-w-4xl mx-auto mb-10 border-b-2 border-slate-300 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          Flat Engineering UI <span className="text-slate-400">///</span>{' '}
          Components
        </h1>
        <p className="font-mono text-sm text-slate-500 mt-2">
          MODULE: TOAST_NOTIFICATIONS / RENDERER: REACT_TAILWIND
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* 区域 1: 堆叠测试 */}
        <section className="bg-white border border-slate-300 p-6">
          <h2 className="font-mono text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">
            01. Stacking Behavior
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() =>
                toast.info(
                  `Log entry #${Math.floor(Math.random() * 1000)} generated.`,
                )
              }
              className="px-4 py-2 border border-slate-900 bg-white hover:bg-slate-900 hover:text-white font-mono text-sm transition-colors"
            >
              [CLICK] STACK INFO
            </button>
            <button
              onClick={() =>
                toast.warning('System unstable. Retrying connection...', {
                  duration: 4000,
                })
              }
              className="px-4 py-2 border border-amber-700 text-amber-700 bg-white hover:bg-amber-700 hover:text-white font-mono text-sm transition-colors"
            >
              [CLICK] STACK WARNING
            </button>
          </div>
          <p className="text-slate-400 text-xs mt-3 font-mono">
            * Multiple clicks will pile up toasts in the container.
          </p>
        </section>

        {/* 区域 2: 倒计时与 Loading */}
        <section className="bg-white border border-slate-300 p-6">
          <h2 className="font-mono text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">
            02. Duration & Progress
          </h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() =>
                toast.success('Data export completed successfully.', {
                  duration: 5000,
                })
              }
              className="px-4 py-2 border border-green-700 text-green-700 bg-white hover:bg-green-700 hover:text-white font-mono text-sm transition-colors"
            >
              SHOW PROGRESS (5s)
            </button>

            <button
              onClick={() =>
                toast.error('Critical failure. Manual override required.', {
                  duration: 10000,
                })
              }
              className="px-4 py-2 border border-red-700 text-red-700 bg-white hover:bg-red-700 hover:text-white font-mono text-sm transition-colors"
            >
              LONG DURATION (10s)
            </button>

            <button
              onClick={() =>
                toast.loading('Compiling assets...', { duration: null })
              }
              className="px-4 py-2 border border-slate-400 text-slate-500 bg-white hover:bg-slate-100 font-mono text-sm transition-colors"
            >
              LOADING (NO CLOSE)
            </button>
          </div>
        </section>
      </div>

      {/* --- 全局 Toast 容器 (固定定位) --- */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        {/* 
          pointer-events-none 确保容器不阻挡下方点击，
          但在 ToastItem 内部需要 pointer-events-auto (已在CSS实现)
        */}
        <div className="flex flex-col gap-3 pointer-events-auto">
          {toasts.map((t) => (
            <ToastItem key={t.id} {...t} onClose={removeToast} />
          ))}
        </div>
      </div>
    </div>
  );
}
