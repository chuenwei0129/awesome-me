import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useBearStore } from '../stores/bearStore';
import { useFoodStore } from '../stores/foodStore';

export default function BearBox() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  const [bgColor, setBgColor] = useState<'lightgreen' | 'lightpink'>();

  // 不使用中间件的订阅
  // useEffect(() => {
  //   const unSub = useFoodStore.subscribe((state, prevState) => {
  //     console.log('state: ', state)
  //     console.log('prevState: ', prevState)
  //     if (state.fish >= 5) {
  //       setBgColor('lightpink')
  //     } else {
  //       setBgColor('lightgreen')
  //     }
  //   })
  //   return unSub
  // }, [])

  // 添加 selector 中间件
  useEffect(() => {
    const unsub = useFoodStore.subscribe(
      (state) => state.fish,
      (fish, prevFish) => {
        console.log('fish: ', fish);
        console.log('prevFish: ', prevFish);
        // 初始化，防止刷新
        if (fish === prevFish) {
          if (fish <= 5) {
            setBgColor('lightpink');
          } else {
            setBgColor('lightgreen');
          }
        }
        if (prevFish <= 5 && fish > 5) {
          setBgColor('lightgreen');
        } else if (prevFish > 5 && fish <= 5) {
          setBgColor('lightpink');
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      },
    );

    return unsub;
  }, []);

  return (
    <div className="box" style={{ background: bgColor }}>
      <h1>Bear Box</h1>
      <p>{Math.random()}</p>
      <p>bears: {bears}</p>
      <div>
        <button onClick={increasePopulation}>add bear</button>
        <button onClick={removeAllBears}>remove all</button>
      </div>
    </div>
  );
}
