import { useEffect, useRef, type RefObject } from 'react';

export default function useClickAway(callback: () => void, ref: RefObject<HTMLElement>) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => {
      if (!ref.current!.contains(e.target as Node)) {
        callbackRef.current();
      }
    };
    window.addEventListener('click', handler);

    return () => {
      window.removeEventListener('click', handler);
    };
  }, [ref]);
}
