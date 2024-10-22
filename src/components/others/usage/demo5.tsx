import React, { useEffect, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date()); // 更新时间
    }, 1000);

    return () => clearInterval(timerId);
  }, []); // 依赖为空，表示只在组件挂载时设置一次

  return <div>Current Time: {time.toLocaleTimeString()}</div>;
}
