import { Calendar, Hash, Info, List, Tag } from 'lucide-react';
import React from 'react';

/**
 * CSS Definitions: Flat Engineering Blueprint Style
 */
const styles = `
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-border-strong: #94a3b8;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-serif: 'Noto Serif SC', serif; /* Optional for body text contrast */
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 3rem 1rem;
  font-family: var(--font-ui);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

/* Document Frame */
.doc-frame {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 900px;
  position: relative;
  box-shadow: 0 0 0 1px #f1f5f9; /* Double border effect */
  display: flex;
  flex-direction: column;
}

/* --- Header Section --- */
.doc-header {
  border-bottom: 2px solid var(--c-text-main);
  padding: 2.5rem 3rem;
  background: #fff;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 0.5rem;
}

.doc-title {
  font-family: var(--font-ui);
  font-size: 2rem;
  font-weight: 800;
  color: var(--c-text-main);
  line-height: 1.3;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.tags-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.tech-badge {
  border: 1px solid var(--c-text-main);
  padding: 2px 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  background: transparent;
  color: var(--c-text-main);
}

/* --- Body Section --- */
.doc-body {
  display: flex;
}

/* Left Sidebar (Decorations) */
.doc-sidebar {
  width: 60px;
  border-right: 1px solid var(--c-border);
  background-image: linear-gradient(to bottom, var(--c-border) 1px, transparent 1px);
  background-size: 100% 40px; /* Line grid */
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
}
.line-num {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #cbd5e1;
  margin-bottom: 35px; /* Adjust to match grid */
}

/* Main Content Area */
.doc-content {
  flex: 1;
  padding: 3rem;
  font-size: 1rem;
  line-height: 1.8;
  color: #334155;
  text-align: justify;
}

/* Abstract Block */
.abstract-box {
  background-color: #f8fafc;
  border: 1px dashed var(--c-border-strong);
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  position: relative;
}
.abstract-label {
  position: absolute;
  top: -10px;
  left: 1rem;
  background: #f8fafc;
  padding: 0 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-main);
  font-weight: 700;
  border: 1px solid var(--c-border);
}

/* Typography Elements */
h2 {
  font-family: var(--font-ui);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--c-text-main);
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 0.5rem;
}

p {
  margin-bottom: 1.5rem;
}

/* Inline Code Style */
code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: #f1f5f9;
  padding: 2px 4px;
  border: 1px solid #e2e8f0;
  color: var(--c-text-main);
}

/* Table Style */
.spec-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--c-text-main);
  margin: 2rem 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.spec-table th {
  border-bottom: 1px solid var(--c-text-main);
  padding: 0.75rem 1rem;
  text-align: left;
  background: #f1f5f9;
  text-transform: uppercase;
}

.spec-table td {
  border-bottom: 1px solid var(--c-border);
  border-right: 1px solid var(--c-border);
  padding: 0.75rem 1rem;
  vertical-align: top;
}
.spec-table td:last-child {
  border-right: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .doc-sidebar { display: none; }
  .doc-content { padding: 1.5rem; }
  .doc-header { padding: 1.5rem; }
  .doc-title { font-size: 1.5rem; }
}
`;

const SectionHeader = ({ id, title }) => (
  <h2>
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1rem',
        color: '#64748b',
      }}
    >
      {id} //
    </span>
    {title}
  </h2>
);

