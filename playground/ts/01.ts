import { expectType } from 'tsd';

expectType<[string, number?]>(['hello']);

// 具名元组
expectType<[name: string, age: number, male?: boolean]>(['hello', 10]);

// 元祖 length
const arr: [string, number?] = ['hello'];
type TupleLength = typeof arr.length;
