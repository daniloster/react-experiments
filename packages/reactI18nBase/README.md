## react-i18n-base

React component provider and functions that allow users to use internationalization in their apps.

## Getting Started

```
npm install react-i18n-base
```

```
yarn add react-i18n-base
```

### Dev code

```
//----------------------------------------------//
// Creating LocalisedComponent
//----------------------------------------------//
import { localise, decorate } from 'daniloster-react-i18n';

const Italic = ({ children }) => <i>{children}</i>;

const localeGreeting = {
  en: {
    greeting: 'Hi Guest!',
    message: decorate('You are <0>so</0> <1>Awesome</1>!'),
  },
  pt: {
    greeting: 'Oi Convidado!',
    message: decorate('<1>Você é</1> <0>tão</0> Fantástico!'),
  },
};

const Greeting = localise(localeGreeting)(({ i18n }) => (
  <div>
    <h2>{i18n.greeting}</h2>
    <div>{i18n.message('strong', Italic)}</div>
  </div>
));

const localeLabel = {
  en: {
    title: 'Creating label',
    description: 'Description',
    color: 'Color',
    errorMessage: decorate('<0>Error</0>: label has not been created successfully.'),
    successMessage: decorate('<0>Success</0>: label has been created successfully!'),
    button: 'Save',
  },
  pt: {
    title: 'Criando label',
    description: 'Descrição',
    color: 'Cor',
    errorMessage: decorate('<0>Erro</0>: label não foi criado com <1>sucesso</1>.'),
    successMessage: decorate('<0>Sucesso</0>: label foi criado com <1>sucesso</1>!'),
    button: 'Gravar',
  },
};
 *
const LabelForm = localise(localeLabel)(({ i18n, isError, isSuccess }) => (
  <div>
    <h2>{i18n.title}</h2>
    <form>
      <div>{i18n.description}</div>
      <input type="text" />
      <div>{i18n.color}</div>
      <input type="text" />
      {isError && (
        <div>
          {i18n.errorMessage(Italic, 'b')} // giving another perspective
        </div>
      )}
      {isSuccess && (
        <div>
          {i18n.successMessage(Italic, 'b')} // giving another perspective
        </div>
      )}
      <button type="submit">{i18n.button}</button>
    </form>
  </div>
));

//----------------------------------------------//
// Initialising the app
//----------------------------------------------//
import { I18nProvider } from 'daniloster-react-i18n';
// If you have the redux store provider wrapping and want to
// feed information from its state to the provider component,
// it is possible. Only need to create a mapStateToProps and
// an action to change the locale through reducer.

<Provider store={store}> {/* optional */}
  <div>
    <I18nProvider defaultLocale="en" locales={['en', 'pt']}>
      <Greeting /> {/* it will get the correct i18n object */}
      <LabelForm isError />
      <LabelForm isSuccess />
    </I18nProvider>
    {/*
    // The elements below will always display in portuguese, unless
    // you have internal components change the locale by action or
    // by the setI18n function provided by I18nProvider.
    */}
    <I18nProvider defaultLocale="pt">
      <Greeting /> {/* it will get the correct i18n object */}
      <LabelForm isError />
      <LabelForm isSuccess />
    </I18nProvider>
  </div>
</Provider>
```

## [API](https://github.com/daniloster/react-experiments/blob/master/packages/reactI18nBase/API.md)

## Test

```
npm test
```
