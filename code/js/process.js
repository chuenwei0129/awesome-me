let left = 30;
let state = 'RED';
let i = 0;
while (true) {
  switch (state) {
    case 'RED':
      left--;
      if (left === 0) {
        console.log(i++);
        state = 'GREEN';
        left = 60;
      }
      break;

    case 'GREEN':
      left--;
      if (left === 0) {
        state = 'YELLOW';
        left = 5;
      }
      break;

    case 'YELLOW':
      left--;
      if (left === 0) {
        state = 'RED';
        left = 30;
      }
      break;

    default:
      throw new Error('夭寿啦状态错啦！');
  }
}
