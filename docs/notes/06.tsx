import { AlertCircle, Code, Terminal, X } from 'lucide-react';
import React, { useState } from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #f8fafc;        /* Page Background */
    --c-canvas: #ffffff;    /* Component Background */
    --c-border: #cbd5e1;    /* Slate-300 */
    --c-text-main: #0f172a; /* Slate-900 */
    --c-text-sub: #64748b;  /* Slate-500 */
    --c-accent: #3b82f6;    /* Tech Blue */
    
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --z-modal: 1000;
  }

  body {
    background-color: var(--c-bg);
    color: var(--c-text-main);
    font-family: var(--font-ui);
    margin: 0;
    padding: 2rem;
  }

  .doc-container {
    max-width: 900px;
    margin: 0 auto;
  }

  /* --- Typography & Badges --- */
  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  p {
    line-height: 1.6;
    color: var(--c-text-sub);
    margin-bottom: 2rem;
  }

  .code-badge {
    font-family: var(--font-mono);
    background: #e2e8f0;
    padding: 2px 6px;
    font-size: 0.85em;
    color: var(--c-text-main);
    border: 1px solid var(--c-border);
  }

  /* --- Playground Area --- */
  .playground {
    border: 1px solid var(--c-border);
    background: var(--c-canvas);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Grid Pattern */
    background-image: 
      linear-gradient(var(--c-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--c-bg) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .playground-actions {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid var(--c-border);
    padding: 6px 12px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    cursor: pointer;
    color: var(--c-text-sub);
  }
  
  .icon-btn:hover {
    color: var(--c-text-main);
    border-color: var(--c-text-main);
  }

  /* --- Buttons --- */
  .btn {
    padding: 10px 20px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid var(--c-text-main);
    transition: all 0.1s;
    text-transform: uppercase;
  }

  .btn-primary {
    background: var(--c-text-main);
    color: var(--c-canvas);
  }

  .btn-primary:hover {
    background: var(--c-accent);
    border-color: var(--c-accent);
  }

  .btn-outline {
    background: var(--c-canvas);
    color: var(--c-text-main);
    border-color: var(--c-border);
  }

  .btn-outline:hover {
    border-color: var(--c-text-main);
  }

  /* --- Modal Component --- */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.4); /* Slight dim */
    backdrop-filter: blur(2px);         /* Minimal blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: var(--z-modal);
    animation: fadeIn 0.2s ease-out;
  }

  .modal-window {
    background: var(--c-canvas);
    width: 100%;
    max-width: 420px;
    border: 2px solid var(--c-text-main); /* Stronger border for modal */
    box-shadow: 8px 8px 0px rgba(15, 23, 42, 0.1); /* Flat hard shadow */
    display: flex;
    flex-direction: column;
    animation: slideUp 0.2s ease-out;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--c-border);
    background: var(--c-bg);
  }

  .modal-title {
    font-family: var(--font-ui);
    font-weight: 700;
    font-size: 1rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .close-btn {
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    padding: 4px;
    color: var(--c-text-sub);
  }

  .close-btn:hover {
    color: var(--c-text-main);
    border-color: var(--c-text-main);
  }

  .modal-body {
    padding: 24px 20px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-sub);
    min-height: 80px;
  }

  .modal-footer {
    padding: 16px 20px;
    border-top: 1px solid var(--c-border);
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background: var(--c-bg);
  }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
`;

// --- Components ---

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop propagation to prevent closing when clicking inside modal */}
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Terminal size={16} />
            {title}
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">{children}</div>

        {/* Footer */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Footer Actions
  const modalActions = (
    <>
      <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
        Cancel
      </button>
      <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>
        Confirm
      </button>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="doc-container">
        {/* Documentation Header */}
        <h1>Basic Usage</h1>
        <p>
          The simplest example. <span className="code-badge">Remember</span> to
          read the <span className="code-badge">Guidelines</span> on how to
          encapsulate <span className="code-badge">modal</span> and introduce{' '}
          <span className="code-badge">ModalProvider</span>. This allows you to
          customize your <span className="code-badge">modal</span> style.
        </p>

        {/* Component Playground */}
        <div className="playground">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </button>

          {/* Code Button (Visual only) */}
          <div className="playground-actions">
            <button className="icon-btn">
              <Code size={14} />
              View Code
            </button>
          </div>
        </div>

        {/* The Modal Instance */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="SYS_ALERT // CONFIRMATION"
          footer={modalActions}
        >
          <div
            style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
          >
            <AlertCircle size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
            <span>
              This is a system message.
              <br />
              Operation will execute immediately.
            </span>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default App;
