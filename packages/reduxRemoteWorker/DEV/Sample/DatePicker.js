// import { connect } from 'react-redux';
import DatePicker, { createReduxStoreSection } from 'daniloster-date-picker';
import connect from '../../src/connect';

const { mapDispatchToProps, initialState: initialStateDatePicker } = createReduxStoreSection(
  'datePicker',
);

export const initialState = {
  datePicker: initialStateDatePicker,
};

export function mapStateToProps({ datePicker }, ownProps) {
  return {
    ...datePicker,
    ...ownProps,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
