import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { renewContainer } from 'daniloster-utils';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  let element;
  let lastContainer;
  let login;
  const email = 'test@test.test';
  const password = 'test';
  const messages = {  };
  const defaultAuth = { email, messages };

  function mountComponent(props = {}) {
    lastContainer = renewContainer(lastContainer);
    login = sinon.spy();

    element = mount(
      <SignInForm
        auth={defaultAuth}
        login={login}
        {...props}
      />,
      {
        attachTo: lastContainer,
      }
    )
  }

  describe('SignInForm should display hello world', () => {
    it('Given the SignInForm is ready with email and password set', () => {
      mountComponent();
      element.instance().password.value = password;
    });
    it('When the user clicks on Login button', () => {
      element.find('button[type="submit"]').simulate('click');
    });
    it('Then the login action should have been called', () => {
      expect(login.calledOnce).to.be.true;
      expect(login.lastCall.args).to.be.eql([{
        email,
        password,
      }]);
    });
  });

});
