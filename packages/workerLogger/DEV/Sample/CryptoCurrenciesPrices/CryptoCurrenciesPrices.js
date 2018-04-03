import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CryptoCurrencyPriceGroup from './CryptoCurrencyPriceGroup';
import TargetCurrencies from './TargetCurrencies';

import styles from './CryptoCurrenciesPrices.scss';

export default class CryptoCurrenciesPrices extends PureComponent {
  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeCurrencies: PropTypes.func.isRequired,
    onRefreshPrices: PropTypes.func.isRequired,
    prices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  onRefreshPrices = () => {
    const { onRefreshPrices, selectedCurrencies, setPrices } = this.props;
    onRefreshPrices(selectedCurrencies);
  };

  render() {
    const { currencies, onChangeCurrencies, prices, selectedCurrencies } = this.props;
    return (
      <div>
        <div>
          <TargetCurrencies
            currencies={currencies}
            onChangeCurrencies={onChangeCurrencies}
            selectedCurrencies={selectedCurrencies}
          />
          <button className={styles.refreshButton} onClick={this.onRefreshPrices}>
            Refresh
          </button>
        </div>
        <div>
          {prices.map(cryptoCurrencyPrices => (
            <CryptoCurrencyPriceGroup
              key={`crypto-${cryptoCurrencyPrices.id}`}
              prices={cryptoCurrencyPrices}
            />
          ))}
        </div>
      </div>
    );
  }
}
