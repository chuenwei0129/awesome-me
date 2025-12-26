import {
  FileText,
  Grid,
  MousePointer2,
  ShieldAlert,
  Sliders,
  Type,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

/**
 * Global Styles (Injected for portability)
 * Extends the previous blueprint variables with input/slider specific styles.
 */
const styles = `
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --font-ui: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 2rem;
  font-family: var(--font-ui);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.diagram-canvas {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}

/* Header */
.diagram-header {
  border-bottom: 1px solid var(--c-border);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background: #fff;
  z-index: 10;
  position: relative;
}

.diagram-title {
  font-family: var(--font-mono);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--c-text-main);
}

/* Watermark Wrapper */
.watermark-wrapper {
  position: relative;
  overflow: hidden;
  /* Ensure content is strictly contained */
  isolation: isolate; 
}

/* The Content being protected (Mock Blueprint) */
.blueprint-content {
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-height: 400px;
  background-image: 
    linear-gradient(var(--c-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--c-border) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: -1px -1px;
}

.tech-box {
  border: 1px solid var(--c-text-main);
  background: white;
  padding: 1.5rem;
  position: relative;
}
.tech-box::before {
  content: '';
  position: absolute;
  top: -4px; left: -4px; width: 8px; height: 8px;
  border: 1px solid var(--c-text-main);
  background: white;
}
.tech-box::after {
  content: '';
  position: absolute;
  bottom: -4px; right: -4px; width: 8px; height: 8px;
  background: var(--c-text-main);
}

.tech-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  margin-bottom: 1rem;
  display: block;
}

.tech-lines {
  height: 100px;
  border-left: 1px dashed var(--c-border);
  margin-left: 10px;
}

/* Controls Panel */
.controls-panel {
  border-top: 1px solid var(--c-border);
  padding: 1.5rem 2rem;
  background-color: #fcfcfc;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  z-index: 10;
  position: relative;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  text-transform: uppercase;
}

/* Blueprint Input */
.bp-input {
  border: 1px solid var(--c-border);
  padding: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--c-text-main);
  outline: none;
  background: white;
  width: 100%;
}
.bp-input:focus {
  border-color: var(--c-text-main);
}

/* Blueprint Slider (Range) */
.bp-range {
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: var(--c-border);
  outline: none;
  margin-top: 0.5rem;
}
.bp-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: white;
  border: 1px solid var(--c-text-main);
  cursor: pointer;
}
`;

/**
 * Watermark Component
 * Generates a tiled background image using Canvas API
 */
const Watermark = ({
  text = 'DRAFT',
  color = 'rgba(0,0,0,0.15)',
  fontSize = 16,
  rotate = -22,
  gap = 100,
  children,
}) => {
  const [bgUrl, setBgUrl] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio || 1;

    // Measure text roughly
    ctx.font = `${fontSize}px "JetBrains Mono"`;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;

    // Calculate canvas size based on gap and rotation
    // A simplified heuristic for grid size
    const canvasSize = Math.max(textWidth, gap) + gap / 2;

    canvas.width = canvasSize * pixelRatio;
    canvas.height = canvasSize * pixelRatio;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    ctx.scale(pixelRatio, pixelRatio);

    // Draw config
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.rotate((Math.PI / 180) * rotate);
    ctx.font = `${fontSize}px "JetBrains Mono"`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(text, 0, 0);

    setBgUrl(canvas.toDataURL());
  }, [text, color, fontSize, rotate, gap]);

  return (
    <div className="watermark-wrapper" style={{ position: 'relative' }}>
      {/* Background Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgUrl})`,
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
          zIndex: 9999, // High z-index to sit on top
        }}
      />
      {children}
    </div>
  );
};

export default function WatermarkDemo() {
  const [content, setContent] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.15);
  const [rotate, setRotate] = useState(-22);
  const [fontSize, setFontSize] = useState(16);

  // Compute RGBA color from opacity
  const color = `rgba(15, 23, 42, ${opacity})`; // slate-900 with opacity

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="diagram-canvas">
          <header className="diagram-header">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <ShieldAlert size={18} strokeWidth={1.5} />
              <span className="diagram-title">SEC_LAYER_01 // Watermark</span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--c-text-sub)',
              }}
            >
              v2.4.0
            </span>
          </header>

          <Watermark
            text={content}
            color={color}
            rotate={rotate}
            fontSize={fontSize}
            gap={120}
          >
            {/* The "Blueprint" Content underneath */}
            <div className="blueprint-content">
              <div className="tech-box">
                <span className="tech-label">MODULE_A // SERVER_CLUSTER</span>
                <Grid
                  size={32}
                  strokeWidth={1}
                  color="#cbd5e1"
                  style={{ marginBottom: '1rem' }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    lineHeight: '1.6',
                  }}
                >
                  STATUS: ONLINE
                  <br />
                  UPTIME: 99.9%
                  <br />
                  LOAD: 42%
                </div>
                <div className="tech-lines" />
              </div>

              <div className="tech-box" style={{ marginTop: '3rem' }}>
                <span className="tech-label">MODULE_B // DATABASE_SHARD</span>
                <FileText
                  size={32}
                  strokeWidth={1}
                  color="#cbd5e1"
                  style={{ marginBottom: '1rem' }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    lineHeight: '1.6',
                  }}
                >
                  REPLICA: SYNCED
                  <br />
                  LATENCY: 12ms
                  <br />
                  REGION: US-EAST
                </div>
              </div>
            </div>
          </Watermark>

          {/* Configuration Panel */}
          <div className="controls-panel">
            <div className="control-group">
              <label className="control-label">
                <Type size={12} style={{ display: 'inline', marginRight: 6 }} />
                Text Content
              </label>
              <input
                type="text"
                className="bp-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="control-group">
              <label className="control-label">
                <MousePointer2
                  size={12}
                  style={{ display: 'inline', marginRight: 6 }}
                />
                Rotation: {rotate}°
              </label>
              <input
                type="range"
                min="-90"
                max="90"
                value={rotate}
                onChange={(e) => setRotate(Number(e.target.value))}
                className="bp-range"
              />
            </div>

            <div className="control-group">
              <label className="control-label">
                <Sliders
                  size={12}
                  style={{ display: 'inline', marginRight: 6 }}
                />
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="bp-range"
              />
            </div>

            <div className="control-group">
              <label className="control-label">Size: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="48"
                step="1"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bp-range"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
