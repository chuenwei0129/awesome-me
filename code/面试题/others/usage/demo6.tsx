import React, { useMemo, useState } from 'react';

export default function ImprovedExample() {
  const [count, setCount] = useState(0);
  // 假设这是个复杂的计算
  const result = useMemo(() => count * 2, [count]); // 正确使用 useMemo 来处理依赖数据的计算

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {result}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
