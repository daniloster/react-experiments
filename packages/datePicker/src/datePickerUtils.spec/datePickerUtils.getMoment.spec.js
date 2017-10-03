import moment from 'moment';
import {
  getMoment,
} from '../datePickerUtils';

describe('getMoment', () => {
  let constructor;

  describe('getMoment should return utc constructor from moment for flag true', () => {
    it('Given the getMoment is executed for flag true', () => {
      constructor = getMoment(true);
    });
    it('Expect the constructor to be utc', () => {
      expect(constructor).to.be.eql(moment.utc);
    });
  });

  describe('getMoment should return default constructor from moment for flag false', () => {
    it('Given the getMoment is executed for flag false', () => {
      constructor = getMoment(false);
    });
    it('Expect the constructor to be default', () => {
      expect(constructor).to.be.eql(moment);
    });
  });
});
