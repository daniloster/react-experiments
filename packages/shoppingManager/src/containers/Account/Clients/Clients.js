import React, {
  PureComponent,
} from 'react';
import classnames from 'classnames';
import ListUsers from './ListUsers';

import crudStyles from '../../Crud/Crud.scss';
import styles from '../Account.scss';

export default class Clients extends PureComponent {
  componentWillMount() {
    if (!this.props.isUsersLoaded) {
      this.props.onListUsers();
    }
  }

  render() {
    const {
      className,
      clients,
      ...otherProps,
    } = this.props;
    const finalClassName = classnames(
      styles.clientsContainer,
      crudStyles.items,
      { [className]: className },
    );

    return (
      <div className={finalClassName}>
        <h2 className={classnames(crudStyles.header, styles.header)}>Clientes</h2>
        <ListUsers
          {...otherProps}
          users={clients}
          onView={() => ({})}
          onEdit={() => ({})}
        />
      </div>
    );
  }
}
