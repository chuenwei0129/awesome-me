import { FileAudio, Pause, Play, Settings } from 'lucide-react';
import React, { useState } from 'react';

const AudioTranscriptBlueprint = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // Approx position from image

  // Sample data to match the image content
  const words = [
    { text: 'ElevenLabs', start: 0, end: 0.6 },
    { text: 'allows', start: 0.6, end: 1.0 },
    { text: 'you', start: 1.0, end: 1.2 },
    { text: 'to', start: 1.2, end: 1.4 },
    { text: 'generate', start: 1.4, end: 2.0 },
    { text: 'audio', start: 2.0, end: 2.5 },
    { text: 'timings', start: 2.5, end: 3.0 },
    { text: '--', start: 3.0, end: 3.2 },
    { text: 'now', start: 3.2, end: 3.8, active: true }, // Highlighted in image
    { text: 'you', start: 3.8, end: 4.0 },
    { text: 'can', start: 4.0, end: 4.2 },
    { text: 'easily', start: 4.2, end: 4.8 },
    { text: 'visualize', start: 4.8, end: 5.5 },
    { text: 'them', start: 5.5, end: 5.8 },
    { text: 'too!', start: 5.8, end: 6.2 },
  ];

  // Toggle play state
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="blueprint-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-text-main: #0f172a;
          --c-text-sub: #64748b;
          --c-accent: #000000;
          --font-ui: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .blueprint-container {
          background-color: var(--c-bg);
          padding: 40px;
          font-family: var(--font-ui);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        /* Main Diagram Canvas */
        .diagram-canvas {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          width: 100%;
          max-width: 600px;
          box-shadow: none; /* No drop shadows */
        }

        /* Header Section */
        .diagram-header {
          border-bottom: 1px solid var(--c-border);
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f1f5f9;
        }

        .header-title {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: var(--c-text-main);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .header-id {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
        }

        /* Content Body */
        .diagram-body {
          padding: 24px;
          position: relative;
        }

        /* Transcript Area */
        .transcript-area {
          margin-bottom: 32px;
          line-height: 1.6;
          font-size: 18px;
          color: var(--c-text-sub);
        }

        .word {
          display: inline-block;
          padding: 0 2px;
          margin: 0 1px;
          border: 1px solid transparent; /* Layout stability */
        }

        .word.active {
          background-color: var(--c-accent);
          color: var(--c-canvas);
          border: 1px solid var(--c-accent);
        }

        /* Technical Markers/Lines */
        .tech-line {
          height: 1px;
          background-color: var(--c-border);
          width: 100%;
          margin: 8px 0;
          position: relative;
        }
        
        .tech-line::before, .tech-line::after {
          content: '';
          position: absolute;
          top: -3px;
          width: 1px;
          height: 7px;
          background-color: var(--c-border);
        }
        .tech-line::before { left: 0; }
        .tech-line::after { right: 0; }

        /* Controls Section */
        .controls-grid {
          display: grid;
          grid-template-columns: 40px 1fr 40px;
          gap: 16px;
          align-items: center;
          border: 1px solid var(--c-border);
          padding: 12px;
          background: #fafafa;
        }

        /* Buttons - Flat & Outlined */
        .btn-blueprint {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--c-text-main);
          background: white;
          cursor: pointer;
          color: var(--c-text-main);
          transition: background 0.1s;
        }
        
        .btn-blueprint:hover {
          background: #f1f5f9;
        }

        .btn-blueprint:active {
          background: #000;
          color: #fff;
        }

        /* Progress Bar - Custom Blueprint Style */
        .progress-container {
          position: relative;
          height: 24px;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .progress-track {
          width: 100%;
          height: 2px;
          background-color: var(--c-border);
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--c-text-main);
          position: absolute;
          top: 0;
          left: 0;
        }

        .progress-thumb {
          width: 12px;
          height: 12px;
          background-color: var(--c-text-main);
          position: absolute;
          top: 50%;
          transform: translate(50%, -50%); /* Center on end of fill */
          right: 0; 
          border: 1px solid var(--c-text-main);
        }

        /* Metadata */
        .meta-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          margin-top: 8px;
        }
      `}</style>

      <div className="diagram-canvas">
        {/* Header */}
        <div className="diagram-header">
          <div className="header-title">
            <FileAudio
              size={14}
              style={{
                display: 'inline',
                marginRight: '8px',
                verticalAlign: 'text-bottom',
              }}
            />
            TRANSCRIPT_SYNC_ENGINE
          </div>
          <div className="header-id">REF: 11_LABS_V2</div>
        </div>

        {/* Body */}
        <div className="diagram-body">
          {/* Transcript Visualization */}
          <div className="transcript-area">
            {words.map((word, index) => (
              <span
                key={index}
                className={`word ${word.active ? 'active' : ''}`}
              >
                {word.text}
              </span>
            ))}
          </div>

          {/* Decorative Technical Line */}
          <div className="meta-row" style={{ marginBottom: '4px' }}>
            <span>TIMING_VISUALIZATION</span>
            <span>SYNC_STATUS: ACTIVE</span>
          </div>
          <div className="tech-line"></div>

          {/* Player Controls */}
          <div className="controls-grid">
            {/* Play Button */}
            <button className="btn-blueprint" onClick={togglePlay}>
              {isPlaying ? (
                <Pause size={16} strokeWidth={2} />
              ) : (
                <Play size={16} strokeWidth={2} />
              )}
            </button>

            {/* Scrubber / Progress */}
            <div>
              <div className="progress-container">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="progress-thumb"></div>
                  </div>
                </div>
              </div>
              <div className="meta-row">
                <span>00:03.000</span>
                <span>00:05.500</span>
              </div>
            </div>

            {/* Secondary Action */}
            <button className="btn-blueprint">
              <Settings size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Footer Metadata */}
          <div
            className="meta-row"
            style={{
              marginTop: '16px',
              borderTop: '1px dashed #cbd5e1',
              paddingTop: '8px',
            }}
          >
            <span>COMPONENT: AUDIO_PLAYER</span>
            <span>STYLE: ENG_BLUEPRINT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTranscriptBlueprint;
