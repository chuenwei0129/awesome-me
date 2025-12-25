import { ChevronLeft, ChevronRight, Disc, Hash, Monitor } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// --- Global Theme ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-border-strong: #0f172a;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-slide-bg: #334155; /* Slate-700 matching the reference image */
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// --- Styled Components ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--c-bg);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-family: var(--font-ui);
`;

const CarouselFrame = styled.div`
  width: 640px;
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  padding: 1rem;
  position: relative;

  /* Technical Corner Marks */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 12px;
    height: 12px;
    border-top: 3px solid var(--c-border-strong);
    border-left: 3px solid var(--c-border-strong);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 12px;
    height: 12px;
    border-bottom: 3px solid var(--c-border-strong);
    border-right: 3px solid var(--c-border-strong);
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-sub);
  text-transform: uppercase;
`;

const Viewport = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  background: #000;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--c-border-strong);
`;

const Track = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.4s cubic-bezier(0.2, 0, 0.2, 1);
  transform: translateX(-${(props) => props.$index * 100}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  background-color: var(--c-slide-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;

  /* Grid Overlay for "Blueprint" feel on the slide itself */
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
`;

const SlideContent = styled.div`
  font-family: var(--font-mono);
  font-size: 3rem;
  font-weight: 700;
  z-index: 10;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.3);
`;

const MetaData = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  opacity: 0.6;
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  padding-left: 0.5rem;
`;

// --- Navigation Controls ---

const ArrowBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.2s;
  z-index: 20;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  ${(props) => (props.$pos === 'left' ? 'left: 0;' : 'right: 0;')}
`;

const IndicatorsBar = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 20;
`;

// Rectangular "Bar" Indicator
const Indicator = styled.button`
  width: 32px;
  height: 4px;
  border: none;
  background: ${(props) => (props.$active ? 'white' : 'rgba(255,255,255,0.3)')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.$active ? 'white' : 'rgba(255,255,255,0.6)'};
  }
`;

// --- Main Component ---

const BlueprintCarousel = () => {
  const [current, setCurrent] = useState(0);
  const slides = [1, 2, 3, 4]; // Simplified data (just numbers)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  // Optional: Auto-play logic
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <CarouselFrame>
          <HeaderInfo>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Monitor size={14} /> DISPLAY_UNIT_01
            </div>
            <div>STATUS: CYCLING</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Hash size={14} /> IDX: {current + 1}/{slides.length}
            </div>
          </HeaderInfo>

          <Viewport>
            <Track $index={current}>
              {slides.map((num, idx) => (
                <Slide key={idx}>
                  <MetaData>
                    FRAME_{num}
                    <br />
                    RES: 1920x1080
                  </MetaData>
                  <SlideContent>{num}</SlideContent>

                  {/* Decorative Crosshair in center */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '20px',
                      height: '1px',
                      background: 'rgba(255,255,255,0.3)',
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
                      background: 'rgba(255,255,255,0.3)',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </Slide>
              ))}
            </Track>

            {/* Controls Layer */}
            <ArrowBtn $pos="left" onClick={prev}>
              <ChevronLeft size={32} />
            </ArrowBtn>

            <ArrowBtn $pos="right" onClick={next}>
              <ChevronRight size={32} />
            </ArrowBtn>

            <IndicatorsBar>
              {slides.map((_, idx) => (
                <Indicator
                  key={idx}
                  $active={current === idx}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </IndicatorsBar>
          </Viewport>

          {/* Footer Decoration */}
          <div
            style={{
              borderTop: '1px dashed var(--c-border)',
              marginTop: '0.5rem',
              paddingTop: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--c-text-sub)',
            }}
          >
            <span>
              <Disc
                size={10}
                style={{ verticalAlign: 'middle', marginRight: 4 }}
              />{' '}
              AUTO_PLAY: ON
            </span>
            <span>TRANSITION: 400MS_EASE</span>
          </div>
        </CarouselFrame>
      </Wrapper>
    </>
  );
};

export default BlueprintCarousel;
