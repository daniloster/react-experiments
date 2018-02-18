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
 * Provider for localization properties.
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
