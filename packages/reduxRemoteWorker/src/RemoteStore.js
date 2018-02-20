function invoke(store, method, payload) {
  switch (method) {
    case 'dispatch':
      return store.dispatch(payload);
    case 'replaceReducer':
      return store.replaceReducer(payload);
    default:
      return store.getState();
  }
}

class RemoteStore {
  constructor(store, postMessage) {
    this.postMessage = postMessage;
    this.store = store;
    /**
     * Don't need to worry about unsubscribe function here,
     * this will get executed until browser is refreshed;
     */
    console.log('Remote: Adding listener in the worker');
    this.store.subscribe(() => this.listener(this.store.getState()));
  }

  onmessage = (message) => {
    console.log(`Remote: ${message.data.$method} [${message.data.$reference}]:`, message);
    const { $method, $reference, payload } = message.data;
    if ($method === 'init') {
      return this.listener(this.store.getState());
    }
    const returnValue = invoke(this.store, $method, payload);
    this.postMessage({ $method, $reference, returnValue });
  };

  listener = (state) => {
    this.postMessage({ $reference: 'subscriptions', lastStateUpdate: Date.now(), state });
  };
}

export default RemoteStore;
