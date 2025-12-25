import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Cpu,
  Folder,
  Hash,
  LayoutGrid,
  Search,
  Share2,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// --- 1. Design System Configuration ---
const theme = {
  colors: {
    bg: '#f8fafc', // Outer Background
    canvas: '#ffffff', // Component Background
    border: '#cbd5e1', // Slate-300
    borderStrong: '#94a3b8', // Slate-400
    textMain: '#0f172a', // Slate-900
    textSub: '#64748b', // Slate-500
    accent: '#0f172a', // Black
    codeBg: '#f1f5f9', // Slate-100
  },
  fonts: {
    ui: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  shadows: {
    block: '6px 6px 0px #94a3b8',
    card: '4px 4px 0px #cbd5e1',
  },
};

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

  body {
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.textMain};
    font-family: ${(props) => props.theme.fonts.ui};
    margin: 0;
    line-height: 1.6;
    background-image: radial-gradient(${(props) =>
      props.theme.colors.border} 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  * { box-sizing: border-box; }

  h1, h2, h3, h4 { margin: 0; font-weight: 800; letter-spacing: -0.5px; }
  p { margin: 0 0 1rem 0; color: ${(props) => props.theme.colors.textMain}; }
`;

// --- 2. Styled Components ---

const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  background: ${(props) => props.theme.colors.canvas};
  border: 2px solid ${(props) => props.theme.colors.textMain};
  box-shadow: ${(props) => props.theme.shadows.block};
  min-height: 90vh;
  display: flex;
  flex-direction: column;
`;

// Header
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.textMain};
  background: ${(props) => props.theme.colors.bg};
`;

const Logo = styled.div`
  font-family: ${(props) => props.theme.fonts.mono};
  font-weight: 800;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-transform: uppercase;

  span {
    background: ${(props) => props.theme.colors.textMain};
    color: #fff;
    padding: 2px 6px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.9rem;

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${(props) => props.theme.colors.textSub};
    &:hover {
      color: ${(props) => props.theme.colors.textMain};
      text-decoration: underline;
    }
    &.active {
      color: ${(props) => props.theme.colors.textMain};
      font-weight: bold;
    }
  }
`;

// Main Grid
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  flex: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Sidebar
const Sidebar = styled.aside`
  border-right: 2px solid ${(props) => props.theme.colors.textMain};
  background: ${(props) => props.theme.colors.bg};
  padding: 2rem;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.textMain};
  }
`;

const Widget = styled.div`
  margin-bottom: 2.5rem;
`;

const WidgetTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.85rem;
  text-transform: uppercase;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderStrong};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textSub};

  &:hover {
    color: ${(props) => props.theme.colors.textMain};
    padding-left: 5px;
    background: rgba(0, 0, 0, 0.02);
  }

  transition: all 0.2s;
`;

// Content Area
const ContentCanvas = styled.main`
  padding: 3rem;
  background: ${(props) => props.theme.colors.canvas};
`;

// Post Card (List View)
const PostCard = styled.article`
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${(props) => props.theme.shadows.card};
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translate(-2px, -2px);
    border-color: ${(props) => props.theme.colors.textMain};
    box-shadow: 6px 6px 0px ${(props) => props.theme.colors.textMain};
  }
`;

const MetaRow = styled.div`
  display: flex;
  gap: 1.5rem;
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.textSub};
  margin-bottom: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const PostExcerpt = styled.p`
  color: ${(props) => props.theme.colors.textSub};
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

// Single Post View
const ArticleContainer = styled.article`
  max-width: 800px;
`;

const ArticleHeader = styled.header`
  border-bottom: 1px dashed ${(props) => props.theme.colors.borderStrong};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

const ArticleBody = styled.div`
  font-size: 1.1rem;

  h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-family: ${(props) => props.theme.fonts.mono};
  }

  code {
    font-family: ${(props) => props.theme.fonts.mono};
    background: ${(props) => props.theme.colors.codeBg};
    padding: 0.2rem 0.4rem;
    border: 1px solid ${(props) => props.theme.colors.border};
    font-size: 0.9em;
  }

  blockquote {
    border-left: 4px solid ${(props) => props.theme.colors.textMain};
    margin: 1.5rem 0;
    padding-left: 1rem;
    font-style: italic;
    color: ${(props) => props.theme.colors.textSub};
  }
