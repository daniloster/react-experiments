import fs from 'fs';
import run from './run';

function definePackageFolders({
  packageConfig,
  packageContent,
  packageJsonPath,
  packageFolder,
}) {
  const packageContentText = JSON.stringify(packageContent, null, 2);
  console.log('\n\n');
  console.log('- package.json:', packageContentText);
  console.log('\n\n');
  fs.writeFileSync(packageJsonPath, packageContentText);
  console.log('- package.json rewritten...');
  if (packageConfig.isReact) {
    run('rm', ['-r', `${packageFolder}/src-non-react`]);
    console.log('>> basic "src" removed...');
    run('mv', [`${packageFolder}/src-react`, `${packageFolder}/src`]);
    console.log('>> react "src" applied...');
    run('mv', [`${packageFolder}/DEV-react`, `${packageFolder}/DEV`]);
    console.log('>> react "DEV" applied...');
  } else {
    run('rm', ['-r', `${packageFolder}/src-react/`, `${packageFolder}/DEV-react/`]);
    console.log('>> react "DEV" and "src" removed...');
    run('mv', [`${packageFolder}/src-non-react`, `${packageFolder}/src`]);
    console.log('>> basic "src" applied...');
    run('rm', ['-r', `${packageFolder}/template/`]);
    console.log('>> template folder removed...');
  }
}

export default definePackageFolders;
