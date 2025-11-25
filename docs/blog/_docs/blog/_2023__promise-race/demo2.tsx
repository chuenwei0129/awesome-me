import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const XHRRequestDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const fetchData = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setData(JSON.parse(xhr.responseText));
        setError(null);
      } else {
        setError('Failed to load data');
      }
      setIsLoading(false);
    };

    xhr.onerror = () => {
      setError('Network error');
      setIsLoading(false);
    };

    setIsLoading(true);
    setData(null);
    setError(null);

    xhr.send();
    xhrRef.current = xhr;
  };

  const cancelRequest = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      setIsLoading(false);
      setError('Request canceled');
      xhrRef.current = null;
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (xhrRef.current) {
        xhrRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className={twMerge(clsx('px-4 py-2 bg-blue-500 text-white rounded', { 'opacity-50': isLoading }))}
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className={twMerge(clsx('px-4 py-2 bg-red-500 text-white rounded', { 'opacity-50': !isLoading }))}
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default XHRRequestDemo;
