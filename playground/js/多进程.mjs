import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

const cpuNums = os.cpus().length;

if (cluster.isPrimary) {
  console.log('主进程启动');
  for (let i = 0; i < cpuNums; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      res.end('hello world');
    })
    .listen(3000, () => {
      console.log('http://localhost:3000');
    });
}
