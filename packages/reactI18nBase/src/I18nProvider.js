/* eslint-disable */
import React, { Component } from 'react';
/* eslint-enable */
import PropTypes from 'prop-types';
import memoize from 'fast-memoize';
import { shouldComponentUpdate } from 'daniloster-utils';

/**
 * Returns true when is about a valid change.
 * @param {object} state
 * @param {string} key
 * @param {any} value
 */
export const isValidChange = memoize(
  (state, key, value) =>
    value && (!state || !state[key] || JSON.stringify(value) !== JSON.stringify(state[key])),
);

/* eslint-disable */

/**
 * Extract state from properties provided.
 * @param {object} state
 * @param {string} defaultLocale
 * @param {string} locale
 * @param {array<string>} locales
 */
export const getStateFromProps = memoize((state, defaultLocale, locale, locales) => {
  const newState = {};
  const _defaultLocale = defaultLocale || 'en';
  const _lang = locale || _defaultLocale;
  const _locales = locales || [_defaultLocale];
  if (isValidChange(state, 'defaultLocale', _defaultLocale)) {
    newState.defaultLocale = _defaultLocale;
  }
  if (isValidChange(state, 'locale', _lang)) {
    newState.locale = _lang;
  }
  if (isValidChange(state, 'locales', _locales)) {
    newState.locales = _locales;
  }

  return newState;
});

/* eslint-enable */

/**
 * I18nProvider
 * Provider for localization properties.
 * E.g.:
 * ```
 *  //----------------------------------------------//
 *  Creating LocalisedComponent
 *  //----------------------------------------------//
 *  import { localise, decorate } from 'daniloster-react-i18n';
 *
 *  const Italic = ({ children }) => <i>{children}</i>;
 *
 *  const localeGreeting = {
 *    en: {
 *      greeting: 'Hi Guest!',
 *      message: decorate('You are <0>so</0> <1>Awesome</1>!'),
 *    },
 *    pt: {
 *      greeting: 'Oi Convidado!',
 *      message: decorate('<1>Você é</1> <0>tão</0> Fantástico!'),
 *    },
 *  };
 *
 *  const Greeting = localise(localeGreeting)(({ i18n }) => (
 *    <div>
 *      <h2>{i18n.greeting}</h2>
 *      <div>{i18n.message('strong', Italic)}</div>
 *    </div>
 *  ));
 *
 *  const localeLabel = {
 *    en: {
 *      title: 'Creating label',
 *      description: 'Description',
 *      color: 'Color',
 *      errorMessage: decorate('<0>Error</0>: label has not been created successfully.'),
 *      successMessage: decorate('<0>Success</0>: label has been created successfully!'),
 *      button: 'Save',
 *    },
 *    pt: {
 *      title: 'Criando label',
 *      description: 'Descrição',
 *      color: 'Cor',
 *      errorMessage: decorate('<0>Erro</0>: label não foi criado com <1>sucesso</1>.'),
 *      successMessage: decorate('<0>Sucesso</0>: label foi criado com <1>sucesso</1>!'),
 *      button: 'Gravar',
 *    },
 *  };
 *
 *  const LabelForm = localise(localeLabel)(({ i18n, isError, isSuccess }) => (
 *    <div>
 *      <h2>{i18n.title}</h2>
 *      <form>
 *        <div>{i18n.description}</div>
 *        <input type="text" />
 *        <div>{i18n.color}</div>
 *        <input type="text" />
 *
 *        {isError && (
 *          <div>
 *            {i18n.errorMessage(Italic, 'b')} // giving another perspective
 *          </div>
 *        )}
 *        {isSuccess && (
 *          <div>
 *            {i18n.successMessage(Italic, 'b')} // giving another perspective
 *          </div>
 *        )}
 *        <button type="submit">{i18n.button}</button>
 *
 *      </form>
 *    </div>
 *  ));
 *
 *
 *
 *  //----------------------------------------------//
 *  Initialising the app
 *  //----------------------------------------------//
 *  import { I18nProvider } from 'daniloster-react-i18n';
 *
 *  // If you have the redux store provider and want to feed
 *  // information from its state to the I18nProvider component,
 *  // it is possible. Only required to create a mapStateToProps
 *  // and an action {onChangeI18n} to change the locale through
 *  // reducer. Altough redux provider is not required to use the
 *  // internationalization library.
 *
 *  <Provider store={store}>
 *    <div>
 *      <I18nProvider defaultLocale="en" locales={['en', 'pt']}>
 *        <Greeting />
 *        <LabelForm isError />
 *        <LabelForm isSuccess />
 *      </I18nProvider>
 *      <I18nProvider defaultLocale="pt">
 *        <Greeting />
 *        <LabelForm isError />
 *        <LabelForm isSuccess />
 *      </I18nProvider>
 *    </div>
 *  </Provider>
 * ```
 */
export default class I18nProvider extends Component {
  static childContextTypes = {
    /**
     * Default language when locale does not have current translation.
     */
    defaultLocale: PropTypes.string,
    /**
     * Current language.
     */
    locale: PropTypes.string,
    /**
     * List of localization provided. e.g. ['en', 'pt'].
     */
    locales: PropTypes.arrayOf(PropTypes.string),
    /**
     * Function to change the current language.
     */
    setI18n: PropTypes.func,
  };

  static propTypes = {
    /**
     * React node tree that expects the I18nProvider data.
     */
    children: PropTypes.node.isRequired,
    /**
     * Default language when locale does not have current translation.
     */
    defaultLocale: PropTypes.string.isRequired,
    /**
     * Current language.
     */
    locale: PropTypes.string,
    /**
     * List of localization provided. e.g. ['en', 'pt'].
     */
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Action to change the current language externally.
     */
    onChangeI18n: PropTypes.func.isRequired,
  };

  static defaultProps = {
    locale: null,
    onChangeI18n: () => true,
  };

  state = {
    ...getStateFromProps(null, this.props.defaultLocale, this.props.locale, this.props.locales),
  };

  getChildContext() {
    const { defaultLocale, locale, locales } = this.state;
    const childContext = {
      defaultLocale,
      locale,
      locales,
      setI18n: this.setI18n,
    };
    return childContext;
  }

  componentWillReceiveProps({ defaultLocale, locale, locales }, nextState) {
    const newState = getStateFromProps(nextState, defaultLocale, locale, locales);
    if (newState && Object.keys(newState)) {
      this.setState(newState);
    }
  }

  shouldComponentUpdate(_, nextState) {
    const shouldUpdate = shouldComponentUpdate(
      ['defaultLocale', 'locale', 'locales'],
      this.state,
      nextState,
    );
    return shouldUpdate;
  }

  setI18n = (locale) => {
    const { onChangeI18n } = this.props;
    const { locales } = this.state;

    if (locales.includes(locale)) {
      this.setState(
        ({ locale: currentLang }) => ({
          locale: locale || currentLang,
        }),
        () => onChangeI18n({ locale: this.state.locale, locales }),
      );
    }
  };

  render() {
    return this.props.children;
  }
}