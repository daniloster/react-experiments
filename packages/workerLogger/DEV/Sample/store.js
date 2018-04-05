import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { reducers as crypto } from './CryptoCurrenciesPrices/storeSection';
import sagas from './CryptoCurrenciesPrices/cryptoCurrenciesPricesSagas';
import remoteLogger from './logger';

const datePicker = createReduxStoreSection('datePicker');

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    ...datePicker.reducers,
    ...crypto,
  }),
  applyMiddleware(sagaMiddleware, logger, remoteLogger.createMiddleware()),
);

sagaMiddleware.run(sagas);
