import { atom, useAtom } from 'jotai';
import React, { ChangeEvent } from 'react';

const textAtom = atom('hello');
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

const Input = () => {
  const [text, setText] = useAtom(textAtom);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  return <input value={text} onChange={handleChange} />;
};

const UppercaseText = () => {
  const [uppercaseText] = useAtom(uppercaseAtom);
  return <h1>{uppercaseText}</h1>;
};

const Demo1 = () => {
  return (
    <>
      <Input />
      <UppercaseText />
    </>
  );
};

export default Demo1;
