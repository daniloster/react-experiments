## react-redux-form-base

Provides a composable form structure with validation

[\`npm: react-redux-form-base\`](https://www.npmjs.com/package/react-redux-form-base)


### src/FormState.js

#### FormState

FormState
Container for FormStateItem elements which provides data access

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | node |  | :white_check_mark: | Elements of the form rendered
**className** | string | '' | :x: | CSS classes
**tagName** | union | 'form' | :x: | Tag name used as container
**data** | shape | {} | :x: | Initial data provided
**onChange** | func | null | :x: | Function to propagate change of the data e.g. Function(path, value)
**schemaData** | shape | {} | :x: | Schema of validation e.g. { [string]: { $validate: function, $getMessage: function } }
**setData** | func | noop | :x: | Function to propagate settting the data e.g. Function(data)

### src/FormStateItem.js

#### FormStateItem

FormStateItem
It is a proxy component which executes the form flow validation/update
provided to fields.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**path** | string | null | :x: | Path defined to change form data.
**children** | func |  | :white_check_mark: | Render function e.g. (args) => <Component />,
where args is an object { data, schemaData, createOnChangeValue, setData }

### src/Model.js

#### Model

Model
It is a proxy component which executes the form flow validation/update
provided to fields from a redux store.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**path** | string | null | :x: | Path defined to change form data.
**children** | func |  | :white_check_mark: | Render function e.g. ({ data, schemaData, onChangeValue, setData, setShouldValidate, shouldValidate }) => <Component />
**onChangeValue** | func |  | :white_check_mark: | Action function e.g. (path, value) => ({ActionCreator})

