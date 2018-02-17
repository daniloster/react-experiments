import React from 'react';
import { render } from 'react-dom';
import { decorate, localise, I18nProvider } from '../src';
import Greeting from '../src/__test__/Greeting';
import LabelForm from '../src/__test__/LabelForm';
import LanguagePicker from '../src/__test__/LanguagePicker';
import localeGreeting from '../src/__test__/Greeting.locale';
import localeLabelForm from '../src/__test__/LabelForm.locale';
import localeLanguagePicker from '../src/__test__/LanguagePicker.locale';

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

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

const element = (
  <I18nProvider defaultLang="en" locales={localeKeys}>
    <LanguagePickerI18n>
      <GreetingI18n name="Leticia" />
      <LabelFormI18n hasError />
      <LabelFormI18n hasSucceed />
    </LanguagePickerI18n>
  </I18nProvider>
);
render(element, div);
