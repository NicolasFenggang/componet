const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer 设置代理服务，解决调试接口时的跨域问题
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    //当前项目在开发调试阶段 会将任何未知请求（没有匹配到静态文件的请求） 代理到 https://www.escook.cn
    // proxy: 'https://www.escook.cn'
    proxy: 'http://localhost:8000'
  }
})
