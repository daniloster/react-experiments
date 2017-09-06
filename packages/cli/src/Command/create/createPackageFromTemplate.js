import path from 'path';
import fs from 'fs';
import run from './run';
import definePackageJson from './definePackageJson';
import definePackageFolders from './definePackageFolders';

// {
//   "rawName": "chess-challenge",
//   "name": "daniloster-chess-challenge",
//   "isReact": false,
//   "addPrefix": true,
//   "description": "react experiments package",
//   "dependencies": [
//     {
//       "name": "commander",
//       "version": "2.11.0"
//     },
//     {
//       "name": "axios",
//       "version": "0.16.2"
//     }
//   ],
//   "peerDependencies": [],
//   "devDependencies": [],
//   "folderName": "chessChallenge"
// }

/**
 * Creates a project based on the packageConfig provided.
 * @param {Object} packageConfig - represents the config obtained from the terminal
 */
export default function createPackageFromTemplate(packageConfig) {
  // const templateFilePath = path.resolve('template.tgz');
  const templateFilePath = path.resolve('template/');
  const currentWorkingDirectory = process.cwd();
  let workingDirectory = currentWorkingDirectory;
  let depth = packageConfig.depth || 10;
  while (depth && !fs.existsSync(`${workingDirectory}/lerna.json`)) {
    depth -= 1;
    workingDirectory = `${workingDirectory}/..`;
  }
  if (!depth) {
    throw new Error(
      'Navigation towards root to find the "lerna.json" file has failed.\nCurrent directory looking from:',
      currentWorkingDirectory);
  }
  const packageFolder = `${workingDirectory}/packages/${packageConfig.folderName}`;
  console.log('>> Copying template folder...');
  console.log('- from:', templateFilePath);
  console.log('- to:', packageFolder);
  console.log('>> Destine package folder created...');
  run('cp', ['-fvR', templateFilePath, packageFolder]);
  console.log('>> Template copied...');
  if (fs.existsSync(`${workingDirectory}/template/package.json`)) {
    console.log('>> Moving folder to the proper package...');
    const fromFolder = `${packageFolder}/template/`;
    console.log('- from:', fromFolder);
    console.log('- to:', packageFolder);
    run('mv', [fromFolder, packageFolder]);
  }

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

  process.exit(0);
}
