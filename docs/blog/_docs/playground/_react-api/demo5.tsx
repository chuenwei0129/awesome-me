import React, { useState, useEffect } from 'react';
import { message } from 'antd'

// 假设这个函数会创建一个与聊天室的连接
const createConnection = (roomId: string) => {
  return {
    connect: () => {
      message.info(`Connecting to room ${roomId}...`);
    },
    disconnect: () => {
      message.info(`Disconnecting from room ${roomId}...`);
    },
    on: (event: string, callback: () => void) => {
      if (event === 'connected') {
        // 模拟连接成功
        setTimeout(callback, 1000);
      }
    }
  };
};

// 假设这个函数会显示全局通知
const showNotification = (msg: string, theme: string) => {
  message.info(`[${theme.toUpperCase()}] ${msg}`);
};

// ChatRoom 组件
const ChatRoom: React.FC<{ roomId: string; theme: string }> = ({ roomId, theme }) => {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    connection.on('connected', () => {
      showNotification('连接成功!', theme);
    });

    return () => connection.disconnect();
  }, [roomId, theme]);

  return (
    <div className="chat-room">
      <h2>Chat Room: {roomId}</h2>
    </div>
  );
};

// App组件
const App: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('room1');
  const [theme, setTheme] = useState<string>('light');

  const toggleRoom = () => {
    setRoomId(roomId === 'room1' ? 'room2' : 'room1');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <button onClick={toggleRoom}>切换房间</button>
      <button onClick={toggleTheme}>切换主题</button>
      <p>showNotification 主题为：{theme}</p>
      <ChatRoom roomId={roomId} theme={theme} />
    </div>
  );
};

// 渲染App
export default App
