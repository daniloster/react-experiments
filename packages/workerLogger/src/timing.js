import { getMinimalData } from './dataUtils';

export function createTimeEffect(ref) {
  return (call, generator) =>
    function* () {
      /* eslint-disable */
      const args = Array.prototype.slice.apply(arguments);
      const { type = 'UNDEFINED' } = args[0];
      const timer = {
        type: 'saga',
        name: generator.name,
        action: type,
        ticksEllapsed: Date.now(),
      };
      yield call(generator, ...args);
      /* eslint-enable */
      timer.ticksEllapsed = Date.now() - timer.ticksEllapsed;
      yield call(ref.log, timer);
    };
}

export function createTimeEffectWithArgs(ref) {
  return (call, generator) =>
    function* () {
      /* eslint-disable */
      const args = Array.prototype.slice.apply(arguments);
      const { type = 'UNDEFINED' } = args[0];
      const timer = {
        type: 'saga',
        name: generator.name,
        ticksEllapsed: Date.now(),
        action: type,
        args: getMinimalData(args),
      };
      yield call(generator, ...args);
      /* eslint-enable */
      timer.ticksEllapsed = Date.now() - timer.ticksEllapsed;
      yield call(ref.log, timer);
    };
}

export function createTime(ref) {
  return func =>
    function () {
      /* eslint-disable */
      const timer = {
        type: 'function',
        name: func.name,
        ticksEllapsed: Date.now(),
      };
      const result = func.apply(null, arguments);
      /* eslint-enable */
      timer.ticksEllapsed = Date.now() - timer.ticksEllapsed;
      ref.log(timer);
      return result;
    };
}

export function createTimeWithArgs(ref) {
  return func =>
    function () {
      /* eslint-disable */
      const timer = {
        type: 'function',
        name: func.name,
        ticksEllapsed: Date.now(),
        args: getMinimalData(Array.prototype.slice.apply(arguments)),
      };
      const result = func.apply(null, arguments);
      /* eslint-enable */
      timer.ticksEllapsed = Date.now() - timer.ticksEllapsed;
      ref.log(timer);
      return result;
    };
}
