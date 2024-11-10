import { expectType } from 'tsd';

interface IFoo {
  name: string;
  age: number;
}

interface IBar {
  name: string;
  job: string;
}

expectType<IFoo>({
  name: 'foo',
  age: 10,
});

expectType<IBar>({
  name: 'bar',
  job: 'engineer',
});
