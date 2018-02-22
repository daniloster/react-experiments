import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PriceChartJs from './PriceChartJs';

import styles from './CryptoCurrenciesPrices.scss';

export default class CryptoCurrencyPriceGroup extends PureComponent {
  static propTypes = {
    prices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };
  render() {
    const { prices } = this.props;
    return (
      <section className={styles.card}>
        <header>
          <h2>{prices.symbol}</h2>
          <span>
            <strong>#{prices.rank}</strong> {prices.name}
          </span>
        </header>
        <div className={styles.cardContent}>
          <PriceChartJs type="bar" data={prices} />
        </div>
      </section>
    );
  }
}
