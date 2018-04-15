import Artyom from 'artyom.js';

export const DEFAULT_KEYWORDS = ['temple'];
export const DEFAULT_HELP_KEYWORDS = ['help', 'help me', 'show me options'];
export const THREE_SECONDS = 1000 * 3;

export default class GestureModule {
  constructor(options = {}) {}

  bootstrap = (options = {}) => this;

  init = (options = {}) =>
    new Promise((resolve) => {
      resolve(options);
    });

  recordGesture = () => this;

  observeGesture = () => {};

  clear = () => {};
}
