## context-api-polyfill

This library polyfills the `React < 16.0.0` with the new context api. Thus, it is possible to use this feature and still have releases to react 15 as non-breaking change.

## Caveat

The context api is based on a Provider and a Consumer which obey the closure defined by the browser DOM Tree. In this matter, it can be seen as a closure isolating each provider that is being wrapper by another provider.

To mimic the closure created by the DOM Tree during render, it is being used the stack data structure. Everytime when a provider in the virtual DOM Tree runs its lifecycle methods `componentWillMount` or `componentWillReceiveProps`, it is being added to the stack. Also removed when `componentDidMount` or `componentDidUpdate`.

I highly recommend setting the initial value to the context created and use that to set value to the component that is resposible to feed the provider with value.

```js
import React from "react";
import "context-api-polyfill";

// Here is your initial value
const INITIAL_VALUE = "red";
// As expected by the createContext function, you pass down the value that is going to be set as default.
const BackgroundContext = React.createContext(INITIAL_VALUE);
// Also, set this value as initialValue to your context object
BackgroundContext.initialValue = INITIAL_VALUE;

export default BackgroundContext;
```

Doing it so, you can use as:

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import BackgroundContext from "./BackgroundContext";

export default class Switcher extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    // Setting initial value to the state
    backgroundColor: BackgroundContext.initialValue
  };

  toggleBgColor = () => {
    this.setState(({ backgroundColor }) => ({
      backgroundColor: backgroundColor === "red" ? "blue" : "red"
    }));
  };

  render() {
    const { children } = this.props;
    const { backgroundColor } = this.state;

    return (
      <div>
        <button type="button" onClick={this.toggleBgColor}>
          Toggle Bg Color
        </button>
        {/* feeding back the value according to the toggle color value */}
        <BackgroundContext.Provider value={backgroundColor}>
          {children}
        </BackgroundContext.Provider>
      </div>
    );
  }
}
```

For more information, check out the `DEV` folder in this project [GitHub Repo](https://github.com/daniloster/react-experiments/tree/master/packages/contextApiPolyfill/).

## [API](https://github.com/daniloster/react-experiments/tree/master/packages/contextApiPolyfill/API.md)

## Test

```
npm test
```
