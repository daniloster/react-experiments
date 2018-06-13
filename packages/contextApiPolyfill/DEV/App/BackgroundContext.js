import React from 'react';
import createContext from '../../src';

/**
 * Here is being forced to set the React.createContext = createContext,
 * but, it is not required to do it as it gets set only if the createContext
 * is invalid (undefnied, null, 0, ''). As we are using React 16, the function
 * is already assigned, then, it is required for dev manually overrides it in
 * here.
 */
React.createContext = createContext;

const INITIAL_VALUE = 'red';
const BackgroundContext = React.createContext(INITIAL_VALUE);
BackgroundContext.initialValue = INITIAL_VALUE;

export default BackgroundContext;
