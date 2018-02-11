import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Form.scss';

const identity = () => {
  // do nothing
};

class Field extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    componentRef: PropTypes.func,
    isInvalid: PropTypes.bool,
    hasBar: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    componentRef: identity,
    isInvalid: false,
    hasBar: false,
    label: '',
    placeholder: '',
    value: '',
  }

  render() {
    const {
      id,
      label,
      className,
      componentRef,
      hasNoBinding,
      hasBar,
      isInvalid,
      value,
      ...otherProps,
    } = this.props;
    const finalClassName = classnames(
      className,
      styles.field,
      { [styles.invalid]: isInvalid },
    );

    return (
      <div className={finalClassName}>
        <input
          type="text"
          id={id}
          {...otherProps}
          data-value={value}
          value={value}
          ref={componentRef}
        />
        {label && (<label htmlFor={id}>{label}</label>)}
        {hasBar && (<div className={styles.bar}></div>)}
      </div>
    );
  }
}

export default Field;
