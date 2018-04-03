import co from 'co';
import prompt from 'co-prompt';
import { getDependenciesVersion } from '../../Utils/ApiUtils';
import InputUtils from '../../Utils/InputUtils';
import createPackageFromTemplate from './createPackageFromTemplate';

const DEFAULT_DESCRIPTION = 'react experiments package';
const DEFAULT_DEPTH = 10;
/**
 * Gets the CLI input for creating a new package and the package name
 * @param {String} packageName - represents the original package name without any prefix
 * @returns {void}
 */
export default function create(program, packageName) {
  const suggestedFolderName = InputUtils.parseCamelCase(packageName);
  co(function* () {
    const {
      addPrefix = true,
      isReact = true,
      description = yield prompt(`description (${DEFAULT_DESCRIPTION}): `),
      depth = InputUtils.parseInt((yield prompt(`depth (${DEFAULT_DEPTH}): `)) || DEFAULT_DEPTH),
      dependencies = InputUtils.parseList(yield prompt('dependencies: '), []),
      peerDependencies = InputUtils.parseList(
        yield prompt(`peerDependencies${isReact ? ' (react, prop-types)' : ''}: `),
        isReact ? ['react', 'prop-types'] : [],
      ),
      devDependencies = InputUtils.parseList(
        yield prompt(`devDependencies${isReact ? ' (react-docgen)' : ''}: `),
        isReact ? ['react-docgen'] : [],
      ),
      folderName = yield prompt(`folder name (${suggestedFolderName}): `),
    } = program;
    const project = {
      rawName: packageName,
      name: addPrefix ? `daniloster-${packageName}` : packageName,
      isReact,
      addPrefix,
      description: description || DEFAULT_DESCRIPTION,
      depth,
      dependencies,
      peerDependencies,
      devDependencies,
      folderName: folderName || suggestedFolderName,
    };
    project.dependencies = yield getDependenciesVersion(dependencies);
    project.peerDependencies = yield getDependenciesVersion(peerDependencies);
    project.devDependencies = yield getDependenciesVersion(
      peerDependencies.concat(devDependencies),
    );

    console.log('Creating project based on config: %s', JSON.stringify(project, null, 2));
    createPackageFromTemplate(project);
  });
}
