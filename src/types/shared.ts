export type noop = (this: any, ...args: any[]) => any;
export type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;
