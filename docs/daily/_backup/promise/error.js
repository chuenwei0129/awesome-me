const p1 = () => Promise.resolve('1-resolve');
const p2 = () => Promise.reject('2-reject');
const p3 = () => Promise.resolve('3-resolve');
const p4 = () => Promise.reject('3-reject');

const runPromises = async () => {
  await p1();
  await p2();
  await p3();
  await p4();
};
