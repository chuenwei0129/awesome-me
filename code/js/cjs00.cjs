require('./cjs01.cjs');
console.log('cjs00: ', module);
process.nextTick(() => {
  console.log('cjs00 nextTick', module);
});

console.log(__dirname);
