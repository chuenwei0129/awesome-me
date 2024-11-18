// 原理：本质是利用高阶函数在调用 setState 之前做一些额外的处理，所以才叫 useSetState 。

import { useCallback, useState } from 'react';
import isFunction from '../../utils/isFunction';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;

/**
 * 自定义 Hook，用于管理一个带有合并更新功能的状态对象。
 *
 * @param initialState - 初始状态对象，或者返回初始状态对象的函数。
 * @returns 一个包含当前状态和 setState 函数的元组。
 */
const useSetState = <S extends Record<string, any>>(initialState: S | (() => S)): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);

  /**
   * 通过将给定的 patch 合并到当前状态来更新状态。patch 可以是一个对象或者一个函数，
   * 该函数接收先前状态并返回新的状态对象或 patch。
   *
   * @param patch - 其中包含要与当前状态合并的部分状态的对象，或者返回此类对象或 null 的函数。
   */
  const setMergeState = useCallback((patch: any) => {
    setState((prevState) => {
      // 如果 patch 是函数，调用它并传递当前状态以获得新的状态/patch。
      const newState = isFunction(patch) ? patch(prevState) : patch;
      // 如果 newState 不为 null，将其与前一个状态合并并返回合并后的状态。
      // 否则，返回保持不变的前一个状态。
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  // 返回当前状态和 setMergeState 函数。
  return [state, setMergeState];
};

export default useSetState;
