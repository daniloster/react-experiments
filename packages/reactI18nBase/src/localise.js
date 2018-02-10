import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'fast-memoize';

/**
 * Gets the specific translation according to the locale and defaultLocale
 * provided.
 * @param {string} defaultLocale - default language set.
 * @param {string} locale - current language set.
 * @param {object} localeData - map with language key for objects with key
 * for translation.
 * @returns {object}
 */
export const getI18n = memoize(
  (defaultLocale, locale, localeData) => localeData[locale] || localeData[defaultLocale],
);

/**
 * Creates the i18nMetadata from (defaultLocale, locale, locales, setI18n).
 * @param {string} defaultLocale - default language set.
 * @param {string} locale - current language set.
 * @param {object} localeData - map with language key for objects with key
 * for translation.
 * @param {string} setI18n - function that sets the current language.
 * @returns {object}
 */
export const getI18nMetadata = memoize((defaultLocale, locale, locales, setI18n) => ({
  defaultLocale,
  locale,
  locales,
  setI18n,
}));

/**
 * Merge the localeData provided as context and property.
 * @param {object} localeContext - map with language key for objects
 * with key for translation.
 * @param {object} localeProps - map with language key for objects
 * with key for translation.
 * @returns {object}
 */
export const mergeLocales = memoize((localeDataContext, localeDataProps) => ({
  ...(localeDataContext && localeDataContext),
  ...(localeDataProps && localeDataProps),
}));

/**
 * Decorator that makes components consume the localization context.
 * @param {object} localeData - it is a map with key (international code: en, pt, fr).
 * @returns {function}
 */
export default function localise(localeData) {
  /**
   * Creates a wrapper class to obtain and pass down the internationalization metadata.
   * @param {React.Component} Component - it is a react component that will consume the
   * localization data.
   * @returns {React.Component}
   */
  return Component =>
    /* eslint-disable */

    /**
     * LocalisedComponent
     * Wraps the component into a LocalisedComponent which resolves the localization
     * based on data passed by context and props.
     * e.g.
     * ```
     * <LocalisedComponent />
     * ```
     */
    class LocalisedComponent extends React.Component {
      /* eslint-enable */

      static contextTypes = {
        defaultLocale: PropTypes.string,
        locales: PropTypes.arrayOf(PropTypes.string),
        locale: PropTypes.string,
        setI18n: PropTypes.func,
      };

      static propTypes = {
        localeData: PropTypes.shape({}),
      };

      static defaultProps = {
        localeData: null,
      };

      render() {
        const { defaultLocale, locale, locales, setI18n } = this.context;
        const finalLocalizationData = mergeLocales(localeData, this.props.localeData);
        const i18nMetadata = getI18nMetadata(defaultLocale, locale, locales, setI18n);
        const i18n = getI18n(defaultLocale, locale, finalLocalizationData);

        return <Component {...this.props} i18nMetadata={i18nMetadata} i18n={i18n} />;
      }
    };
}
