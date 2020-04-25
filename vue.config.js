module.exports = {
  outputDir: '../server/public',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/main.scss";'
      }
    }
  }
}