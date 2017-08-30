import React from 'react';
import PropTypes from 'prop-types';

import styles from './HelloWorld.scss';

const HelloWorld = (props) => {
  const {
    children,
  } = props;
  return (
    <div
      className={styles.helloWorld}
    >{children}</div>
  );
};
HelloWorld.propTypes = {
  children: PropTypes.string.isRequired,
};

export default HelloWorld;
