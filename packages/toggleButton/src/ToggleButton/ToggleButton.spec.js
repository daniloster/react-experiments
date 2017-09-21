import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ToggleButton from './ToggleButton';

describe('<ToggleButton/>', () => {
  let element;
  let onChange;

  function mountComponent(props = { isChecked: true }) {
    onChange = sinon.spy();
    element = mount(
      <ToggleButton
        onChange={onChange}
        {...props}
      >props.children</ToggleButton>
    );
  }

  function clickOnButton() {
    element.find('button').simulate('click');
  }

  function isLastCallArgs(args) {
    expect(onChange.lastCall.args)
      .to.be.eql(args);
  }

  describe('ToggleButton should trigger on change when it is clicked', () => {
    it('Given the ToggleButton is checked', () => {
      mountComponent();
    });
    it('When the button is clicked', () => {
      clickOnButton();
    });
    it('Then onChange should be called with argument false', () => {
      isLastCallArgs([false]);
    });
  });

  describe('ToggleButton should update when prop isChecked gets changed', () => {
    it('Given the ToggleButton has been update with prop isChecked as false', () => {
      mountComponent();
      element.setProps({ isChecked: false });
    });
    it('When the button is clicked', () => {
      clickOnButton();
    });
    it('Then onChange should be called with argument true', () => {
      isLastCallArgs([true]);
    });
  });

});
