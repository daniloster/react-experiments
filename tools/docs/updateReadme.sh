#!/usr/bin/env node
function parseData() {
  const packages = PackageUtilities.getPackages(new Repository(process.cwd())).map(function(subPackage) {
    return {
      folderName: subPackage._location.split('/').pop(),
      name: subPackage._package.name,
    };
  });
  packages.sort(function(a, b) {
    if (a.name === b.name) {
      return 0;
    } else if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
  return {
    packages: packages,
  };
}

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
// Lerna utilities
const PackageUtilities = require('lerna/lib/PackageUtilities');
const Repository = require('lerna/lib/Repository');

const currentDirProcess = process.cwd();

function buildDocs(data) {
  const templatePath = path.resolve(currentDirProcess, './tools/docs/packages.md');
  const templateText = fs.readFileSync(templatePath).toString();
  const template = handlebars.compile(templateText);
  return template(data);
}

const output = buildDocs(parseData());
process.stdout.write(`\n${output}`);
