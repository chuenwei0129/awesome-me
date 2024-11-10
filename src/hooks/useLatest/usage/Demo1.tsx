import React, { useEffect, useRef, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  // 每次渲染后都会重新执行，所以需要使用 useRef 保存最新的值
  countRef.current = count;

  useEffect(() => {
    setInterval(() => {
      console.log('setInterval:', countRef.current);
    }, 1000);
  }, []);

  return (
    <div>
      count: {count}
      <br />
      <button type="button" onClick={() => setCount((val) => val + 1)}>
        增加 1
      </button>
    </div>
  );
};
