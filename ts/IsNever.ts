// never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
type Never<T> = T extends never ? true : false
type Test_Never = Never<never> // never

type IsNever<T> = [T] extends [never] ? true : false
type Test_IsNever = IsNever<never> // true
