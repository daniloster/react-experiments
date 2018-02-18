import React from 'react';
import PropTypes from 'prop-types';

import styles from './HelloWorld.scss';

/**
 * HelloWorld may be used as below.
 * E.g.
 * ```js
 * <HelloWorld>My message!</HelloWorld>
 * ```
 */
const HelloWorld = (props) => {
  const { children } = props;
  return <div className={styles.helloWorld}>{children}</div>;
};
HelloWorld.propTypes = {
  /**
   * children is a string which will be wrapped by a div element.
   */
  children: PropTypes.string.isRequired,
};

export default HelloWorld;
