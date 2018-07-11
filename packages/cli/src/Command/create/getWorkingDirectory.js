/* eslint-disable */
import fs from 'fs';

export default function getWorkingDirectory({ packageConfig }) {
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
  return workingDirectory;
}
