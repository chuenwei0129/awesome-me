import {
  CheckCircle2,
  CircleX,
  Hash,
  Info,
  Loader2,
  Terminal,
  TriangleAlert,
  X,
} from 'lucide-react';
import React from 'react';

// --- Types ---
type NotificationType = 'loading' | 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string; // Optional technical detail
  onClose?: () => void;
  className?: string;
}

// --- Blueprint Notification Component ---
const BlueprintNotification: React.FC<NotificationProps> = ({
  type,
  message,
  description,
  onClose,
  className = '',
}) => {
  // 1. CONFIGURATION MAP
  // Maps status types to icons, colors, and technical codes
  const config = {
    loading: {
      icon: Loader2,
      borderColor: 'border-slate-400',
      textColor: 'text-slate-600',
      iconColor: 'text-slate-500',
      code: 'STAT: PENDING',
      bgColor: 'bg-slate-50',
    },
    error: {
      icon: CircleX,
      borderColor: 'border-red-500',
      textColor: 'text-red-900',
      iconColor: 'text-red-600',
      code: 'STAT: CRITICAL',
      bgColor: 'bg-red-50/50',
    },
    success: {
      icon: CheckCircle2,
      borderColor: 'border-emerald-500',
      textColor: 'text-emerald-900',
      iconColor: 'text-emerald-600',
      code: 'STAT: OK',
      bgColor: 'bg-emerald-50/50',
    },
    warning: {
      icon: TriangleAlert,
      borderColor: 'border-amber-500',
      textColor: 'text-amber-900',
      iconColor: 'text-amber-600',
      code: 'STAT: WARN',
      bgColor: 'bg-amber-50/50',
    },
    info: {
      icon: Info,
      borderColor: 'border-blue-400',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-600',
      code: 'STAT: INFO',
      bgColor: 'bg-blue-50/50',
    },
  };

  const {
    icon: Icon,
    borderColor,
    textColor,
    iconColor,
    code,
    bgColor,
  } = config[type];

  return (
    <div
      className={`relative flex items-start gap-4 p-4 border-l-4 border-y border-r ${borderColor} ${bgColor} ${className} shadow-none`}
    >
      {/* Icon Area */}
      <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
        <Icon
          size={20}
          className={type === 'loading' ? 'animate-spin' : ''}
          strokeWidth={1.5}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold font-sans ${textColor}`}>
          {message}
        </h4>

        {/* Technical Sub-line (Optional) */}
        {description && (
          <p className="mt-1 text-xs text-slate-500 font-sans">{description}</p>
        )}

        {/* Technical Metadata Badge */}
        <div className="mt-2 inline-flex items-center gap-2 border border-slate-200 bg-white px-1.5 py-0.5">
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            {code}
          </span>
        </div>
      </div>

      {/* Close Action */}
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={16} />
        </button>
      )}

      {/* Decorative Corner Marker (Blueprint Style) */}
      <div
        className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${borderColor} opacity-50`}
      />
    </div>
  );
};

// --- Main Specification Sheet Layout ---
const NotificationSpec = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans flex justify-center items-start">
      {/* DIAGRAM CANVAS */}
      <div className="w-full max-w-3xl bg-white border border-slate-300 shadow-none flex flex-col">
        {/* HEADER */}
        <header className="border-b border-slate-300 p-6 flex justify-between items-end bg-white">
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Hash size={14} />
              <span className="font-mono text-xs">SPEC-UI-04</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
              System Feedback
            </h1>
            <p className="font-mono text-xs text-slate-500 mt-1 uppercase tracking-wide">
              Component: Toast / Alert
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-mono text-xs text-slate-400 flex items-center gap-2 justify-end">
              <Terminal size={12} />
              <span>LOG: VERBOSE</span>
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="p-8 grid gap-8">
          {/* SECTION: PREVIEW LIST */}
          <div className="flex items-center gap-4 mb-2 border-b border-slate-200 pb-2">
            <div className="w-1.5 h-1.5 bg-slate-900" />
            <h2 className="font-mono text-sm font-bold text-slate-500 uppercase">
              01. Message Types
            </h2>
          </div>

          <div className="space-y-4">
            {/* 1. Loading */}
            <BlueprintNotification
              type="loading"
              message="这是一条 loading message"
              description="Establishing secure connection..."
            />

            {/* 2. Error */}
            <BlueprintNotification
              type="error"
              message="这是一条 error message"
              description="Code: ERR_CONNECTION_REFUSED"
            />

            {/* 3. Success */}
            <BlueprintNotification
              type="success"
              message="这是一条 success message"
            />

            {/* 4. Warning */}
            <BlueprintNotification
              type="warning"
              message="这是一条 warning message"
              description="Disk usage at 85% capacity."
              onClose={() => console.log('closed')}
            />

            {/* 5. Info */}
            <BlueprintNotification
              type="info"
              message="这是一条 info message"
            />
          </div>

          {/* FOOTER */}
          <footer className="mt-8 border-t border-slate-300 pt-6 flex justify-between text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-300 mr-2">BORDER-WIDTH</span>
              <span>L:4px T/R/B:1px</span>
            </div>
            <div>ANIMATION: NONE</div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default NotificationSpec;
