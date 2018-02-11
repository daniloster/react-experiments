import { createReducerFunction } from 'daniloster-utils';
import AccountStatus from './AccountStatus';
import AccountStatusArea from './AccountStatusArea';

function isValidEnum(Enum, value) {
  return Object.values(Enum).includes(value);
}

const STANDARD_NAME = 'account';
export const INITIAL_STATE = {
  clients: [],
  isApplicationReady: false,
  isUsersLoaded: false,
  users: [],
  user: null,
  status: {
    [AccountStatusArea.ResetPassword]: AccountStatus.Initial,
    [AccountStatusArea.SignIn]: AccountStatus.Initial,
    [AccountStatusArea.SignOut]: AccountStatus.Initial,
    [AccountStatusArea.ListingUsers]: AccountStatus.Initial,
  },
};

export const fixedConstants = {
  LIST_USERS: `${STANDARD_NAME}:LIST_USERS`,
  LOAD_AUTHENTICATED_USER: `${STANDARD_NAME}:LOAD_AUTHENTICATED_USER`,
  REQUEST_RESET_PASSWORD: `${STANDARD_NAME}:REQUEST_RESET_PASSWORD`,
  RESET_PASSWORD: `${STANDARD_NAME}:RESET_PASSWORD`,
  SIGN_UP: `${STANDARD_NAME}:SIGN_UP`,
  SIGN_IN: `${STANDARD_NAME}:SIGN_IN`,
  SIGN_OUT: `${STANDARD_NAME}:SIGN_OUT`,
  UPDATE_USER: `${STANDARD_NAME}:UPDATE_USER`,
};

/**
 * Creates a namespaced actions, reducers to connect to the components without conflicts
 * @param {string} namespace - name based on to reserve a section in the redux store
 * @param {object} initialState - initial values for the store section
 */
