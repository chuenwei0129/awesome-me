const isEmpty = (x) => x === undefined || x === null;

const Maybe = (x) => ({
  map: (f) => (isEmpty(x) ? Maybe(null) : Maybe(f(x))),
  valueOf: () => x,
  inspect: () => `Maybe {${x}}`,
});

// 用来检查 id 是否合法，这里 id 为 3 的倍数合法
const isExisted = (id) => id % 3 === 0;

const getUser = (id) => {
  if (isExisted(id)) {
    return {
      id,
      nickName: String(id).slice(0, 3),
    };
  } else {
    throw new Error('User not found');
  }
};

const getUserSafly = (id) => {
  try {
    const user = getUser(id);
    return Maybe(user);
  } catch {
    return Maybe(null);
  }
};

console.log(
  getUserSafly(1)
    .map((user) => user.nickName)
    .valueOf(),
  getUserSafly(2)
    .map((user) => user.nickName)
    .valueOf(),
  getUserSafly(3)
    .map((user) => user.nickName)
    .valueOf(),
);

// 这时，如果我想要在一个 Maybe Functor 的 map 方法中，调用这个 findUser 方法，比如这样：
const targetUser = {
  id: 1100013,
  credits: 2000,
  level: 20,
};

const userContainer = Maybe(targetUser);

const extractUserId = (user) => user && user.id;

const userInfo = userContainer.map(extractUserId).map(getUserSafly);

console.log(userInfo.valueOf().valueOf());

const Monad = (x) => ({
  map: (f) => Monad(f(x)),
  // flatMap 直接返回 f(x) 的执行结果
  flatMap: (f) => f(x),

  valueOf: () => x,
  inspect: () => `Monad {${x}}`,
});

const monad = Monad(1);
const nestedMonad = Monad(monad);

// 试试会发生什么？
nestedMonad.flatMap((x) => x);
