import { invokeRequest } from '../src';

const data = {
  id: 1,
  name: 'Test Data'
};

function requestFn(requestData) {
  return new Promise(resolve => resolve(requestData));
}

function requestFailFn(requestData) {
  return new Promise((resolve, reject) => reject({ response: requestData }));
}


function requestFailEmptyFn() {
  return new Promise((resolve, reject) => reject({ }));
}

describe('invokeRequest', () => {
  describe('invokeRequest should return the resolved promise for successful call', () => {
    let value;
    it(`Given invokeRequest is executed for a successful call`, () =>
      value = invokeRequest(requestFn, data)
    );
    it('Expect the result is correct', (done) => {
      value.then(val => expect(val).to.be.eql(data));
      done();
    });
  });

  describe('invokeRequest should return the resolved promise for failing call', () => {
    let value;
    it(`Given invokeRequest is executed for a failing call`, () =>
      value = invokeRequest(requestFailFn, data)
    );
    it('Expect the result is correct', (done) => {
      value.then(val => expect(val).to.be.eql(data));
      done();
    });
  });

  describe('invokeRequest should return the resolved promise for failing call with no response prop', () => {
    let value;
    it(`Given invokeRequest is executed for a failing call with no response prop`, () =>
      value = invokeRequest(requestFailEmptyFn)
    );
    it('Expect the result is correct', (done) => {
      value.then(val => expect(val).to.be.empty);
      done();
    });
  });
});
