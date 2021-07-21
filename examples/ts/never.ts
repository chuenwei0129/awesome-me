type checkNever<T> = never extends T ? true : false

type test = checkNever<1>

type Check<T> = never extends never ? false : T extends never ? true : false
type result = Check<never>
