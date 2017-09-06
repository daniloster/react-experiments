const env = require('./webpackEnv');

module.exports = env.isTest
? [{
  'font-awesome': {
    amd: 'font-awesome',
    commonjs: 'font-awesome',
    commonjs2: 'font-awesome',
    root: 'FontAwesome'
  },
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
}]
: [
  {
    'font-awesome': {
      amd: 'font-awesome',
      commonjs: 'font-awesome',
      commonjs2: 'font-awesome',
      root: 'FontAwesome'
    },
  },
  {
    'fs': {
      amd: 'fs',
      commonjs: 'fs',
      commonjs2: 'fs',
      root: 'fs'
    },
  },
  {
    'child_process': {
      amd: 'child_process',
      commonjs: 'child_process',
      commonjs2: 'child_process',
      root: 'ChildProcess'
    },
  }
];