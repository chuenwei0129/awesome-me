import React from 'react';
import { useMap } from 'naifu';

const initialValue: readonly [string | number, string][] = [
  ['msg', 'hello world'],
  [123, 'number type'],
];

export default () => {
  const [map, { set, setAll, remove, reset, get }] = useMap<string | number, string>(initialValue);

  return (
    <div>
      <button type="button" onClick={() => set(String(Date.now()), new Date().toJSON())}>
        Add
      </button>
      <button
        type="button"
        onClick={() => setAll([['text', 'this is a new Map']] as const)}
        style={{ margin: '0 8px' }}
      >
        Set new Map
      </button>
      <button type="button" onClick={() => remove('msg')} disabled={!get('msg')}>
        Remove msg
      </button>
      <button type="button" onClick={() => reset()} style={{ margin: '0 8px' }}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </div>
  );
};
