import { ChevronDown, Copy, Pipette, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// --- Global Theme Variables (CSS Variables) ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;       /* Slate-300 */
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
  padding: 2rem;
  font-family: var(--font-ui);
  color: var(--c-text-main);
`;

const DiagramCanvas = styled.div`
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  position: relative;
  box-shadow: none;
`;

const Header = styled.div`
  border-bottom: 2px solid var(--c-border-strong);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  margin: 0;
`;

const Subtitle = styled.div`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  margin-top: 0.25rem;
`;

const MetaTag = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--c-text-sub);
  text-align: right;
  line-height: 1.4;
`;

// --- Trigger Area ---

const TriggerContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--c-text-sub);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  border: 2px solid
    ${(props) => (props.$isOpen ? 'var(--c-border-strong)' : 'var(--c-border)')};
  background: white;
  cursor: pointer;
  transition: border-color 0.1s;
  padding: 0 1rem;

  &:hover {
    border-color: var(--c-border-strong);
  }
`;

const ColorPreviewBlock = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.color};
  border: 1px solid var(--c-border-strong);
  margin-right: 1rem;
  position: relative;

  /* Hatch pattern for transparency visual if needed, but keeping simple for flat style */
`;

const HexValue = styled.span`
  font-family: var(--font-mono);
  font-weight: 600;
  flex-grow: 1;
`;

// --- Popover Panel ---

const Popover = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: -2px; /* Overlap border */
  border: 2px solid var(--c-border-strong);
  background: var(--c-canvas);
  z-index: 10;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// --- Color Grid (Technical Palette) ---

const GridSection = styled.div``;

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  margin-top: 0.5rem;
`;

const Swatch = styled.button`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${(props) => props.color};
  border: 1px solid
    ${(props) => (props.$active ? 'var(--c-border-strong)' : 'transparent')};
  outline: ${(props) =>
    props.$active ? '2px solid var(--c-border-strong)' : 'none'};
  outline-offset: 1px;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(0.9); /* Mechanical press feel */
    border-color: var(--c-text-sub);
  }
`;

// --- Sliders (Engineered Look) ---

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SliderLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  width: 1.5rem;
  color: var(--c-text-sub);
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: var(--c-border);
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--c-border-strong);
    border: none;
    cursor: pointer;
    border-radius: 0; /* Square thumb */
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--c-border-strong);
    border: none;
    cursor: pointer;
    border-radius: 0;
  }
`;

const ValueDisplay = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  width: 2.5rem;
  text-align: right;
  border-left: 1px solid var(--c-border);
  padding-left: 0.5rem;
`;

// --- Footer Actions ---

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed var(--c-border);
  padding-top: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid var(--c-border);
  padding: 0.5rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f1f5f9;
    border-color: var(--c-border-strong);
  }

  &:active {
    background-color: var(--c-border-strong);
    color: white;
  }
`;

// --- Constants & Helpers ---
const PRESET_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#6366f1',
  '#a855f7',
  '#d946ef',
  '#f43f5e',
  '#64748b',
  '#94a3b8',
  '#cbd5e1',
  '#e2e8f0',
  '#0f172a',
];

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// --- Main Component ---

const BlueprintColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState('#3b82f6');
  const [rgb, setRgb] = useState(hexToRgb('#3b82f6'));

  // Sync RGB state when color changes from presets
  useEffect(() => {
    setRgb(hexToRgb(color));
  }, [color]);

  const handleRgbChange = (channel, value) => {
    const newRgb = { ...rgb, [channel]: parseInt(value) };
    setRgb(newRgb);
    setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    // In a real app, show a toast here
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <DiagramCanvas>
          {/* Header */}
          <Header>
            <div>
              <Title>Color_Ctrl_Unit</Title>
              <Subtitle>MODULE: INPUT_V2 // REV.04</Subtitle>
            </div>
            <MetaTag>
              TYPE: STRING/HEX
              <br />
              VALIDATION: STRICT
            </MetaTag>
          </Header>

          {/* Trigger */}
          <TriggerContainer>
            <Label>
              <span>Current Value</span>
              <span>[HEX]</span>
            </Label>
            <InputBox $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
              <ColorPreviewBlock color={color} />
              <HexValue>{color.toUpperCase()}</HexValue>
              <ChevronDown
                size={16}
                color="var(--c-text-sub)"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
              />
            </InputBox>

            {/* Decorative Connector Lines */}
            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '2rem',
                  width: '1px',
                  height: '1.5rem',
                  background: 'var(--c-border-strong)',
                  zIndex: 5,
                }}
              />
            )}

            {/* Dropdown Panel */}
            {isOpen && (
              <Popover>
                {/* Section 1: Presets */}
                <GridSection>
                  <Label>
                    <span>Standard Palette</span>
                    <span>IDX_01-16</span>
                  </Label>
                  <SwatchGrid>
                    {PRESET_COLORS.map((c) => (
                      <Swatch
                        key={c}
                        color={c}
                        $active={c.toLowerCase() === color.toLowerCase()}
                        onClick={() => setColor(c)}
                        title={c}
                      />
                    ))}
                  </SwatchGrid>
                </GridSection>

                {/* Section 2: Sliders */}
                <GridSection>
                  <Label>
                    <span>Manual Override</span>
                    <span>RGB_MIX</span>
                  </Label>
                  <SliderContainer>
                    <SliderRow>
                      <SliderLabel>R</SliderLabel>
                      <RangeInput
                        type="range"
                        min="0"
                        max="255"
                        value={rgb.r}
                        onChange={(e) => handleRgbChange('r', e.target.value)}
                      />
                      <ValueDisplay>{rgb.r}</ValueDisplay>
                    </SliderRow>
                    <SliderRow>
                      <SliderLabel>G</SliderLabel>
                      <RangeInput
                        type="range"
                        min="0"
                        max="255"
                        value={rgb.g}
                        onChange={(e) => handleRgbChange('g', e.target.value)}
                      />
                      <ValueDisplay>{rgb.g}</ValueDisplay>
                    </SliderRow>
                    <SliderRow>
                      <SliderLabel>B</SliderLabel>
                      <RangeInput
                        type="range"
                        min="0"
                        max="255"
                        value={rgb.b}
                        onChange={(e) => handleRgbChange('b', e.target.value)}
                      />
                      <ValueDisplay>{rgb.b}</ValueDisplay>
                    </SliderRow>
                  </SliderContainer>
                </GridSection>

                {/* Footer */}
                <ActionBar>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      fontSize: '0.7rem',
                      color: 'var(--c-text-sub)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <Pipette size={14} /> SAMPLER_READY
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ActionButton onClick={copyToClipboard}>
                      <Copy size={14} /> COPY
                    </ActionButton>
                    <ActionButton onClick={() => setIsOpen(false)}>
                      <X size={14} /> CLOSE
                    </ActionButton>
                  </div>
                </ActionBar>
              </Popover>
            )}
          </TriggerContainer>

          {/* Decorative Blueprint Markings */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '10px',
              height: '10px',
              borderTop: '1px solid var(--c-border)',
              borderRight: '1px solid var(--c-border)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              width: '10px',
              height: '10px',
              borderBottom: '1px solid var(--c-border)',
              borderLeft: '1px solid var(--c-border)',
            }}
          />
        </DiagramCanvas>
      </Wrapper>
    </>
  );
};

export default BlueprintColorPicker;
