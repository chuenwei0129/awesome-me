import { X } from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// --- Global Styles & Variables ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;        /* Outer Background */
    --c-canvas: #ffffff;    /* Diagram Background */
    --c-border: #cbd5e1;    /* Slate-300 */
    --c-border-strong: #94a3b8; /* Slate-400 */
    --c-text-main: #0f172a; /* Slate-900 */
    --c-text-sub: #64748b;  /* Slate-500 */
    --c-accent: #0f172a;    /* Black Accent */
    
    --font-ui: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  body {
    background-color: var(--c-bg);
    color: var(--c-text-main);
    font-family: var(--font-ui);
    margin: 0;
    padding: 2rem;
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
`;

// --- Styled Primitives ---

const DiagramCanvas = styled.div`
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 1000px;
  box-shadow: none; /* No decorations rule */
  display: flex;
  flex-direction: column;
`;

const DiagramHeader = styled.div`
  border-bottom: 1px solid var(--c-border);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-family: var(--font-ui);
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--c-text-main);
`;

const Subtitle = styled.div`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: var(--c-border);
  }
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const Badge = styled.div`
  border: 1px solid var(--c-border);
  padding: 0.25rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-sub);
  text-transform: uppercase;
`;

const CanvasContent = styled.div`
  padding: 3rem;
  position: relative;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(var(--c-bg) 1px, transparent 1px),
    linear-gradient(90deg, var(--c-bg) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: -1px -1px;
`;

// --- Blueprint Component Elements ---

const TriggerButton = styled.button`
  background: var(--c-canvas);
  border: 1px solid
    ${(props) => (props.$active ? 'var(--c-accent)' : 'var(--c-border-strong)')};
  color: ${(props) =>
    props.$active ? 'var(--c-text-main)' : 'var(--c-text-sub)'};
  padding: 0.75rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  min-width: 140px;
  text-align: center;
  position: relative;
  z-index: 10;
  border-radius: 0; /* No rounded buttons rule */

  &:hover {
    border-color: var(--c-accent);
    color: var(--c-text-main);
  }

  /* Blueprint corner markers */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 4px;
    height: 4px;
    background: ${(props) =>
      props.$active ? 'var(--c-accent)' : 'transparent'};
  }
`;

const PopoverContainer = styled.div`
  position: absolute;
  /* Placement Logic using CSS transforms for simplicity in this demo */
  ${(props) => {
    const gap = '16px';
    switch (props.$placement) {
      case 'top':
        return css`
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-${gap});
        `;
      case 'top-start':
        return css`
          bottom: 100%;
          left: 0;
          transform: translateY(-${gap});
        `;
      case 'top-end':
        return css`
          bottom: 100%;
          right: 0;
          transform: translateY(-${gap});
        `;

      case 'bottom':
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(${gap});
        `;
      case 'bottom-start':
        return css`
          top: 100%;
          left: 0;
          transform: translateY(${gap});
        `;
      case 'bottom-end':
        return css`
          top: 100%;
          right: 0;
          transform: translateY(${gap});
        `;

      case 'left':
        return css`
          right: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(-${gap});
        `;
      case 'left-start':
        return css`
          right: 100%;
          top: 0;
          transform: translateX(-${gap});
        `;
      case 'left-end':
        return css`
          right: 100%;
          bottom: 0;
          transform: translateX(-${gap});
        `;

      case 'right':
        return css`
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(${gap});
        `;
      case 'right-start':
        return css`
          left: 100%;
          top: 0;
          transform: translateX(${gap});
        `;
      case 'right-end':
        return css`
          left: 100%;
          bottom: 0;
          transform: translateX(${gap});
        `;
      default:
        return '';
    }
  }}

  z-index: 20;
  width: 200px;
`;

const PopoverContent = styled.div`
  background: var(--c-canvas);
  border: 1px solid var(--c-text-main); /* High contrast border for active element */
  padding: 1rem;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  color: var(--c-text-main);
  position: relative;
  border-radius: 0;
