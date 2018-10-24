const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: './edit',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    open: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('$aweso', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
    config.plugins.delete('prefetch')
  },
  configureWebpack: () => {},
  css: {
    extract: false,
    sourceMap: false
  }
}
