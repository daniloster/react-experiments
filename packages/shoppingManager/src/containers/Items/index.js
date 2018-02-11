import { connect } from 'react-redux';
import Items from './Items';
import { createCrudReduxSection } from '../Crud';
import getItemsEndpoint from './getItemsEndpoint';

const storeSection = 'items';
const {
  mapStateToProps,
  reducers: itemsReducers,
  mapDispatchToProps: mapDispatchToPropsItems,
} = createCrudReduxSection(getItemsEndpoint, storeSection);

export { Items };
export { itemsReducers };
export { mapDispatchToPropsItems };

const defaultComponent = connect(
  mapStateToProps,
  mapDispatchToPropsItems,
)(Items);

export default defaultComponent;
