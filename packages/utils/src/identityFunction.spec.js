import identityFunction from '../src/identityFunction';

describe('identity function', () => {
  it('Expect to be a function', () => {
    expect(typeof identityFunction).to.be.eql('function');
  });
  it('And to not do anything', () => {
    expect(identityFunction()).to.be.undefined;
  });
});