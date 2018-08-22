import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import AppModel from '../DEV/AppModel';
import Input from '../DEV/Input';

import { change, click } from '../../../tools/helpers/test/simulate';
import { assertValue, length } from '../../../tools/helpers/test/assert';

let element;
let props;

function getComponentAsNode(customProps = {}) {
  props = {
    ...customProps,
    onSubmit: sinon.spy(),
  };

  return <AppModel noLogging />;
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
  describe('Model should render children', () => {
    it('Given the AppModel has some inputs', () => {
      mountComponent();
    });
    it('Expect to see 5 inputs', () => {
      const inputs = element.find(Input);
      length(inputs).eql(5, 'There are no 5 elements rendered');
    });
  });

  describe('Model should update the correct field', () => {
    it('Given the AppModel has some inputs', () => {
      mountComponent();
    });
    it('When the user updates the firstname input field with "Mont"', () => {
      change(element.find('input[type="text"][id="firstname"]'), 'Mont');
    });
    it('Then the state should have the firstname as "Mont"', () => {
      const store = element.instance().store;
      const state = store.getState().personSection;
      assertValue(state[state.dataName]).eql({ firstname: 'Mont' }, 'Data is not the expected');
    });
  });

  describe('Model should not show message for valid fields', () => {
    it('Given the AppModel has some inputs', () => {
      mountComponent();
    });
    it('When the user updates the firstname input field with "Mont"', () => {
      change(element.find('input[type="text"][id="firstname"]'), 'Mont');
    });
    it('And the user clicks on the validate button', () => {
      click(element.find('button[type="button"][id="btnValidate"]'));
    });
    it('Then the state should have the firstname as "Mont"', () => {
      const store = element.instance().store;
      const state = store.getState().personSection;
      assertValue(state[state.dataName]).eql({ firstname: 'Mont' }, 'Data is not the expected');
    });
    it('And it should have 6 invalid messages', () => {
      length(element.find('.react__form-item-validation-message')).eql(
        6,
        'There are no 6 validation messages',
      );
    });
  });

  describe('Model should update the correct field', () => {
    const onChangeValue = sinon.spy();
    it('Given the AppModel has firstname filled in', () => {
      mountComponent();
      change(element.find('input[type="text"][id="firstname"]'), 'Mont');
      const props = element.props();
      element.setProps({
        onChangeValue: (path, value) => {
          onChangeValue(path, value);
          props.onChangeValue(path, value);
        },
      });
    });
    it('When the user updates the firstname with the same value "Mont"', () => {
      change(element.find('input[type="text"][id="firstname"]'), 'Mont');
    });
    it('Then the state should have the firstname as "Mont"', () => {
      const store = element.instance().store;
      const state = store.getState().personSection;
      assertValue(state[state.dataName]).eql({ firstname: 'Mont' }, 'Data is not the expected');
    });
    it('And the change value should have not been called', () => {
      assertValue(onChangeValue.calledOnce).eql(false, 'onChangeValue has been called');
    });
  });
});
