export function sleep(milliseconds: number): void {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {
    // 此循环会阻塞执行，直到指定的毫秒数过去
  }
}
