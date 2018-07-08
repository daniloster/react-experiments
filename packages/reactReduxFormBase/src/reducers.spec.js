import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import schemaData from '../DEV/schemaData';
import createReduxStoreSection from './createReduxStoreSection';
import { noop } from './formUtils';

import { assertPath, assertValue, length } from '../../../tools/helpers/test/assert';

const { initialState, reducer, actions } = createReduxStoreSection(
  'dataSection',
  'data',
  schemaData,
);

describe('reducers', () => {
  noop();

  let state;
  describe('changeValue should update value', () => {
    it('Given the changeValue changes the contact number', () => {
      state = reducer(initialState, actions.changeValue('contact.phone', '000 555 6666'));
    });
    it('Expect the state to have the contact number', () => {
      assertValue(state.data.contact.phone).eql('000 555 6666', 'The contact number is incorrect');
    });
  });

  describe('setData should update the state with new data', () => {
    it('Given the setData replace the full object', () => {
      state = reducer(initialState, actions.setData({ lastname: 'El' }));
    });
    it('Expect the data to be changed', () => {
      assertValue(state.data).eql({ lastname: 'El' }, 'The contact number is incorrect');
    });
  });

  describe('setShouldValidate should update the validate flag in the state', () => {
    it('Given the setShouldValidate sets the flag', () => {
      state = reducer(initialState, actions.setShouldValidate(true));
    });
    it('Expect the shouldValidate to be changed', () => {
      assertValue(state.shouldValidate).eql(true, 'shouldValidate is not true');
    });
  });
});
