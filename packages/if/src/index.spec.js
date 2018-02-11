import React from 'react';
import { mount } from 'enzyme';
import If from './index';

describe('<If/>', () => {
  let element;

  function mountComponent({ isValid = false, then = () => 'DANILOSTER IF', otherwise = () => 'DANILOSTER ELSE' } = {}) {
    element = mount(
      <main>
        <If
          expression={isValid}
          otherwise={otherwise}
          then={then}
        />
      </main>
    );
  }

  function isTextPresent(text) {
    expect(element.text())
      .to.contain(text || 'DANILOSTER IF');
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

  describe('If should display component wrapped by span when it is a string', () => {
    it('Given the If has expression truthy', () => {
      mountComponent({ isValid: true });
    });
    it('Expect the text to be present with wrapper', () => {
      isTextPresent();
      expect(element.find('span')).to.have.length(1);
      expect(element.find('div')).to.have.length(0);
    });
  });

  describe('If should display component with no wrap for components', () => {
    it('Given the If has expression truthy', () => {
      mountComponent({ isValid: true, then: () => <div>DANILOSTER IF</div> });
    });
    it('Expect the text to be present with no wrapper', () => {
      isTextPresent();
      expect(element.find('span')).to.have.length(0);
      expect(element.find('div')).to.have.length(1);
    });
  });

  describe('If should display the otherwise component wrapped by span when it is a string', () => {
    it('Given the If has expression falsy', () => {
      mountComponent({
        isValid: false,
        otherwise: () => 'DANILOSTER ELSE',
      });
    });
    it('Expect the text to be present with wrapper', () => {
      isTextPresent('DANILOSTER ELSE');
      expect(element.find('span')).to.have.length(1);
      expect(element.find('div')).to.have.length(0);
    });
  });

  describe('If should display the otherwise component with no wrap for components', () => {
    it('Given the If has expression falsy', () => {
      mountComponent({
        isValid: false,
        then: () => <div>DANILOSTER IF</div>,
        otherwise: () => <div>DANILOSTER ELSE</div>,
      });
    });
    it('Expect the text to be present with no wrapper', () => {
      isTextPresent('DANILOSTER ELSE');
      expect(element.find('span')).to.have.length(0);
      expect(element.find('div')).to.have.length(1);
    });
  });

});
