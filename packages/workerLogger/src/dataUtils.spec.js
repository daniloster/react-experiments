import { getMinimalData, getActionMinimalData, str, serialiseFunction } from './dataUtils';

describe('getActionMinimalData', () => {
  describe('returns warning message for JSON stringified bigger than 1024', () => {
    let result = {};
    it('Given getMinimalData is executed for big JSON', () => {
      result = getMinimalData({ bigdata: Array(1024).fill(1) });
    });
    it('Expect result to have warning message', () => {
      expect(result).to.be.eql({ message: '[WARNING] data is too large' });
    });
  });

  describe('returns JSON for small amount of bytes', () => {
    let result = {};
    const data = { bigdata: Array(312).fill(1) };
    it('Given getMinimalData is executed for small JSON', () => {
      result = getMinimalData(data);
    });
    it('Expect result to have the same object provided', () => {
      expect(result).to.be.eql(data);
    });
  });
});

describe('getActionMinimalData', () => {
  describe('returns JSON for small amount of bytes', () => {
    let result = {};
    const type = 'My Type';
    const data = { bigdata: Array(312).fill(1) };
    it('Given getMinimalData is executed for small JSON', () => {
      result = getActionMinimalData(type, data);
    });
    it('Expect result to have the same object provided and type combined', () => {
      expect(result).to.be.eql({ type, ...data });
    });
  });
});

describe('str', () => {
  describe('returns stringified JSON', () => {
    let result = {};
    const data = { type: 'My Type', bigdata: Array(5).fill(1) };
    const expected = '{"type":"My Type","bigdata":[1,1,1,1,1]}';
    it('Given str is executed for a JSON', () => {
      result = str(data);
    });
    it('Expect result to be the stringified JSON', () => {
      expect(result).to.be.eql(expected);
    });
  });

  describe('returns stringified message and stack if any object has both properties', () => {
    let result = {};
    const data = { message: 'Error', stack: 'Error on line 98' };
    const expected = '{"message":"Error","stack":"Error on line 98"}';
    it('Given str is executed for a JSON with message and stack', () => {
      result = str(data);
    });
    it('Expect result to be the stringified JSON containing only message and stack', () => {
      expect(result).to.be.eql(expected);
    });
  });

  describe('returns stringified Error object', () => {
    let result = {};
    const data = new Error('Testing exception');
    it('Given str is executed for an Error', () => {
      result = str(data);
    });
    it('Expect result to be the stringified JSON containing only message and stack', () => {
      result = JSON.parse(result);
      expect(result.message).to.be.eql('Testing exception');
      expect(result.stack.length > data.message.length).to.be.true;
    });
  });
});

describe('serialiseFunction', () => {
  describe('returns stringified JSON', () => {
    function sum(a, b) {
      return a + b;
    }
    let func = null;
    it('Given sum function is serialesed', () => {
      func = serialiseFunction(sum);
    });
    it('When I create function from serialisation', () => {
      func = new Function(func.args, func.body);
    });
    it('Then I should be able to execute the func', () => {
      expect(func(10, 7)).to.be.eql(17);
    });
  });
});
