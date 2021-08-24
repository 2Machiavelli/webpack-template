const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  output: {
    clean: true,
    publicPath: "./"
  },
  devtool: "source-map",
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})