/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';

function A() {
  console.log(2);
  return null;
}

function App() {
  const [state, setState] = useState(false);
  console.log(1);
  return (
    <>
      <button
        onClick={() => {
          console.log('click');
          setState(true);
        }}
      >
        click the button 3 times
      </button>
      <A />
    </>
  );
}
export default () => <App />;
