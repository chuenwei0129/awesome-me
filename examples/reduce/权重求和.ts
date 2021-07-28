const scores = [
  { score: 90, subject: 'chinese', weight: 0.5 },
  { score: 95, subject: 'math', weight: 0.3 },
  { score: 85, subject: 'english', weight: 0.2 }
]

const result = scores.reduce((acc, cur) => acc + cur.score * cur.weight, 0) // 90.5
