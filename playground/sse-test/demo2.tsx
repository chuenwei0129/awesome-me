import React, { useEffect, useRef, useState } from 'react';

const EventSourceComponent = () => {
  const [messages, setMessages] = useState<{ message: string }[]>([]);
  const retry = useRef<number>(0);
  const lastEventId = useRef<string>('0');

  useEffect(() => {
    let eventSource: EventSource;
    const connect = () => {
      eventSource = new EventSource(
        `http://localhost:3000/events?Last-Event-ID=${lastEventId.current}`,
      );

      eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        lastEventId.current = event.lastEventId;
      };

      eventSource.onerror = (error) => {
        eventSource.close();
        console.error('EventSource failed:', error);
        // 实现自定义的重连逻辑
        if (++retry.current <= 5) {
          setTimeout(() => {
            console.log('Attempting to reconnect...');
            connect(); // 重新连接
          }, 5000); // 5秒后尝试重连
        }
      };
    };
    connect(); // 建立连接
    return () => eventSource.close(); // 清理函数，组件卸载时断开连接
  }, []);

  return (
    <div>
      <h2>Messages server:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventSourceComponent;
