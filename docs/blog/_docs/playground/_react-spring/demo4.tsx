import { animated, useTrail } from '@react-spring/web';
import React, { useEffect } from 'react';

export default function App() {
  // 那如果多个元素的动画是依次进行的呢？直接把 useSprings 换成 useTrail 就行
  const [springs, api] = useTrail(3, () => ({
    from: { width: 0 },
    // 当你指定了 to，那会立刻执行动画，或者不指定 to，用 api.start 来开始动画
    // to: { width: 300 },
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    api.start({ width: 300 });
  }, []);

  return (
    <div>
      {springs.map((styles, index) => (
        <animated.div
          key={index}
          style={styles}
          className="bg-yellow-200 h-[100px] m-[10px]"
        ></animated.div>
      ))}
    </div>
  );
}
