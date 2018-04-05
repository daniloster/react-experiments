import WorkerLogger from 'worker-logger';
import insightOpsLogger from './insightOpsLogger';

const logger = new WorkerLogger({
  logger: insightOpsLogger,
  args: [process.env.WEB_WORKER_RAPID7_LOG_TOKEN],
});

export default logger;
