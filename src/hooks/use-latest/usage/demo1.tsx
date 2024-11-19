/**
 * defaultShowCode: true
 */

import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

export default function Chat() {
  const [text, setText] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleSend() {
    setTimeout(() => {
      alert('正在发送：' + text);
    }, 3000);
  }

  return (
    <>
      <input value={text} onChange={handleChange} />{' '}
      <button type="button" onClick={handleSend}>
        发送
      </button>
    </>
  );
}
