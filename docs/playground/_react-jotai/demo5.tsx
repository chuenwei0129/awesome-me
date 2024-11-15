/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { useAtomValue, useSetAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import React from 'react';

const counterAtom = atomWithImmer(0);

const Counter = () => {
  const counter = useAtomValue(counterAtom);
  return <h1>{counter}</h1>;
};

const Controls = () => {
  const setCounter = useSetAtom(counterAtom);
  return (
    <div>
      {/* 因为是原始类型，所以 immer 和原来没差 */}
      <button type="button" onClick={() => setCounter((counter) => counter + 1)}>
        Increment
      </button>
      {/* immer mutable */}
      <button type="button" onClick={() => setCounter((c) => (c = c - 1))}>
        Decrement
      </button>
    </div>
  );
};

const Demo5 = () => {
  return (
    <>
      <Counter />
      <Controls />
    </>
  );
};

export default Demo5;
