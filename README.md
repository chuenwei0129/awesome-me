# webpack

## 安装

```sh
npm i webpack -s
npm i webpack-cli -D
npx webpack -v
```

npx 甚至支持运行远程仓库的可执行文件，如

```
npx github:piuccio/cowsay hello
```

npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！

webpack --config xxxx

开发服务：npm i webpack-dev-server -D

npx webpack-dev-server --config webpack.conf.js

    devServer: {
    	contentBase: './dist', // 开发服务器路径
    	port: 3000,
    },

html 自动插入
