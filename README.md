# React Experiments
Sandbox for experimenting react

## Current jenkins versions

- node &gt;= 6.9.5
- npm &gt;= 3.9.3
- yarn (version may be check at `package.json`)
- lerna (version may be check at `lerna.json`)

## Getting started (at root level):

- npm run tools
this will install the correct version of yarn and lerna globally
- npm run bootstrap
this will bootstrap the packages
- npm run validate (this will run test, coverage and check coverage, the packages will only get published if all them get passed)
this will run in series: test, coverage and check-coverage for all packages affected
- npm test (optional)
will run the test for all packages affected
- npm run coverage (optional)
will run the coverage for all packages affected
- npm run check-coverage (optional)
will run the check-coverage for all packages affected (minimum is 95% for all: statements, branches, functions and lines)

## How to create a subpackage using the CLI?
```md
npm run cli -- create my-package-name // it will get generated at packages/myPackageName
```
More info:

```md
npm run cli -- --help
```
## Contributions rules

- Changes must be approved;
- Changes must have tests passing on Travis-CI;
- Changes must have coverage of 95% on Travis-CI for: statements, branches, functions and lines;
- Last commit message must have attribute `[release=&amp;amp;amp;amp;amp;amp;amp;lt;major|minor|patch|no-release&amp;amp;amp;amp;amp;amp;amp;gt;]`;

## Metrics
[![Build Status](https://img.shields.io/travis/daniloster/react-experiments/master.svg?style=flat-square)](https://travis-ci.org/daniloster/react-experiments) [![BCH compliance](https://bettercodehub.com/edge/badge/daniloster/react-experiments?branch=master)](https://bettercodehub.com/)

## Packages

- [daniloster-base-styles](https://github.com/daniloster/react-experiments/blob/master/packages/baseStyles/README.md)
[![NPM](https://img.shields.io/npm/v/daniloster-base-styles.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/daniloster-base-styles.svg?style=flat-square)](https://www.npmjs.com/package/daniloster-base-styles)
- [daniloster-cli](https://github.com/daniloster/react-experiments/blob/master/packages/cli/README.md)
[![NPM](https://img.shields.io/npm/v/daniloster-cli.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/daniloster-cli.svg?style=flat-square)](https://www.npmjs.com/package/daniloster-cli)
- [daniloster-date-picker](https://github.com/daniloster/react-experiments/blob/master/packages/datePicker/README.md)
[![NPM](https://img.shields.io/npm/v/daniloster-date-picker.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/daniloster-date-picker.svg?style=flat-square)](https://www.npmjs.com/package/daniloster-date-picker)
- [daniloster-hellow-world](https://github.com/daniloster/react-experiments/blob/master/packages/danilosterHelloWorld/README.md)
[![NPM](https://img.shields.io/npm/v/daniloster-hellow-world.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/daniloster-hellow-world.svg?style=flat-square)](https://www.npmjs.com/package/daniloster-hellow-world)
- [daniloster-if](https://github.com/daniloster/react-experiments/blob/master/packages/if/README.md)
[![NPM](https://img.shields.io/npm/v/daniloster-if.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/daniloster-if.svg?style=flat-square)](https://www.npmjs.com/package/daniloster-if)
- [daniloster-toggle-button](https://github.com/daniloster/react-experiments/blob/master/packages/toggleButton/README.md)
[![NPM](https://img.shields.io/npm/v/daniloster-toggle-button.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/daniloster-toggle-button.svg?style=flat-square)](https://www.npmjs.com/package/daniloster-toggle-button)
- [daniloster-utils](https://github.com/daniloster/react-experiments/blob/master/packages/utils/README.md)
[![NPM](https://img.shields.io/npm/v/daniloster-utils.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/daniloster-utils.svg?style=flat-square)](https://www.npmjs.com/package/daniloster-utils)
- [react-i18n-base](https://github.com/daniloster/react-experiments/blob/master/packages/reactI18nBase/README.md)
[![NPM](https://img.shields.io/npm/v/react-i18n-base.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/react-i18n-base.svg?style=flat-square)](https://www.npmjs.com/package/react-i18n-base)
- [worker-logger](https://github.com/daniloster/react-experiments/blob/master/packages/workerLogger/README.md)
[![NPM](https://img.shields.io/npm/v/worker-logger.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/worker-logger.svg?style=flat-square)](https://www.npmjs.com/package/worker-logger)

