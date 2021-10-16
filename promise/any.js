/**
 * same as native Promise.any for nodejs
 */
module.exports = function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const promLen = promises.length;
    let errCount = 0;

    for (const promise of promises) {
      promise.then(resolve).catch((err) => {
        if (++errCount === promLen) reject(err);
      });
    }
  });
};
