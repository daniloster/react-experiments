/**
 * No operation function
 */
export function noop() {
  // no operation
}

const SKIP_VALIDATION = [{ isValid: true }];
function returnValid() {
  return SKIP_VALIDATION;
}

/**
 * Gets the validation object associated to a field according to
 * the path provided and the schemaData.
 * @param {object} schemaData is the object which contains the validations
 * @param {string} path is the way to access the validation
 *
 * @returns {function} the validation function
 */
export function getValidation(schemaData, path) {
  if (!path) {
    return returnValid;
  }
  const altPath = path.replace(/\[\d+\]/g, '[]');
  const validation = schemaData[path] || schemaData[altPath];

  return validation || returnValid;
}

/**
 * Creates a single function combining a list of function validations where
 * the execution will return a list of validations
 *
 * @param {array} validations - list of functions that validates form item
 *
 * @returns {function}
 */
export function combineValidations(...validations) {
  return (...args) => validations.map(validate => validate(...args));
}

/**
 * Append the partial validations to allValidations.
 * This function expects to be bond.
 *
 * @param {array} validations - list of partial validations to be added
 *
 * @returns {void}
 */
export function addValidations(...validations) {
  validations.forEach((validation) => {
    this.allValidations.push(validation);
  });
}

/**
 * Clears the allValidations property in the container provided.
 * This function expects to be bond.
 *
 * @returns {void}
 */
export function clearValidations() {
  this.allValidations = []; // eslint-disable-line no-param-reassign
}

/**
 * Iterates of the list of validations to indentify whether all them are valid.
 * This function expects to be bond. If no required validation is provided, it
 * assumes that is required to evaluate the full list of validations.
 *
 * @param {array} requiredValidations - list of paths required for the validation
 *
 * @returns {boolean}
 */
export function isAllValid(requiredValidations = []) {
  const validations = this.allValidations.filter(
    ({ path }) => requiredValidations.length === 0 || requiredValidations.includes(path),
  );
  const len = validations.length;
  for (let index = 0; index < len; index += 1) {
    if (!validations[index].isValid) {
      return false;
    }
  }

  return true;
}

/**
 * Creates a hash based on the path for onChangeValue function cache
 *
 * @param {string} path - path to access the data
 *
 * @returns {string}
 */
export function getOnChangeValueHash(path) {
  return `change:${path}`;
}
