import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'mutation-helper';

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
     * Render function
     * @type ({
     *  data,
     *  schemaData,
     *  onChangeValue,
     *  setData,
     *  setShouldValidate,
     *  shouldValidate,
     * }) => <Component />
     */
    children: PropTypes.func.isRequired, // Function => Renderer
    /**
     * Action function
     * @type (path, value) => ({ActionCreator})
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
    const validation = path ? schemaData[path] : null;
    const validationData =
      shouldValidate && validation && validation.$validate && validation.$validate(value);
    const derivedErrorMessages =
      shouldValidate && validation && validation.$getMessage(value, validationData);

    return (
      <div className="react__form-item">
        {children({
          data,
          path,
          onChangeValue: this.onChangeValue,
          setData,
          setShouldValidate,
          value,
        })}
        {derivedErrorMessages && (
          <div className="react__form-item-validation-message">{derivedErrorMessages}</div>
        )}
      </div>
    );
  };

  render() {
    return this.renderChildren(this.props);
  }
}
