import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { get, set } from 'mutation-helper';
import Input from '../DEV/Input';
import schemaData from '../DEV/schemaData';
import StateForm from './StateForm';
import StateFormItem from './StateFormItem';

import { noop } from '../../../tools/helpers/test/utils';
import { change } from '../../../tools/helpers/test/simulate';
import { assertPath, assertValue, length } from '../../../tools/helpers/test/assert';

let element;
let props;

function getComponentAsNode(customProps = {}) {
  props = {
    ...customProps,
    onSubmit: sinon.spy(),
  };

  return (
    <StateForm schemaData={schemaData} {...customProps}>
      <label htmlFor="description">Certificate description</label>
      <StateFormItem path="certificate.description">
        {({ onChangeValue, value }) => (
          <Input id="description" onChange={onChangeValue} value={value} />
        )}
      </StateFormItem>
      <br />

      <label htmlFor="firstname">Firstname</label>
      <StateFormItem path="firstname">
        {({ onChangeValue, value }) => (
          <Input id="firstname" onChange={onChangeValue} value={value} />
        )}
      </StateFormItem>
      <br />

      <label htmlFor="lastname">Lastname</label>
      <StateFormItem path="lastname">
        {({ onChangeValue, value }) => (
          <Input id="lastname" onChange={onChangeValue} value={value} />
        )}
      </StateFormItem>
      <br />

      <button onClick={props.onSubmit}>Submit</button>
    </StateForm>
  );
}

function mountComponent(props) {
  element = mount(getComponentAsNode(props), {
    lifecycleExperimental: true,
  });
}

function getStateForm() {
  return element.find(StateForm);
}

function changeValueMockingState(selector, value) {
  const instance = element.instance();
  instance.$setState = instance.setState;
  instance.setState = (state, callback = noop) => {
    instance.$setState(state);
    callback();
  };
  change(element.find(selector), value);
}

describe('<StateForm />', () => {
  describe('StateForm should update the state with value changed', () => {
    it('Given the StateForm has some inputs', () => {
      mountComponent({
        setData: sinon.spy(),
      });
    });
    it('When the user updates the firstname input field with "Mont"', () => {
      changeValueMockingState('input[type="text"][id="firstname"]', 'Mont');
    });
    it('Then the data in the state should have been updated with "Mont" as firstname', () => {
      assertPath(element.state(), 'data.firstname').eql(
        'Mont',
        'Expected {data.firstname} to be "Mont"',
      );
    });
    it('And the setData should have been called', () => {
      assertValue(props.setData.called).eql(true, 'setData was not called');
      assertValue(props.setData.calledOnce).eql(true, 'setData was called more than once');
    });
  });

  describe('StateForm should update the state with value changed', () => {
    const firstname = 'Mont';
    it('Given the StateForm has firstname set to "Mont"', () => {
      mountComponent({
        data: { firstname },
        setData: sinon.spy(),
      });
    });
    it('When the user updates the firstname input field with "Mont"', () => {
      changeValueMockingState('input[type="text"][id="firstname"]', firstname);
    });
    it('Then the data in the state should be the same', () => {
      assertPath(element.state(), 'data.firstname').eql(
        'Mont',
        'Expected {data.firstname} to be "Mont"',
      );
    });
    it('And the setData should have not been called', () => {
      assertValue(props.setData.called).eql(false);
    });
  });

  describe('StateForm should update the state with value changed', () => {
    const {
      firstname,
      ...alternativeSchemaData,
    } = schemaData;
    it('Given the StateForm has firstname set to "Mont"', () => {
      mountComponent();
    });
    it('When the StateForm is updated with new schemaData and shouldValidate', () => {
      element.setProps({
        schemaData: alternativeSchemaData,
        shouldValidate: true,
      });
    });
    it('Then the state sohuld be updated', () => {
      assertValue(element.state()).eql({
        ...element.state(),
        schemaData: alternativeSchemaData,
        shouldValidate: true,
      });
    });
  });

  describe('StateForm should not show validation messages', () => {
    it('Given the StateForm is not allowed to validate', () => {
      mountComponent({ shouldValidate: false });
    });
    it('Expect no validation message to be present', () => {
      length(element.find('.react__form-item-validation-message')).eql(0);
    });
  });

  describe('StateForm should show validation messages', () => {
    it('Given the StateForm is allowed to validate', () => {
      mountComponent({ shouldValidate: true });
    });
    it('Expect all validation messages to be present', () => {
      length(element.find('.react__form-item-validation-message')).eql(3);
    });
  });

  describe('StateForm should not show validation to valid data', () => {
    it('Given the StateForm is allowed to validate', () => {
      mountComponent({ shouldValidate: true });
    });
    it('When the user sets the firstname', () => {
      element.setState({ data: { firstname: 'Zeus' } });
    });
    it('Then the firstname validation should not be present', () => {
      expect(element.text()).to.not.contain('Firstname is required');
    });
    it('And it should contain 2 validation messages', () => {
      length(element.find('.react__form-item-validation-message')).eql(2);
    });
  });

  describe('StateForm should allow outer container manage the data change', () => {
    const firstname = 'Montreal';
    const _onChange = sinon.spy();
    function onChange(path, value) {
      const { data } = props;
      if (get(data, path) !== value) {
        const newData = set(data, path, value);
        props.data = newData;
        element.setProps({ data: newData });
        _onChange(path, value);
      }
    }

    it('Given the StateForm is mounted with onChange and data props', () => {
      mountComponent({ shouldValidate: true, data: {}, onChange });
    });
    it('When the user changes the firstname', () => {
      change(element.find('input[type="text"][id="firstname"]'), firstname);
    });
    it('Then the firstname validation should not be present', () => {
      expect(element.text()).to.not.contain('Firstname is required');
    });
    it('And the outer scope should have the data modified', () => {
      assertValue(props.data).eql({ firstname });
    });
    it('And the internal state should have the data modified as well', () => {
      assertValue(element.state().data).eql({ firstname });
    });
  });
});
