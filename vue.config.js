// vue.config.js
module.exports = {
    outputDir: 'dist', // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    //axios域代理，解决axios跨域问题
    baseUrl: '/',
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        host: '0.0.0.0',
        port: 8080, // 服务端口
        https: false,
        hotOnly: false,
        before: app => {},
        proxyTable: {
            '/api': {
                target: 'http://127.0.0.1:3000/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
