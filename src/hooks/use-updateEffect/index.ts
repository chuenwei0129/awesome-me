import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      return;
    }
    const recycle = effect();
    return () => recycle?.();
  }, deps);
};

export default useUpdateEffect;
