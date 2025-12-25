import React, { useEffect, useRef } from 'react';

// --- CSS Styles ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-overlay: rgba(255, 255, 255, 0.9);
    --font-ui: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  /* --- BACKDROP OVERLAY --- */
  .blueprint-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--c-overlay);
    /* Technical Grid Pattern for Backdrop */
    background-image: 
      linear-gradient(to right, #e2e8f0 1px, transparent 1px),
      linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
    background-size: 40px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.1s linear;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* --- DIALOG CONTAINER --- */
  .blueprint-dialog-window {
    width: 500px;
    max-width: 90vw;
    background-color: var(--c-canvas);
    border: 2px solid var(--c-text-main); /* Heavier border for modal */
    box-shadow: none; /* NO SHADOW */
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* Decorative "Crop Marks" at corners */
  .blueprint-dialog-window::before,
  .blueprint-dialog-window::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 2px solid var(--c-text-main);
    transition: all 0.2s;
  }
  .blueprint-dialog-window::before { top: -6px; left: -6px; border-right: none; border-bottom: none; }
  .blueprint-dialog-window::after { bottom: -6px; right: -6px; border-left: none; border-top: none; }

  /* --- HEADER --- */
  .blueprint-dialog-header {
    background: var(--c-text-main);
    color: #ffffff;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--c-text-main);
  }

  .blueprint-dialog-title {
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .blueprint-dialog-id {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: #94a3b8;
  }

  /* --- BODY --- */
  .blueprint-dialog-body {
    padding: 24px;
    font-family: var(--font-ui);
    color: var(--c-text-main);
    line-height: 1.5;
  }

  .blueprint-dialog-desc {
    font-size: 0.95rem;
    margin-bottom: 16px;
  }

  /* Technical Details Box inside Dialog */
  .blueprint-spec-box {
    background: #f1f5f9;
    border: 1px dashed var(--c-text-sub);
    padding: 12px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--c-text-sub);
  }

  /* --- FOOTER / ACTIONS --- */
  .blueprint-dialog-footer {
    padding: 16px;
    border-top: 1px solid var(--c-border);
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background: #f8fafc;
  }

  .blueprint-btn {
    padding: 10px 20px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid var(--c-text-main);
    transition: none;
  }

  .blueprint-btn.secondary {
    background: transparent;
    color: var(--c-text-main);
  }
  .blueprint-btn.secondary:hover {
    background: #e2e8f0;
    text-decoration: underline;
  }

  .blueprint-btn.primary {
    background: var(--c-text-main);
    color: #ffffff;
  }
  .blueprint-btn.primary:hover {
    background: #334155; /* Slate-700 */
    outline: 2px solid #cbd5e1; /* Focus ring simulation */
  }

  /* Close Icon Top Right */
  .blueprint-close-icon {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    line-height: 0.5;
  }
`;

const BlueprintDialog = ({
  isOpen,
  onClose,
  title = 'System Alert',
  id = 'MSG-001',
  children,
  primaryAction,
  primaryLabel = 'Confirm',
  secondaryLabel = 'Cancel',
}) => {
  const dialogRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Lock scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-overlay" onClick={handleBackdropClick}>
        <div
          className="blueprint-dialog-window"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="blueprint-dialog-header">
            <div>
              <span className="blueprint-dialog-title">{title} </span>
              <span className="blueprint-dialog-id">// REF: {id}</span>
            </div>
            <button className="blueprint-close-icon" onClick={onClose}>
              ×
            </button>
          </div>

          {/* Body */}
          <div className="blueprint-dialog-body">{children}</div>

          {/* Footer / Command Bar */}
          <div className="blueprint-dialog-footer">
            <button className="blueprint-btn secondary" onClick={onClose}>
              [{secondaryLabel}]
            </button>
            <button
              className="blueprint-btn primary"
              onClick={() => {
                if (primaryAction) primaryAction();
                onClose();
              }}
            >
              &lt;{primaryLabel}&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Usage Example ---
export default function App() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div
      style={{
        padding: '50px',
        background: '#f8fafc',
        height: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        style={{
          padding: '12px 24px',
          background: '#fff',
          border: '1px solid #0f172a',
          fontFamily: 'monospace',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        OPEN_DIALOG_MODULE()
      </button>

      {/* The Dialog Component */}
      <BlueprintDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Confirm Override"
        id="AUTH-992"
        primaryLabel="EXECUTE"
        secondaryLabel="ABORT"
        primaryAction={() => alert('Sequence Started')}
      >
        <p className="blueprint-dialog-desc">
          You are about to modify the core configuration parameters. This action
          cannot be undone by the automated rollback system.
        </p>

        {/* Technical context inside the modal */}
        <div className="blueprint-spec-box">
          TARGET: NODE_CLUSTER_04
          <br />
          PERMISSIONS: ROOT_ACCESS
          <br />
          TIMESTAMP: {new Date().toISOString().split('T')[0]}
        </div>
      </BlueprintDialog>
    </div>
  );
}
