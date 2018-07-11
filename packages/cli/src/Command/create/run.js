/* eslint-disable */
import {
  spawnSync,
} from 'child_process';

function run(command, args, errorMessage) {
  const processCommand = spawnSync(command, args);
  console.log('\n\n\n...');
  console.log('** Loging latest spawn process...');
  console.log(`>> ${command} ${args.join(' ')}`);
  if (processCommand.error) {
    console.log('- error:', processCommand.error.toString());
  }
  if (processCommand.stderr) {
    console.log('- stderr:', processCommand.stderr.toString());
  }
  if (processCommand.stdout) {
    console.log('- stdout:', processCommand.stdout.toString());
  }

  if (processCommand.error) {
    throw new Error(errorMessage || processCommand.error);
  }
}

export default run;
