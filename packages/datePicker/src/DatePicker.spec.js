import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
import If from 'daniloster-if';
import DatePicker from './DatePicker';
import DateInputField from './DateInputField';
import Calendar from './Calendar';

import styles from './DatePicker.scss';

styles.dateField = 'dateField';
styles.iconDatePickerIcon = 'iconDatePickerIcon';
styles.calendarDays = 'calendarDays';

const dateFieldSelector = `.${styles.dateField}`;
const iconDatePickerIconSelector = `.${styles.iconDatePickerIcon}`;
const calendarDaysSelector = `.${styles.calendarDays}`;

describe('DatePicker', () => {
  let element;
  let value;
  let textDate;
  let isValid;
  let format;
  let onChange;
  let onTextChange;
  let onRestore;
  let date;
  let lastContainer;

  function mountComponent(props = {}) {
    onChange = sinon.spy();
    onTextChange = sinon.spy();
    onRestore = sinon.spy();
    date = (props.isUtc === undefined || props.isUtc? moment.utc : moment)([2017, 6, 13]);
    isValid = true;
    format = 'DD MMM YYYY';
    textDate = date.format(format);
    value = date.valueOf();

    if (lastContainer) {
      document.body.removeChild(lastContainer);
    }

    lastContainer = document.createElement('div');
    document.body.appendChild(lastContainer);

    element = shallow(
      <DatePicker
        shouldKeepCalendarWhileSelecting={
          typeof props.shouldKeepCalendarWhileSelecting === 'undefined'
          || props.shouldKeepCalendarWhileSelecting
            ? true : props.shouldKeepCalendarWhileSelecting
        }
        isValid={
          typeof props.isValid === 'undefined'
          || props.isValid
            ? true : props.isValid
        }
        hasWeekdays={
          typeof props.hasWeekdays === 'undefined'
          || props.hasWeekdays
            ? true : props.hasWeekdays
        }
        format={format}
        textDate={textDate}
        value={value}
        shouldChangeValueOnBlur={false}
        onChange={onChange}
        onTextChange={onTextChange}
        onRestore={onRestore}
        {...props}
      />, {
        attachTo: lastContainer,
        lifecycleExperimental: true,
      },
    );
  }

  function mountComponentWithCalendarOpen(props) {
    mountComponent(props);
    element.find(iconDatePickerIconSelector).simulate('click');
  }

  function prepareSetTimeout() {
    const $setTimeout = global.setTimeout;
    before(() => {
      global.setTimeout = callback => callback();
    });
    after(() => {
      global.setTimeout = $setTimeout;
    });
  }

  describe('DatePicker should display the Calendar when icon is clicked', () => {
    prepareSetTimeout();
    it('Given the DatePicker component is ready', () => {
      mountComponent();
    });
    it('When I click on the calendar icon', () => {
      element.find(iconDatePickerIconSelector).simulate('click');
    });
    it('Then the Calendar should be present', () => {
      expect(element.find(Calendar)).to.have.length(1);
    });
  });

  describe('DatePicker should hide the Calendar when receive new value', () => {
    prepareSetTimeout();
    it('Given the DatePicker component has the Calendar open', () => {
      mountComponentWithCalendarOpen({ shouldKeepCalendarWhileSelecting: false });
      expect(element.find(Calendar)).to.have.length(1);
    });
    it('When the DatePicker gets new value', () => {
      element.setProps({ value: value + 5000 });
    });
    it('Then the Calendar should not be present', () => {
      expect(element.find(calendarDaysSelector)).to.have.length(0);
    });
  });

  describe('DatePicker should keep the Calendar open when receive new format', () => {
    prepareSetTimeout();
    it('Given the DatePicker component has the Calendar open', () => {
      mountComponentWithCalendarOpen({ shouldKeepCalendarWhileSelecting: false });
      expect(element.find(Calendar)).to.have.length(1);
    });
    it('When the DatePicker gets new format', () => {
      element.setProps({ format: 'DD-MM-YYYY' });
    });
    it('Then the Calendar should be present', () => {
      expect(element.find(Calendar)).to.have.length(1);
    });
  });

  describe('DatePicker should hide the Calendar when leave the input field', () => {
    prepareSetTimeout();
    it('Given the DatePicker component has the Calendar open', () => {
      mountComponentWithCalendarOpen();
      expect(element.find(Calendar)).to.have.length(1);
    });
    it('When I leave the input field', () => {
      element.find(DateInputField).simulate('blur');
    });
    it('Then the Calendar should not be present', () => {
      expect(element.find(calendarDaysSelector)).to.have.length(0);
    });
  });

  describe('DatePicker should add and remove event listener after full lifecyle', () => {
    let $on;
    let $off;
    let $onClickOut;
    prepareSetTimeout();
    before(() => {
      $on = document.on;
      $off = document.off;
      document.on = sinon.spy();
      document.off = sinon.spy();
    });
    after(() => {
      document.on = $on;
      document.off = $off;
    });
    it('Given the DatePicker component is ready', () => {
      mountComponent();
      $onClickOut = element.instance().onClickOut;
    });
    it('When the DatePicker is unmounted', () => {
      element.unmount();
    });
    it('Then the document should have added and remove listeners for clicking out', () => {
      expect(document.on.called).to.be.true;
      expect(document.on.lastCall.args).to.be.eql(['click', $onClickOut]);
      expect(document.off.called).to.be.true;
      expect(document.off.lastCall.args).to.be.eql(['click', $onClickOut]);
    });
  });

  describe('DatePicker for sake of coverage and enzyme buggy for react 16', () => {
    prepareSetTimeout();
    let $document;
    before(() => {
      $document = global.document;
    });
    after(() => {
      global.document = $document;
    });

    it('Given the DatePicker component has the Calendar open', () => {
      mountComponentWithCalendarOpen();
    });
    it('Expect the instance methods to work', () => {
      const component = element.instance();
      global.document = {
        ...global.document,
        activeElement: $document.createElement('div'),
      };
      component.setContainer($document.createElement('div'));
      component.onClickOut({ target: $document.createElement('div') });
      component.onClickOut({});
      component.onLeave({ e: {}, forceClose: false });
      component.onLeave({ e: {}, forceClose: true });
    });
  });
});
