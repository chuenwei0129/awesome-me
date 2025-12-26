import {
  ExternalLink,
  FileAudio,
  FileImage,
  FileVideo,
  Hash,
  Image as ImageIcon,
  Maximize,
  Play,
  Volume2,
} from 'lucide-react';

const MarkdownBlueprint = () => {
  return (
    <div className="blueprint-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-border-strong: #94a3b8;
          --c-text-main: #0f172a;
          --c-text-sub: #64748b;
          --c-code-bg: #f1f5f9;
          --font-ui: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .blueprint-wrapper {
          background-color: var(--c-bg);
          padding: 40px;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          font-family: var(--font-ui);
          color: var(--c-text-main);
        }

        /* Document Sheet */
        .doc-sheet {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          width: 800px;
          position: relative;
          box-shadow: 10px 10px 0px rgba(0,0,0,0.05); /* Architectural block shadow */
        }

        /* Header */
        .doc-header {
          border-bottom: 2px solid var(--c-text-main);
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        
        .doc-title {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 24px;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }

        .doc-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--c-text-sub);
          text-align: right;
          line-height: 1.4;
        }

        /* Content Area */
        .doc-content {
          padding: 40px 48px;
        }

        /* Typography Mapping */
        h1, h2, h3 {
          font-family: var(--font-ui);
          color: var(--c-text-main);
          margin-top: 32px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        h1 { font-size: 28px; font-weight: 800; letter-spacing: -1px; border-bottom: 1px solid var(--c-border); padding-bottom: 8px; }
        h2 { font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 48px; }
        p { font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 16px; max-width: 65ch; }
        
        strong { font-weight: 800; color: #000; }
        em { font-family: var(--font-mono); font-style: normal; background: #f1f5f9; padding: 0 4px; font-size: 0.9em; }

        /* Blueprint Modules (Media Wrappers) */
        .module-frame {
          border: 1px solid var(--c-border);
          margin: 24px 0;
          background: #fff;
        }

        .module-header {
          border-bottom: 1px solid var(--c-border);
          padding: 6px 12px;
          background: #f8fafc;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          display: flex;
          justify-content: space-between;
          text-transform: uppercase;
        }

        /* Video Player Style */
        .video-container {
          position: relative;
          aspect-ratio: 16/9;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        /* Grid overlay for video placeholder */
        .video-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .play-btn-large {
          width: 64px;
          height: 64px;
          border: 2px solid var(--c-text-main);
          background: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transition: all 0.2s;
        }
        .play-btn-large:hover { background: #fff; transform: scale(1.05); }

        .video-controls {
          border-top: 1px solid var(--c-border);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: #fff;
          font-family: var(--font-mono);
          font-size: 11px;
        }

        /* Audio Player Style */
        .audio-row {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 16px;
        }
        
        .waveform-viz {
          flex: 1;
          height: 24px;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .wave-bar {
          width: 3px;
          background: var(--c-border);
          height: 100%;
        }
        .wave-bar.active { background: var(--c-text-main); }

        /* Image Style */
        .image-preview {
          padding: 16px;
          background: #fff;
          display: flex;
          justify-content: center;
        }
        .img-placeholder {
          width: 100%;
          height: 240px;
          background: #f1f5f9;
          border: 1px dashed var(--c-border-strong);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--c-text-sub);
        }
        
        .caption-bar {
          padding: 8px 12px;
          border-top: 1px solid var(--c-border);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--c-text-sub);
          display: flex;
          gap: 12px;
        }

        /* Code Block */
        .code-block {
          background: var(--c-code-bg);
          border: 1px solid var(--c-border);
          padding: 16px;
          margin: 16px 0;
          font-family: var(--font-mono);
          font-size: 13px;
          overflow-x: auto;
          position: relative;
        }
        .code-lang-tag {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--c-border);
          color: #fff;
          font-size: 10px;
          padding: 2px 8px;
          text-transform: uppercase;
        }

        /* Lists */
        .tech-list {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }
        .tech-list li {
          display: flex;
          align-items: baseline;
          margin-bottom: 8px;
          padding-left: 8px;
        }
        .tech-list li::before {
          content: '[+]';
          font-family: var(--font-mono);
          color: var(--c-text-sub);
          margin-right: 12px;
          font-size: 12px;
        }

        /* Progress Bar Shared */
        .scrubber-track {
          flex: 1;
          height: 1px;
          background: var(--c-border);
          position: relative;
        }
        .scrubber-fill {
          height: 2px;
          background: var(--c-text-main);
          position: absolute; top: -0.5px;
        }
        .scrubber-thumb {
          width: 8px; height: 8px; background: var(--c-text-main);
          position: absolute; top: -3px; margin-left: -4px;
        }

        /* Button Reset */
        .icon-btn {
          background: none; border: 1px solid transparent; 
          cursor: pointer; padding: 4px; display: flex;
          color: var(--c-text-main);
        }
        .icon-btn:hover { background: #f1f5f9; border-color: var(--c-border); }

      `}</style>

      <div className="doc-sheet">
        {/* Document Header */}
        <div className="doc-header">
          <div>
            <div className="doc-title">Engineering Rendering</div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                marginTop: '4px',
              }}
            >
              MD_PARSER_V4.2 // COMPONENT_DEMO
            </div>
          </div>
          <div className="doc-meta">
            DATE: 2025-05-18
            <br />
            AUTH: SYSTEM_ROOT
            <br />
            ID: DOC-8821
          </div>
        </div>

        <div className="doc-content">
          {/* H1 Title */}
          <h1>Multimedia Integration</h1>
          <p>
            This document demonstrates the rendering capabilities of the new{' '}
            <strong>blueprint engine</strong>. It supports embedded media types
            including video, audio, and static imagery while maintaining a
            strict engineering aesthetic.
          </p>

          {/* H2: Video Section */}
          <h2>
            <Hash size={18} style={{ marginRight: 8 }} />
            01. Video Playback Module
          </h2>
          <p>
            Video content is encapsulated in a 16:9 container with
            hardware-accelerated playback controls.
          </p>

          <div className="module-frame">
            <div className="module-header">
              <span>
                <FileVideo
                  size={10}
                  style={{ display: 'inline', marginRight: 6 }}
                />{' '}
                vid_demo_render.mp4
              </span>
              <span>1920x1080 @ 60fps</span>
            </div>
            <div className="video-container">
              <div className="video-grid"></div>
              <div className="play-btn-large">
                <Play size={32} fill="currentColor" strokeWidth={1} />
              </div>
            </div>
            <div className="video-controls">
              <button className="icon-btn">
                <Play size={14} />
              </button>
              <div className="scrubber-track">
                <div className="scrubber-fill" style={{ width: '35%' }}></div>
                <div className="scrubber-thumb" style={{ left: '35%' }}></div>
              </div>
              <span>04:20 / 12:00</span>
              <button className="icon-btn">
                <Volume2 size={14} />
              </button>
              <button className="icon-btn">
                <Maximize size={14} />
              </button>
            </div>
          </div>

          {/* H2: Audio Section */}
          <h2>
            <Hash size={18} style={{ marginRight: 8 }} />
            02. Audio Analysis
          </h2>
          <p>Audio tracks are visualized using a waveform approximation.</p>

          <div className="module-frame">
            <div className="module-header">
              <span>
                <FileAudio
                  size={10}
                  style={{ display: 'inline', marginRight: 6 }}
                />{' '}
                interview_part_1.wav
              </span>
              <span>44.1kHz / STEREO</span>
            </div>
            <div className="audio-row">
              <button
                className="icon-btn"
                style={{ border: '1px solid #000', padding: 8 }}
              >
                <Play size={16} fill="currentColor" />
              </button>

              <div className="waveform-viz">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className={`wave-bar ${i < 15 ? 'active' : ''}`}
                    style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  minWidth: '80px',
                  textAlign: 'right',
                }}
              >
                01:14 / 03:45
              </div>
            </div>
          </div>

          {/* H2: Images & Code */}
          <h2>
            <Hash size={18} style={{ marginRight: 8 }} />
            03. Static Data & Code
          </h2>

          <ul className="tech-list">
            <li>Standardized image containers with caption support.</li>
            <li>
              Monospaced syntax highlighting for technical implementation
              details.
            </li>
            <li>Responsive grid alignment.</li>
          </ul>

          {/* Image Module */}
          <div className="module-frame">
            <div className="module-header">
              <span>
                <FileImage
                  size={10}
                  style={{ display: 'inline', marginRight: 6 }}
                />{' '}
                schematic_v1.png
              </span>
              <span>SIZE: 2.4MB</span>
            </div>
            <div className="image-preview">
              <div className="img-placeholder">
                <ImageIcon
                  size={48}
                  strokeWidth={1}
                  style={{ marginBottom: 16 }}
                />
                <span
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                >
                  IMAGE_RESOURCE_NOT_FOUND
                </span>
              </div>
            </div>
            <div className="caption-bar">
              <strong>FIG 1.1:</strong> System architecture diagram showing data
              flow between nodes.
            </div>
          </div>

          {/* Code Module */}
          <div className="code-block">
            <div className="code-lang-tag">TYPESCRIPT</div>
            <pre>{`interface MediaNode {
  id: string;
  type: 'video' | 'audio' | 'image';
  src: string;
  metadata: {
    duration?: number;
    dimensions?: [number, number];
  };
}

function renderNode(node: MediaNode): void {
  console.log("Initializing blueprint renderer...");
  // Connect to hardware interface
}`}</pre>
          </div>

          <p
            style={{
              marginTop: 32,
              fontSize: 13,
              borderTop: '1px solid #cbd5e1',
              paddingTop: 16,
            }}
          >
            <ExternalLink
              size={12}
              style={{ display: 'inline', marginRight: 4 }}
            />
            <a
              href="#"
              style={{
                color: 'var(--c-text-main)',
                textDecoration: 'none',
                borderBottom: '1px solid currentColor',
              }}
            >
              View Full Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarkdownBlueprint;
