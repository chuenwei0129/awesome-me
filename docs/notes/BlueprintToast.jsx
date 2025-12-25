import { useCallback, useEffect, useState } from 'react';
import './BlueprintToast.css';

// --- 图标组件 (SVG Paths) ---
const Icons = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  loading: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="bp-icon-spin"
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

// --- 单个 Toast 组件 ---
const ToastItem = ({ id, type, content, duration, showClose, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // 等待动画结束后再从 DOM 移除
    setTimeout(() => {
      onClose(id);
    }, 200);
  }, [id, onClose]);

  useEffect(() => {
    // 如果 duration 为 null，则不自动关闭
    if (duration === null || type === 'loading') return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose, type]);

  return (
    <div
      className={`bp-toast bp-toast-${type} ${isClosing ? 'is-closing' : ''}`}
    >
      {/* 头部：模仿工程图纸的元数据区 */}
      <div className="bp-toast-header">
        <span className="bp-toast-type-label">TYPE: {type}</span>
        {showClose && (
          <button className="bp-toast-close-btn" onClick={handleClose}>
            [ESC]
          </button>
        )}
      </div>

      {/* 内容区 */}
      <div className="bp-toast-body">
        <div className="bp-toast-icon">{Icons[type]}</div>
        <div className="bp-toast-message">{content}</div>
      </div>
    </div>
  );
};

// --- Toast 管理容器 (可放在 App 根目录) ---
// 实际项目中通常使用 Context 或 EventBus 来触发 addToast
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="bp-toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

// --- 使用示例 Hook (简单的实现) ---
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, content, options = {}) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const newToast = {
      id,
      type,
      content,
      duration: options.duration !== undefined ? options.duration : 3000, // 默认 3s
      showClose: options.showClose !== undefined ? options.showClose : true, // 默认显示关闭
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 暴露给外部的 API
  const toast = {
    info: (content, opts) => addToast('info', content, opts),
    success: (content, opts) => addToast('success', content, opts),
    warning: (content, opts) => addToast('warning', content, opts),
    error: (content, opts) => addToast('error', content, opts),
    loading: (content, opts) => addToast('loading', content, opts),
  };

  return { toasts, toast, removeToast };
};

// --- Demo 组件 ---
const BlueprintToastDemo = () => {
  const { toasts, toast, removeToast } = useToast();

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh' }}>
      <h1>Flat Engineering Blueprint UI</h1>
      <hr
        style={{
          border: 'none',
          borderBottom: '1px solid #cbd5e1',
          margin: '20px 0',
        }}
      />

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() =>
            toast.info('System initialization complete. Waiting for input.')
          }
        >
          Info Toast
        </button>
        <button
          onClick={() =>
            toast.success('Data compilation successful. Index updated.')
          }
        >
          Success Toast
        </button>
        <button
          onClick={() =>
            toast.warning('Memory usage at 85%. Optimization recommended.')
          }
        >
          Warning Toast
        </button>
        <button
          onClick={() =>
            toast.error('Connection timeout. Failed to reach host 127.0.0.1.')
          }
        >
          Error Toast
        </button>
        <button
          onClick={() =>
            toast.loading('Synchronizing database shards...', {
              duration: null,
            })
          }
        >
          Loading (No Auto-Close)
        </button>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default BlueprintToastDemo;
