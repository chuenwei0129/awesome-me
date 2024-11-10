import Redis from 'ioredis';
const redis = new Redis(6380);

const res = await redis.keys('*');

console.log(res);