export default function BlogPostBlueprint() {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <article className="doc-frame">
          {/* Header */}
          <header className="doc-header">
            <div className="meta-row">
              <span>REF: FE-ARCH-2025-06-25</span>
              <span>AUTHOR: ANONYMOUS</span>
              <span>REV: 1.0.4</span>
            </div>

            <h1 className="doc-title">
              网页前端开发中对 Tailwind CSS 的需求
              <br />
              与结构规划影响分析
            </h1>

            <div className="tags-row">
              <span className="tech-badge">
                <Calendar
                  size={12}
                  style={{ display: 'inline', marginRight: 4 }}
                />
                2025-06-25
              </span>
              <span className="tech-badge">
                <Tag size={12} style={{ display: 'inline', marginRight: 4 }} />
                日志 / LOG
              </span>
              <span className="tech-badge">
                <Hash size={12} style={{ display: 'inline', marginRight: 4 }} />
                FRONTEND
              </span>
            </div>
          </header>

          {/* Body */}
          <div className="doc-body">
            {/* Sidebar Decorations */}
            <div className="doc-sidebar">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="line-num">
                  {(i + 1) * 10}
                </span>
              ))}
            </div>

            {/* Main Content */}
            <div className="doc-content">
              {/* Abstract */}
              <div className="abstract-box">
                <div className="abstract-label">EXEC_SUMMARY // 摘要</div>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  <Info
                    size={16}
                    style={{
                      float: 'left',
                      marginRight: '8px',
                      marginTop: '4px',
                      color: '#64748b',
                    }}
                  />
                  Tailwind CSS 是一种“实用工具优先” (utility-first) 的 CSS
                  框架，通过直接在 HTML 中应用样式来加速用户界面 (UI) 开发。
                  其核心理念在于无需编写自定义 CSS
                  即可实现快速原型设计、高度定制化和设计一致性。
                  <br />
                  <br />
                  本报告认为，虽然样式应用的方法发生了变化，但开发者规划和控制网页结构的能力并未丧失，反而通过组件化架构得到增强。
                </p>
              </div>

              {/* Table Section */}
              <div style={{ marginBottom: '3rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  TABLE_01: TAILWIND_CSS_ANALYSIS_MATRIX
                </div>
                <table className="spec-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}>PROS [优点]</th>
                      <th style={{ width: '50%' }}>CONS [缺点]</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <List
                          size={12}
                          style={{ display: 'inline', marginRight: 6 }}
                        />
                        更快的开发速度
                      </td>
                      <td>冗长的语法 / HTML 膨胀</td>
                    </tr>
                    <tr>
                      <td>高度可定制 (Config Driven)</td>
                      <td>学习曲线 (Utility Names)</td>
                    </tr>
                    <tr>
                      <td>无未使用的 CSS (PurgeCSS/JIT)</td>
                      <td>紧密耦合 (Vendor Lock-in)</td>
                    </tr>
                    <tr>
                      <td>无需编写自定义 CSS</td>
                      <td>模糊了关注点分离 (Separation of Concerns)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Content Sections */}
              <SectionHeader
                id="01"
                title="Tailwind CSS 简介：前端样式设计中的范式转变"
              />

              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    margin: '1rem 0',
                  }}
                >
                  核心理念：实用工具优先与低层控制
                </h3>
                <p>
                  Tailwind CSS 是一种<code>utility-first</code>的 CSS
                  框架，其核心在于提供低层级的实用工具类，这些类直接映射到单个
                  CSS 属性 （例如，<code>p-4</code> 用于内边距，
                  <code>flex</code> 用于弹性布局）。 与 Bootstrap
                  等传统框架提供预构建组件不同，Tailwind
                  赋予开发者细粒度控制，无需受限于预定义样式即可创建独特设计。
                </p>
                <p>
                  这种方法代表着抽象层的转移。传统 CSS
                  框架通常抽象出组件（例如，一个 <code>.btn</code>{' '}
                  类封装了所有按钮样式）。 Tailwind 则抽象出属性（例如，
                  <code>bg-blue-500</code> 用于背景颜色）。
                  这意味着抽象并没有被消除，而是从 CSS 文件转移到了 HTML
                  标记本身。 这是一种根本性的范式转变，而不仅仅是工具选择。
                </p>
              </div>

              <SectionHeader id="02" title="关键特性与工作原理" />

              <p>
                Tailwind 的实用工具类允许直接向 HTML
                元素应用特定样式，从而提供细粒度的控制。其核心是
                <code>tailwind.config.js</code>{' '}
                配置文件，它允许对默认样式、颜色、字体、间距、断点等进行广泛定制，
                确保项目能够遵循特定的设计系统。
              </p>
              <p>
                该框架内置的响应式工具（例如 <code>sm:</code>、<code>md:</code>
                ）简化了自适应布局的创建，
                无需编写复杂的媒体查询。此外，Tailwind 通过
                PurgeCSS（现在默认采用 JIT 编译）自动移除未使用的 CSS，
                从而在生产环境中生成更小、更优化的 CSS 文件，显著提升性能。
              </p>

              <SectionHeader id="03" title="与传统 CSS 和组件框架的区别" />

              <p>
                传统 CSS 要求开发者创建自定义类名并在单独的 CSS
                文件中定义样式，这导致需要管理命名约定和潜在的级联问题。
                相比之下，Tailwind 提供低层级的实用工具类，从而在无需自定义 CSS
                或受预构建组件限制的情况下，实现完全的设计控制。
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer
            style={{
              borderTop: '2px solid var(--c-text-main)',
              padding: '2rem',
              background: '#f1f5f9',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textAlign: 'center',
              color: 'var(--c-text-sub)',
            }}
          >
            END_OF_DOCUMENT // GENERATED_BY_REACT_BLUEPRINT_ENGINE
          </footer>
        </article>
      </div>
    </>
  );
}
