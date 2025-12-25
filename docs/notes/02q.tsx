import {
  AlertTriangle,
  ChevronDown,
  FileText,
  Mail,
  Save,
  Shield,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// --- Global Theme ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f1f5f9;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-border-strong: #0f172a;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-error: #ef4444;
    --c-success: #10b981;
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// --- Styled Layout Components ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--c-bg);
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: var(--font-ui);
  color: var(--c-text-main);
`;

const FormCanvas = styled.form`
  width: 100%;
  max-width: 720px;
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  position: relative;

  /* Decorative Engineering Notch */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 20px;
    height: 20px;
    border-top: 4px solid var(--c-border-strong);
    border-left: 4px solid var(--c-border-strong);
  }
`;

const FormHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 2px solid var(--c-border-strong);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: #f8fafc;
`;

const TitleBlock = styled.div`
  h1 {
    font-size: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    margin: 0;
  }
  p {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
    margin-top: 0.5rem;
  }
`;

const StatusBadge = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  border: 1px solid var(--c-text-sub);
  padding: 2px 6px;
  text-transform: uppercase;
`;

// --- Field Layout ---

const FormBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Fieldset = styled.fieldset`
  border: 1px dashed var(--c-border);
  padding: 1.5rem;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 Column Layout */
  gap: 1.5rem;
  position: relative;

  legend {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--c-text-main);
    padding: 0 0.5rem;
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    margin-left: 1rem;
    text-transform: uppercase;
  }

  /* Full width modifier */
  ${(props) =>
    props.$full &&
    css`
      grid-template-columns: 1fr;
    `}
`;

// --- Input Components ---

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${(props) => (props.$span ? `span ${props.$span}` : 'auto')};
`;

const Label = styled.label`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-sub);
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

const DataType = styled.span`
  opacity: 0.5;
  font-size: 0.6rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const BaseInputStyles = css`
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  background: #fdfdfd;
  border: 1px solid var(--c-border);
  font-family: var(--font-ui);
  font-size: 0.9rem;
  color: var(--c-text-main);
  outline: none;
  transition: all 0.1s;
  border-radius: 0;

  &:focus {
    border: 2px solid var(--c-border-strong);
    background: #ffffff;
    padding-left: calc(1rem - 1px); /* Prevent layout shift from border width */
  }

  ${(props) =>
    props.$hasError &&
    css`
      border-color: var(--c-error);
      background: #fff5f5;
      &:focus {
        border-color: var(--c-error);
      }
    `}
`;

const Input = styled.input`
  ${BaseInputStyles}
`;

const Select = styled.select`
  ${BaseInputStyles}
  appearance: none;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  ${BaseInputStyles}
  height: auto;
  min-height: 6rem;
  padding: 0.75rem 1rem;
  resize: vertical;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  pointer-events: none;
  color: var(--c-text-sub);
  display: flex;
  align-items: center;
`;

const ErrorMsg = styled.div`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-error);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;

  /* Hard edge error box */
  background: #ffecec;
  border-left: 2px solid var(--c-error);
  padding: 2px 4px;
  width: fit-content;
`;

// --- Radio & Checkbox (Custom Engineering Style) ---

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: ${(props) =>
    props.$checked ? 'var(--c-text-main)' : 'var(--c-text-sub)'};

  /* The visual box */
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border: 1px solid var(--c-border-strong);
    background: ${(props) =>
      props.$checked ? 'var(--c-border-strong)' : 'transparent'};
    /* For Radio: Circle inside square look? No, keeping it square for "Flat" style or Circle for standard */
    border-radius: ${(props) => (props.$type === 'radio' ? '50%' : '0')};
    box-shadow: ${(props) =>
      props.$checked ? 'inset 0 0 0 2px white' : 'none'};
  }

  &:hover::before {
    border-color: var(--c-border-strong);
    background: ${(props) => (!props.$checked ? '#f1f5f9' : '')};
  }
