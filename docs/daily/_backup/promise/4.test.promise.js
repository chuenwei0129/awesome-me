// thenable

const thenable = {
  then: (resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  },
};

(async () => {
  const data = await thenable;
  console.log(data);
})();
