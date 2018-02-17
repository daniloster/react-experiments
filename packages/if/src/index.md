### Demo

Check or uncheck to see the `If` component acting.

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTruthy: true
    };
    this.onChange = () => {
      this.setState(({ isTruthy }) => ({ isTruthy: !isTruthy }));
    };
  }

  render() {
    const { isTruthy } = this.state;
    return (
      <div
        style={{ backgroundColor: "rgba(40, 40, 180, 0.3)", padding: "10px" }}
      >
        <label>
          <input type="checkbox" checked={isTruthy} onChange={this.onChange} />{" "}
          Is truthy?{" "}
        </label>
        <If expression={isTruthy}>
          <span>It is truthy!</span>
        </If>
        <If expression={!isTruthy}>
          <span>It is falsy!</span>
        </If>
      </div>
    );
  }
}

<Example />;
```
