import CLI from '../src/CLI';

describe('CLI', () => {
  describe('CLI must match the value concatenated', () => {
    let value;
    it('Given the CLI is concatenated to "Danilo"', () => {
      value = `${CLI} Danilo`;
    });
    it('Expect the result to be "Hi you, hello world Danilo"', () => {
      expect(value).to.deep.equal('Hi you, hello world Danilo');
    });
  });
});
