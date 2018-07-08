const React = require('react');
const createContext = require('context-api-polyfill');

/**
 * Here is being forced to set the React.createContext = createContext,
 * but, it is not required to do it as it gets set only if the createContext
 * is invalid (undefnied, null, 0, ''). As we are using React 16, the function
 * is already assigned, then, it is required for dev manually overrides it in
 * here.
 */
React.createContext = createContext.default;
