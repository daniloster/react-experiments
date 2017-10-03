require('./babel-registration');

/**
 * Timezone local must be enforced to be different from +00:00, otherwise,
 * we will not be able to validate correctly the date in local time and utc
 */
process.env.TZ = 'GMT+02:00';

// setup file
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

var jsdom = require('jsdom').JSDOM;
var chai = require('chai');

global.expect = chai.expect;
global.assert = chai.assert;

var exposedProperties = ['window', 'navigator', 'document'];
var dom = new jsdom('');
function matchMedia() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
}
function emptyFunction() {}

global.window = dom.window;
global.document = dom.window.document;
global.document.window = dom.window;
global.window.matchMedia = matchMedia;
global.window.sessionStorage = { getItem: emptyFunction, setItem: emptyFunction };
global.window.localStorage = { getItem: emptyFunction, setItem: emptyFunction };
global.document.execCommand = () => {
  //do nothing
};
global.window.requestAnimationFrame = () => {
  //do nothing
};

Object.keys(document.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.window[property];
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
