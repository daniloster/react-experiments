import Immutable from '../src/Immutable';

describe('Immutable', () => {
  describe('Immutable results should enumerable', () => {
    let value;
    it('Given an immutable object is created', () => {
      value = Immutable({
        test: 1
      });
    });
    it('Expect that the result is enumerable', () => {
      expect(Object.keys(value)).to.deep.equal(['test']);
    });
  });

  describe('Immutable results should not be reassignble', () => {
    let value, exception;
    it('Given an immutable object is created', () => {
      value = Immutable({
        test: 1
      });
    });
    it('When we try to reassign an object key', () => {
      try {
        value.test = 4;
      } catch (e) {
        exception = e.message;
      }
    });
    it('Then the object key should not be re-assignable', () => {
      expect(value.test).to.equal(1);
    });
    it('And an exception should be thrown', () => {
      expect(exception).to.be.defined;
    });
  });

  describe('Immutable results should not be assignable', () => {
    let value, exception;
    it('Given an immutable object is created', () => {
      value = Immutable({
        test: 1
      });
    });
    it('When we try to assign new key value', () => {
      try {
        value.arg = 2;
      } catch (e) {
        exception = e.message;
      }
    });
    it('Then the object key should not be assignable', () => {
      expect(value.arg).to.not.be.defined;
    });
    it('And an exception should be thrown', () => {
      expect(exception).to.be.defined;
    });
  });

  describe('Immutable results should have property __isImmutable', () => {
    let value;
    it('Given an immutable object is created', () => {
      value = Immutable({
        test: 1
      });
    });
    it('Expect that the object should have hidden property __isImmutable', () => {
      expect(Immutable.isImmutable(value)).to.equal(true);
    });
  });

  describe('Immutable array results should not be able to push one more value', () => {
    let value, exception;
    it('Given an immutable list has been created', () => {
      value = Immutable([1, 2, 3]);
    });
    it('When try to push one more value', () => {
      try {
        value.push(4);
      } catch (e) {
        exception = e.message;
      }
    });
    it('Then the list should not have grown in size', () => {
      expect(value).to.have.length(3);
    });
    it('And an exception should be thrown', () => {
      expect(exception).to.be.defined;
    });
  });

  describe('Immutable object results should be not parsed twice', () => {
    let value, valueSecondTimeParsed;
    it('Given an immutable object has been created', () => {
      value = Immutable({
        name: 'daniloster'
      });
    });
    it('When a second immutable object is created from the first one', () => {
      valueSecondTimeParsed = Immutable(value);
    });
    it('Then the first and second immutable objects should be the same instance', () => {
      expect(value).to.equal(valueSecondTimeParsed);
    });
  });

  describe('Immutable array results should be not parsed twice', () => {
    let value, valueSecondTimeParsed;
    it('Given an immutable list has been created', () => {
      value = Immutable([1, 2, 3]);
    });
    it('When a second immutable list is created the first one', () => {
      valueSecondTimeParsed = Immutable(value);
    });
    it('Then the first and second immutable lists should be the same instance', () => {
      expect(value).to.equal(valueSecondTimeParsed);
    });
  });

  describe('Immutable object as child should be parsed too', () => {
    let value, exception;
    it('Given an immutable list has been created', () => {
      value = Immutable({
        category: { description: 'I am immutable' }
      });
    });
    it('When a value is assigned to the child object', () => {
      try {
        value.category.description = 4;
      } catch (e) {
        exception = e.message;
      }
    });
    it('Then the first and second immutable lists should be the same instance', () => {
      expect(exception).to.be.defined;
      expect(value.category.description).to.be.equal('I am immutable');
    });
  });
});
