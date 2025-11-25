// 生成一个长度为5的数组：`[0, 0, 0, 0, 0]`

type Result = Loop<5>; // expected to be [0, 0, 0, 0, 0]

// 解答
type Loop<N extends number, R extends any[] = []> = R['length'] extends N ? R : Loop<N, [...R, 0]>;

type State = 'initialized' | 'processing' | 'succeeded' | 'failed';

interface Pipeline<T extends State> {
  state: T;
  start(this: Pipeline<'initialized'>): Pipeline<'processing'>;
  finish(this: Pipeline<'processing'>): Pipeline<'succeeded'>;
  retry(this: Pipeline<'failed'>): Pipeline<'processing'>;
}

declare const pipeline: Pipeline<'initialized'>;

pipeline.start();

type Wrapped<T> = { value: T };

type Comparable = number | Wrapped<Comparable>;
//   ^^^^^^^^^^
// Type alias 'Comparable' circularly references itself.
