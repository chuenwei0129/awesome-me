import React from 'react';

import {
  animated,
  useChain,
  useSpringRef,
  useSprings,
  useTrail,
} from '@react-spring/web';

export default function App() {
  const api1 = useSpringRef();

  const [springs] = useTrail(
    3,
    () => ({
      ref: api1,
      from: { width: 0 },
      to: { width: 300 },
      config: {
        duration: 1000,
      },
    }),
    [],
  );

  const api2 = useSpringRef();

  const [springs2] = useSprings(
    3,
    () => ({
      ref: api2,
      from: { height: 100 },
      to: { height: 50 },
      config: {
        duration: 1000,
      },
    }),
    [],
  );

  useChain([api1, api2], [0, 1], 1000);

  return (
    <div>
      {springs.map((styles1, index) => (
        <animated.div
          key={index}
          style={{ ...styles1, ...springs2[index] }}
          className="bg-red-200 h-[100px] m-[10px]"
        ></animated.div>
      ))}
    </div>
  );
}
