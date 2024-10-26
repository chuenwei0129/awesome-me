import React, { useEffect } from 'react';

const EventSourceComponent = () => {
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/events');

    eventSource.onopen = function () {
      console.log('Connection to server opened.');
    };

    eventSource.onmessage = (event) => {
      console.log('🚀 ~ useEffect ~ event:', event);
      const newMessage = JSON.parse(event.data);
      console.log('🚀 ~ useEffect ~ newMessage:', newMessage);
    };

    eventSource.addEventListener('custom', (e) => {
      console.log('🚀 ~ eventSource.addEventListener ~ e:', e);
    });

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <div></div>;
};

export default EventSourceComponent;
