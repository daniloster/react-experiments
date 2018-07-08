/* global expect */
import { get } from 'mutation-helper';

export function assertValue(val) {
  const expected = expect(val);

  return {
    eql: (value, message) => expected.to.be.eql(value, message),
    length: (total, message) => expected.to.have.length(total, message),
    contain: (text, message) => expected.to.contain(text, message),
  };
}

export function assertPath(source, path) {
  const val = get(source, path);
  return assertValue(val);
}

export function length(nodes) {
  return {
    eql: (total, message) => expect(nodes).to.have.length(total, message),
    diff: (total, message) => expect(nodes).to.not.have.length(total, message),
  };
}
