import { animated, useTransition } from '@react-spring/web';
import React, { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: `${Math.random().toFixed(2)}` },
    { id: 2, text: `${Math.random().toFixed(2)}` },
  ]);

  const transitions = useTransition(items, {
    initial: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    from: { transform: 'translate3d(100%,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(-100%,0,0)', opacity: 0 },
  });

  return (
    <div>
      <div className="w-[300px] my-[20px] mx-auto">
        {transitions((style, i) => {
          return (
            <animated.div
              className="my-[4px] py-[10px] rounded-[4px] bg-blue-200"
              style={style}
            >
              <span
                className="px-[10px] cursor-pointer select-none"
                onClick={() => {
                  setItems(items.filter((item) => item.id !== i.id));
                }}
              >
                x
              </span>
              {i.text}
            </animated.div>
          );
        })}
      </div>

      <div
        className="text-white bg-[#0069d9] border border-[#0062cc] py-[10px] px-[20px] rounded-[4px] w-fit cursor-pointer my-[20px] mx-auto"
        onClick={() => {
          setItems([
            ...items,
            { id: Date.now(), text: `${Math.random().toFixed(2)}` },
          ]);
        }}
      >
        Add
      </div>
    </div>
  );
}
