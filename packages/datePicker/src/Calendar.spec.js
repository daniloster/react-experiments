import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
import Calendar from './Calendar';

import {
  getCalendar,
} from './datePickerUtils';

import styles from './DatePicker.scss';

styles.calendarPreviousMonth = 'calendarPreviousMonth';
styles.calendarNextMonth = 'calendarNextMonth';
styles.calendarSelectedDay = 'calendarSelectedDay';
styles.calendarDay = 'calendarDay';
const calendarPreviousMonthSelector = `.${styles.calendarPreviousMonth}`;
const calendarNextMonthSelector = `.${styles.calendarNextMonth}`;
const calendarSelectedDaySelector = `.${styles.calendarSelectedDay}`;
const calendarDaySelector = `.${styles.calendarDay}`;

describe('Calendar', () => {
  let element;
  let value;
  let format;
  let onChange;
  let date;
  let currentTextDate;
  let selectedDate;

  function mountComponent(props = {}) {
    onChange = sinon.spy();
    date = (props.isUtc ? moment.utc : moment)(1506785458000);
    value = 1506785458000;
    format = 'DD/MM/YYYY HH:mm:ss';
    currentTextDate = date.format(format);
    element = mount(
      <Calendar
        hasWeekdays
        format={format}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }

  describe('Calendar should trigger change when 15 is clicked', () => {
    it('Given the Calendar is for September 2017', () => {
      mountComponent();
    });
    it('When the date "15 Sep 2017" is clicked', () => {
      element.find(calendarDaySelector)
        .filterWhere(item => item.text() === '15')
        .simulate('click');
      selectedDate = moment([date.year(), date.month(), 15]);
    });
    it('Then the onChange should be called', () => {
      expect(onChange.calledOnce).to.be.true;
      expect(onChange.lastCall.args).to.be.eql([{
        format,
        value: selectedDate.valueOf(),
        isUtc: false,
        isActive: true,
      }]);
    });
  });

  describe('Calendar should change to the previous month when a previous month date is clicked', () => {
    it('Given the Calendar is for September 2017', () => {
      mountComponent();
    });
    it('When the date "29 Aug 2017" is clicked', () => {
      element.find(calendarDaySelector)
        .filterWhere(item => item.text() === '29')
        .first()
        .simulate('click');
      selectedDate = moment([date.year(), date.month(), 29]).subtract(1, 'month');
    });
    it('Then the onChange should be called', () => {
      expect(onChange.calledOnce).to.be.false;
      const currentState = element.state();
      expect(currentState.month).to.be.eql(selectedDate.month());
      expect(currentState.year).to.be.eql(selectedDate.year());
    });
  });

  describe('Calendar should navigate through next months', () => {
    it('Given the Calendar is for September 2017', () => {
      mountComponent();
    });
    it('When I navigate 4 months ahead', () => {
      selectedDate = date;
      for (let i = 0; i < 4; i++) {
        element.find(calendarNextMonthSelector).first().simulate('click');
        selectedDate.add(1, 'month');
      }
    });
    it('Then the Calendar should be display "Jan 2018"', () => {
      expect(element.text()).to.contain('Jan 2018');
    });
  });

  describe('Calendar should navigate through previous months', () => {
    it('Given the Calendar is for September 2017', () => {
      mountComponent();
    });
    it('When I navigate 9 months backwards', () => {
      selectedDate = date;
      for (let i = 0; i < 9; i++) {
        element.find(calendarPreviousMonthSelector).first().simulate('click');
        selectedDate.subtract(1, 'month');
      }
    });
    it('Then the Calendar should be display "Dec 2016"', () => {
      expect(element.text()).to.contain('Dec 2016');
    });
  });
});
