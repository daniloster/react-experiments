### How to use it

For binding the component with set of translatioins

```html
import { decorate, localise } from 'react-i18n-base';
```

For providing the current locale across the app.

```html
import { I18nProvider } from 'react-i18n-base';
```

### Demo

```js
const localization = require("./localization");
const decorate = localization.decorate;
const localise = localization.localise;
const I18nProvider = require("./I18nProvider").default;
const Greeting = require("./__test__/Greeting").default;
const GreetingLocale = require("./__test__/Greeting.locale").default;
const LanguagePicker = require("./__test__/LanguagePicker").default;
const LanguagePickerLocale = require("./__test__/LanguagePicker.locale")
  .default;

const GreetingLocalised = localise(GreetingLocale)(Greeting);
const LanguagePickerLocalised = localise(LanguagePickerLocale)(LanguagePicker);

class WrappedComponent extends React.Component {
  render() {
    return (
      <I18nProvider defaultLocale="en" locales={["en", "pt"]}>
        <LanguagePickerLocalised>
          <GreetingLocalised name="Leticia" />
        </LanguagePickerLocalised>
      </I18nProvider>
    );
  }
}

<WrappedComponent />;
```