`;

const PopoverHeader = styled.div`
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--c-text-sub);
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const ConnectorLine = styled.div`
  position: absolute;
  background: var(--c-text-main);

  /* Connector logic */
  ${(props) => {
    const size = '1px';
    const len = '16px'; // Must match gap
    switch (props.$placement) {
      case 'top':
        return css`
          width: ${size};
          height: ${len};
          top: 100%;
          left: 50%;
        `;
      case 'top-start':
        return css`
          width: ${size};
          height: ${len};
          top: 100%;
          left: 20px;
        `; // Visual approximation
      case 'top-end':
        return css`
          width: ${size};
          height: ${len};
          top: 100%;
          right: 20px;
        `;

      case 'bottom':
        return css`
          width: ${size};
          height: ${len};
          bottom: 100%;
          left: 50%;
        `;
      case 'bottom-start':
        return css`
          width: ${size};
          height: ${len};
          bottom: 100%;
          left: 20px;
        `;
      case 'bottom-end':
        return css`
          width: ${size};
          height: ${len};
          bottom: 100%;
          right: 20px;
        `;

      case 'left':
        return css`
          height: ${size};
          width: ${len};
          left: 100%;
          top: 50%;
        `;
      case 'left-start':
        return css`
          height: ${size};
          width: ${len};
          left: 100%;
          top: 20px;
        `;
      case 'left-end':
        return css`
          height: ${size};
          width: ${len};
          left: 100%;
          bottom: 20px;
        `;

      case 'right':
        return css`
          height: ${size};
          width: ${len};
          right: 100%;
          top: 50%;
        `;
      case 'right-start':
        return css`
          height: ${size};
          width: ${len};
          right: 100%;
          top: 20px;
        `;
      case 'right-end':
        return css`
          height: ${size};
          width: ${len};
          right: 100%;
          bottom: 20px;
        `;
      default:
        return '';
    }
  }}
`;

const PlacementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 80px);
  gap: 2rem;
  width: 100%;
  max-width: 800px;

  /* Grid Areas based on image layout */
  .pos-top-start {
    grid-area: 1 / 2;
  }
  .pos-top {
    grid-area: 1 / 3;
  }
  .pos-top-end {
    grid-area: 1 / 4;
  }

  .pos-left-start {
    grid-area: 2 / 1;
  }
  .pos-right-start {
    grid-area: 2 / 5;
  }

  .pos-left-end {
    grid-area: 4 / 1;
  }
  .pos-right-end {
    grid-area: 4 / 5;
  }

  .pos-bottom-start {
    grid-area: 5 / 2;
  }
  .pos-bottom-end {
    grid-area: 5 / 4;
  }

  /* Centers alignment */
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// --- Reusable Logic ---

const PopoverDemo = ({ placement, isOpen, onToggle }) => {
  return (
    <div style={{ position: 'relative' }} className={`pos-${placement}`}>
      <TriggerButton $active={isOpen} onClick={() => onToggle(placement)}>
        {placement}
      </TriggerButton>

      {isOpen && (
        <PopoverContainer $placement={placement}>
          <PopoverContent>
            <PopoverHeader>
              <span>ID: 0X{placement.toUpperCase().replace('-', '')}</span>
              <X size={12} />
            </PopoverHeader>
            <div>Engineering style popover content content.</div>
          </PopoverContent>
          <ConnectorLine $placement={placement} />
        </PopoverContainer>
      )}
    </div>
  );
};

// --- Main App Component ---

const BlueprintPopoverLayout = () => {
  // Initial state matches the uploaded image (top and top-end active)
  const [activePopovers, setActivePopovers] = useState(['top', 'top-end']);

  const togglePopover = (placement) => {
    setActivePopovers((prev) =>
      prev.includes(placement)
        ? prev.filter((p) => p !== placement)
        : [...prev, placement],
    );
  };

  const positions = [
    'top-start',
    'top',
    'top-end',
    'left-start',
    'right-start',
    'left-end',
    'right-end',
    'bottom-start',
    'bottom-end',
  ];

  return (
    <>
      <GlobalStyle />
      <DiagramCanvas>
        <DiagramHeader>
          <TitleBlock>
            <Title>Popover.Component</Title>
            <Subtitle>Ref: Blueprint_UI_v2.0 // Placement_Matrix</Subtitle>
          </TitleBlock>
          <HeaderControls>
            <Badge>React</Badge>
            <Badge>Styled</Badge>
            <Badge>V.1.0.4</Badge>
          </HeaderControls>
        </DiagramHeader>

        <CanvasContent>
          {/* Background Grid Lines for effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              border: '1px solid transparent',
            }}
          >
            {/* Crosshair Center */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '20px',
                height: '1px',
                background: 'var(--c-border-strong)',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '1px',
                height: '20px',
                background: 'var(--c-border-strong)',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>

          <PlacementGrid>
            {positions.map((pos) => (
              <PopoverDemo
                key={pos}
                placement={pos}
                isOpen={activePopovers.includes(pos)}
                onToggle={togglePopover}
              />
            ))}
          </PlacementGrid>
        </CanvasContent>

        {/* Footer Meta Data */}
        <div
          style={{
            borderTop: '1px solid var(--c-border)',
            padding: '1rem 1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--c-text-sub)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>STATUS: RENDERING</div>
          <div>XY: RELATIVE_GRID</div>
        </div>
      </DiagramCanvas>
    </>
  );
};

export default BlueprintPopoverLayout;