export default function createAccountReduxSection(
  namespace,
  initialState = { ...INITIAL_STATE },
) {
  const constants = {
    ...fixedConstants,
    SET_APPLICATION_READY: `${namespace}:${STANDARD_NAME}:SET_APPLICATION_READY`,
    SET_AUTHENTICATION: `${namespace}:${STANDARD_NAME}:SET_AUTHENTICATION`,
    SET_STATUS: `${namespace}:${STANDARD_NAME}:SET_STATUS`,
    SET_USER_SAVING_STATUS: `${namespace}:${STANDARD_NAME}:SET_USER_SAVING_STATUS`,
    SET_USERS: `${namespace}:${STANDARD_NAME}:SET_USERS`,
    SET_USERS_LOADED: `${namespace}:${STANDARD_NAME}:SET_USERS_LOADED`,
  };

  /**
   * Set status
   */
  function setApplicationReady() {
    return {
      type: constants.SET_APPLICATION_READY,
    };
  }

  function setApplicationReadyReducer() {
    return {
      isApplicationReady: true,
    };
  }

  /**
   * Set status
   */
  function setStatus(area, status, messages) {
    return {
      type: constants.SET_STATUS,
      area,
      status,
      messages,
    };
  }

  function setStatusReducer({ status: currentStatus }, { area, status, messages }) {
    if (isValidEnum(AccountStatusArea, area) && isValidEnum(AccountStatus, status)) {
      return {
        status: {
          ...currentStatus,
          [area]: status,
          messages,
        },
      };
    }
  }

  /**
   * Set value as property of an item
   */
  function setAuthentication(user) {
    return {
      type: constants.SET_AUTHENTICATION,
      user,
    };
  }

  function setAuthenticationReducer({}, { user }) {
    const newState = {};

    if (user) {
      newState.user = user;
    }

    return newState;
  }

  /**
   * Set the saving status for user
   */
  function setUserSavingStatus(userSavingStatus) {
    return {
      type: constants.SET_USER_SAVING_STATUS,
      userSavingStatus,
    };
  }

  function setUserSavingStatusReducer({}, { userSavingStatus }) {
    return Object.value(UserSavingStatus).includes(userSavingStatus)
      ? { userSavingStatus }
      : {};
  }

  /**
   * Set whether users have been loaded
   */
  function setUsersLoaded(isUsersLoaded) {
    return {
      type: constants.SET_USERS_LOADED,
      isUsersLoaded: !!isUsersLoaded,
    };
  }

  function setUsersLoadedReducer({}, { isUsersLoaded }) {
    return { isUsersLoaded };
  }

  /**
   * Set the list of users
   */
  function setUsers(users) {
    return {
      type: constants.SET_USERS,
      users,
    };
  }

  function setUsersReducer({}, { users = [] }) {
    return {
      clients: users.filter(user => !user.isAdmin),
      users: users.filter(user => user.isAdmin),
    };
  }

  /**
   * Update a user (clients)
   */
  function updateUser(user) {
    return {
      type: constants.UPDATE_USER,
      setUserSavingStatus,
      user,
    };
  }

  /**
   * List users (clients)
   */
  function listUsers() {
    return {
      type: constants.LIST_USERS,
      setStatus,
      setUsersLoaded,
      setUsers,
    };
  }

  /**
   * Request to reset password
   * @param {string} email
   */
  function requestResetPassword(email) {
    return {
      type: constants.REQUEST_RESET_PASSWORD,
      email,
      setStatus,
    };
  }

  /**
   * Reset password
   * @param {string} code
   * @param {string} password
   */
  function resetPassword(code, password) {
    return {
      type: constants.RESET_PASSWORD,
      code,
      password,
      setStatus,
    };
  }

  /**
   * Sign up the user creating a new account
   * @param {object} user
   * @param {string} password
   */
  function signUp(user, password) {
    return {
      type: constants.SIGN_UP,
      setApplicationReady,
      setAuthentication,
      setStatus,
      user,
      password,
    };
  }

  /**
   * Sign in the user with email and password
   * @param {string} email
   * @param {string} password
   */
  function signIn(email, password) {
    return {
      type: constants.SIGN_IN,
      setApplicationReady,
      setAuthentication,
      setStatus,
      email,
      password,
    };
  }

  /**
   * Load the authenticated user based on uid
   * @param {string} id - represents the user uid
   */
  function loadAuthenticatedUser(id) {
    return {
      type: constants.LOAD_AUTHENTICATED_USER,
      setApplicationReady,
      setAuthentication,
      setStatus,
      id,
    };
  }

  /**
   * Sign out the user
   */
  function signOut() {
    return {
      type: constants.SIGN_OUT,
      setAuthentication,
      setStatus,
    };
  }

  const actions = {
    loadAuthenticatedUser,
    setApplicationReady,
    setAuthentication,
    setUserSavingStatus,
    setUsersLoaded,
    setStatus,
    signUp,
    signIn,
    signOut,
  };

  const mapDispatchToProps = {
    setApplicationReady,
    loadAuthenticatedUser,
    setAuthentication,
    setStatus,
    setUserSavingStatus,
    setUsersLoaded,
    onChangeStatus: setStatus,
    onListUsers: listUsers,
    onRequestResetPassword: requestResetPassword,
    onResetPassword: resetPassword,
    onSignUp: signUp,
    onSignIn: signIn,
    onSignOut: signOut,
    onUpdateUser: updateUser,
  };

  const reducersMap = {
    [constants.SET_APPLICATION_READY]: setApplicationReadyReducer,
    [constants.SET_AUTHENTICATION]: setAuthenticationReducer,
    [constants.SET_STATUS]: setStatusReducer,
    [constants.SET_USER_SAVING_STATUS]: setUserSavingStatusReducer,
    [constants.SET_USERS]: setUsersReducer,
    [constants.SET_USERS_LOADED]: setUsersLoadedReducer,
  };

  return {
    initialState,
    constants,
    actions,
    mapDispatchToProps,
    reducersMap,
    reducers: {
      [namespace]: createReducerFunction(initialState, reducersMap),
    },
  };
}

