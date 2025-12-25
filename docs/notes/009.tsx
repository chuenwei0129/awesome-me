import React, { useState } from 'react';

// --- CSS Styles ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-error: #ef4444; /* Semantic Red */
    --font-ui: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  .blueprint-container {
    font-family: var(--font-ui);
    padding: 2rem;
    background-color: var(--c-bg);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 500px;
  }

  /* --- FORM WRAPPER --- */
  .blueprint-form-card {
    width: 480px;
    background-color: var(--c-canvas);
    border: 1px solid var(--c-border);
    padding: 0;
    position: relative;
  }

  /* Decorative header strip */
  .blueprint-form-header {
    background: #f1f5f9;
    padding: 12px 20px;
    border-bottom: 1px solid var(--c-text-main);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blueprint-form-title {
    font-size: 0.9rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-text-main);
  }

  .blueprint-form-id {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
  }

  .blueprint-form-body {
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* --- INPUT GROUP --- */
  .blueprint-field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
  }

  .blueprint-field-label-row {
    display: flex;
    justify-content: space-between;
  }

  .blueprint-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--c-text-main);
    text-transform: uppercase;
  }

  .blueprint-field-ref {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--c-text-sub);
  }

  .blueprint-input {
    width: 100%;
    padding: 10px 12px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-text-main);
    background: #fff;
    border: 1px solid var(--c-border);
    border-radius: 0; /* STRICTLY SQUARE */
    outline: none;
    transition: none;
  }

  .blueprint-input::placeholder {
    color: #cbd5e1;
    font-style: italic;
  }

  /* Focus State: Thick Black Border */
  .blueprint-input:focus {
    border: 1px solid var(--c-text-main);
    background: #f8fafc;
  }

  /* Error State */
  .blueprint-input.has-error {
    border-color: var(--c-error);
    color: var(--c-error);
    background: #fef2f2;
  }

  .blueprint-error-msg {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-error);
    border-left: 2px solid var(--c-error);
    padding-left: 8px;
    margin-top: 4px;
    display: block;
    text-transform: uppercase;
  }

  /* --- BUTTON --- */
  .blueprint-submit-btn {
    margin-top: 10px;
    width: 100%;
    padding: 14px;
    background: var(--c-text-main);
    color: #ffffff;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    border: 1px solid var(--c-text-main);
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .blueprint-submit-btn:hover {
    background: #334155;
  }

  .blueprint-submit-btn:disabled {
    background: #e2e8f0;
    color: var(--c-text-sub);
    border-color: #cbd5e1;
    cursor: not-allowed;
  }

  /* --- SUCCESS LOG --- */
  .blueprint-success-log {
    border: 1px dashed var(--c-border);
    padding: 16px;
    background: #f8fafc;
  }
  
  .log-line {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--c-text-main);
    margin-bottom: 4px;
    display: block;
  }
  
  .log-line.success { color: #16a34a; font-weight: bold; }
  .log-line.key { color: var(--c-text-sub); }

  /* Loading Spinner - Minimalist Box */
  .spinner-box {
    width: 12px;
    height: 12px;
    border: 2px solid #cbd5e1;
    border-top-color: var(--c-text-main);
    animation: spin 0.8s infinite linear;
  }
  
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const BlueprintForm = () => {
  const [formData, setFormData] = useState({
    projectId: '',
    email: '',
    config: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS

  // --- Validation Logic ---
  const validate = () => {
    const newErrors = {};
    
    if (!formData.projectId.trim()) {
      newErrors.projectId = 'ERR_NULL_VALUE';
    } else if (formData.projectId.length < 4) {
      newErrors.projectId = 'ERR_MIN_LEN_4';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'ERR_INVALID_FORMAT';
    }

    if (!formData.config) {
      newErrors.config = 'ERR_REQUIRED_FIELD';
    }

    return newErrors;
  };

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('SUBMITTING');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('SUCCESS');
    }, 1500);
  };

  const handleReset = () => {
    setStatus('IDLE');
    setFormData({ projectId: '', email: '', config: '' });
  };

  // --- Render ---
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        
        <div className="blueprint-form-card">
          {/* Form Header */}
          <div className="blueprint-form-header">
            <span className="blueprint-form-title">New Configuration Init</span>
            <span className="blueprint-form-id">FORM-REF: 0x884</span>
          </div>

          {status === 'SUCCESS' ? (
            // Success State: Transaction Log
            <div className="blueprint-form-body">
              <div className="blueprint-success-log">
                <span className="log-line success">>> STATUS: 200 OK</span>
                <span className="log-line">>> TIMESTAMP: {new Date().toISOString()}</span>
                <span className="log-line">>> MODE: WRITE_CONFIRMED</span>
                <br/>
                <span className="log-line key">ID: {formData.projectId}</span>
                <span className="log-line key">USER: {formData.email}</span>
              </div>
              <button className="blueprint-submit-btn" onClick={handleReset}>
                RESET_FORM_DATA
              </button>
            </div>
          ) : (
            // Input State
            <form className="blueprint-form-body" onSubmit={handleSubmit}>
              
              {/* Field 1 */}
              <div className="blueprint-field-group">
                <div className="blueprint-field-label-row">
                  <label className="blueprint-label">Project Identifier</label>
                  <span className="blueprint-field-ref">[IN-01]</span>
                </div>
                <input
                  type="text"
                  name="projectId"
                  className={`blueprint-input ${errors.projectId ? 'has-error' : ''}`}
                  placeholder="PRJ-XXXX"
                  value={formData.projectId}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.projectId && (
                  <span className="blueprint-error-msg">>> {errors.projectId}</span>
                )}
              </div>

              {/* Field 2 */}
              <div className="blueprint-field-group">
                <div className="blueprint-field-label-row">
                  <label className="blueprint-label">Administrator Email</label>
                  <span className="blueprint-field-ref">[IN-02]</span>
                </div>
                <input
                  type="text" // text type to disable browser default popup validation for style consistency
                  name="email"
                  className={`blueprint-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="user@domain.net"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.email && (
                  <span className="blueprint-error-msg">>> {errors.email}</span>
                )}
              </div>

              {/* Field 3 */}
              <div className="blueprint-field-group">
                <div className="blueprint-field-label-row">
                  <label className="blueprint-label">Init Parameters</label>
                  <span className="blueprint-field-ref">[IN-03]</span>
                </div>
                <input
                  type="text"
                  name="config"
                  className={`blueprint-input ${errors.config ? 'has-error' : ''}`}
                  placeholder="--force --verbose"
                  value={formData.config}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.config && (
                  <span className="blueprint-error-msg">>> {errors.config}</span>
                )}
              </div>

              {/* Submit Action */}
              <button 
                type="submit" 
                className="blueprint-submit-btn"
                disabled={status === 'SUBMITTING'}
              >
                {status === 'SUBMITTING' ? (
                  <>
                    <div className="spinner-box"></div>
                    PROCESSING
                  </>
                ) : (
                  'EXECUTE_SUBMIT'
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default BlueprintForm;
