//? enums 类型已成为 Unionenums
enum logLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

const log = (level: logLevel, message: string) => {}
log(4, 'This is an error message')
// ^? 类型“4”的参数不能赋给类型“logLevel”的参数。

//? const 类型参数
const routes = <const T>(routes: T[]) => {
  const addRedirect = (from: T, to: T) => {}

  return {
    addRedirect,
  }
}

const router = routes(['/', '/about'])

router.addRedirect('/1', '/about')
// ^? 类型“"/1"”的参数不能赋给类型“"/" | "/about"”的参数。

// 支持 export type *
// 完善 switch/case
// 优化速度、内存和包大小

//? 新的装饰器
// 但已经可以确定的是，--experimentalDecorators 与 --emitDecoratorMetadata 这两个配置仍然会被保留，用于启用旧版装饰器，而新版装饰器无需配置即会默认支持
// TODO: https://2ality.com/2022/10/javascript-decorators.html
