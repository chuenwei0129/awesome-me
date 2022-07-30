import { Queue } from './队列'
const PassTheFlower = (players: string[], num: number): string[] => {
  const q = new Queue()

  // 全体玩家入队
  for (let i = 0; i < players.length; i++) {
    q.enqueue(players[i])
  }

  // 返回值，可以是 淘汰者的先后顺序集合，也可以是最后一名玩家
  let ret = []

  // 最后一名玩家
  while (q.size() > 1) {
    // 0, 1 入循环队列，2 队头淘汰
    for (let i = 0; i < num - 1; i++) {
      q.enqueue(q.dequeue())
    }

    ret.push(q.dequeue())
  }

  return ret
}

// 规则 1， 2， 3，数到 3 的人淘汰
console.log(PassTheFlower(['a', 'b', 'c', 'd', 'e', 'f'], 3))
