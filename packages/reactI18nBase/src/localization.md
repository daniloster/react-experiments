### localise

It is a function that defines the correct dictionary `i18n` to the component based on the provider locale set.

### decorate

It is a function that builds an interpolator for a given string.

### Example

```python
// Import these in your component / locale file
import { decorate, localise } from 'react-i18n-base';
// Import this in the main app file
import { I18nProvider } from 'react-i18n-base';


const GreetingLocale = {
  en: {
    greeting: decorate("<1>Hi</1> <2>{0}</2>! You are <2>Awesome</2>.")
  },
  pt: {
    greeting: decorate("<1>Oi</1> <2>{0}</2>! Voce e <2>Incrivel</2>.")
  }
};
const Greeting = localise(GreetingLocale)(({ i18n, name }) => (
  <div>i18n.greeting(name, 'i', 'strong')</div>
));

<I18nProvider defaultLocale="en" locales={["en", "pt"]}>
  <Greeting name="Leticia" />
</I18nProvider>
```

In this example, it is possible to see the usage of `{[index]}` as a way to interpolate text. Besides, elements can be wrapped according to the index of the argument `<[index]>message here</[index]>` by standard HTML element or even react component with only children as required prop.
