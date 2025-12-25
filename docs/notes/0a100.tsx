import {
  Activity,
  Check,
  Search,
  Skull,
  Terminal,
  User,
  X,
} from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

// --- Global Theme & Utilities ---
const theme = {
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#cbd5e1',
  textMain: '#0f172a',
  textSub: '#64748b',
  accent: '#0f172a',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  blue: '#3b82f6',
};

// --- Styled Primitives ---

const DashboardContainer = styled.div`
  background: ${theme.bg};
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: ${theme.textMain};
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  align-items: start;
`;

const Panel = styled.div`
  background: ${theme.white};
  border: 1px solid ${theme.border};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  /* Technical Corner Markers */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 6px;
    height: 6px;
    border-top: 2px solid ${theme.accent};
    border-left: 2px solid ${theme.accent};
  }
`;

const PanelHeader = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${theme.textSub};
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// --- UI Components ---

const Button = styled.button`
  background: ${(props) => (props.$primary ? theme.accent : theme.white)};
  color: ${(props) => (props.$primary ? theme.white : theme.textMain)};
  border: 1px solid ${(props) => (props.$primary ? theme.accent : theme.border)};
  padding: 0.6rem 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${(props) => (props.$primary ? '#334155' : '#f1f5f9')};
    border-color: ${theme.accent};
  }
`;

const Input = styled.input`
  background: ${theme.white};
  border: 1px solid ${theme.border};
  padding: 0.5rem 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  width: 100%;
  outline: none;
  color: ${theme.textMain};

  &:focus {
    border-color: ${theme.accent};
  }
`;

const SliderTrack = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: ${theme.border};
  }
`;

const SliderThumb = styled.div`
  width: 12px;
  height: 12px;
  background: ${theme.white};
  border: 1px solid ${theme.accent};
  position: absolute;
  left: ${(props) => props.$value}%;
  transform: translateX(-50%);
`;

// --- Progress Bar (Blueprint Style) ---
const ProgressBar = ({ label, value, color, max = 100 }) => (
  <div style={{ width: '100%' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px',
        fontSize: '0.75rem',
        fontFamily: 'JetBrains Mono',
      }}
    >
      <span>{label}</span>
      <span>
        {value}/{max}
      </span>
    </div>
    <div
      style={{
        height: '16px',
        border: `1px solid ${theme.border}`,
        padding: '2px',
        position: 'relative',
      }}
    >
      {/* Ruler Marks */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
          backgroundSize: '10% 100%',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          height: '100%',
          width: `${(value / max) * 100}%`,
          background: color,
        }}
      />
    </div>
  </div>
);

// --- Specific Widgets ---

const TacticalViewport = () => (
  <div
    style={{
      height: '240px',
      background: '#0f172a',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.white,
      fontFamily: 'JetBrains Mono',
      border: `1px solid ${theme.accent}`,
      overflow: 'hidden',
    }}
  >
    {/* Grid Overlay */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    <h1 style={{ fontSize: '2rem', margin: 0, zIndex: 2 }}>
      LEVEL_02: GOBLINS
    </h1>
    <div
      style={{
        marginTop: '0.5rem',
        fontSize: '0.8rem',
        opacity: 0.8,
        zIndex: 2,
      }}
    >
      MISSION: NEUTRALIZE_HOSTILES
    </div>

    {/* Tactical Markers */}
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        fontSize: '0.7rem',
        opacity: 0.6,
      }}
    >
      COORDS: 42.10, -18.44
    </div>
  </div>
);

const CommLog = ({ sender, message, isEnemy }) => (
  <div
    style={{
      border: `1px solid ${theme.border}`,
      padding: '0.75rem',
      display: 'flex',
      gap: '1rem',
      background: '#f1f5f9',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: `1px solid ${theme.textSub}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.white,
      }}
    >
      {isEnemy ? <Skull size={20} /> : <User size={20} />}
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          marginBottom: '2px',
        }}
      >
        COMM_ID: {sender}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
        "{message}"
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, sub, icon: Icon }) => (
  <Panel>
    <PanelHeader>
      <span>{label}</span>
      {Icon && <Icon size={14} />}
    </PanelHeader>
    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
    <div
      style={{
        fontSize: '0.75rem',
        color: theme.textSub,
        fontFamily: 'JetBrains Mono',
      }}
    >
      {sub}
    </div>
  </Panel>
);

