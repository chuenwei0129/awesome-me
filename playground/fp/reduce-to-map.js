Array.prototype._map = function (callback) {
  return this.reduce((newArr, item) => {
    newArr.push(callback(item));
    return newArr;
  }, []);
};

console.log([1, 2, 3]._map((item) => item ** 2));
