import createReducerFunction from 'daniloster-utils/lib/createReducerFunction';
import get from 'lodash/get';
import set from 'lodash/fp/set';

/**
 * Creates the redux store section
 * @param {string} namespace
 * @param {string} dataName
 * @param {object} schemaData
 *
 * @returns {object}
 */
export default function createReduxStoreSection(namespace, dataName, schemaData) {
  const constants = {
    CHANGE_VALUE: `${namespace}:CHANGE_VALUE`,
    SET_DATA: `${namespace}:SET_DATA`,
    SET_SHOULD_VALIDATE: `${namespace}:SET_SHOULD_VALIDATE`,
  };
  const initialState = {
    dataName,
    [dataName]: {},
    schemaData,
  };

  /**
   * Changes the value according to the path provided.
   * @param {string} path defines where the value will be set
   * @param {any} value is the value to be set
   */
  function changeValue(path, value) {
    return {
      type: constants.CHANGE_VALUE,
      path,
      value,
    };
  }

  function changeValueReducer({ [dataName]: oldData }, { path, value }) {
    const oldValue = get(oldData, path);
    if (oldValue !== value) {
      return { [dataName]: set(path, value, oldData) };
    }

    return {};
  }

  /**
   * Defines when validation should take place.
   * @param {boolean} shouldValidate if validation should take place
   */
  function setShouldValidate(shouldValidate) {
    return {
      type: constants.SET_SHOULD_VALIDATE,
      shouldValidate,
    };
  }

  function setShouldValidateReducer(state, { shouldValidate }) {
    return { shouldValidate };
  }

  /**
   * Sets the full data.
   * @param {object} data represented in the form
   */
  function setData(data) {
    return {
      type: constants.SET_DATA,
      data,
    };
  }

  function setDataReducer(state, { data }) {
    return { data };
  }

  const actions = {
    changeValue,
    setData,
    setShouldValidate,
  };

  function connectAction({ dispatch }, allActions, actionName) {
    return {
      ...allActions,
      [actionName]: (...args) => dispatch(actions[actionName](...args)),
    };
  }
  function connectActions(store) {
    return Object.keys(actions).reduce(
      (allActions, actionName) => connectAction(store, allActions, actionName),
      {},
    );
  }
  const mapDispatchToProps = {
    ...actions,
    onChangeValue: changeValue,
  };
  function mapStateToProps({ [namespace]: section }, ownProps) {
    return {
      ...section,
      ...ownProps,
    };
  }
  const reducersMap = {
    [constants.CHANGE_VALUE]: changeValueReducer,
    [constants.SET_DATA]: setDataReducer,
    [constants.SET_SHOULD_VALIDATE]: setShouldValidateReducer,
  };
  const reducer = createReducerFunction(initialState, reducersMap);

  return {
    actions,
    connectActions,
    initialState,
    mapDispatchToProps,
    mapStateToProps,
    reducer,
    reducers: { [namespace]: reducer },
    reducersMap,
  };
}
