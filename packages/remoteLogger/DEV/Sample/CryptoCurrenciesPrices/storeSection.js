import createCryptoCurrenciesPricesReduxStoreSection from './createCryptoCurrenciesPricesReduxStoreSection';

const {
  initialState,
  mapDispatchToProps,
  mapStateToProps,
  reducers,
} = createCryptoCurrenciesPricesReduxStoreSection('crypto');

export { initialState };
export { mapDispatchToProps };
export { mapStateToProps };
export { reducers };

export default {
  initialState,
  mapDispatchToProps,
  mapStateToProps,
  reducers,
};
