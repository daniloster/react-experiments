import { connect } from 'react-redux';
import ScheduleTypes from './ScheduleTypes';
import { createCrudReduxSection } from '../Crud';
import getScheduleTypesEndpoint from './getScheduleTypesEndpoint';

const storeSection = 'scheduleTypes';
const {
  mapStateToProps,
  reducers: scheduleTypesReducers,
  mapDispatchToProps: mapDispatchToPropsScheduleTypes,
} = createCrudReduxSection(getScheduleTypesEndpoint, storeSection);

export { ScheduleTypes };
export { scheduleTypesReducers };
export { mapDispatchToPropsScheduleTypes };

const defaultComponent = connect(
  mapStateToProps,
  mapDispatchToPropsScheduleTypes,
)(ScheduleTypes);

export default defaultComponent;
