import HelloWorld from '../src/HelloWorld';

describe('HelloWorld', () => {
  describe('HelloWorld must match the value concatenated', () => {
    let value;
    it('Given the HelloWorld is concatenated to "Danilo"', () => {
      value = `${HelloWorld} Danilo`;
    });
    it('Expect the result to be "Hi you, hello world Danilo"', () => {
      expect(value).to.deep.equal('Hi you, hello world Danilo');
    });
  });
});
