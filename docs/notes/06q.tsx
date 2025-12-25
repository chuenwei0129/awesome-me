import { Bell, Database, Mail, ShoppingCart } from 'lucide-react';
import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// --- Global Theme ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-border-strong: #0f172a;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-alert: #ef4444; /* Tech Red */
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// --- Styled Components ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--c-bg);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  font-family: var(--font-ui);
`;

const Section = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  padding: 2rem;
  border: 1px dashed var(--c-border);
  background: var(--c-canvas);
  position: relative;

  /* Label for the section */
  &::before {
    content: '${(props) => props.label}';
    position: absolute;
    top: -10px;
    left: 10px;
    background: var(--c-bg);
    padding: 0 8px;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
  }
`;

// --- The Badge Component ---

const BadgeContainer = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`;

// The "Tag" itself
const Sup = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 10;

  /* Shape & Color */
  background-color: var(--c-alert);
  color: white;
  border: 1px solid white; /* Cutout effect */

  /* Typography */
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;

  /* Geometry */
  height: 20px;
  min-width: 20px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 0 rgba(15, 23, 42, 0.2); /* Hard shadow */

  /* Dot Mode */
  ${(props) =>
    props.$isDot &&
    css`
      width: 10px;
      min-width: 0;
      height: 10px;
      padding: 0;
      border-radius: 0; /* Still square */
      transform: translate(50%, -50%);

      &::after {
        display: none;
      }
    `}
`;

// A generic "Avatar" or "Box" to put badges on
const DemoBox = styled.div`
  width: 48px;
  height: 48px;
  background: #e2e8f0;
  border: 1px solid var(--c-border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-sub);

  /* Cross lines pattern for 'empty' feel */
  background-image: linear-gradient(
      45deg,
      #cbd5e1 25%,
      transparent 25%,
      transparent 75%,
      #cbd5e1 75%,
      #cbd5e1
    ),
    linear-gradient(
      45deg,
      #cbd5e1 25%,
      transparent 25%,
      transparent 75%,
      #cbd5e1 75%,
      #cbd5e1
    );
  background-size: 10px 10px;
  background-position: 0 0, 5px 5px;
  background-color: #f1f5f9;
`;

const Badge = ({
  count,
  overflowCount = 99,
  dot = false,
  children,
  showZero = false,
}) => {
  if (!children) return null; // Simplified for demo

  // Logic: formatting the number
  let displayValue = count;
  if (!dot && count > overflowCount) {
    displayValue = `${overflowCount}+`;
  }

  const isHidden = !dot && !showZero && count === 0;

  return (
    <BadgeContainer>
      {children}
      {!isHidden && <Sup $isDot={dot}>{!dot && displayValue}</Sup>}
    </BadgeContainer>
  );
};

// --- Standalone Demo Component ---

const BlueprintBadge = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* Scenario 1: Basic Counts (Your Image Replica) */}
        <Section label="SCENARIO_A: COUNT_OVERFLOW">
          <Badge count={5}>
            <DemoBox />
          </Badge>

          <Badge count={99}>
            <DemoBox />
          </Badge>

          <Badge count={100} overflowCount={99}>
            <DemoBox />
          </Badge>

          <Badge count={1000} overflowCount={999}>
            <DemoBox />
          </Badge>
        </Section>

        {/* Scenario 2: Real World Icons */}
        <Section label="SCENARIO_B: ICON_INTEGRATION">
          <Badge count={2}>
            <button
              style={{
                width: 40,
                height: 40,
                border: '1px solid #0f172a',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Mail size={20} />
            </button>
          </Badge>

          <Badge dot>
            <button
              style={{
                width: 40,
                height: 40,
                border: '1px solid #0f172a',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Bell size={20} />
            </button>
          </Badge>

          <Badge count={12} overflowCount={10}>
            <button
              style={{
                width: 40,
                height: 40,
                border: '1px solid #0f172a',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ShoppingCart size={20} />
            </button>
          </Badge>
        </Section>

        {/* Scenario 3: Text Link Badge */}
        <Section label="SCENARIO_C: INLINE_TAG">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              display: 'flex',
              gap: '2rem',
            }}
          >
            <span style={{ position: 'relative' }}>
              sys_logs
              <Badge count={404} overflowCount={99} style={{}}>
                <span
                  style={{ position: 'absolute', top: -5, right: -10 }}
                ></span>
              </Badge>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={16} />
              <span>Pending_Jobs</span>
              <span
                style={{
                  background: 'var(--c-text-main)',
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  fontWeight: 'bold',
                }}
              >
                8
              </span>
            </div>
          </div>
        </Section>
      </Wrapper>
    </>
  );
};

export default BlueprintBadge;
