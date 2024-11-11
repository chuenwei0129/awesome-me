import { animated, useSpring } from '@react-spring/web';
import React from 'react';

export default function App() {
  const [styles, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100,
      },
      config: {
        // duration: 2000
        mass: 2,
        friction: 10,
        tension: 400,
      },
    };
  });

  function clickHandler() {
    api.start({
      width: 200,
      height: 200,
    });
  }

  return (
    <animated.div
      className="bg-blue-200 h-[100px]"
      style={{ ...styles }}
      onClick={clickHandler}
    ></animated.div>
  );
}
