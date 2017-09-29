import moment from 'moment';
import {
  isValidTextDate,
} from '../datePickerUtils';

describe('isValidTextDate', () => {
  let isValid;
  const FORMAT = 'DD/MM/YYYY';

  describe('isValidTextDate should validate an incorrect date', () => {
    it('Given isValidTextDate is executed for an incorrect date', () => {
      isValid = isValidTextDate('asda sdasdasd', FORMAT);
    });
    it('Expect date to be invalid', () => {
      expect(isValid).to.be.eql(false);
    });
  });

  describe('isValidTextDate should validate a date with incorrect format', () => {
    it('Given isValidTextDate is executed for a date with incorrect format', () => {
      isValid = isValidTextDate('33/52/1999', FORMAT);
    });
    it('Expect date to be invalid', () => {
      expect(isValid).to.be.eql(false);
    });
  });

  describe('isValidTextDate should validate a date', () => {
    it('Given isValidTextDate is executed for a correct date', () => {
      isValid = isValidTextDate('13/02/1999', FORMAT);
    });
    it('Expect date to be valid', () => {
      expect(isValid).to.be.eql(true);
    });
  });
});
