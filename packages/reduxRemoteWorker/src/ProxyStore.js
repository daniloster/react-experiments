import uuid from 'uuid/v4';

export default class ProxyStore {
  constructor(storeUri) {
    if (!window.Worker) {
      throw new Error('This browser does not support web worker.');
    }

    this.promises = {};
    this.remote = new Worker(storeUri);
    this.remote.addListener('message', (args) => {
      console.log('response args:', args);
      this.promises[args.data.$reference](args);
    });
  }

  init = () => new Promise((resolve, reject) => this.getState().then(resolve, reject));

  getState = () =>
    new Promise((resolve, reject) => {
      const id = uuid();
      this.promises[id] = (args) => {
        console.log('getState args got here:', args);
        delete this.promises[id];
      };
      this.remote.emit('getState', { $reference: id, payload: null });
    });

  dispatch = action =>
    new Promise((resolve, reject) => {
      const id = uuid();
      this.promises[id] = (args) => {
        console.log('dispatch args got here:', args);
        delete this.promises[id];
      };
      this.remote.emit('dispacth', { $reference: id, payload: action });
    });

  subscribe = listener =>
    new Promise((resolve, reject) => {
      const id = uuid();
      this.promises[id] = (args) => {
        console.log('subscribe args got here:', args);
      };
      this.remote.emit('subscribe', { $reference: id, payload: listener });
    });

  replaceReducer = nextReducer =>
    new Promise((resolve, reject) => {
      const id = uuid();
      this.promises[id] = (args) => {
        console.log('replaceReducer args got here:', args);
      };
      this.remote.emit('replaceReducer', { $reference: id, payload: nextReducer });
    });
}
