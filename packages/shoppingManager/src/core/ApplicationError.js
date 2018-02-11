
function ExtendableBuiltin(cls) {
  function Extendable() {
    /* eslint-disable */
    cls.apply(this, arguments);
    /* eslint-enable */
  }
  Extendable.prototype = Object.create(cls.prototype);
  Object.setPrototypeOf(Extendable, cls);

  return Extendable;
}

export default class ApplicationError extends ExtendableBuiltin(Error) {
  static is = e => e instanceof ApplicationError;
}
