const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV !== "production"
});

var serverSetting = {
  entry: {
    'index': resolve('./server'),
  },
  output: {
    path: resolve('./dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
};

var clientSetting = {
  entry: {
    'bundle': resolve('./src'),
  },
  output: {
    path: resolve('./public'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // loaders: {
          //   js: 'babel-loader',
          // },
        },
      },
      {
        test: /\.(scss)$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles SASS to CSS
          }],
          fallback: "style-loader"
        }),
      },
    ],
  },
  plugins: [
      extractSass
  ]
};

module.exports = [ serverSetting, clientSetting ];
