### Demo

```js
const moment = require("moment");
const format = "DD/MM/YYYY";
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldChangeValueOnBlur: false,
      isUtc: false,
      isValid: true,
      format: format,
      textDate: moment().format(format),
      onChange: args => {
        this.setState({
          value: args.value,
          textDate: moment(args.value).format(format),
          isValid: true
        });
      },
      onFocus: args => console.log("onFocus", args),
      onLeave: args => console.log("onLeave", args),
      onRestore: args => console.log("onRestore", args),
      onTextChange: args => {
        const textDate = args.textDate;
        const date = moment(args.textDate, format);
        const isValid = textDate === date.format(format);
        this.setState({
          textDate,
          isValid,
          value: isValid ? date.valueOf() : this.state.value
        });
      }
    };
  }

  render() {
    const { state } = this;
    return (
      <div
        style={{ backgroundColor: "rgba(40, 40, 180, 0.3)", padding: "10px" }}
      >
        <DatePicker {...state} />
      </div>
    );
  }
}

<Example />;
```
