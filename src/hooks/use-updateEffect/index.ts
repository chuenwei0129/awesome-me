import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  // 忽略首次执行
  const isMounted = useRef(false);

  useEffect(() => {
    // 首次执行完时候，设置为 true，从而下次依赖更新的时候可以执行逻辑
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
