import { atom, Provider, useAtom } from 'jotai';
import React from 'react';

// 可选：您可以像使用 useContext 一样使用 Provider，
// ...但如果你只需要一个，
// ...你可以省略它，Jotai 将使用默认模式（称为 Provider-less 模式）。

const textAtom = atom('hello');
const textLenAtom = atom((get) => get(textAtom).length);
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

const Input = () => {
  const [text, setText] = useAtom(textAtom);
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
};

const CharCount = () => {
  const [len] = useAtom(textLenAtom);
  return <div>Length: {len}</div>;
};

const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom);
  return <div>Uppercase: {uppercase}</div>;
};

const App = () => (
  <Provider>
    <Input />
    <CharCount />
    <Uppercase />
  </Provider>
);

export default App;
