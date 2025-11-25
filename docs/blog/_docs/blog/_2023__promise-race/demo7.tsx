import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const RequestWithUniqueIdDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const fetchData = async () => {
    const newRequestId = requestIdRef.current + 1;
    requestIdRef.current = newRequestId;

    setIsLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1?_delay=2000');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: ApiResponse = await response.json();

      if (newRequestId === requestIdRef.current) {
        setData(responseData);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      if (newRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const cancelRequest = () => {
    requestIdRef.current += 1;
    setIsLoading(false);
    setError('Request canceled');
  };

  useEffect(() => {
    fetchData();

    return () => {
      requestIdRef.current += 1;
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
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
          className={twMerge(clsx('px-4 py-2 rounded', isLoading ? 'bg-blue-300 text-gray-500' : 'bg-blue-500 text-white'))}
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className={twMerge(clsx('px-4 py-2 rounded', !isLoading ? 'bg-red-300 text-gray-500' : 'bg-red-500 text-white'))}
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default RequestWithUniqueIdDemo;
