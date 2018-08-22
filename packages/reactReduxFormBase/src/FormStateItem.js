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

  renderChildren = ({
    addValidations,
    clearValidations,
    isAllValid,
    data,
    schemaData,
    createOnChangeValue,
    setData,
  }) => {
    const { children, path } = this.props;
    const value = get(data, path);
    const onChangeValue = createOnChangeValue(path);
    const validate = getValidation(schemaData, path);
    const allValidations = validate && validate({ data, path, value });
    const validations = allValidations.filter(({ isValid }) => !isValid);
    addValidations(...allValidations);

    return children({
      addValidations,
      clearValidations,
      isAllValid,
      data,
      path,
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
