import React from 'react';
import { mount } from 'enzyme';

import HelloWorld from './HelloWorld';

describe(`<HelloWorld />`, () => {
  let element;

  function mountHelloWorld() {
    element = mount(<HelloWorld>daniloster</HelloWorld>);
  }

  describe('HelloWorld without props', () => {
    it('Given the HelloWorld is rendered', mountHelloWorld);
    it('Expect the text "daniloster" to be present', () => {
      expect(element.text()).to.be.equal('daniloster')
    });
  });
});