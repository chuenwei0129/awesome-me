import { useEffect, useRef } from 'react';

const useUnmountedRef = () => {
  const unmountedRef = useRef(false);

  useEffect(() => {
    unmountedRef.current = false;
    // 如果已经卸载，则会执行 return 中的逻辑
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return unmountedRef;
};

export default useUnmountedRef;
