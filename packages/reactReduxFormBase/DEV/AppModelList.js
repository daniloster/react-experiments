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
              {({ onChange, value, validations }) => (
                <span>
                  <Input id="title" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="firstname">Firstname</label>
            <Model path="firstname">
              {({ onChange, value, validations }) => (
                <span>
                  <Input id="firstname" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="lastname">Lastname</label>
            <Model path="lastname">
              {({ onChange, value, validations }) => (
                <span>
                  <Input id="lastname" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="contacts">Contacts</label>
            <Model path="contacts[0].value">
              {({ onChange, value, validations }) => (
                <span>
                  <Input id="contacts[0].value" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <Model path="contacts[1].value">
              {({ onChange, value, validations }) => (
                <span>
                  <Input id="contacts[1].value" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <label htmlFor="attributes">Attributes</label>
            <Model path="attributes[0]">
              {({ onChange, value, validations }) => (
                <span>
                  <Input id="attributes[0]" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <Model path="attributes[1]">
              {({ onChange, value, validations }) => (
                <span>
                  <Input id="attributes[1]" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <Model>
              {() => (
                <button id="btnValidate" type="button">
                  Submit
                </button>
              )}
            </Model>
          </form>
        </Provider>
      </div>
    );
  }
}
