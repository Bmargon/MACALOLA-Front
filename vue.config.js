module.exports = {
  outputDir: '../server/public',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/main.scss";'
      }
    }
  }
}