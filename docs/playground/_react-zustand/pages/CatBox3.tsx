import React from 'react';
import { useCatStore } from '../stores/catStore';

export default function CatBox3() {
  const { cats, increaseBigCats } = useCatStore();
  return (
    <div className="box">
      <h1>Cat Box3</h1>
      <p>共享状态 big cats</p>
      <p>重渲染: {Math.random()}</p>
      <p>big cats: {cats.bigCats}</p>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
      </div>
    </div>
  );
}
