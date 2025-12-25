import {
  AudioWaveform,
  Disc,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react';
import React, { useState } from 'react';

const AudioPlayerBlueprint = () => {
  // State for interactive elements
  const [currentTrackIndex, setCurrentTrackIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [progress, setProgress] = useState(4.5); // % progress
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  // Track Data
  const tracks = [
    { id: 't0', title: 'II - 00', duration: '2:45' },
    { id: 't1', title: 'II - 01', duration: '3:24' },
    { id: 't2', title: 'II - 02', duration: '4:10' },
    { id: 't3', title: 'II - 03', duration: '3:05' },
  ];

  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="blueprint-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-border-dark: #94a3b8;
          --c-text-main: #0f172a;
          --c-text-sub: #64748b;
          --c-active: #0f172a;
          --font-ui: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .blueprint-wrapper {
          background-color: var(--c-bg);
          padding: 40px;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: var(--font-ui);
        }

        /* Main Container */
        .device-container {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          width: 700px;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .device-header {
          border-bottom: 1px solid var(--c-border);
          padding: 8px 16px;
          background: #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--c-text-main);
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-meta {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
        }

        /* Body Layout */
        .device-body {
          display: flex;
          height: 320px;
        }

        /* Sidebar: Playlist */
        .playlist-panel {
          width: 280px;
          border-right: 1px solid var(--c-border);
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          padding: 8px 12px;
          border-bottom: 1px solid var(--c-border);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          text-transform: uppercase;
          background: #fafafa;
        }

        .track-list {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .track-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid var(--c-bg);
          cursor: pointer;
          transition: all 0.1s;
        }

        .track-item:hover {
          background-color: #f1f5f9;
        }

        .track-item.active {
          background-color: #f8fafc;
          border-left: 3px solid var(--c-active);
        }

        .track-index {
          font-family: var(--font-mono);
          color: var(--c-text-sub);
          font-size: 12px;
          width: 24px;
          margin-right: 12px;
          text-align: right;
        }

        .track-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--c-text-main);
        }
        
        .track-icon {
          margin-right: 12px;
          width: 24px;
          display: flex;
          justify-content: center;
        }

        /* Main: Player Controls */
        .player-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          background-image: 
            linear-gradient(var(--c-bg) 1px, transparent 1px),
            linear-gradient(90deg, var(--c-bg) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center;
        }

        .player-content {
          width: 100%;
          max-width: 320px;
          background: var(--c-canvas);
          border: 1px solid var(--c-border);
          padding: 24px;
          position: relative;
          z-index: 2;
        }

        .track-display-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 24px;
          color: var(--c-text-main);
          letter-spacing: -0.5px;
        }

        /* Controls Row */
        .controls-row {
          display: flex;
          align-items: center;
          gap: 12px; /* Adjusted gap to fit new controls */
        }

        .btn-control {
          width: 40px;
          height: 40px;
          border: 1px solid var(--c-text-main);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--c-text-main);
          transition: background 0.1s;
          flex-shrink: 0;
        }

        .btn-control:hover {
          background: #f1f5f9;
        }

        .btn-control:active {
          background: var(--c-active);
          color: white;
        }

        .btn-settings {
          border: none;
          background: transparent;
          color: var(--c-text-sub);
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-settings:hover { color: var(--c-text-main); }
        .btn-settings.active { color: var(--c-text-main); background: #f1f5f9; }

        /* Time & Progress */
        .time-display {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--c-text-sub);
          min-width: 32px;
          text-align: center;
        }

        .progress-bar {
          flex: 1;
          height: 1px;
          background: var(--c-border);
          position: relative;
          display: flex;
          align-items: center;
          min-width: 60px;
        }

        .progress-fill {
          height: 2px;
          background: var(--c-text-main);
        }

        .progress-thumb {
          width: 8px;
          height: 8px;
          background: var(--c-text-main);
          border-radius: 0;
          margin-left: -4px;
        }
        
        .progress-ticks {
            position: absolute;
            top: -2px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            pointer-events: none;
        }
        .tick {
            width: 1px;
            height: 5px;
            background: var(--c-border);
        }

        /* Popovers Common */
        .popover-container {
            position: relative;
        }
        
        .popover-panel {
            position: absolute;
            bottom: 140%; 
            right: -10px;
            background: var(--c-canvas);
            border: 1px solid var(--c-border);
            z-index: 10;
            box-shadow: 4px 4px 0px rgba(0,0,0,0.05);
        }

        .popover-header {
            font-family: var(--font-mono);
            font-size: 9px;
            padding: 4px 8px;
            background: #f1f5f9;
            border-bottom: 1px solid var(--c-border);
            color: var(--c-text-sub);
            white-space: nowrap;
        }

        /* Speed Specific */
        .speed-popover { width: 100px; }
        
        .speed-item {
            font-family: var(--font-mono);
            font-size: 11px;
            padding: 6px 12px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            color: var(--c-text-sub);
        }
        .speed-item:hover { background: #f8fafc; color: var(--c-text-main); }
        .speed-item.active { background: var(--c-text-main); color: white; }

        /* Volume Specific */
        .volume-popover {
            width: 40px;
            height: 140px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .volume-track-container {
            flex: 1;
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 12px 0;
        }
        
        .volume-track {
            width: 4px;
            height: 100%;
            background: #f1f5f9;
            border: 1px solid var(--c-border);
            position: relative;
            display: flex;
            flex-direction: column-reverse; /* Bottom up */
        }

        .volume-fill {
            width: 100%;
            background: var(--c-text-main);
        }

        .volume-handle {
            width: 12px;
            height: 6px;
            background: var(--c-text-main);
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0; /* Dynamic via inline style */
            cursor: pointer;
            border: 1px solid var(--c-canvas);
        }

        .volume-footer {
            border-top: 1px solid var(--c-border);
            width: 100%;
            padding: 4px;
            display: flex;
            justify-content: center;
        }
        
        .volume-val-text {
            font-family: var(--font-mono);
            font-size: 9px;
            color: var(--c-text-main);
        }

      `}</style>

      <div className="device-container">
        {/* Top Header */}
        <div className="device-header">
          <div className="header-label">
            <AudioWaveform size={14} />
            AUDIO_MODULE_V2
          </div>
          <div className="header-meta">
            STATUS: {isPlaying ? 'RUNNING' : 'IDLE'} | OUT:{' '}
            {isMuted ? 'MUTED' : `${volume}%`}
          </div>
        </div>

        {/* Main Body */}
        <div className="device-body">
          {/* Playlist Sidebar */}
          <div className="playlist-panel">
            <div className="panel-header">Directory: /vol/music/II</div>
            <div className="track-list">
              {tracks.map((track, idx) => {
                const isActive = idx === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    className={`track-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleTrackSelect(idx)}
                  >
                    <div className="track-index">
                      {isActive && isPlaying ? (
                        <Play size={10} fill="currentColor" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    {isActive && (
                      <div className="track-icon">
                        <Disc size={14} className={isPlaying ? 'spin' : ''} />
                      </div>
                    )}
                    <span
                      className="track-title"
                      style={{ fontWeight: isActive ? 600 : 400 }}
                    >
                      {track.title}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Sidebar Footer */}
            <div
              style={{
                height: '4px',
                background: '#f1f5f9',
                borderTop: '1px solid #cbd5e1',
                marginTop: 'auto',
              }}
            ></div>
          </div>

          {/* Player Main Area */}
          <div className="player-panel">
            {/* The Player Card */}
            <div className="player-content">
              {/* Track Title */}
              <div className="track-display-title">
                {currentTrackIndex !== null
                  ? tracks[currentTrackIndex].title
                  : 'NO_MEDIA_LOADED'}
              </div>

              {/* Controls */}
              <div className="controls-row">
                {/* Play/Pause Button */}
                <button className="btn-control" onClick={togglePlay}>
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" strokeWidth={0} />
                  ) : (
                    <Play size={18} fill="currentColor" strokeWidth={0} />
                  )}
                </button>

                {/* Time Start */}
                <span className="time-display">0:09</span>

                {/* Scrubber */}
                <div className="progress-bar">
                  <div className="progress-ticks">
                    <div className="tick"></div>
                    <div className="tick"></div>
                    <div className="tick"></div>
                  </div>
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <div className="progress-thumb"></div>
                </div>

                {/* Time End */}
                <span className="time-display">
                  {currentTrackIndex !== null
                    ? tracks[currentTrackIndex].duration
                    : '--:--'}
                </span>

                {/* Separator Line */}
                <div
                  style={{
                    width: '1px',
                    height: '16px',
                    background: '#e2e8f0',
                  }}
                ></div>

                {/* Volume Control */}
                <div className="popover-container">
                  {showVolumeMenu && (
                    <div className="popover-panel volume-popover">
                      <div className="popover-header">GAIN</div>
                      <div className="volume-track-container">
                        <div
                          className="volume-track"
                          onClick={(e) => {
                            // Simple mock logic for setting volume by clicking track
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            const percent =
                              100 -
                              ((e.clientY - rect.top) / rect.height) * 100;
                            const newVol = Math.max(0, Math.min(100, percent));
                            setVolume(Math.round(newVol));
                            setIsMuted(false);
                          }}
                        >
                          <div
                            className="volume-fill"
                            style={{ height: isMuted ? '0%' : `${volume}%` }}
                          ></div>
                          <div
                            className="volume-handle"
                            style={{ bottom: isMuted ? '0%' : `${volume}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="volume-footer">
                        <span className="volume-val-text">
                          {isMuted ? 'OFF' : volume}
                        </span>
                      </div>
                    </div>
                  )}
                  <button
                    className={`btn-settings ${showVolumeMenu ? 'active' : ''}`}
                    onClick={() => setShowVolumeMenu(!showVolumeMenu)}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={18} />
                    ) : (
                      <Volume2 size={18} />
                    )}
                  </button>
                </div>

                {/* Settings & Speed Control */}
                <div className="popover-container">
                  {showSpeedMenu && (
                    <div className="popover-panel speed-popover">
                      <div className="popover-header">SPEED_CTRL</div>
                      {speeds.map((s) => (
                        <div
                          key={s}
                          className={`speed-item ${
                            playbackSpeed === s ? 'active' : ''
                          }`}
                          onClick={() => {
                            setPlaybackSpeed(s);
                            setShowSpeedMenu(false);
                          }}
                        >
                          <span>{s}x</span>
                          {s === 1.0 && <span>DEF</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    className="btn-settings"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  >
                    <Settings size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Architectural decorative label */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                fontFamily: 'JetBrains Mono',
                fontSize: '9px',
                color: '#94a3b8',
              }}
            >
              COMPONENT_ID: PLAYER_01_REV_B
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerBlueprint;
