import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers, {
  mapDispatchToProps,
  createMapStateToProps,
} from './reducers';
import sagas from './sagas';
import DevTools from './DevTools';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export { mapDispatchToProps };
export { createMapStateToProps };

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        logger,
      ),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
};


// import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducer from '../reducers';
// import DevTools from '../containers/DevTools';

// const enhancer = compose(
//   // Middleware you want to use in development:
//   applyMiddleware(d1, d2, d3),
//   // Required! Enable Redux DevTools with the monitors you chose
//   DevTools.instrument()
// );

// export default function configureStore(initialState) {
//   // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
//   // See https://github.com/reactjs/redux/releases/tag/v3.1.0
//   const store = createStore(rootReducer, initialState, enhancer);

//   // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
//   if (module.hot) {
//     module.hot.accept('../reducers', () =>
//       store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
//     );
//   }

//   return store;
// }