import { takeLatest, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { fixedConstants, $setPrices } from './createCryptoCurrenciesPricesReduxStoreSection';
import invokeRequest from 'daniloster-utils/lib/invokeRequest';
import axios from 'axios';
import logger from '../logger';

export const timingRefreshPrices = logger.timeEffect(call, function* onRefreshPrices({ endpoints, selectedCurrencies, setPricesConstant }) {
  yield put($setPrices([], setPricesConstant));
  yield call(delay, 500);
  const responses = yield endpoints.map(url => call(invokeRequest, axios.request, { url, method: 'GET' }));
  const prices = responses.reduce((transientPrices, { error, data, status }, index) => {
    if (status === 200 && data && data.length) {
      const currency = selectedCurrencies[index].toLowerCase();
      return data.map((priceCrypto) => {
        const {
          [`price_${currency}`]: price,
          [`24h_volume_${currency}`]: volume24h,
          [`market_cap_${currency}`]: marketCap,
          price_usd: priceUSD,
          ['24h_volume_usd']: volume24hUSD,
          market_cap_usd: marketCapUSD,
          last_updated: lastUpdated,
          rank,
          ...otherCryptoInfo,
        } = priceCrypto;
        const currentPriceGroups = (transientPrices[index] || { priceGroups: [] }).priceGroups;

        return {
          ...otherCryptoInfo,
          lastUpdated: Number(lastUpdated),
          rank,
          priceGroups: currentPriceGroups.concat(
            (transientPrices.length === 0
            ? [
              {
                currency: 'USD',
                price: Number(priceUSD),
                volume24h: Number(volume24hUSD),
                marketCap: Number(marketCapUSD),
              },
            ]
            : []).concat([
              {
                currency: selectedCurrencies[index],
                price: Number(price),
                volume24h: Number(volume24h),
                marketCap: Number(marketCap),
              },
            ]),
          ),
        };
      });
    }

    return transientPrices;
  }, []);

  yield put($setPrices(prices, setPricesConstant));
});

export function* watcRefreshPrices() {
  yield* takeLatest(fixedConstants.REFRESH_PRICES, timingRefreshPrices);
}

export default function* () {
  yield fork(watcRefreshPrices);
}
