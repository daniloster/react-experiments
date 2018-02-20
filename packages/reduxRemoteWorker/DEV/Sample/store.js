// import 'daniloster-utils/lib/mockWorkerWindow';
import { createStore, combineReducers } from 'redux';
import createReduxStoreSection from 'daniloster-date-picker/lib/createReduxStoreSection';
import RemoteStore from '../../src/RemoteStore';

const { reducers } = createReduxStoreSection('datePicker');

const remoteStore = new RemoteStore(
  createStore(
    combineReducers({
      ...reducers,
    }),
  ),
  message => postMessage(message),
);

onmessage = message => remoteStore.onmessage(message);

// export default remoteStore;
