const wait = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

(async () => {
  try {
    const p1 = wait(3000).then(() => {
      console.log('3000');
      throw new Error('err');
    }); // uncaught
    await wait(2000).then(() => {
      console.log('2000');
      throw new Error('err2');
    }); // caught
    console.log('This line will not be executed');
    await p1;
  } catch (e) {
    console.log(e.message);
  }
})();

window.addEventListener('unhandledrejection', (e) => {
  console.log('unhandledrejection', e);
});

window.addEventListener('error', (e) => {
  console.log('error', e);
});
