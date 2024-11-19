/* eslint-disable react-compiler/react-compiler */
import { useRef } from 'react';

export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean;

// 直接通过判断
const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b);

function usePrevious<T>(state: T, shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate): T | undefined {
  // 保存上一次值
  const prevRef = useRef<T>();
  // 当前值
  const curRef = useRef<T>();

  // 自定义是否更新上一次的值
  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}

export default usePrevious;
