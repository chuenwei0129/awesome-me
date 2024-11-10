import React, { useState } from 'react';

const B = React.forwardRef((props: any, ref) => {
  const [state, setstate] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      update: (n: any) => {
        setstate(n);
      },
    }),
    [],
  );
  console.log('child', state, props.count);

  return <div>{state}</div>;
});

const App = function () {
  const [state, setstate] = useState(0);
  const ref = useRef(null);

  return (
    <div className="App">
      <button
        onClick={() => {
          setstate(state + 1);
          (ref.current as any).update(state + 1);
        }}
      >
        click
      </button>
      <B count={state} ref={ref} />
    </div>
  );
};

export default App;
