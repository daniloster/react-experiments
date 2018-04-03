/* glogal cov_1j3kd8u1dn */
import sinon from 'sinon';
import WebWorkerLogger from './WebWorkerLogger';

// Update the value every time when the file size changes
const WEB_WORKER_LOGGER_TOTAL_LINES = 120;

global.Blob = class Blob {
  constructor(arr) {
    let foundGlobalLine = false;
    let hasFinishedGlobalLine = false;
    let serialisedFunction = arr[0]
      .split(/\n/gi)
      .map((line) => {
        if (!foundGlobalLine && !hasFinishedGlobalLine && line.includes('const global = {')) {
          foundGlobalLine = true;
          return `
            global.onmessage = function(e) { console.log(e); };
            global.postMessage = function(e) { console.log(e); };
            global.threadMessage = function(e) { queue.add(e); };
        `;
        } else if (foundGlobalLine && !hasFinishedGlobalLine) {
          if (line.includes('postMessage: postMessage };')) {
            hasFinishedGlobalLine = true;
          }
          return '';
        }
        return line;
      })
      .join('\n')
      .replace(/_promise2\.default/gi, 'Promise');

    const coverageKeyHash = (serialisedFunction.match(/(cov_(\w+))/gi) || []).pop();
    if (coverageKeyHash) {
      global[coverageKeyHash] = global[coverageKeyHash] || {
        f: new Array(WEB_WORKER_LOGGER_TOTAL_LINES).fill(0),
        s: new Array(WEB_WORKER_LOGGER_TOTAL_LINES).fill(0),
      };
      serialisedFunction = serialisedFunction.replace(/(cov_(\w+))/gi, `global.${coverageKeyHash}`);
    }
    this.func = new Function('', serialisedFunction);
  }
};

window.URL = {
  createObjectURL: funcBlob => funcBlob,
};

class Worker {
  constructor(blobUrl) {
    this.run = blobUrl.func;
    this.run();
  }

  postMessage = (data) => {
    global.threadMessage({ data });
  };
}

global.Worker = Worker;

function generateIds(total) {
  return { ids: new Array(total).fill(1).map((_, idx) => idx + 1) };
}

const FIRST_LOG_DELAY = 200;
const SECOND_LOG_DELAY = 20;
const THIRD_LOG_DELAY = 50;
const FOURTH_LOG_DELAY = 10;
const FIFTH_LOG_DELAY = 10;
const TOTAL_DELAY =
  FIRST_LOG_DELAY + SECOND_LOG_DELAY + THIRD_LOG_DELAY + FOURTH_LOG_DELAY + FIFTH_LOG_DELAY;

let results = [];
global.postMessage = result => results.push(result);

function logging(token) {
  const url = `https://webhook.logentries.com/noformat/logs/${token}`;
  global.onmessage = e =>
    new Promise((resolve) => {
      setTimeout(() => {
        const expectedData = [
          url,
          {
            body: e.data,
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          },
        ];
        global.fetch(expectedData);
        resolve(expectedData);
      }, global.delays.shift());
    });
}

