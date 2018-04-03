import uuid from 'uuid/v4';
import {
  createTimeEffect,
  createTimeEffectWithArgs,
  createTimeWithArgs,
  createTime,
} from './timing';
import { getMinimalData, str, getActionMinimalData } from './dataUtils';
import SynchQueue from './SynchQueue';

function createBlobFunctionUrl(func, args) {
  const blob = new Blob(
    [
      `
      ${SynchQueue.toString()}

      const queue = new SynchQueue([], item => global.onmessage(item));
      onmessage = function(event) {
        queue.add(event);
      };

      const global = {
        onmessage: function(e) { console.log(e); },
        postMessage: postMessage };

      const init = ${func.toString()};
      init.apply(null, ${str(args)});
    `,
    ],
    { type: 'text/javascript' },
  );
  return window.URL.createObjectURL(blob);
}

export default class WebWorkerLogger {
  static LOG_LEVEL = Object.freeze({
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
  });

  constructor(options) {
    const { thread, args, format = data => data } = options;
    const blobUrl = createBlobFunctionUrl(thread, args);
    const instanceId = uuid();
    let worker = null;
    if (!window.Worker) {
      throw Error('Web Worker is not supported.');
    }
    worker = new Worker(blobUrl);

    this.getInstanceId = () => instanceId;
    this.getBlobUrl = () => blobUrl;
    this.getWorker = () => worker;
    this.format = format;
  }

  createMiddleware = format => store => next => (action) => {
    const { type, ...data } = action;
    const formattedAction = (format || getActionMinimalData)(type, data);
    const track = this.log(formattedAction);
    try {
      return next(action);
    } catch (e) {
      this.error(formattedAction, e, track);
      return store.getState();
    }
  };

  log = (data, logLevel = WebWorkerLogger.LOG_LEVEL.INFO, track, exception) => {
    const id = track || uuid();
    let logData = {
      instanceId: this.getInstanceId(),
      level: logLevel,
      event: { track: id, data },
    };
    if (exception) {
      logData = {
        ...logData,
        level: WebWorkerLogger.LOG_LEVEL.ERROR,
        exception: { message: exception.message, stack: exception.stack.replace(/(\n)/gi, '\\n') },
      };
    }
    this.getWorker().postMessage(str(this.format(logData)));
    return id;
  };

  logMinimal = (data, logLevel, track, exception) => {
    this.log(getMinimalData(data), logLevel, track, exception);
  };

  debug = (data, track) => {
    this.log(data, WebWorkerLogger.LOG_LEVEL.DEBUG, track);
  };

  error = (data, exception, track) => {
    this.log(data, WebWorkerLogger.LOG_LEVEL.ERROR, track, exception);
  };

  info = (data, track) => {
    this.log(data, WebWorkerLogger.LOG_LEVEL.INFO, track);
  };

  warning = (data, track) => {
    this.log(data, WebWorkerLogger.LOG_LEVEL.WARNING, track);
  };

  timeEffect = createTimeEffect(this);

  timeEffectWithArgs = createTimeEffectWithArgs(this);

  time = createTime(this);

  timeWithArgs = createTimeWithArgs(this);
}
