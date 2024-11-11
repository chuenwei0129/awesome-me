function* perm(S: number[], N = S.length): Generator {
  if (N === 1) {
    yield S.slice()
    return
  }
  // [0, N-1]
  for (let i = N - 1; i >= 0; i--) {
    // 基于交换
    ;[S[i], S[N - 1]] = [S[N - 1], S[i]]
    yield* perm(S, N - 1)
    ;[S[i], S[N - 1]] = [S[N - 1], S[i]]

    // 优化
    // yield* perm(S, N - 1)
    // if (N % 2 === 1) {
    //   ;[S[i], S[N - 1]] = [S[N - 1], S[i]]
    // } else {
    //   ;[S[0], S[N - 1]] = [S[N - 1], S[0]]
    // }
  }
}

console.log([...perm([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])])
