import { connect } from 'react-redux';
import CryptoCurrenciesPrices from './CryptoCurrenciesPrices';
import { mapDispatchToProps, mapStateToProps, initialState } from './storeSection';
// import connect from '../../../src/connect';

export { initialState };

export default connect(mapStateToProps, mapDispatchToProps)(CryptoCurrenciesPrices);
