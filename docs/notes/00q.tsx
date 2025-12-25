import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Crosshair,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// --- Global Theme & Utilities ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;        /* Slate-300 */
    --c-border-strong: #0f172a; /* Slate-900 */
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// Helper to get days in month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

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
  width: 300px;
`;

// --- Input Field ---

const Label = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--c-text-sub);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  background: var(--c-canvas);
  border: 2px solid
    ${(props) => (props.$isOpen ? 'var(--c-border-strong)' : 'var(--c-border)')};
  padding: 0 1rem;
  cursor: pointer;
  transition: border-color 0.1s;
  position: relative;

  &:hover {
    border-color: var(--c-border-strong);
  }

  /* Technical marker on the left */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) =>
      props.$isOpen ? 'var(--c-border-strong)' : 'transparent'};
  }
`;

const DateText = styled.span`
  flex-grow: 1;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--c-text-main);
  letter-spacing: -0.5px;
`;

// --- Calendar Panel ---

const Panel = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: -2px; /* Merge borders */
  width: 320px;
  background: var(--c-canvas);
  border: 2px solid var(--c-border-strong);
  z-index: 10;
  box-shadow: 8px 8px 0px rgba(15, 23, 42, 0.1); /* Hard shadow, no blur */
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--c-border);
  background-color: #f1f5f9;
`;

const MonthDisplay = styled.div`
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;

  span.year {
    font-size: 0.7rem;
    font-weight: 400;
    color: var(--c-text-sub);
  }
`;

const NavBtn = styled.button`
  background: white;
  border: 1px solid var(--c-border);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--c-text-main);

  &:hover {
    border-color: var(--c-border-strong);
    background: var(--c-border-strong);
    color: white;
  }
`;

// --- Matrix Grid ---

const GridContainer = styled.div`
  padding: 1rem;
  position: relative;
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
  border-bottom: 1px dashed var(--c-border);
  padding-bottom: 0.5rem;
`;

const WeekDay = styled.div`
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--c-text-sub);
  text-transform: uppercase;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: var(--c-border); /* Creates grid lines via gap */
  border: 1px solid var(--c-border);
`;

const DayCell = styled.button`
  background-color: white;
  aspect-ratio: 1;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: ${(props) => (props.$isOutside ? '#cbd5e1' : 'var(--c-text-main)')};
  position: relative;
  transition: none;

  /* Selection State: High Contrast Block */
  ${(props) =>
    props.$isSelected &&
    css`
      background-color: var(--c-border-strong);
      color: white;
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        top: 2px;
        right: 2px;
        width: 4px;
        height: 4px;
        background: #ef4444; /* Error red as accent for 'target locked' */
      }
    `}

  /* Today State: Corner Triangle */
  ${(props) =>
    props.$isToday &&
    !props.$isSelected &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border-top: 6px solid var(--c-border-strong);
        border-right: 6px solid transparent;
      }
      font-weight: 700;
    `}

  &:hover {
    ${(props) =>
      !props.$isSelected &&
      css`
        outline: 2px solid var(--c-border-strong);
        outline-offset: -2px;
        z-index: 1;
      `}
  }

  &:disabled {
    cursor: not-allowed;
    background: #f8fafc;
  }
`;

const Footer = styled.div`
  border-top: 1px solid var(--c-border);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`;

const FooterBtn = styled.button`
  border: none;
  background: none;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-main);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: #ef4444;
  }
`;

// --- Component ---

const BlueprintDatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handleDayClick = (day) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    setIsOpen(false);
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  const jumpToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setViewDate(today);
    setIsOpen(false);
  };

  // Grid Generation Logic
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month); // 0 = Sun
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const calendarCells = [];

  // Previous Month Padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarCells.push(
      <DayCell key={`prev-${i}`} $isOutside disabled>
        {daysInPrevMonth - i}
      </DayCell>,
    );
  }

  // Current Month Days
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isSelected =
      selectedDate.getDate() === i &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    const isToday =
      today.getDate() === i &&
      today.getMonth() === month &&
      today.getFullYear() === year;

    calendarCells.push(
      <DayCell
        key={`curr-${i}`}
        onClick={() => handleDayClick(i)}
        $isSelected={isSelected}
        $isToday={isToday}
      >
        {i < 10 ? `0${i}` : i}
      </DayCell>,
    );
  }

  // Next Month Padding (to fill 42 cells grid 6x7)
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push(
      <DayCell key={`next-${i}`} $isOutside disabled>
        {i < 10 ? `0${i}` : i}
      </DayCell>,
    );
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Label>
            <span>Target Date</span>
            <span>YYYY-MM-DD</span>
          </Label>

          <InputBox $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <CalendarIcon size={16} className="mr-3 text-slate-500" />
            <DateText>{formatDate(selectedDate)}</DateText>
            {/* Technical decoration: Coordinate readout */}
            <div
              style={{
                fontSize: '10px',
                color: '#94a3b8',
                fontFamily: 'var(--font-mono)',
              }}
            >
              T: {today.getHours()}
              {today.getMinutes()}
            </div>
          </InputBox>

          {isOpen && (
            <Panel>
              <Header>
                <NavBtn onClick={() => changeMonth(-1)}>
                  <ChevronLeft size={16} />
                </NavBtn>
                <MonthDisplay>
                  {monthNames[month]}
                  <span className="year">SEC_{year}</span>
                </MonthDisplay>
                <NavBtn onClick={() => changeMonth(1)}>
                  <ChevronRight size={16} />
                </NavBtn>
              </Header>

              <GridContainer>
                {/* Decorative Crosshairs for Engineering Feel */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    borderTop: '1px solid black',
                    borderLeft: '1px solid black',
                    width: '8px',
                    height: '8px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    width: '8px',
                    height: '8px',
                  }}
                />

                <WeekHeader>
                  {weekDays.map((d) => (
                    <WeekDay key={d}>{d}</WeekDay>
                  ))}
                </WeekHeader>

                <DaysGrid>{calendarCells}</DaysGrid>
              </GridContainer>

              <Footer>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--c-text-sub)',
                  }}
                >
                  <Crosshair size={12} /> SYS_TIME_UTC
                </div>
                <FooterBtn onClick={jumpToToday}>[ LOCATE_TODAY ]</FooterBtn>
              </Footer>
            </Panel>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default BlueprintDatePicker;
