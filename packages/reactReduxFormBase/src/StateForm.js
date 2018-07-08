import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, set } from 'mutation-helper';
import FormContext from './FormContext';
import { noop } from './formUtils';

/**
 * StateForm
 * Container for StateFormItem elements which provides data access
 */
export default class StateForm extends Component {
  static propTypes = {
    /**
     * Elements of the form rendered
     */
    children: PropTypes.node.isRequired,
    /**
     * CSS classes
     */
    className: PropTypes.string,
    /**
     * Tag name used as container
     */
    tagName: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * Initial data provided
     */
    data: PropTypes.shape({}),
    /**
     * Function to propagate change of the data
     * @type Function(path, value)
     */
    onChange: PropTypes.func,
    /**
     * Schema of validation
     * @type { [string]: { $validate: function, $getMessage: function } }
     */
    schemaData: PropTypes.shape({}),
    /**
     * Function to propagate settting the data
     * @type Function(data)
     */
    setData: PropTypes.func,
    /**
     * Defines when the validation should be applied
     */
    shouldValidate: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    data: {},
    tagName: 'form',
    onChange: null,
    schemaData: {},
    setData: noop,
    shouldValidate: false,
  };

  state = {
    data: this.props.data,
    createOnChangeValue: path => this.createOnChangeValue(path),
    schemaData: this.props.schemaData,
    setData: data => this.setData(data),
    shouldValidate: this.props.shouldValidate,
  };

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const state = {};
    const {
      data: oldData,
      schemaData: oldSchemaData,
      shouldValidate: oldShouldValidate,
    } = this.props;
    const { data, schemaData, shouldValidate } = nextProps;

    if (oldSchemaData !== schemaData) {
      state.schemaData = schemaData;
    }

    if (oldData !== data) {
      state.data = data;
    }

    if (oldShouldValidate !== shouldValidate) {
      state.shouldValidate = shouldValidate;
    }

    if (Object.keys(state).length) {
      this.setState(state);
    }
  }

  onChange = (path, value) => {
    const { props: { onChange }, state: { data } } = this;

    if (onChange) {
      onChange(path, value);
      return;
    }

    if (get(data, path) !== value) {
      this.state.setData(set(data, path, value));
    }
  };

  setData = (data) => {
    const { setData } = this.props;
    this.setState({ data }, () => setData(data));
  };

  createOnChangeValue = (path) => {
    this.memoization = this.memoization || {};

    if (!this.memoization[path]) {
      this.memoization[path] = (e) => {
        const value = e.target.value;
        this.onChange(path, value);
      };
    }

    return this.memoization[path];
  };

  render() {
    const { className, children, tagName } = this.props;
    const Container = tagName;

    return (
      <Container className={classnames(className, 'react__form-container')}>
        <FormContext.Provider value={this.state}>{children}</FormContext.Provider>
      </Container>
    );
  }
}
