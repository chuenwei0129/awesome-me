import React from 'react';

import { AntdCounter } from 'naifu';

export default () => {
  const onChange = (count: number) => {
    console.log('count', count);
  };

  return <AntdCounter limit={10} initialValue={8} label={'计数器'} iconDecrement={'square-minus'} iconIncrement={'circle-plus'} onChange={onChange} />;
};
