import {
  Activity,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cpu,
  Lock,
  Plus,
  Power,
  Settings,
  Terminal,
  X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// --- Constants & Theme ---
const C = {
  bg: '#f8fafc', // Slate 50
  bgDark: '#f1f5f9', // Slate 100
  bgElement: '#e2e8f0', // Slate 200
  borderLight: '#cbd5e1', // Slate 300
  borderMid: '#94a3b8', // Slate 400
  textSub: '#64748b', // Slate 500
  textMain: '#0f172a', // Slate 900
  accent: '#0f172a',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  white: '#ffffff',
};

// --- Animations ---
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// --- Styled Components ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${C.bgDark};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  color: ${C.textMain};
`;

const TopPanel = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  padding: 0 4px;
`;

const MetaInfo = styled.div`
  font-size: 10px;
  color: ${C.textSub};
  display: flex;
  gap: 1rem;
`;

const ModeBtn = styled.button<{ $active: boolean }>`
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid ${C.accent};
  transition: all 0.2s;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? C.accent : C.white)};
  color: ${(props) => (props.$active ? C.white : C.accent)};
  box-shadow: ${(props) =>
    props.$active ? `2px 2px 0 0 rgba(100,116,139,0.5)` : 'none'};

  &:hover {
    background-color: ${(props) => (props.$active ? C.accent : C.bgElement)};
  }
`;

const Chassis = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  position: relative;
  background-color: ${C.white};
  border: 2px solid ${C.accent};
  box-shadow: 8px 8px 0 0 ${C.borderMid};
  display: flex;
  width: 100%;
  max-width: 1024px;

  ${(props) =>
    props.$orientation === 'horizontal'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
          height: 600px;
        `}
`;

// 装饰螺丝
const Screw = styled.div`
  position: absolute;
  z-index: 50;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid ${C.textSub};
  background-color: ${C.bgElement};
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${C.textSub};
    transform: rotate(45deg);
  }
`;

// 导轨区域
const Rail = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  position: relative;
  background-color: ${C.bgDark};
  border-color: ${C.accent};
  z-index: 20;
  display: flex;

  /* 斜线背景纹理 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
    background-image: linear-gradient(
      135deg,
      #000 25%,
      transparent 25%,
      transparent 50%,
      #000 50%,
      #000 75%,
      transparent 75%,
      transparent
    );
    background-size: 8px 8px;
  }

  ${(props) =>
    props.$orientation === 'horizontal'
      ? css`
          width: 100%;
          height: 48px; /* 3rem */
          border-bottom: 1px solid ${C.accent};
        `
      : css`
          width: 224px; /* 14rem */
          height: 100%;
          border-right: 1px solid ${C.accent};
          flex-direction: column;
        `}
`;

// 滚动按钮
const ScrollControl = styled.button<{
  $pos: 'start' | 'end';
  $orientation: 'horizontal' | 'vertical';
}>`
  position: absolute;
  z-index: 30;
  background-color: ${C.bgElement};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.accent};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${C.borderLight};
  }
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  ${(props) =>
    props.$orientation === 'horizontal'
      ? css`
          width: 32px;
          height: 100%;
          top: 0;
          ${props.$pos === 'start'
            ? css`
                left: 0;
                border-right: 1px solid ${C.accent};
              `
            : css`
                right: 0;
                border-left: 1px solid ${C.accent};
              `}
        `
      : css`
          width: 100%;
          height: 32px;
          left: 0;
          ${props.$pos === 'start'
            ? css`
                top: 0;
                border-bottom: 1px solid ${C.accent};
              `
            : css`
                bottom: 0;
                border-top: 1px solid ${C.accent};
              `}
        `}
`;

const ScrollContainer = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  flex: 1;
  position: relative;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none;
  }

  ${(props) =>
    props.$orientation === 'horizontal'
      ? css`
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0 32px; /* Space for buttons */
          align-items: flex-end;
          height: 100%;
        `
      : css`
          overflow-y: auto;
          overflow-x: hidden;
          padding: 32px 0; /* Space for buttons */
          flex-direction: column;
          width: 100%;
        `}
`;

// Tab 单项
const TabItem = styled.div<{
  $isActive: boolean;
  $orientation: 'horizontal' | 'vertical';
  $status: string;
}>`
  position: relative;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s;
  flex-shrink: 0;
  background-color: ${C.bgElement};
  color: ${C.textSub};
  border-color: ${C.borderMid};

  /* 基础布局 */
  ${(props) =>
    props.$orientation === 'horizontal'
      ? css`
          height: 36px;
          min-width: 140px;
          border-right: 1px solid;
          border-top: 1px solid;
          margin-right: -1px;
          border-radius: 2px 2px 0 0;
        `
      : css`
          width: 100%;
          height: 48px;
          border-bottom: 1px solid;
          border-right: 1px solid;
          margin-bottom: -1px;
        `}

  /* 悬停状态 (非激活) */
  ${(props) =>
    !props.$isActive &&
    css`
      &:hover {
        background-color: ${C.bgElement};
        color: ${C.textMain};
      }
    `}

  /* 激活状态：物理连接逻辑 */
  ${(props) =>
    props.$isActive &&
    css`
      background-color: ${C.white};
      color: ${C.textMain};
      z-index: 10;
      font-weight: bold;
      border-color: ${C.accent};

      ${props.$orientation === 'horizontal'
        ? css`
            border-bottom: 1px solid ${C.white}; /* 打通下方 */
            height: calc(100% + 1px); /* 稍微伸长覆盖边框 */
            margin-bottom: -1px;
            border-top-width: 2px;
            box-shadow: 0 -2px 0 0 ${C.accent} inset; /* 顶部装饰条 */
          `
        : css`
            border-right: 1px solid ${C.white}; /* 打通右方 */
            width: calc(100% + 1px); /* 稍微伸长覆盖边框 */
            border-left-width: 2px;
            box-shadow: 2px 0 0 0 ${C.accent} inset; /* 左侧装饰条 */
          `}
    `}
`;

const TabInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
`;

const StatusDot = styled.div<{ $status: string; $isActive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  background-color: ${(props) => {
    if (props.$isActive) return C.success;
    if (props.$status === 'warning') return C.warning;
    return C.borderLight;
  }};

  ${(props) =>
    props.$isActive &&
    css`
      animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    `}
`;

const CloseBtn = styled.button`
  opacity: 0;
  padding: 2px;
  border-radius: 2px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${TabItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${C.danger};
    color: ${C.white};
  }
`;

const AddBtn = styled.button<{ $orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.borderMid};
  background: transparent;
  border: 1px dashed ${C.borderMid};
  transition: all 0.2s;
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    color: ${C.textMain};
    background-color: ${C.white};
    border-color: ${C.textMain};
  }

  ${(props) =>
    props.$orientation === 'horizontal'
      ? css`
          height: 32px;
          width: 32px;
          margin-left: 8px;
          margin-bottom: 4px; /* Align visually */
        `
      : css`
          height: 32px;
          width: calc(100% - 16px);
          margin: 8px auto 0;
        `}
`;

const ContentViewport = styled.div`
  flex: 1;
  background-color: ${C.white};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 400px;

  /* Grid Background */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(${C.bgElement} 1px, transparent 1px);
    background-size: 24px 24px;
  }
`;

const ContentHeader = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid ${C.bgElement};
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
`;

const ContentBody = styled.div`
  flex: 1;
  padding: 32px;
  position: relative;
  z-index: 10;
  overflow: auto;
`;

const EmptyState = styled.div`
  height: 100%;
  border: 1px dashed ${C.borderLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${C.textSub};
  text-align: center;
`;

const StatusBar = styled.div`
  border-top: 1px solid ${C.accent};
  background-color: ${C.bgDark};
  padding: 4px 16px;
  font-size: 10px;
  color: ${C.textSub};
  display: flex;
  justify-content: space-between;
`;

// --- Main Component ---

type Orientation = 'horizontal' | 'vertical';

interface TabData {
  id: string;
  label: string;
  type: 'system' | 'process' | 'log';
  closable: boolean;
  status: 'active' | 'idle' | 'warning';
}

export default function StyledEngineeringTabs() {
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [tabs, setTabs] = useState<TabData[]>([
    {
      id: 'SYS_BOOT',
      label: 'BOOT_LOADER',
      type: 'system',
      closable: false,
      status: 'active',
    },
    {
      id: 'KRN_01',
      label: 'KERNEL_MAIN',
      type: 'system',
      closable: false,
      status: 'active',
    },
    {
      id: 'NET_ETH0',
      label: 'ETH_INTERFACE',
      type: 'process',
      closable: true,
      status: 'idle',
    },
    {
      id: 'DB_SHARD',
      label: 'DATA_SHARD_01',
      type: 'process',
      closable: true,
      status: 'warning',
    },
    ...Array.from({ length: 6 }).map((_, i) => ({
      id: `PROC_${100 + i}`,
      label: `WORKER_${i}`,
      type: 'log' as const,
      closable: true,
      status: 'idle' as const,
    })),
  ]);
  const [activeTabId, setActiveTabId] = useState('SYS_BOOT');

  // Scroll Logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const {
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = scrollRef.current;

    if (orientation === 'horizontal') {
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    } else {
      setCanScrollPrev(scrollTop > 0);
      setCanScrollNext(Math.ceil(scrollTop + clientHeight) < scrollHeight);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tabs, orientation]);

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const amount = 160;
    scrollRef.current.scrollBy({
      left:
        orientation === 'horizontal'
          ? direction === 'next'
            ? amount
            : -amount
          : 0,
      top:
        orientation === 'vertical'
          ? direction === 'next'
            ? amount
            : -amount
          : 0,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 300);
  };

  const handleAdd = () => {
    const newId = `NEW_${Date.now().toString().slice(-4)}`;
    setTabs([
      ...tabs,
      {
        id: newId,
        label: `UNTITLED`,
        type: 'log',
        closable: true,
        status: 'idle',
      },
    ]);
    setActiveTabId(newId);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const handleClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const idx = tabs.findIndex((t) => t.id === id);
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[Math.max(0, idx - 1)].id);
    }
  };

  const isHorz = orientation === 'horizontal';

  return (
    <Wrapper>
      {/* Top Controls */}
      <TopPanel>
        <MetaInfo>
          <span>UNIT_ID: A-774</span>
          <span>VOLTAGE: 3.3V</span>
        </MetaInfo>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ModeBtn
            $active={isHorz}
            onClick={() => setOrientation('horizontal')}
          >
            H_MODE
          </ModeBtn>
          <ModeBtn $active={!isHorz} onClick={() => setOrientation('vertical')}>
            V_MODE
          </ModeBtn>
        </div>
      </TopPanel>

      {/* Main Chassis */}
      <Chassis $orientation={orientation}>
        <Screw style={{ top: 4, left: 4 }} />
        <Screw style={{ top: 4, right: 4 }} />
        <Screw style={{ bottom: 4, left: 4 }} />
        <Screw style={{ bottom: 4, right: 4 }} />

        {/* --- Rail Section --- */}
        <Rail $orientation={orientation}>
          {/* Scroll Prev */}
          <ScrollControl
            $pos="start"
            $orientation={orientation}
            onClick={() => handleScroll('prev')}
            disabled={!canScrollPrev}
          >
            {isHorz ? <ChevronLeft size={16} /> : <ChevronUp size={16} />}
          </ScrollControl>

          {/* Scroll Viewport */}
          <ScrollContainer
            ref={scrollRef}
            $orientation={orientation}
            onScroll={checkScroll}
          >
            {tabs.map((tab) => {
              const active = activeTabId === tab.id;
              return (
                <TabItem
                  key={tab.id}
                  $isActive={active}
                  $orientation={orientation}
                  $status={tab.status}
                  onClick={() => setActiveTabId(tab.id)}
                >
                  <TabInner>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      <StatusDot $status={tab.status} $isActive={active} />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '9px',
                            opacity: 0.5,
                            lineHeight: 1,
                          }}
                        >
                          {tab.id}
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: active ? 'bold' : 'normal',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {tab.label}
                        </span>
                      </div>
                    </div>

                    {tab.closable ? (
                      <CloseBtn onClick={(e) => handleClose(e, tab.id)}>
                        <X size={12} strokeWidth={3} />
                      </CloseBtn>
                    ) : (
                      <Lock size={10} style={{ opacity: 0.3 }} />
                    )}
                  </TabInner>
                </TabItem>
              );
            })}
            <AddBtn
              $orientation={orientation}
              onClick={handleAdd}
              title="MOUNT_NEW_MODULE"
            >
              <Plus size={16} />
            </AddBtn>
            <div style={{ flexShrink: 0, width: 16, height: 16 }} />{' '}
            {/* Spacer */}
          </ScrollContainer>

          {/* Scroll Next */}
          <ScrollControl
            $pos="end"
            $orientation={orientation}
            onClick={() => handleScroll('next')}
            disabled={!canScrollNext}
          >
            {isHorz ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </ScrollControl>
        </Rail>

        {/* --- Content Section --- */}
        <ContentViewport>
          <ContentHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  background: C.accent,
                  color: C.white,
                  padding: '4px',
                  display: 'flex',
                }}
              >
                <Terminal size={14} />
              </div>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                }}
              >
                MODULE_VIEW :: {activeTabId}
              </span>
            </div>
            <MetaInfo>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Activity size={12} />
                <span>MEM: 48%</span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Power size={12} />
                <span>PWR: ON</span>
              </div>
              <Settings
                size={12}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              />
            </MetaInfo>
          </ContentHeader>

          <ContentBody>
            <EmptyState>
              <Cpu
                size={48}
                strokeWidth={1}
                style={{ marginBottom: '16px', color: C.borderLight }}
              />
              <p style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                Waiting for input stream...
              </p>
              <div
                style={{
                  marginTop: '32px',
                  display: 'grid',
                  gridTemplateColumns: 'auto auto',
                  gap: '8px 32px',
                  fontSize: '12px',
                  textAlign: 'left',
                }}
              >
                <span>STATUS:</span>{' '}
                <span style={{ color: C.textMain }}>MOUNTED</span>
                <span>PID:</span>{' '}
                <span style={{ color: C.textMain }}>
                  {Math.floor(Math.random() * 9000) + 1000}
                </span>
                <span>UPTIME:</span>{' '}
                <span style={{ color: C.textMain }}>00:04:21</span>
              </div>
            </EmptyState>
          </ContentBody>

          <StatusBar>
            <span>Console Ready.</span>
            <span style={{ animation: 'pulse 1s infinite' }}>_</span>
          </StatusBar>
        </ContentViewport>
      </Chassis>
    </Wrapper>
  );
}
