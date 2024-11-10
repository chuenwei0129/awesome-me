import { animated, useSpringValue } from '@react-spring/web';
import React, { useEffect } from 'react';

export default function App() {
  const width = useSpringValue(0, {
    config: {
      // duration: 2000
      mass: 2,
      friction: 10,
      tension: 200,
    },
  });

  useEffect(() => {
    width.start(300);
  }, []);

  return (
    <animated.div
      className="bg-slate-400 h-[100px]"
      style={{ width }}
    ></animated.div>
  );
}
