import React from 'react';
import { mount } from 'enzyme';
import Weekdays from './Weekdays';

describe('Weekdays', () => {
  let element;

  function mountComponent() {
    element = mount(
      <div>
        <Weekdays />
      </div>
    );
  }

  describe('Weekdays should trigger navigate when it is clicked', () => {
    it('Given the Weekdays is ready', () => {
      mountComponent();
    });
    it('Expect the Weekdays to display all days of the week', () => {
      const text = element.text();
      expect(text).to.contain('Sun');
      expect(text).to.contain('Mon');
      expect(text).to.contain('Tue');
      expect(text).to.contain('Wed');
      expect(text).to.contain('Thu');
      expect(text).to.contain('Fri');
      expect(text).to.contain('Sat');
    });
  });
});
