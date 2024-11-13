import React from 'react';

type CounterContextType = {
  count: number;
};

export const CounterContext = React.createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children, value }: { children: React.ReactNode; value: CounterContextType }) => {
  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
};
