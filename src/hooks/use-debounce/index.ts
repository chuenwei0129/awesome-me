import { useEffect, useState } from 'react';
import useDebounceFn from '../use-debounceFn';

interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}

export default useDebounce;
