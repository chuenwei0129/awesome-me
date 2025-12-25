import {
  Bell,
  CheckSquare,
  ChevronDown,
  Clock,
  MapPin,
  MessageSquare,
  Square,
  User,
} from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

// --- Global Theme & Primitives ---

const BlueprintPage = styled.div`
  background: #f8fafc;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  display: flex;
  justify-content: center;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;

  /* Technical Corner Marker */
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 8px;
    height: 8px;
    border-bottom: 2px solid #0f172a;
    border-right: 2px solid #0f172a;
  }
`;

const HeaderRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #cbd5e1;

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const Button = styled.button`
  background: ${(props) => (props.$primary ? '#0f172a' : '#ffffff')};
  color: ${(props) => (props.$primary ? '#ffffff' : '#0f172a')};
  border: 1px solid ${(props) => (props.$primary ? '#0f172a' : '#cbd5e1')};
  padding: 0.5rem 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 2px 2px 0 rgba(15, 23, 42, 0.1);
  }
`;

const Badge = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  padding: 2px 6px;
  border: 1px solid currentColor;
  text-transform: uppercase;

  ${(props) => {
    switch (props.$status) {
      case 'Upcoming':
        return 'color: #3b82f6; border-color: #3b82f6; background: #eff6ff;';
      case 'Cancelled':
        return 'color: #ef4444; border-color: #ef4444; background: #fef2f2;';
      case 'Pending':
        return 'color: #f59e0b; border-color: #f59e0b; background: #fffbeb;';
      case 'Completed':
        return 'color: #10b981; border-color: #10b981; background: #ecfdf5;';
      default:
        return 'color: #64748b; border-color: #cbd5e1;';
    }
  }}
