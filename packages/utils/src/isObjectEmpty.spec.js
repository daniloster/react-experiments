import { isObjectEmpty } from '../src';

describe('isObjectEmpty', () => {
  describe('isObjectEmpty should return true when an empty object is passed in', () => {
    const obj = {};
    let value;
    it(`Given isObjectEmpty is executed for object ${obj}`, () =>
      value = isObjectEmpty(obj)
    );
    it('Expect the result to be true', () => expect(value).to.be.equal(true));
  });

  describe('isObjectEmpty should return false when a non empty object is passed in', () => {
    const obj = {
      hello: 'world'
    };
    let value;
    it(`Given isObjectEmpty is executed for object ${obj}`, () =>
      value = isObjectEmpty(obj)
    );
    it('Expect the result is false', () => expect(value).to.be.equal(false));
  });

  describe('isObjectEmpty should return true when it receives invalid object', () => {
    const obj = null;
    let value;
    it(`Given isObjectEmpty is executed for object ${obj}`, () =>
      value = isObjectEmpty(obj)
    );
    it('Expect the result is false', () => expect(value).to.be.equal(true));
  });
});
