Promise.prototype.MyFinally = function (callback) {
  return this.then(
    (data) => {
      return Promise.resolve(callback()).then(() => data);
    },
    (error) => {
      return Promise.resolve(callback()).then(() => {
        throw error;
      });
    },
  );
};

Promise.resolve(1)
  .MyFinally(() => {
    console.log('finally');
  })
  .then((data) => {
    console.log(data);
  });

Promise.MyAll = (it) => {
  if ([...it].length === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    for (let i = 0; i < it.length; i++) {
      Promise.resolve(it[i]).then(
        (data) => {
          result[i] = data;
          count++;
          if (count === it.length) {
            resolve(result);
          }
        },
        (error) => {
          reject(error);
        },
      );
    }
  });
};

Promise.MyAll([1, 2, 3, 4, 5]).then((data) => {
  console.log(data);
});

Promise.MyRace = (it) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < it.length; i++) {
      Promise.resolve(it[i]).then(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        },
      );
    }
  });
};

Promise.MyRace([1, 2, 3, 4, 5]).then((data) => {
  console.log(data);
});

Promise.MyAllSettled = (it) => {
  if ([...it].length === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    for (let i = 0; i < it.length; i++) {
      Promise.resolve(it[i]).then(
        (data) => {
          result[i] = { status: 'fulfilled', value: data };
          count++;
          if (count === it.length) {
            resolve(result);
          }
        },
        (error) => {
          result[i] = { status: 'rejected', reason: error };
          count++;
          if (count === it.length) {
            resolve(result);
          }
        },
      );
    }
  });
};

Promise.MyAllSettled([1, 2, 3, 4, 5]).then((data) => {
  console.log(data);
});

Promise.MyAllSettled([]).then((data) => {
  console.log(data);
});
