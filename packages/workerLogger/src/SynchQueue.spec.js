import sinon from 'sinon';
import SynchQueue from './SynchQueue';

describe('SynchQueue', () => {
  describe('adds elements synchronuosly', () => {
    const timeSleeping = [500, 200, 10];
    const notify = sinon.spy();
    const consumer = item =>
      new Promise((resolve) => {
        notify(item);
        setTimeout(resolve, timeSleeping.shift());
      });
    let list;
    it('Given I create a SynchQueue with initial 1 element', () => {
      list = new SynchQueue([{ id: 11 }], consumer);
    });
    it('When I add more two elements', () => {
      list.add({ id: 22 });
      list.add({ id: 33 });
    });
    it('Then the elements should be consumed in order', (done) => {
      // expect(notify.calledOnce).to.not.be.true;
      expect(notify.called).to.be.true;
      list.getCurrentPromise().then(() => {
        setTimeout(() => {
          expect(notify.getCall(0).args[0]).to.be.eql({ id: 11 });
          expect(notify.getCall(1).args[0]).to.be.eql({ id: 22 });
          expect(notify.getCall(2).args[0]).to.be.eql({ id: 33 });

          done();
        }, 1000);
      });
    });
  });
});
