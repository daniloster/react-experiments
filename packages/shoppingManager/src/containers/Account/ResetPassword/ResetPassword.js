import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import If from 'daniloster-if';
import AccountStatus from '../AccountStatus';
import AccountStatusArea from '../AccountStatusArea';

import RequestResetPasswordForm from './RequestResetPasswordForm';
import SaveNewPasswordForm from './SaveNewPasswordForm';

// import Field from '../../../components/Field';
// import Button from '../../../components/Button';
// import StatusIcon from '../../../components/StatusIcon';

import styles from '../Account.scss';

/**
 * ResetPassword
 * Redefines the user password based on the code provided, email and new password.
 * This is the container which decides scene based on the presence of the token code.
 */
class ResetPassword extends PureComponent {
  static propTypes = {
    /**
     * className applied to the container element in order to change styles from outer world.
     */
    className: PropTypes.string,
    /**
     * Reset password based on code from Url.
     */
    onResetPassword: PropTypes.func.isRequired,
    /**
     * Request to reset the password.
     */
    onRequestResetPassword: PropTypes.func.isRequired,
    /**
     * Status represents the state of an area.
     */
    status: PropTypes.shape({}),
  }

  static defaultProps = {
    className: '',
    status: {},
  }

  static contextTypes = {
    router: PropTypes.shape({}).isRequired
  }

  state = {
    email: '',
  }

  componentWillMount() {
    const {
      router: { route: { location } },
    } = this.context;
    // mode=<action>&oobCode=<code>
    const queryString = location.search.substring(1)
    const params = new URLSearchParams(queryString);
    this.isRequest = !params.get('oobCode');
  }

  componentWillUnmount() {
    const {
      status,
      setStatus,
    } = this.props;

    setStatus(AccountStatusArea.ResetPassword, AccountStatus.Initial);
    // if (status.ResetPassword !== AccountStatus.Initial) {
    //   setStatus(AccountStatusArea.ResetPassword, AccountStatus.Initial);
    // }
  }

  onResetPassword = (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    this.props.onResetPassword(code, email, password);
  }

  onChange = (e) => {
    const prop = e.target.getAttribute('prop-name');
    this.setState({
      [prop]: e.target.value,
    });
  }

  render() {
    if (this.isRequest) {
      return (
        <RequestResetPasswordForm
          {...this.props}
          className={styles.resetPasswordForm}
        />
      );
    }

    return (
      <SaveNewPasswordForm
          {...this.props}
          className={styles.resetPasswordForm}
        />
    );
  }
}

export default ResetPassword;
