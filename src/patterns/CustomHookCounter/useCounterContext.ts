import React from 'react';
import { CounterContext } from './CounterProvider';

export const useCounterContext = () => {
  const context = React.useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounterContext must be used within a CounterProvider');
  }
  return context;
};
