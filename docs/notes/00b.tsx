import {
  Edit3,
  Fingerprint,
  MoreHorizontal,
  Settings,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// --- Global Theme ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-border-strong: #0f172a;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-accent: #0f172a;
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// --- Styled Components ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--c-bg);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: var(--font-ui);
`;

// --- The Toggle Switch (Mechanical Style) ---

const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--c-text-main);
  user-select: none;
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchTrack = styled.div`
  width: 48px;
  height: 24px;
  background: ${(props) =>
    props.$checked ? 'var(--c-border-strong)' : 'var(--c-canvas)'};
  border: 2px solid var(--c-border-strong);
  position: relative;
  transition: background 0.2s;

  /* The "Knob" */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: ${(props) =>
      props.$checked ? 'white' : 'var(--c-border-strong)'};
    transform: translateX(${(props) => (props.$checked ? '24px' : '0')});
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// --- Card Container ---

const CardFrame = styled.div`
  width: 340px;
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s;

  /* Engineering Shadow */
  box-shadow: 6px 6px 0 rgba(15, 23, 42, 0.05);

  &:hover {
    border-color: var(--c-border-strong);
    box-shadow: 6px 6px 0 var(--c-border-strong);
    transform: translate(-2px, -2px);
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
`;

// --- Avatar Section ---

const AvatarBox = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 1px solid var(--c-border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  position: relative;

  /* Decorative corner mark */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 8px 8px;
    border-color: transparent transparent var(--c-border-strong) transparent;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: multiply; /* Blend with background */
  }
`;

// --- Text Content ---

const ContentCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardDesc = styled.div`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  line-height: 1.5;
`;

// --- Action Bar (Footer) ---

const ActionBar = styled.div`
  border-top: 1px solid var(--c-border);
  display: flex;
  background: #fafafa;
`;

const ActionBtn = styled.button`
  flex: 1;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-sub);
  transition: all 0.2s;

  /* Vertical Dividers */
  &:not(:last-child) {
    border-right: 1px solid var(--c-border);
  }

  &:hover {
    background: var(--c-text-main);
    color: white;
  }
`;

// --- SKELETON COMPONENTS (Engineering Style) ---

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

// Base styling for hatched placeholder
const SkeletonBlock = styled.div`
  background-color: #f1f5f9;
  background-image: linear-gradient(
    45deg,
    #e2e8f0 25%,
    transparent 25%,
    transparent 50%,
    #e2e8f0 50%,
    #e2e8f0 75%,
    transparent 75%,
    transparent
  );
  background-size: 8px 8px;
  border: 1px dashed #cbd5e1;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const SkeletonAvatar = styled(SkeletonBlock)`
  width: 48px;
  height: 48px;
`;

const SkeletonTitle = styled(SkeletonBlock)`
  width: 60%;
  height: 1.25rem;
  margin-bottom: 0.5rem;
`;

const SkeletonLine = styled(SkeletonBlock)`
  width: ${(props) => props.width || '100%'};
  height: 0.75rem;
  margin-bottom: 0.4rem;
  border: none; /* Lines look better without border in this density */
  background-color: #f1f5f9; /* Solid for text lines for readability */
  background-image: none;
`;

// --- Main Component ---

const BlueprintCard = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* Toggle Switch */}
        <SwitchContainer>
          <SwitchInput
            type="checkbox"
            checked={loading}
            onChange={(e) => setLoading(e.target.checked)}
          />
          <SwitchTrack $checked={loading} />
          <span>MODE: {loading ? 'SKELETON_VIEW' : 'CONTENT_VIEW'}</span>
        </SwitchContainer>

        {/* Card 1: Main Example */}
        <CardFrame>
          <CardBody>
            {loading ? (
              <SkeletonAvatar />
            ) : (
              <AvatarBox>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="avatar"
                />
              </AvatarBox>
            )}

            <ContentCol>
              {loading ? (
                <>
                  <SkeletonTitle />
                  <SkeletonLine width="100%" />
                  <SkeletonLine width="80%" />
                </>
              ) : (
                <>
                  <CardTitle>
                    Card Title
                    <Fingerprint size={14} className="text-slate-400" />
                  </CardTitle>
                  <CardDesc>
                    This is the description
                    <br />
                    System checks passed.
                  </CardDesc>
                </>
              )}
            </ContentCol>
          </CardBody>

          {/* Action Footer */}
          <ActionBar>
            <ActionBtn disabled={loading} title="Edit Configuration">
              <Edit3 size={16} />
            </ActionBtn>
            <ActionBtn disabled={loading} title="System Settings">
              <Settings size={16} />
            </ActionBtn>
            <ActionBtn disabled={loading} title="More Options">
              <MoreHorizontal size={16} />
            </ActionBtn>
          </ActionBar>
        </CardFrame>

        {/* Card 2: Variation (Always Content for comparison) */}
        {!loading && (
          <CardFrame>
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '4px 8px',
                background: '#0f172a',
                color: 'white',
                fontSize: '10px',
                fontFamily: 'monospace',
              }}
            >
              REV_02
            </div>
            <CardBody>
              <AvatarBox>
                <User size={24} />
              </AvatarBox>
              <ContentCol>
                <CardTitle>Network_Node</CardTitle>
                <CardDesc>
                  Throughput: 1024 MB/s
                  <br />
                  Latency: 12ms
                </CardDesc>
              </ContentCol>
            </CardBody>
            <ActionBar>
              <ActionBtn>
                <Edit3 size={16} />
              </ActionBtn>
              <ActionBtn>
                <Settings size={16} />
              </ActionBtn>
              <ActionBtn>
                <MoreHorizontal size={16} />
              </ActionBtn>
            </ActionBar>
          </CardFrame>
        )}
      </Wrapper>
    </>
  );
};

export default BlueprintCard;
