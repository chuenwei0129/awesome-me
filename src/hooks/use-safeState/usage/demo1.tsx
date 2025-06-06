import useSafeState from '../index';
import React, { useEffect } from 'react';
import { useToggle } from 'naifu'

const Child = () => {
  const [value, setValue] = useSafeState<string>();

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server');
    }, 3000);
  }, []);

  const text = value || 'Loading...';

  return <div>{text}</div>;
};

export default () => {
  const [visible, { toggle }] = useToggle(true);

  return (
    <div>
      <button onClick={() => toggle()}>Unmount</button>
      {visible && <Child />}
    </div>
  );
};
