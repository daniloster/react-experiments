import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'; // eslint-disable-line
import logger from 'redux-logger'; // eslint-disable-line
import Input from './Input';
import schemaData from './schemaData';
import createComponent from '../src';

const { Model, reducers, connectActions } = createComponent('personSection', 'person', schemaData);
const ONE_MINUTE = 60 * 1000;

// eslint-disable-next-line
export default class AppModel extends Component {
  componentWillMount() {
    this.store = this.props.noLogging
      ? createStore(combineReducers(reducers))
      : createStore(combineReducers(reducers), applyMiddleware(logger));
    this.actions = connectActions(this.store);
    this.intervalRef = setInterval(() => this.actions.setData({}), ONE_MINUTE);
  }

  componentWillUnmount() {
    clearInterval(this.intervalRef);
  }

  render() {
    return (
      <div>
        <Provider store={this.store}>
          <form>
            <h2>ReduxForm</h2>
            <label htmlFor="title">Title</label>
            <Model path="title">
              {({ onChangeValue, value, validations }) => (
                <span>
                  <Input id="title" onChange={onChangeValue} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="age">Age</label>
            <Model path="age">
              {({ onChangeValue, value, validations }) => (
                <span>
                  <Input id="age" onChange={onChangeValue} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="firstname">Firstname</label>
            <Model path="firstname">
              {({ onChangeValue, value, validations }) => (
                <span>
                  <Input id="firstname" onChange={onChangeValue} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="lastname">Lastname</label>
            <Model path="lastname">
              {({ onChangeValue, value, validations }) => (
                <span>
                  <Input id="lastname" onChange={onChangeValue} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="description">Certificate description</label>
            <Model path="certificate.description">
              {({ onChangeValue, value, validations }) => (
                <span>
                  <Input id="description" onChange={onChangeValue} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <Model>
              {({ setShouldValidate }) => (
                <button id="btnValidate" type="button" onClick={() => setShouldValidate(true)}>
                  Validate
                </button>
              )}
            </Model>
          </form>
        </Provider>
      </div>
    );
  }
}
