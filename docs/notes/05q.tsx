import {
  ArrowLeftRight,
  ArrowUpDown,
  Eye,
  Plus,
  RotateCcw,
  RotateCw,
  Trash2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// --- Global Theme ---
const GlobalStyle = createGlobalStyle`
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-border-strong: #0f172a;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-error: #ef4444;
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }
`;

// --- Styled Components (Upload Grid) ---
// ... (Reusing previous styles for consistency) ...

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--c-bg);
  padding: 3rem;
  font-family: var(--font-ui);
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

const WallGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ItemBox = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  background: var(--c-canvas);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  /* Engineering Markers */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border: 1px solid var(--c-border-strong);
    opacity: 0;
    transition: opacity 0.2s;
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

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const ImageContainer = styled(ItemBox)`
  padding: 4px;
  border: 1px solid var(--c-border);

  &:hover .overlay {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
`;

const ActionIcon = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: white;
    color: var(--c-text-main);
    border-color: white;
  }
`;

const UploadTrigger = styled(ItemBox)`
  border: 1px dashed var(--c-border-strong);
  cursor: pointer;
  color: var(--c-text-sub);
  gap: 0.5rem;
  &:hover {
    background: #f1f5f9;
    color: var(--c-text-main);
  }
`;

// --- PREVIEW MODAL COMPONENTS ---

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.96); /* High opacity dark slate */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Grid pattern overlay */
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`;

const PreviewImageWrapper = styled.div`
  transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
  transform: rotate(${(props) => props.$rotate}deg)
    scale(${(props) => props.$scale}) scaleX(${(props) => props.$flipX})
    scaleY(${(props) => props.$flipY});

  /* Frame around the image */
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);

  img {
    max-height: 70vh;
    max-width: 70vw;
    display: block;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

const Toolbar = styled.div`
  position: absolute;
  bottom: 3rem;
  background: var(--c-canvas);
  border: 2px solid var(--c-text-main); /* Thick border */
  display: flex;
  padding: 4px;
  gap: 4px;
`;

const ToolBtn = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid var(--c-border);
  background: white;
  color: var(--c-text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--c-text-main);
    color: white;
    border-color: var(--c-text-main);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    border-color: white;
    background: white;
    color: var(--c-text-main);
  }
`;

const FileInfoTag = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-family: var(--font-mono);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  padding-left: 1rem;
`;

// --- MAIN COMPONENT ---

const BlueprintUploadWithPreview = () => {
  // File List State
  const [fileList, setFileList] = useState([
    {
      uid: '1',
      name: 'coffee_break_01.jpg',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      uid: '2',
      name: 'coffee_break_02.jpg',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      uid: '3',
      name: 'coffee_break_03.jpg',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
  ]);

  // Preview State
  const [previewFile, setPreviewFile] = useState(null);
  const [transform, setTransform] = useState({
    rotate: 0,
    scale: 1,
    flipX: 1,
    flipY: 1,
  });

  const handlePreview = (file) => {
    setPreviewFile(file);
    // Reset transform on open
    setTransform({ rotate: 0, scale: 1, flipX: 1, flipY: 1 });
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  // Transform Handlers
  const handleZoom = (delta) => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.2, prev.scale + delta),
    }));
  };
  const handleRotate = (deg) => {
    setTransform((prev) => ({ ...prev, rotate: prev.rotate + deg }));
  };
  const handleFlipX = () => {
    setTransform((prev) => ({ ...prev, flipX: prev.flipX * -1 }));
  };
  const handleFlipY = () => {
    setTransform((prev) => ({ ...prev, flipY: prev.flipY * -1 }));
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <div
            style={{
              marginBottom: '2rem',
              borderBottom: '2px solid var(--c-border-strong)',
              paddingBottom: '1rem',
            }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Evidence_Wall
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--c-text-sub)',
                marginTop: '0.5rem',
              }}
            >
              INTERACTION: CLICK_EYE_TO_INSPECT
            </p>
          </div>

          <WallGrid>
            {fileList.map((file) => (
              <ImageContainer key={file.uid}>
                <Img src={file.url} />
                <Overlay className="overlay">
                  <ActionIcon
                    onClick={() => handlePreview(file)}
                    title="Inspect"
                  >
                    <Eye size={16} />
                  </ActionIcon>
                  <ActionIcon title="Delete">
                    <Trash2 size={16} />
                  </ActionIcon>
                </Overlay>
              </ImageContainer>
            ))}

            <UploadTrigger>
              <Plus size={24} />
              <span
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
              >
                UPLOAD
              </span>
            </UploadTrigger>
          </WallGrid>
        </Container>
      </Wrapper>

      {/* --- PREVIEW MODAL --- */}
      {previewFile && (
        <ModalOverlay
          onClick={(e) => {
            if (e.target === e.currentTarget) closePreview();
          }}
        >
          <FileInfoTag>
            FILE: {previewFile.name}
            <br />
            ZOOM: {Math.round(transform.scale * 100)}% | ROT: {transform.rotate}
            °
          </FileInfoTag>

          <CloseBtn onClick={closePreview}>
            <X size={24} />
          </CloseBtn>

          <PreviewImageWrapper
            $rotate={transform.rotate}
            $scale={transform.scale}
            $flipX={transform.flipX}
            $flipY={transform.flipY}
          >
            <img src={previewFile.url} alt="Preview" />
          </PreviewImageWrapper>

          <Toolbar onClick={(e) => e.stopPropagation()}>
            <ToolBtn onClick={handleFlipX} title="Flip Horizontal">
              <ArrowLeftRight size={18} />
            </ToolBtn>
            <ToolBtn onClick={handleFlipY} title="Flip Vertical">
              <ArrowUpDown size={18} />
            </ToolBtn>
            <div style={{ width: 1, background: '#cbd5e1', margin: '0 4px' }} />
            <ToolBtn onClick={() => handleRotate(-90)} title="Rotate Left">
              <RotateCcw size={18} />
            </ToolBtn>
            <ToolBtn onClick={() => handleRotate(90)} title="Rotate Right">
              <RotateCw size={18} />
            </ToolBtn>
            <div style={{ width: 1, background: '#cbd5e1', margin: '0 4px' }} />
            <ToolBtn onClick={() => handleZoom(-0.2)} title="Zoom Out">
              <ZoomOut size={18} />
            </ToolBtn>
            <ToolBtn onClick={() => handleZoom(0.2)} title="Zoom In">
              <ZoomIn size={18} />
            </ToolBtn>
          </Toolbar>
        </ModalOverlay>
      )}
    </>
  );
};

export default BlueprintUploadWithPreview;
