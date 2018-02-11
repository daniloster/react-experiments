import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Route,
  Switch,
} from 'react-router-dom';
import If from 'daniloster-if';

import ClientAppView from '../ClientAppView';
import ManagerAppView from '../ManagerAppView';

import AccountDropdownButton from '../Account/AccountDropdownButton';
import SignInForm from '../Account/SignInForm';
import SignUpForm from '../Account/SignUpForm';
import AccountStatus from '../Account/AccountStatus';
import Field from '../../components/Field';
import NavigationHeader from '../../components/NavigationHeader';
import SplashScreen from '../../components/SplashScreen';
import Footer from '../../components/Footer';

import styles from './AppView.scss';

class AppView extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    children: null,
  }

  state = {
    isSignInFormVisible: true,
    isSignUpFormVisible: false,
  }

  componentDidCatch(error, info) {
    console.log('CAPTURED ERROR', error, info);
  }

  exclusiveShowSignIn = () => {
    this.setState({
      isSignInFormVisible: true,
      isSignUpFormVisible: false,
    });
  }

  exclusiveShowSignUp = () => {
    this.setState({
      isSignInFormVisible: false,
      isSignUpFormVisible: true,
    });
  }

  render() {
    const {
      className,
      auth,
      authActions,
      children,
      ...otherProps,
    } = this.props;
    const {
      user,
    } = auth;
    const {
      isSignInFormVisible,
      isSignUpFormVisible,
    } = this.state;

    const isSignedIn = auth.status.SignIn === AccountStatus.Done
      && auth.user && auth.user.id;

    const containerClassNames = classnames(
      styles.applicationContainer,
      {
        className,
        [styles.centredSignInForm]: !isSignedIn && isSignInFormVisible,
        [styles.centredSignUpForm]: !isSignedIn && isSignUpFormVisible,
      }
    );

    return (
      <SplashScreen isApplicationReady={auth.isApplicationReady}>
        {isSignedIn && (
          <div className={containerClassNames}>
            <NavigationHeader>
              <AccountDropdownButton
                auth={auth}
                authActions={authActions}
                className={styles.accountButton}
                onNavigateToSignUp={this.exclusiveShowSignUp}
              />
            </NavigationHeader>

            <If
              expression={user.isAdmin}
              then={() => <ManagerAppView />}
              otherwise={() => <ClientAppView />}
            />

          </div>
        )}
        {!isSignedIn && (
          <div className={containerClassNames}>
            {isSignInFormVisible && (
              <SignInForm
                className={styles.form}
                {...auth}
                {...authActions}
                onNavigateToSignUp={this.exclusiveShowSignUp}
                onNavigateToResetPassword={this.exclusiveShowResetPassword}
              />
            )}
            {isSignUpFormVisible && (
              <SignUpForm
                className={styles.form}
                {...auth}
                {...authActions}
                onNavigateToSignIn={this.exclusiveShowSignIn}
              />
            )}
          </div>
        )}
        <Footer />
      </SplashScreen>
    );
  }
}

export default AppView;
