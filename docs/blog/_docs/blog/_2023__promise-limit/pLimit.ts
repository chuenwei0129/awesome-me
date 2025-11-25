interface ITask {
  (): Promise<any>;
}

interface IPromiseResolve {
  (value?: unknown): void;
}

class pLimit {
  private limit: number;
  private queue: IPromiseResolve[];
  private active: number;

  constructor(limit: number) {
    this.limit = limit;
    this.queue = [];
    this.active = 0;
  }

  async add(task: ITask): Promise<any> {
    if (this.active >= this.limit) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve: IPromiseResolve) => this.queue.push(resolve)); // 上锁
    }

    this.active++;
    const result = await task();
    this.active--;

    if (this.queue.length) {
      this.queue.shift()!(); // 解锁
    }

    return result;
  }
}

export default pLimit;
