## react-redux-form-base

There a lot of libraries out there managing the form. However, all them force specific Input components or form items. This library only defines the workflow to capture data and validate it.

It is really recommended using the state recipe, as forms usually are transient data and this type of data does not need to be kept in memory.

2 ways to manage the form data. Either through the component state or redux state. So, see following cookbook recipes.

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
import React from "react";
import { combineValidations } from "react-redux-form-base";
// or import { combineValidations } from "react-redux-form-base/lib/formUtils";

export default {
  "contacts[].value": combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <span className="react__form-item-validation-message">
        Contact is required
      </span>
    );
    return { data, isValid, message, path };
  }),
  "attributes[]": combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <span className="react__form-item-validation-message">
        Attribute is required
      </span>
    );
    return { data, isValid, message, path };
  }),
  age: combineValidations(({ data, path, value }) => {
    const isValid = !!value && /\d+$/g.test(value);
    const message = isValid ? null : (
      <span className="react__form-item-validation-message">
        Age is required and only accepts numbers
      </span>
    );
    return { data, isValid, message, path };
  }),
  title: combineValidations(
    ({ data, path, value }) => {
      const isValid = !!value && /^(([m][r])([s]?))/gi.test(value);
      const message = isValid ? null : (
        <span className="react__form-item-validation-message">
          The only allowed ones are {'"Mr"'} or {'"Mrs"'}.
        </span>
      );
      return { data, isValid, message, path };
    },
    ({ data, path, value }) => {
      const isValid = !!value;
      const message = isValid ? null : (
        <span className="react__form-item-validation-message">
          Title is required!
        </span>
      );
      return { data, isValid, message, path };
    }
  ),
  firstname: combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <div className="react__form-item-validation-message">
        Firstname is required
      </div>
    );
    return { data, isValid, message, path };
  }),
  lastname: combineValidations(({ data, path, value }) => {
    const isValid = !!value;
    const message = isValid ? null : (
      <div className="react__form-item-validation-message">
        Lastname is required
      </div>
    );
    return { data, isValid, message, path };
  }),
  "certificate.description": combineValidations(
    ({ data, path, value }) => {
      const isValid = !!value && /^(((\w+)\s+){9}(\w+))/g.test(value);
      const message = isValid ? null : (
        <div className="react__form-item-validation-message">
          It requires 10 words as description at least.
        </div>
      );
      return { data, isValid, message, path };
    },
    ({ data, path, value }) => {
      const isValid = !!value;
      const message = isValid ? null : (
        <div className="react__form-item-validation-message">
          Certificate description is required!
        </div>
      );
      return { data, isValid, message, path };
    }
  )
};
```

### Component State

Here the state is kept in the component state which uses the new context api to provide the events to control data and validation messages. In this recipe, the developer controls when the validation should be displayed. The most important thing is that this recipe defines workflow for capturing data and validating it in the most flexible way.

It worth mention that in the children as function there are 3 nice functions provided:

* onChange, which handle an event updating the path with `e.target.value` / `(e) => { ...internalUpdate(e.target.value)... )}`;
* onChangeValue, which updates the path with given value `(value) => { ...internalUpdate(value)... )}`;
* isAllValid, which validates a restricted groups of paths required, or all them when restrictions are not provided;
  * `isAllValid()` validates all the validations associated with the shema and FormStateItem defined for path;
  * `isAllValid(['firstname', 'lastname'])` verifies only the validations associated with firstname and lastname;

```js
import React, { Component } from "react";
import { FormState, FormStateItem } from "react-redux-form-base";

class AppStateForm extends Component {
  state = {
    person: {},
    shouldValidate: false
  };

  onSubmit = e => {
    e.preventDefault();
    alert("Sending form data...");
  };

  onValidate = e => {
    e.preventDefault();
    this.setState({ shouldValidate: true });
  };

  render() {
    const { shouldValidate } = this.state;
    return (
      <div>
        <h2>FormState</h2>
        <FormState schemaData={schemaData}>
          <div>
            <FormStateItem path="firstname">
              {({ onChange, value, validations }) => (
                <span data-form-state-item>
                  <Input id="firstname" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </FormStateItem>
            <br />

            <label htmlFor="lastname">Lastname</label>
            <FormStateItem path="lastname">
              {({ onChange, value, validations }) => (
                <span data-form-state-item>
                  <Input id="lastname" onChange={onChange} value={value} />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </FormStateItem>
            <br />

            <FormStateItem>
              {({ isAllValid }) => (
                <button
                  onClick={this.onValidate}
                  disabled={!isAllValid(["fistname", "lastname"])}
                >
                  Validate Certificate
                </button>
              )}
            </FormStateItem>
          </div>

          <label htmlFor="description">Certificate description</label>
          <FormStateItem path="certificate.description">
            {({ onChange, value, validations }) => (
              <span>
                <Input id="description" onChange={onChange} value={value} />
                {shouldValidate &&
                  validations &&
                  validations.map(({ message }) => message)}
              </span>
            )}
          </FormStateItem>
          <br />

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
    /**
     * Here we are resetting the form every 1 minute. Don't take it as a real use case.
     * You might get the action connecting your component. Also, it is recommended to use
     * the state in the form. We should not be using the store state to keep transient
     * data.
     * */
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
                  {/**
                   * onChange is a connected actions that changes the field
                   * value based on the path. And, the value is a result extracted
                   * using the path.
                   **/}
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
            {/* Note the special case for complex and primitive lists. */}
            <label htmlFor="contacts">Contacts</label>
            <Model path="contacts[0].value">
              {({ onChange, value, validations }) => (
                <span>
                  <Input
                    id="contacts[0].value"
                    onChange={onChange}
                    value={value}
                  />
                  {validations && validations.map(({ message }) => message)}
                </span>
              )}
            </Model>
            <Model path="contacts[1].value">
              {({ onChange, value, validations }) => (
                <span>
                  <Input
                    id="contacts[1].value"
                    onChange={onChange}
                    value={value}
                  />
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
            {/**
             * When no path is provided, it still give access to the
             * full form data and connected actions such as onChange,
             * setShouldValidate and setData.
             **/}
            <Model>
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
