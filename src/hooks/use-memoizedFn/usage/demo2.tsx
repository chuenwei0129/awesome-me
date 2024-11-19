import React, { useState, useCallback } from 'react';
import { PickFunction } from '../../../types/shared';
import { useMemoizedFn } from 'naifu'

// 定义带有自定义属性的函数类型
interface IncrementFunction extends PickFunction<(...args: any[]) => any> {
  (): void;
  customProperty?: string;
}

const WithAttributes: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  // 定义有自定义属性的函数
  const increment: IncrementFunction = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // 添加自定义属性
  // eslint-disable-next-line react-compiler/react-compiler
  increment.customProperty = 'I am a custom property';

  // 尝试使用 useMemoizedFn 持久化函数
  const memoizedIncrement = useMemoizedFn(increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={memoizedIncrement}>Increment</button>

      {/* 显示自定义属性 */}
      <p>Original custom property: {increment.customProperty}</p>
      <p>
        Memoized function custom property: {memoizedIncrement.customProperty ? memoizedIncrement.customProperty : 'undefined'}
      </p>
    </div>
  );
};

export default WithAttributes;
