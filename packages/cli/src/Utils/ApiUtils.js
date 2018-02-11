import axios from 'axios';
import pack from '../../../../package.json';

const REACT_DEFAULT_DEPENDENCIES = ['react', 'prop-types', 'react-asciidoc-generator'];
/**
 * Performs an api call to obtain the dependencies' version.
 * Especial case for react.
 * @param {array} dependencies - list of string which is the dependency
 *
 * @returns {array<Promise<string>>}
 */
function getDependenciesVersion(dependencies) {
  return dependencies.filter(value => value).map((depName) => {
    const dependency = depName.trim();
    const isMappedDependency = REACT_DEFAULT_DEPENDENCIES.includes(dependency)
      && (pack.dependencies[dependency] || pack.devDependencies[dependency]);

    if (isMappedDependency) {
      return Promise.resolve({
        name: dependency,
        version: pack.dependencies[dependency] || pack.devDependencies[dependency],
      });
    }

    return new Promise((resolve) => {
      axios.request({
        method: 'get',
        url: `https://registry.npmjs.org/${dependency}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then((response) => {
        console.log(`** Dependency "${dependency}" version found as "${response.data['dist-tags'].latest}"!`);
        resolve({
          name: dependency,
          version: response.data['dist-tags'].latest,
        });
      }).catch((err) => {
        console.log('err:', err);
        console.log(`** Dependency "${dependency}" version not found!`);
        resolve({
          name: dependency,
          version: 'latest',
        });
      });
    });
  });
}

const instance = {
  getDependenciesVersion,
};

export { getDependenciesVersion };

export default instance;
