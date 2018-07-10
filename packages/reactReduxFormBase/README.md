## react-redux-form-base

It is a library to provide 2 ways to manage the form data. Either through the component state or redux state. So, see following cookbook recipes.

For both cases, please, assume that we have the following `Input` component and `schemaData`...

#### Input

```js
class Input extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.any
  };

  static defaultProps = {
    type: "text",
    value: ""
  };

  render() {
    return <input {...this.props} />;
  }
}
```

#### schemaData

```js
export default {
  // Note the special case for complex lists.
  "contacts[].value": {
    $validate: value => !!value,
    $getMessage: (_, $validateOutput) =>
      !$validateOutput ? <span>Contact is required</span> : null
  },
  // Note the special case for primitive lists.
  "attributes[]": {
    $validate: value => !!value,
    $getMessage: (_, $validateOutput) =>
      !$validateOutput ? <span>Attribute is required</span> : null
  },
  firstname: {
    $validate: value => !!value,
    $getMessage: (_, $validateOutput) =>
      !$validateOutput ? <span>Firstname is required</span> : null
  },
  age: {
    $validate: value => !!value && /\d+$/g.test(value),
    $getMessage: (_, $validateOutput) =>
      !$validateOutput ? (
        <span>Age is required and only accepts numbers</span>
      ) : null
  },
  lastname: {
    $validate: value => !!value,
    $getMessage: (_, $validateOutput) =>
      !$validateOutput ? <span>Lastname is required</span> : null
  },
  title: {
    $validate: value => /^(([mM][rR])([sS]?))/g.test(value),
    $getMessage: (value, $validateOutput) =>
      !$validateOutput && (
        <div>
          {value ? (
            <span>
              Invalid certificate title {'"'}
              {value}
              {'"'}.
            </span>
          ) : (
            <span>Certificate title is required!</span>
          )}
          <span>
            The only allowed ones are {'"Mr"'} or {'"Mrs"'}.
          </span>
        </div>
      )
  },
  "certificate.description": {
    $validate: value => /^(((\w+)\s+){9}(\w+))/g.test(value),
    $getMessage: (value, $validateOutput) =>
      !$validateOutput && (
        <div>
          {value ? (
            <span>Certificate description is invalid.</span>
          ) : (
            <span>Certificate description is required!</span>
          )}
          <span>It requires 10 words as description at least.</span>
        </div>
      )
  }
};
```

### Component State

Here the state is kept in the component state which uses the new context api to provide the events to control data and validation messages.

```js
import React, { Component } from "react";
import { StateForm, StateFormItem } from "react-redux-form-base";

class AppStateForm extends Component {
  state = {
    person: {},
    shouldValidate: false
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ shouldValidate: true });
  };

  render() {
    return (
      <div>
        <h2>StateForm</h2>
        <StateForm
          schemaData={schemaData}
          shouldValidate={this.state.shouldValidate}
        >
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
```

### Redux recipe

```jsx
import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import createComponent from "react-redux-form-base";

/**
 * The createComponent function requires a namespace which names the reducer
 * and also prefix all the actions. The, the property name where the form data
 * will be stored. And finally, the schemaData that validates the form.
 *
 * In this case, we want to keep the create a reducer "personSection" within
 * a property "person" and "schemaData" previously mentioned. So, as result,
 * the function returns a connected Model (Component) and the reducers containing
 * the named reducer.
 **/
const { Model, reducers, connectActions } = createComponent(
  "personSection",
  "person",
  schemaData
);
const ONE_MINUTE = 60 * 1000;

class AppModel extends Component {
  componentWillMount() {
    this.store = createStore(
      combineReducers(reducers),
      applyMiddleware(logger)
    );
    this.actions = connectActions(this.store);
    // Here we are resetting the form every 1 minute.
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
              {({ onChangeValue, value }) => (
                {/**
                  * onChangeValue is a connected actions that changes the field
                  * value based on the path. And, the value is a result extracted
                  * using the path.
                  **/}
                <Input id="title" onChange={onChangeValue} value={value} />
              )}
            </Model>
            <label htmlFor="age">Age</label>
            <Model path="age">
              {({ onChangeValue, value }) => (
                <Input id="age" onChange={onChangeValue} value={value} />
              )}
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
            <label htmlFor="description">Certificate description</label>
            <Model path="certificate.description">
              {({ onChangeValue, value }) => (
                <Input
                  id="description"
                  onChange={onChangeValue}
                  value={value}
                />
              )}
            </Model>
            {/*
            Note the special case for complex and primitive lists.
            */}
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
              {/**
                * When no path is provided, it still give access to the
                * full form data and connected actions such as onChangeValue,
                * setShouldValidate and setData.
                **/}
              {({ setShouldValidate }) => (
                <button
                  id="btnValidate"
                  type="button"
                  onClick={() => setShouldValidate(true)}
                >
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
```

## [API](https://github.com/daniloster/reactReduxFormBase/API.md)

## Test

```
npm test
```
