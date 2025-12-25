import React from 'react';
import styled, { css } from 'styled-components';

// --- Global Constants ---
const COLORS = {
  bg: '#ffffff',
  pattern: '#cbd5e1', // Slate-300 for the pattern lines
  text: '#0f172a',
  overlay: '#ffffff',
};

// --- Pattern CSS Generators ---

const gridPattern = css`
  background-size: 40px 40px;
  background-image: linear-gradient(
      to right,
      ${COLORS.pattern} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${COLORS.pattern} 1px, transparent 1px);
  background-position: center;
`;

const dotPattern = css`
  background-size: 24px 24px;
  background-image: radial-gradient(${COLORS.pattern} 1.5px, transparent 1.5px);
  background-position: center;
`;

const diagonalPattern = css`
  background-size: 20px 20px;
  background-image: repeating-linear-gradient(
    45deg,
    ${COLORS.pattern},
    ${COLORS.pattern} 1px,
    transparent 1px,
    transparent 10px /* Controls the density */
  );
`;

const zigzagPattern = css`
  background-color: ${COLORS.bg};
  background-image: linear-gradient(
      135deg,
      ${COLORS.pattern} 25%,
      transparent 25%
    ),
    linear-gradient(225deg, ${COLORS.pattern} 25%, transparent 25%),
    linear-gradient(45deg, ${COLORS.pattern} 25%, transparent 25%),
    linear-gradient(315deg, ${COLORS.pattern} 25%, transparent 25%);
  background-position: 10px 0, 10px 0, 0 0, 0 0;
  background-size: 20px 20px; /* Size of the chevron */
  background-repeat: repeat;
  opacity: 0.6; /* Slight transparency for the heavier zigzag */
`;

// --- Styled Components ---

const PatternContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  background-color: ${COLORS.bg};
  border: 1px solid ${COLORS.pattern};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Apply the specific pattern variant */
  ${(props) => {
    switch (props.$variant) {
      case 'grid':
        return gridPattern;
      case 'dot':
        return dotPattern;
      case 'diagonal':
        return diagonalPattern;
      case 'zigzag':
        return zigzagPattern;
      default:
        return gridPattern;
    }
  }}

  /* Technical Corner Markers for the "Blueprint" feel */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid ${COLORS.text};
    z-index: 10;
  }
  &::before {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  }
  &::after {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  }
`;

const LabelOverlay = styled.div`
  background: ${COLORS.overlay};
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: ${COLORS.text};
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Connectors (the horizontal lines sticking out in your images) */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40px;
    height: 1px;
    background: ${COLORS.pattern};
  }
  &::before {
    right: 100%;
  }
  &::after {
    left: 100%;
  }
`;

const InfoTag = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #64748b;
  background: white;
  padding: 2px 6px;
  border: 1px solid ${COLORS.pattern};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

// --- Reusable Component ---

const Background = ({ variant, label }) => {
  return (
    <PatternContainer $variant={variant}>
      <InfoTag>TYPE: {variant.toUpperCase()}</InfoTag>
      <LabelOverlay>{label || `This has ${variant} background`}</LabelOverlay>
    </PatternContainer>
  );
};

// --- Main Layout ---

const BlueprintBackgrounds = () => {
  return (
    <GridWrapper>
      <Background
        variant="diagonal"
        label="This has diagonal line background"
      />
      <Background variant="zigzag" label="This has zigzag background" />
      <Background variant="dot" label="This has dot background" />
      <Background variant="grid" label="This has grid background" />
    </GridWrapper>
  );
};

export default BlueprintBackgrounds;
