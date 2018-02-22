import { createStore, applyMiddleware, combineReducers } from 'redux';
import createReduxStoreSection from 'daniloster-date-picker/lib/createReduxStoreSection';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import RemoteStore from '../../src/RemoteStore';
import { reducers as crypto } from './CryptoCurrenciesPrices/storeSection';
import sagas from './CryptoCurrenciesPrices/cryptoCurrenciesPricesSagas';

const datePicker = createReduxStoreSection('datePicker');

const sagaMiddleware = createSagaMiddleware();

const remoteStore = new RemoteStore(
  createStore(
    combineReducers({
      ...datePicker.reducers,
      ...crypto,
    }),
    applyMiddleware(sagaMiddleware, logger),
  ),
  message => postMessage(message),
);

sagaMiddleware.run(sagas);

onmessage = message => remoteStore.onmessage(message);
