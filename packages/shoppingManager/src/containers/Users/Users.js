import React, {
  PureComponent,
} from 'react';
import Crud from '../Crud';
import createUserFormItems from './createUserFormItems';

import styles from './Users.scss';

export default class Users extends PureComponent {
  state = {
    password: '',
    confirmPassword: '',
    isPasswordValid: false,
  }

  componentWillMount() {
    this.tableHeaderCells = [
      () => 'Email',
      () => 'Firstname',
      () => 'Lastname',
    ];

    this.tableBodyCells = [
      ({ item }) => item.email,
      ({ item }) => item.firstname,
      ({ item }) => item.lastname,
    ];

    this.formItems = createUserFormItems({
      component: this,
      btnSaveClassName: styles.save,
      onSaveHandler: this.onSave,
      onChangePasswordHandler: this.onChangePassword,
    });
  }

  onChangePassword = (e) => {
    e.preventDefault();
    const propertyId = e.target.getAttribute('id');
    const otherPropertyId = propertyId === 'password'
      ? 'confirmPassword'
      : 'password';
    const pass1 = e.target.value;
    const pass2 = this.state[otherPropertyId];
    this.setState({
      [propertyId]: e.target.value,
      isPasswordValid: pass1 === pass2 && pass1 !== '',
    });
  }

  onSave = (e) => {
    this.props.onSave(e);
  }

  render() {
    return (
      <Crud
        {...this.props}
        tableHeaderCells={this.tableHeaderCells}
        tableBodyCells={this.tableBodyCells}
        formItems={this.formItems}
        entryType="users"
        title="Usuários"
        addButtonLabel="Limpar para adicionar novo"
      />
    );
  }
}
