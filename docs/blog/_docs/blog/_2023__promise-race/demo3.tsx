import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FetchRequestDemo: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setIsLoading(true);
    setData(null);
    setError(null);
    controllerRef.current = controller;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1?_delay=2000', { signal });

      if (!response.ok) {
        throw new Error('Failed to load data');
      }

      const result: ApiResponse = await response.json();
      setData(result);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Request canceled');
      } else {
        setError('Network error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-lg font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className={clsx('px-4 py-2 rounded-md text-white transition-colors duration-300', {
            'bg-indigo-600 hover:bg-indigo-700 cursor-not-allowed': isLoading,
            'bg-green-500 hover:bg-green-600': !isLoading,
          })}
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className={clsx('px-4 py-2 rounded-md text-white transition-colors duration-300', {
            'bg-gray-400 cursor-not-allowed': !isLoading,
            'bg-red-500 hover:bg-red-600': isLoading,
          })}
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default FetchRequestDemo;
