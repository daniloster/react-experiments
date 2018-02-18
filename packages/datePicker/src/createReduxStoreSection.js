import { createReducerFunction } from 'daniloster-utils';
import { getMoment, isValidTextDate } from './datePickerUtils';

export const DEFAULT_FORMAT = 'DD/MM/YYYY';
export const STANDARD_NAME = 'datePicker';
export const INITIAL_STATE = {
  format: DEFAULT_FORMAT,
  isUtc: false,
  value: getMoment(false)().valueOf(),
  textDate: getMoment(false)().format(DEFAULT_FORMAT),
  isValid: true,
};

/**
 * Creates a namespaced actions, reducers to connect to the components without conflicts
 * @param {string} namespace - name based on to reserve a section in the redux store
 * @param {object} initialState - initial values for the store section
 */
export default function createReduxStoreSection(
  namespace,
  initialState = { ...INITIAL_STATE },
) {
  const constants = {
    SET_VALUE: `${namespace}:${STANDARD_NAME}:SET_VALUE`,
    SET_TEXT: `${namespace}:${STANDARD_NAME}:SET_TEXT`,
    RESTORE: `${namespace}:${STANDARD_NAME}:RESTORE`,
    SET_IS_UTC: `${namespace}:${STANDARD_NAME}:SET_IS_UTC`,
    SET_FORMAT: `${namespace}:${STANDARD_NAME}:SET_FORMAT`,
  };

  /**
   * Change the utc flag
   */
  function setIsUtc(isUtc) {
    return {
      type: constants.SET_IS_UTC,
      isUtc,
    };
  }

  function reduceSetIsUtc(state, { isUtc }) {
    return {
      isUtc,
    };
  }

  /**
   * Change the format
   */
  function setFormat(format) {
    return {
      type: constants.SET_FORMAT,
      format,
    };
  }

  function reduceSetFormat(state, { format }) {
    return {
      format,
    };
  }

  /**
   * Restore the last selected date
   */
  function restore() {
    return {
      type: constants.RESTORE,
    };
  }

  function reduceRestore({ isUtc, format, value }) {
    const date = getMoment(isUtc)(value);
    return {
      isValid: date.isValid(),
      textDate: date.format(format),
    };
  }

  /**
   * Changes dates according to the arguments provided
   * @param {string} textDate - the date text
   * @param {boolean} isSubmitting - the flag that identifies
   * when is an attempt to commit new values
   */
  function setText({ textDate, isSubmitting }) {
    return {
      type: constants.SET_TEXT,
      textDate,
      isSubmitting,
    };
  }

  function reduceSetText({ isUtc, format }, { textDate, isSubmitting }) {
    const date = getMoment(isUtc)(textDate, format);
    const newState = {};
    newState.textDate = textDate;
    newState.isValid = date.isValid()
      && isValidTextDate(textDate, format, isUtc);
    if (isSubmitting && date.isValid()) {
      newState.textDate = date.format(format);
      newState.value = date.valueOf();
    }

    return newState;
  }

  /**
   * Changes dates according to the arguments provided
   * @param {number} value - the timestamp
   * @param {boolean} isActive - the flag that defines if the event
   * is dispatched by an active calendar cell
   */
  function setValue({ value, isActive }) {
    return {
      type: constants.SET_VALUE,
      value,
      isActive,
    };
  }

  function reduceSetValue({ isUtc, format }, { value, isActive }) {
    const date = getMoment(isUtc)(value);
    if (isActive && Number.isInteger(value) && date.isValid()) {
      const newState = {};
      newState.value = value;
      newState.textDate = date.format(format);
      newState.isValid = date.isValid()
        && isValidTextDate(newState.textDate, format, newState.isUtc);

      return newState;
    }

    return undefined;
  }

  const actions = {
    setIsUtc,
    setFormat,
    restore,
    setText,
    setValue,
  };

  const mapDispatchToProp = {
    setIsUtc,
    setFormat,
    onRestore: restore,
    onTextChange: setText,
    onChange: setValue,
  };

  const reducersMap = {
    [constants.SET_IS_UTC]: reduceSetIsUtc,
    [constants.SET_FORMAT]: reduceSetFormat,
    [constants.RESTORE]: reduceRestore,
    [constants.SET_TEXT]: reduceSetText,
    [constants.SET_VALUE]: reduceSetValue,
  };

  return {
    initialState,
    constants,
    actions,
    mapDispatchToProp,
    reducersMap,
    reducers: {
      [namespace]: createReducerFunction(initialState, reducersMap),
    },
  };
}
