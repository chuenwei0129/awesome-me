namespace A {
  type ArrayOf<
    Len extends number,
    Arr extends unknown[] = [],
    Item extends number = 0
  > = Arr['length'] extends Len ? Arr : ArrayOf<Len, [...Arr, Item], Item>

  type InitMemo = ArrayOf<3, [0, 1], 1>
  // 参数保存值
  type SetMemo<M, I, N> = M extends [...infer Rest, infer Last]
    ? M['length'] extends I
      ? [...Rest, N]
      : [...SetMemo<Rest, I, N>, Last]
    : []

  // [0, 100, 0]
  type Test_Memo = SetMemo<InitMemo, 3, 100>
}
