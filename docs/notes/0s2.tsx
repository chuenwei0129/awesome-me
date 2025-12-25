import { ChevronDown } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// --- Global Styles & Theme ---
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

// --- Helpers ---
const hsbToRgb = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [
    Math.round(f(5) * 255),
    Math.round(f(3) * 255),
    Math.round(f(1) * 255),
  ];
};

const rgbToHex = (r, g, b) => {
  return (
    '#' +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const hexToHsb = (hex) => {
  // Simplified conversion for demo
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt('0x' + hex[1] + hex[1]);
    g = parseInt('0x' + hex[2] + hex[2]);
    b = parseInt('0x' + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt('0x' + hex[1] + hex[2]);
    g = parseInt('0x' + hex[3] + hex[4]);
    b = parseInt('0x' + hex[5] + hex[6]);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  // Approximation for HSB from HSL logic (simplified)
  const v = cmax * 100;
  const sat = cmax === 0 ? 0 : (delta / cmax) * 100;

  return { h, s: sat, b: v };
};

// --- Styled Components ---

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--c-bg);
  padding: 2rem;
  font-family: var(--font-ui);
`;

const BlueprintCard = styled.div`
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  padding: 1.5rem;
  width: 320px;
  box-shadow: none;
  position: relative;

  /* Technical Crosshairs in corners */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid var(--c-border-strong);
    transition: all 0.2s;
  }
  &::before {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }
  &::after {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }
`;

// --- Trigger ---
const TriggerBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border: 2px solid var(--c-border-strong);
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;

  /* Outline offset for "focus" effect */
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 1px dashed var(--c-border);
    pointer-events: none;
  }
`;

// --- Saturation Map ---
const SaturationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background-color: ${(props) => `hsl(${props.h}, 100%, 50%)`};
  background-image: linear-gradient(to top, #000, transparent),
    linear-gradient(to right, #fff, transparent);
  border: 1px solid var(--c-border-strong);
  cursor: crosshair;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const CursorReticle = styled.div.attrs((props) => ({
  style: {
    left: `${props.x}%`,
    top: `${props.y}%`,
  },
}))`
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid white;
  box-shadow: 0 0 0 1px black; /* Double border for contrast */
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: transparent;
  z-index: 10;

  /* Crosshair lines inside */
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: white;
  }
  &::before {
    top: 5px;
    left: 1px;
    right: 1px;
    height: 1px;
    box-shadow: 0 1px 0 black;
  }
  &::after {
    left: 5px;
    top: 1px;
    bottom: 1px;
    width: 1px;
    box-shadow: 1px 0 0 black;
  }
`;

// --- Sliders ---
const ControlsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 1rem;
  align-items: center;
`;

const SlidersColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SliderTrack = styled.div`
  position: relative;
  height: 12px;
  width: 100%;
  border: 1px solid var(--c-border);
  cursor: pointer;
`;

const HueTrack = styled(SliderTrack)`
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
`;

const AlphaTrack = styled(SliderTrack)`
  /* Checkered background */
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  background-color: white;

  /* Gradient overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      transparent,
      ${(props) => props.color}
    );
  }
`;

const SliderThumb = styled.div.attrs((props) => ({
  style: {
    left: `${props.percent}%`,
  },
}))`
  position: absolute;
  top: -2px;
  bottom: -2px;
  width: 6px;
  background: transparent;
  border: 1px solid var(--c-border-strong);
  transform: translateX(-50%);
  pointer-events: none;
  background: white;
  z-index: 5;
`;

const PreviewBlock = styled.div`
  width: 36px;
  height: 36px;
  background: ${(props) => props.color};
  border: 1px solid var(--c-border-strong);
  position: relative;

  /* Alpha checkerboard behind */
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%);
    background-size: 8px 8px;
  }
`;

// --- Inputs ---
const InputRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--c-border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-main);
  cursor: pointer;
  background: var(--c-bg);

  &:hover {
    border-color: var(--c-border-strong);
  }
`;

const HexInput = styled.input`
  flex: 1;
  height: 32px;
  border: 1px solid var(--c-border);
  padding: 0 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-main);
  background: white;
  outline: none;

  &:focus {
    border-color: var(--c-border-strong);
  }
`;

const AlphaInput = styled(HexInput)`
  width: 50px;
  flex: none;
  text-align: center;
`;

const Label = styled.div`
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--c-text-sub);
  margin-bottom: 4px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

// --- Logic Hook ---
const useDraggable = (ref, onMove) => {
  const handleMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
      const y = Math.max(0, Math.min(1, (e.clientY - top) / height));
      onMove(x, y);
    },
    [ref, onMove],
  );

  const handleUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleUp);
  }, [handleMove]);

  const handleDown = useCallback(
    (e) => {
      handleMove(e); // Trigger once immediately
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
    },
    [handleMove, handleUp],
  );

  return handleDown;
};

// --- Main Component ---
const BlueprintColorPicker = () => {
  // State: HSB + Alpha
  const [h, setH] = useState(210);
  const [s, setS] = useState(100);
  const [b, setB] = useState(100);
  const [a, setA] = useState(100);

  // Refs
  const satRef = useRef(null);
  const hueRef = useRef(null);
  const alphaRef = useRef(null);

  // Derived Values
  const rgb = hsbToRgb(h, s, b);
  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
  const rgbaString = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a / 100})`;
  const fullColorHex = rgbToHex(rgb[0], rgb[1], rgb[2]); // For hue track background

  // Handlers
  const onSatChange = (x, y) => {
    setS(x * 100);
    setB((1 - y) * 100);
  };

  const onHueChange = (x) => {
    setH(x * 360);
  };

  const onAlphaChange = (x) => {
    setA(x * 100);
  };

  const onHexChange = (e) => {
    const val = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      const newHsb = hexToHsb(val);
      setH(newHsb.h);
      setS(newHsb.s);
      setB(newHsb.b);
    }
  };

  const handleSatDown = useDraggable(satRef, onSatChange);
  const handleHueDown = useDraggable(hueRef, (x) => onHueChange(x));
  const handleAlphaDown = useDraggable(alphaRef, (x) => onAlphaChange(x));

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* Trigger (Shows currently selected color) */}
        <div style={{ textAlign: 'left', width: '320px' }}>
          <Label>SELECTED_OUTPUT</Label>
          <TriggerBox color={rgbaString} />
        </div>

        {/* The Panel */}
        <BlueprintCard>
          <Label>
            <span>Spectrum_Analysis</span>
            <span>XY_COORD</span>
          </Label>

          {/* Saturation / Brightness Map */}
          <SaturationWrapper ref={satRef} h={h} onMouseDown={handleSatDown}>
            <CursorReticle x={s} y={100 - b} />
          </SaturationWrapper>

          {/* Sliders & Preview */}
          <ControlsRow>
            <SlidersColumn>
              <HueTrack ref={hueRef} onMouseDown={handleHueDown}>
                <SliderThumb percent={(h / 360) * 100} />
              </HueTrack>
              <AlphaTrack
                ref={alphaRef}
                color={fullColorHex}
                onMouseDown={handleAlphaDown}
              >
                <SliderThumb percent={a} />
              </AlphaTrack>
            </SlidersColumn>
            <PreviewBlock color={rgbaString} />
          </ControlsRow>

          {/* Inputs */}
          <div
            style={{
              borderTop: '1px dashed var(--c-border)',
              paddingTop: '12px',
            }}
          >
            <Label>
              <span>PARAM_INPUT</span>
              <span>[HEX/ALPHA]</span>
            </Label>
            <InputRow>
              <SelectBox>
                HEX <ChevronDown size={14} />
              </SelectBox>
              <HexInput
                defaultValue={hex}
                key={hex} // Hack to force update on external change while allowing editing
                onBlur={onHexChange}
              />
              <AlphaInput value={`${Math.round(a)}%`} readOnly />
            </InputRow>
          </div>

          {/* Decorative Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              fontSize: '8px',
              fontFamily: 'var(--font-mono)',
              color: '#cbd5e1',
            }}
          >
            REF: CLR_V4
          </div>
        </BlueprintCard>
      </Wrapper>
    </>
  );
};

export default BlueprintColorPicker;
