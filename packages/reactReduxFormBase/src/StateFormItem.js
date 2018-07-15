import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'mutation-helper';

import FormContext from './FormContext';
import { getValidation } from './formUtils';

/**
 * StateFormItem
 * It is a proxy component which executes the form flow validation/update
 * provided to fields.
 */
export default class StateFormItem extends Component {
  static propTypes = {
    /**
     * Path defined to change form data.
     */
    path: PropTypes.string.isRequired,
    /**
     * Render function e.g. ({ data, schemaData, createOnChangeValue, setData, shouldValidate }) => <Component />
     */
    children: PropTypes.func.isRequired,
  };

  renderChildren = ({ data, schemaData, createOnChangeValue, setData, shouldValidate }) => {
    const { children, path } = this.props;
    const value = get(data, path);
    const validation = getValidation(schemaData, path);
    const validationData =
      shouldValidate && validation && validation.$validate && validation.$validate(value);
    const derivedErrorMessages =
      shouldValidate && validation && validation.$getMessage(value, validationData);
    const onChangeValue = createOnChangeValue(path);

    return (
      <div className="react__form-item">
        {children({
          data,
          path,
          onChangeValue,
          setData,
          value,
        })}
        {derivedErrorMessages && (
          <div className="react__form-item-validation-message">{derivedErrorMessages}</div>
        )}
      </div>
    );
  };

  render() {
    return <FormContext.Consumer>{this.renderChildren}</FormContext.Consumer>;
  }
}
