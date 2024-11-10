function create() {
  let a = 100;
  return function () {
    console.log(a); // 100
  };
}
const fn = create();
const a = 200;
fn();
