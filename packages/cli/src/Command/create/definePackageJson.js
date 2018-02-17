function definePackageJson({ packageContent, packageConfig }) {
  const newPackageContent = packageContent;
  newPackageContent.name = packageConfig.name;
  newPackageContent.description = packageConfig.description;
  packageConfig.dependencies.forEach((dependency) => {
    newPackageContent.dependencies[dependency.name] = dependency.version;
  });
  packageConfig.peerDependencies.forEach((dependency) => {
    newPackageContent.peerDependencies[dependency.name] = `^${dependency.version}`;
  });
  packageConfig.devDependencies.forEach((dependency) => {
    newPackageContent.devDependencies[dependency.name] = dependency.version;
  });
}

export default definePackageJson;
