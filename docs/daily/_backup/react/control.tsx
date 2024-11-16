import React, { ChangeEvent } from 'react';

// 非受控模式
export default function App() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('🚀 ~ handleChange ~ e.target.value:', e.target.value);
  };

  return <input defaultValue={'非受控默认值'} onChange={handleChange}></input>;
}
