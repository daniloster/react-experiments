### FormStateItem

It is the consumer for `FormState` which provides functions and values to control the form flow.

### Example

```python
import { FormState, FormStateItem } from 'react-redux-form-base';

const schemaData = {
  'certificate.description': combineValidations(
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
        <div className="react__form-item-validation-message">Certificate description is required!</div>
      );
      return { data, isValid, message, path };
    },
  ),
};

...

<FormState schemaData={schemaData} shouldValidate={true}>
  <label htmlFor="description">Certificate description</label>
  <FormStateItem path="certificate.description">
    {({ onChangeValue, value, validations }) => (
      <span data-form-state-item>
        <Input id="description" onChange={onChangeValue} value={value} />
        {validations && validations.map(({ message }) => message)}
      </span>
    )}
  </FormStateItem>
</FormState>
```
