import React, { useState, useRef } from 'react';
import { useEventListener } from 'ahooks';

export default () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEventListener(
    'click',
    () => {
      setValue(value + 1);
    },
    { target: ref },
  );

  return (
    <button ref={ref} type="button">
      You click {value} times
    </button>
  );
};
