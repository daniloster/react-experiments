function isObjectEmpty(obj) {
  if (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  return true;
}

export default isObjectEmpty;
