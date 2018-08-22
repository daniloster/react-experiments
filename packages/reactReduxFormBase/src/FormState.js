import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/fp/set';
import get from 'lodash/get';

import FormContext from './FormContext';
import { noop, addValidations, clearValidations, isAllValid } from './formUtils';

/**
 * FormState
 * Container for FormStateItem elements which provides data access
 */
export default class FormState extends Component {
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
     * Function to propagate change of the data e.g. Function(path, value)
     */
    onChange: PropTypes.func,
    /**
     * Schema of validation e.g. { [string]: { $validate: function, $getMessage: function } }
     */
    schemaData: PropTypes.shape({}),
    /**
     * Function to propagate settting the data e.g. Function(data)
     */
    setData: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    data: {},
    tagName: 'form',
    onChange: null,
    schemaData: {},
    setData: noop,
  };

  state = {
    data: this.props.data,
    createOnChangeValue: path => this.createOnChangeValue(path),
    schemaData: this.props.schemaData,
    setData: data => this.setData(data),
    addValidations: addValidations.bind(this),
    clearValidations: clearValidations.bind(this),
    isAllValid: isAllValid.bind(this),
  };

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const state = {};
    const { data: oldData, schemaData: oldSchemaData } = this.props;
    const { data, schemaData } = nextProps;

    if (oldSchemaData !== schemaData) {
      state.schemaData = schemaData;
    }

    if (oldData !== data) {
      state.data = data;
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
      this.state.setData(set(path, value, data));
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
    this.state.clearValidations();

    return (
      <Container className={className}>
        <FormContext.Provider value={this.state}>{children}</FormContext.Provider>
      </Container>
    );
  }
}
