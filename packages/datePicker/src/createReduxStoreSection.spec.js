// import sinon from 'sinon';
import moment from 'moment';
import createReduxStoreSection, {
  DEFAULT_FORMAT,
} from './createReduxStoreSection';

const {
  reducers,
  actions,
  initialState,
} = createReduxStoreSection('testDatePicker');
const reducer = Object.values(reducers).pop();

describe('createReduxStoreSection', () => {
  let state;
  let format;
  let isUtc;
  let value;
  let textDate;
  let isValid;
  let date;

  function clearAll() {
    format = undefined;
    isUtc = undefined;
    value = undefined;
    textDate = undefined;
    isValid = undefined;
    date = undefined;
  }

  function assertDates(actual, expected, format = DEFAULT_FORMAT) {
    expect(
      actual.format(format),
    ).to.be.eql(
      expected.format(format),
    );
  }

  describe('setIsUtc should set the correct value to the store slice', () => {
    it('Given the setIsUtc reducer is executed for the oposite value in the store', () => {
      state = reducer({ ...initialState }, actions.setIsUtc(!initialState.isUtc));
    });
    it('Expect the state to have changed the isUtc flag', () => {
      expect(state).to.be.eql({
        ...initialState,
        isUtc: !initialState.isUtc,
      });
    });
  });

  describe('setFormat should set the correct value to the store slice', () => {
    it('Given the setFormat reducer is executed for "D M Y"', () => {
      state = reducer({ ...initialState }, actions.setFormat('D M Y'));
    });
    it('Expect the state to have changed the isUtc flag', () => {
      expect(state).to.be.eql({
        ...initialState,
        format: 'D M Y',
      });
    });
  });

  describe('restore should set the previous data regarding the "value" property', () => {
    it('Given the setFormat reducer is executed for "D M Y"', () => {
      state = reducer({ ...initialState, textDate: '444444 JAn 32409' }, actions.restore());
    });
    it('Expect the state to be restored', () => {
      expect(state).to.be.eql(initialState);
    });
  });

  describe('setText should set the correct value to the store slice for a non submit action', () => {
    it('Given the setText reducer is executed for a non submitting action', () => {
      state = reducer({ ...initialState }, actions.setText({ textDate: 'Blaaaa', isSubmitting: false }));
    });
    it('Expect the state to be correct', () => {
      expect(state).to.be.eql({
        ...initialState,
        textDate: 'Blaaaa',
        isValid: false,
      });
    });
  });

  describe('setText should set the correct value to the store slice for a submit action', () => {
    it('Given the setText reducer is executed for a submitting action', () => {
      state = reducer({ ...initialState }, actions.setText({ textDate: '22/10/2017', isSubmitting: true }));
    });
    it('Expect the state to be correct', () => {
      const {
        value,
        ...otherStates,
      } = state;
      const {
        value: oldValue,
        ...previousState,
      } = initialState;
      expect(otherStates).to.be.eql({
        ...previousState,
        textDate: '22/10/2017',
        isValid: true,
      });
      expect(moment(value).format(DEFAULT_FORMAT)).to.be.eql('22/10/2017');
    });
  });

  describe('setText should not set the value from inactive change', () => {
    const date = moment([2017, 9, 22, 0, 0, 0]);
    it('Given the setText reducer is executed for an inactive change', () => {
      state = reducer({ ...initialState }, actions.setValue({ value: date.unix() * 1000, isActive: false }));
    });
    it('Expect the state to be the previous', () => {
      expect(state).to.be.eql(initialState);
    });
  });

  describe('setText should set the value from active change', () => {
    const date = moment([2017, 9, 22, 0, 0, 0]);
    it('Given the setText reducer is executed for an inactive change', () => {
      state = reducer({ ...initialState }, actions.setValue({ value: date.unix() * 1000, isActive: true }));
    });
    it('Expect the state to be the correct', () => {
      expect(state).to.be.eql({
        ...initialState,
        value: date.unix() * 1000,
        textDate: date.format(DEFAULT_FORMAT),
        isValid: true,
      });
    });
  });
});
