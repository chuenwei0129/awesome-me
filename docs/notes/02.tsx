import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Terminal,
  XCircle,
} from 'lucide-react';
import React from 'react';

// --- Types ---
type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

// --- Alert Component ---
const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  title,
  description,
  icon,
  className = '',
}) => {
  // 1. Variant Styles
  // Defines color schemes for icon and text based on variant
  const variants = {
    default: {
      container: 'bg-white border-slate-200 text-slate-950',
      iconColor: 'text-slate-950', // Dark icon for default "Heads up"
      defaultIcon: Info,
    },
    destructive: {
      container:
        'border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600',
      iconColor: 'text-red-600',
      defaultIcon: XCircle,
    },
    success: {
      container:
        'border-emerald-500/50 text-emerald-900 [&>svg]:text-emerald-600',
      iconColor: 'text-emerald-600',
      defaultIcon: CheckCircle2,
    },
    warning: {
      container: 'border-amber-500/50 text-amber-900 [&>svg]:text-amber-600',
      iconColor: 'text-amber-600',
      defaultIcon: AlertTriangle,
    },
  };

  const style = variants[variant] || variants.default;
  const IconComponent = style.defaultIcon;

  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${style.container} ${className}`}
    >
      {/* Icon Positioned Absolutely to top-left */}
      <div className={style.iconColor}>
        {icon ? icon : <IconComponent className="h-4 w-4" />}
      </div>

      {/* Content */}
      <div className="pl-7">
        <h5 className="mb-1 font-medium leading-none tracking-tight">
          {title}
        </h5>
        {description && (
          <div className="text-sm text-slate-500 opacity-90">{description}</div>
        )}
      </div>
    </div>
  );
};

// --- Usage & Demo ---
const AlertDemo = () => {
  return (
    <div className="min-h-screen bg-white p-12 flex flex-col items-center justify-start gap-8 font-sans text-slate-900">
      {/* Header for Context */}
      <div className="w-full max-w-2xl pb-6 border-b border-slate-100 mb-4">
        <h1 className="text-xl font-bold">Alert Component</h1>
        <p className="text-slate-500 text-sm">Rounded, outlined style.</p>
      </div>

      {/* 1. Exact Match to Image */}
      <div className="w-full max-w-2xl">
        <Alert
          variant="default"
          title="Heads up!"
          description="Describe what can be done about it here."
        />
      </div>

      {/* 2. Variant: Destructive/Error */}
      <div className="w-full max-w-2xl">
        <Alert
          variant="destructive"
          title="Error"
          description="Your session has expired. Please log in again."
        />
      </div>

      {/* 3. Variant: Success */}
      <div className="w-full max-w-2xl">
        <Alert
          variant="success"
          title="Order Completed"
          description="We have sent the receipt to your email address."
        />
      </div>

      {/* 4. Custom Icon Example */}
      <div className="w-full max-w-2xl">
        <Alert
          title="Terminal Output"
          description="npm install dependencies completed in 2.4s"
          icon={<Terminal className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default AlertDemo;