// --- Layout Assembly ---

const BlueprintGameDashboard = () => {
  return (
    <DashboardContainer>
      <Grid>
        {/* === LEFT COLUMN: CONTROLS === */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Main Menu Panel */}
          <Panel>
            <PanelHeader>SYS_MAIN_MENU</PanelHeader>
            <div
              style={{
                textAlign: 'center',
                padding: '0.5rem',
                fontSize: '0.8rem',
                color: theme.textSub,
              }}
            >
              RETRO_8BIT_QUEST.EXE
            </div>
            <Button $primary>
              <Terminal size={14} /> START_SESSION
            </Button>
            <Button>OPTIONS_CONFIG</Button>
            <Button>LEADERBOARD_DB</Button>
            <Button>NET_MULTIPLAYER</Button>
            <Button style={{ borderColor: theme.error, color: theme.error }}>
              TERMINATE_PROCESS
            </Button>
          </Panel>

          {/* Audio Settings */}
          <Panel>
            <PanelHeader>AUDIO_MIXER</PanelHeader>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div>
                <label
                  style={{
                    fontSize: '0.75rem',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  MASTER_VOL
                </label>
                <SliderTrack>
                  <SliderThumb $value={70} />
                </SliderTrack>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '0.75rem',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  SFX_GAIN
                </label>
                <SliderTrack>
                  <SliderThumb $value={40} />
                </SliderTrack>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                }}
              >
                <span>MUTE_ALL</span>
                <div
                  style={{
                    width: '32px',
                    height: '16px',
                    border: `1px solid ${theme.border}`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      right: '2px',
                      top: '2px',
                      bottom: '2px',
                      width: '12px',
                      background: theme.textSub,
                    }}
                  />
                </div>
              </div>
            </div>
          </Panel>

          {/* Active Status */}
          <StatCard
            label="ACTIVE_USERS"
            value="+573"
            sub="DELTA: +201 / 1H"
            icon={Activity}
          />

          <StatCard
            label="SUBSCRIPTIONS"
            value="+2350"
            sub="GROWTH: +180.1%"
            icon={User}
          />
        </div>

        {/* === CENTER COLUMN: GAME VIEW === */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Header Controls */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem',
            }}
          >
            <Button>BUTTON_01</Button>
            <Input defaultValue="THEME: LIGHT_ENG" />
            <Input
              defaultValue="DATE: 2024-10-27"
              type="date"
              style={{ fontFamily: 'Inter' }}
            />
          </div>

          {/* Health/Mana Status Header */}
          <Panel>
            <PanelHeader>UNIT_STATUS: FIRE_DRAGON [LV.25]</PanelHeader>
            <ProgressBar
              label="HP_INTEGRITY"
              value={850}
              max={1000}
              color={theme.error}
            />
            <ProgressBar
              label="MP_ENERGY"
              value={450}
              max={1000}
              color={theme.blue}
            />
          </Panel>

          {/* Dialogue / Logs */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <CommLog
              sender="ORC_WARLORD"
              message="I bring you a gift... it's called AXE TO THE FACE! SLASH!!"
              isEnemy={true}
            />
            <CommLog
              sender="GOBLIN_SCOUT"
              message="*Screeches like a dying flute*"
              isEnemy={true}
            />
          </div>

          {/* Game Over / Modal Area */}
          <Panel style={{ borderColor: theme.textMain, borderWidth: '2px' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <h2 style={{ margin: 0, textTransform: 'uppercase' }}>
                  Fatal_Error
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: theme.textSub,
                  }}
                >
                  Process execution halted. Continue?
                </p>
                <Button $primary>
                  <Check size={14} /> RETRY_ROUTINE
                </Button>
                <Button>
                  <X size={14} /> ABORT
                </Button>
              </div>
              {/* ASCII Skull Representation */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  border: `1px solid ${theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f5f9',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  whiteSpace: 'pre',
                  lineHeight: '10px',
                }}
              >
                {`
  .ed"""" """$$$$be.
-"           ^""**$$$e.
                   "**$$
                     $$
   FATAL EXCEPTION   $$
                     $$
                     $$
                  `}
              </div>
            </div>
          </Panel>

          {/* Main Viewport */}
          <TacticalViewport />

          {/* Tabs Menu */}
          <div
            style={{
              display: 'flex',
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                padding: '0.5rem 1.5rem',
                borderBottom: `2px solid ${theme.accent}`,
                fontWeight: 'bold',
                fontSize: '0.85rem',
              }}
            >
              ITEMS
            </div>
            <div
              style={{
                padding: '0.5rem 1.5rem',
                color: theme.textSub,
                fontSize: '0.85rem',
              }}
            >
              SKILLS
            </div>
            <div
              style={{
                padding: '0.5rem 1.5rem',
                color: theme.textSub,
                fontSize: '0.85rem',
              }}
            >
              STATS
            </div>
          </div>
          <div
            style={{
              fontSize: '0.8rem',
              color: theme.textSub,
              padding: '0.5rem',
            }}
          >
            INVENTORY_MANIFEST: 15 ITEMS (POTIONS, WEAPONS_CLASS_A)
          </div>
        </div>

        {/* === RIGHT COLUMN: DATA === */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <Input placeholder="ENTER_PLAYER_NAME..." />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button>FILE</Button>
            <Button>EDIT</Button>
          </div>

          {/* Difficulty Selector */}
          <Panel>
            <PanelHeader>DIFFICULTY_MOD</PanelHeader>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <Button>MODE: EASY</Button>
              <Button $primary>MODE: NORMAL</Button>
              <Button>MODE: HARD</Button>
            </div>
          </Panel>

          {/* Command Search */}
          <Panel>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.border}`,
                paddingBottom: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <Search
                size={14}
                color={theme.textSub}
                style={{ marginRight: '8px' }}
              />
              <input
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.8rem',
                }}
                placeholder="TYPE_COMMAND..."
              />
            </div>
            <div style={{ fontSize: '0.75rem', color: theme.textSub }}>
              SUGGESTIONS:
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '0.85rem',
              }}
            >
              <div style={{ padding: '4px', background: '#f1f5f9' }}>
                CALENDAR_VIEW
              </div>
              <div style={{ padding: '4px' }}>SEARCH_EMOJI</div>
              <div style={{ padding: '4px' }}>CALC_TOOL</div>
            </div>
          </Panel>

          {/* Product Details Form */}
          <Panel>
            <PanelHeader>ITEM_DETAILS</PanelHeader>
            <div>
              <label style={{ fontSize: '0.75rem' }}>ITEM_NAME</label>
              <div
                style={{
                  padding: '0.5rem',
                  border: `1px solid ${theme.textMain}`,
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.9rem',
                  marginTop: '4px',
                }}
              >
                GAMER_GEAR
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem' }}>DESCRIPTION_LOG</label>
              <div
                style={{
                  padding: '0.5rem',
                  border: `1px solid ${theme.textMain}`,
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.75rem',
                  height: '100px',
                  marginTop: '4px',
                  overflow: 'hidden',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullal
                auctor, nisl nec...
                <br />
                <br />
                // END_OF_FILE
              </div>
            </div>
          </Panel>

          {/* Game Options Checkboxes */}
          <Panel>
            <PanelHeader>SYS_CONFIG</PanelHeader>
            {[
              { label: 'AUTO_SAVE', checked: true },
              { label: 'NOTIFICATIONS', checked: false },
              { label: 'FULLSCREEN', checked: true },
              { label: 'HARDCORE_MODE', checked: false },
            ].map((opt, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: `1px solid ${theme.textMain}`,
                    background: opt.checked ? theme.textMain : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {opt.checked && <Check size={12} color={theme.white} />}
                </div>
                <span style={{ fontSize: '0.8rem' }}>{opt.label}</span>
              </div>
            ))}
          </Panel>
        </div>
      </Grid>
    </DashboardContainer>
  );
};

export default BlueprintGameDashboard;
