import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import get from 'lodash/get';
import set from 'lodash/fp/set';
import Input from '../DEV/Input';
import schemaData from '../DEV/simpleSchemaData';
import FormState from '../src/FormState';
import FormStateItem from '../src/FormStateItem';
import { change } from '../../../tools/helpers/test/simulate';
import { assertPath, assertValue, length } from '../../../tools/helpers/test/assert';

let element;
let props;

function getComponentAsNode(customProps = {}) {
  props = {
    onSubmit: sinon.spy(),
    ...customProps,
  };

  return (
    <FormState schemaData={schemaData} {...customProps}>
      <label htmlFor="description">Certificate description</label>
      <FormStateItem path="certificate.description">
        {({ onChangeValue, value, validations }) => (
          <div>
            <Input id="description" onChange={onChangeValue} value={value} />
            {validations && validations.map(({ message }) => message)}
          </div>
        )}
      </FormStateItem>
      <br />

      <label htmlFor="firstname">Firstname</label>
      <FormStateItem path="firstname">
        {({ onChangeValue, value, validations }) => (
          <div>
            <Input id="firstname" onChange={onChangeValue} value={value} />
            {validations && validations.map(({ message }) => message)}
          </div>
        )}
      </FormStateItem>
      <br />

      <label htmlFor="lastname">Lastname</label>
      <FormStateItem path="lastname">
        {({ onChangeValue, value, validations }) => (
          <div>
            <Input id="description" onChange={onChangeValue} value={value} />
            {validations && validations.map(({ message }) => message)}
          </div>
        )}
      </FormStateItem>
      <br />

      <FormStateItem>
        {({ isAllValid }) => (
          <button onClick={props.onSubmit} disabled={!isAllValid()}>
            Submit
          </button>
        )}
      </FormStateItem>
    </FormState>
  );
}

function mountComponent(props) {
  element = mount(getComponentAsNode(props), {
    lifecycleExperimental: true,
  });
}

function getFormState() {
  return element.find(FormState);
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
      assertPath(element.state(), 'data.firstname').eql('Mont', 'Expected {data.firstname} to be "Mont"');
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
      assertPath(element.state(), 'data.firstname').eql('Mont', 'Expected {data.firstname} to be "Mont"');
    });
    it('And the setData should have not been called', () => {
      assertValue(props.setData.called).eql(false);
    });
  });

  describe('StateForm should update the state with value changed', () => {
    const { firstname, ...alternativeSchemaData } = schemaData;
    it('Given the StateForm has firstname set to "Mont"', () => {
      mountComponent();
    });
    it('When the StateForm is updated with new schemaData', () => {
      element.setProps({
        schemaData: alternativeSchemaData,
      });
    });
    it('Then the state sohuld be updated', () => {
      assertValue(element.state()).eql({
        ...element.state(),
        schemaData: alternativeSchemaData,
      });
    });
  });

  describe('StateForm should be valid for no schema', () => {
    it('Given the StateForm has no validations', () => {
      mountComponent({ schemaData: {} });
    });
    it('Expect no validation messages to be present', () => {
      length(element.find('.react__form-item-validation-message')).eql(0);
    });
    it('And to see the submit button enabled', () => {
      console.log('element.find("button").props().disabled:', element.find('button').props().disabled);
      assertValue(element.find('button').props().disabled).diff(true, 'Submit button should be enabled');
    });
  });

  describe('StateForm should be valid for all validations passed', () => {
    it('Given the StateForm has all valid data', () => {
      mountComponent({
        data: {
          firstname: 'Ypsum',
          lastname: 'Lorem',
          certificate: { description: '1 2 3 4 5 6 sete 8 nove 10' },
        },
      });
    });
    it('Expect no validation messages to be present', () => {
      length(element.find('.react__form-item-validation-message')).eql(0);
    });
    it('And to see the submit button enabled', () => {
      console.log('element.find("button").props().disabled:', element.find('button').props().disabled);
      assertValue(element.find('button').props().disabled).diff(true, 'Submit button should be enabled');
    });
  });

  describe('StateForm should show validation messages', () => {
    it('Given the StateForm is allowed to validate', () => {
      mountComponent({});
    });
    it('Expect all validation messages to be present', () => {
      length(element.find('.react__form-item-validation-message')).eql(4);
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
    it('And it should contain 3 validation messages', () => {
      length(element.find('.react__form-item-validation-message')).eql(3);
    });
  });

  describe('StateForm should allow outer container manage the data change', () => {
    const firstname = 'Montreal';
    const _onChange = sinon.spy();
    function onChange(path, value) {
      const { data } = props;
      if (get(data, path) !== value) {
        const newData = set(path, value, data);
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
