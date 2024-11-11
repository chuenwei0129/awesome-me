import React from 'react';
import { PropsGetterCounter, useGetterCounter } from 'favor-ui';

export default () => {
  const { count, getCounterProps, getIncrementProps, getDecrementProps } = useGetterCounter({
    initialCount: 0,
    max: 12,
  });

  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <>
      <PropsGetterCounter
        {...getCounterProps({
          onChange: handleChangeCounter,
        })}
      >
        <PropsGetterCounter.Decrement icon="minus" {...getDecrementProps()} />
        <PropsGetterCounter.Label>计数器</PropsGetterCounter.Label>
        <PropsGetterCounter.Count limit={10} />
        <PropsGetterCounter.Increment icon="plus" {...getIncrementProps()} />
      </PropsGetterCounter>

      <div style={{ marginTop: '20px' }}>
        <button
          {...getIncrementProps({
            onClick: () => {
              console.log('btn 1 clicked');
            },
          })}
        >
          Custom increment btn 1 log message
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button {...getIncrementProps({ disabled: count >= 6 })}>
          Custom increment btn 2 Max 6
        </button>
      </div>
    </>
  );
};
