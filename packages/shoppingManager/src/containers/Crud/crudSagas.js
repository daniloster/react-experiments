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

export function* onList({ baseUrl, endpoint, ...action }) {
  yield call(delay, 500);
  const { error, data } = yield call(RestApi.get, `${getBaseUrl(baseUrl)}${endpoint}`);

  if (error) {
    throw new ApplicationError(error.code, error.reason);
  }

  yield put(action.setItems(data.items));
  yield put(action.setLoaded(true));
}

export function* watchList() {
  yield* takeLatest(fixedConstants.LIST, onList);
}

function getBaseUrl(baseUrl) {
  return baseUrl
    ? `${baseUrl}${baseUrl[baseUrl.length - 1] === '/' ? '' : '/'}`
    : '';
}

export function* onSave({ baseUrl, endpoint, ...action }) {
  yield call(delay, 500);
  const { item, setItem } = action;
  const restAction = call(
    action.id
      ? RestApi.put
      : RestApi.post,
    `${getBaseUrl(baseUrl)}${endpoint}`,
    item,
  );
  const { error, data } = yield restAction;

  if (error) {
    throw new ApplicationError(error.code, error.reason);
  }

  yield put(action.updateItems(data.item));
  yield put(action.setItem(null));
}

export function* watchSave() {
  yield* takeLatest(fixedConstants.SAVE, onSave);
}

export function* onEdit({ baseUrl, endpoint, ...action }) {
  yield call(delay, 500);
  const { error, data } = yield call(RestApi.getOne, `${getBaseUrl(baseUrl)}${endpoint}`);

  if (error) {
    throw new ApplicationError(error.code, error.reason);
  }

  yield put(action.setItem(data.item));
}

export function* watchEdit() {
  yield* takeLatest(fixedConstants.EDIT, onEdit);
}

export function* onRemove({ baseUrl, endpoint, ...action }) {
  yield call(delay, 500);
  const {
    ids,
    removeItems,
  } = action;

  const endpoints = [].concat(endpoint);
  const responses = yield endpoints.map(
    endpointItem => call(RestApi.remove, `${getBaseUrl(baseUrl)}${endpoint}`),
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

  yield put(removeItems(idsSuccessful));
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
