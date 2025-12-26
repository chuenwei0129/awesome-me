import { ArrowUpRight, Globe, Layout, Radio, Terminal } from 'lucide-react';
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
  justify-content: center;
  align-items: flex-start;
}

/* Grid Layout */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

/* Project Card Module */
.proj-module {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;
  cursor: default;
}

.proj-module:hover {
  border-color: var(--c-text-main);
  box-shadow: 4px 4px 0 rgba(15, 23, 42, 0.1);
  transform: translate(-2px, -2px);
}

/* Module Header (ID & Status) */
.module-header {
  border-bottom: 1px solid var(--c-border);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-sub);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}
.status-dot {
  width: 6px; height: 6px;
  background-color: #22c55e; /* Green for active */
  border-radius: 50%; /* Only allowed circle */
  box-shadow: 0 0 0 1px var(--c-border);
}

/* Viewport (Image Area) */
.module-viewport {
  height: 200px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--c-border);
  background-color: #f1f5f9;
  /* Engineering Grid Overlay */
  background-image: 
    linear-gradient(var(--c-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--c-border) 1px, transparent 1px);
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Image styling */
.viewport-img {
  width: 80%;
  height: 80%;
  object-fit: cover;
  border: 1px solid var(--c-text-main);
  filter: grayscale(100%) contrast(1.1); /* Grayscale for blueprint feel */
  transition: filter 0.3s;
}
.proj-module:hover .viewport-img {
  filter: grayscale(0%) contrast(1); /* Color on hover */
}

/* Crosshairs decorations */
.crosshair-tl { position: absolute; top: 8px; left: 8px; width: 10px; height: 10px; border-top: 2px solid var(--c-text-main); border-left: 2px solid var(--c-text-main); }
.crosshair-br { position: absolute; bottom: 8px; right: 8px; width: 10px; height: 10px; border-bottom: 2px solid var(--c-text-main); border-right: 2px solid var(--c-text-main); }

/* Content Body */
.module-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.module-title {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--c-text-main);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.module-desc {
  font-family: var(--font-ui);
  font-size: 0.875rem;
  color: var(--c-text-sub);
  line-height: 1.6;
}

/* Tech Spec Footer */
.module-footer {
  margin-top: auto;
  padding: 1rem 1.5rem;
  border-top: 1px dashed var(--c-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-stack {
  display: flex;
  gap: 0.5rem;
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 2px 6px;
  border: 1px solid var(--c-border);
  color: var(--c-text-sub);
  background: #fff;
  text-transform: uppercase;
}

.action-btn {
  background: transparent;
  border: 1px solid var(--c-text-main);
  padding: 4px 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}
.action-btn:hover {
  background: var(--c-text-main);
  color: white;
}
`;

// Mock Data
const PROJECTS = [
  {
    id: '001',
    title: 'BroadcastChannel',
    desc: 'Turn your Telegram Channel into a MicroBlog. A lightweight bridge for content syndication.',
    status: 'OP_ACTIVE',
    icon: <Radio size={20} />,
    tags: ['Svelte', 'Node.js'],
    // Using a placeholder service that generates technical-looking images
    img: 'https://placehold.co/600x400/e2e8f0/475569?text=BROADCAST+SYS',
  },
  {
    id: '002',
    title: 'L(O*62).ONG',
    desc: 'Make your URL loooooooooooooooooooonger. A satirical URL lengthener service.',
    status: 'STABLE',
    icon: <Terminal size={20} />,
    tags: ['React', 'Vercel'],
    img: 'https://placehold.co/600x400/e2e8f0/475569?text=URL_MATRIX',
  },
  {
    id: '003',
    title: 'HTML.ZONE',
    desc: 'Web tool collection. A centralized hub for developer utilities and converters.',
    status: 'MAINTENANCE',
    icon: <Layout size={20} />,
    tags: ['Vue', 'Tooling'],
    img: 'https://placehold.co/600x400/e2e8f0/475569?text=GRID_SYSTEM',
  },
  {
    id: '004',
    title: 'DNS.Surf',
    desc: 'Exploring the Fascinating Journey of DNS Resolution Worldwide. Real-time propagation check.',
    status: 'OP_ACTIVE',
    icon: <Globe size={20} />,
    tags: ['Go', 'WASM'],
    img: 'https://placehold.co/600x400/e2e8f0/475569?text=NET_TOPOLOGY',
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="proj-module">
      {/* 1. Header */}
      <div className="module-header">
        <span>ID: {project.id}</span>
        <div className="status-indicator">
          <div
            className="status-dot"
            style={{
              backgroundColor:
                project.status === 'MAINTENANCE' ? '#eab308' : '#22c55e',
            }}
          />
          <span>{project.status}</span>
        </div>
      </div>

      {/* 2. Viewport */}
      <div className="module-viewport">
        <div className="crosshair-tl" />
        <div className="crosshair-br" />
        <img src={project.img} alt={project.title} className="viewport-img" />
      </div>

      {/* 3. Body */}
      <div className="module-body">
        <div className="module-title">
          {project.icon}
          {project.title}
        </div>
        <p className="module-desc">{project.desc}</p>
      </div>

      {/* 4. Footer */}
      <div className="module-footer">
        <div className="tech-stack">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>
        <button className="action-btn">
          ACCESS <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default function ProjectBlueprintList() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          {/* Section Header */}
          <div
            style={{
              marginBottom: '2rem',
              borderBottom: '2px solid var(--c-text-main)',
              paddingBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Module_Registry // Projects
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--c-text-sub)',
              }}
            >
              INDEX_COUNT: {PROJECTS.length}
            </span>
          </div>

          {/* Grid */}
          <div className="project-grid">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
