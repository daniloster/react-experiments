import { connect } from 'react-redux';
import RequestResetPasswordForm from './RequestResetPasswordForm';
import ResetPassword from './ResetPassword';
import SaveNewPasswordForm from './SaveNewPasswordForm';
import {
  mapDispatchToProps,
} from '../accountRedux';

export { RequestResetPasswordForm };
export { ResetPassword };
export { SaveNewPasswordForm };

function mapStateToProps(state, ownProps) {
  const {
    auth,
  } = state;

  return {
    ...auth,
    ...ownProps,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
