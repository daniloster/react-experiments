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
import uuid from 'uuid/v4';
import {
  fixedConstants,
} from './createAccountReduxSection';
import AccountStatus from './AccountStatus';
import AccountStatusArea from './AccountStatusArea';
import RestApi from '../../core/RestApi';
import AuthApi from '../../core/AuthApi';

export function* onSignUp({ setApplicationReady, setAuthentication, setStatus, user }) {
  yield put(setStatus(AccountStatusArea.SignUp, AccountStatus.Loading));
  yield call(delay, 500);
  const password = uuid();
  const response = yield call(AuthApi.create, user.email, password);
  const { error: errorAuth, data: auth } = response;

  if (errorAuth) {
    return yield put(setStatus(
      AccountStatusArea.SignUp,
      AccountStatus.ErrorAuthentication,
      errorAuth.message && [errorAuth.message],
    ));
  }

  yield call(AuthApi.resetPassword, user.email);

  const endpoint = `users/${auth.uid}`;
  const { error, data } = yield call(RestApi.set, endpoint, {
    ...user,
    id: auth.uid,
  });

  if (error) {
    return yield put(setStatus(
      AccountStatusArea.SignUp,
      AccountStatus.ErrorAuthentication,
      error.message && [error.message],
    ));
  }

  yield call(onLoadAuthenticatedUser, {
    setApplicationReady,
    setAuthentication,
    setStatus,
    statusArea: AccountStatusArea.VerifyEmail,
    id: auth.uid,
  });
}

export function* watchSignUp() {
  yield* takeLatest(fixedConstants.SIGN_UP, onSignUp);
}

export function* onRequestResetPassword({ email, setStatus }) {
  yield call(delay, 300);
  yield put(setStatus(AccountStatusArea.ResetPassword, AccountStatus.Loading));
  yield call(AuthApi.authAnonymously);
  const response = yield call(AuthApi.resetPassword, email);
  const { error, data } = response;

  if (error) {
    return yield put(setStatus(
      AccountStatusArea.ResetPassword,
      AccountStatus.Error,
      ['Error while trying to reset password'],
    ));
  }

  yield call(AuthApi.logout);
  yield put(setStatus(AccountStatusArea.ResetPassword, AccountStatus.Done));
}

export function* watchRequestResetPassword() {
  yield* takeLatest(fixedConstants.REQUEST_RESET_PASSWORD, onRequestResetPassword);
}

export function* onResetPassword({ code, password, setStatus }) {
  yield call(delay, 300);
  yield put(setStatus(AccountStatusArea.ResetPassword, AccountStatus.Loading));
  const response = yield call(AuthApi.confirmResetPassword, code, password);
  const { error, data } = response;

  if (error) {
    return yield put(setStatus(
      AccountStatusArea.ResetPassword,
      AccountStatus.Error,
      ['Error while trying to reset password'],
    ));
  }

  yield put(setStatus(AccountStatusArea.ResetPassword, AccountStatus.Done));
}

export function* watchResetPassword() {
  yield* takeLatest(fixedConstants.RESET_PASSWORD, onResetPassword);
}

export function* onListUsers({ setUsersLoaded, setUsers, setStatus }) {
  yield call(delay, 500);
  yield put(setStatus(AccountStatusArea.ListingUsers, AccountStatus.Loading));
  const response = yield call(RestApi.get, 'users');
  const { error, data } = response;

  if (error) {
    return yield put(setStatus(
      AccountStatusArea.ListingUsers,
      AccountStatus.Error,
      (
        error.message && [error.message]
        || ['Ocorreu um erro ao tentar listar usuários.']
      ),
    ));
  }

  yield put(setUsers(data.items));
  yield put(setUsersLoaded(true));
}

export function* watchListUsers() {
  yield* takeLatest(fixedConstants.LIST_USERS, onListUsers);
}

export function* onSignIn({ setApplicationReady, setAuthentication, setStatus, email, password }) {
  yield put(setStatus(AccountStatusArea.SignIn, AccountStatus.Loading));
  yield call(delay, 500);
  const { error: errorAuth, data: auth } = yield call(AuthApi.login, email, password);

  const hasUser = auth && !!auth.uid;
  if (errorAuth || !hasUser) {
    return yield put(setStatus(
      AccountStatusArea.SignIn,
      AccountStatus.ErrorAuthentication,
      errorAuth.message && [errorAuth.message],
    ));
  }

  yield call(onLoadAuthenticatedUser, {
    setApplicationReady,
    setAuthentication,
    setStatus,
    statusArea: AccountStatusArea.SignIn,
    id: auth.uid,
  });
}

export function* watchSignIn() {
  yield* takeLatest(fixedConstants.SIGN_IN, onSignIn);
}

export function* onLoadAuthenticatedUser({ setApplicationReady, setAuthentication, setStatus, statusArea, id }) {
  const { error, data } = yield call(RestApi.getOne, `users/${id}`);

  if (error) {
    return yield put(setStatus(
      statusArea,
      AccountStatus.Error,
      error.message && [error.message],
    ));
  }

  const { item } = data;
  yield put(setAuthentication(item));
  yield put(setStatus(statusArea, AccountStatus.Success));
  yield call(delay, 3000);
  yield put(setStatus(statusArea, AccountStatus.Done));
  if (statusArea !== AccountStatusArea.SignIn) {
    yield put(setStatus(AccountStatusArea.SignIn, AccountStatus.Done));
  }
  yield put(setApplicationReady());
}

export function* watchLoadAuthenticatedUser() {
  yield* takeLatest(fixedConstants.LOAD_AUTHENTICATED_USER, onLoadAuthenticatedUser);
}

export function* onSignOut({ setAuthentication, setStatus }) {
  yield put(setStatus(AccountStatusArea.SignOut, AccountStatus.Loading));
  yield call(delay, 500);
  yield call(AuthApi.logout);
  yield put(setAuthentication(null));
  yield put(setStatus(AccountStatusArea.SignOut, AccountStatus.Success));
  yield call(delay, 3000);
  yield put(setStatus(AccountStatusArea.SignOut, AccountStatus.Done));
  yield put(setStatus(AccountStatusArea.SignIn, AccountStatus.Initial));
}

export function* watchSignOut() {
  yield* takeLatest(fixedConstants.SIGN_OUT, onSignOut);
}

export default function*() {
  yield fork(watchRequestResetPassword);
  yield fork(watchResetPassword);
  yield fork(watchSignUp);
  yield fork(watchSignIn);
  yield fork(watchSignOut);
  yield fork(watchListUsers);
  yield fork(watchLoadAuthenticatedUser);
}
