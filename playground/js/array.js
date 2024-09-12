console.log(
  Array.from({ length: 26 }, (v, k) => {
    return String.fromCharCode(k + 97);
  }),
);
