= Components

:numbered:


== File: **

=== Calendar

Component for picking a date on the calendar.   



[options="header"]
|===
|Property | Type | Required | Default value | Description
|className|string|no|&lt;See the source code&gt;|Outer world class to modify internal styles.
|isUtc|bool|no|false|Identify when date object must be treated as UTC/LocalTime.
|hasWeekdays|bool|no|false|Identify when should display the weekdays or not.
|format|string|yes||Date format e.g. &quot;DD/MM/YYYY&quot;.
|value|number|yes||A utc timestamp.
|onChange|func|yes||Handler dispatched when the value gets changed.

|===



== File: **

=== DateInputField

Component for text date on key stroke.   



[options="header"]
|===
|Property | Type | Required | Default value | Description
|className|string|no|&lt;See the source code&gt;|Outer world class to modify internal styles.
|shouldChangeValueOnBlur|bool|no|false|Flag to identify if it should apply value during on blur event.
|isUtc|bool|no|false|Identify when date object must be treated as UTC/LocalTime.
|isValid|bool|yes||Identify when the text date is valid.
|format|string|no|&lt;See the source code&gt;|Date format e.g. &quot;DD/MM/YYYY&quot;.
|textDate|string|yes||A utc timestamp.
|onChange|func|yes||Handler dispatched when the value gets changed.
|onFocus|func|yes||Handler dispatched when the field gets focused.
|onLeave|func|yes||Handler dispatched when the field losts focus.
|onRestore|func|yes||Handler dispatched when the &#x27;Escape&#x27; key is pressed.

|===



== File: **

=== DatePicker

Component for date selection.   



[options="header"]
|===
|Property | Type | Required | Default value | Description
|className|string|no|&lt;See the source code&gt;|Outer world class to modify internal styles.
|shouldChangeValueOnBlur|bool|no|false|Flag to identify if it should apply value during on blur event.
|shouldKeepCalendarWhileSelecting|bool|no|false|Flag to identify if it should apply value during on blur event.
|isUtc|bool|no|false|Identify when date object must be treated as UTC/LocalTime.
|hasWeekdays|bool|no|false|Identify when should display the weekdays or not.
|format|string|no|&lt;See the source code&gt;|Date format e.g. &quot;DD/MM/YYYY&quot;.
|value|number|yes||A utc timestamp.
|textDate|string|yes||A text date.
|isValid|bool|yes||A text date.
|onChange|func|yes||Handler dispatched when the value gets changed.
|onTextChange|func|yes||Handler dispatched when the text gets changed.
|onRestore|func|yes||Handler dispatched when the restore button is clicked.

|===



== File: **

=== NavigationButton

They are button to move forward and backward through the months.   



[options="header"]
|===
|Property | Type | Required | Default value | Description
|className|string|no|&lt;See the source code&gt;|Outer world class to modify internal styles.
|children|node|yes||Representation of what must be considered part of the button.
|navigate|func|yes||Action associated as a handle. Note: expect the action to handle the event agurment.

|===



== File: **

=== 






== File: **

=== 



[options="header"]
|===
|Property | Type | Required | Default value | Description
|className|string|no|&lt;See the source code&gt;|Outer world class to modify internal styles.
|isUtc|bool|yes||Identify when date object must be treated as UTC/LocalTime.
|month|number|yes||A number [0-11] representing the month for the calendar.
|value|number|yes||A utc timestamp.
|calendar|arrayOf|yes||The calendar to display. It is an array of objects with
start and end dates representing the week.
|onClickItem|func|yes||Action to be associated as handler to click event on each date
of the calendar.

|===


