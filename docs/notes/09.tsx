import { ArrowRight, Lock, User } from 'lucide-react';
import React from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    background-color: var(--c-bg);
    color: var(--c-text-main);
    font-family: var(--font-ui);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
  }

  /* Main Card Container */
  .blueprint-card {
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    width: 100%;
    max-width: 400px;
    padding: 0;
    position: relative;
    box-shadow: 10px 10px 0 rgba(203, 213, 225, 0.4); /* Solid flat shadow */
  }

  /* Technical Header Strip */
  .card-tech-header {
    background: var(--c-bg);
    border-bottom: 1px solid var(--c-border);
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
    letter-spacing: 0.05em;
  }

  .card-body {
    padding: 32px 32px 40px 32px;
  }

  /* Headings */
  .auth-title {
    font-size: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    margin: 0 0 8px 0;
    letter-spacing: -0.02em;
    text-align: center;
  }

  .auth-subtitle {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--c-text-sub);
    text-align: center;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  /* Form Elements */
  .form-group {
    margin-bottom: 20px;
  }

  .input-label {
    display: block;
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 8px;
    color: var(--c-text-main);
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 12px;
    color: var(--c-text-sub);
    pointer-events: none;
  }

  .blueprint-input {
    width: 100%;
    padding: 10px 12px 10px 36px; /* Space for icon */
    font-family: var(--font-mono);
    font-size: 0.875rem;
    border: 1px solid var(--c-border);
    background: var(--c-bg); /* Slight gray bg for inputs */
    color: var(--c-text-main);
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
  }

  .blueprint-input:focus {
    border-color: var(--c-text-main);
    background: var(--c-canvas);
  }

  .blueprint-input::placeholder {
    color: #94a3b8;
  }

  /* Button */
  .btn-submit {
    width: 100%;
    background: var(--c-text-main);
    color: var(--c-canvas);
    border: 1px solid var(--c-text-main);
    padding: 12px;
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    text-transform: uppercase;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .btn-submit:hover {
    background: var(--c-canvas);
    color: var(--c-text-main);
  }

  /* Footer */
  .auth-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 0.875rem;
    color: var(--c-text-sub);
  }

  .link-action {
    color: var(--c-text-main);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    margin-left: 4px;
  }

  .link-action:hover {
    border-bottom-color: var(--c-text-main);
  }
`;

// --- Component ---

const LoginCard = () => {
  return (
    <>
      <style>{styles}</style>

      <div className="blueprint-card">
        {/* Technical Header Strip */}
        <div className="card-tech-header">
          <span>SYS // AUTH_GATEWAY</span>
          <span>v.2.4</span>
        </div>

        <div className="card-body">
          <h1 className="auth-title">Welcome Back</h1>
          <div className="auth-subtitle">
            Enter your credentials to access
            <br />
            secure data nodes.
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="form-group">
              <label className="input-label">EMAIL</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input
                  type="email"
                  className="blueprint-input"
                  placeholder="user@blocks.so"
                  defaultValue="ephraim@blocks.so"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="input-label">PASSWORD</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  className="blueprint-input"
                  placeholder="••••••••••••"
                  defaultValue="password123"
                />
              </div>
            </div>

            {/* Action Button */}
            <button className="btn-submit">
              Sign In
              <ArrowRight size={16} />
            </button>

            {/* Footer */}
            <div className="auth-footer">
              <span>Forgot your password?</span>
              <span className="link-action">Reset password</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
