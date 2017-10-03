import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
import DateInputField from './DateInputField';

import styles from './DatePicker.scss';

styles.invalid = 'invalid';

const invalidSelector = `.${styles.invalid}`;

describe('DateInputField', () => {
  let element;
  let textDate;
  let isValid;
  let format;
  let onChange;
  let onFocus;
  let onLeave;
  let onRestore;
  let date;

  function mountComponent(props = {}) {
    onChange = sinon.spy();
    onFocus = sinon.spy();
    onLeave = sinon.spy();
    onRestore = sinon.spy();
    date = (props.isUtc === undefined || props.isUtc? moment.utc : moment)([2017, 6, 13]);
    isValid = true;
    format = 'DD MMM YYYY';
    textDate = date.format(format);
    element = mount(
      <DateInputField
        isValid={typeof props.isValid === 'undefined' || props.isValid ? true : props.isValid}
        format={format}
        textDate={textDate}
        shouldChangeValueOnBlur={false}
        onChange={onChange}
        onFocus={onFocus}
        onLeave={onLeave}
        onRestore={onRestore}
        {...props}
      />
    );
  }

  describe('DateInputField should trigger the focus event', () => {
    it('Given the DateInputField component is ready', () => {
      mountComponent();
    });
    it('When I focus on the field', () => {
      element.find('input').simulate('focus');
    });
    it('Then the focus event should be called', () => {
      expect(onFocus.calledOnce).to.be.true;
    });
  });

  describe('DateInputField should trigger the change event on leave for flag "shouldChangeValueOnBlur" active', () => {
    it('Given the DateInputField component is ready', () => {
      mountComponent({ shouldChangeValueOnBlur: true });
    });
    it('When I leave the field', () => {
      element.find('input').simulate('blur');
    });
    it('Then the change event should be called', () => {
      expect(onChange.calledOnce).to.be.true;
      expect(onChange.lastCall.args).to.be.eql([{
        isSubmitting: true,
        isUtc: false,
        textDate,
        format,
      }]);
    });
  });

  describe('DateInputField should trigger the leave event', () => {
    it('Given the DateInputField component is ready', () => {
      mountComponent();
    });
    it('When I leave the field', () => {
      element.find('input').simulate('blur');
    });
    it('Then the leave event should be called', () => {
      expect(onLeave.calledOnce).to.be.true;
    });
  });

  describe('DateInputField should trigger the change event for "Enter" pressed', () => {
    it('Given the DateInputField component is ready', () => {
      mountComponent();
    });
    it('When I press "Enter" on the field', () => {
      element.find('input').simulate('keydown', { key: 'Enter' });
    });
    it('Then the change event should be called', () => {
      expect(onChange.calledOnce).to.be.true;
      expect(onChange.lastCall.args).to.be.eql([{
        isSubmitting: true,
        isUtc: false,
        textDate,
        format,
      }]);
    });
  });

  describe('DateInputField should trigger the change event for "Tab" pressed', () => {
    const stopPropagation = sinon.spy();
    it('Given the DateInputField component is ready', () => {
      mountComponent();
    });
    it('When I press "Enter" on the field', () => {
      element.find('input').simulate('keydown', { key: 'Tab', stopPropagation });
    });
    it('Then the leave event should be called', () => {
      expect(stopPropagation.calledOnce).to.be.true;
      expect(onLeave.calledOnce).to.be.true;
    });
  });

  describe('DateInputField should trigger the restore event for "Escape" pressed', () => {
    it('Given the DateInputField component is ready', () => {
      mountComponent();
    });
    it('When I press "Escape" on the field', () => {
      element.find('input').simulate('keydown', { key: 'Escape' });
    });
    it('Then the leave event should be called', () => {
      expect(onRestore.calledOnce).to.be.true;
    });
  });

  describe('DateInputField should not trigger any event for "Shift" pressed', () => {
    it('Given the DateInputField component is ready', () => {
      mountComponent();
    });
    it('When I press "Shift" on the field', () => {
      element.find('input').simulate('keydown', { key: 'Shift' });
    });
    it('Then there should be no event called', () => {
      expect(onChange.calledOnce).to.be.false;
      expect(onFocus.calledOnce).to.be.false;
      expect(onLeave.calledOnce).to.be.false;
      expect(onRestore.calledOnce).to.be.false;
    });
  });

  describe('DateInputField should trigger the change event for typing in', () => {
    it('Given the DateInputField component is ready', () => {
      mountComponent();
    });
    it('When I type on the field', () => {
      element.find('input').simulate('change', { target: { value: '17 Dec 2017' } });
    });
    it('Then the change event should be called', () => {
      expect(onChange.calledOnce).to.be.true;
      expect(onChange.lastCall.args).to.be.eql([{
        textDate: '17 Dec 2017',
        isSubmitting: false,
        isUtc: false,
        format,
      }]);
    });
  });

  describe('DateInputField should change class validation when isValid is changed', () => {
    it('Given the DateInputField has a valid date', () => {
      mountComponent();
      expect(element.find(invalidSelector)).to.have.length(0);
    });
    it('When the DateInputField gets invalid flag', () => {
      element.setProps({
        isValid: false,
      });
    });
    it('Then the DateInputField should have the invalid class', () => {
      expect(element.find(invalidSelector)).to.have.length(1);
    });
  });
});
