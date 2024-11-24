import { atom, useAtom, useAtomValue } from 'jotai';
import React, { ChangeEvent } from 'react';

// 原生原子
const textAtom = atom('hello');
// 只读派生原子
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

const Input = () => {
  const [text, setText] = useAtom(textAtom);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  return <input value={text} onChange={handleChange} />;
};

const UppercaseText = () => {
  const uppercaseText = useAtomValue(uppercaseAtom);
  return <h1>{uppercaseText}</h1>;
};

const App = () => {
  return (
    <>
      <Input />
      <UppercaseText />
    </>
  );
};

export default App;
