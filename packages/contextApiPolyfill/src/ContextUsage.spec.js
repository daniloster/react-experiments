import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import createContext from '../src';
import BackgroundContext from '../DEV/App/BackgroundContext';
import Switcher from '../DEV/App/Switcher';
import Text from '../DEV/App/Text';

/**
 * Here is being forced to set the React.createContext = createContext,
 * but, it is not required to do it as it gets set only if the createContext
 * is invalid (undefnied, null, 0, ''). As we are using React 16, the function
 * is already assigned, then, it is required for dev manually overrides it in
 * here.
 */
React.createContext = createContext;

const INITIAL_COLOR = {
  backgroundColor: 'red',
  paddingLeft: '15px',
  margin: '0 0 0 15px',
};

const TOGGLE_COLOR = {
  ...INITIAL_COLOR,
  backgroundColor: 'blue',
};

describe('Context usage', () => {
  let element;
  let unsubscribeSpy;

  function mountComponent() {
    element = mount(
      <Switcher>
        <Text>I have a name!</Text>
        <Text>I don't remember though...</Text>
        <Switcher>
          <Text>That is a nested context...</Text>
        </Switcher>
      </Switcher>,
    );
  }

  function unmountComponentAttached() {
    document.body.innerHTML = '';
    const container = document.createElement('div');
    document.body.appendChild(container);

    element = mount(
      <Switcher>
        <Text>I have a name!</Text>
        <Text>I don't remember though...</Text>
        <Switcher>
          <Text>That is a nested context...</Text>
        </Switcher>
      </Switcher>,
      { attachTo: container },
    );

    const consumer = element
      .find(BackgroundContext.Consumer)
      .first()
      .instance();
    consumer.$unsubscribe = consumer.unsubscribe;
    unsubscribeSpy = sinon.spy();
    consumer.unsubscribe = () => {
      unsubscribeSpy();
      consumer.$unsubscribe();
    };

    element.detach();
  }

  function assertAllTextComponentsWithInitialColor() {
    const nodes = element.find(Text).find('div.textBlock');
    expect(nodes).to.have.length(3);
    expect(nodes.at(0).props().style).to.be.eql(INITIAL_COLOR);
    expect(nodes.at(1).props().style).to.be.eql(INITIAL_COLOR);
    expect(nodes.at(2).props().style).to.be.eql(INITIAL_COLOR);
  }

  function toggleFirstSwitcher() {
    element
      .find('button[type="button"]')
      .at(0)
      .simulate('click');
    element.update();
  }

  function assertOnlyTheFirst2TextGetsNewColor() {
    const nodes = element.find(Text).find('div.textBlock');
    expect(nodes).to.have.length(3);
    expect(nodes.at(0).props().style).to.be.eql(TOGGLE_COLOR);
    expect(nodes.at(1).props().style).to.be.eql(TOGGLE_COLOR);
    expect(nodes.at(2).props().style).to.be.eql(INITIAL_COLOR);
  }

  function updateFirstSwitcherWithInitialColor() {
    element.setState({ backgroundColor: 'red' });
  }

  function assertConsumerWereUpdatedOnlyInitially() {
    const nodes = element.find(Text);
    expect(nodes).to.have.length(3);
    expect(nodes.at(0).instance().renderCount).to.be.eql(1);
    expect(nodes.at(1).instance().renderCount).to.be.eql(1);
    expect(nodes.at(2).instance().renderCount).to.be.eql(1);
  }

  function assertTextHasUnsubscribe() {
    expect(unsubscribeSpy.calledOnce).to.be.true;
  }

  describe('BackgroundContext unmounts correctly', () => {
    it('Given Text has been unmounted', unmountComponentAttached);
    it('Expect Text to unsubscribe changes', assertTextHasUnsubscribe);
  });

  describe('BackgroundContext transfers color value to consumers', () => {
    it('Given a Switcher and Text components using the context', mountComponent);
    it(
      'Expect all Text components to have initial background color',
      assertAllTextComponentsWithInitialColor,
    );
  });

  describe('BackgroundContext updates color in the consumers', () => {
    it('Given a Switcher and Text components using the context', mountComponent);
    it('When the first Switcher toggles the color', toggleFirstSwitcher);
    it(
      'Then the color should only change for the first context',
      assertOnlyTheFirst2TextGetsNewColor,
    );
  });

  describe('BackgroundContext does not update color in the consumers for the same value', () => {
    it('Given a Switcher and Text components using the context with initial color', mountComponent);
    it(
      'When the first Switcher receives the same color as update',
      updateFirstSwitcherWithInitialColor,
    );
    it('Then the consumer have the initial color', assertAllTextComponentsWithInitialColor);
    it('And the consumer should not have been updated', assertConsumerWereUpdatedOnlyInitially);
  });
});
