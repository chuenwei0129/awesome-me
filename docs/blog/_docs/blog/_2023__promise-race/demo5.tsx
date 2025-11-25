import { ImperativePromise, createImperativePromise } from 'awesome-imperative-promise';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PromiseCancelDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestPromiseRef = useRef<ImperativePromise<ApiResponse> | null>(null);

  const fetchData = () => {
    const { promise, resolve, reject, cancel } = createImperativePromise<ApiResponse>();
    requestPromiseRef.current = { promise, resolve, reject, cancel };

    setIsLoading(true);
    setData(null);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/posts/1?_delay=2000')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        return response.json();
      })
      .then(resolve)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          reject(error);
        }
      });

    promise
      .then((result) => {
        setData(result);
      })
      .catch(() => {
        setError('Network error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const cancelRequest = () => {
    if (requestPromiseRef.current) {
      requestPromiseRef.current.cancel();
      setError('Request canceled');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (requestPromiseRef.current) {
        requestPromiseRef.current.cancel();
      }
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <div>
          <h1 className="text-xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className={twMerge('px-4 py-2 rounded text-white', isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700')}
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className={twMerge('px-4 py-2 rounded text-white', !isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700')}
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default PromiseCancelDemo;
