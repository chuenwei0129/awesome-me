---
group:
  title: 术
title: Effect Event
toc: content
order: 1
---

在使用 React 编写项目时，我们应该把 `Event` 与 `Effect` 明确区分。然而，由于 `Effect` 的机制，我们可能会遇到在 `Effect` 中执行的逻辑并不依赖其中的状态的问题。

## 示例场景

假设我们有一段聊天室代码，当 `roomId` 变化时，必须重新连接到新的聊天室。这种情况下，聊天室的断开/重新连接是由 `roomId` 状态的变化触发的，非常明显属于 `Effect` 的范畴。如下代码所示：

```javascript
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId]);

  // ...
}
```

## 新需求：连接成功提示

现在，我们接到了一个新需求：当连接成功后，弹出一个「全局提醒」，而提醒的主题颜色取决于 `theme` 属性。修改后的 `useEffect` 代码如下：

```javascript
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();

  connection.on('connected', () => {
    showNotification('连接成功!', theme);
  });

  return () => connection.disconnect();
}, [roomId, theme]);
```

## 问题阐述

上面的代码存在一个严重问题：任何导致 `theme` 变化的情况都会导致聊天室重新连接。尽管 `Effect` 依赖于 `theme`，但它并不是由 `theme` 的变化而触发的，实际触发应该由 `roomId` 的变化引起。

## 代码实现

下面是完整的代码实现：

```jsx
import React, { useState, useEffect } from 'react';
import { message } from 'antd';

// 假设这个函数会创建一个与聊天室的连接
const createConnection = (roomId) => {
  return {
    connect: () => {
      message.info(`Connecting to room ${roomId}...`);
    },
    disconnect: () => {
      message.info(`Disconnecting from room ${roomId}...`);
    },
    on: (event, callback) => {
      if (event === 'connected') {
        // 模拟连接成功
        setTimeout(callback, 1000);
      }
    },
  };
};

// 假设这个函数会显示全局通知
const showNotification = (msg, theme) => {
  message.info(`[${theme.toUpperCase()}] ${msg}`);
};

// ChatRoom 组件
const ChatRoom = ({ roomId, theme }) => {
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
const App = () => {
  const [roomId, setRoomId] = useState('room1');
  const [theme, setTheme] = useState('light');

  const toggleRoom = () => {
    setRoomId(roomId === 'room1' ? 'room2' : 'room1');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <button onClick={toggleRoom}>切换房间</button>
      <button onClick={toggleTheme}>切换主题</button>
      <p>showNotification 主题为：{theme}</p>
      <ChatRoom roomId={roomId} theme={theme} />
    </div>
  );
};

// 渲染App
export default App;
```

## 解决方案：使用 `ahooks` 的 `useMemoizedFn`

为了避免 `theme` 变化导致聊天室重新连接的问题，我们可以使用 `ahooks` 提供的 `useMemoizedFn` 来包裹 `Effect` 事件：

```jsx
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useMemoizedFn } from 'ahooks';

// 假设这个函数会创建一个与聊天室的连接
const createConnection = (roomId) => {
  return {
    connect: () => {
      message.info(`Connecting to room ${roomId}...`);
    },
    disconnect: () => {
      message.info(`Disconnecting from room ${roomId}...`);
    },
    on: (event, callback) => {
      if (event === 'connected') {
        // 模拟连接成功
        setTimeout(callback, 1000);
      }
    },
  };
};

// 假设这个函数会显示全局通知
const showNotification = (msg, theme) => {
  message.info(`[${theme.toUpperCase()}] ${msg}`);
};

// ChatRoom 组件
const ChatRoom = ({ roomId, theme }) => {
  const onConnected = useMemoizedFn(() => {
    showNotification('连接成功!', theme);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    connection.on('connected', onConnected);

    return () => connection.disconnect();
  }, [roomId]);

  return (
    <div className="chat-room">
      <h2>Chat Room: {roomId}</h2>
    </div>
  );
};

// App组件
const App = () => {
  const [roomId, setRoomId] = useState('room1');
  const [theme, setTheme] = useState('light');

  const toggleRoom = () => {
    setRoomId(roomId === 'room1' ? 'room2' : 'room1');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <button onClick={toggleRoom}>切换房间</button>
      <button onClick={toggleTheme}>切换主题</button>
      <p>showNotification 主题为：{theme}</p>
      <ChatRoom roomId={roomId} theme={theme} />
    </div>
  );
};

// 渲染App
export default App;
```

## 注意事项

在使用 `useMemoizedFn` 时，我们需要注意其最好只在 `useEffect` 回调中执行，以避免滥用。更多详情可以参考 [一个新的React概念：Effect Event](https://zhuanlan.zhihu.com/p/643489789)。
