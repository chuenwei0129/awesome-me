import {
  Activity,
  AlertTriangle,
  Layers,
  Moon,
  Pause,
  Play,
  Search,
  Sun,
  Terminal,
} from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

/* ==========================================================================
   1. GLOBAL STYLES & THEME
   ========================================================================== */
const styles = `
:root {
  /* Dimensions */
  --sidebar-l-w: 260px;
  --sidebar-r-w: 220px;
  --header-h: 54px;
  --max-w: 1400px;

  /* --- LIGHT THEME --- */
  --c-bg: #f0f2f5;
  --c-panel: #ffffff;
  --c-border: #cbd5e1;
  --c-border-strong: #94a3b8;
  --c-text: #0f172a;
  --c-text-sub: #64748b;
  --c-accent: #0f172a;
  --c-hover: #f1f5f9;
  --c-code: #f8fafc;
  --c-grid: rgba(15, 23, 42, 0.04);
}

[data-theme='dark'] {
  /* --- DARK THEME --- */
  --c-bg: #020617;
  --c-panel: #0f172a;
  --c-border: #1e293b;
  --c-border-strong: #334155;
  --c-text: #f8fafc;
  --c-text-sub: #94a3b8;
  --c-accent: #38bdf8;
  --c-hover: #1e293b;
  --c-code: #020617;
  --c-grid: rgba(255, 255, 255, 0.03);
}

* { box-sizing: border-box; }
body { 
  background-color: var(--c-bg); color: var(--c-text); 
  font-family: 'Inter', system-ui, sans-serif; margin: 0; line-height: 1.6;
  background-image: linear-gradient(var(--c-grid) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid) 1px, transparent 1px);
  background-size: 40px 40px;
}
.font-mono { font-family: 'JetBrains Mono', monospace; }
.scroll-bar { position: fixed; top: 0; left: 0; height: 3px; background: var(--c-accent); z-index: 2000; transition: width 0.1s; }

/* --- APP LAYOUT --- */
.sys-header {
  position: fixed; top: 0; left: 0; right: 0; height: var(--header-h);
  background: var(--c-panel); border-bottom: 1px solid var(--c-border);
  z-index: 1000; display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; font-size: 11px; backdrop-filter: blur(8px);
}

.layout-grid {
  max-width: var(--max-w); margin: 0 auto;
  padding: calc(var(--header-h) + 32px) 24px 40px;
  display: grid;
  grid-template-columns: var(--sidebar-l-w) 1fr var(--sidebar-r-w);
  gap: 32px;
  align-items: start;
}

/* Responsive Hide */
@media (max-width: 1100px) { .layout-grid { grid-template-columns: 240px 1fr; } .right-col { display: none; } }
@media (max-width: 800px) { .layout-grid { grid-template-columns: 1fr; } .left-col { display: none; } }

/* --- LEFT COL: SYSTEM DIRECTORY --- */
.dir-card {
  background: var(--c-panel); border: 1px solid var(--c-border);
  position: sticky; top: 80px; max-height: 80vh; overflow-y: auto;
  display: flex; flex-direction: column;
}
.dir-head { padding: 16px; border-bottom: 1px solid var(--c-border); background: var(--c-hover); }
.dir-search {
  width: 100%; background: var(--c-panel); border: 1px solid var(--c-border);
  padding: 8px 8px 8px 32px; font-size: 11px; color: var(--c-text); outline: none;
}
.dir-search:focus { border-color: var(--c-accent); }

.dir-list { list-style: none; padding: 0; margin: 0; }
.dir-item {
  padding: 10px 16px; border-bottom: 1px solid var(--c-border); cursor: pointer;
  transition: all 0.2s; position: relative;
}
.dir-item:hover, .dir-item.active { background: var(--c-hover); }
.dir-item.active { border-left: 3px solid var(--c-accent); padding-left: 13px; }
.dir-meta { display: flex; gap: 8px; font-size: 10px; color: var(--c-text-sub); margin-top: 4px; }
.status-dot { width: 6px; height: 6px; borderRadius: 50%; }

/* --- MIDDLE COL: DOCUMENT --- */
.doc-sheet {
  background: var(--c-panel); border: 1px solid var(--c-border);
  position: relative; box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.doc-sheet::before, .doc-sheet::after { content: '+'; position: absolute; top: -5px; color: var(--c-border-strong); }
.doc-sheet::before { left: -5px; } .doc-sheet::after { right: -5px; }

.article-content { padding: 60px; font-size: 16px; }
.article-content h1 { display: none; } /* Handled by meta header */
.article-content h2 { 
  font-size: 22px; font-weight: 700; margin: 48px 0 24px; 
  padding-bottom: 12px; border-bottom: 1px solid var(--c-border); 
  display: flex; justify-content: space-between; align-items: baseline; scroll-margin-top: 80px;
}
.article-content h2::after { content: 'SEC.' counter(section); counter-increment: section; font-size: 12px; color: var(--c-text-sub); font-family: monospace; }
.article-content { counter-reset: section; }

.article-content a { color: var(--c-text); text-decoration: none; border-bottom: 1px solid var(--c-accent); }
.article-content a:hover { background: var(--c-accent); color: var(--c-bg); }

/* --- RIGHT COL: ARTICLE OUTLINE --- */
.outline-card {
  position: sticky; top: 80px;
  border-left: 1px solid var(--c-border); padding-left: 24px;
}
.outline-title { font-size: 11px; font-weight: 700; color: var(--c-text-sub); margin-bottom: 16px; letter-spacing: 1px; }
.outline-list { list-style: none; padding: 0; margin: 0; }
.outline-item {
  font-size: 12px; color: var(--c-text-sub); margin-bottom: 10px; cursor: pointer;
  transition: color 0.2s; position: relative; padding-left: 12px; display: block;
}
.outline-item:hover, .outline-item.active { color: var(--c-text); }
.outline-item::before { content: ''; position: absolute; left: 0; top: 6px; width: 4px; height: 4px; border: 1px solid var(--c-text-sub); }
.outline-item.active::before { background: var(--c-accent); border-color: var(--c-accent); }
.outline-item.level-3 { padding-left: 24px; }
.outline-item.level-3::before { border-radius: 50%; }

/* --- MODULES (Mini) --- */
.mod-frame { border: 1px solid var(--c-border); margin: 32px 0; background: var(--c-panel); }
.mod-head { padding: 6px 12px; background: var(--c-hover); border-bottom: 1px solid var(--c-border); font-size: 10px; display: flex; justify-content: space-between; color: var(--c-text-sub); }
.vid-canvas { position: relative; aspect-ratio: 16/9; background: #000; display: flex; align-items: center; justify-content: center; }
.vid-overlay { position: absolute; width: 56px; height: 56px; border: 2px solid var(--c-accent); background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; }
`;

