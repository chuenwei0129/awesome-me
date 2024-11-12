import React, { useState } from 'react';

const fetchData = (): Promise<string> => {
  return new Promise((resolve) => {
    // 随机决定请求的延迟时间在 1000 ms 到 4000 ms 之间
    const delay = Math.floor(Math.random() * 3000) + 1000;
    setTimeout(() => {
      resolve(`请求耗时约 ${delay} ms`);
    }, delay);
  });
};

const timeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeoutPromise = new Promise<T>((_, reject) => setTimeout(() => reject(new Error('请求超时')), ms));
  return Promise.race([promise, timeoutPromise]);
};

const App: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    try {
      const result = await timeout(fetchData(), 2000); // 设置超时为 2000 ms
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <button
        onClick={handleFetch}
        style={{
          cursor: 'pointer',
          padding: '8px 16px',
          backgroundColor: '#4299e1', // Equivalent to bg-blue-500
          color: 'white',
          borderRadius: '4px', // Equivalent to rounded
        }}
      >
        发起请求
      </button>

      {data && <div style={{ marginTop: '16px' }}>响应数据: {data}</div>}
      {error && <div style={{ marginTop: '16px', color: '#f56565' }}>错误: {error}</div>}
    </div>
  );
};

export default App;
