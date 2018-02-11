import { connect } from 'react-redux';
import DropdownContainer from './DropdownContainer';
import CrudContainer from './CrudContainer';
import createCrudReduxSection from './createCrudReduxSection';
import crudSagas from './crudSagas';

const storeSection = 'crudData';
const {
  mapStateToProps,
  reducers: dropdownReducers,
  mapDispatchToProps: mapDispatchToPropsDropdown,
} = createCrudReduxSection(storeSection);

const DropdownContainerConnected = connect(
  mapStateToProps,
  mapDispatchToPropsDropdown,
)(DropdownContainer);
const CrudContainerConnected = connect(
  mapStateToProps,
  mapDispatchToPropsDropdown,
)(CrudContainer);

export { CrudContainerConnected };
export { crudSagas };
export { DropdownContainer };
export { DropdownContainerConnected };
export { dropdownReducers };
export { mapDispatchToPropsDropdown };
export { storeSection };

/**
 * Component already connect sharing subsections in the store slice.
 * It would be important to provide props such as:
 * - addButtonLabel {string}
 * - saveButtonLabel {string}
 * - cancelButtonLabel {string}
 * - formTitle {node}
 * - idProperty {string}
 * - onValidate {array<function>}
 * - propertyName {string}
 * - propertyNameLabel {string}
 * - propertyNamePlaceholder {string}
 * - unselectedLabel {string}
 */
export default storeSection;
