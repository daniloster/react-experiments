import { shouldComponentUpdate } from '../src';

const currentProps = {
  total: 4,
  name: 'DAN'
},
nextProps = {
  total: 4,
  name: 'daniloster'
};

describe('shouldComponentUpdate', () => {
  describe('shouldComponentUpdate should return true when the keys provided have different values', () => {
    const keys = ['total', 'name'];
    let value;
    it(`Given shouldComponentUpdate is executed for keys ${keys}`, () =>
      value = shouldComponentUpdate(keys, currentProps, nextProps)
    );
    it('Expect the result is true', () => expect(value).to.be.equal(true));
  });

  describe('shouldComponentUpdate should return false when the keys provided have the same values', () => {
    const keys = ['total'];
    let value;
    it(`Given shouldComponentUpdate is executed for keys ${keys}`, () =>
      value = shouldComponentUpdate(keys, currentProps, nextProps)
    );
    it('Expect the result is false', () => expect(value).to.be.equal(false));
  });
});
