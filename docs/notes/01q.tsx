import {
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// --- Global Theme ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;        /* Slate-300 */
    --c-border-strong: #0f172a; /* Slate-900 */
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-accent: #0f172a;        /* Main Active Color */
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// --- Utilities ---
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const isSameDay = (d1, d2) =>
  d1 && d2 && d1.toDateString() === d2.toDateString();
const isBefore = (d1, d2) => d1 && d2 && d1 < d2;
const isAfter = (d1, d2) => d1 && d2 && d1 > d2;

const formatDate = (date) => {
  if (!date) return 'YYYY-MM-DD';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// --- Styled Components ---

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-ui);
`;

const Container = styled.div`
  position: relative;
  width: 600px; /* Wider for dual panels */
`;

// --- Trigger / Input Area ---

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 2px solid
    ${(props) => (props.$isOpen ? 'var(--c-border-strong)' : 'var(--c-border)')};
  background: var(--c-canvas);
  height: 3.5rem;
  padding: 0 1rem;
  cursor: pointer;
  transition: border-color 0.1s;
  position: relative;

  &:hover {
    border-color: var(--c-border-strong);
  }

  /* Connector Line visuals */
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 2rem;
    right: 2rem;
    height: 1px;
    border-bottom: 1px dashed var(--c-border);
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  }
`;

const DateBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: ${(props) =>
    props.$hasValue ? 'var(--c-text-main)' : 'var(--c-text-sub)'};
`;

const Separator = styled.div`
  padding: 0 1.5rem;
  color: var(--c-text-sub);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--c-text-sub);
  &:hover {
    color: var(--c-text-main);
  }
`;

// --- Popup Panel ---

const Popup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: var(--c-canvas);
  border: 2px solid var(--c-border-strong);
  z-index: 20;
  box-shadow: 12px 12px 0 rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
`;

const PanelBody = styled.div`
  display: flex;
  /* Split line between calendars */
  & > div:first-child {
    border-right: 1px dashed var(--c-border);
  }
`;

const CalendarPanel = styled.div`
  width: 300px;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  height: 32px;
`;

const MonthTitle = styled.div`
  font-family: var(--font-mono);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

const NavBtn = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid var(--c-border);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  visibility: ${(props) => (props.$hidden ? 'hidden' : 'visible')};

  &:hover {
    background: var(--c-border-strong);
    color: white;
    border-color: var(--c-border-strong);
  }
`;

// --- Grid & Cells ---

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 4px;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 0.65rem;
  color: var(--c-text-sub);
  font-family: var(--font-mono);
  text-transform: uppercase;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 2px; /* Small gap for range connector look */
`;

const CellWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px 0; /* Vertical spacing for the range bar */
`;

const DayBtn = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--c-text-main);
  cursor: pointer;
  position: relative;
  z-index: 2;

  &:disabled {
    color: #e2e8f0;
    cursor: not-allowed;
  }

  /* Hover effect for unselected cells */
  &:hover:not(:disabled) {
    ${(props) =>
      !props.$isSelected &&
      !props.$inRange &&
      css`
        border: 1px solid var(--c-border-strong);
      `}
  }

  /* Selected State (Start/End) */
  ${(props) =>
    props.$isSelected &&
    css`
      background: var(--c-border-strong);
      color: white;
      font-weight: bold;
      box-shadow: 0 0 0 1px white inset; /* Inner border */
    `}
`;

// Range Background (The hatched pattern)
const RangeHighlight = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px; /* Slightly smaller than cell height */
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #f1f5f9;

  /* Engineering Hatch Pattern */
  background-image: repeating-linear-gradient(
    45deg,
    #cbd5e1,
    #cbd5e1 1px,
    transparent 1px,
    transparent 6px
  );
  border-top: 1px dashed var(--c-border-strong);
  border-bottom: 1px dashed var(--c-border-strong);

  /* Handling edges of the range */
  ${(props) =>
    props.$isStart &&
    css`
      left: 50%;
      border-left: 1px dashed var(--c-border-strong);
    `}
  ${(props) =>
    props.$isEnd &&
    css`
      right: 50%;
      border-right: 1px dashed var(--c-border-strong);
    `}
  ${(props) =>
    props.$isStart &&
    props.$isEnd &&
    css`
      display: none; /* Single day range has no bar */
    `}
`;

const Footer = styled.div`
  border-top: 1px solid var(--c-border);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-sub);
`;

// --- Component ---

