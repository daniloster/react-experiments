import { createReducerFunction } from '../src';
const constants = {
  SUM: 'SUM',
  SUBTRACT: 'SUBTRACT'
};
function sum(secondOperand) {
  return {
    type: constants.SUM,
    secondOperand
  }
}
function subtract(secondOperand) {
  return {
    type: constants.SUBTRACT,
    secondOperand: parseInt(secondOperand)
  }
}
function divide(secondOperand) {
  return {
    type: 'DIVIDE',
    secondOperand: parseInt(secondOperand)
  }
}
const mapping = {
  [constants.SUM]: ({ value }, { secondOperand }) => {
    if (!Number.isNaN(secondOperand) && secondOperand !== 0) {
      return { value: value + secondOperand };
    }
    // When proposed changes are undefined
    return undefined;
  },
  [constants.SUBTRACT]: ({ value }, { secondOperand }) => {
    if (!Number.isNaN(secondOperand) && secondOperand !== 0) {
      return { value: value - secondOperand };
    }
    // When proposed changes are an empty object
    return {};
  }
}

describe('createReducerFunction creates reducer', () => {
  const initialState = { value: 10 };
  let reducer,
    value;

  function createReducerAndGetStateChanged() {
    reducer = createReducerFunction(initialState, mapping);
    return reducer(initialState, sum(3));
  }

  describe('reducer should return the initial state if first execution with undefined action', () => {
    it('Given the reducer function created by createReducerFunction', () => reducer = createReducerFunction(initialState, mapping));
    it('When the reducer function is call for undefined action', () => value = reducer());
    it('Then the state should be the initial one', () => expect(value).to.be.equal(initialState));
  });

  describe('reducer should return the initial state if first execution with not expected action type', () => {
    it('Given the reducer function created by createReducerFunction', () => reducer = createReducerFunction(initialState, mapping));
    it('When the reducer function is call for not expected action type', () => value = reducer(initialState, divide(3)));
    it('Then the state should be the initial one', () => expect(value).to.be.equal(initialState));
  });

  describe('reducer should return the initial state if first execution with expected action type', () => {
    it('Given the reducer function created by createReducerFunction', () => reducer = createReducerFunction(initialState, mapping));
    it('When the reducer function is called correctly', () => value = reducer(initialState, sum(3)));
    it('Then the state should have the correct values', () => expect(value).to.be.deep.equal({ value: 13 }));
  });

  describe('reducer should return the previous state if proposed changes are undefined', () => {
    let previousState;
    it('Given the reducer function created by createReducerFunction changed the state', () =>
      previousState = createReducerAndGetStateChanged()
    );
    it('When the reducer function proposes state changes as undefined', () => value = reducer(previousState, sum(0)));
    it('Then the state be the previous one', () => expect(value).to.be.equal(previousState));
  });

  describe('reducer should return the previous state if proposed changes are an empty object', () => {
    let previousState;
    it('Given the reducer function created by createReducerFunction changed the state', () =>
      previousState = createReducerAndGetStateChanged()
    );
    it('When the reducer function proposes state changes as an empty object', () => value = reducer(previousState, subtract(0)));
    it('Then the state be the previous one', () => expect(value).to.be.equal(previousState));
  });
});
