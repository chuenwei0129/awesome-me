import React from 'react';
import { useControllableValue } from 'ahooks';

export default (props: any) => {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: '',
  });

  return (
    <>
      <input value={state} onChange={(e) => setState(e.target.value)} style={{ width: 300 }} />
      <button type="button" onClick={() => setState('')} style={{ marginLeft: 8 }}>
        Clear
      </button>
    </>
  );
};
