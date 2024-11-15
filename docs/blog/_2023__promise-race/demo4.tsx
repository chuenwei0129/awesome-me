import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const AxiosRequestDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    const controller = new AbortController();

    setIsLoading(true);
    setData(null);
    setError(null);
    controllerRef.current = controller;

    try {
      const response = await axios.get<ApiResponse>('https://jsonplaceholder.typicode.com/posts/1?_delay=2000', {
        signal: controller.signal,
      });

      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
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
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-2xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className={twMerge(
            'px-4 py-2 rounded',
            clsx({
              'bg-blue-500 text-white': true,
              'opacity-50 cursor-not-allowed': isLoading,
            }),
          )}
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className={twMerge(
            'px-4 py-2 rounded',
            clsx({
              'bg-red-500 text-white': true,
              'opacity-50 cursor-not-allowed': !isLoading,
            }),
          )}
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default AxiosRequestDemo;
