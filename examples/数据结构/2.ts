interface Person {
  name: string
  age: number
}

type K1 = keyof Person // "name" | "age"
