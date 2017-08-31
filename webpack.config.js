const nodeExternals = require('webpack-node-externals');
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var serverSetting = {
  entry: {
    'index': './server',
  },
  output: {
    path: path.resolve(__dirname, '.'),
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
      }
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
};

var clientSetting = {
  entry: {
    'bundle': path.resolve(__dirname, './src'),
  },
  output: {
    path: path.resolve(__dirname, './public'),
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
      }
    ],
  },
};

module.exports = [ serverSetting, clientSetting ];
