{
  "compilerOptions": {
      "baseUrl": "./src",// 基本目录，用于解析非相对模块名称
      "paths": {
          "@/*": ["./*"] //指定要相对于 baseUrl 选项计算别名的路径映射
      },
    "experimentalDecorators": true //为ES装饰器提案提供实验支持
  },
  "exclude": ["node_module"]
}