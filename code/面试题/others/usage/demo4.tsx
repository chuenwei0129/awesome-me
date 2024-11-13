import React, { useState } from 'react';

export default function MutableComponent() {
  console.log('render');

  const [items, setItems] = useState(['apple', 'banana', 'orange']);
  const [, setState] = useState(false);

  const handleRemove = (index: number) => {
    // 直接修改了原数组，违背了不可变原则
    items.splice(index, 1);
    setItems(items);
  };

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button type="button" onClick={() => handleRemove(index)}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          console.log('click');
          setState(true);
        }}
      >
        click the button 3 times
      </button>
    </>
  );
}
