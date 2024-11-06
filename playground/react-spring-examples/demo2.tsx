import React from 'react';

import { animated, useSpring } from '@react-spring/web';

export default function App() {
  const styles = useSpring({
    from: {
      width: 0,
      height: 0,
    },
    to: {
      width: 200,
      height: 200,
    },
    config: {
      duration: 2000,
    },
  });

  return (
    <animated.div
      className="bg-slate-200 h-[100px]"
      style={{ ...styles }}
    ></animated.div>
  );
}
