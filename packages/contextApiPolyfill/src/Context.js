import React from 'react';
import factoryProvider from './factoryProvider';
import factoryConsumer from './factoryConsumer';

export default function createContext(initialValue) {
  const stack = [];
  const Provider = factoryProvider(stack, initialValue);
  const Consumer = factoryConsumer(stack);

  return { Provider, Consumer };
}

if (!React.createContext) {
  React.createContext = createContext;
}
