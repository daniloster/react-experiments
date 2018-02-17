### Demo

Clicking on the label or toggle button will swap the isChecked value.

```js
initialState = { isChecked: false };
<ToggleButton
  onChange={isChecked => setState({ isChecked: isChecked })}
  isChecked={state.isChecked}
>
  Lights?
</ToggleButton>;
```

### No label

```js
initialState = { isChecked: true };
<ToggleButton
  onChange={isChecked => setState({ isChecked: isChecked })}
  isChecked={state.isChecked}
/>;
```