`;

// --- Footer & Actions ---

const FormFooter = styled.div`
  border-top: 1px solid var(--c-border);
  background: #f8fafc;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  height: 2.75rem;
  padding: 0 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid var(--c-border-strong);
  transition: all 0.1s;

  ${(props) =>
    props.$primary
      ? css`
          background: var(--c-border-strong);
          color: white;
          &:hover {
            background: #334155;
          }
          &:active {
            transform: translateY(1px);
          }
        `
      : css`
          background: white;
          color: var(--c-text-main);
          &:hover {
            background: #f1f5f9;
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// --- Loading / Log Animation ---

const LogOutput = styled.div`
  background: #0f172a;
  color: #10b981;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
  border-left: 4px solid #10b981;
  white-space: pre-wrap;
  line-height: 1.5;
`;

// --- Main Component ---

const BlueprintForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    accessLevel: 'read_only',
    terms: false,
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLog, setSubmitLog] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'FIELD_REQUIRED';
    if (!formData.email) newErrors.email = 'FIELD_REQUIRED';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'INVALID_FORMAT';
    if (!formData.department) newErrors.department = 'SELECTION_REQUIRED';
    if (!formData.reason) newErrors.reason = 'JUSTIFICATION_NEEDED';
    if (formData.reason.length < 10) newErrors.reason = 'MIN_LENGTH_10';
    if (!formData.terms) newErrors.terms = 'ACKNOWLEDGEMENT_REQUIRED';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLog(null);
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitLog(
        `> INITIALIZING HANDSHAKE...\n` +
          `> PACKING PAYLOAD [${JSON.stringify(formData).length} BYTES]\n` +
          `> POST /api/v1/access_request\n` +
          `> STATUS: 201 CREATED\n` +
          `> TICKET_ID: #REQ-9942`,
      );
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FormCanvas onSubmit={handleSubmit}>
          <FormHeader>
            <TitleBlock>
              <h1>System Access Request</h1>
              <p>FORM_ID: ACC_REQ_V2.0 // DEPT: ENGINEERING</p>
            </TitleBlock>
            <StatusBadge>STATUS: DRAFT</StatusBadge>
          </FormHeader>

          <FormBody>
            {/* Section 1: Identity */}
            <Fieldset>
              <legend>01_Identity_Verification</legend>

              <FormGroup>
                <Label>
                  Full Name <DataType>[STRING]</DataType>
                </Label>
                <InputWrapper>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Chen"
                    $hasError={!!errors.fullName}
                  />
                  <IconWrapper>
                    <User size={14} />
                  </IconWrapper>
                </InputWrapper>
                {errors.fullName && (
                  <ErrorMsg>
                    <AlertTriangle size={12} /> {errors.fullName}
                  </ErrorMsg>
                )}
              </FormGroup>

              <FormGroup>
                <Label>
                  Corp Email <DataType>[EMAIL]</DataType>
                </Label>
                <InputWrapper>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@company.com"
                    $hasError={!!errors.email}
                  />
                  <IconWrapper>
                    <Mail size={14} />
                  </IconWrapper>
                </InputWrapper>
                {errors.email && (
                  <ErrorMsg>
                    <AlertTriangle size={12} /> {errors.email}
                  </ErrorMsg>
                )}
              </FormGroup>
            </Fieldset>

            {/* Section 2: Permissions */}
            <Fieldset>
              <legend>02_Access_Control</legend>

              <FormGroup>
                <Label>
                  Target Department <DataType>[ENUM]</DataType>
                </Label>
                <InputWrapper>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    $hasError={!!errors.department}
                  >
                    <option value="">-- SELECT_NODE --</option>
                    <option value="dev">DevOps Infrastructure</option>
                    <option value="data">Data Warehouse</option>
                    <option value="sec">Security Audit</option>
                  </Select>
                  <IconWrapper>
                    <ChevronDown size={14} />
                  </IconWrapper>
                </InputWrapper>
                {errors.department && (
                  <ErrorMsg>
                    <AlertTriangle size={12} /> {errors.department}
                  </ErrorMsg>
                )}
              </FormGroup>

              <FormGroup>
                <Label>
                  Clearance Level <DataType>[RADIO]</DataType>
                </Label>
                <RadioGroup>
                  <OptionLabel
                    $checked={formData.accessLevel === 'read_only'}
                    $type="radio"
                  >
                    <HiddenInput
                      type="radio"
                      name="accessLevel"
                      value="read_only"
                      checked={formData.accessLevel === 'read_only'}
                      onChange={handleChange}
                    />
                    READ_ONLY
                  </OptionLabel>
                  <OptionLabel
                    $checked={formData.accessLevel === 'admin'}
                    $type="radio"
                  >
                    <HiddenInput
                      type="radio"
                      name="accessLevel"
                      value="admin"
                      checked={formData.accessLevel === 'admin'}
                      onChange={handleChange}
                    />
                    ADMIN_ROOT
                  </OptionLabel>
                </RadioGroup>
              </FormGroup>

              <FormGroup $span={2}>
                <Label>
                  Justification <DataType>[TEXT]</DataType>
                </Label>
                <InputWrapper>
                  <Textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Describe business requirement..."
                    $hasError={!!errors.reason}
                  />
                  <IconWrapper style={{ top: '1rem', right: '1rem' }}>
                    <FileText size={14} />
                  </IconWrapper>
                </InputWrapper>
                {errors.reason && (
                  <ErrorMsg>
                    <AlertTriangle size={12} /> {errors.reason}
                  </ErrorMsg>
                )}
              </FormGroup>
            </Fieldset>

            {/* Terms */}
            <div style={{ padding: '0 0.5rem' }}>
              <OptionLabel $checked={formData.terms} $type="checkbox">
                <HiddenInput
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                I ACKNOWLEDGE THE IT SECURITY PROTOCOL (REV.4)
              </OptionLabel>
              {errors.terms && (
                <ErrorMsg style={{ marginTop: '8px' }}>
                  <AlertTriangle size={12} /> {errors.terms}
                </ErrorMsg>
              )}
            </div>

            {/* Success Log */}
            {submitLog && <LogOutput>{submitLog}</LogOutput>}
          </FormBody>

          <FormFooter>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Shield size={14} className="text-slate-400" />
              SECURE_CONNECTION: TLS_1.3
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <ActionButton
                type="button"
                onClick={() => setFormData({ ...formData, reason: '' })}
              >
                Reset
              </ActionButton>
              <ActionButton type="submit" $primary disabled={isSubmitting}>
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <Save size={16} /> Submit_Request
                  </>
                )}
              </ActionButton>
            </div>
          </FormFooter>
        </FormCanvas>
      </Wrapper>
    </>
  );
};

export default BlueprintForm;
