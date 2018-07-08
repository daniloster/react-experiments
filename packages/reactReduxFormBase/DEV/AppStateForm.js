import React, { Component } from 'react';
import Input from './Input';
import schemaData from './schemaData';
import { StateForm, StateFormItem } from '../src';

export default class AppStateForm extends Component {
  state = {
    person: {},
    shouldValidate: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ shouldValidate: true });
  };

  render() {
    return (
      <div>
        <h2>StateForm</h2>
        <StateForm schemaData={schemaData} shouldValidate={this.state.shouldValidate}>
          <label htmlFor="description">Certificate description</label>
          <StateFormItem path="certificate.description">
            {({ onChangeValue, value }) => (
              <Input id="description" onChange={onChangeValue} value={value} />
            )}
          </StateFormItem>
          <br />

          <label htmlFor="firstname">Firstname</label>
          <StateFormItem path="firstname">
            {({ onChangeValue, value }) => (
              <Input id="firstname" onChange={onChangeValue} value={value} />
            )}
          </StateFormItem>
          <br />

          <label htmlFor="lastname">Lastname</label>
          <StateFormItem path="lastname">
            {({ onChangeValue, value }) => (
              <Input id="lastname" onChange={onChangeValue} value={value} />
            )}
          </StateFormItem>
          <br />

          <button onClick={this.onSubmit}>Submit</button>
        </StateForm>
      </div>
    );
  }
}
