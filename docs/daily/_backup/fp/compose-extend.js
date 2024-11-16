// Player 是一个最通用的基类
class Player {
  // 每位玩家入场前，都需要给自己起个名字，并且选择游戏的类型
  constructor(name, sport) {
    this.name = name;
    this.sport = sport;
  }

  // 每位玩家都有运动的能力
  doSport() {
    return 'play' + this.sport;
  }
}

// 篮球运动员类，是基于 Player 基类拓展出来的
class BasketballPlayer extends Player {
  constructor(name) {
    super(name, 'basketball');
  }

  // 这是一个灌篮方法
  slamDunk() {
    return `${this.name} just dunked a basketball`;
  }

  // 这是一个跳跃方法
  jump() {
    return `${this.name} is jumping!`;
  }
}

// 足球运动员类，也基于 Player 基类拓展出来的
class FootballPlayer extends Player {
  constructor(name) {
    super(name, 'football');
  }

  // 这是一个射门方法
  shot() {
    return `${this.name} just shot the goal`;
  }

  // 这是一个冲刺跑方法
  runFast() {
    return `${this.name} is running fast!`;
  }
}

// 疯狂号运动员，也是基于 Player 基类拓展出来的
class CrazyPlayer extends Player {
  // 疯狂号运动员可定制的属性多出了 color 和 money
  constructor(name, sport, color, money) {
    super(name, sport);
    this.color = color;
    this.money = money;
  }

  // 这是一个飞翔方法
  fly() {
    if (this.money > 0) {
      // 飞之前，先扣钱
      this.money--;
      // 飞起来啦，好帅呀！
      return `${this.name} is flying!So handsome!`;
    }
    // this.money <= 0，没钱还想飞，你也配？（狗头
    return 'you need to give me money';
  }
}

// 创建一个篮球运动员 Bob
const Bob = new BasketballPlayer('Bob');
// 'Bob just dunked a basketball'
Bob.slamDunk();
// 创建一个足球运动员 John
const John = new FootballPlayer('John');
// 'John just shot the goal'
John.shot();

// 创建一个红色皮肤的疯狂号选手xiuyan，并充了1块钱
const xiuyan = new CrazyPlayer('xiuyan', 'basketball', 'red', 1);
// 'xiuyan is flying!So handsome!'
xiuyan.fly();
// money 归 0 了
xiuyan.money;
// 'you need to give me money'
xiuyan.fly();

// 这个函数单独处理 slamDunk 能力
const getSlamDunk = (player) => ({
  slamDunk: () => {
    return `${player.name} just dunked a basketball`;
  },
});

// 这个函数单独处理 shot 能力
const getShot = (player) => ({
  shot: () => {
    return `${player.name} just shot the goal`;
  },
});

// 这个函数单独处理 fly 能力
const getFly = (player) => ({
  fly: () => {
    if (player.money > 0) {
      // 飞之前，先扣钱
      this.money--;
      // 飞起来啦，好帅呀！
      return `${player.name} is flying!So handsome!`;
    }
    // this.money <= 0，没钱还想飞，你也配？（狗头
    return 'you need to give me money';
  },
});

const SuperPlayer = (name, money) => {
  // 创建 SuperPlayer 对象
  const player = {
    name,
    sport: 'super',
    money,
  };

  // 组合多个函数到 player 中
  return Object.assign(
    {},
    getSlamDunk(player),
    getShot(player),
    getFly(player),
  );
};

const superPlayer = SuperPlayer('xiuyan', 20);
// 'xiuyan just dunked a basketball'
superPlayer.slamDunk();
// 'xiuyan just shot the goal'
superPlayer.shot();
// 'xiuyan is flying!So handsome!'
superPlayer.fly();
