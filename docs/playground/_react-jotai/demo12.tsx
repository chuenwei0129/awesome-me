import { Provider, atom, createStore, useAtomValue } from 'jotai';
import React, { useEffect } from 'react';

const timeAtom = atom(0);
const store = createStore();

setInterval(() => {
  // Interacting with the atom outside of React
  store.set(timeAtom, (prev) => prev + 1); // Update atom's value
  console.log('From store.get', store.get(timeAtom)); // Read atom's value
}, 1000);

function Component() {
  const time = useAtomValue(timeAtom); // Inside React

  useEffect(() => {
    console.log('From useAtomValue', time);
  }, [time]);

  return (
    <div className="App">
      <h2>Time atom is mutated outside of React</h2>
      <pre>Time Elapsed: {time} seconds</pre>
      Check console
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}
