import React, {
  PropTypes,
} from 'react';

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
