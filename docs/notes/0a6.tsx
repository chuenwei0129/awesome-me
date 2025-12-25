import {
  ChevronDown,
  ChevronRight,
  CornerDownRight,
  Layers,
  Map,
  MapPin,
  Target,
  X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

// --- Theme Constants ---
const C = {
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#0f172a',
  borderLight: '#cbd5e1',
  text: '#0f172a',
  textSub: '#64748b',
  accent: '#0f172a',
  activeBg: '#0f172a',
  activeText: '#ffffff',
};

// --- Mock Data (China Admin Divisions) ---
const DATA = [
  {
    id: '330000',
    label: 'ZHEJIANG',
    children: [
      {
        id: '330100',
        label: 'HANGZHOU',
        children: [
          { id: '330106', label: 'WEST_LAKE' },
          { id: '330108', label: 'BINJIANG' },
          { id: '330109', label: 'XIAOSHAN' },
        ],
      },
      {
        id: '330200',
        label: 'NINGBO',
        children: [
          { id: '330203', label: 'HAISHU' },
          { id: '330212', label: 'YINZHOU' },
        ],
      },
    ],
  },
  {
    id: '310000',
    label: 'SHANGHAI',
    children: [
      {
        id: '310100',
        label: 'SHANGHAI_CITY',
        children: [
          { id: '310101', label: 'HUANGPU' },
          { id: '310104', label: 'XUHUI' },
          { id: '310115', label: 'PUDONG_NEW_AREA' },
        ],
      },
    ],
  },
  {
    id: '110000',
    label: 'BEIJING',
    children: [
      {
        id: '110100',
        label: 'BEIJING_CITY',
        children: [
          { id: '110105', label: 'CHAOYANG' },
          { id: '110108', label: 'HAIDIAN' },
        ],
      },
    ],
  },
];

// --- Styled Components ---

const Wrapper = styled.div`
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  width: 100%;
  max-width: 640px;
  position: relative;
  color: ${C.text};
`;

const Label = styled.div`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: ${C.textSub};
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
`;

// Input Trigger Box
const TriggerBox = styled.div<{ $isOpen: boolean; $hasValue: boolean }>`
  background: ${C.white};
  border: 2px solid ${(props) => (props.$isOpen ? C.border : C.borderLight)};
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${(props) =>
    props.$isOpen ? `4px 4px 0 0 ${C.borderLight}` : 'none'};

  &:hover {
    border-color: ${C.border};
  }
`;

const PathSegment = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

const PathSeparator = styled.span`
  margin: 0 8px;
  color: ${C.textSub};
  font-size: 10px;
`;

const Placeholder = styled.span`
  color: ${C.textSub};
  opacity: 0.5;
  font-size: 13px;
`;

// Dropdown Panel (The Board)
const Panel = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: ${C.white};
  border: 2px solid ${C.border};
  z-index: 50;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  flex-direction: column;
  box-shadow: 12px 12px 0 0 rgba(15, 23, 42, 0.1);

  /* Entrance Animation */
  animation: slideDown 0.15s ease-out;
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  height: 300px;
  border-bottom: 1px solid ${C.border};
  background-image: radial-gradient(${C.borderLight} 1px, transparent 1px);
  background-size: 20px 20px;
`;

// Individual Column (Miller Column)
const Column = styled.div`
  flex: 1;
  border-right: 1px solid ${C.border};
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);

  &:last-child {
    border-right: none;
  }
`;

const ColHeader = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid ${C.borderLight};
  background: ${C.bg};
  font-size: 10px;
  font-weight: bold;
  color: ${C.textSub};
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
`;

const List = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${C.borderLight};
  }
`;

const Item = styled.div<{ $isActive: boolean; $isFinal?: boolean }>`
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.1s;

  /* Active State Logic */
  ${(props) =>
    props.$isActive
      ? css`
          background-color: ${C.activeBg};
          color: ${C.activeText};
          font-weight: bold;
        `
      : css`
          &:hover {
            background-color: ${C.bg};
            color: ${C.text};
          }
        `}
`;

const EmptySlot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${C.borderLight};
  font-size: 10px;
  text-align: center;
  gap: 8px;
`;

const Footer = styled.div`
  padding: 8px 16px;
  background: ${C.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: ${C.textSub};
`;

const CodeBadge = styled.span`
  font-family: 'JetBrains Mono';
  border: 1px solid ${C.borderLight};
  padding: 2px 6px;
  background: ${C.white};
  color: ${C.text};
  margin-left: 8px;
`;

// --- Main Component ---

