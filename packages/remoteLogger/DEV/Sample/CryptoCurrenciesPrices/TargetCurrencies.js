import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TargetCurrency from './TargetCurrency';

import styles from './CryptoCurrenciesPrices.scss';

export default class TargetCurrencies extends PureComponent {
  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeCurrencies: PropTypes.func.isRequired,
    selectedCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  onChangeCurrencies = (e) => {
    const { selectedCurrencies, onChangeCurrencies } = this.props;
    const currency = e.currentTarget.getAttribute('data-currency');
    onChangeCurrencies(
      selectedCurrencies.includes(currency)
        ? selectedCurrencies.filter(c => c !== currency)
        : selectedCurrencies.concat(currency),
    );
  };

  render() {
    const { currencies, selectedCurrencies } = this.props;

    return (
      <section className={styles.updateContentArea}>
        {currencies.map(currency => (
          <TargetCurrency
            currency={currency}
            isChecked={selectedCurrencies.includes(currency)}
            key={currency}
            onChange={this.onChangeCurrencies}
          />
        ))}
      </section>
    );
  }
}
