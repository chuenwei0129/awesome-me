import { ArrowRight } from 'lucide-react';
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
  justify-content: center;
  align-items: center;
}

/* Main Frame */
.log-frame {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}

/* Header */
.log-header {
  border-bottom: 2px solid var(--c-text-main);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: #fff;
}

.log-title {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--c-text-main);
  line-height: 1;
}

.log-meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
}

/* List Container */
.log-list {
  display: flex;
  flex-direction: column;
}

/* Log Item (Row) */
.log-row {
  display: flex;
  align-items: stretch; /* Stretch to equal height */
  border-bottom: 1px dashed var(--c-border);
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  background: transparent;
  position: relative;
}

.log-row:last-child {
  border-bottom: none;
}

.log-row:hover {
  background-color: #f1f5f9;
}

/* 1. Index Column */
.col-index {
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-border); /* Light gray usually */
  border-right: 1px solid var(--c-border);
  position: relative;
}

.log-row:hover .col-index {
  color: var(--c-text-main);
  font-weight: 700;
}

/* Timeline vertical line decoration */
.col-index::after {
  content: '';
  position: absolute;
  right: -1px; /* Align with border */
  top: 0; bottom: 0;
  width: 1px;
  background: var(--c-border);
}

/* 2. Date Column */
.col-date {
  width: 140px;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--c-text-sub);
  border-right: 1px solid var(--c-border);
}

.date-year { color: var(--c-text-sub); font-size: 0.7rem; }
.date-day { color: var(--c-text-main); font-weight: 600; font-size: 0.9rem; }

/* 3. Content Column (Tag + Title) */
.col-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Tag Box */
.log-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border: 1px solid var(--c-text-main);
  font-family: var(--font-ui); /* Chinese chars look better in sans */
  font-size: 0.75rem;
  color: var(--c-text-main);
  white-space: nowrap;
  min-width: 80px;
}

/* Title */
.log-heading {
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text-main);
  line-height: 1.4;
}

/* 4. Action Column */
.col-action {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--c-border);
  transition: background 0.2s;
}

.action-btn {
  width: 40px; 
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  color: var(--c-text-sub);
  transition: all 0.2s;
}

/* Interaction States */
.log-row:hover .col-action {
  background-color: var(--c-text-main);
  border-left-color: var(--c-text-main);
}

.log-row:hover .action-btn {
  color: white;
  transform: translateX(4px);
}

/* Mobile responsive tweak */
@media (max-width: 600px) {
  .col-date { width: auto; padding: 0 1rem; }
  .date-year { display: none; }
  .col-index { display: none; }
  .log-tag { display: none; }
}
`;

// Mock Data
const POSTS = [
  {
    id: '001',
    date: '2025-08-02',
    category: '日志', // Log
    title: '博客折腾日记之 OpenGraph 图像的自动生成',
    slug: '#',
  },
  {
    id: '002',
    date: '2025-06-07',
    category: '开发', // Dev
    title: 'Arch Linux 下普通用户无串口设备访问权限的解决方案',
    slug: '#',
  },
  {
    id: '003',
    date: '2025-06-03',
    category: '日志', // Log
    title: 'GBKO 2025 REPO // 存储库迁移记录',
    slug: '#',
  },
  {
    id: '004',
    date: '2025-02-08',
    category: '开发', // Dev
    title: '给 Astro 添加 Spine 伪春菜',
    slug: '#',
  },
];

// Formatting helper
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const md =
    `${d.getMonth() + 1}`.padStart(2, '0') +
    '-' +
    `${d.getDate()}`.padStart(2, '0');
  return { year, md };
};

const LogRow = ({ post, index }) => {
  const { year, md } = formatDate(post.date);

  return (
    <a href={post.slug} className="log-row">
      {/* Index */}
      <div className="col-index">
        {String(POSTS.length - index).padStart(3, '0')}
      </div>

      {/* Date */}
      <div className="col-date">
        <span className="date-year">{year}</span>
        <span className="date-day">{md}</span>
      </div>

      {/* Content */}
      <div className="col-content">
        <div className="log-tag">{post.category}</div>
        <span className="log-heading">{post.title}</span>
      </div>

      {/* Action */}
      <div className="col-action">
        <div className="action-btn">
          <ArrowRight size={20} />
        </div>
      </div>
    </a>
  );
};

export default function PostsLog() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="log-frame">
          {/* Header */}
          <header className="log-header">
            <div className="log-title">ARCHIVE_LOG</div>
            <div className="log-meta">
              STATUS: PUBLIC_ACCESS
              <br />
              ENTRIES: {POSTS.length}
            </div>
          </header>

          {/* List Body */}
          <div className="log-list">
            {POSTS.map((post, idx) => (
              <LogRow key={post.id} post={post} index={idx} />
            ))}
          </div>

          {/* Footer Decoration */}
          <div
            style={{
              height: '2rem',
              background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #f1f5f9 10px,
              #f1f5f9 20px
            )`,
              borderTop: '1px solid var(--c-border)',
            }}
          />
        </div>
      </div>
    </>
  );
}
