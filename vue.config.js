const webpack = require('webpack')
module.exports = {
  //部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    // 设置代理
    hot: true, //热加载
    host: '0.0.0.0', //ip地址
    port: 5555, //端口
    https: false
  },
  pluginOptions: {
    // 第三方插件配置
    // ...
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/style/common.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@com': '/src/components'
      }
    }
  }
}
