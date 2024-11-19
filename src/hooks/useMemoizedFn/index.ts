import { useMemo, useRef } from 'react';
import isFunction from '../../utils/isFunction';

import type { PickFunction, noop } from '../../types/shared';

// 持久化 function 的 hook，理论上，完全可以使用 useMemoizedFn 完全代替 useCallback。
function useMemoizedFn<T extends noop>(fn: T) {
  if (process.env.NODE_ENV === 'development') {
    // 假如非 function，则直接报错
    if (!isFunction(fn)) {
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  // 通过 useRef 保持其引用地址不变，并且值能够保持值最新
  const fnRef = useRef<T>(fn);

  // 假如说原来的 fn 地址发生了变化
  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);
  // // 通过 useRef 保持其引用地址不变，并且值能够保持值最新
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
