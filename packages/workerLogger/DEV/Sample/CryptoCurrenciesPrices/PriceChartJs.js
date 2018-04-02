import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoize from 'fast-memoize';
import Chart from 'chart.js';
import 'daniloster-utils';

import styles from './CryptoCurrenciesPrices.scss';

const getParsedData = memoize(data => ({
  ...data.priceGroups.reduce(
    ({ datasets: [price, volume, cap], labels }, priceGroup) => ({
      datasets: [
        { ...price, data: price.data.concat(priceGroup.price) },
        // { ...volume, data: volume.data.concat(priceGroup.volume24h) },
        // { ...cap, data: cap.data.concat(priceGroup.marketCap) },
      ],
      labels: labels.concat(priceGroup.currency),
    }),
    {
      datasets: [
        {
          label: 'Price',
          data: [],
        },
        // {
        //   label: '24h Volume',
        //   data: [],
        // },
        // {
        //   label: 'Market Cap',
        //   data: [],
        // },
      ],
      labels: [],
    },
  ),
}));

export default class PriceChartJs extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    options: PropTypes.shape({}),
    type: PropTypes.string.isRequired,
  };

  static defaultProps = {
    options: {},
  };

  componentWillMount() {
    document.on('resize', this.onResize);
  }

  componentDidMount() {
    const { data, options, type } = this.props;
    this.chart = new Chart(this.ctx, {
      data: getParsedData(data),
      options,
      type,
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
    document.off('resize', this.onResize);
  }

  onResize = () => {
    if (this.chart) {
      this.chart.resize();
    }
  };

  setContainer = (e) => {
    this.container = e;
    this.ctx = e ? e.getContext('2d') : null;
  };

  render() {
    return <canvas className={styles.chart} ref={this.setContainer} />;
  }
}
