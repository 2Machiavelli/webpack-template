const path = require("path")
const fs = require("fs")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const PATHS = {
  src: path.join(__dirname, "../src"),
  built: path.join(__dirname, "../built"),
  assets: "assets/"
}

module.exports = {
  target: "web",
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.built
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      }, 
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset",
        generator: {
          filename: "assets/fonts/[name][ext]"
        }
      }, 
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        generator: {
          filename: "assets/img/[name][ext]"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          }, 
          {
            loader: "postcss-loader",
            options: { 
              sourceMap: true, 
              config: { path: `./postcss.config.js` }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "~": PATHS.src
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/static`, to: "" },
    ]),
    new HtmlWebpackPlugin({
      favicon: `${PATHS.src}/static/favicon.ico`,
      template: `${PATHS.src}/html/index.html`,
      filename: `index.html`,
      minify: true,
      cache: true
    })
  ],
}