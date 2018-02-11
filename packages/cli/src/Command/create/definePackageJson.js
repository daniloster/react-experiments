function definePackageJson({
  packageContent,
  packageConfig,
}) {
  /* eslint-disable */
  packageContent.name = packageConfig.name;
  packageContent.description = packageConfig.description;
  packageConfig.dependencies.forEach((dependency) => {
    packageContent.dependencies[dependency.name] = dependency.version;
  });
  packageConfig.peerDependencies.forEach((dependency) => {
    packageContent.peerDependencies[dependency.name] = `^${dependency.version}`;
  });
  packageConfig.devDependencies.forEach((dependency) => {
    packageContent.devDependencies[dependency.name] = dependency.version;
  });
  /* eslint-enable */
}

export default definePackageJson;
