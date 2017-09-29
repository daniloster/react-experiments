import moment from 'moment';
import {
  getCalendar,
} from '../datePickerUtils';

describe('getCalendar', () => {
  let calendar;

  function validateCalendar(startDay, endDay, month, year) {
    let currentMonth = moment([year, month]);
    if (startDay !== 1) {
      currentMonth.subtract(1, 'month');
    }
    let lastDay;
    calendar.forEach(({ start, end }) => {
      if (lastDay && lastDay > start.date()) {
        currentMonth.add(1, 'month');
        lastDay = start.date();
      } else if (lastDay) {
        lastDay += 1;
      } else {
        lastDay = startDay;
      }
      expect(start.date()).to.be.eql(lastDay);
      expect(start.month()).to.be.eql(currentMonth.month());
      if (lastDay > end.date()) {
        currentMonth.add(1, 'month');
        lastDay = end.date();
      } else {
        lastDay += 6;
      }
      expect(end.date()).to.be.eql(lastDay);
      expect(end.month()).to.be.eql(currentMonth.month());
      lastDay = end.date();
    });
    expect(lastDay).to.be.eql(endDay);
  }

  describe('getCalendar should the correct calendar without the first week of the next year', () => {
    it('Given the getCalendar is executed for December 2017', () => {
      calendar = getCalendar({ year: 2017, month: 11, isUtc: true });
    });
    it('Expect the calendar to be correct', () => {
      validateCalendar(26, 6, 11, 2017);
    });
  });

  describe('getCalendar should the correct calendar with previous and next month in it for November 2017', () => {
    it('Given the getCalendar is executed for November 2017', () => {
      calendar = getCalendar({ year: 2017, month: 10, isUtc: true });
    });
    it('Expect the calendar to be correct', () => {
      validateCalendar(29, 2, 10, 2017);
    });
  });

  describe('getCalendar should the correct calendar with previous and next month in it for Jaanuary 2017', () => {
    it('Given the getCalendar is executed for Janury 2017', () => {
      calendar = getCalendar({ year: 2017, month: 0, isUtc: true });
    });
    it('Expect the calendar to be correct', () => {
      validateCalendar(1, 4, 0, 2017);
    });
  });

  describe('getCalendar should the correct calendar with previous and next month in it for December 2016', () => {
    it('Given the getCalendar is executed for December 2016', () => {
      calendar = getCalendar({ year: 2016, month: 11, isUtc: true });
    });
    it('Expect the calendar to be correct', () => {
      validateCalendar(27, 31, 11, 2016);
    });
  });
});
