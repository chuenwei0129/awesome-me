import React, { useState } from 'react';

const EventSourceComponent = () => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [connected, setConnected] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const startSSE = () => {
    if (eventSource) {
      eventSource.close();
    }

    const newEventSource = new EventSource('http://localhost:3000/events');

    newEventSource.onopen = () => {
      setConnected(true);
      console.log('Connection to server opened.');
    };

    newEventSource.onmessage = async (event) => {
      const newMessage = JSON.parse(event.data);
      try {
        const response = await fetch(
          `http://localhost:3000/images/${newMessage.imageId}`,
        );
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImages((prevImages) => [...prevImages, imageUrl]);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    newEventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      if (newEventSource.readyState === EventSource.CLOSED) {
        setConnected(false);
        console.log('Connection closed by server.');
      }
    };

    setEventSource(newEventSource);
  };

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={startSSE}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start SSE
      </button>
      <p className="mt-2">
        SSE Status: {connected ? 'Connected' : 'Disconnected'}
      </p>
      <div className="mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className="mb-2"
          />
        ))}
      </div>
    </div>
  );
};

export default EventSourceComponent;
