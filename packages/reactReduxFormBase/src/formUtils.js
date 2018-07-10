/**
 * No operation function
 */
// eslint-disable-next-line import/prefer-default-export
export function noop() {
  // no operation
}

/**
 * Gets the validation object associated to a field according to
 * the path provided and the schemaData.
 * @param {object} schemaData is the object which contains the validations
 * @param {string} path is the way to access the validation
 *
 * @returns {object} the validation object e.g. { $validate: function, $getMessage: function }
 */
export function getValidation(schemaData, path) {
  if (!path) {
    return null;
  }
  const altPath = path.replace(/\[\d+\]/g, '[]');
  const validation = schemaData[path] || schemaData[altPath];

  return validation;
}
