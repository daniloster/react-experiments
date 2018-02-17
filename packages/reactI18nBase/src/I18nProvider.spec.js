import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import I18nProvider, { isValidChange, getStateFromProps } from './I18nProvider';
import { localise, decorate } from './localization';
import Greeting from './__test__/Greeting';
import LabelForm from './__test__/LabelForm';
import LanguagePicker from './__test__/LanguagePicker';
import localeGreeting from './__test__/Greeting.locale';
import localeLabelForm from './__test__/LabelForm.locale';
import localeLanguagePicker from './__test__/LanguagePicker.locale';

const localeKeys = [localeGreeting, localeLabelForm, localeLanguagePicker].reduce(
  (keys, locale = {}) =>
    Object.keys(locale)
      .filter(key => !keys.includes(key))
      .concat(keys),
  [],
);

const GreetingI18n = localise(localeGreeting)(Greeting);
const LabelFormI18n = localise(localeLabelForm)(LabelForm);
const LanguagePickerI18n = localise(localeLanguagePicker)(LanguagePicker);

describe('<I18nProvider />', () => {
  let element;
  let onChangeI18n;

  function mountI18nProvider(props = {}) {
    if (element) {
      element.detach();
      document.body.innerHTML = '';
    }
    const container = document.createElement('div');
    document.body.appendChild(container);

    onChangeI18n = sinon.spy();
    element = mount(
      <I18nProvider defaultLocale="en" locales={localeKeys} onChangeI18n={onChangeI18n} {...props}>
        <LanguagePickerI18n>
          <GreetingI18n name="Leticia" />
          <LabelFormI18n hasError />
          <LabelFormI18n hasSucceed />
        </LanguagePickerI18n>
      </I18nProvider>,
      {
        attachTo: container,
      },
    );
  }

  function assertGreetings(locale) {
    const localeData = {
      en: {
        greeting: 'Hi Leticia',
        message: 'You are so Awesome!',
      },
      pt: {
        greeting: 'Oi Leticia',
        message: 'Você é tão Fantástico(a)!',
      },
    };
    const greeting = element.find(GreetingI18n);
    expect(greeting.text()).to.contains(localeData[locale].greeting);
    expect(greeting.text()).to.contains(localeData[locale].message);
  }

  function assertLabelForm(locale) {
    const localeData = {
      en: {
        title: 'Creating label',
        description: 'Description',
        color: 'Color',
        button: 'Save',
        errorMessage: 'Error : label has not been created successfully.',
        successMessage: '[INFO] Success : label has been created successfully!',
      },
      pt: {
        title: 'Criando label',
        description: 'Descrição',
        color: 'Cor',
        button: 'Gravar',
        errorMessage: 'Erro : label não foi criado com sucesso.',
        successMessage: '[INFO] Sucesso : label foi criado com sucesso!',
      },
    };
    const labelForm = element.find(LabelFormI18n);
    const labelFormFirst = labelForm.first();
    const labelFormLast = labelForm.last();
    expect(labelFormFirst.text()).to.contains(localeData[locale].title);
    expect(labelFormLast.text()).to.contains(localeData[locale].title);
    expect(labelFormFirst.text()).to.contains(localeData[locale].description);
    expect(labelFormLast.text()).to.contains(localeData[locale].description);
    expect(labelFormFirst.text()).to.contains(localeData[locale].color);
    expect(labelFormLast.text()).to.contains(localeData[locale].color);
    expect(labelFormFirst.find('button').text()).to.contains(localeData[locale].button);
    expect(labelFormLast.find('button').text()).to.contains(localeData[locale].button);
    expect(labelFormFirst.text()).to.contains(localeData[locale].errorMessage);
    expect(labelFormLast.text()).to.contains(localeData[locale].successMessage);
  }

  function assertLanguagePicker(locale) {
    const localeData = {
      en: {
        languages: 'Languages',
        options: {
          en: 'Change to English',
          pt: 'Mude para Português',
        },
      },
      pt: {
        languages: 'Línguas',
        options: {
          en: 'Change to English',
          pt: 'Mude para Português',
        },
      },
    };
    const languagePicker = element.find(LanguagePickerI18n);
    expect(languagePicker.text()).to.contains(localeData[locale].languages);
    languagePicker.find('select').simulate('click');
    expect(languagePicker.find('select').text()).to.contains(localeData[locale].options.en);
    expect(languagePicker.find('select').text()).to.contains(localeData[locale].options.pt);
  }

  describe('getStateFromProps should return new state empty', () => {
    let value;
    it('Given getStateFromProps is executed for no props', () => {
      value = getStateFromProps({ defaultLocale: 'en', locale: 'en', locales: ['en'] });
    });
    it('Expect the new state to be empty', () => {
      expect(value).to.be.eql({});
    });
  });

  describe('I18nProvider should trigger external actions', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePickerI18n)', () => {
      mountI18nProvider();
    });
    it('When I change the language dropdown to portuguese', () => {
      element
        .find(LanguagePickerI18n)
        .find('select')
        .simulate('change', { target: { value: 'pt' } });
    });
    it('Then the onChangeI18n should be triggered', () => {
      expect(onChangeI18n.calledOnce).to.be.eql(true);
      expect(onChangeI18n.lastCall.args).to.be.eql([
        {
          locale: 'pt',
          locales: localeKeys,
        },
      ]);
    });
  });

  describe('I18nProvider should display sentences in english', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePickerI18n)', () => {
      mountI18nProvider();
    });
    it('Expect the GreetingI18n to have sentences in english', () => {
      assertGreetings('en');
    });
    it('And the LabelFormI18n to have sentences in english', () => {
      assertLabelForm('en');
    });
    it('And the LanguagePickerI18n to have sentences in english', () => {
      assertLanguagePicker('en');
    });
  });

  describe('I18nProvider should display sentences in portuguese', () => {
    it('Given the I18nProvider is portuguese with localised components: (GreetingI18n, LabelFormI18n, LanguagePickerI18n)', () => {
      mountI18nProvider({ defaultLocale: 'pt' });
    });
    it('Expect the GreetingI18n to have sentences in portuguese', () => {
      assertGreetings('pt');
    });
    it('And the LabelFormI18n to have sentences in portuguese', () => {
      assertLabelForm('pt');
    });
    it('And the LanguagePickerI18n to have sentences in portuguese', () => {
      assertLanguagePicker('pt');
    });
  });

  describe('I18nProvider should change translations triggered by props', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePickerI18n)', () => {
      mountI18nProvider();
    });
    it('When I change the props to portuguese', () => {
      element.setProps({
        locale: 'pt',
      });
    });
    it('Then the messages should be in portuguese', () => {
      assertGreetings('pt');
      assertLabelForm('pt');
      assertLanguagePicker('pt');
    });
  });

  describe('I18nProvider should not change translations triggered by not interested props', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePickerI18n)', () => {
      mountI18nProvider();
    });
    it('When I18nProvider gets not interested props', () => {
      element.setProps({
        house: 'I18nProvider',
      });
    });
    it('Then the messages should be the same', () => {
      assertGreetings('en');
      assertLabelForm('en');
      assertLanguagePicker('en');
    });
  });

  describe('I18nProvider should keep the previous translations selection when set to invalid localization', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePickerI18n)', () => {
      mountI18nProvider();
    });
    it('When I change the language dropdown to null', () => {
      const languagePicker = element.find(LanguagePickerI18n);
      languagePicker.find('select').simulate('change', { target: { value: null } });
    });
    it('Then the messages should be in portuguese', () => {
      assertGreetings('en');
      assertLabelForm('en');
      assertLanguagePicker('en');
    });
  });
});
