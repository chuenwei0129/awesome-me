import { useUnmountedRef } from 'naifu';
// import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

// function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
// function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
const useSafeState: typeof useState = (initialState?) => {
  // 判断是否卸载
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((currentState: unknown) => {
    /** if component is unmounted, stop update */
    // 如果组件卸载，则停止更新
    if (unmountedRef.current) return;
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const;
};

export default useSafeState;
