import React from 'react';
import { combineValidations } from '../src/formUtils';

export default {
  'contacts[].value': combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <span className="react__form-item-validation-message">Contact is required</span>
    );
    return { data, isValid, message, path };
  }),
  'attributes[]': combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <span className="react__form-item-validation-message">Attribute is required</span>
    );
    return { data, isValid, message, path };
  }),
  age: combineValidations(({ data, path, value }) => {
    const isValid = !!value && /\d+$/g.test(value);
    const message = isValid ? null : (
      <span className="react__form-item-validation-message">Age is required and only accepts numbers</span>
    );
    return { data, isValid, message, path };
  }),
  title: combineValidations(
    ({ data, path, value }) => {
      const isValid = !!value && /^(([m][r])([s]?))/gi.test(value);
      const message = isValid ? null : (
        <span className="react__form-item-validation-message">
          The only allowed ones are {'"Mr"'} or {'"Mrs"'}.
        </span>
      );
      return { data, isValid, message, path };
    },
    ({ data, path, value }) => {
      const isValid = !!value;
      const message = isValid ? null : (
        <span className="react__form-item-validation-message">Title is required!</span>
      );
      return { data, isValid, message, path };
    },
  ),
  firstname: combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <div className="react__form-item-validation-message">Firstname is required</div>
    );
    return { data, isValid, message, path };
  }),
  lastname: combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <div className="react__form-item-validation-message">Lastname is required</div>
    );
    return { data, isValid, message, path };
  }),
  'certificate.description': combineValidations(
    ({ data, path, value }) => {
      const isValid = !!value && /^(((\w+)\s+){9}(\w+))/g.test(value);
      const message = isValid ? null : (
        <div className="react__form-item-validation-message">
          It requires 10 words as description at least.
        </div>
      );
      return { data, isValid, message, path };
    },
    ({ data, path, value }) => {
      const isValid = !!value;
      const message = isValid ? null : (
        <div className="react__form-item-validation-message">Certificate description is required!</div>
      );
      return { data, isValid, message, path };
    },
  ),
};
