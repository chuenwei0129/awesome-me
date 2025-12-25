import { Check, Loader2, X } from 'lucide-react';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// --- Animations ---
const stripeMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 40px 0; }
`;

// --- Styled Primitives ---

const BlueprintWrapper = styled.div`
  background: #f8fafc;
  padding: 3rem;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  border: 1px solid #cbd5e1;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionLabel = styled.div`
  width: 100%;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
`;

// --- The Progress Bar Container ---
const BarFrame = styled.div`
  flex: 1;
  height: 24px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px; /* Internal spacing */
`;

// Ruler Markings for Continuous Bars
const RulerMarks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: linear-gradient(90deg, #cbd5e1 1px, transparent 1px);
  background-size: 10% 100%; /* Division every 10% */
  z-index: 2;
  opacity: 0.5;
`;

// --- Continuous Fill ---
const Fill = styled.div`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background: ${(props) => props.$color || '#0f172a'};
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;

  /* Error Pattern: Hazard Stripes */
  ${(props) =>
    props.$status === 'exception' &&
    css`
      background-image: repeating-linear-gradient(
        45deg,
        #ef4444,
        #ef4444 10px,
        #dc2626 10px,
        #dc2626 20px
      );
      background-size: 28px 28px;
      animation: ${stripeMove} 1s linear infinite;
    `}

  /* Success: Solid Green */
  ${(props) =>
    props.$status === 'success' &&
    css`
      background: #22c55e;
    `}
  
  /* Active: Solid Blue */
  ${(props) =>
    props.$status === 'active' &&
    css`
      background: #3b82f6;
    `}
`;

// --- Segmented Fill ---
const SegmentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 2px;
`;

const SegmentBlock = styled.div`
  flex: 1;
  height: 100%;
  background: ${(props) =>
    props.$active ? props.$color || '#3b82f6' : '#f1f5f9'};

  /* Dim inactive blocks */
  ${(props) =>
    !props.$active &&
    css`
      background: #f1f5f9;
      /* Tiny dot in center of empty block for "slot" effect */
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: '';
        width: 2px;
        height: 2px;
        background: #cbd5e1;
      }
    `}
`;

// --- Info & Icons ---

const InfoBlock = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  width: 60px;
  text-align: right;
  color: #0f172a;
`;

const StatusIconBox = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid ${(props) => props.$color || '#cbd5e1'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.$color || '#64748b'};
  background: #fff;
`;

// --- Components ---

const ContinuousProgress = ({ percent, status = 'active' }) => {
  let color = '#3b82f6';
  let Icon = null;
  let iconColor = '#3b82f6';

  if (status === 'success') {
    color = '#22c55e';
    Icon = Check;
    iconColor = '#22c55e';
  } else if (status === 'exception') {
    color = '#ef4444';
    Icon = X;
    iconColor = '#ef4444';
  }

  return (
    <ProgressRow>
      <BarFrame>
        <RulerMarks />
        <Fill $percent={percent} $status={status} $color={color} />
      </BarFrame>
      <InfoBlock>{percent}%</InfoBlock>
      {Icon ? (
        <StatusIconBox $color={iconColor}>
          <Icon size={14} strokeWidth={3} />
        </StatusIconBox>
      ) : (
        <div style={{ width: 24 }} /> /* Spacer */
      )}
    </ProgressRow>
  );
};

const SegmentedProgress = ({ percent, steps = 10, status = 'active' }) => {
  // Calculate how many blocks are active
  const activeCount = Math.round((percent / 100) * steps);

  let color = '#3b82f6'; // Default Blue
  if (status === 'success') color = '#22c55e'; // Green
  if (status === 'exception') color = '#ef4444'; // Red

  return (
    <ProgressRow>
      <BarFrame
        style={{ border: 'none', background: 'transparent', padding: 0 }}
      >
        <SegmentContainer>
          {Array.from({ length: steps }).map((_, i) => (
            <SegmentBlock key={i} $active={i < activeCount} $color={color} />
          ))}
        </SegmentContainer>
      </BarFrame>
      <InfoBlock>{percent}%</InfoBlock>
      {status === 'loading' && (
        <StatusIconBox
          $color="#3b82f6"
          style={{ border: 'none', background: 'transparent' }}
        >
          <Loader2 size={18} className="spin-icon" />
          <style>{`.spin-icon { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </StatusIconBox>
      )}
      {status !== 'loading' && <div style={{ width: 24 }} />}
    </ProgressRow>
  );
};

// --- Layout ---

const BlueprintProgressLayout = () => {
  return (
    <BlueprintWrapper>
      {/* Type A: Linear / Ruler Style */}
      <div style={{ width: '100%' }}>
        <SectionLabel>TYPE_A: LINEAR_METER</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ContinuousProgress percent={30} status="active" />
          <ContinuousProgress percent={50} status="active" />
          <ContinuousProgress percent={100} status="success" />
          <ContinuousProgress percent={75} status="exception" />
        </div>
      </div>

      {/* Type B: Segmented / Block Style */}
      <div style={{ width: '100%' }}>
        <SectionLabel>TYPE_B: DISCRETE_BLOCKS</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SegmentedProgress percent={50} steps={10} status="active" />
          <SegmentedProgress percent={30} steps={10} status="loading" />
          <SegmentedProgress percent={60} steps={5} status="exception" />

          {/* Custom "Battery" style layout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                border: '2px solid #0f172a',
                padding: '2px',
                display: 'flex',
                width: '100%',
                maxWidth: '525px',
              }}
            >
              <SegmentedProgress percent={90} steps={20} status="success" />
            </div>
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.7rem',
                color: '#64748b',
              }}
            >
              SYS_POWER
            </div>
          </div>
        </div>
      </div>
    </BlueprintWrapper>
  );
};

export default BlueprintProgressLayout;
