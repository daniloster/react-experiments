import fs from 'fs';

const PROJECT_NAME = '[project-name]';
const PROJECT_DESCRIPTION = '[project-description]';
const UNDERSCORE_PROJECT_NAME = '[project-name-dashlines]';
const DASHLINES = '----------------------------------------------------------------------------------------------------';

export default function defineReadme({ workingDirectory, packageConfig }) {
  const readmePath = `${workingDirectory}/README.md`;
  const readmeTemplate = fs.readFileSync(readmePath).toString()
    .replace(PROJECT_NAME, packageConfig.name)
    .replace(UNDERSCORE_PROJECT_NAME, DASHLINES.slice(0, packageConfig.name.length))
    .replace(PROJECT_DESCRIPTION, packageConfig.description);
  fs.writeFileSync(readmePath, readmeTemplate);
}
