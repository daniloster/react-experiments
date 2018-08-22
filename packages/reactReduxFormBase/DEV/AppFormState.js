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
          <label htmlFor="firstname">Firstname</label>
          <div key="name-group-data">
            <FormStateItem path="firstname">
              {({ onChange, value, validations }) => (
                <span key="firstname" data-form-state-item>
                  <Input id="firstname" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </FormStateItem>
            <br />

            <label htmlFor="lastname">Lastname</label>
            <FormStateItem path="lastname">
              {({ onChange, value, validations }) => (
                <span key="lastname" data-form-state-item>
                  <Input id="lastname" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </FormStateItem>
            <br />

            <FormStateItem>
              {({ isAllValid }) => (
                <button
                  key="validate"
                  onClick={this.onValidate}
                  disabled={!isAllValid(['fistname', 'lastname'])}
                >
                  Validate Certificate
                </button>
              )}
            </FormStateItem>
          </div>

          <label htmlFor="description">Certificate description</label>
          <FormStateItem path="certificate.description">
            {({ onChange, value, validations }) => (
              <span key="description" data-form-state-item>
                <Input id="description" onChange={onChange} value={value} />
                {shouldValidate && validations && validations.map(({ message }) => message)}
              </span>
            )}
          </FormStateItem>
          <br />

          <FormStateItem>
            {({ isAllValid }) => (
              <button key="submit" onClick={this.onSubmit} disabled={!isAllValid()}>
                Submit
              </button>
            )}
          </FormStateItem>
        </FormState>
      </div>
    );
  }
}