export default function EngineeringCascader() {
  const [isOpen, setIsOpen] = useState(false);

  // Selection State (Stores Objects)
  const [selectedProv, setSelectedProv] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedDist, setSelectedDist] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handlers
  const handleProvClick = (prov: any) => {
    if (selectedProv?.id !== prov.id) {
      setSelectedProv(prov);
      setSelectedCity(null); // Reset children
      setSelectedDist(null);
    }
  };

  const handleCityClick = (city: any) => {
    if (selectedCity?.id !== city.id) {
      setSelectedCity(city);
      setSelectedDist(null);
    }
  };

  const handleDistClick = (dist: any) => {
    setSelectedDist(dist);
    setIsOpen(false); // Close on final selection
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProv(null);
    setSelectedCity(null);
    setSelectedDist(null);
  };

  // Helper to render current value path
  const renderValue = () => {
    if (!selectedProv) return <Placeholder>SELECT_REGION_PATH...</Placeholder>;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PathSegment>{selectedProv.label}</PathSegment>
        {selectedCity && (
          <>
            <PathSeparator>/</PathSeparator>
            <PathSegment>{selectedCity.label}</PathSegment>
          </>
        )}
        {selectedDist && (
          <>
            <PathSeparator>/</PathSeparator>
            <PathSegment>{selectedDist.label}</PathSegment>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: '4rem',
        background: '#f1f5f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Wrapper ref={containerRef}>
        <Label>
          <span>GEO_LOCATOR_SYSTEM</span>
          <span>STATUS: {isOpen ? 'ACTIVE' : 'STANDBY'}</span>
        </Label>

        {/* Trigger */}
        <TriggerBox
          $isOpen={isOpen}
          $hasValue={!!selectedProv}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MapPin
            size={16}
            color={selectedDist ? C.accent : C.textSub}
            style={{ marginRight: 12 }}
          />

          <div style={{ flex: 1 }}>{renderValue()}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {selectedProv && (
              <button
                onClick={clearSelection}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 2,
                  display: 'flex',
                }}
              >
                <X size={14} color={C.textSub} />
              </button>
            )}
            <ChevronDown
              size={14}
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s',
              }}
            />
          </div>
        </TriggerBox>

        {/* The Dropdown Panel */}
        <Panel $isOpen={isOpen}>
          <ColumnsContainer>
            {/* Level 1: Province */}
            <Column>
              <ColHeader>
                <Map size={12} /> LEVEL_01 :: PROV
              </ColHeader>
              <List>
                {DATA.map((prov) => (
                  <Item
                    key={prov.id}
                    $isActive={selectedProv?.id === prov.id}
                    onClick={() => handleProvClick(prov)}
                  >
                    {prov.label}
                    {selectedProv?.id === prov.id && <ChevronRight size={12} />}
                  </Item>
                ))}
              </List>
            </Column>

            {/* Level 2: City */}
            <Column>
              <ColHeader>
                <Layers size={12} /> LEVEL_02 :: CITY
              </ColHeader>
              <List>
                {selectedProv ? (
                  selectedProv.children?.map((city: any) => (
                    <Item
                      key={city.id}
                      $isActive={selectedCity?.id === city.id}
                      onClick={() => handleCityClick(city)}
                    >
                      {city.label}
                      {selectedCity?.id === city.id && (
                        <ChevronRight size={12} />
                      )}
                    </Item>
                  ))
                ) : (
                  <EmptySlot>
                    <CornerDownRight size={24} />
                    <span>
                      AWAITING INPUT
                      <br />
                      FROM LEVEL_01
                    </span>
                  </EmptySlot>
                )}
              </List>
            </Column>

            {/* Level 3: District */}
            <Column>
              <ColHeader>
                <Target size={12} /> LEVEL_03 :: DIST
              </ColHeader>
              <List>
                {selectedCity ? (
                  selectedCity.children?.map((dist: any) => (
                    <Item
                      key={dist.id}
                      $isActive={selectedDist?.id === dist.id}
                      $isFinal
                      onClick={() => handleDistClick(dist)}
                    >
                      {dist.label}
                      {selectedDist?.id === dist.id && (
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            background: '#fff',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </Item>
                  ))
                ) : (
                  <EmptySlot>
                    {selectedProv ? (
                      <>
                        <CornerDownRight size={24} />
                        <span>
                          AWAITING INPUT
                          <br />
                          FROM LEVEL_02
                        </span>
                      </>
                    ) : (
                      <span style={{ opacity: 0.3 }}>- - -</span>
                    )}
                  </EmptySlot>
                )}
              </List>
            </Column>
          </ColumnsContainer>

          {/* Footer Metadata */}
          <Footer>
            <div>
              SELECTION_PATH_ID:
              {selectedDist ? (
                <CodeBadge>{selectedDist.id}</CodeBadge>
              ) : (
                <span style={{ opacity: 0.5, marginLeft: 8 }}>NULL</span>
              )}
            </div>
            {selectedDist && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: C.accent,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    background: '#10b981',
                    borderRadius: '50%',
                    boxShadow: '0 0 4px #10b981',
                  }}
                ></div>
                TARGET_LOCKED
              </div>
            )}
          </Footer>
        </Panel>
      </Wrapper>
    </div>
  );
}
