import React, { useState } from 'react';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import { 
  Plus, Image as ImageIcon, X, Eye, 
  Trash2, AlertCircle, FileWarning, Loader2 
} from 'lucide-react';

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
  font-family: var(--font-ui);
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

// --- The Grid Layout ---

const WallGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
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
  transition: all 0.2s;
  box-sizing: border-box;

  /* Engineering Markers in corners */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 4px; height: 4px;
    border: 1px solid var(--c-border-strong);
    opacity: 0;
    transition: opacity 0.2s;
  }
  &::before { top: -1px; left: -1px; border-right: none; border-bottom: none; }
  &::after { bottom: -1px; right: -1px; border-left: none; border-top: none; }

  &:hover::before, &:hover::after {
    opacity: 1;
  }
`;

// --- 1. Upload Trigger (The Dashed Box) ---

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

const TriggerLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
`;

// --- 2. Image Item (Completed) ---

const ImageContainer = styled(ItemBox)`
  padding: 4px; /* Inner whitespace frame */
  border: 1px solid var(--c-border);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(20%); /* Slight desaturation for engineering look */
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.85); /* Slate-900 with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.2s;
  
  /* Backdrop blur is usually disabled in this style, but simple overlay is fine */
`;

const ActionIcon = styled.button`
  background: none;
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 6px;
  cursor: pointer;
  display: flex;
  
  &:hover {
    background: white;
    color: var(--c-text-main);
    border-color: white;
  }
`;

// Wrap ImageContainer to handle hover
const CompletedItem = ({ file, onRemove }) => (
  <ImageContainer style={{ overflow: 'hidden' }}>
    <Img src={file.url} alt={file.name} />
    <Overlay className="overlay">
      <ActionIcon title="Preview">
        <Eye size={16} />
      </ActionIcon>
      <ActionIcon title="Remove" onClick={() => onRemove(file.uid)}>
        <Trash2 size={16} />
      </ActionIcon>
    </Overlay>
    {/* CSS to show overlay on hover */}
    <style>{`
      ${ImageContainer}:hover .overlay { opacity: 1; }
    `}</style>
  </ImageContainer>
);

// --- 3. Uploading State ---

const LoadingBarContainer = styled.div`
  width: 80%;
  height: 4px;
  background: #e2e8f0;
  margin-top: 8px;
  position: relative;
`;

const LoadingBarFill = styled.div`
  height: 100%;
  background: var(--c-border-strong);
  width: ${props => props.$percent}%;
  transition: width 0.3s ease;
`;

const StatusText = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--c-text-sub);
  margin-top: 8px;
`;

const UploadingItem = ({ percent }) => (
  <ItemBox style={{ background: '#f8fafc' }}>
    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>UPLOADING</div>
    <LoadingBarContainer>
      <LoadingBarFill $percent={percent} />
    </LoadingBarContainer>
    <StatusText>{percent}%_DONE</StatusText>
  </ItemBox>
);

// --- 4. Error State ---

const ErrorContainer = styled(ItemBox)`
  border: 1px solid var(--c-error);
  color: var(--c-error);
  background: #fff5f5;
  padding: 8px;
  text-align: center;
`;

const ErrorItem = ({ file, onRemove }) => (
  <ErrorContainer>
    <div style={{ position: 'absolute', top: 4, right: 4, cursor: 'pointer' }} onClick={() => onRemove(file.uid)}>
      <X size={14} />
    </div>
    <FileWarning size={24} style={{ marginBottom: 8 }} />
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', wordBreak: 'break-all', lineHeight: 1.2 }}>
      ERR_UPLOAD
    </div>
    <div style={{ fontSize: '0.6rem', marginTop: 4, opacity: 0.8 }}>
      {file.name}
    </div>
  </ErrorContainer>
);


// --- Main Component ---

const BlueprintUpload = () => {
  // Mock Data mimicking the user's image
  const [fileList, setFileList] = useState([
    {
      uid: '1',
      name: 'profile_01.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      uid: '2',
      name: 'profile_02.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', // reusing for demo
    },
    {
      uid: '3',
      name: 'profile_03.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      uid: '4',
      name: 'profile_04.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      uid: '5',
      name: 'data_chart.csv',
      status: 'uploading',
      percent: 45,
    },
    {
      uid: '6',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const handleRemove = (uid) => {
    setFileList(prev => prev.filter(item => item.uid !== uid));
  };

  const handleUpload = () => {
    // Simulate adding a new uploading file
    const newFile = {
      uid: Date.now().toString(),
      name: 'new_scan.jpg',
      status: 'uploading',
      percent: 0,
    };
    setFileList([...fileList, newFile]);

    // Simulate progress
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setFileList(prev => prev.map(f => f.uid === newFile.uid ? { ...f, percent: p } : f));
      if (p >= 100) {
        clearInterval(interval);
        setFileList(prev => prev.map(f => f.uid === newFile.uid ? { 
            ...f, 
            status: 'done', 
            url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' 
        } : f));
      }
    }, 500);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          
          <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--c-border-strong)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
              Evidence_Wall
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--c-text-sub)', marginTop: '0.5rem' }}>
              MODULE: UPLOAD_GRID // MAX_FILES: 8
            </p>
          </div>

          <WallGrid>
            {fileList.map(file => {
              if (file.status === 'uploading') {
                return <UploadingItem key={file.uid} percent={file.percent} />;
              }
              if (file.status === 'error') {
                return <ErrorItem key={file.uid} file={file} onRemove={handleRemove} />;
              }
              return <CompletedItem key={file.uid} file={file} onRemove={handleRemove} />;
            })}
            
            {/* The Upload Trigger Button */}
            <UploadTrigger onClick={handleUpload}>
              <Plus size={24} />
              <TriggerLabel>Upload</TriggerLabel>
            </UploadTrigger>
          </WallGrid>

          {/* Description Block mimicking the image text */}
          <div style={{ borderTop: '1px dashed var(--c-border)', paddingTop: '1.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Photo Wall</span>
                <ImageIcon size={14} className="text-slate-400"/>
             </div>
             <p style={{ color: 'var(--c-text-sub)', fontSize: '0.8rem', lineHeight: '1.6', maxWidth: '600px' }}>
               Users can upload images and display thumbnails in the list. When the number of uploaded photos reaches the limit, the upload button disappears.
               <br/>
               <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94a3b8' }}>
                 > SYS_MSG: SUPPORTS [PNG, JPG, TIFF]
               </span>
             </p>
          </div>

        </Container>
      </Wrapper>
    </>
  );
};

export default BlueprintUpload;