`;

// --- Components ---

const NavTabs = () => (
  <div style={{ display: 'flex', gap: '-1px' }}>
    {['OVERVIEW', 'CALENDAR', 'TODO_LIST'].map((tab, i) => (
      <button
        key={tab}
        style={{
          padding: '0.75rem 1.5rem',
          background: i === 0 ? '#0f172a' : '#fff',
          color: i === 0 ? '#fff' : '#64748b',
          border: '1px solid #cbd5e1',
          fontFamily: 'JetBrains Mono',
          fontSize: '0.8rem',
          cursor: 'pointer',
          marginRight: '-1px', // Collapse borders
        }}
      >
        {tab}
      </button>
    ))}
  </div>
);

const UserProfile = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <Button style={{ padding: '8px' }}>
      <MessageSquare size={16} />
    </Button>
    <Button style={{ padding: '8px' }}>
      <Bell size={16} />
    </Button>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid #cbd5e1',
        padding: '0.5rem 1rem',
        background: '#fff',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          background: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <User size={20} color="#fff" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
          Dianne Russell
        </span>
        <span
          style={{
            fontSize: '0.7rem',
            fontFamily: 'JetBrains Mono',
            color: '#64748b',
          }}
        >
          ID: TEAM_MGR
        </span>
      </div>
      <ChevronDown size={14} color="#64748b" />
    </div>
  </div>
);

// --- Calendar Widget ---

const CalendarWidget = () => {
  const days = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // Offset to start at 30
    return day > 0 && day <= 31 ? day : day <= 0 ? 30 + day : day - 31;
  });

  // Mock data for events
  const hasEvent = [2, 3, 8, 11, 14, 17, 22, 25];

  return (
    <Panel style={{ gridRow: 'span 1' }}>
      <SectionHeader>
        <h2>Dec 2025</h2>
        <Button>
          MONTH <ChevronDown size={14} />
        </Button>
      </SectionHeader>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          background: '#cbd5e1',
          border: '1px solid #cbd5e1',
        }}
      >
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
          <div
            key={d}
            style={{
              background: '#f1f5f9',
              padding: '0.5rem',
              textAlign: 'center',
              fontSize: '0.7rem',
              fontFamily: 'JetBrains Mono',
              color: '#64748b',
            }}
          >
            {d}
          </div>
        ))}

        {days.map((d, i) => {
          const isSelected = d === 20; // Matches image
          const isDim = i < 3 || i > 33;

          return (
            <div
              key={i}
              style={{
                background: isSelected ? '#0f172a' : '#fff',
                color: isSelected ? '#fff' : isDim ? '#cbd5e1' : '#0f172a',
                height: '60px',
                padding: '0.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{ fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}
              >
                {d}
              </span>
              {hasEvent.includes(d) && !isSelected && (
                <div
                  style={{
                    width: 4,
                    height: 4,
                    background: '#0f172a',
                    marginTop: '4px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

// --- Events List ---

const EventCard = ({ date, title, status, time, location }) => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      border: '1px solid #cbd5e1',
      padding: '1rem',
      background: '#fff',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        borderRight: '1px dashed #cbd5e1',
      }}
    >
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{date.day}</span>
      <span
        style={{
          fontSize: '0.7rem',
          fontFamily: 'JetBrains Mono',
          color: '#64748b',
        }}
      >
        {date.dow}
      </span>
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
        }}
      >
        <span style={{ fontWeight: '600' }}>{title}</span>
        <Badge $status={status}>{status}</Badge>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          fontSize: '0.75rem',
          color: '#64748b',
          fontFamily: 'JetBrains Mono',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {time}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} /> {location}
        </div>
      </div>
    </div>
  </div>
);

const EventsPanel = () => (
  <Panel>
    <SectionHeader>
      <h2>Your Events</h2>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button>
          ALL <ChevronDown size={14} />
        </Button>
        <Button $primary>ADD NEW</Button>
      </div>
    </SectionHeader>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <EventCard
        date={{ day: '20', dow: 'FRI' }}
        title="Global Summit 2025"
        status="Upcoming"
        time="08:05 am"
        location="3890 Poplar Dr."
      />
      <EventCard
        date={{ day: '22', dow: 'SUN' }}
        title="Elite Athlete Invitational"
        status="Cancelled"
        time="01:49 pm"
        location="8558 Green Rd."
      />
      <EventCard
        date={{ day: '25', dow: 'WED' }}
        title="World Design Challenge"
        status="Pending"
        time="12:10 am"
        location="775 Rolling Green Rd."
      />
    </div>
  </Panel>
);

// --- Messages & Notices ---

const MessageItem = ({ name, time, preview, id }) => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9',
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: '1px solid #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        background: '#f8fafc',
      }}
    >
      IMG_{id}
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px',
        }}
      >
        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{name}</span>
        <span
          style={{
            fontSize: '0.7rem',
            fontFamily: 'JetBrains Mono',
            color: '#64748b',
          }}
        >
          {time}
        </span>
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: '#64748b',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '300px',
        }}
      >
        {preview}
      </div>
    </div>
  </div>
);

const MessagesPanel = () => (
  <Panel>
    <SectionHeader>
      <h2>Messages & Notices</h2>
      <Button>
        ALL <ChevronDown size={14} />
      </Button>
    </SectionHeader>
    <div>
      <MessageItem
        id="01"
        name="Savannah Nguyen"
        time="10:04 AM"
        preview="Don't forget, practice starts at 6 PM sharp tomorrow."
      />
      <MessageItem
        id="02"
        name="Francisco Kristin"
        time="10:04 AM"
        preview="Our next meeting is scheduled for Saturday at 3 PM."
      />
      <MessageItem
        id="03"
        name="Devon Lane"
        time="10:04 AM"
        preview="All players, please ensure your gear is packed."
      />
    </div>
  </Panel>
);

// --- Todo List ---

const CheckItem = ({ label, date, checked, hasSub }) => (
  <div style={{ padding: '0.75rem 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      {checked ? (
        <CheckSquare size={18} color="#0f172a" />
      ) : (
        <Square size={18} color="#cbd5e1" />
      )}
      <span
        style={{
          flex: 1,
          textDecoration: checked ? 'line-through' : 'none',
          color: checked ? '#94a3b8' : '#0f172a',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '0.7rem',
          fontFamily: 'JetBrains Mono',
          background: '#f1f5f9',
          padding: '2px 4px',
          color: '#64748b',
        }}
      >
        {date}
      </span>
    </div>
    {hasSub && (
      <div
        style={{
          marginLeft: '1.75rem',
          marginTop: '0.75rem',
          borderLeft: '1px solid #cbd5e1',
          paddingLeft: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
          }}
        >
          <CheckSquare size={16} /> <span>Plan training drills</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
          }}
        >
          <Square size={16} color="#cbd5e1" /> <span>Review game footage</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Badge $status="default">SUBTODO</Badge>
          <Badge $status="default">REPEAT</Badge>
        </div>
      </div>
    )}
  </div>
);

const TodoPanel = () => (
  <Panel>
    <SectionHeader>
      <h2>Todo List</h2>
      <Button $primary>ADD NEW</Button>
    </SectionHeader>
    <div>
      <CheckItem
        label="Organize equipment inventory"
        date="SEP 01"
        hasSub={true}
      />
      <CheckItem
        label="Plan a team-building activity"
        date="SEP 02"
        checked={false}
      />
      <CheckItem
        label="Set up a nutrition plan"
        date="SEP 12"
        checked={false}
      />
    </div>
  </Panel>
);

// --- Main Layout Assembly ---

const BlueprintDashboardLayout = () => {
  return (
    <BlueprintPage>
      <LayoutGrid>
        {/* Header */}
        <HeaderRow>
          <NavTabs />
          <UserProfile />
        </HeaderRow>

        {/* Top Row */}
        <CalendarWidget />
        <EventsPanel />

        {/* Bottom Row */}
        <MessagesPanel />
        <TodoPanel />
      </LayoutGrid>
    </BlueprintPage>
  );
};

export default BlueprintDashboardLayout;
