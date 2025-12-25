import {
  ChevronsLeft,
  ChevronsRight,
  Hash,
  MoveHorizontal,
  Settings,
} from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// --- Global Theme ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;        /* Slate-300 */
    --c-border-strong: #0f172a; /* Slate-900 */
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// --- Styled Components ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-ui);
  padding: 2rem;
`;

const BlueprintCard = styled.div`
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  /* Technical corners */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 10px;
    height: 10px;
    border-top: 3px solid var(--c-border-strong);
    border-left: 3px solid var(--c-border-strong);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 10px;
    height: 10px;
    border-bottom: 3px solid var(--c-border-strong);
    border-right: 3px solid var(--c-border-strong);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid var(--c-border-strong);
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: -0.025em;
`;

const Meta = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--c-text-sub);
  text-align: right;
`;

// --- The Slider Component ---

const SliderContainer = styled.div`
  position: relative;
  height: 40px; /* Space for track + ticks */
  display: flex;
  align-items: center;
  margin: 1rem 0;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const TrackLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  background: var(--c-border);
  transform: translateY(-50%);
  z-index: 0;
`;

const FillLine = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  height: 2px;
  background: var(--c-border-strong);
  transform: translateY(-50%);
  width: ${(props) => props.$percent}%;
  z-index: 1;
`;

const TicksContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 20px;
  margin-top: 8px; /* Push down below track */
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const TickMark = styled.div`
  width: 1px;
  height: ${(props) => (props.$isMain ? '10px' : '5px')};
  background: ${(props) =>
    props.$isMain ? 'var(--c-border-strong)' : 'var(--c-border)'};
  position: relative;

  /* Number label for main ticks */
  &::after {
    content: '${(props) => props.$label}';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--c-text-sub);
    display: ${(props) => (props.$isMain ? 'block' : 'none')};
    margin-top: 4px;
  }
`;

const Thumb = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => props.$percent}%;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid var(--c-border-strong);
  transform: translate(-50%, -50%);
  z-index: 10;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.1s;

  /* Center indicator line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: var(--c-error, #ef4444); /* Red line for precision */
    transform: translateX(-50%);
  }

  &:hover {
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    box-shadow: none;
    background: var(--c-border-strong);
    /* Invert line color when active */
    &::before {
      background: white;
    }
  }
`;

// --- Input / Controls Section ---

const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const ValueBox = styled.div`
  flex: 1;
  border: 1px solid var(--c-border);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;

  &:focus-within {
    border-color: var(--c-border-strong);
    outline: 1px solid var(--c-border-strong);
  }
`;

const DigitalInput = styled.input`
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--c-text-main);
  border: none;
  outline: none;
  width: 100%;
  text-align: right;
  background: transparent;
`;

const UnitLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid var(--c-border);
`;

const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--c-border);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--c-text-main);

  &:hover {
    border-color: var(--c-border-strong);
    background: #f1f5f9;
  }
  &:active {
    background: var(--c-border-strong);
    color: white;
  }
`;

// --- React Component ---

const BlueprintSlider = ({ min = 0, max = 100, step = 1, unit = '%' }) => {
  const [value, setValue] = useState(32);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper: Percentage for display
  const getPercent = useCallback(
    (val) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max],
  );

  // Logic: Handle Mouse Move
  const handleMove = useCallback(
    (clientX) => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      let percent = (clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));

      const rawValue = min + percent * (max - min);
      // Snap to step
      const steppedValue = Math.round(rawValue / step) * step;

      setValue(Math.max(min, Math.min(max, steppedValue)));
    },
    [min, max, step],
  );

  // Logic: Mouse/Touch Events
  const onMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);

    const onMouseMove = (e) => handleMove(e.clientX);
    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleInputChange = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      // Allow typing out of bounds temporarily, but could clamp on blur
      setValue(val);
    }
  };

  const handleBlur = () => {
    setValue((prev) => Math.max(min, Math.min(max, prev)));
  };

  const adjustValue = (delta) => {
    setValue((prev) => Math.max(min, Math.min(max, prev + delta)));
  };

  // Generate Ticks
  const renderTicks = () => {
    const ticks = [];
    const count = 10; // Number of intervals
    for (let i = 0; i <= count; i++) {
      const p = i * (100 / count);
      const labelValue = Math.round(min + (i / count) * (max - min));
      ticks.push(
        <TickMark
          key={i}
          $isMain={i % 2 === 0} // Alternate tall/short ticks
          $label={labelValue}
        />,
      );
    }
    return ticks;
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <BlueprintCard>
          <Header>
            <div>
              <Title>Param_Adjuster</Title>
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  marginTop: '4px',
                  fontSize: '0.7rem',
                  color: 'var(--c-text-sub)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Settings size={12} /> MANUAL_OVERRIDE
              </div>
            </div>
            <Meta>
              MIN: {min} | MAX: {max}
              <br />
              STEP: {step}
            </Meta>
          </Header>

          {/* Slider Section */}
          <div style={{ padding: '0 0.5rem' }}>
            <SliderContainer ref={trackRef} onMouseDown={onMouseDown}>
              <TrackLine />
              <FillLine $percent={getPercent(value)} />

              <TicksContainer>{renderTicks()}</TicksContainer>

              <Thumb $percent={getPercent(value)} />
            </SliderContainer>
          </div>

          {/* Controls Section */}
          <ControlsGroup>
            <IconButton onClick={() => adjustValue(-step)}>
              <ChevronsLeft size={16} />
            </IconButton>

            <ValueBox>
              <Hash size={14} className="text-slate-400 mr-2" />
              <DigitalInput
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <UnitLabel>{unit}</UnitLabel>
            </ValueBox>

            <IconButton onClick={() => adjustValue(step)}>
              <ChevronsRight size={16} />
            </IconButton>
          </ControlsGroup>

          {/* Decorative Footer */}
          <div
            style={{
              borderTop: '1px dashed var(--c-border)',
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--c-text-sub)',
            }}
          >
            <span>
              <MoveHorizontal
                size={10}
                style={{ marginRight: 4, verticalAlign: 'middle' }}
              />{' '}
              AXIS_X_CONTROL
            </span>
            <span>CALIBRATED</span>
          </div>
        </BlueprintCard>
      </Wrapper>
    </>
  );
};

export default BlueprintSlider;
