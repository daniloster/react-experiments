import uuid from 'uuid/v4';

const noop = () => true;

class ProxyStore {
  constructor(storeUri, initialState) {
    if (!Worker) {
      throw new Error('This browser does not support web worker.');
    }

    this.lastStateUpdate = Date.now();
    this.state = initialState;
    this.subscriptions = [];
    this.promises = {
      subscriptions: ({ data: { $reference, lastStateUpdate, state } }) => {
        console.log(`Proxy: subscribe [${$reference}]:`, { $reference, lastStateUpdate, state });
        if (lastStateUpdate > this.lastStateUpdate) {
          this.state = state;
          this.lastStateUpdate = lastStateUpdate;
        }
        this.subscriptions.forEach((inkoveSubscription) => {
          inkoveSubscription(this.state);
        });
      },
    };
    this.remote = new Worker(storeUri);
    this.remote.onmessage = (message) => {
      (this.promises[message.data.$reference] || noop)(message);
    };
    this.remote.postMessage({ $method: 'init' });
  }

  init = () => new Promise((resolve, reject) => this.getState().then(resolve, reject));

  getState = () => this.state;

  dispatch = action =>
    new Promise((resolve, reject) => {
      const id = uuid();
      this.promises[id] = (message) => {
        console.log(`Proxy: dispatch [${message.data.$reference}]:`, message);
        delete this.promises[id];
        resolve(message.data.returnValue);
      };
      this.remote.postMessage({
        $method: 'dispatch',
        $reference: id,
        payload: action,
      });

      return action;
    });

  subscribe = (listener) => {
    listener(this.state);
    this.subscriptions.push(state => listener(state));
    return () => {
      this.subscriptions = this.subscriptions.filter(subscription => subscription !== listener);
    };
  };

  replaceReducer = nextReducer =>
    new Promise((resolve, reject) => {
      const id = uuid();
      this.promises[id] = (message) => {
        console.log(`Proxy: replaceReducer [${message.data.$reference}]:`, message);
        delete this.promises[id];
        resolve(message.data.returnValue);
      };
      this.remote.postMessage({
        $method: 'replaceReducer',
        $reference: id,
        payload: nextReducer,
      });
    });
}

export default ProxyStore;
