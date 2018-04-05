import sinon from 'sinon';
import {
  createTime,
  createTimeEffect,
  createTimeEffectWithArgs,
  createTimeWithArgs,
} from './timing';

function call() {
  /* eslint-disable */
  const args = Array.prototype.slice.apply(arguments);
  const invoke = args.shift();
  /* eslint-enable */
  const gen = invoke(...args);

  if (!gen) {
    return;
  }

  const current = [gen.next()];
  while (!current[current.length - 1].done) {
    current.push(gen.next(current[current.length - 1].value));
  }

  return current;
}

function createRef() {
  return { log: sinon.spy() };
}

/* eslint-disable */
function sum(n) {
  return Array(n)
    .fill(0)
    .map((_, index) => index + 1)
    .reduce((sumVal, val) => sumVal + val, 0);
}

function* pitagoras(x, y) {
  const catX = yield Math.pow(x, 2);
  const catY = yield Math.pow(y, 2);
  yield Math.pow(catX + catY, 1 / 2);
}
/* eslint-enable */

describe('createTime and createTimeWithArgs', () => {
  describe('computes time execution', () => {
    const ref = createRef();
    const timeFunc = createTime(ref);
    let sumElements;
    let result;
    it('Given I create a timed sum series function', () => {
      sumElements = timeFunc(sum);
    });
    it('When I execute the function sumElements for 10', () => {
      result = sumElements(10);
    });
    it('Then the execution time should be logged', () => {
      expect(ref.log.calledOnce).to.be.true;
      expect(ref.log.calledOnce).to.be.true;
      expect(ref.log.lastCall.args[0].name).to.be.eql('sum');
      expect(ref.log.lastCall.args[0].type).to.be.eql('function');
      expect(typeof ref.log.lastCall.args[0].ticksEllapsed).to.be.eql('number');
    });
    it('And the overall result should be 55', () => {
      expect(result).to.be.eql(55);
    });
  });

  describe('computes time execution for expensive function', () => {
    const ref = createRef();
    const timeFunc = createTime(ref);
    let sumElements;
    let result;
    it('Given I create a timed sum series function', () => {
      sumElements = timeFunc(sum);
    });
    it('When I execute the function sumElements for 100,000', () => {
      result = sumElements(100000);
    });
    it('Then the execution time should be logged', () => {
      expect(ref.log.calledOnce).to.be.true;
      expect(ref.log.lastCall.args[0].name).to.be.eql('sum');
      expect(ref.log.lastCall.args[0].type).to.be.eql('function');
      expect(ref.log.lastCall.args[0].ticksEllapsed > 0).to.be.true;
    });
    it('And the overall result should be 5,000,050,000', () => {
      expect(result).to.be.eql(5000050000);
    });
  });

  describe('computes time execution with args', () => {
    const ref = createRef();
    const timeFunc = createTimeWithArgs(ref);
    let sumElements;
    let result;
    it('Given I create a timed sum series function', () => {
      sumElements = timeFunc(sum);
    });
    it('When I execute the function sumElements for 100,000', () => {
      result = sumElements(100000);
    });
    it('Then the execution time should be logged', () => {
      expect(ref.log.calledOnce).to.be.true;
      expect(ref.log.lastCall.args[0].name).to.be.eql('sum');
      expect(ref.log.lastCall.args[0].type).to.be.eql('function');
      expect(ref.log.lastCall.args[0].args).to.be.eql([100000]);
      expect(ref.log.lastCall.args[0].ticksEllapsed > 0).to.be.true;
    });
    it('And the overall result should be 5,000,050,000', () => {
      expect(result).to.be.eql(5000050000);
    });
  });
});

describe('createTimeEffect and createTimeEffectWithArgs', () => {
  describe('computes time execution', () => {
    const ref = createRef();
    const timeFunc = createTimeEffect(ref);
    let pit;
    const result = [];
    it('Given I create a timed pitagoras generator', () => {
      pit = timeFunc(call, pitagoras);
    });
    it('When I execute the generator pit for 10 and 4', () => {
      pit = pit(10, 4);
      result.push(pit.next());
      while (!result[result.length - 1].done) {
        result.push(pit.next(result[result.length - 1].value));
      }
    });
    it('Then the execution time should be logged', () => {
      expect(ref.log.calledOnce).to.be.true;
      expect(ref.log.lastCall.args[0].name).to.be.eql('pitagoras');
      expect(ref.log.lastCall.args[0].type).to.be.eql('saga');
      expect(ref.log.lastCall.args[0].args).to.be.eql(undefined);
      expect(typeof ref.log.lastCall.args[0].ticksEllapsed).to.be.eql('number');
    });
  });

  describe('computes time execution for saga with args', () => {
    const ref = createRef();
    const timeFunc = createTimeEffectWithArgs(ref);
    let pit;
    const result = [];
    it('Given I create a timed pitagoras generator', () => {
      pit = timeFunc(call, pitagoras);
    });
    it('When I execute the generator pit for 10 and 4', () => {
      pit = pit(10, 4);
      const initialIteration = pit.next();
      result.push(initialIteration);
      while (!result[result.length - 1].done) {
        result.push(pit.next(result[result.length - 1].value));
      }
    });
    it('Then the execution time should be logged', () => {
      expect(ref.log.calledOnce).to.be.true;
      expect(ref.log.lastCall.args[0].name).to.be.eql('pitagoras');
      expect(ref.log.lastCall.args[0].type).to.be.eql('saga');
      expect(ref.log.lastCall.args[0].args).to.be.eql([10, 4]);
      expect(typeof ref.log.lastCall.args[0].ticksEllapsed).to.be.eql('number');
    });
  });
});
