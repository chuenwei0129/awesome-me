import { useMemo, useRef } from 'react';

type noop = () => void;

function useMemoizedFn<T extends noop>(fn: T) {
  // 通过 useRef 保持其引用地址不变，并且值能够保持值最新
  const fnRef = useRef<T>(fn);
  fnRef.current = useMemo(() => fn, [fn]);
  // 通过 useRef 保持其引用地址不变，并且值能够保持值最新
  const memoizedFn = useRef<PickFunction<T>>();
  if (!memoizedFn.current) {
    // 返回的持久化函数，调用该函数的时候，调用原始的函数
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}

export default useMemoizedFn;
