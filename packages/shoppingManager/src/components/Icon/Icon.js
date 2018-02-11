import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Icon.scss';

/**
 * Icon
 * This is a facade for FontAwesome component "react-fa". It is
 * done due to maintainability in case the Icon library needs to
 * be changed.
 * @param {object} props
 */
const Icon = ({ className, name, pulse, spin, ...props }) => {
  const finalClassName = classnames('icon', className, { [styles.pulse]: pulse });
  return (<i className={finalClassName} {...props}>{name.replace(/(\s+)/igm, '_')}</i>);
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  pulse: PropTypes.bool,
  size: PropTypes.string,
  spin: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  pulse: false,
  size: '2',
  spin: false,
};

export default Icon;
