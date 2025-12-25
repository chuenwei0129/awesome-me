import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  Loader2, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ScanLine, 
  Binary 
} from 'lucide-react';

// --- Animations ---
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scanMove = keyframes`
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

// --- Styled Primitives (Blueprint Theme) ---

const BlueprintContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 3rem;
  background: #f8fafc; /* var(--c-bg) */
  flex-wrap: wrap;
  justify-content: center;
  font-family: 'JetBrains Mono', 'Consolas', monospace; /* Monospace for technical feel */
`;

const CardFrame = styled.div`
  background: #ffffff;
  border: 1px solid #cbd5e1; /* Slate-300 */
  padding: 1rem;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  
  /* Corner markings */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid #0f172a;
    transition: all 0.2s;
  }
  &::before { top: -1px; left: -1px; border-right: none; border-bottom: none; }
  &::after { bottom: -1px; right: -1px; border-left: none; border-top: none; }
  
  &:hover::before, &:hover::after {
    width: 100%;
    height: 100%;
    border-color: #94a3b8;
    opacity: 0.1;
  }
`;

const CardHeader = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #64748b;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QRViewport = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #f8fafc;
  border: 1px dashed #cbd5e1; /* Dashed area for "scan zone" */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// Simulated QR Data Pattern
const QRPattern = styled.div`
  width: 180px;
  height: 180px;
  background-image: radial-gradient(#0f172a 30%, transparent 30%), radial-gradient(#0f172a 30%, transparent 30%);
  background-position: 0 0, 4px 4px;
  background-size: 8px 8px;
  opacity: ${props => props.$faded ? 0.1 : 0.8};
  filter: ${props => props.$blur ? 'blur(2px)' : 'none'};
  transition: all 0.3s ease;
  
  /* Corner Squares of QR */
  position: relative;
  &::before, &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border: 8px solid #0f172a;
  }
  &::before { top: 0; left: 0; }
  &::after { top: 0; right: 0; }
`;

const BottomSquare = styled.div`
  position: absolute;
  bottom: 0; left: 0;
  width: 40px; height: 40px;
  border: 8px solid #0f172a;
`;

// --- Status Overlays ---

const StatusOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  gap: 1rem;
  z-index: 10;
`;

const StatusIconBox = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid ${props => props.$color || '#0f172a'};
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: ${props => props.$color || '#0f172a'};
`;

const StatusText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid #3b82f6; /* Blue for action */
  color: #3b82f6;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #3b82f6;
    color: #fff;
  }
`;

const ScanLineAnim = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: #10b981; /* Green scan line */
  box-shadow: 0 0 4px #10b981;
  ${css`
    animation: ${scanMove} 2s linear infinite;
  `}
`;

const SpinIcon = styled(Loader2)`
  animation: ${spin} 1.5s linear infinite;
  transform-origin: center;
`;

const LoadingSpinner = ({ size = 24 }) => {
  return <SpinIcon size={size} />;
};

// --- Main Components ---

const QRCodeLoading = () => (
  <CardFrame>
    <CardHeader>
      <span>Status</span>
      <span>[WAITING]</span>
    </CardHeader>
    <QRViewport>
      <QRPattern $faded $blur />
      <BottomSquare style={{ opacity: 0.1 }} />
      <StatusOverlay>
        <StatusIconBox $color="#3b82f6">
          <LoadingSpinner size={24} />
        </StatusIconBox>
        <StatusText>INITIALIZING...</StatusText>
      </StatusOverlay>
    </QRViewport>
    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
      > REQUESTING_TOKEN...
    </div>
  </CardFrame>
);

const QRCodeExpired = () => (
  <CardFrame>
    <CardHeader>
      <span>Status</span>
      <span style={{ color: '#ef4444' }}>[EXPIRED]</span>
    </CardHeader>
    <QRViewport>
      <QRPattern $faded />
      <BottomSquare style={{ opacity: 0.1 }} />
      <StatusOverlay>
        <StatusIconBox $color="#ef4444">
          <XCircle size={24} />
        </StatusIconBox>
        <StatusText style={{ color: '#ef4444' }}>SESSION_TIMEOUT</StatusText>
        <ActionButton>
          <RotateCcw size={14} />
          <span>REFRESH_KEY</span>
        </ActionButton>
      </StatusOverlay>
    </QRViewport>
    <div style={{ fontSize: '0.7rem', color: '#ef4444' }}>
      > ERROR: TIMEOUT_ACK
    </div>
  </CardFrame>
);

const QRCodeScanned = () => (
  <CardFrame>
    <CardHeader>
      <span>Status</span>
      <span style={{ color: '#10b981' }}>[VERIFIED]</span>
    </CardHeader>
    <QRViewport>
      <QRPattern />
      <BottomSquare />
      {/* Active Scan Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: '#10b981', opacity: 0.05 }} />
      <StatusOverlay style={{ background: 'rgba(255,255,255,0.7)' }}>
        <StatusIconBox $color="#10b981" style={{ borderRadius: '50%', border: '2px solid #10b981' }}>
          <CheckCircle2 size={24} />
        </StatusIconBox>
        <StatusText style={{ color: '#10b981' }}>SCAN_COMPLETE</StatusText>
      </StatusOverlay>
    </QRViewport>
    <div style={{ fontSize: '0.7rem', color: '#10b981' }}>
      > HANDSHAKE_SUCCESS
    </div>
  </CardFrame>
);

const BlueprintQRLayout = () => {
  return (
    <BlueprintContainer>
      <QRCodeLoading />
      <QRCodeExpired />
      <QRCodeScanned />
    </BlueprintContainer>
  );
};

export default BlueprintQRLayout;
