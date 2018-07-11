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
              {({ onChangeValue, value }) => <Input id="title" onChange={onChangeValue} value={value} />}
            </Model>
            <label htmlFor="firstname">Firstname</label>
            <Model path="firstname">
              {({ onChangeValue, value }) => (
                <Input id="firstname" onChange={onChangeValue} value={value} />
              )}
            </Model>
            <label htmlFor="lastname">Lastname</label>
            <Model path="lastname">
              {({ onChangeValue, value }) => (
                <Input id="lastname" onChange={onChangeValue} value={value} />
              )}
            </Model>
            <label htmlFor="contacts">Contacts</label>
            <Model path="contacts[0].value">
              {({ onChangeValue, value }) => (
                <Input id="contacts[0].value" onChange={onChangeValue} value={value} />
              )}
            </Model>
            <Model path="contacts[1].value">
              {({ onChangeValue, value }) => (
                <Input id="contacts[1].value" onChange={onChangeValue} value={value} />
              )}
            </Model>
            <label htmlFor="attributes">Attributes</label>
            <Model path="attributes[0]">
              {({ onChangeValue, value }) => (
                <Input id="attributes[0]" onChange={onChangeValue} value={value} />
              )}
            </Model>
            <Model path="attributes[1]">
              {({ onChangeValue, value }) => (
                <Input id="attributes[1]" onChange={onChangeValue} value={value} />
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