`;

const TechBtn = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.textMain};
  font-family: ${(props) => props.theme.fonts.mono};
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    background: ${(props) => props.theme.colors.textMain};
    color: #fff;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.borderStrong};
  background: ${(props) => props.theme.colors.canvas};
  font-family: ${(props) => props.theme.fonts.mono};
  margin-top: 0.5rem;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.textMain};
  }
`;

// --- 3. Mock Data ---
const POSTS = [
  {
    id: 1,
    title: 'React Server Components 架构分析',
    date: '2023-10-24',
    category: 'Architecture',
    tags: ['React', 'Performance'],
    excerpt:
      '深入探讨 RSC 的工作原理以及它如何改变我们构建现代 Web 应用的方式。从序列化协议到流式渲染的完整技术解构。',
    content: 'Content placeholder...',
  },
  {
    id: 2,
    title: '微服务中的分布式事务处理模式',
    date: '2023-11-02',
    category: 'Backend',
    tags: ['System Design', 'Microservices'],
    excerpt:
      '对比 SAGA 模式与 TCC 模式在实际高并发场景下的应用取舍。包括一致性保证与故障恢复策略。',
    content: 'Content placeholder...',
  },
  {
    id: 3,
    title: 'CSS-in-JS vs Utility Classes: 性能基准测试',
    date: '2023-11-15',
    category: 'Frontend',
    tags: ['CSS', 'Benchmark'],
    excerpt:
      '一份关于 Styled-Components 与 Tailwind CSS 在大型项目中的渲染性能对比报告。',
    content: 'Content placeholder...',
  },
];

const CATEGORIES = [
  { name: 'Architecture', count: 12 },
  { name: 'Frontend Eng', count: 8 },
  { name: 'DevOps', count: 5 },
  { name: 'Algorithms', count: 15 },
];

const TAGS = [
  'React',
  'System Design',
  'Linux',
  'Rust',
  'Database',
  'Security',
];

// --- 4. Main Component ---

