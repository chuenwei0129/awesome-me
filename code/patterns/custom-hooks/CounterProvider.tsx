import React from 'react';

type CounterContextProps = {
  count: number;
};

export const CounterContext = React.createContext<CounterContextProps | undefined>(undefined);

export const CounterProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CounterContextProps;
}) => {
  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
};
