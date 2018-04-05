/**
 * Trick to make the transpilation access Promise as "Promise"
 * and not "_promise2.default".
 */
const Promise = global.Promise;
/**
 * This queue provides synchronised access to each item.
 *
 * @param list initial list to synch consumer
 * @param consumer is a function that will be invoked
 * synchronuosly to each item in the queue. So, it
 * requires that the consumer returns a promise indicating
 * when the next item must be digested.
 */
function SynchQueue(list, consumer) {
  let currentPromise = Promise.resolve();
  this.getCurrentPromise = () => currentPromise;
  this.add = (item) => {
    const lastPromise = this.getCurrentPromise();
    currentPromise = new Promise((resolve) => {
      lastPromise.then(() => {
        consumer(item)
          .then(resolve)
          .catch(resolve);
      });
    });
  };
  list.forEach(item => this.add(item));
}

export default SynchQueue;
