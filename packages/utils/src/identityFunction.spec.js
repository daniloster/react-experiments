import identityFunction from '../src/identityFunction';

describe('identity function', () => {

  it('should not do anything', () => {
    expect(identityFunction()).to.be.empty;
  });
});