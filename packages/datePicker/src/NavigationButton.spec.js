import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import NavigationButton from './NavigationButton';

describe('NavigationButton', () => {
  let element;
  let navigate;

  const children = 'daniloster';

  function mountComponent() {
    navigate = sinon.spy();
    element = mount(
      <NavigationButton
        navigate={navigate}
      >
        {children}
      </NavigationButton>
    );
  }

  describe('NavigationButton should trigger navigate when it is clicked', () => {
    it('Given the NavigationButton is ready', () => {
      mountComponent();
    });
    it('When the NavigationButton is clicked', () => {
      element.simulate('click');
    });
    it('Then the navigate should be called', () => {
      expect(navigate.calledOnce).to.be.true;
    });
  });
});
