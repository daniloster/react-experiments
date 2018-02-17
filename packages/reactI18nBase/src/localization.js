import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'fast-memoize';
import uuid from 'uuid/v4';

// localise

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
 * localise
 * Decorator that makes components consume the localization context.
 * @param {object} localeData - it is a map with key (international code: en, pt, fr).
 * @returns {function}
 * @public
 */
export function localise(localeData) {
  /**
   * Creates a wrapper class to obtain and pass down the internationalization metadata.
   * @param {React.Component} Component - it is a react component that will consume the
   * localization data.
   * @returns {function}
   * @public
   */
  return RawComponent =>
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
    class LocalisedComponent extends Component {
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

        return <RawComponent {...this.props} i18nMetadata={i18nMetadata} i18n={i18n} />;
      }
    };
}

// decorate

/**
 * Gets index for custom element referenced in the template
 * and according to the regex provided.
 * @param {string} template
 * @param {RegExp} regex
 */
function getIndex(template, regex) {
  return regex.test(template) ? Number(template.match(regex)[1]) : null;
}

/**
 * Interpolates list of elements into a string accordingly to its specified
 * position.
 * e.g.
 * text: "{0} will understand {2}"
 * args: ['You', ReactComponent<Ignored>, 'Me']
 * result: "You will understand Me"
 * @param {string|React.Component} text - it is the text to be interpolated
 * @param {array} args - it is the list of element to interpolate
 * @returns {string}
 */
function interpolateText(text, args) {
  if (!(typeof text === 'string')) {
    return text;
  }
  const regex = new RegExp(`\\{([0-${args.length - 1}])\\}`);
  let currentText = text;
  let index;
  /* eslint-disable */
  while ((index = getIndex(currentText, regex)) !== null) {
    /* eslint-enable */
    currentText = currentText.replace(new RegExp(`\\{${index}\\}`), args[index]);
  }
  return currentText;
}

function getPartialTextInterpolated(buildingExpression, RawComponent, index, args, uid) {
  const regex = new RegExp(`<${index}>(((\\w|\\W|\\s)(?!<${index}))+)<\\/${index}>`, 'i');

  const children = buildingExpression.match(regex);
  const hash = uuid();
  const partials = buildingExpression.replace(regex, hash).split(hash);
  if (children && children.length > 1 && partials.length === 2) {
    /* eslint-disable */
    return [
      ...interpolateComponents([partials[0]], RawComponent, index, args, uid),
      <RawComponent key={`${uid}:item-hashed-${hash}`}>{children[1]}</RawComponent>,
      ...interpolateComponents([partials[1]], RawComponent, index, args, uid),
    ];
    /* eslint-enable */
  }
  return buildingExpression;
}

/**
 * Interpolates list of decorators accordingly to its index reference in the
 * template provided as expression.
 * @param {array<string>} expression - it is the template sentence
 * @param {string|React.Component} RawComponent - it is a decorator, the wrapper
 * element positioned in the template according to its index.
 * @param {number} index - it is the Component index
 * @param {array<string|React.Component>} args - list of all decorators
 * @param {string} uid - reference id for the decoration group
 * @returns {array}
 */
function interpolateComponents(expression, RawComponent, index, args, uid) {
  const currentExpression = [...expression];
  let newExpression = [];
  let buildingExpression;
  while (currentExpression.length) {
    buildingExpression = interpolateText(currentExpression.shift(), args);
    if (buildingExpression === '') {
      /* eslint-disable */
      continue;
      /* eslint-enable */
    }
    if (typeof buildingExpression === 'string') {
      newExpression = newExpression.concat(
        getPartialTextInterpolated(buildingExpression, RawComponent, index, args, uid),
      );
    } else {
      newExpression = newExpression.concat(buildingExpression);
    }
    buildingExpression = '';
  }
  return newExpression;
}

/**
 * Creates a reduce function based on the interpolation of the Components
 * @param {array<string|React.Component>} args - list of all decorators
 * @param {string} uid - reference id for the decoration group
 * @returns {array}
 */
const createReduce = memoize((args, uid) => (expression, RawComponent, index) =>
  interpolateComponents(expression, RawComponent, index, args, uid),
);

/**
 * Decorates a string converting into function that is able to replace
 * the <0>value</0> by <Component>value</Component>, creating an array
 * from the message. The components are replaced according to the
 * regarding its index.
 * @param {string} text - it is the message to decorate.
 * @returns {function}
 */
export function decorate(text) {
  const uid = uuid();
  /**
   * Decorates the string previously provided generating an array with
   * strings wrapped by component according to its index.
   * @param {arguments} args - it is the list of arguments
   * @returns {array}
   */
  return memoize((...args) => {
    const reduce = createReduce([...args], uid);
    const decoratedItems = Array.from(args).reduce(reduce, [text]);
    return decoratedItems.map((item, index) => {
      const key = `${uid}:item-${index}`;
      if (typeof item === 'string') {
        return <span key={key}>{item}</span>;
      }
      return item;
    });
  });
}

export default {
  localise,
  decorate,
};
