import util from 'node:util';

const callback = util.callbackify(() => Promise.resolve('hello'));

callback((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
