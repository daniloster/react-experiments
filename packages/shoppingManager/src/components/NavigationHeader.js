import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

import styles from './NavigationHeader.scss';
// import logo from './Logo/logo.svg';
// import logo from './Logo/dogPawPrint.svg';
import logo from './Logo/dogPaw.svg';
// const logo = null;

const Logo = () => (
  <img className={styles.logoPicture} src={logo} title="Shopping Manager Logo" />
  // <i className={styles.logoPicture}>{logo}</i>
  // <a href="/#/">
  //   <i className={styles.logoPicture} />
  // </a>
);

export default class NavigationHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className={styles.navigationHeaderContainer}>
        <Logo />
        <div className={styles.settings}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