describe('WebWorkerLogger', () => {
  describe('throws exception for Worker not supported', () => {
    it('Given I create a web worker logger', () => {
      window.Worker = null;
      results = [];
      global.fetch = sinon.spy();
      try {
        new WebWorkerLogger({
          thread: logging,
          args: ['my-token-value'],
        });
      } catch (e) {
        results.push(e);
      }
    });
    it('Expect the instantiation throws an exception', () => {
      expect(results[0].message).to.be.eql('Web Worker is not supported.');
    });
  });

  describe('logs data synchronuously', () => {
    let logger;
    it('Given I create a web worker logger', () => {
      window.Worker = global.Worker;
      global.delays = [
        FIRST_LOG_DELAY,
        SECOND_LOG_DELAY,
        THIRD_LOG_DELAY,
        FOURTH_LOG_DELAY,
        FIFTH_LOG_DELAY,
      ];
      results = [];
      global.fetch = sinon.spy();
      logger = new WebWorkerLogger({
        thread: logging,
        args: ['my-token-value'],
      });
    });
    it('When I log data in a row for time delay 200ms, 20ms, 50ms, 10ms and 10ms', () => {
      logger.info(generateIds(50));
      logger.logMinimal(generateIds(1024));
      logger.debug(generateIds(12));
      logger.warning(generateIds(9));
      logger.error(generateIds(2), new Error('error base'));
    });
    it('Then all three logs should be performed synchronuously', (done) => {
      const EXTRA_TIMING = 300;
      setTimeout(() => {
        expect(global.fetch.called).to.be.true;
        expect(global.fetch.callCount).to.be.eql(5);
        done();
      }, EXTRA_TIMING + TOTAL_DELAY);
    });
    it('And the first log performed indeed should cotain 50 elements in the ids', () => {
      global.fetch.firstCall.args[0][1].body = global.fetch.firstCall.args[0][1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"1"');
      expect(global.fetch.firstCall.args[0]).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          body:
            '{"instanceId":"1","level":"INFO","event":{"track":"1","data":{"ids":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]}}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
    it('And the second log performed indeed should cotain 10 elements in the ids', () => {
      global.fetch.secondCall.args[0][1].body = global.fetch.secondCall.args[0][1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"2"');
      expect(global.fetch.secondCall.args[0]).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          body:
            '{"instanceId":"1","level":"INFO","event":{"track":"2","data":{"message":"[WARNING] data is too large"}}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
    it('And the second log performed indeed should cotain 12 elements in the ids', () => {
      global.fetch.thirdCall.args[0][1].body = global.fetch.thirdCall.args[0][1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"3"');
      expect(global.fetch.thirdCall.args[0]).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          body:
            '{"instanceId":"1","level":"DEBUG","event":{"track":"3","data":{"ids":[1,2,3,4,5,6,7,8,9,10,11,12]}}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
    it('And the second log performed indeed should cotain 9 elements in the ids', () => {
      global.fetch.getCall(3).args[0][1].body = global.fetch
        .getCall(3)
        .args[0][1].body.replace(
          /"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi,
          '"instanceId":"1"',
        )
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"4"');
      expect(global.fetch.getCall(3).args[0]).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          body:
            '{"instanceId":"1","level":"WARNING","event":{"track":"4","data":{"ids":[1,2,3,4,5,6,7,8,9]}}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
    it('And the second log performed indeed should cotain 2 elements in the ids', () => {
      const args = global.fetch.getCall(4).args[0];
      const body = args[1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"5"');
      delete args[1].body;
      expect(body).to.contain('"level":"ERROR"');
      expect(body).to.contain('"message":"error base"');
      expect(args).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
  });

  describe('logs data through the redux middleware', () => {
    let logger;
    const action = { type: 'MY_ACTION', ...generateIds(2) };
    it('Given I create a web worker logger', () => {
      window.Worker = global.Worker;
      global.delays = [
        FIRST_LOG_DELAY,
        SECOND_LOG_DELAY,
        THIRD_LOG_DELAY,
        FOURTH_LOG_DELAY,
        FIFTH_LOG_DELAY,
      ];
      results = [];
      global.fetch = sinon.spy();
      logger = new WebWorkerLogger({
        thread: logging,
        args: ['my-token-value'],
      });
    });
    it('When I log data through the middleware', () => {
      const middlewareNoFormat = logger.createMiddleware();
      const middlewareFormatting = logger.createMiddleware((type, data) => ({ type, ...data }));
      const store = { getState: () => ({ section: {} }) };
      const next = nextData => nextData;
      middlewareNoFormat(store)(next)(action);
      middlewareFormatting(store)(next)(action);
    });
    it('Then all three logs should be performed synchronuously', (done) => {
      const EXTRA_TIMING = 300;
      setTimeout(() => {
        expect(global.fetch.called).to.be.true;
        expect(global.fetch.callCount).to.be.eql(2);
        done();
      }, EXTRA_TIMING + TOTAL_DELAY);
    });
    it('And the first log performed indeed should cotain 2 elements in the ids', () => {
      global.fetch.firstCall.args[0][1].body = global.fetch.firstCall.args[0][1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"1"');
      expect(global.fetch.firstCall.args[0]).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          body:
            '{"instanceId":"1","level":"INFO","event":{"track":"1","data":{"type":"MY_ACTION","ids":[1,2]}}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
    it('And the second log performed indeed should cotain 2 elements in the ids', () => {
      global.fetch.secondCall.args[0][1].body = global.fetch.secondCall.args[0][1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"2"');
      expect(global.fetch.secondCall.args[0]).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          body:
            '{"instanceId":"1","level":"INFO","event":{"track":"2","data":{"type":"MY_ACTION","ids":[1,2]}}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
  });

  describe('logs errors through the redux middleware', () => {
    let logger;
    let result;
    const action = { type: 'MY_ACTION', ...generateIds(2) };
    it('Given I create a web worker logger', () => {
      window.Worker = global.Worker;
      global.delays = [
        FIRST_LOG_DELAY,
        SECOND_LOG_DELAY,
        THIRD_LOG_DELAY,
        FOURTH_LOG_DELAY,
        FIFTH_LOG_DELAY,
      ];
      results = [];
      global.fetch = sinon.spy();
      logger = new WebWorkerLogger({
        thread: logging,
        args: ['my-token-value'],
      });
    });
    it('When an action throws an Error', () => {
      const middlewareNoFormat = logger.createMiddleware();
      const store = { getState: () => ({ section: {} }) };
      const next = (_) => {
        throw new Error('Middleware error');
      };
      result = middlewareNoFormat(store)(next)(action);
    });
    it('Then all three logs should be performed synchronuously', (done) => {
      const EXTRA_TIMING = 300;
      setTimeout(() => {
        expect(global.fetch.called).to.be.true;
        // 1 logging and 1 error
        expect(global.fetch.callCount).to.be.eql(2);
        done();
      }, EXTRA_TIMING + TOTAL_DELAY);
    });
    it('And the first log performed indeed should cotain 2 elements in the ids', () => {
      global.fetch.firstCall.args[0][1].body = global.fetch.firstCall.args[0][1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"1"');
      expect(global.fetch.firstCall.args[0]).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          body:
            '{"instanceId":"1","level":"INFO","event":{"track":"1","data":{"type":"MY_ACTION","ids":[1,2]}}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
    it('And the second log performed indeed should cotain 2 elements in the ids and the type ERROR', () => {
      const args = global.fetch.secondCall.args[0];
      const body = args[1].body
        .replace(/"instanceId":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"instanceId":"1"')
        .replace(/"track":"(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})"/gi, '"track":"1"');
      delete args[1].body;
      expect(body).to.contain('"level":"ERROR"');
      expect(body).to.contain('"message":"Middleware error"');
      expect(body).to.contain('"data":{"type":"MY_ACTION","ids":[1,2]}');
      expect(args).to.be.eql([
        'https://webhook.logentries.com/noformat/logs/my-token-value',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      ]);
    });
    it('And the middleware should return the current state', () => {
      expect(result).to.be.eql({ section: {} });
    });
  });
});
