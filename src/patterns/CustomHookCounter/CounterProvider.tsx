import React from 'react';

// 定义上下文属性类型
type CounterContextType = {
  count: number; // 计数值
};

// 创建计数器上下文，默认值为 undefined
export const CounterContext = React.createContext<CounterContextType | undefined>(undefined);

// 定义计数器提供者组件
export const CounterProvider: React.FC<{ children: React.ReactNode; value: CounterContextType }> = ({ children, value }) => {
  return (
    // 将计数器值传递给 Provider 组件，使所有子组件都可以访问
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};
