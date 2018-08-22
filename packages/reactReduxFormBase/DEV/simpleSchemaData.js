import React from 'react';
import { combineValidations } from '../src/formUtils';

export default {
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
