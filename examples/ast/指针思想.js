// 找出字符串中连续出现次数最多的字符

const str = 'aaaaaaaaabbbbbbbbbbbcccccccccccccccdddddddeeeeeeeefffffff'

// 两个指针 i j
// i: 0, j: 1

// i 不动，j 后移，当 i 和 j 指向的字母不相等时，代表，i 和 j 之间 [i, j) 字母都是相同的，然后让 i = j， j继续后移，移动到数组末尾结束

const arr = [...str]

let i = 0
let j = 1

while (j <= arr.length - 1) {
  if (arr[i] !== arr[j]) {
    console.log(`${arr[i]}出现了${j - i}次`)
    i = j
  }
  j++
}
