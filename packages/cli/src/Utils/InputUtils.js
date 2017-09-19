import camelize from 'camelize';

export default class InputUtils {
  /**
   * Converts a string into an array of strings
   * @param {String} value - represents an array of strings joined by comma ","
   * @param {String} defaultValue - represents an array of strings joined by
   * comma "," as default value
   * @returns {Array<String>}
   */
  static parseList(value = null, defaultValue) {
    if (value === null || value === '') {
      return defaultValue;
    }

    return value.toString().split(',')
      .map(text => text.trim());
  }

  /**
   * Converts a string into a boolean
   * @param {String} value - represents a boolean
   * @param {Boolean} defaultValue - represents the default boolean
   * @returns {Boolean}
   */
  static parseBoolean(value = null, defaultValue) {
    if (value === null || value === '') {
      return defaultValue;
    }
    return value.toString().toLowerCase() === 'true';
  }

  /**
   * Converts the package name into a camel case pattern.
   * @param {String} name - represents the package name
   * @returns {String}
   */
  static parseCamelCase(name) {
    return camelize(name);
  }

  /**
   * Converts a string value into integer.
   * @param {String} value - represents the value to be converted
   * @returns {Number}
   */
  static parseInt = parseInt

  /**
   * Converts a string value into float.
   * @param {String} value - represents the value to be converted
   * @returns {Number}
   */
  static parseFloat = parseFloat
}
