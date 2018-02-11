import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import styles from './Flyout.scss';

const Flyout = ({ className, children, ...otherProps }) => {
  const finalClassNames = [
    className,
    styles.flyout,
  ].join(' ');

  return (
    <div className={finalClassNames} {...otherProps}>
      {children}
    </div>
  );
};

Flyout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Flyout.defaultProps = {
  className: '',
  children: null,
};

export default Flyout;
