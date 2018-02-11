import renewContainer from './renewContainer';

let value;

describe('renewContainer', () => {
  describe('renewContainer should return new element when undefined is provided', () => {
    it(`Given renewContainer is executed for undefined`, () => {
      value = renewContainer(undefined, false);
    });
    it('Expect the element returned to be a div', () => {
      expect(value.tagName).to.be.equal('DIV');
    });
  });

  describe('renewContainer should return new element when a previous is provided', () => {
    let initialElement;
    it(`Given renewContainer is executed for undefined`, () => {
      initialElement = renewContainer(undefined);
      value = renewContainer(initialElement);
    });
    it('Expect the element returned to be a div', () => {
      expect(value.tagName).to.be.equal('DIV');
      expect(initialElement.tagName).to.be.equal('DIV');
      expect(value).to.not.be.equal(initialElement);
    });
  });
});
