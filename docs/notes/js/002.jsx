import {
  AtSign,
  MessageSquare,
  MoreHorizontal,
  Send,
  Smile,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import React, { useState } from 'react';

/**
 * CSS Definitions: Flat Engineering Blueprint Style
 */
const styles = `
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --c-accent: #0f172a;
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 2rem;
  font-family: var(--font-ui);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.comment-system {
  width: 100%;
  max-width: 800px;
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
}

/* --- Header --- */
.sys-header {
  padding: 1.5rem 2rem;
  border-bottom: 2px solid var(--c-text-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.sys-title {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.25rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sys-filters {
  display: flex;
  gap: 1rem;
}

.filter-btn {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 0;
}
.filter-btn.active {
  color: var(--c-text-main);
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

/* --- Input Terminal --- */
.input-terminal {
  padding: 2rem;
  border-bottom: 1px solid var(--c-border);
  background: #f8fafc;
}

.input-box-wrapper {
  border: 1px solid var(--c-border);
  background: white;
  display: flex;
  flex-direction: column;
}

.input-header {
  background: #f1f5f9;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--c-border);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-sub);
  display: flex;
  justify-content: space-between;
}

.input-area {
  width: 100%;
  min-height: 80px;
  padding: 1rem;
  border: none;
  font-family: var(--font-ui);
  font-size: 0.9rem;
  resize: vertical;
  outline: none;
  color: var(--c-text-main);
}

.input-footer {
  padding: 0.5rem 1rem;
  border-top: 1px dashed var(--c-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-btn {
  background: none;
  border: 1px solid transparent;
  padding: 4px;
  cursor: pointer;
  color: var(--c-text-sub);
  display: flex;
  align-items: center;
}
.tool-btn:hover {
  border-color: var(--c-border);
  background: #f8fafc;
  color: var(--c-text-main);
}

.submit-btn {
  background: var(--c-text-main);
  color: white;
  border: 1px solid var(--c-text-main);
  padding: 0.4rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}
.submit-btn:hover {
  background: white;
  color: var(--c-text-main);
}

/* --- Comment Feed --- */
.feed-container {
  padding: 2rem;
}

/* Comment Node */
.comment-node {
  position: relative;
  margin-bottom: 2rem;
}

/* The vertical connector line for children */
.thread-line {
  position: absolute;
  top: 40px; 
  left: 20px; 
  bottom: 0;
  width: 1px;
  background: var(--c-border);
  z-index: 0;
}

.comment-main {
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 1; /* Above thread line */
}

/* Avatar Block */
.user-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.avatar-frame {
  width: 40px;
  height: 40px;
  border: 1px solid var(--c-text-main);
  padding: 2px;
  background: white;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%); /* Blueprint style */
  transition: filter 0.2s;
}
.comment-node:hover .avatar-img {
  filter: grayscale(0%);
}

/* Content Block */
.content-block {
  flex: 1;
}

.meta-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.user-name {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--c-text-main);
}

.user-badge {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  border: 1px solid var(--c-border);
  padding: 0 4px;
  color: var(--c-text-sub);
}
.badge-admin { border-color: #ef4444; color: #ef4444; }

.time-stamp {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  margin-left: auto;
}

.comment-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 0.75rem;
}

/* Action Bar */
.action-bar {
  display: flex;
  gap: 1rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  background: none;
  border: none;
  cursor: pointer;
}
.action-item:hover {
  color: var(--c-text-main);
  text-decoration: underline;
}

/* --- Reply Section (Children) --- */
.reply-list {
  margin-top: 1.5rem;
  margin-left: 20px; /* Offset for hierarchy */
  padding-left: 2rem;
  position: relative;
}

/* Connector for reply item */
.reply-connector {
  position: absolute;
  top: 20px; /* Align with avatar center roughly */
  left: 0;
  width: 2rem;
  height: 1px;
  background: var(--c-border);
}
/* Corner for the first item if needed, simpler to just do horizontal lines from the main vertical thread */

`;

// Mock Data
const COMMENTS = [
  {
    id: 1,
    user: {
      name: '無心散卓笔',
      avatar: 'https://placehold.co/100x100/e2e8f0/475569?text=USR',
      level: 16,
      badge: 'LIVE',
    },
    content: '怎么自己发直播切片了？',
    time: '2025-12-10 17:32',
    likes: 5,
    replies: [
      {
        id: 2,
        user: {
          name: 'I_am_Cloud',
          avatar: 'https://placehold.co/100x100/e2e8f0/475569?text=CLD',
          level: 8,
          badge: 'ADMIN',
        },
        content: '一直都有。',
        time: '2025-12-10 19:58',
        likes: 1,
      },
      {
        id: 3,
        user: {
          name: '退役仓鼠1014',
          avatar: 'https://placehold.co/100x100/e2e8f0/475569?text=HAM',
          level: 12,
        },
        content: '？ 你在说你看得谁啊 😂 奶姐一直有发',
        time: '2025-12-10 22:48',
        likes: 0,
      },
    ],
  },
];

const CommentItem = ({ data, isReply = false }) => {
  return (
    <div className="comment-node">
      {/* If it's a root comment and has children, show vertical thread line */}
      {!isReply && data.replies && <div className="thread-line" />}

      {/* Visual connector for reply items */}
      {isReply && <div className="reply-connector" />}

      <div className="comment-main">
        {/* Avatar */}
        <div className="user-block">
          <div className="avatar-frame">
            <img src={data.user.avatar} alt="avatar" className="avatar-img" />
          </div>
        </div>

        {/* Body */}
        <div className="content-block">
          <div className="meta-row">
            <span className="user-name">{data.user.name}</span>
            <span className="user-badge">[LVL:{data.user.level}]</span>
            {data.user.badge && (
              <span
                className={`user-badge ${
                  data.user.badge === 'ADMIN' ? 'badge-admin' : ''
                }`}
              >
                [{data.user.badge}]
              </span>
            )}
            <span className="time-stamp">{data.time}</span>
          </div>

          <div className="comment-text">{data.content}</div>

          <div className="action-bar">
            <button className="action-item">
              <ThumbsUp size={14} /> {data.likes || 'LIKE'}
            </button>
            <button className="action-item">
              <ThumbsDown size={14} /> DISLIKE
            </button>
            <button className="action-item">REPLY</button>
            <button className="action-item" style={{ marginLeft: 'auto' }}>
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Render Replies */}
      {data.replies && (
        <div className="reply-list">
          {data.replies.map((reply) => (
            <CommentItem key={reply.id} data={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function BlueprintComments() {
  const [inputText, setInputText] = useState('');

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-container">
        <div className="comment-system">
          {/* Header */}
          <header className="sys-header">
            <div className="sys-title">
              <MessageSquare size={20} strokeWidth={2.5} />
              <span>SYS_LOGS // {COMMENTS.length + 2}</span>
            </div>
            <div className="sys-filters">
              <button className="filter-btn active">HOT_TOPICS</button>
              <button className="filter-btn">NEWEST</button>
            </div>
          </header>

          {/* Input Area */}
          <div className="input-terminal">
            <div className="input-box-wrapper">
              <div className="input-header">
                <span>MODE: INPUT_STREAM</span>
                <span>CHAR: {inputText.length} / 500</span>
              </div>
              <textarea
                className="input-area"
                placeholder=">> Enter your analysis here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="input-footer">
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="tool-btn">
                    <Smile size={16} />
                  </button>
                  <button className="tool-btn">
                    <AtSign size={16} />
                  </button>
                </div>
                <button className="submit-btn">
                  TRANSMIT{' '}
                  <Send
                    size={12}
                    style={{ display: 'inline', marginLeft: 6 }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="feed-container">
            {COMMENTS.map((c) => (
              <CommentItem key={c.id} data={c} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
