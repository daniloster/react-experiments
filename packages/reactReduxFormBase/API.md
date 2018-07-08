## react-redux-form-base

Provides a composable form structure with validation

[\`npm: react-redux-form-base\`](https://www.npmjs.com/package/react-redux-form-base)


### src/Model.js

#### Model

Model
It is a proxy component which executes the form flow validation/update
provided to fields from a redux store.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**path** | string | null | :x: | Path defined to change form data.
**children** | func |  | :white_check_mark: | Render function
@type ({
 data,
 schemaData,
 onChangeValue,
 setData,
 setShouldValidate,
 shouldValidate,
}) => <Component />
**onChangeValue** | func |  | :white_check_mark: | Action function
@type (path, value) => ({ActionCreator})

### src/StateForm.js

#### StateForm

StateForm
Container for StateFormItem elements which provides data access

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | node |  | :white_check_mark: | Elements of the form rendered
**className** | string | '' | :x: | CSS classes
**tagName** | union | 'form' | :x: | Tag name used as container
**data** | shape | {} | :x: | Initial data provided
**onChange** | func | null | :x: | Function to propagate change of the data
@type Function(path, value)
**schemaData** | shape | {} | :x: | Schema of validation
@type { [string]: { $validate: function, $getMessage: function } }
**setData** | func | noop | :x: | Function to propagate settting the data
@type Function(data)
**shouldValidate** | bool | false | :x: | Defines when the validation should be applied

### src/StateFormItem.js

#### StateFormItem

StateFormItem
It is a proxy component which executes the form flow validation/update
provided to fields.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**path** | string |  | :white_check_mark: | Path defined to change form data.
**children** | func |  | :white_check_mark: | Render function
@type ({ data, schemaData, createOnChangeValue, setData, shouldValidate }) => <Component />

