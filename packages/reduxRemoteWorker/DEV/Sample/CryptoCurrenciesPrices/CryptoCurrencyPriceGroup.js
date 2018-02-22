import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './CryptoCurrenciesPrices.scss';

export default class CryptoCurrencyPriceGroup extends PureComponent {
  static propTypes = {
    prices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };
  render() {
    const { prices } = this.props;
    return <div className={styles.cryptoCurrencyCard}>{JSON.stringify(prices)}</div>;
  }
}
