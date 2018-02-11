import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import If from 'daniloster-if';
import Button from '../../components/Button';
import Flyout from '../../components/Flyout';
import Icon from '../../components/Icon';
import SignInForm from './SignInForm';

import styles from './Account.scss';

class AccountDropdownButton extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    auth: PropTypes.shape({}),
    authActions: PropTypes.shape({}),
    onNavigateToSignUp: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
    auth: {},
    authActions: {},
  }

  state = {
    isDropdownVisible: false,
  }

  componentWillMount() {
    document.on('click', this.onClickOut);
  }

  componentWillUnmount() {
    document.off('click', this.onClickOut);
  }

  onClick = () => {
    this.setState(({ isDropdownVisible }) => ({
      isDropdownVisible: !isDropdownVisible,
    }));
  }

  onClickOut = (e) => {
    if (!this.state.isDropdownVisible || this.container.contains(e.target)) {
      return;
    }

    this.setState({
      isDropdownVisible: false,
    });
  }

  setContainer = (el) => {
    this.container = el;
  }

  render() {
    const {
      className,
      auth,
      authActions,
      onNavigateToSignUp,
    } = this.props;
    const {
      isDropdownVisible,
    } = this.state;

    const finalClassName = [
      className,
      styles.accountButtonContainer,
    ].join(' ');

    const isLoggedIn = Boolean(auth && auth.user && auth.user.id);

    return (
      <div className={finalClassName} ref={this.setContainer}>
        <Button
          className={styles.accountButton}
          isSquare
          isFlat
          onClick={this.onClick}
        >
          <If
            expression={isLoggedIn}
            then={() => <span>{auth.user.firstname} {auth.user.lastname}</span>}
            otherwise={() => <span>Account</span>}
          />
          <Icon name="account circle" />
        </Button>
        <If
          expression={isDropdownVisible}
          then={() => (
            <Flyout
              className={[
                styles.accountFlyout,
                styles.minimal,
              ].join(' ')}
            >
              <SignInForm
                {...auth}
                {...authActions}
                onNavigateToSignUp={onNavigateToSignUp}
                isMinimalistic
              />
            </Flyout>
          )}
        />
      </div>
    );
  }
}

export default AccountDropdownButton;
