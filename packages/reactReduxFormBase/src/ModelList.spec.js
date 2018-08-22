import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import AppModelList from '../DEV/AppModelList';
import Input from '../DEV/Input';

import { change } from '../../../tools/helpers/test/simulate';
import { assertValue, length } from '../../../tools/helpers/test/assert';

let element;
let props;

function getComponentAsNode(customProps = {}) {
  props = {
    ...customProps,
    onSubmit: sinon.spy(),
  };

  return <AppModelList noLogging />;
}

function mountComponent(props) {
  element = mount(getComponentAsNode(props), {
    lifecycleExperimental: true,
  });
}

function getStateForm() {
  return element.find(StateForm);
}

describe('<Model />', () => {
  describe('Model should render children with list of atributes and contacts', () => {
    it('Given the AppModel has some inputs', () => {
      mountComponent();
    });
    it('Expect to see 7 inputs', () => {
      const inputs = element.find(Input);
      length(inputs).eql(7, 'There are no 7 elements rendered');
    });
  });

  describe('Model should update the primitive array item', () => {
    it('Given the AppModel has a list of attributes', () => {
      mountComponent();
    });
    it('When the user updates the second attribute field as "Classic"', () => {
      change(element.find('input[type="text"][id="attributes[1]"]'), 'Classic');
    });
    it('Then the state should have  "Classic" at index 1 of the attributes', () => {
      const store = element.instance().store;
      const state = store.getState().personSection;
      assertValue(state[state.dataName]).eql({ attributes: [, 'Classic'] }, 'Data is not the expected');
    });
  });

  describe('Model should update the complex array object', () => {
    it('Given the AppModel has a list of contacts', () => {
      mountComponent();
    });
    it('When the user updates the second contact field within "Classic"', () => {
      change(element.find('input[type="text"][id="contacts[1].value"]'), 'Classic');
    });
    it('Then the state should have  "Classic" in the property "value" at index 1 of the contacts', () => {
      const store = element.instance().store;
      const state = store.getState().personSection;
      assertValue(state[state.dataName]).eql(
        { contacts: [, { value: 'Classic' }] },
        'Data is not the expected',
      );
    });
  });
});
