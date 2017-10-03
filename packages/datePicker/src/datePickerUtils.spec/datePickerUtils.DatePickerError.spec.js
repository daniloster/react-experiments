import {
  DatePickerError,
} from '../datePickerUtils';

describe('DatePickerError', () => {
  let error;

  describe('DatePickerError must validate correct the common error', () => {
    it('Given a common error is created', () => {
      error = new Error('Not DatePickerError');
    });
    it('Expect the DatePickerError to deny its type', () => {
      expect(DatePickerError.is(error)).to.be.false;
    });
  });

  describe('DatePickerError must validate correct its own type', () => {
    it('Given a DatePickerError is created', () => {
      error = new DatePickerError('It is DatePickerError');
    });
    it('Expect the DatePickerError to acknowledge its type', () => {
      expect(DatePickerError.is(error)).to.be.true;
    });
  });
});
