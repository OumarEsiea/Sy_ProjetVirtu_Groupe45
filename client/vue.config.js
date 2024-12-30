const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/cries': {
        target: 'https://play.pokemonshowdown.com',
        changeOrigin: true,
        pathRewrite: { '^/cries': '/audio/cries' },
      },
    },
  },
})
