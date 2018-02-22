import { takeLatest, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { fixedConstants, $setPrices } from './createCryptoCurrenciesPricesReduxStoreSection';
import invokeRequest from 'daniloster-utils/lib/invokeRequest';
import axios from 'axios';

export function* onRefreshPrices({ endpoints, selectedCurrencies, setPricesConstant }) {
  console.log($setPrices, setPricesConstant);
  yield put($setPrices([], setPricesConstant));
  console.log('About to delay...');
  yield call(delay, 500);
  console.log('Delayed...');

  const responses = yield endpoints.map(url => call(invokeRequest, axios.request, { url, method: 'GET' }));
  console.log('Requested...', responses);

  //   {
  //     "id": "tether",
  //     "name": "Tether",
  //     "symbol": "USDT",
  //     "rank": "18",
  //     "price_btc": "0.00009664",
  //     "price_usd": "1.00092",
  //     "24h_volume_usd": "3684570000.0",
  //     "market_cap_usd": "2219180583.0",
  //     "available_supply": "2217140814.0",
  //     "total_supply": "2280109970.0",
  //     "max_supply": null,
  //     "percent_change_1h": "0.2",
  //     "percent_change_24h": "0.06",
  //     "percent_change_7d": "-0.11",
  //     "last_updated": "1519251545",
  //     "price_brl": "3.261773073",
  //     "24h_volume_brl": "12007184601.8",
  //     "market_cap_brl": "7231810205.0"
  // },
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
}

export function* watcRefreshPrices() {
  yield* takeLatest(fixedConstants.REFRESH_PRICES, onRefreshPrices);
}

export default function* () {
  yield fork(watcRefreshPrices);
}
