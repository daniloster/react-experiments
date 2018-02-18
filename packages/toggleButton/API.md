## daniloster-toggle-button

ToggleButton react component observing the same idea of checkbox element (checked/unchecked).

[\`npm: daniloster-toggle-button\`](https://www.npmjs.com/package/daniloster-toggle-button)


### src/ToggleButton.js

#### ToggleButton

Button that switches between checked and unchecked.
E.g.
```js
class Example extends Component {
  state = {
    isLightOn: false,
  }

  toggle = () => {
    this.setState(({ isLightOn }) => {
      return { isLightOn: !isLightOn };
    })
  }

  render() {
    return (
      <ToggleButton
        onChange={this.toggle}
        isChecked={this.state.isLightOn}
      >Lights?</ToggleButton>
    );
  }
}

// ...

<Example />
```

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | \`string\` | \`''\` | :x: | className applied to the container element in order to change styles from outer world.
**children** | \`node\` | \`null\` | :x: | It is the label representative for the element.
**nodeOn** | \`node\` | \`'On'\` | :x: | It is the representative element for checked.
**nodeOff** | \`node\` | \`'Off'\` | :x: | It is the representative element for unchecked.
**onChange** | \`func\` |  | :white_check_mark: | It is the event handler for toggling.
**isChecked** | \`bool\` |  | :white_check_mark: | It is the value for checked/unchecked representation.

