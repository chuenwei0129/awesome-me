import React from 'react';
import { useCatStore } from '../stores/catStore';

export default function CatBox1() {
  const bigCats = useCatStore((state) => state.cats.bigCats);
  const smallCats = useCatStore((state) => state.cats.smallCats);
  const increaseBigCats = useCatStore((state) => state.increaseBigCats);
  const increaseSmallCats = useCatStore((state) => state.increaseSmallCats);

  return (
    <div className="box">
      <h1>Cat Box1</h1>
      <p>共享状态 big cats</p>
      <p>重渲染: {Math.random()}</p>
      <p>big cats: {bigCats}</p>
      <p>small cats: {smallCats}</p>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
        <button onClick={increaseSmallCats}>add small cats</button>
      </div>
    </div>
  );
}
