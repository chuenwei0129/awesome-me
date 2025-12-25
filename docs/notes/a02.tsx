import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

// --- Styled Primitives & Layout ---

const BlueprintWrapper = styled.div`
  background: #f8fafc; /* var(--c-bg) */
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  overflow: hidden; /* To contain drawers */
  position: relative;
  border: 1px solid #cbd5e1;
  margin: 2rem;
`;

const CanvasGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(#e2e8f0 1px, transparent 1px),
    linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
  pointer-events: none;
`;

const ControlCenter = styled.div`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 2rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 0 0 1px #f1f5f9; /* Subtle double border */
  min-width: 300px;
`;

const Header = styled.div`
  border-bottom: 1px solid #cbd5e1;
  width: 100%;
  padding-bottom: 1rem;
  text-align: center;

  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.05em;
  }

  span {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: #64748b;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;

const ActionButton = styled.button`
  background: #fff;
  border: 1px solid #cbd5e1;
  color: #0f172a;
  padding: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: #0f172a;
    background: #f1f5f9;
  }

  &:active {
    background: #e2e8f0;
  }
`;

// --- Drawer Components ---

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.1); /* Low opacity dark slate */
  /* Technical Grid Overlay Pattern */
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(15, 23, 42, 0.05) 10px,
    rgba(15, 23, 42, 0.05) 11px
  );
  z-index: 50;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const DrawerPanel = styled.div`
  position: absolute;
  background: #ffffff;
  border: 1px solid #0f172a; /* Strong border for active element */
  z-index: 60;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: none; /* Flat style */
  display: flex;
  flex-direction: column;

  /* Placement Logic */
  ${(props) => {
    switch (props.$placement) {
      case 'right':
        return css`
          top: 0;
          bottom: 0;
          right: 0;
          width: 400px;
          transform: ${props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
          border-left-width: 2px;
        `;
      case 'left':
        return css`
          top: 0;
          bottom: 0;
          left: 0;
          width: 400px;
          transform: ${props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
          border-right-width: 2px;
        `;
      case 'top':
        return css`
          top: 0;
          left: 0;
          right: 0;
          height: 350px;
          transform: ${props.$isOpen ? 'translateY(0)' : 'translateY(-100%)'};
          border-bottom-width: 2px;
        `;
      case 'bottom':
        return css`
          bottom: 0;
          left: 0;
          right: 0;
          height: 350px;
          transform: ${props.$isOpen ? 'translateY(0)' : 'translateY(100%)'};
          border-top-width: 2px;
        `;
      default:
        return '';
    }
  }}
`;

// "Ruler" decoration on the drawer edge
const RulerStrip = styled.div`
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cbd5e1;
  padding: 0.5rem 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #64748b;
  user-select: none;
`;

const DrawerHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #cbd5e1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
`;

const DrawerTitle = styled.div`
  h3 {
    margin: 0;
    font-size: 1.1rem;
    text-transform: uppercase;
    color: #0f172a;
  }
  div {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.25rem;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 4px;
  color: #64748b;

  &:hover {
    color: #0f172a;
    border: 1px solid #cbd5e1;
  }
`;

const DrawerContent = styled.div`
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
  color: #334155;
  line-height: 1.6;
`;

const DrawerFooter = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid #cbd5e1;
  background: #f8fafc;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const PrimaryButton = styled.button`
  background: #0f172a;
  color: #fff;
  border: 1px solid #0f172a;
  padding: 0.5rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background: #334155;
  }
`;

const SecondaryButton = styled.button`
  background: #fff;
  color: #0f172a;
  border: 1px solid #cbd5e1;
  padding: 0.5rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    border-color: #0f172a;
  }
`;

// --- Logic ---

const BlueprintDrawerLayout = () => {
  const [openPlacement, setOpenPlacement] = useState(null); // 'left', 'right', 'top', 'bottom', or null

  const openDrawer = (placement) => setOpenPlacement(placement);
  const closeDrawer = () => setOpenPlacement(null);

  return (
    <BlueprintWrapper>
      <CanvasGrid />

      {/* Central Controls */}
      <ControlCenter>
        <Header>
          <h2>Drawer Controller</h2>
          <span>SYS_UI_DRAWER_V2</span>
        </Header>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <ActionButton
            onClick={() => openDrawer('top')}
            style={{ width: '100%' }}
          >
            <ArrowUp size={16} /> OPEN TOP
          </ActionButton>

          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <ActionButton
              onClick={() => openDrawer('left')}
              style={{ flex: 1 }}
            >
              <ArrowLeft size={16} /> LEFT
            </ActionButton>
            <ActionButton
              onClick={() => openDrawer('right')}
              style={{ flex: 1 }}
            >
              RIGHT <ArrowRight size={16} />
            </ActionButton>
          </div>

          <ActionButton
            onClick={() => openDrawer('bottom')}
            style={{ width: '100%' }}
          >
            <ArrowDown size={16} /> OPEN BOTTOM
          </ActionButton>
        </div>

        <div
          style={{
            fontSize: '0.7rem',
            color: '#94a3b8',
            fontFamily: 'JetBrains Mono',
          }}
        >
          STATUS:{' '}
          {openPlacement ? `ACTIVE <${openPlacement.toUpperCase()}>` : 'IDLE'}
        </div>
      </ControlCenter>

      {/* Overlay Backdrop */}
      <Overlay $isOpen={!!openPlacement} onClick={closeDrawer} />

      {/* Drawer Panels - We render all but only show the active one via CSS transform */}
      {['right', 'left', 'top', 'bottom'].map((placement) => (
        <DrawerPanel
          key={placement}
          $placement={placement}
          $isOpen={openPlacement === placement}
        >
          {/* Engineering "Ruler" Strip */}
          <RulerStrip>
            <span>POS: {placement.toUpperCase()}</span>
            <span>OFFSET: 0.00px</span>
            <span style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: 1, height: 8, background: '#cbd5e1' }}
                />
              ))}
            </span>
          </RulerStrip>

          <DrawerHeader>
            <DrawerTitle>
              <h3>Configuration Panel</h3>
              <div>ID: #8A-2941 // {placement}</div>
            </DrawerTitle>
            <CloseButton onClick={closeDrawer}>
              <X size={20} />
            </CloseButton>
          </DrawerHeader>

          <DrawerContent>
            <h4
              style={{
                margin: '0 0 1rem 0',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
              }}
            >
              System Parameters
            </h4>
            <p>
              This is a standard engineering-style drawer component. It uses a
              flat design language with high contrast borders and monospace data
              typography.
            </p>
            <ul
              style={{
                paddingLeft: '1.2rem',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.85rem',
              }}
            >
              <li style={{ marginBottom: '0.5rem' }}>
                Render_Mode: Hardware_Accel
              </li>
              <li style={{ marginBottom: '0.5rem' }}>Z-Index: LAYER_60</li>
              <li style={{ marginBottom: '0.5rem' }}>
                Animation: Cubic-Bezier
              </li>
              <li>Backdrop: Grid_Pattern_Alpha_10</li>
            </ul>

            <div
              style={{
                marginTop: '2rem',
                border: '1px dashed #cbd5e1',
                padding: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: '#64748b',
                  fontSize: '0.8rem',
                }}
              >
                <ShieldCheck size={14} /> SECURITY CHECK
              </div>
              <div>
                Access to this panel is restricted to authorized personnel only.
                Modifications are logged in the system audit trail.
              </div>
            </div>
          </DrawerContent>

          <DrawerFooter>
            <SecondaryButton onClick={closeDrawer}>CANCEL</SecondaryButton>
            <PrimaryButton onClick={closeDrawer}>APPLY CHANGES</PrimaryButton>
          </DrawerFooter>
        </DrawerPanel>
      ))}
    </BlueprintWrapper>
  );
};

export default BlueprintDrawerLayout;
