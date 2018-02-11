import path from 'path';
import fs from 'fs';
import defineReadme from './defineReadme';
import definePackageJson from './definePackageJson';
import definePackageFolders from './definePackageFolders';
import getWorkingDirectory from './getWorkingDirectory';
import copyTemplateFolder from './copyTemplateFolder';

/**
 * Creates a project based on the packageConfig provided.
 * @param {Object} packageConfig - represents the config obtained from the terminal
 */
export default function createPackageFromTemplate(packageConfig) {
  try {
    const templateFilePath = fs.existsSync(path.resolve('node_modules/daniloster-cli/template/'))
      ? path.resolve('node_modules/daniloster-cli/template/')
      : path.resolve('template/');
    const workingDirectory = getWorkingDirectory({ packageConfig });
    const packageFolder = `${workingDirectory}/packages/${packageConfig.folderName}`;
    copyTemplateFolder(workingDirectory, packageFolder, templateFilePath);
    const packageJsonPath = `${packageFolder}/package.json`;

    /* eslint-disable */
    const packageContent = require(packageJsonPath);
    /* eslint-enable */

    definePackageJson({
      packageContent,
      packageConfig,
    });

    definePackageFolders({
      packageConfig,
      packageContent,
      packageJsonPath,
      packageFolder,
    });

    defineReadme({ workingDirectory: packageFolder, packageConfig });

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
