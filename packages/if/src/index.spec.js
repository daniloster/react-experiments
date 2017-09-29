import React from 'react';
import { mount } from 'enzyme';
import If from './index';

describe('<If/>', () => {
  let element;

  function mountComponent({ isValid = false, children = 'DANILOSTER IF' } = {}) {
    element = mount(
      <main>
        <If expression={isValid}>
          {children}
        </If>
      </main>
    );
  }

  function isTextPresent() {
    expect(element.text())
      .to.contain('DANILOSTER IF');
  }

  function isNotTextPresent() {
    expect(element.text())
      .to.not.contain('DANILOSTER IF');
  }

  describe('If should not display children', () => {
    it('Given the If has expression falsy', () => {
      mountComponent();
    });
    it('Expect the text to be not present', () => {
      isNotTextPresent();
    });
  });

  describe('If should display children wrapped by span when it is a string', () => {
    it('Given the If has expression truthy', () => {
      mountComponent({ isValid: true });
    });
    it('Expect the text to be present with wrapper', () => {
      isTextPresent();
      expect(element.find('span')).to.have.length(1);
      expect(element.find('div')).to.have.length(0);
    });
  });

  describe('If should display children with no wrap for components', () => {
    it('Given the If has expression truthy', () => {
      mountComponent({ isValid: true, children: <div>DANILOSTER IF</div> });
    });
    it('Expect the text to be present with no wrapper', () => {
      isTextPresent();
      expect(element.find('span')).to.have.length(0);
      expect(element.find('div')).to.have.length(1);
    });
  });

});
