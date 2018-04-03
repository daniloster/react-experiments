#!/usr/bin/env node
const argsMap = {
  '-s': 'src',
  '-e': new RegExp('(node_modules\/|lib\/|dist\/|DEV\/|.spec.js|.nyc_output\/|coverage\/|mochawesome-reports\/|webpack\.config\.js|__test__)', 'i'),
  '-t': '../../tools/docs/template.md',
  '-o': 'API.md',
}

const argsMapProp = {
  '-s': 'source',
  '-e': 'exclude',
  '-t': 'template',
  '-o': 'output',
}

function parseArgs(args) {
  return Object.assign({}, Object.keys(argsMap).reduce(function(map, key) {
      const newMap = map;
      newMap[argsMapProp[key]] = argsMap[key];
      return newMap;
    }, {}));
}
const args = parseArgs(Array.from(process.argv).slice(2));

function parseData(data) {
  const packagePath = path.resolve(currentDirProcess, 'package.json');
  const pack = JSON.parse(fs.readFileSync(packagePath).toString());
  return {
    projectName: pack.name,
    description: pack.description,
    npmLink: `https://www.npmjs.com/package/${pack.name}`,
    files: Object.keys(data).map(function(key) {
      return args.exclude.test(key)
        ? null
        : {
          fileName: key,
          components: [].concat(data[key]),
        };
    }).filter(function(item) { return !!item; }),
  };
}

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const currentDirProcess = process.cwd();

function buildDocs(data) {
  const templatePath = path.resolve(currentDirProcess, args.template);
  const templateText = fs.readFileSync(templatePath).toString();
  const template = handlebars.compile(templateText);
  fs.writeFileSync(`${currentDirProcess}/${argsMap['-o']}`, template(data));
}

const json = [];
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  const value = process.stdin.read();
  if (value) {
    json.push(value);
  }
});

process.stdin.on('end', function() {
  const jsonText = json.join('');
  const jsonData = JSON.parse(jsonText);
  buildDocs(parseData(jsonData));
});
