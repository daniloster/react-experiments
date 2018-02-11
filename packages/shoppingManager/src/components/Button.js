import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import styles from './Form.scss';

class Button extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    isCommon: PropTypes.bool,
    isFlat: PropTypes.bool,
    isIconButton: PropTypes.bool,
    isLink: PropTypes.bool,
    isSquare: PropTypes.bool,
    type: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    children: undefined,
    isCommon: false,
    isFlat: false,
    isIconButton: false,
    isLink: false,
    isSquare: false,
    type: 'button',
  }

  render() {
    const {
      className,
      children,
      hasEffect,
      isCommon,
      isFlat,
      isIconButton,
      isLink,
      isSquare,

      ...otherProps,
    } = this.props;
    const finalClassName = [
      className,
      isIconButton ? styles.iconButton : '',
      isLink ? styles.link : styles.button,
      isFlat ? styles.flat : '',
      isCommon ? styles.common : '',
      isSquare ? styles.square : '',
    ].join(' ');

    return (
      <button
        className={finalClassName}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
