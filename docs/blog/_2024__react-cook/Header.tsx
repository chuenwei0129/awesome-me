import React from 'react';

// 定义 Header 组件的属性类型
type HeaderProps = {
  numberOfPeople: number; // 记录人数
  increment: () => void; // 增加人数的回调函数
  decrement: () => void; // 减少人数的回调函数
};

// 定义并导出 Header 组件，使用 React.FC 类型
export const Header: React.FC<HeaderProps> = ({ numberOfPeople, increment, decrement }) => (
  <section>
    <h2>用料</h2>
    <p>{numberOfPeople} 人份</p>
    <button type="button" onClick={decrement}>
      -
    </button>
    <button type="button" onClick={increment}>
      +
    </button>
  </section>
);
