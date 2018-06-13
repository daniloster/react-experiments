import React from 'react';
import createContext from '../src';

/**
 * Here is being forced to set the React.createContext = createContext,
 * but, it is not required to do it as it gets set only if the createContext
 * is invalid (undefnied, null, 0, ''). As we are using React 16, the function
 * is already assigned, then, it is required for dev manually overrides it in
 * here.
 */
React.createContext = createContext;

describe('createContext', () => {
  let Context;

  function create() {
    Context = React.createContext('yellow');
  }

  function shouldHaveProviderComponent() {
    expect(Context.Provider).to.be.a('function');
  }

  function shouldHaveConsumerComponent() {
    expect(Context.Consumer).to.be.a('function');
  }

  describe('createContext should create the context correctly', () => {
    it('Given the Context is created', create);
    it('Expect the Context to have Provider Component', shouldHaveProviderComponent);
    it('And the Context to have Consumer Component', shouldHaveConsumerComponent);
  });
});
