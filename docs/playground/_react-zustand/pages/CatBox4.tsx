import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useCatStore } from '../stores/catStore';

export default function CatBox4() {
  const [bigCats, increaseBigCats] = useCatStore(useShallow((state) => [state.cats.bigCats, state.increaseBigCats]));

  return (
    <div className="box">
      <h1>Cat Box4</h1>
      <p>共享状态 big cats</p>
      <p>重渲染: {Math.random()}</p>
      <p>big cats: {bigCats}</p>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
      </div>
    </div>
  );
}
