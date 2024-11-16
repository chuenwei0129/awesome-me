import React from 'react';
import { useCatStore } from '../stores/catStore';

export default function CatBox2() {
  const bigCats = useCatStore((state) => state.cats.bigCats);
  const increaseBigCats = useCatStore((state) => state.increaseBigCats);
  return (
    <div className="box">
      <h1>Cat Box2</h1>
      <p>共享状态 big cats</p>
      <p>重渲染: {Math.random()}</p>
      <p>big cats: {bigCats}</p>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
      </div>
    </div>
  );
}
