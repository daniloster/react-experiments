import WebWorkerLogger from '../../src';
import rapid7Logging from './rapid7Logging';

const logger = new WebWorkerLogger({
  thread: rapid7Logging,
  args: [process.env.WEB_WORKER_RAPID7_LOG_TOKEN],
});

export default logger;
