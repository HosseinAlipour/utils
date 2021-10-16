/**
 *  takes an iterable of Promises and, returns a signle promise
 *  that resolve to an array of fulfilled pormieses values, or, if all
 *  if the promises rejected, it rejects with a list of rejected errors
 */
module.exports = function anyWait(promises) {
  const errors = [];
  const values = [];
  const promLen = promises.length;
  let done = 0;

  return new Promise((resolve, reject) => {
    const onResult = () => {
      if (++done === promLen) {
        if (values.length) resolve(values);
        else reject(errors);
      }
    };

    for (const promise of promises) {
      promise
        .then((value) => {
          values.push(value);
          onResult();
        })
        .catch((err) => {
          onResult();
          errors.push(err);
        });
    }
  });
};
