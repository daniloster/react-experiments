import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import Button from '../../../components/Button';
import Icon from '../../../components/Icon';

// import baseStyles from 'daniloster-base-styles/lib/base.scss';
import crudStyles from '../../Crud/Crud.scss';
import styles from '../Account.scss';

class HeaderUsers extends PureComponent {
  render() {
    return (
      <tr className={styles.header}>
        <th className={styles.header}>
          <div>Email</div>
        </th>
        <th className={styles.header}>
          <div>Nome</div>
        </th>
        <th className={styles.header}>
          <div>Sobrenome</div>
        </th>
        <th className={styles.header}>
          <div>Telefone</div>
        </th>
        <th className={`${crudStyles.tableHeader} ${crudStyles.tableOption}`} />
        <th className={`${crudStyles.tableHeader} ${crudStyles.tableOption}`} />
      </tr>
    );
  }
}

class UserRow extends PureComponent {
  render() {
    const { className, data, isEven, onEdit } = this.props;

    const finalClassName = classnames(styles.row, {
      [className]: className,
      // [baseStyles.rowEven]: isEven,
      // [baseStyles.rowOdd]: !isEven,
    });

    return (
      <tr className={finalClassName}>
        <td>{data.email}</td>
        <td>{data.firstname}</td>
        <td>{data.lastname}</td>
        <td>{data.phone}</td>
        <td className={`${crudStyles.tableHeader} ${crudStyles.tableOption}`}>
          <Button type="button" data-id={data.id} onClick={onEdit} title="Edit" isIconButton isFlat>
            <Icon name="mode edit" />
          </Button>
        </td>
        <td className={`${crudStyles.tableHeader} ${crudStyles.tableOption}`}>
          <Link to={`/clientes/${data.id}/pets`} title="Visualizar Pets">
            <Icon name="mode edit" />
          </Link>
        </td>
      </tr>
    );
  }
}

class ListUsers extends PureComponent {
  static propTypes = {
    /**
     * className for changing styles on the container.
     */
    className: PropTypes.string,
    /**
     * Event to change view to update info.
     */
    onEdit: PropTypes.func.isRequired,
    /**
     * Event to change view to non-editable view.
     */
    onView: PropTypes.func.isRequired,
    /**
     * className to change the row styles.
     */
    rowClassName: PropTypes.string,
    /**
     * List of users to display.
     */
    users: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    className: '',
    rowClassName: '',
    users: [],
  };
  render() {
    const { className, rowClassName, users } = this.props;
    const finalClassName = classnames(crudStyles.list, styles.tableWrapper, {
      [className]: className,
    });

    return (
      <div className={finalClassName}>
        <table>
          <thead>
            <HeaderUsers />
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <UserRow
                  className={rowClassName}
                  data={user}
                  key={user.email}
                  onEdit={this.onEdit}
                  onView={this.onView}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListUsers;
