type GetCharsHelper<S, Acc> = S extends `${infer Char}${infer Rest}`
  ? GetCharsHelper<Rest, Char | Acc>
  : Acc

type GetChars<S> = GetCharsHelper<S, never>
