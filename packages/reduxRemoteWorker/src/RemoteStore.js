export default class RemoteStore {
  constructor(store) {
    this.store = store;
    global.onmessage = this.onmessage;
  }

  onmessage = (args) => {
    console.log('Remote:', args);
  };

  getState = () => {};

  dispatch = () => {};

  subscribe = () => {};

  replaceReducer = () => {};
}
