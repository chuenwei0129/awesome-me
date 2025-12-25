import React, { useEffect, useRef } from 'react';

// --- CSS Styles ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-overlay: rgba(255, 255, 255, 0.95);
    --font-ui: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  /* --- BACKDROP --- */
  .blueprint-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--c-overlay);
    /* Technical Grid Pattern */
    background-image: 
      linear-gradient(to right, #cbd5e1 1px, transparent 1px),
      linear-gradient(to bottom, #cbd5e1 1px, transparent 1px);
    background-size: 50px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* --- DIALOG FRAME --- */
  .blueprint-dialog-window {
    width: 600px;
    max-width: 90vw;
    /* Fixed height constraints to force scrolling */
    height: 80vh; 
    max-height: 800px;
    background-color: var(--c-canvas);
    border: 2px solid var(--c-text-main);
    box-shadow: none;
    position: relative;
    display: flex;
    flex-direction: column; /* Stack Header, Body, Footer */
  }

  /* Decorative Corner Marks */
  .blueprint-dialog-window::before, .blueprint-dialog-window::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border: 3px solid var(--c-text-main);
    z-index: 10;
  }
  .blueprint-dialog-window::before { top: -2px; left: -2px; border-right: none; border-bottom: none; }
  .blueprint-dialog-window::after { bottom: -2px; right: -2px; border-left: none; border-top: none; }

  /* --- HEADER (Fixed) --- */
  .blueprint-dialog-header {
    flex-shrink: 0; /* Prevent shrinking */
    background: var(--c-text-main);
    color: #ffffff;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--c-text-main);
  }

  .blueprint-dialog-title {
    font-family: var(--font-ui);
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .blueprint-close-btn {
    background: none;
    border: 1px solid #fff;
    color: #fff;
    font-family: var(--font-mono);
    font-size: 1.2rem;
    cursor: pointer;
    line-height: 1;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .blueprint-close-btn:hover {
    background: #fff;
    color: var(--c-text-main);
  }

  /* --- SCROLLABLE BODY --- */
  .blueprint-dialog-scroll-area {
    flex: 1; /* Take remaining space */
    overflow-y: auto; /* Enable Scroll */
    padding: 30px;
    font-family: var(--font-ui);
    color: var(--c-text-main);
    line-height: 1.6;
    
    /* Scrollbar Styling - The "Mechanical" Look */
    scrollbar-width: thin;
    scrollbar-color: var(--c-text-main) #f1f5f9;
  }

  /* Webkit Scrollbar Customization */
  .blueprint-dialog-scroll-area::-webkit-scrollbar {
    width: 16px; /* Wide, mechanical track */
  }

  .blueprint-dialog-scroll-area::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-left: 1px solid var(--c-text-main);
    /* Hatched pattern on the track */
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 5px,
      #cbd5e1 5px,
      #cbd5e1 6px
    );
  }

  .blueprint-dialog-scroll-area::-webkit-scrollbar-thumb {
    background: #fff;
    border: 1px solid var(--c-text-main);
    border-right: none; /* Blend with edge */
  }
  
  .blueprint-dialog-scroll-area::-webkit-scrollbar-thumb:hover {
    background: var(--c-text-main); /* Invert on hover */
  }

  /* Content Styling inside Body */
  .blueprint-section-title {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: bold;
    color: var(--c-text-sub);
    text-transform: uppercase;
    border-bottom: 1px solid var(--c-border);
    margin-top: 24px;
    margin-bottom: 12px;
    padding-bottom: 4px;
    display: block;
  }
  
  .blueprint-text-block {
    margin-bottom: 16px;
    font-size: 0.95rem;
  }

  /* --- FOOTER (Fixed) --- */
  .blueprint-dialog-footer {
    flex-shrink: 0; /* Prevent shrinking */
    padding: 16px 20px;
    border-top: 2px solid var(--c-text-main);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
  }

  .blueprint-footer-meta {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
  }

  .blueprint-btn {
    padding: 10px 24px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid var(--c-text-main);
    margin-left: 10px;
    background: #fff;
  }

  .blueprint-btn.primary {
    background: var(--c-text-main);
    color: #ffffff;
  }
  .blueprint-btn.primary:hover {
    opacity: 0.9;
  }
`;

const BlueprintScrollDialog = ({
  isOpen,
  onClose,
  title = 'System Terms & Protocol',
  children,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-overlay">
        <div className="blueprint-dialog-window" ref={dialogRef}>
          {/* 1. Header (Sticky Top) */}
          <div className="blueprint-dialog-header">
            <span className="blueprint-dialog-title">{title}</span>
            <button className="blueprint-close-btn" onClick={onClose}>
              ×
            </button>
          </div>

          {/* 2. Scrollable Content Area */}
          <div className="blueprint-dialog-scroll-area">{children}</div>

          {/* 3. Footer (Sticky Bottom) */}
          <div className="blueprint-dialog-footer">
            <span className="blueprint-footer-meta">
              SCROLL_POSITION: END_OF_STREAM
            </span>
            <div>
              <button className="blueprint-btn" onClick={onClose}>
                Decline
              </button>
              <button className="blueprint-btn primary" onClick={onClose}>
                I Agree
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Usage Example with Long Content ---
export default function App() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <button onClick={() => setIsOpen(true)}>OPEN LONG DIALOG</button>

      <BlueprintScrollDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Protocol_Manifest_v4.0"
      >
        <p className="blueprint-text-block">
          <strong>CAUTION:</strong> Please review the following system operation
          protocols carefully. Scroll down to acknowledge the transmission
          parameters.
        </p>

        <span className="blueprint-section-title">
          01. Initialization Sequence
        </span>
        <p className="blueprint-text-block">
          The system initializes by loading the kernel modules into the primary
          memory bank. During this phase, no user input is accepted. The
          bootloader (GRUB or similar) verifies the integrity of the file system
          partition tables. Any discrepancies found in the Superblock will
          trigger an automatic 'fsck' (File System Consistency Check). This
          process ensures that the data structure remains rigid and accessible.
        </p>
        <p className="blueprint-text-block">
          Wait for the signal indicating that the daemon processes have
          successfully forked and are running in the background. PID allocation
          must remain sequential.
        </p>

        <span className="blueprint-section-title">
          02. Data Transmission Policies
        </span>
        <p className="blueprint-text-block">
          All outgoing packets are encapsulated with a 256-bit encryption key.
          The handshake protocol follows the standard TCP/IP 3-way handshake
          (SYN, SYN-ACK, ACK). Retransmission timeouts (RTO) are calculated
          dynamically based on the Round Trip Time (RTT). Do not manually
          override the MTU (Maximum Transmission Unit) unless the physical layer
          explicitly supports Jumbo Frames.
        </p>

        <span className="blueprint-section-title">03. User Responsibility</span>
        <p className="blueprint-text-block">
          Users are identified by their unique UID and GID. Access Control Lists
          (ACLs) are strictly enforced. Chmod 777 is strictly prohibited in
          production environments. Violation of this policy will result in
          immediate termination of the session and logging of the incident to
          the /var/log/auth.log file.
        </p>
        <p className="blueprint-text-block">
          By clicking "I Agree", you acknowledge that you have read the man
          pages for all relevant commands and accept full liability for any
          segmentation faults caused by improper pointer arithmetic.
        </p>

        <span className="blueprint-section-title">
          04. Hardware Abstraction Layer
        </span>
        <p className="blueprint-text-block">
          The HAL provides a standard interface for the OS to interact with the
          underlying hardware. Direct register access is restricted to kernel
          mode drivers. Interrupt Requests (IRQs) must be handled promptly to
          avoid CPU stalling. Ensure that the heat dissipation unit is
          functioning within nominal parameters before initiating high-load
          compilation tasks.
        </p>

        <p className="blueprint-text-block">
          <em>[End of Document - Checksum: 0x8F2A]</em>
        </p>
      </BlueprintScrollDialog>
    </div>
  );
}
