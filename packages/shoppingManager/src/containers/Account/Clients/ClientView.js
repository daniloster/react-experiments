import React, {
  PureComponent,
} from 'react';
import classnames from 'classnames';
import ListUsers from './ListUsers';

import styles from '../Account.scss';

export default class ClientView extends PureComponent {
  componentWillMount() {
    if (!this.props.isUsersLoaded) {
      this.props.onListUsers();
    }
  }

  render() {
    const {
      className,
      client,
      ...otherProps,
    } = this.props;
    const finalClassName = classnames(
      styles.clientContainer,
      { [className]: className },
    );

    return (
      <div className={finalClassName}>
        {JSON.stringify(client, null, 2)}
      </div>
    );
  }
}
