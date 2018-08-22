import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getValidation } from './formUtils';

/**
 * Model
 * It is a proxy component which executes the form flow validation/update
 * provided to fields from a redux store.
 */
export default class Model extends PureComponent {
  static propTypes = {
    /**
     * Path defined to change form data.
     */
    path: PropTypes.string,
    /**
     * Render function e.g. ({ data, schemaData, onChangeValue, setData, setShouldValidate, shouldValidate }) => <Component />
     */
    children: PropTypes.func.isRequired, // Function => Renderer
    /**
     * Action function e.g. (path, value) => ({ActionCreator})
     */
    onChangeValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    path: null,
  };

  onChangeValue = (e) => {
    const { path, onChangeValue } = this.props;
    onChangeValue(path, e.target.value);
  };

  getDataValue = (data, path) => {
    if (path !== this.path || data !== this.data) {
      this.data = data;
      this.path = path;
      this.value = path === null ? data : get(data, path);
    }

    return this.value;
  };

  renderChildren = (connectedProps) => {
    const { dataName, schemaData, setData, setShouldValidate, shouldValidate } = connectedProps;
    const data = connectedProps[dataName];
    const { children, path } = this.props;
    const value = this.getDataValue(data, path);
    const validate = getValidation(schemaData, path);
    const validations = shouldValidate && validate && validate({ data, path, value });

    return (
      <div className="react__form-item">
        {children({
          data,
          path,
          onChangeValue: this.onChangeValue,
          setData,
          setShouldValidate,
          value,
          validations,
        })}
      </div>
    );
  };

  render() {
    return this.renderChildren(this.props);
  }
}