const BlueprintRangePicker = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Date State
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  // View State (Left Calendar Month)
  const [viewDate, setViewDate] = useState(new Date());

  const handleDateClick = (date) => {
    if (!startDate && !endDate) {
      setStartDate(date);
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        setStartDate(date); // Reset start if clicked before
      } else {
        setEndDate(date); // Set end
        setIsOpen(false);
      }
    } else {
      // Reset and start new range
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handleMouseEnter = (date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    }
  };

  const changeMonth = (offset) => {
    const newDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + offset,
      1,
    );
    setViewDate(newDate);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
  };

  // Render Logic for a Single Month Panel
  const renderCalendar = (baseDate, offset = 0) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    // Adjust for offset (Right panel)
    const currentMonthDate = new Date(year, month + offset, 1);
    const cYear = currentMonthDate.getFullYear();
    const cMonth = currentMonthDate.getMonth();

    const daysInMonth = getDaysInMonth(cYear, cMonth);
    const firstDay = getFirstDayOfMonth(cYear, cMonth);

    const cells = [];

    // Empty slots for start offset
    for (let i = 0; i < firstDay; i++) {
      cells.push(<CellWrapper key={`empty-${i}`} />);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(cYear, cMonth, d);

      const isStart = isSameDay(date, startDate);
      const isEnd = isSameDay(date, endDate);
      const isSelected = isStart || isEnd;

      // Range Logic (including hover preview)
      let inRange = false;
      if (startDate && endDate) {
        inRange = isAfter(date, startDate) && isBefore(date, endDate);
      } else if (startDate && hoverDate && !endDate) {
        // Preview range
        const start = startDate < hoverDate ? startDate : hoverDate;
        const end = startDate < hoverDate ? hoverDate : startDate;
        inRange = isAfter(date, start) && isBefore(date, end);
      }

      cells.push(
        <CellWrapper key={d} onMouseEnter={() => handleMouseEnter(date)}>
          {/* Hatched Background for Range */}
          {(inRange || isStart || isEnd) &&
            startDate &&
            (endDate || hoverDate) && (
              <RangeHighlight
                $isStart={isSameDay(
                  date,
                  startDate < (endDate || hoverDate)
                    ? startDate
                    : endDate || hoverDate,
                )}
                $isEnd={isSameDay(date, endDate || hoverDate)}
              />
            )}

          <DayBtn
            onClick={() => handleDateClick(date)}
            $isSelected={isSelected}
            $inRange={inRange}
          >
            {d}
          </DayBtn>
        </CellWrapper>,
      );
    }

    return (
      <CalendarPanel>
        <Header>
          <NavBtn onClick={() => changeMonth(-1)} $hidden={offset === 1}>
            <ChevronLeft size={14} />
          </NavBtn>
          <MonthTitle>
            {currentMonthDate.toLocaleString('default', { month: 'long' })}{' '}
            {cYear}
          </MonthTitle>
          <NavBtn onClick={() => changeMonth(1)} $hidden={offset === 0}>
            <ChevronRight size={14} />
          </NavBtn>
        </Header>
        <WeekHeader>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <WeekDay key={d}>{d}</WeekDay>
          ))}
        </WeekHeader>
        <Grid>{cells}</Grid>
      </CalendarPanel>
    );
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <div
            style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--c-text-sub)',
              }}
            >
              COMPONENT: RANGE_PICKER_V2
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--c-text-sub)',
              }}
            >
              MODE: DUAL_VIEW
            </div>
          </div>

          <InputGroup $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <DateBox $hasValue={!!startDate}>
              <CalendarIcon size={16} />
              {formatDate(startDate) || 'START_DATE'}
            </DateBox>

            <Separator>
              <ArrowRight size={16} />
            </Separator>

            <DateBox $hasValue={!!endDate}>
              {formatDate(endDate) || 'END_DATE'}
              {/* Spacer to push X to right */}
              <div style={{ flex: 1 }}></div>
              {(startDate || endDate) && (
                <ClearBtn onClick={clearSelection}>
                  <X size={16} />
                </ClearBtn>
              )}
            </DateBox>
          </InputGroup>

          {isOpen && (
            <Popup>
              {/* Technical readout bar */}
              <div
                style={{
                  background: '#f1f5f9',
                  padding: '4px 8px',
                  borderBottom: '1px solid var(--c-border)',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  gap: '12px',
                  color: 'var(--c-text-sub)',
                }}
              >
                <span>
                  DELTA:{' '}
                  {startDate && endDate
                    ? Math.round(
                        (endDate - startDate) / (1000 * 60 * 60 * 24),
                      ) + ' DAYS'
                    : '--'}
                </span>
                <span>STATUS: {endDate ? 'LOCKED' : 'AWAITING_INPUT'}</span>
              </div>

              <PanelBody>
                {renderCalendar(viewDate, 0)}
                {renderCalendar(viewDate, 1)}
              </PanelBody>

              <Footer>
                <span>[ ] SMART_ALIGN</span>
                <span>UTC+08:00</span>
              </Footer>
            </Popup>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default BlueprintRangePicker;
