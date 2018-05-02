## worker-logger

This library reduce the CPU cost of logging web app. As everyone knows, jjavascript runs on a single event loop on the browser which gets interrupted by async calls such as setTimeout, setInterval, XHR, fetch and native events. So, delegating the work to a web worker mitigates the problem.

The `worker-logger` makes use of a synchronized queue which follows the FIFO principle. Then, by consequence, it only hijacks one connection from the pool for XHR, not impacting the app experience significatly.

## Usage

Assuming that you want to use something like Rapid7 InsightOps to log and get derived metrics for your web app. It is likely to perform several api/xhr calls sending the logs. If they were running on the main logger, users would experience some sluggishness. Using the `worker-logger` is possible to migrate it due the synchronized queue implemented and mentioned before.

Here follows an example for react/redux app.

### Creating a token log

Go to [InsightOps](https://www.rapid7.com/products/insightops/) and create an account. After setup your password and access the main page. On the navigation bar, click on "Add Data" and go for the quick add. In the quick add slide-in panel, define your log as token and create it. This will give you back a token. Copy it, we are going to use it soon.

### Defining you function and executing as worker

`insightOpsLogger.js`

```js
export default function rapid7Logging(token) {
  const url = `https://webhook.logentries.com/noformat/logs/${token}`;
  global.onmessage = e =>
    fetch(url, {
      body: e.data,
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
}
```

`logger.js`

```js
import WorkerLogger from "worker-logger";
import insightOpsLogger from "./insightOpsLogger";

const logger = new WorkerLogger({
  logger: insightOpsLogger,
  args: ["INSERT YOUR TOKEN HERE"]
});

export default logger;
```

`store.js`

```js
import logger from "./logger";
// ...
export default createStore(
  reducers,
  applyMiddleware(logger.createMiddleware())
);
// ...
```

You can also time functions which will provide data for further performace analyses. E.g.

`my-reducer.js`

```js
import logger from "./logger";

const setName = logger.time(function setName(state, action) {
  return { name: action.name };
});

const setAge = logger.time(function setAge(state, action) {
  return { name: action.name };
});

function reducePerson(state, action) {
  switch (action.type) {
    case "SET_NAME":
      setName(state, action);
      break;
    case "SET_AGE":
      setAge(state, action);
      break;
    default:
      return state;
      break;
  }
}
```

**NOTE:** You can also time sagas (generators) by using `timeEffect`.

```js
import { call, put } from "redux-saga";
import actions from "./my-actions";

function* onSetPerson(action) {
  put(actions.setName(action.name));
  put(actions.setAge(action.age));
}

const timedSetPerson = logger.timeEffect(call, onSetPerson);

function* watchSetPerson() {
  yield* takeLatest(fixedConstants.SET_PERSON, timedSetPerson);
}
```

### Analytic View

In the insight ops view, you are going to get roughly these data.

```js
02 Apr 2018 22:51:30.916 { "instanceId": "999fa24f-2245-4257-97c7-9cf302b2e461", "level": "INFO", "event": { "track": "1856d410-7b0b-4049-9ab4-5bae3f730e7d", "data": { "type": "crypto:cryptoStock:CHANGE_SELECTED_CURRENCIES", "selectedCurrencies": [ "BRL" ] } } }

02 Apr 2018 22:51:30.974 { "instanceId": "999fa24f-2245-4257-97c7-9cf302b2e461", "level": "INFO", "event": { "track": "bc33aed5-a3fd-4b4d-8ebf-285076043f79", "data": { "type": "function", "name": "reduceChangeCurrencies", "ticksEllapsed": 0 } } }

02 Apr 2018 22:51:32.613 { "instanceId": "999fa24f-2245-4257-97c7-9cf302b2e461", "level": "INFO", "event": { "track": "0be30376-cb94-413d-b17e-bc3d46b70bcc", "data": { "type": "crypto:cryptoStock:CHANGE_SELECTED_CURRENCIES", "selectedCurrencies": [ "BRL" ] } } }
```

## Test

```
npm test
```
