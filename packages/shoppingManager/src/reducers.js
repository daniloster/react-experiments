import {
  reducers as authReducers,
  mapDispatchToProps as mapDispatchToPropsAuth,
} from './containers/Account';
import { dropdownReducers, mapDispatchToPropsDropdownContainer } from './containers/CrudContainer';
import { itemsReducers, mapDispatchToPropsItems } from './containers/Items';
import { scheduleTypesReducers, mapDispatchToPropsScheduleTypes } from './containers/ScheduleTypes';

const authActions = Object.keys(authReducers).pop();
const dropdownActions = Object.keys(dropdownReducers).pop();
const itemActions = Object.keys(itemsReducers).pop();
const scheduleTypesActions = Object.keys(scheduleTypesReducers).pop();

export const allActions = {
  [authActions]: mapDispatchToPropsAuth,
  [dropdownActions]: mapDispatchToPropsDropdownContainer,
  [itemActions]: mapDispatchToPropsItems,
  [scheduleTypesActions]: mapDispatchToPropsScheduleTypes,
};

export function mapDispatchToProps({ dispatch }, actions = allActions) {
  return Object.keys(actions).reduce((previousMap, key) => {
    const map = { ...previousMap };
    if (typeof actions[key] === 'function') {
      map[key] = (...args) => dispatch(actions[key](...args));
    } else if (typeof actions[key] === 'object') {
      map[`${key}Actions`] = mapDispatchToProps({ dispatch }, actions[key]);
    }
    return map;
  }, {});
}

export function createMapStateToProps(actions) {
  return function mapStateToProps(state, ownProps) {
    // console.log('ownProps', ownProps);
    return {
      ...state,
      ...actions,
      ...ownProps,
    };
  };
}

export default {
  ...authReducers,
  ...dropdownReducers,
  ...itemsReducers,
  ...scheduleTypesReducers,
};
