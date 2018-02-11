import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import styles from './SplashScreen.scss';

export default class SplashScreen extends PureComponent {
  static propTypes = {
    isApplicationReady: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    isApplicationReady: false,
    children: undefined,
  }

  render() {
    const {
      isApplicationReady,
      children,
    } = this.props;

    if (isApplicationReady) {
      return children;
    }

    return (
      <div className={styles.splashScreen}>
        <div className={styles.splash}></div>
        <span>Por favor, aguarde um segundinho enquanto a aplicação é personalizada para que você tenha uma boa experiência...</span>
      </div>
    );
  }
}
