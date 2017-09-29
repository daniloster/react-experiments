// import sinon from 'sinon';
import moment from 'moment';
import DatePickerModel from './DatePickerModel';

describe('DatePickerModel', () => {
  const DEFAULT_TEST_FORMAT = 'DD MMM YYYY HH:mm:ss';
  let model;
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

  function assertDates(actual, expected, format = DEFAULT_TEST_FORMAT) {
    expect(
      actual.format(format),
    ).to.be.eql(
      expected.format(format),
    );
  }

  describe('DatePickerModel should generate the correct date by default', () => {
    it('Given the DatePickerModel is created with default values', () => {
      clearAll();
      model = new DatePickerModel();
    });
    it('Expect the model to have the correct values', () => {
      expect(model.value).to.not.be.undefined;
      expect(model.isUtc).to.be.false;
      expect(model.format).to.not.be.undefined;
      expect(model.textDate).to.not.be.undefined;
      expect(model.isValid).to.be.true;
    });
  });

  describe('DatePickerModel should generate the correct computed date when provided one', () => {
    it('Given the DatePickerModel is created with local date and isUtc', () => {
      clearAll();
      date = moment();
      model = new DatePickerModel({
        date,
        format: DEFAULT_TEST_FORMAT,
        isUtc: true,
      });
    });
    it('Expect the model to have the correct values', () => {
      assertDates(model.date, date);
      expect(model.isUtc).to.be.true;
      expect(model.format).to.be.eql(DEFAULT_TEST_FORMAT);
      expect(model.textDate).to.be.eql(date.format(DEFAULT_TEST_FORMAT));
      expect(model.isValid).to.be.true;
    });
  });

  describe('DatePickerModel should change values correctly', () => {
    it('Given the DatePickerModel is created with default values', () => {
      clearAll();
      model = new DatePickerModel();
    });
    it('When the model is updated', () => {
      model.onChange({
        value: 1506785458836,
        isActive: true,
      });
    });
    it('Then the model should have the correct values', () => {
      expect(model.value).to.be.eql(1506785458836);
      expect(model.isUtc).to.be.false;
      expect(model.format).to.be.eql('DD MMM YYYY');
      expect(model.textDate).to.be.eql('30 Sep 2017');
      expect(model.isValid).to.be.true;
    });
  });

  describe('DatePickerModel should not change to inactived value', () => {
    it('Given the DatePickerModel is created with custom values', () => {
      clearAll();
      model = new DatePickerModel({
        value: 1506785458836,
      });
    });
    it('When the model is updated with inactive value', () => {
      model.onChange({
        value: 1508888459999,
        isActive: false,
      });
    });
    it('Then the model should not have been updated', () => {
      expect(model.value).to.be.eql(1506785458836);
      expect(model.isUtc).to.be.false;
      expect(model.format).to.be.eql('DD MMM YYYY');
      expect(model.textDate).to.be.eql('30 Sep 2017');
      expect(model.isValid).to.be.true;
    });
  });

  describe('DatePickerModel should restore values correctly', () => {
    it('Given the DatePickerModel is created with custom values', () => {
      clearAll();
      model = new DatePickerModel({
        value: 1506785458836,
      });
    });
    it('When the model is updated with transient value', () => {
      model.onTextChange({
        textDate: '15 Sep 2015',
        isSubmitting: false,
      });
    });
    it('And the model restores the last committed value', () => {
      model.onRestore();
    });
    it('Then the model should have the initial values', () => {
      expect(model.value).to.be.eql(1506785458836);
      expect(model.isUtc).to.be.false;
      expect(model.format).to.be.eql('DD MMM YYYY');
      expect(model.textDate).to.be.eql('30 Sep 2017');
      expect(model.isValid).to.be.true;
    });
  });

  describe('DatePickerModel should commit values correctly', () => {
    it('Given the DatePickerModel is created with custom values', () => {
      clearAll();
      model = new DatePickerModel({
        value: 1506785458836,
      });
    });
    it('When the model is updated with transient value', () => {
      model.onTextChange({
        textDate: '15 Sep 2015',
        isSubmitting: true,
      });
    });
    it('Then the model should have the new values', () => {
      expect(model.value).to.be.eql(1442282400000);
      expect(model.isUtc).to.be.false;
      expect(model.format).to.be.eql('DD MMM YYYY');
      expect(model.textDate).to.be.eql('15 Sep 2015');
      expect(model.isValid).to.be.true;
    });
  });
});
