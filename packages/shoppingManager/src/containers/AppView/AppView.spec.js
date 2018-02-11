import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { renewContainer } from 'daniloster-utils';
import AppView from './AppView';

describe('AppView', () => {
  let element;
  let lastContainer;

  function mountComponent() {
    lastContainer = renewContainer(lastContainer);

    element = mount(
      <AppView />,
      {
        attachTo: lastContainer,
      }
    )
  }

  describe('AppView should display hello world', () => {
    it('Given the Application is rendered', () => {
      mountComponent();
    });
    it('Expect the AppView to contain the hello world message', () => {
      expect(element.text()).to.contain('Hello world!');
    });
  });

});
