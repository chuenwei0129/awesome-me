import { ExternalLink, Link2, Signal } from 'lucide-react';
import React from 'react';

/**
 * CSS Definitions: Flat Engineering Blueprint Style
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
  flex-direction: column;
  align-items: center;
}

/* Header Section */
.matrix-header {
  width: 100%;
  max-width: 1100px;
  border-bottom: 2px solid var(--c-text-main);
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.matrix-title {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--c-text-main);
  line-height: 1;
}

.matrix-meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  text-align: right;
}

/* Grid Layout */
.node-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
}

/* Node (Card) Component */
.node-card {
  display: flex;
  height: 200px;
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  cursor: pointer;
  /* Hard shadow for blueprint feel */
  box-shadow: 4px 4px 0 rgba(203, 213, 225, 0.4);
}

.node-card:hover {
  border-color: var(--c-text-main);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(15, 23, 42, 0.2);
  z-index: 10;
}

/* Left: Visual/Avatar Area */
.node-visual {
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #f1f5f9;
  border-right: 1px solid var(--c-border);
}

.node-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.3s ease;
}

.node-card:hover .node-img {
  filter: grayscale(0%) contrast(1);
}

/* Visual Overlays */
.overlay-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(15, 23, 42, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  opacity: 0.5;
}

.status-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: white;
  border: 1px solid var(--c-text-main);
  padding: 2px 6px;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--c-text-main);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Right: Identity Strip (Vertical Text) */
.node-strip {
  width: 48px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  overflow: hidden;
}

.strip-id {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--c-text-sub);
  transform: rotate(90deg);
  white-space: nowrap;
}

.strip-name {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Vertical Writing Mode */
  writing-mode: vertical-rl;
  text-orientation: mixed; 
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--c-text-main);
  letter-spacing: 0.1em;
  padding: 1rem 0;
}

.strip-icon {
  color: var(--c-border);
  transition: color 0.2s;
}
.node-card:hover .strip-icon {
  color: var(--c-text-main);
}

/* Corner Decorations */
.corner-tl { position: absolute; top: 0; left: 0; width: 0; height: 0; border-style: solid; border-width: 12px 12px 0 0; border-color: var(--c-text-main) transparent transparent transparent; z-index: 5; }
`;

// Mock Data
const FRIENDS = [
  {
    id: 'NK-01',
    name: "Aaki's Notebook",
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=AAKI',
    status: 'ONLINE',
  },
  {
    id: 'NK-02',
    name: 'Fish Obs. Lab',
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=FISH+LAB',
    status: 'ONLINE',
  },
  {
    id: 'NK-03',
    name: 'Cynosura',
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=CYNO',
    status: 'IDLE',
  },
  {
    id: 'NK-04',
    name: '炖鱼的碎碎念',
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=WHISPER',
    status: 'ONLINE',
  }, // Chinese characters test
  {
    id: 'NK-05',
    name: 'Steven Lynn',
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=STEVEN',
    status: 'OFFLINE',
  },
  {
    id: 'NK-06',
    name: 'Hi-Tech CMD',
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=CMD+CTR',
    status: 'ONLINE',
  },
  {
    id: 'NK-07',
    name: 'Cicada000',
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=CICADA',
    status: 'MAINT',
  },
  {
    id: 'NK-08',
    name: 'Himawari',
    avatar: 'https://placehold.co/400x400/e2e8f0/475569?text=HIMAWARI',
    status: 'ONLINE',
  },
];

const FriendNode = ({ data }) => {
  return (
    <a href="#" className="node-card">
      {/* Visual Input */}
      <div className="node-visual">
        <div className="corner-tl" />
        <div className="status-badge">
          <Signal
            size={10}
            className={data.status === 'ONLINE' ? 'animate-pulse' : ''}
          />
          {data.status}
        </div>
        <div className="overlay-grid" />
        <img src={data.avatar} alt={data.name} className="node-img" />
      </div>

      {/* Identity Strip */}
      <div className="node-strip">
        <span className="strip-id">{data.id}</span>

        <div className="strip-name">{data.name}</div>

        <ExternalLink size={16} className="strip-icon" />
      </div>
    </a>
  );
};

export default function FriendMatrix() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        {/* Header */}
        <header className="matrix-header">
          <div className="matrix-title">
            FRIENDS<span style={{ color: '#cbd5e1' }}>_NODES</span>
          </div>
          <div className="matrix-meta">
            <div>NETWORK STATUS: STABLE</div>
            <div>NODE COUNT: {FRIENDS.length}</div>
          </div>
        </header>

        {/* Grid */}
        <div className="node-grid">
          {FRIENDS.map((friend) => (
            <FriendNode key={friend.id} data={friend} />
          ))}

          {/* Add a "Join" Placeholder Node */}
          <a
            href="#"
            className="node-card"
            style={{ borderStyle: 'dashed', background: 'transparent' }}
          >
            <div
              className="node-visual"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                borderRight: '1px dashed var(--c-border)',
              }}
            >
              <div style={{ textAlign: 'center', color: 'var(--c-border)' }}>
                <Link2
                  size={48}
                  strokeWidth={1}
                  style={{ margin: '0 auto 1rem' }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                  }}
                >
                  INIT_LINK_REQUEST
                </div>
              </div>
            </div>
            <div className="node-strip" style={{ background: 'transparent' }}>
              <span className="strip-id">NEW</span>
              <div className="strip-name" style={{ color: 'var(--c-border)' }}>
                APPLY
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
