import useUnmountedRef from '../index';
import { useToggle } from 'naifu'
import { message } from 'antd';
import React, { useEffect } from 'react';

const MyComponent = () => {
  const unmountedRef = useUnmountedRef();
  useEffect(() => {
    setTimeout(() => {
      if (!unmountedRef.current) {
        message.info('component is alive');
      }
    }, 3000);
  }, []);

  return <p>Hello World!</p>;
};

export default () => {
  const [state, { toggle }] = useToggle(true);

  return (
    <>
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
