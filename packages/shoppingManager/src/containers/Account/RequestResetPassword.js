import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import If from 'daniloster-if';
import AccountStatus from './AccountStatus';
import AccountStatusArea from './AccountStatusArea';

import Field from '../../components/Field';
import Button from '../../components/Button';
import StatusIcon from '../../components/StatusIcon';

import styles from './Account.scss';

/**
 * SignInForm
 * Sign in form which captures the email and password and submit the login action.
 */
class RequestResetPasswordForm extends Component {
  static propTypes = {
    /**
     * className applied to the container element in order to change styles from outer world.
     */
    className: PropTypes.string,
    /**
     * identifies when should show a minimalistic version
     */
    isMinimalistic: PropTypes.bool,
    /**
     * login action which receives an object with { email, password }
     */
    onChangeStatus: PropTypes.func.isRequired,
    /**
     * send current user to sign up form
     */
    onNavigateToSignUp: PropTypes.func.isRequired,
    /**
     * login action which receives an object with { email, password }
     */
    onSignIn: PropTypes.func.isRequired,
    /**
     * logout action which removes the current user active
     */
    onSignOut: PropTypes.func.isRequired,
    /**
     * status represents the state of one area.
     */
    status: PropTypes.shape({}),
    /**
     * user logged in.
     */
    user: PropTypes.shape({}),
  }

  static defaultProps = {
    className: '',
    isMinimalistic: false,
    status: {},
    user: null,
  }

  state = {
    email: '',
    password: '',
  }

  onLogin = (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    this.props.onSignIn(email, password);
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.onSignOut();
  }

  onChange = (e) => {
    const type = e.target.getAttribute('type');
    this.setState({
      [type]: e.target.value,
    });
  }

  onNavigateToSignUp = (e) => {
    this.props.onNavigateToSignUp();
  }

  render() {
    const {
      className,
      isMinimalistic,
      status,
      user,
    } = this.props;
    const {
      email,
      password,
    } = this.state;

    const containerClassNames = [
      styles.form,
      className,
    ].join(' ');

    const isSignedIn = status.SignIn === AccountStatus.Done
      && user && user.id;
    const isSignedOut = !isSignedIn;

    if (isSignedOut) {
      return (
        <form className={containerClassNames}>
          <h2 className={styles.header}>
            Sign in
          </h2>
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={this.onChange}
            value={email}
            hasBar
          />
          <Field
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={this.onChange}
            value={password}
            hasBar
          />
          <Button
            type="submit"
            className={styles.button}
            onClick={this.onLogin}
          >
            Login <StatusIcon status={status.SignIn} />
          </Button>
          <span>
            Enter your credentials, then, click on "Login". Or
            <Button isLink onClick={this.onNavigateToSignUp}>sign up</Button>
            to create a new account.
          </span>
        </form>
      );
    }

    return (
      <form className={containerClassNames}>
        <If
          expression={!isMinimalistic}
          then={() => (
            <h2 className={styles.header}>
              Sign Out
            </h2>
          )}
        />
        <Button
          className={styles.button}
          isSquare={isMinimalistic}
          onClick={this.onLogout}
          type="submit"
        >
          Logout <StatusIcon status={status.SignOut} />
        </Button>
        <span>Click on "Logout" to sign out.</span>
      </form>
    );
  }
}

export default SignInForm;
