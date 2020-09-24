# webpack-public-resource-aliyun-oss-plugin

配合 [webpack-aliyun-oss-plugin](https://github.com/mfylee/webpack-aliyun-oss-plugin) 使用，增加上传未经 webpack 编译的 public 文件夹静态资源到阿里云 OSS

**yarn**

```shell
$ yarn add webpack-public-resource-aliyun-oss-plugin -D
```

**npm**

```shell
$ npm install webpack-public-resource-aliyun-oss-plugin --save-dev
```

## How to use

```js
const WebpackAliyunOssPlugin = require('webpack-aliyun-oss-plugin');
const WebpackPublicResourceAliyunOssPlugin = require('webpack-public-resource-aliyun-oss-plugin');

module.exports = {
  plugins: [
    // 建议只在生产环境配置代码上传
    new WebpackPublicResourceAliyunOssPlugin(),
    new WebpackAliyunOssPlugin(),
  ],
};
```

### Options

```js
const DEFAULT_OPTIONS = {
  filter: (file) => '.DS_Store' !== file && 'index.html' !== file,
  // public resource folder
  public: 'public',
};
```
