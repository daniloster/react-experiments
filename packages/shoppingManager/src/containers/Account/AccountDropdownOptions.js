import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import If from 'daniloster-if';
import Icon from '../../components/Icon';

import styles from './Account.scss';

class AccountDropdownOptions extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    auth: PropTypes.shape({}),
    authActions: PropTypes.shape({})
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
        AccountDropdownOptions
      </div>
    );
  }
}

export default AccountDropdownOptions;
