// currencies: PropTypes.arrayOf(PropTypes.string),
// onChangeCurrencies: PropTypes.func.isRequired,
// onRefreshPrices: PropTypes.func.isRequired,
// prices: PropTypes.arrayOf(PropTypes.shape({})),
// selectedCurrencies: PropTypes.arrayOf(PropTypes.string),

import uuid from 'uuid/v4';
import createReducerFunction from 'daniloster-utils/lib/createReducerFunction';
import logger from '../logger';

export const STANDARD_NAME = 'cryptoStock';
export const DEFAULT_CURRENCIES = [
  'AUD',
  'BRL',
  'CAD',
  'CHF',
  'CLP',
  'CNY',
  'CZK',
  'DKK',
  'EUR',
  'GBP',
  'HKD',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'JPY',
  'KRW',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PHP',
  'PKR',
  'PLN',
  'RUB',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'TWD',
  'ZAR',
];
export const INITIAL_STATE = {
  currencies: DEFAULT_CURRENCIES,
  prices: [],
  selectedCurrencies: [],
};

export const fixedConstants = {
  REFRESH_PRICES: `${STANDARD_NAME}:REFRESH_PRICES`,
};

/**
 * Creates action to set prices based on constant provide
 */
export function $setPrices(prices, type) {
  return {
    type,
    prices,
  };
}

/**
 * Creates a namespaced actions, reducers to connect to the components without conflicts
 * @param {string} namespace - name based on to reserve a section in the redux store
 * @param {object} initialState - initial values for the store section
 */
export default function createReduxStoreSection(namespace, initialState = { ...INITIAL_STATE }) {
  const constants = {
    CHANGE_SELECTED_CURRENCIES: `${namespace}:${STANDARD_NAME}:CHANGE_SELECTED_CURRENCIES`,
    SET_PRICES: `${namespace}:${STANDARD_NAME}:SET_PRICES`,
    ...fixedConstants,
  };

  /**
   * Change the selected currencies
   */
  function changeCurrencies(selectedCurrencies) {
    return {
      type: constants.CHANGE_SELECTED_CURRENCIES,
      selectedCurrencies,
    };
  }

  function reduceChangeCurrencies(state, { selectedCurrencies }) {
    return {
      selectedCurrencies,
    };
  }

  /**
   * Change the selected currencies
   */
  function setPrices(prices) {
    return $setPrices(prices, constants.SET_PRICES);
  }

  function reduceSetPrices(state, { prices }) {
    return {
      prices,
    };
  }

  /**
   * Refresh prices
   */
  function refreshPrices(selectedCurrencies) {
    const currencies = selectedCurrencies.concat([]).sort();

    return {
      type: constants.REFRESH_PRICES,
      endpoints: currencies.map(
        currency => `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=50`,
      ),
      selectedCurrencies: currencies,
      setPricesConstant: constants.SET_PRICES,
    };
  }

  const actions = {
    changeCurrencies,
    refreshPrices,
    setPrices,
  };

  const mapDispatchToProps = {
    onChangeCurrencies: changeCurrencies,
    onRefreshPrices: refreshPrices,
    setPrices,
  };

  function mapStateToProps(state, ownProps = {}) {
    const $interceptor = ownProps.$interceptor || (() => ({}));
    return {
      ...state[namespace],
      ...ownProps,
      ...$interceptor(state, ownProps),
    };
  }

  const reducersMap = {
    [constants.CHANGE_SELECTED_CURRENCIES]: logger.time(reduceChangeCurrencies),
    [constants.SET_PRICES]: logger.time(reduceSetPrices),
  };

  return {
    initialState,
    constants,
    actions,
    mapDispatchToProps,
    mapStateToProps,
    reducersMap,
    reducers: {
      [namespace]: createReducerFunction(initialState, reducersMap),
    },
  };
}
