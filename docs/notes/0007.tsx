import { Battery, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

// --- 1. 配置与样式系统 (Design Tokens) ---
const THEME = {
  bg: '#e2e8f0', // 桌面背景
  body: '#f1f5f9', // 机身背景
  lcd: '#ffffff', // 屏幕背景
  border: '#1e293b', // 工程深灰 (Slate-800)
  textMain: '#0f172a', // 主黑
  textSub: '#64748b', // 标注灰
  highlight: '#0f172a', // 高亮色
  fontUi: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontMono: "'JetBrains Mono', 'Consolas', monospace", // 核心：等宽字体
};

// --- 2. 真实数据源 (Real Data) ---
// 使用了 Kevin MacLeod 的开源音乐作为演示，保证可以真实播放
const TRACKS = [
  {
    id: 'TRK_001',
    title: 'Impact Moderato',
    artist: 'Kevin MacLeod',
    album: 'YouTube Audio Library',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Impact%20Moderato.mp3',
    cover:
      'https://images.unsplash.com/photo-1459749411177-0473ef716e71?q=80&w=400&auto=format&fit=crop',
    // 模拟 LRC 歌词格式
    lrc: `
      [00:00.00]LOADING SYSTEM...
      [00:05.00]INITIATING AUDIO SEQUENCE
      [00:10.00]Impact Moderato - Kevin MacLeod
      [00:15.00]这是一个紧张的时刻
      [00:20.00]数据流正在汇聚
      [00:25.00]所有系统运行正常
      [00:30.00]>> CPU USAGE: 12%
      [00:35.00]>> MEMORY: OPTIMAL
      [00:40.00]感觉到节奏了吗？
      [00:45.00]就像机械的心跳
      [00:50.00]保持专注，保持冷静
      [01:00.00]END OF SEQUENCE
    `,
  },
  {
    id: 'TRK_002',
    title: 'Crimson Fly',
    artist: 'Huma-Huma',
    album: 'Atmosphere Vol.4',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover:
      'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=400&auto=format&fit=crop',
    lrc: `
      [00:00.00]SoundHelix Song 1
      [00:05.00]开始播放测试音频
      [00:10.00]Searching for signal...
      [00:15.00]Signal found.
      [00:20.00]节奏开始加快
      [00:25.00]Let's go.
      [00:30.00]Feel the vibe.
      [00:40.00]Instrumental Break
      [01:00.00]循环测试...
    `,
  },
  {
    id: 'TRK_003',
    title: 'Digital Solitude',
    artist: 'Tech_Construct',
    album: 'Cyber Dreams',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
    lrc: `
      [00:00.00]Connect...
      [00:08.00]我们生活在网格之中
      [00:16.00]每一个像素都是孤独的
      [00:24.00]但在代码深处
      [00:32.00]我们紧紧相连
      [00:40.00]Digital Love.
    `,
  },
];

// --- 3. 工具函数 ---
const parseLRC = (lrcString) => {
  if (!lrcString) return [];
  const lines = lrcString.split('\n');
  const result = [];
  const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  lines.forEach((line) => {
    const match = timeExp.exec(line);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      const time = minutes * 60 + seconds + milliseconds / 1000;
      const text = line.replace(timeExp, '').trim();
      if (text) result.push({ time, text });
    }
  });
  return result;
};