/* ==========================================================================
   2. DATA & MOCK CONTENT
   ========================================================================== */
const SYSTEM_LOGS = [
  {
    id: 'LOG_042',
    title: 'Media Protocol V4',
    date: '2025-05-20',
    status: 'STABLE',
  },
  {
    id: 'LOG_043',
    title: 'Database Sharding',
    date: '2025-05-22',
    status: 'DRAFT',
  },
  {
    id: 'LOG_044',
    title: 'Auth Gateway',
    date: '2025-05-25',
    status: 'ARCHIVED',
  },
  {
    id: 'LOG_045',
    title: 'Frontend Metrics',
    date: '2025-06-01',
    status: 'STABLE',
  },
];

const MARKDOWN_CONTENT = `
## 1. System Overview

This document outlines the **Multimedia Protocol**. It integrates high-fidelity streams with blueprint-style controls.

> **CRITICAL**: Ensure all gateways are FLUSHED before initiating the handshake sequence.

### 1.1 Architecture
The system uses a decentralized node topology. Latency is minimized via edge caching.

### 1.2 Video Validation
We performed a stress test using the H.264 codec.

\`\`\`video
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
\`\`\`

## 2. Implementation Strategy

We will adopt a phased approach. The "Order Processing" service will be the pilot candidate.

### 2.1 Audio Logs
Debug session recording from Node 7:

\`\`\`audio
https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3
\`\`\`

### 2.2 Configuration
\`\`\`typescript filename="MediaConfig.ts"
const DEFAULT_CONFIG = {
  bitrate: 4500,
  codec: 'h264',
  latency: 'low'
};
\`\`\`

## 3. Visual Assets
Topological map of the server cluster.

![Server Cluster Map](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80 "FIG 3.1: Node Layout")

## 4. Conclusion
The protocol is ready for canary deployment.
`;

/* ==========================================================================
   3. COMPONENTS
   ========================================================================== */

