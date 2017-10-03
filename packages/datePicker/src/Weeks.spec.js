import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
import Weeks from './Weeks';

import {
  getCalendar,
} from './datePickerUtils';

const dateSelector = 'button';

describe('Weeks', () => {
  let element;
  let month;
  let value;
  let calendar;
  let onClickItem;
  let date;

  function mountComponent() {
    onClickItem = sinon.spy();
    value = 1506785458000;
    date = moment.utc();
    month = date.month();
    calendar = getCalendar({ year: date.year(), month, isUtc: true });
    element = mount(
      <Weeks
        isUtc
        month={month}
        value={value}
        calendar={calendar}
        onClickItem={onClickItem}
      />
    );
  }

  describe('Weeks should trigger navigate when it is clicked', () => {
    it('Given the Weeks component is ready', () => {
      mountComponent();
    });
    it('When the date "15 Sep 2017" is clicked', () => {
      element.find(dateSelector)
        .filterWhere(item => item.text() === '15')
        .simulate('click');
    });
    it('Then the onClickItem should be called', () => {
      expect(onClickItem.calledOnce).to.be.true;
    });
  });
});