const formatTime = (time) => {
  if (isNaN(time)) return '00:00';
  const m = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

// --- 4. 主组件 ---
const CompletePlayer = () => {
  // --- States ---
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  // View: 'LIST' | 'COVER' | 'LYRICS'
  const [viewMode, setViewMode] = useState('COVER');

  // Refs
  const audioRef = useRef(null);
  const lyricsBoxRef = useRef(null);

  const currentTrack = TRACKS[trackIndex];
  // 使用 useMemo 缓存解析后的歌词，避免重复计算
  const parsedLyrics = useMemo(
    () => parseLRC(currentTrack.lrc),
    [currentTrack],
  );

  // --- Audio Logic ---
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying)
        audioRef.current
          .play()
          .catch((e) => console.warn('Auto-play blocked', e));
      else audioRef.current.pause();
    }
  }, [isPlaying, trackIndex]);

  useEffect(() => {
    // 切歌时重置时间
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [trackIndex]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);

    // 歌词滚动逻辑
    if (viewMode === 'LYRICS') {
      const activeIdx =
        parsedLyrics.findIndex((l) => l.time > audio.currentTime) - 1;
      if (activeIdx >= 0 && lyricsBoxRef.current) {
        const activeNode = lyricsBoxRef.current.children[activeIdx];
        if (activeNode) {
          activeNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changeTrack = (dir) => {
    let newIdx = trackIndex + dir;
    if (newIdx < 0) newIdx = TRACKS.length - 1;
    if (newIdx >= TRACKS.length) newIdx = 0;
    setTrackIndex(newIdx);
    setIsPlaying(true);
  };

  // --- Control Logic (The Wheel) ---
  const handleMenuClick = () => {
    // 类似 iPod: Menu 键通常用于返回上一级，这里简单处理为回到列表
    setViewMode('LIST');
  };

  const handleCenterClick = () => {
    if (viewMode === 'LIST') {
      // 列表模式：选中并播放，进入封面
      setIsPlaying(true);
      setViewMode('COVER');
    } else {
      // 播放模式：在封面和歌词间切换
      setViewMode(viewMode === 'COVER' ? 'LYRICS' : 'COVER');
    }
  };

  // --- Sub-Renderers ---

  // 1. 列表视图
  const renderList = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          padding: '6px 8px',
          background: THEME.textMain,
          color: '#fff',
          fontSize: '0.7rem',
          fontFamily: THEME.fontMono,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>ROOT/DATABASE</span>
        <span>{TRACKS.length} FILES</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {TRACKS.map((t, i) => (
          <div
            key={i}
            onClick={() => {
              setTrackIndex(i);
              setIsPlaying(true);
              setViewMode('COVER');
            }}
            style={{
              padding: '10px',
              borderBottom: `1px dotted ${THEME.border}`,
              background: i === trackIndex ? THEME.textMain : 'transparent',
              color: i === trackIndex ? '#fff' : THEME.textMain,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                {t.title}
              </span>
              <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                {t.artist}
              </span>
            </div>
            {i === trackIndex && <Play size={12} fill="#fff" />}
          </div>
        ))}
      </div>
    </div>
  );

  // 2. 封面视图
  const renderCover = () => (
    <div
      style={{
        display: 'flex',
        height: '100%',
        padding: '16px',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      {/* 左侧封面：黑白工程风 */}
      <div
        style={{
          width: '130px',
          height: '130px',
          border: `2px solid ${THEME.textMain}`,
          padding: '3px',
          background: '#fff',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <img
          src={currentTrack.cover}
          alt="art"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%) contrast(120%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: -2,
            background: THEME.lcd,
            padding: '0 4px',
            fontSize: '0.6rem',
            fontFamily: THEME.fontMono,
          }}
        >
          FIG 1.0
        </div>

        {/* 模拟旋转 CD 效果 (仅在播放时) */}
        {isPlaying && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: `2px solid #fff`,
              boxShadow: '0 0 0 2px rgba(0,0,0,0.5)',
            }}
          />
        )}
      </div>

      {/* 右侧信息 */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: '0.6rem',
            color: THEME.textSub,
            marginBottom: 4,
          }}
        >
          ID: {currentTrack.id}
        </div>
        <div
          style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {currentTrack.title}
        </div>
        <div
          style={{
            fontSize: '0.85rem',
            color: THEME.textSub,
            borderBottom: `1px solid ${THEME.textSub}`,
            paddingBottom: 8,
            marginBottom: 8,
          }}
        >
          {currentTrack.artist}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            fontFamily: THEME.fontMono,
            color: THEME.textMain,
          }}
        >
          ALBUM: <br />
          {currentTrack.album}
        </div>
      </div>
    </div>
  );

  // 3. 歌词视图
  const renderLyrics = () => (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '4px',
          fontSize: '0.6rem',
          fontFamily: THEME.fontMono,
          border: `1px solid ${THEME.border}`,
          background: '#fff',
          zIndex: 10,
        }}
      >
        LYRIC_STREAM
      </div>

      <div
        ref={lyricsBoxRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '40px 20px',
          textAlign: 'center',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          scrollbarWidth: 'none',
        }}
      >
        {parsedLyrics.length > 0 ? (
          parsedLyrics.map((line, i) => {
            const isActive =
              currentTime >= line.time &&
              (!parsedLyrics[i + 1] || currentTime < parsedLyrics[i + 1].time);
            return (
              <div
                key={i}
                style={{
                  padding: '8px 0',
                  fontSize: isActive ? '0.95rem' : '0.8rem',
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? THEME.textMain : '#cbd5e1',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  fontFamily: isActive ? 'inherit' : THEME.fontMono, // 高亮行用 UI 字体，其他用等宽
                }}
              >
                {line.text}
              </div>
            );
          })
        ) : (
          <div
            style={{ marginTop: 60, color: THEME.textSub, fontSize: '0.8rem' }}
          >
            NO_DATA_STREAM
          </div>
        )}
      </div>
    </div>
  );

  // --- Styles ---
  const s = {
    wrapper: {
      minHeight: '100vh',
      background: THEME.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: THEME.fontUi,
      color: THEME.textMain,
    },
    device: {
      width: '340px',
      height: '580px',
      background: THEME.body,
      border: `2px solid ${THEME.border}`,
      borderRadius: '4px',
      padding: '24px',
      boxShadow: '20px 20px 0 rgba(0,0,0,0.1)', // 硬投影
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    screenContainer: {
      height: '240px',
      width: '100%',
      background: THEME.lcd,
      border: `2px solid ${THEME.border}`,
      marginBottom: '32px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    },
    statusBar: {
      height: '22px',
      borderBottom: `1px solid ${THEME.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 6px',
      fontSize: '0.65rem',
      fontFamily: THEME.fontMono,
      background: '#f8fafc',
    },
    wheelSection: {
      flex: 1,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // The Engineering Click Wheel
    wheel: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      border: `2px solid ${THEME.border}`,
      background: '#fff',
      position: 'relative',
      cursor: 'pointer',
      // 构造线背景
      backgroundImage: `
            linear-gradient(${THEME.border} 1px, transparent 1px),
            linear-gradient(90deg, ${THEME.border} 1px, transparent 1px)
        `,
      backgroundSize: '100% 1px, 1px 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
    },
    btnLabel: {
      position: 'absolute',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      color: THEME.textSub,
      pointerEvents: 'none',
    },
    centerBtn: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: '#fff',
      border: `2px solid ${THEME.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      boxShadow: '0 0 0 4px #f1f5f9', // Spacing ring
    },
  };

  return (
    <div style={s.wrapper}>
      {/* The Audio Engine */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={() => changeTrack(1)}
      />

      <div style={s.device}>
        {/* Label */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 24,
            fontSize: '0.55rem',
            fontFamily: THEME.fontMono,
            color: THEME.textSub,
          }}
        >
          MODEL: ENG_POD_V3 // SERIAL: 8900-X
        </div>

        {/* --- SCREEN --- */}
        <div style={s.screenContainer}>
          {/* Status Bar */}
          <div style={s.statusBar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {isPlaying ? (
                <Play size={10} fill={THEME.textMain} />
              ) : (
                <Pause size={10} fill={THEME.textMain} />
              )}
              <span>{viewMode}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.6rem' }}>
                VOL {Math.round(volume * 100)}
              </span>
              <Battery size={12} />
            </div>
          </div>

          {/* Viewport */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            {viewMode === 'LIST' && renderList()}
            {viewMode === 'COVER' && renderCover()}
            {viewMode === 'LYRICS' && renderLyrics()}
          </div>

          {/* Progress Bar (Always visible in non-list mode) */}
          {viewMode !== 'LIST' && (
            <div
              style={{
                height: '18px',
                borderTop: `1px solid ${THEME.border}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                gap: 8,
                background: '#f8fafc',
              }}
            >
              <span
                style={{
                  fontSize: '0.6rem',
                  fontFamily: THEME.fontMono,
                  minWidth: 30,
                }}
              >
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="eng-slider"
                style={{
                  flex: 1,
                  height: '4px',
                  appearance: 'none',
                  background: '#e2e8f0',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 0,
                }}
              />
              <span
                style={{
                  fontSize: '0.6rem',
                  fontFamily: THEME.fontMono,
                  minWidth: 30,
                }}
              >
                -{formatTime(duration - currentTime)}
              </span>
            </div>
          )}
        </div>

        {/* --- CLICK WHEEL --- */}
        <div style={s.wheelSection}>
          {/* Labels outside wheel */}
          <div style={{ ...s.btnLabel, top: -20 }}>MENU</div>
          <div style={{ ...s.btnLabel, bottom: -20 }}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </div>
          <div style={{ ...s.btnLabel, left: -20 }}>
            <SkipBack size={14} />
          </div>
          <div style={{ ...s.btnLabel, right: -20 }}>
            <SkipForward size={14} />
          </div>

          <div style={s.wheel}>
            {/* Invisible Click Zones */}
            {/* MENU (TOP) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '25%',
                width: '50%',
                height: '30%',
                cursor: 'pointer',
                zIndex: 5,
              }}
              onClick={handleMenuClick}
              title="Menu"
            />

            {/* PLAY (BOTTOM) */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '25%',
                width: '50%',
                height: '30%',
                cursor: 'pointer',
                zIndex: 5,
              }}
              onClick={() => setIsPlaying(!isPlaying)}
              title="Play/Pause"
            />

            {/* PREV (LEFT) */}
            <div
              style={{
                position: 'absolute',
                top: '25%',
                left: 0,
                width: '30%',
                height: '50%',
                cursor: 'pointer',
                zIndex: 5,
              }}
              onClick={() => changeTrack(-1)}
              title="Prev"
            />

            {/* NEXT (RIGHT) */}
            <div
              style={{
                position: 'absolute',
                top: '25%',
                right: 0,
                width: '30%',
                height: '50%',
                cursor: 'pointer',
                zIndex: 5,
              }}
              onClick={() => changeTrack(1)}
              title="Next"
            />

            {/* CENTER BUTTON */}
            <div
              style={s.centerBtn}
              onClick={handleCenterClick}
              title="Select/Switch View"
            >
              <div
                style={{
                  width: '30%',
                  height: '30%',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Volume Hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            width: '100%',
            left: 0,
            textAlign: 'center',
          }}
        >
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{
              width: '60px',
              height: '2px',
              accentColor: THEME.textMain,
            }}
            title="System Volume"
          />
        </div>
      </div>

      {/* CSS for custom range input */}
      <style>{`
            .eng-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 8px; height: 12px; background: ${THEME.textMain}; border: 1px solid #fff; cursor: pointer;
            }
        `}</style>
    </div>
  );
};

export default CompletePlayer;
