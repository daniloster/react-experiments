import React from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';

/**
 * Creates the structure of the user form
 * @param {object} props
 */
export default function createUserFormItems(props) {
  const {
    component,
    onChangePasswordHandler,
    onSaveHandler,
    btnSaveClassName,
    status,
  } = props;

  return [
    ({ item, onSave, ...otherProps }) => (
      <Field
        label="Email"
        id="email"
        type="email"
        value={item.email}
        data-property-name="email"
        {...otherProps}
        hasBar
      />
    ),
    ({ item, onSave, ...otherProps }) => (
      <Field
        label="Firstname"
        id="firstname"
        type="text"
        value={item.firstname}
        data-property-name="firstname"
        {...otherProps}
        hasBar
      />
    ),
    ({ item, onSave, ...otherProps }) => (
      <Field
        label="Lastname"
        id="lastname"
        type="text"
        value={item.lastname}
        data-property-name="lastname"
        {...otherProps}
        hasBar
      />
    ),
    ({ item, key }) => (
      <Field
        label="Password"
        id="password"
        type="password"
        onChange={onChangePasswordHandler}
        value={component.state.password}
        key={key}
        hasBar
      />
    ),
    ({ item, key }) => (
      <Field
        label="Confirm password"
        id="confirmPassword"
        type="password"
        onChange={onChangePasswordHandler}
        value={component.state.confirmPassword}
        key={key}
        hasBar
      />
    ),
    ({ key }) => (
      <Button
        type="submit"
        className={btnSaveClassName}
        onClick={onSaveHandler}
        key={key}
      >
        Salvar
      </Button>
    ),
  ];
}
