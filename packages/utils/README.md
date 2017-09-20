daniloster-utils
----------------
Package to provide utilities functions and procedures.

## Utilities available
1. cancelSwipeNavigation: Cancel browser swipe navigation;
2. createReducerFunction: Create reducer function based on map and initial state;
3. Create more accessible event handler manipulation such as `document.on('eventNameWitoutOn', handlerFunction)` and `document.off('eventNameWitoutOn', handlerFunction)`;
4. Immutable: Create a readonly object but still enumerable;
5. invokeRequest: function to perform a request and return the failure as a resolved promise (useful for redux-saga);
6. isObjectEmpty: verifies if the provided value is an empty object;
7. shouldComponentUpdate: validate if properties are different in 2 objects: currentProps and nextProps;