export default function BlogSystem() {
  const [view, setView] = useState('list'); // 'list' or 'detail'
  const [activePost, setActivePost] = useState(null);

  const handleRead = (post) => {
    setActivePost(post);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('list');
    setActivePost(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LayoutContainer>
        {/* Navigation Header */}
        <Header>
          <Logo>
            <Cpu size={24} />
            <span>TECH_LOG</span>
            <span
              style={{
                background: 'transparent',
                color: theme.colors.textMain,
                border: '1px solid currentColor',
              }}
            >
              SYS_V1.0
            </span>
          </Logo>
          <Nav>
            <a className={view === 'list' ? 'active' : ''} onClick={handleBack}>
              /HOME
            </a>
            <a>/ARCHIVES</a>
            <a>/ABOUT_ME</a>
            <a>/RSS_FEED</a>
          </Nav>
        </Header>

        <MainGrid>
          {/* Sidebar Area */}
          <Sidebar>
            <Widget>
              <WidgetTitle>
                <Search size={14} /> SYSTEM_SEARCH
              </WidgetTitle>
              <SearchInput placeholder="> grep 'keyword'..." />
            </Widget>

            <Widget>
              <WidgetTitle>
                <Folder size={14} /> DIRECTORIES
              </WidgetTitle>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.name}>
                  <span>{cat.name}</span>
                  <span style={{ fontFamily: theme.fonts.mono }}>
                    [{cat.count}]
                  </span>
                </MenuItem>
              ))}
            </Widget>

            <Widget>
              <WidgetTitle>
                <Hash size={14} /> TAG_INDEX
              </WidgetTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: '1px solid #cbd5e1',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontFamily: theme.fonts.mono,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Widget>

            <Widget>
              <WidgetTitle>
                <User size={14} /> OWNER
              </WidgetTitle>
              <div style={{ fontSize: '0.9rem', color: theme.colors.textSub }}>
                Engineering Lead @ Apollo Project.
                <br />
                Focusing on Scalable Systems & UI Architecture.
              </div>
            </Widget>
          </Sidebar>

          {/* Main Content Area */}
          <ContentCanvas>
            {view === 'list' ? (
              <>
                <div
                  style={{
                    fontFamily: theme.fonts.mono,
                    marginBottom: '2rem',
                    borderBottom: '2px solid black',
                    paddingBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>STATUS: VIEWING_LATEST_LOGS</span>
                  <span>TOTAL_RECORDS: {POSTS.length}</span>
                </div>

                {POSTS.map((post) => (
                  <PostCard key={post.id} onClick={() => handleRead(post)}>
                    <MetaRow>
                      <div>
                        <Calendar size={14} /> {post.date}
                      </div>
                      <div>
                        <Folder size={14} /> {post.category}
                      </div>
                      <div>
                        <LayoutGrid size={14} /> ID:{' '}
                        {post.id.toString().padStart(4, '0')}
                      </div>
                    </MetaRow>
                    <PostTitle>{post.title}</PostTitle>
                    <PostExcerpt>{post.excerpt}</PostExcerpt>
                    <div
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '1rem',
                      }}
                    >
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: '#f1f5f9',
                            padding: '2px 6px',
                            fontSize: '0.75rem',
                            fontFamily: theme.fonts.mono,
                          }}
                        >
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: '1.5rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <TechBtn>
                        READ_LOG <ChevronRight size={16} />
                      </TechBtn>
                    </div>
                  </PostCard>
                ))}
              </>
            ) : (
              <ArticleContainer>
                <TechBtn onClick={handleBack} style={{ marginBottom: '2rem' }}>
                  <ArrowLeft size={16} /> RETURN_TO_INDEX
                </TechBtn>

                <ArticleHeader>
                  <MetaRow style={{ marginBottom: '1rem' }}>
                    <div>
                      <Calendar size={14} /> {activePost.date}
                    </div>
                    <div>
                      <User size={14} /> chuenwei
                    </div>
                  </MetaRow>
                  <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
                    {activePost.title}
                  </h1>
                  <div
                    style={{
                      marginTop: '1.5rem',
                      display: 'flex',
                      gap: '0.5rem',
                    }}
                  >
                    {activePost.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          border: '1px solid #0f172a',
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          fontFamily: theme.fonts.mono,
                          fontWeight: '600',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </ArticleHeader>

                <ArticleBody>
                  <p>
                    <strong>[Abstract]</strong> {activePost.excerpt}
                  </p>
                  <p>
                    在此处插入文章正文。在“工程蓝图”风格中，正文应该保持高对比度，尽量使用黑色文字。代码块应该有明显的边框。
                  </p>

                  <h3>1. 系统初始化</h3>
                  <p>
                    当系统启动时，我们需要确保所有的
                    <code>Environment Variables</code>
                    都已经正确加载。这是一个简单的检查流程。
                  </p>

                  <blockquote
                    style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                  >
                    Warning: Database connection pool must be configured before
                    listener start.
                  </blockquote>

                  <h3>2. 代码示例</h3>
                  <pre
                    style={{
                      background: '#f1f5f9',
                      padding: '1rem',
                      border: '1px solid #cbd5e1',
                      overflowX: 'auto',
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    {`function initSystem(config) {
  if (!config.ready) {
    throw new Error("System not ready");
  }
  return new System(config);
}`}
                  </pre>

                  <h3>3. 结论</h3>
                  <p>通过这种架构，我们实现了 99.9% 的可用性。</p>
                </ArticleBody>

                <div
                  style={{
                    borderTop: '2px solid #0f172a',
                    marginTop: '4rem',
                    paddingTop: '2rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: theme.fonts.mono,
                        fontWeight: 'bold',
                      }}
                    >
                      END_OF_FILE
                    </span>
                    <TechBtn>
                      <Share2 size={16} /> SHARE_LOG
                    </TechBtn>
                  </div>
                </div>
              </ArticleContainer>
            )}
          </ContentCanvas>
        </MainGrid>
      </LayoutContainer>
    </ThemeProvider>
  );
}
