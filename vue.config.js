const path = require("path");
module.exports = {
  publicPath:'./',
  lintOnSave: "warning",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "src/assets/style/variable.less"),
        path.resolve(__dirname, "src/assets/style/mixin.less"),
      ],
    },
  },
  outputDir: "server/dist",
  devServer: {
    proxy: {
      // 第一台服务器配置
      '/caption': {
        target: 'http://njunlp.club:1024',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/caption': '/caption'
        }
      },
      // 第二台服务器配置
      '/tr_run': {
        target: 'http://192.168.31.91:8089',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tr_run': '/tr_run'
        }
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Welcome | NJU Image Caption",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
};
