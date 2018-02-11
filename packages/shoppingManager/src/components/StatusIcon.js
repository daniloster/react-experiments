import React from 'react';
import Icon from './Icon';

import styles from './Form.scss';

const Error = () => (
  <Icon className={styles.error} name="error" size="2x" />
);

const icon = {
  Info: () => (
    <Icon className={styles.info} name="info" size="2x" />
  ),
  Loading: () => (
    <Icon className={styles.loading} name="spinner" size="2x" pulse />
  ),
  Success: () => (
    <Icon className={styles.success} name="check circle" size="2x" />
  ),
  ErrorAuthentication: Error,
  Error,
};

const StatusIcon = ({ status }) => (
  (icon[status] || (() => false))()
);

export default StatusIcon;
