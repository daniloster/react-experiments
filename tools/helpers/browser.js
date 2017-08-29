require('source-map-support').install({
  handleUncaughtExceptions: false,
  environment: 'node',
});

var path = require('path');
function matchMedia() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
}
function emptyFunction() {}

require('babel-register')({
  "babelrc": false,
  "presets": [["es2015", { "modules": false }], "react", "stage-0"],
  "plugins": [
    "transform-es2015-modules-umd",
    "transform-runtime",
    ["module-resolver", {
      "root": [
        path.resolve(process.cwd(), './node_modules'),
        path.resolve(process.cwd(), '../../node_modules')
      ]
    }]
  ],
  "ignore": function(filename) {
    var isIgnored = (/packages\/((\w|\d|\-)+)\/dist\//.test(filename) || (/packages\/((\w|\d|\-)+)\/lib\//.test(filename) || /node_modules/.test(filename)));
    return isIgnored;
  },
  "env": {
    "test": {
      "plugins": ["istanbul"]
    }
  }
});
require('babel-polyfill');
require('babel-regenerator-runtime');
/**
 * Timezone local must be enforced to be different from +00:00, otherwise,
 * we will not be able to validate correctly the date in local time and utc
 */
process.env.TZ = 'GMT+02:00';

var jsdom = require('jsdom').jsdom;
var chai = require('chai');

global.expect = chai.expect;
global.assert = chai.assert;

var exposedProperties = ['window', 'navigator', 'document'];
var document = jsdom('');
global.document = document;
global.window = document.defaultView;
global.window.matchMedia = matchMedia;
global.window.sessionStorage = { getItem: emptyFunction, setItem: emptyFunction };
global.window.localStorage = { getItem: emptyFunction, setItem: emptyFunction };
global.document.execCommand = () => {
  //do nothing
};
global.window.requestAnimationFrame = () => {
  //do nothing
};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global['Event'] = global['Event'] || function Event() { };
global['Element'] = global['Element'] || function Element() { };
global['HTMLDocument'] = global['HTMLDocument'] || function HTMLDocument() { };

global.navigator = {
  userAgent: 'node.js'
};

function setDefaultValueToStorage(value = {}) {
  global.window.localStorage = value;
}
setDefaultValueToStorage();
global.initLocalStorage = setDefaultValueToStorage;

module.exports = {};