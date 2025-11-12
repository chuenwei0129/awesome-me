/**
 * 关于每个配置属性的详细说明，请访问：
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

// 可以用 ts-jest 里的工具函数 pathsToModuleNameMapper 来把 tsconfig.json 里的 paths 配置复制到 jest.config.js 里的 moduleNameMapper

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const config = {
  // 测试中所有导入的模块都应自动被模拟
  // automock: false,

  // 在 `n` 次失败后停止运行测试
  // bail: 0,

  // Jest 存储缓存依赖信息的目录
  // cacheDirectory: "/private/var/folders/z9/cln7y9vx6wg83399sf00g7yc0000gn/T/jest_dx",

  // 在每个测试前自动清除 mock 调用、实例、上下文和结果
  clearMocks: true,

  // 指示在执行测试时是否应收集覆盖率信息
  collectCoverage: true,

  // 一个 glob 模式数组，指示应收集覆盖率信息的文件集合
  // collectCoverageFrom: undefined,

  // Jest 输出覆盖率文件的目录
  coverageDirectory: 'coverage',

  // 用于跳过覆盖率收集的正则表达式模式字符串数组
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // 指示应使用哪个提供程序来检测代码以收集覆盖率
  coverageProvider: 'v8',

  // Jest 在编写覆盖率报告时使用的报告器名称列表
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // 配置覆盖率结果的最小阈值强制执行的对象
  // coverageThreshold: undefined,

  // 自定义依赖提取器的路径
  // dependencyExtractor: undefined,

  // 使调用已弃用的 API 时抛出有用的错误消息
  // errorOnDeprecated: false,

  // 假计时器的默认配置
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // 使用 glob 模式数组强制从忽略的文件中收集覆盖率
  // forceCoverageMatch: [],

  // 指向导出异步函数的模块的路径，该函数在所有测试套件之前触发一次
  // globalSetup: undefined,

  // 指向导出异步函数的模块的路径，该函数在所有测试套件之后触发一次
  // globalTeardown: undefined,

  // 需要在所有测试环境中可用的全局变量集合
  // globals: {},

  // 用于运行测试的最大工作线程数。可以指定为百分比或数字。例如 maxWorkers: 10% 将使用 CPU 数量的 10% + 1 作为最大工作线程数。maxWorkers: 2 将最多使用 2 个工作线程。
  // maxWorkers: "50%",

  // 从请求模块的位置向上递归搜索的目录名称数组
  moduleDirectories: ['node_modules'],

  // 模块使用的文件扩展名数组
  // moduleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // 从正则表达式到模块名称或模块名称数组的映射，允许用单个模块存根资源
  // moduleNameMapper: {},
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  // 与所有模块路径匹配的正则表达式模式字符串数组，在被模块加载器视为"可见"之前进行匹配
  // modulePathIgnorePatterns: [],

  // 激活测试结果的通知
  // notify: false,

  // 指定通知模式的枚举。需要 { notify: true }
  // notifyMode: "failure-change",

  // 用作 Jest 配置基础的预设
  preset: 'ts-jest',

  // 从一个或多个项目运行测试
  // projects: undefined,

  // 使用此配置选项向 Jest 添加自定义报告器
  // reporters: undefined,

  // 在每个测试前自动重置 mock 状态
  // resetMocks: false,

  // 在运行每个单独的测试之前重置模块注册表
  // resetModules: false,

  // 自定义解析器的路径
  // resolver: undefined,

  // 在每个测试前自动恢复 mock 状态和实现
  // restoreMocks: false,

  // Jest 应在其中扫描测试和模块的根目录
  // rootDir: undefined,

  // Jest 应用于搜索文件的目录路径列表
  // roots: [
  //   "<rootDir>"
  // ],

  // 允许使用自定义运行器而不是 Jest 的默认测试运行器
  // runner: "jest-runner",

  // 在每个测试之前运行一些代码以配置或设置测试环境的模块路径
  // setupFiles: [],

  // 在每个测试之前运行一些代码以配置或设置测试框架的模块路径列表
  // setupFilesAfterEnv: [],

  // 测试被视为慢速并在结果中报告为慢速的秒数
  // slowTestThreshold: 5,

  // Jest 应用于快照测试的快照序列化器模块的路径列表
  // snapshotSerializers: [],

  // 用于测试的测试环境
  // testEnvironment: "jest-environment-node",
  testEnvironment: 'jsdom',

  // 将传递给 testEnvironment 的选项
  // testEnvironmentOptions: {},

  // 向测试结果添加位置字段
  // testLocationInResults: false,

  // Jest 用于检测测试文件的 glob 模式
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // 与所有测试路径匹配的正则表达式模式字符串数组，匹配的测试将被跳过
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Jest 用于检测测试文件的正则表达式模式或模式数组
  // testRegex: [],

  // 此选项允许使用自定义结果处理器
  // testResultsProcessor: undefined,

  // 此选项允许使用自定义测试运行器
  // testRunner: "jest-circus/runner",

  // 从正则表达式到转换器路径的映射
  // transform: undefined,

  // 与所有源文件路径匹配的正则表达式模式字符串数组，匹配的文件将跳过转换
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // 与所有模块匹配的正则表达式模式字符串数组，在模块加载器自动为它们返回 mock 之前进行匹配
  // unmockedModulePathPatterns: undefined,

  // 指示是否应在运行期间报告每个单独的测试
  // verbose: undefined,

  // 在监视模式下重新运行测试之前与所有源文件路径匹配的正则表达式模式数组
  // watchPathIgnorePatterns: [],

  // 是否使用 watchman 进行文件爬取
  // watchman: true,
};

module.exports = config;
