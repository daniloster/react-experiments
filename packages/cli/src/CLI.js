/* eslint-disable */
import program from 'commander';
import InputUtils from './Utils/InputUtils';
import Command from './Command';

console.log('Initialising react experiments CLI');

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

program
  .usage('<command> <packageName> [options]')
  .arguments('<command>')
  .arguments('<packageName>')
  .arguments('[options]')
  .option('-a, --addPrefix <Boolean>', 'Should add "daniloster-" prefix? (default: true)', InputUtils.parseBoolean)
  .option('-r, --isReact <Boolean>', 'Is it a react package?', InputUtils.parseBoolean)
  .option('-e, --description <String>', 'The package\'s description', '')
  .option('-D, --depth <Number>', 'How many folder levels should look it up towards root to find directory with lerna.json file?', InputUtils.parseInt)
  .option('-d, --dependencies <Array>', 'The package\'s dependencies', InputUtils.parseList)
  .option('-p, --peerDependencies <Array>', 'The package\'s peer dependencies', InputUtils.parseList)
  .option('-v, --devDependencies <Array>', 'The package\'s dev dependencies', InputUtils.parseList)
  .action((command, packageName) => {
    console.log('Command executed:', command, packageName);
    if (Command[command]) {
      Command[command](program, packageName);
    } else {
      console.log('There is no such a command like:', command);
    }
  })
  .parse(process.argv);
