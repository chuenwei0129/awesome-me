let left = 30;
let state = 'RED';

function updateState() {
  console.log(`State: ${state}, Time left: ${left}`);
  switch (state) {
    case 'RED':
      left--;
      if (left === 0) {
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

// 模拟每秒钟更新一次状态
setInterval(updateState, 1000);
