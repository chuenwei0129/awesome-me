/**
 * defaultShowCode: true
*/

import React, { useRef, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const curRef = useRef<number>();
  const prevRef = useRef<number>()
  // 比较 ref 与当前 count 值，第一次为 Object.is(undefined, 0)
  // 第二次为 Object.is(0, 1)
  // curRef.current 保存着上次的 count
  if (!Object.is(curRef.current, count)) {
    // 使用 prevRef 保存 curRef 的值
    prevRef.current = curRef.current;
    // 更新 curRef 的值
    curRef.current = count;
  }

  return (
    <>
      <div>counter current value: {count}</div>
      <div>counter previous value: {prevRef.current}</div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        increase
      </button>
      <button type="button" onClick={() => setCount((c) => c - 1)}>
        decrease
      </button>
    </>
  );
};
