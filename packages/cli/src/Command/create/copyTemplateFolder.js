/* eslint-disable */
import fs from 'fs';
import run from './run';

export default function copyTemplateFolder(workingDirectory, packageFolder, templateFilePath) {
  console.log('>> Copying template folder...');
  console.log('- from:', templateFilePath);
  console.log('- to:', packageFolder);
  console.log('>> Destiny package folder created...');
  run('cp', ['-fvR', templateFilePath, packageFolder]);
  console.log('>> Template copied...');
  if (fs.existsSync(`${workingDirectory}/template/package.json`)) {
    console.log('>> Moving folder to the proper package...');
    const fromFolder = `${packageFolder}/template/`;
    console.log('- from:', fromFolder);
    console.log('- to:', packageFolder);
    run('mv', [fromFolder, packageFolder]);
  }
}
