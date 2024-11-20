import { debounce } from 'lodash-es';
import { useEffect, useMemo } from 'react';
import useLatest from '../use-latest';

interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export default function useDebounce<T extends (...args: any[]) => any>(fn: T, options?: DebounceOptions) {
  const fnRef = useLatest(fn);

  // 默认是 1000 毫秒
  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        // options
        options,
      ),
    [],
  );

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, []);

  return {
    run: debounced,
    cancel: debounced.cancel,
    // flush 方法表示立即调用
    flush: debounced.flush,
  };
}
