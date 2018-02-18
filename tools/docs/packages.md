{{#each packages}}
* [{{this.name}}](https://github.com/daniloster/react-experiments/blob/master/packages/{{this.folderName}}/README.md)
  [![NPM](https://img.shields.io/npm/v/{{this.name}}.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/{{this.name}}.svg?style=flat-square)](https://www.npmjs.com/package/{{this.name}})
{{/each}}