// --- Video Module ---
const VideoModule = ({ src, filename }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () =>
    videoRef.current?.paused
      ? videoRef.current.play()
      : videoRef.current?.pause();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener('play', () => setIsPlaying(true));
    v.addEventListener('pause', () => setIsPlaying(false));
  }, []);

  return (
    <div className="mod-frame">
      <div className="mod-head">
        <span>VIDEO</span>
        <span>{filename}</span>
      </div>
      <div className="vid-canvas" onClick={toggle}>
        <video
          ref={videoRef}
          src={src}
          style={{ width: '100%', height: '100%' }}
        />
        {!isPlaying && (
          <div className="vid-overlay">
            <Play fill="currentColor" />
          </div>
        )}
      </div>
      <div
        style={{
          padding: 8,
          borderTop: '1px solid var(--c-border)',
          display: 'flex',
          gap: 8,
        }}
      >
        <button
          onClick={toggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--c-text)',
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div
          style={{
            flex: 1,
            height: 16,
            background: 'var(--c-hover)',
            border: '1px solid var(--c-border)',
          }}
        />
      </div>
    </div>
  );
};

// --- Left Col: System Directory ---
const SystemDirectory = ({ activeId, onSelect }) => {
  const [search, setSearch] = useState('');
  const filtered = SYSTEM_LOGS.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="dir-card font-mono">
      <div className="dir-head">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <span style={{ fontWeight: 700, display: 'flex', gap: 8 }}>
            <Terminal size={14} /> SYS_ROOT
          </span>
          <span style={{ fontSize: 10, opacity: 0.5 }}>V2.4</span>
        </div>
        <div style={{ position: 'relative' }}>
          <Search
            size={12}
            style={{ position: 'absolute', left: 10, top: 9, opacity: 0.5 }}
          />
          <input
            className="dir-search"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <ul className="dir-list">
        {filtered.map((log) => (
          <li
            key={log.id}
            className={`dir-item ${activeId === log.id ? 'active' : ''}`}
            onClick={() => onSelect(log.id)}
          >
            <div style={{ fontSize: 12, fontWeight: 700 }}>{log.title}</div>
            <div className="dir-meta">
              <span>{log.id}</span> • <span>{log.date}</span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginLeft: 'auto',
                }}
              >
                <div
                  className="status-dot"
                  style={{
                    background:
                      log.status === 'STABLE'
                        ? '#22c55e'
                        : log.status === 'DRAFT'
                        ? '#eab308'
                        : '#64748b',
                  }}
                />
                {log.status}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Right Col: Article Outline ---
const ArticleOutline = ({ headings, activeHeading }) => {
  return (
    <div className="outline-card font-mono">
      <div className="outline-title">PAGE CONTENTS</div>
      <ul className="outline-list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`outline-item level-${h.level} ${
              activeHeading === h.id ? 'active' : ''
            }`}
            onClick={() =>
              document
                .getElementById(h.id)
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            {h.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ==========================================================================
   4. MAIN LAYOUT COMPONENT
   ========================================================================== */
export default function TriColumnLayout() {
  const [isDark, setIsDark] = useState(false);
  const [activeLog, setActiveLog] = useState('LOG_042');
  const [activeHeading, setActiveHeading] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Parse Headings from Markdown for Right Column
  const headings = [
    { id: '1-system-overview', text: '1. System Overview', level: 2 },
    { id: '11-architecture', text: '1.1 Architecture', level: 3 },
    { id: '12-video-validation', text: '1.2 Video Validation', level: 3 },
    { id: '2-implementation-strategy', text: '2. Implementation', level: 2 },
    { id: '21-audio-logs', text: '2.1 Audio Logs', level: 3 },
    { id: '22-configuration', text: '2.2 Configuration', level: 3 },
    { id: '3-visual-assets', text: '3. Visual Assets', level: 2 },
    { id: '4-conclusion', text: '4. Conclusion', level: 2 },
  ];

  useEffect(() => {
    const onScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      const max =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress((scrolled / max) * 100);

      // Spy Scroll
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < 150) setActiveHeading(h.id);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Markdown Components Map
  const components = useMemo(
    () => ({
      h2: ({ node, ...props }) => (
        <h2
          id={props.children[0]
            ?.toString()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}
          {...props}
        />
      ),
      h3: ({ node, ...props }) => (
        <h3
          id={props.children[0]
            ?.toString()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}
          style={{ fontSize: 18, fontWeight: 600, margin: '24px 0 16px' }}
          {...props}
        />
      ),
      code: ({ className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const lang = match ? match[1] : '';
        const txt = String(children).replace(/\n$/, '');
        if (lang === 'video')
          return <VideoModule src={txt} filename="DEMO_STREAM.MP4" />;
        if (lang === 'audio')
          return (
            <div
              className="mod-frame"
              style={{
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: 'var(--c-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  borderRadius: '50%',
                }}
              >
                <Play size={14} />
              </div>
              <div
                style={{ flex: 1, height: 4, background: 'var(--c-border)' }}
              >
                <div
                  style={{
                    width: '30%',
                    height: '100%',
                    background: 'var(--c-accent)',
                  }}
                />
              </div>
              <span className="font-mono" style={{ fontSize: 10 }}>
                01:20
              </span>
            </div>
          );
        return (
          <div className="mod-frame">
            <div className="mod-head">
              <span>CODE</span>
              <span>{lang}</span>
            </div>
            <pre
              style={{
                padding: 16,
                overflowX: 'auto',
                fontSize: 13,
                background: 'var(--c-code)',
              }}
            >
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          </div>
        );
      },
      img: (props) => (
        <figure className="mod-frame">
          <div className="mod-head">
            <span>IMG</span>
            <span>PREVIEW</span>
          </div>
          <div
            style={{
              padding: 16,
              background: 'var(--c-hover)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              {...props}
              style={{
                maxWidth: '100%',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.05)',
              }}
            />
          </div>
        </figure>
      ),
      blockquote: ({ children }) => (
        <div
          className="mod-frame"
          style={{ padding: 16, borderLeft: '4px solid var(--c-accent)' }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 8,
              display: 'flex',
              gap: 6,
            }}
          >
            <AlertTriangle size={14} /> SYSTEM NOTICE
          </div>
          {children}
        </div>
      ),
    }),
    [],
  );

  return (
    <div className="app-root" data-theme={isDark ? 'dark' : 'light'}>
      <style>{styles}</style>

      <div className="scroll-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Header */}
      <header className="sys-header font-mono">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Layers size={16} /> <span>SYSTEM_HUB</span>{' '}
          <span style={{ color: 'var(--c-border-strong)' }}>/</span>{' '}
          <span>DOCS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />} Theme
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={12} color={isDark ? '#38bdf8' : '#0f172a'} /> ONLINE
          </div>
        </div>
      </header>

      {/* 3-Column Grid */}
      <div className="layout-grid">
        {/* Left: System Directory */}
        <aside className="left-col">
          <SystemDirectory activeId={activeLog} onSelect={setActiveLog} />
        </aside>

        {/* Middle: Document */}
        <main className="mid-col">
          <div className="doc-sheet">
            <div style={{ padding: '40px 60px 0' }}>
              <div
                className="font-mono"
                style={{
                  background: 'var(--c-accent)',
                  color: 'var(--c-bg)',
                  display: 'inline-block',
                  padding: '4px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                LOG #{activeLog.split('_')[1]}
              </div>
              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  margin: '0 0 32px',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                }}
              >
                Multimedia Protocol V4
              </h1>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  borderTop: '1px solid var(--c-border)',
                  borderLeft: '1px solid var(--c-border)',
                  marginBottom: 40,
                }}
              >
                {[
                  ['AUTH', 'Admin'],
                  ['DATE', '2025-05'],
                  ['REV', '4.2'],
                  ['READ', '5m'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      borderRight: '1px solid var(--c-border)',
                      borderBottom: '1px solid var(--c-border)',
                      padding: 10,
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        color: 'var(--c-text-sub)',
                        display: 'block',
                      }}
                    >
                      {k}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: 12, fontWeight: 700 }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="article-content">
              <ReactMarkdown
                children={MARKDOWN_CONTENT}
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSlug]}
                components={components}
              />
            </div>

            <footer
              style={{
                borderTop: '1px solid var(--c-border)',
                padding: '24px 60px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                color: 'var(--c-text-sub)',
              }}
            >
              <div className="font-mono">EOF</div>
              <div className="font-mono">HASH: 8a7f...2b1</div>
            </footer>
          </div>
        </main>

        {/* Right: Article Outline */}
        <aside className="right-col">
          <ArticleOutline headings={headings} activeHeading={activeHeading} />
        </aside>
      </div>
    </div>
  );
}
