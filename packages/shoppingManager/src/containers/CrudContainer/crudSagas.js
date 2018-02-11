import {
  takeLatest,
  delay,
} from 'redux-saga';
import {
  call,
  put,
  fork,
  take,
} from 'redux-saga/effects';
import {
  fixedConstants,
} from './createCrudReduxSection';
import ApplicationError from '../../core/ApplicationError';
import RestApi from '../../core/RestApi';

export function* onList({ entryType, endpoint, ...action }) {
  yield call(delay, 500);
  const { error, data } = yield call(RestApi.get, endpoint);

  if (error) {
    throw new ApplicationError(error.code, error.reason);
  }

  yield put(action.setItems(entryType, data.items));
  yield put(action.setLoaded(entryType, true));
}

export function* watchList() {
  yield* takeLatest(fixedConstants.LIST, onList);
}

export function* onSave({ entryType, endpoint, ...action }) {
  yield call(delay, 500);
  const { item, setItem } = action;
  const restAction = call(
    action.id
      ? RestApi.put
      : RestApi.post,
    endpoint,
    item,
  );
  const { error, data } = yield restAction;

  if (error) {
    throw new ApplicationError(error.code, error.reason);
  }

  yield put(action.updateItems(entryType, data.item));
  yield put(action.setItem(entryType, null));
}

export function* watchSave() {
  yield* takeLatest(fixedConstants.SAVE, onSave);
}

export function* onEdit({ entryType, endpoint, ...action }) {
  yield call(delay, 500);
  const { error, data } = yield call(RestApi.getOne, endpoint);

  if (error) {
    throw new ApplicationError(error.code, error.reason);
  }

  yield put(action.setItem(entryType, data.item));
}

export function* watchEdit() {
  yield* takeLatest(fixedConstants.EDIT, onEdit);
}

export function* onRemove({ entryType, endpoint, ...action }) {
  yield call(delay, 500);
  const {
    ids,
    removeItems,
  } = action;

  const endpoints = [].concat(endpoint);
  const responses = yield endpoints.map(
    endpointItem => call(RestApi.remove, endpoint),
  );

  const idsSuccessful = [];
  const messagesToThrowException = responses.reduce((messages, { error }, index) => {
    if (error) {
      return messages.concat(
        fork(function* () {
          throw new ApplicationError(error.code, error.reason);
        })
      );
    }
    idsSuccessful.push(action.ids[index]);
    return messages;
  }, []);

  yield put(removeItems(entryType, idsSuccessful));
  yield messagesToThrowException;
}

export function* watchRemove() {
  yield* takeLatest(fixedConstants.REMOVE, onRemove);
}

export default function*() {
  yield fork(watchList);
  yield fork(watchSave);
  yield fork(watchEdit);
  yield fork(watchRemove);
}
