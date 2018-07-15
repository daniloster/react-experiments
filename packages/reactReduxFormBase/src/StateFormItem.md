### StateFormItem

It is the consumer for `StateForm` which provides functions and values to control the form flow.

### Example

```python
import { StateForm, StateFormItem } from 'react-redux-form-base';

const schemaData = {
  'certificate.description': {
    $validate: value => !value,
    $getMessage: (value, $validation) => $validation && <span>Value cannot be "{value}"</span>
  }
};

...

<StateForm schemaData={schemaData} shouldValidate={true}>
  <label htmlFor="description">Certificate description</label>
  <StateFormItem path="certificate.description">
    {({ onChangeValue, value }) => (
      <Input id="description" onChange={onChangeValue} value={value} />
    )}
  </StateFormItem>
</StateForm>
```
