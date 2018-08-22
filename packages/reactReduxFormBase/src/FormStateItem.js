import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import FormContext from './FormContext';
import { getValidation } from './formUtils';

/**
 * FormStateItem
 * It is a proxy component which executes the form flow validation/update
 * provided to fields.
 */
export default class FormStateItem extends Component {
  static propTypes = {
    /**
     * Path defined to change form data.
     */
    path: PropTypes.string,
    /**
     * Render function e.g. (args) => <Component />,
     * where args is an object { data, schemaData, createOnChangeValue, setData }
     */
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {
    path: null,
  };

  getValidate = (schemaData, path) => {
    if (schemaData !== this.oldSchemaData || path !== this.oldPath) {
      this.oldSchemaData = schemaData;
      this.oldPath = path;
      const validate = getValidation(schemaData, path);
      this.validate = (args) => {
        if (args.value !== this.oldValue || path !== this.oldPath) {
          this.oldValue = args.value;
          this.oldPath = path;
          this.validationResult = [validate(args)];
          this.validationResult.push(this.validationResult[0].filter(({ isValid }) => !isValid));
        }

        return this.validationResult;
      };
    }

    return this.validate;
  };

  oldSchemaData = Number.NEGATIVE_INFINITY;
  oldPath = Number.NEGATIVE_INFINITY;
  oldValue = Number.NEGATIVE_INFINITY;
  validate = Number.NEGATIVE_INFINITY;
  validationResult = Number.NEGATIVE_INFINITY;

  renderChildren = ({
    addValidations,
    clearValidations,
    createOnChange,
    createOnChangeValue,
    data,
    isAllValid,
    schemaData,
    setData,
  }) => {
    const { children, path } = this.props;
    const value = get(data, path);
    const onChange = createOnChange(path);
    const onChangeValue = createOnChangeValue(path);
    const validate = this.getValidate(schemaData, path);
    const [allValidations, validations] = validate && validate({ data, path, value });
    addValidations(...allValidations);

    return children({
      addValidations,
      clearValidations,
      isAllValid,
      data,
      path,
      onChange,
      onChangeValue,
      setData,
      validations,
      value,
    });
  };

  render() {
    return <FormContext.Consumer>{this.renderChildren}</FormContext.Consumer>;
  }
}
