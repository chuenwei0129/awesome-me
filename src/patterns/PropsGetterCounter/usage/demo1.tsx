import { PropsGetterCounter, useCounterPropsGetter } from 'naifu';
import React from 'react';

export default () => {
  // 无非就是 Hooks 开个口子让使用者传递个回调函数，然后回调函数在内部调用修改逻辑，修改内部代码，给用户最高的自由度，即所谓的控制反转。
  const { count, increment, getCounterProps, getIncrementProps, getDecrementProps } = useCounterPropsGetter({
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
          type="button"
          {...getIncrementProps({
            // 用户更多的控制权，回调
            onClick: () => {
              increment();
              increment();
              // 除了 hooks 提供的，还能做别的事
            },
          })}
        >
          +3
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button type="button" {...getIncrementProps({ disabled: count >= 6 })}>
          Custom increment btn 2 Max 6
        </button>
      </div>
    </>
  );
};
