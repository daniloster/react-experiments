import React, { Component } from 'react';
import Input from './Input';
import schemaData from './simpleSchemaData';
import { FormState, FormStateItem } from '../src';

export default class AppFormState extends Component {
  state = {
    person: {},
    shouldValidate: false,
  };

  onValidate = (e) => {
    e.preventDefault();
    this.setState({ shouldValidate: true });
  };

  onSubmit = (e) => {
    e.preventDefault();
    alert('Submitting...');
  };

  render() {
    const { shouldValidate } = this.state;
    return (
      <div>
        <h2>FormState</h2>
        <FormState schemaData={schemaData}>
          <label htmlFor="description">Certificate description</label>
          <FormStateItem path="certificate.description">
            {({ onChangeValue, value, validations }) => (
              <span data-form-state-item>
                <Input id="description" onChange={onChangeValue} value={value} />
                {shouldValidate && validations && validations.map(({ message }) => message)}
              </span>
            )}
          </FormStateItem>
          <br />

          <label htmlFor="firstname">Firstname</label>
          <FormStateItem path="firstname">
            {({ onChangeValue, value, validations }) => (
              <span data-form-state-item>
                <Input id="firstname" onChange={onChangeValue} value={value} />
                {shouldValidate && validations && validations.map(({ message }) => message)}
              </span>
            )}
          </FormStateItem>
          <br />

          <label htmlFor="lastname">Lastname</label>
          <FormStateItem path="lastname">
            {({ onChangeValue, value, validations }) => (
              <span data-form-state-item>
                <Input id="lastname" onChange={onChangeValue} value={value} />
                {shouldValidate && validations && validations.map(({ message }) => message)}
              </span>
            )}
          </FormStateItem>
          <br />

          <button onClick={this.onValidate}>Validate</button>

          <FormStateItem>
            {({ isAllValid }) => (
              <button onClick={this.onSubmit} disabled={!isAllValid()}>
                Submit
              </button>
            )}
          </FormStateItem>
        </FormState>
      </div>
    );
  }
}
