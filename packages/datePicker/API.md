## daniloster-date-picker

DatePicker react component with exported store connection (mapStateToProps, mapDispatchToProps and reducer function).

[\`npm: daniloster-date-picker\`](https://www.npmjs.com/package/daniloster-date-picker)


### src/Calendar.js

#### Calendar

Calendar
Component for picking a date on the calendar.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | string | '' | :x: | Outer world class to modify internal styles.
**isUtc** | bool | false | :x: | Identify when date object must be treated as UTC/LocalTime.
**hasWeekdays** | bool | false | :x: | Identify when should display the weekdays or not.
**format** | string |  | :white_check_mark: | Date format e.g. "DD/MM/YYYY".
**value** | number |  | :white_check_mark: | A utc timestamp.
**onChange** | func |  | :white_check_mark: | Handler dispatched when the value gets changed.

### src/DateInputField.js

#### DateInputField

DateInputField
Component for text date on key stroke.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | string | '' | :x: | Outer world class to modify internal styles.
**shouldChangeValueOnBlur** | bool | false | :x: | Flag to identify if it should apply value during on blur event.
**isUtc** | bool | false | :x: | Identify when date object must be treated as UTC/LocalTime.
**isValid** | bool |  | :white_check_mark: | Identify when the text date is valid.
**format** | string | 'DD MMM YYYY' | :x: | Date format e.g. "DD/MM/YYYY".
**textDate** | string | '' | :x: | A utc timestamp.
**onChange** | func |  | :white_check_mark: | Handler dispatched when the value gets changed.
**onFocus** | func |  | :white_check_mark: | Handler dispatched when the field gets focused.
**onLeave** | func |  | :white_check_mark: | Handler dispatched when the field losts focus.
**onRestore** | func |  | :white_check_mark: | Handler dispatched when the 'Escape' key is pressed.

### src/DatePicker.js

#### DatePicker

DatePicker
Component for date selection.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | string | '' | :x: | Outer world class to modify internal styles.
**shouldChangeValueOnBlur** | bool | false | :x: | Flag to identify if it should apply value during on blur event.
**shouldKeepCalendarWhileSelecting** | bool | false | :x: | Flag to identify if it should apply value during on blur event.
**isUtc** | bool | false | :x: | Identify when date object must be treated as UTC/LocalTime.
**hasWeekdays** | bool | false | :x: | Identify when should display the weekdays or not.
**format** | string | 'DD MMM YYYY' | :x: | Date format e.g. "DD/MM/YYYY".
**value** | number |  | :white_check_mark: | A utc timestamp.
**textDate** | string |  | :white_check_mark: | A text date.
**isValid** | bool |  | :white_check_mark: | A text date.
**onChange** | func |  | :white_check_mark: | Handler dispatched when the value gets changed.
**onTextChange** | func |  | :white_check_mark: | Handler dispatched when the text gets changed.
**onRestore** | func |  | :white_check_mark: | Handler dispatched when the restore button is clicked.

### src/NavigationButton.js

#### NavigationButton

NavigationButton
They are button to move forward and backward through the months.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | string | '' | :x: | Outer world class to modify internal styles.
**children** | node |  | :white_check_mark: | Representation of what must be considered part of the button.
**navigate** | func |  | :white_check_mark: | Action associated as a handle. Note: expect the action to handle the event agurment.

### src/Weekdays.js

#### Weekdays



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------

### src/Weeks.js

#### Weeks



prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | string | '' | :x: | Outer world class to modify internal styles.
**isUtc** | bool |  | :white_check_mark: | Identify when date object must be treated as UTC/LocalTime.
**month** | number |  | :white_check_mark: | A number [0-11] representing the month for the calendar.
**value** | number |  | :white_check_mark: | A utc timestamp.
**calendar** | arrayOf |  | :white_check_mark: | The calendar to display. It is an array of objects with
start and end dates representing the week.
**onClickItem** | func |  | :white_check_mark: | Action to be associated as handler to click event on each date
of the calendar.

