import moment from 'moment';
import {
  parseTimestamp,
  parseDatePickerProps,
  parsePartiallyTextDate,
  parseTextDate,
  DatePickerError,
  updateLocale,
} from '../datePickerUtils';

describe('parseTimestamp', () => {
  let value;
  let date;
  let textDate;
  let isValid;
  const FORMAT = 'DD/MM/YYYY HH:mm:ss';

  function setValues(args) {
    value = args.value;
    date = args.date;
    textDate = args.textDate;
    isValid = args.isValid;
  }

  describe('parseTimestamp converts a timestamp into valid object for local time', () => {
    it('Given the parseTimestamp is executed for local time', () => {
      setValues(parseTimestamp(1506785458836, FORMAT, false));
    });
    it('Expect the values to be correct', () => {
      expect(value).to.be.eql(1506785458836);
      expect(textDate).to.be.eql('30/09/2017 13:30:58');
      expect(isValid).to.be.true;
    });
  });

  describe('parseDatePickerProps converts an object which has timestamp into valid object for local time', () => {
    it('Given the parseDatePickerProps is executed for local time', () => {
      setValues(parseDatePickerProps({
        value: 1506785458836,
        isValid: false,
        format: FORMAT,
      }));
    });
    it('Expect the values to be correct', () => {
      expect(value).to.be.eql(1506785458836);
      expect(textDate).to.be.eql('30/09/2017 13:30:58');
      expect(isValid).to.be.true;
    });
  });

  describe('parseTimestamp converts a timestamp into valid object for utc time', () => {
    it('Given the parseTimestamp is executed for utc', () => {
      setValues(parseTimestamp(1506785458836, FORMAT, true));
    });
    it('Expect the values to be correct', () => {
      expect(value).to.be.eql(1506785458836);
      expect(textDate).to.be.eql('30/09/2017 15:30:58');
      expect(isValid).to.be.true;
    });
  });

  describe('parsePartiallyTextDate validates a text date as correct', () => {
    it('Given the parsePartiallyTextDate is executed for a correct date', () => {
      setValues(parsePartiallyTextDate('30/09/2017 15:30:58', FORMAT, true));
    });
    it('Expect the values to be correct', () => {
      expect(textDate).to.be.eql('30/09/2017 15:30:58');
      expect(isValid).to.be.true;
    });
  });

  describe('parsePartiallyTextDate validates a text date as incorrect', () => {
    it('Given the parsePartiallyTextDate is executed for an incorrect date', () => {
      setValues(parsePartiallyTextDate('30/JABOOM/2017 15:30:58', FORMAT, true));
    });
    it('Expect the values to be incorrect', () => {
      expect(textDate).to.be.eql('30/JABOOM/2017 15:30:58');
      expect(isValid).to.be.false;
    });
  });

  describe('parseTextDate parses and validates a text date as incorrect', () => {
    let error;
    it('Given the parseTextDate is executed for an incorrect date', () => {
      try {
        setValues(parseTextDate('30/JABOOM/2017 15:30:58', FORMAT, true));
      } catch (e) {
        error = e;
      }
    });
    it('Expect the DatePickerError to be thrown', () => {
      expect(DatePickerError.is(error)).to.be.true;
    });
  });

  describe('parseTextDate parses and validates a text date as correct', () => {
    it('Given the parseTextDate is executed for a correct date', () => {
      setValues(parseTextDate('30/09/2017 15:30:58', FORMAT, true));
    });
    it('Expect the values to be incorrect', () => {
      expect(Math.floor(value/1000)).to.be.eql(1506785458);
      expect(textDate).to.be.eql('30/09/2017 15:30:58');
      expect(isValid).to.be.true;
    });
  });

  describe('For sake of coverage', () => {
    updateLocale('pt');
    updateLocale('pt-BR');
    updateLocale('en');
  });
});
