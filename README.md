# React Experiments
Sandbox for experimenting react

[Link to wiki](https://github.com/daniloster/react-experiments/wiki)

## Current jenkins versions
* node >= 6.9.5
* npm >= 3.9.3
* yarn (version may be check at `package.json`)
* lerna (version may be check at `lerna.json`)

## Getting started (at root level):
1. npm run tools
   this will install the correct version of yarn and lerna globally
2. npm run bootstrap
   this will bootstrap the packages
3. npm run validate (this will run test, coverage and check coverage, the packages will only get published if all them get passed)
   this will run in series: test, coverage and check-coverage for all packages affected
3. npm test (optional)
   will run the test for all packages affected
4. npm run coverage (optional)
   will run the coverage for all packages affected
5. npm run check-coverage (optional)
   will run the check-coverage for all packages affected (minimum is 95% for all: statements, branches, functions and lines)


## Packages:
* daniloster-hellow-world (boilerplate)
* daniloster-utils

