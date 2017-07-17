const resolve = require("path").resolve
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const eslintFriendlyFormatter = require("eslint-friendly-formatter")
const url = require("url")
const publicPath = ""

module.exports = (options = {}) => ({
  entry: {
    vendor: "./src/vendor",
    index: "./src/main.js"
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: options.dev ? "[name].js" : "[name].js?[chunkhash]",
    chunkFilename: "[id].js?[chunkhash]",
    publicPath: options.dev ? "/assets/" : publicPath
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(vue|js)$/,
        exclude: /(node_modules)|plugins/,
        loader: "eslint-loader",
        options: {
          failOnError: true,
          cache: false,
          formatter: eslintFriendlyFormatter
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ["vue-loader"]
      },
      {
        test: /iview.src.*?js$/,
        loader: "babel"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 1024
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
      "vue": "vue/dist/vue.js",
      // "ueditor": resolve(__dirname, "plugins/ueditor")
    }
  },
  devServer: {
    host: "127.0.0.1",
    port: 8010,
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:8082",
        changeOrigin: true,
        cookieDomainRewrite: {
          // "unchanged.domain": "unchanged.domain",
          // "old.domain": "new.domain",
          "*": ""
        },
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? "/assets/" : publicPath).pathname
    }
  },
  devtool: options.dev ? "#eval-source-map" : "#source-map"
})
