import React, { useCallback, useEffect, useRef, useState } from 'react';
import './BlueprintToast.css';

// ...Icons 对象保持不变 (见上文)...
const Icons = {
  /* ...与之前代码一致... */
};

// --- 单个 Toast 组件 (已更新倒计时逻辑) ---
const ToastItem = ({
  id,
  type,
  content,
  duration,
  showClose,
  showCountdown,
  onClose,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  // 引用，用于清除定时器
  const timerRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 200);
  }, [id, onClose]);

  useEffect(() => {
    // 如果 duration 为 null 或 type 为 loading，不自动关闭
    if (duration === null || type === 'loading') return;

    // 如果开启了可视化倒计时
    if (showCountdown) {
      const intervalMs = 100; // 刷新频率 100ms
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - intervalMs;
          if (next <= 0) {
            clearInterval(timerRef.current);
            handleClose();
            return 0;
          }
          return next;
        });
      }, intervalMs);
    } else {
      // 普通倒计时（无视觉反馈）
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(timerRef.current);
    };
  }, [duration, handleClose, type, showCountdown]);

  // 格式化时间显示 (例如: 04.5s)
  const formatTime = (ms) => {
    return (ms / 1000).toFixed(1) + 's';
  };

  return (
    <div
      className={`bp-toast bp-toast-${type} ${isClosing ? 'is-closing' : ''}`}
    >
      <div className="bp-toast-header">
        <span className="bp-toast-type-label">TYPE: {type}</span>
        {showClose && (
          <button className="bp-toast-close-btn" onClick={handleClose}>
            [ESC]
          </button>
        )}
      </div>

      <div className="bp-toast-body">
        {/* 这里的 Icons 需要确保你在上面定义了，或者从上个回复复制 */}
        <div className="bp-toast-icon">
          {/* 简写演示，实际代码请保留上面的 Icons[type] */}
          {type === 'info' && <span style={{ fontSize: 12 }}>i</span>}
          {type !== 'info' && <span style={{ fontSize: 12 }}>!</span>}
        </div>
        <div className="bp-toast-message">{content}</div>
      </div>

      {/* 新增：倒计时底部栏 */}
      {showCountdown && duration !== null && (
        <div className="bp-toast-footer">
          <span className="bp-timer-label">AUTO_DISMISS_TIMER</span>
          <span className="bp-timer-value">
            T-MINUS: {formatTime(timeLeft)}
          </span>
        </div>
      )}
    </div>
  );
};

// --- Toast Container 保持不变 ---
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="bp-toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

// --- useToast Hook (增加 showCountdown 选项) ---
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, content, options = {}) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const newToast = {
      id,
      type,
      content,
      duration: options.duration !== undefined ? options.duration : 3000,
      showClose: options.showClose !== undefined ? options.showClose : true,
      showCountdown: options.showCountdown || false, // 新增参数
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = {
    info: (msg, opts) => addToast('info', msg, opts),
    success: (msg, opts) => addToast('success', msg, opts),
    warning: (msg, opts) => addToast('warning', msg, opts),
    error: (msg, opts) => addToast('error', msg, opts),
    loading: (msg, opts) => addToast('loading', msg, opts),
  };

  return { toasts, toast, removeToast };
};

// --- Demo 演示组件 ---
export const BlueprintToastDemo = () => {
  const { toasts, toast, removeToast } = useToast();

  // 功能 1：模拟堆叠通知
  const triggerStack = () => {
    // 快速连续触发，模拟系统日志爆发
    setTimeout(() => toast.info('System Check: CPU OK'), 0);
    setTimeout(() => toast.info('System Check: Memory OK'), 150);
    setTimeout(() => toast.success('Module [CORE] loaded successfully'), 300);
    setTimeout(() => toast.warning('Temperature rising (45°C)'), 450);
  };

  // 功能 2：倒计时通知
  const triggerCountdown = () => {
    toast.error('Security breach detected. System lockdown initiated.', {
      duration: 5000,
      showCountdown: true, // 开启倒计时显示
      showClose: true,
    });
  };

  return (
    <div
      style={{
        padding: '40px',
        background: '#f8fafc',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ color: '#0f172a' }}>Blueprint UI Control Panel</h2>
      <hr
        style={{
          border: 'none',
          borderBottom: '1px solid #cbd5e1',
          margin: '20px 0',
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {/* 基础按钮组 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => toast.success('Operation Successful')}>
            Standard Toast
          </button>
        </div>

        {/* 新功能按钮 */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {/* 堆叠测试按钮 */}
          <button
            onClick={triggerStack}
            style={{
              padding: '10px 20px',
              border: '2px solid #0f172a',
              background: '#fff',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            [TEST] TRIGGER BATCH LOGS
          </button>

          {/* 倒计时按钮 */}
          <button
            onClick={triggerCountdown}
            style={{
              padding: '10px 20px',
              border: '2px solid #b91c1c', // Red border for urgency
              color: '#b91c1c',
              background: '#fff',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            [WARN] INITIATE SELF-DESTRUCT
          </button>
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default BlueprintToastDemo;
