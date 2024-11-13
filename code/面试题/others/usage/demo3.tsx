import React, {
  createContext,
  memo,
  useContext,
  useState,
  type FC,
} from 'react';

const BigNumber: FC<{ number: number }> = ({ number }) => {
  console.log('🚀 ~ BigNumber render');

  return <div style={{ fontWeight: 700, fontSize: 36 }}>{number}</div>;
};

const SomeDecoration = memo(() => {
  console.log('🚀 ~ SomeDecoration render');
  return <div>SomeDecoration</div>;
});

const CounterContext = createContext(0);

const First = memo(() => {
  console.log('🚀 ~ First render');
  return <div>First</div>;
});

const Second = () => {
  const count = useContext(CounterContext);
  console.log('🚀 ~ Second render');
  return <div>{count}</div>;
};

const Four = () => {
  const count = useContext(CounterContext);
  console.log('🚀 ~ Four render');
  return <div>{count}</div>;
};

const Three = memo(() => {
  console.log('🚀 ~ Three render');
  return (
    <>
      <Four />
    </>
  );
});

const Counter = () => {
  console.log('🚀 ~ Counter render');
  const [count, setCount] = useState(0);
  const handleButtonClick = () => setCount((count) => count + 1);

  return (
    <div>
      <BigNumber number={count} />
      <SomeDecoration />
      <button type="button" onClick={handleButtonClick}>
        Increment
      </button>
      <CounterContext.Provider value={count}>
        <First />
        <Second />
        <Three />
      </CounterContext.Provider>
    </div>
  );
};

const demo3 = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};
export default demo3;
