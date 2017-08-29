Array.defineProperty = Object.defineProperty;

function Immutable(obj) {
  if (Immutable.isImmutable(obj) || obj === undefined) {
    return obj;
  }
  let newObject;
  if (Array.isArray(obj)) {
    const newArray = obj.map(item => Immutable(item));
    Array.defineProperty(newArray, '$isImmutable', {
      value: true,
      writable: false,
    });
    newObject = Object.freeze(newArray);
  } else if (obj && typeof obj === 'object') {
    newObject = Object.keys(obj).reduce((accumulator, key) => {
      const immutableObjects = accumulator;
      Object.defineProperty(immutableObjects, key, {
        value: obj[key] && typeof obj[key] === 'object' ? Immutable(obj[key]) : obj[key],
        enumerable: true,
        writable: false,
      });
      return immutableObjects;
    }, {});
    Object.defineProperty(newObject, '$isImmutable', {
      value: true,
      writable: false,
    });
    newObject = Object.freeze(newObject);
  } else {
    newObject = obj;
  }
  return newObject;
}

Immutable.isImmutable = (obj => Boolean(obj.$isImmutable));

export default Immutable;
