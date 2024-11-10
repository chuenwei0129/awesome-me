/**
 * title: 原地复用
 */

import { useState } from 'react';

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);

  let className = '';

  if (isFancy) {
    className += 'text-cyan-300';
  }

  return (
    <div className={className}>
      <h1>{score}</h1>
      <button type="button" onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}
