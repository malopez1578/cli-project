const webpack = require('webpack');
const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

export async function webpackInit(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };
  const config = {
    context: options.targetDirectory,
    entry: [
      // 'webpack-dev-server/client?http://localhost:8080/',
      // 'webpack/hot/only-dev-server',
      `./index.ts`,
    ],
    mode: options.server ? 'development' : 'production',
    devtool: options.server ? 'cheap-module-eval-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
        }),
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new TSLintPlugin({
        files: ['./src/**/*.ts'],
      }),
      new HTMLWebpackPlugin({
        template: './index.pug',
        filename: 'index.html',
        inject: false,
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
    output: {
      path: path.resolve(__dirname, options.targetDirectory),
      filename: './index.js',
      libraryTarget: 'this',
      publicPath: '/',
    },
  };

  if (options.build) {
    webpack(config, (err, stats) => {
      // Stats Object
      if (err || stats.hasErrors()) {
        // Handle errors here
      }
      // Done processing
    });
  }

  if (options.server) {
    let servOpts = {
      contentBase: './',
      open: true,
      stats: 'minimal',
      host: 'localhost',
      compress: true,
      hot: false,
      overlay: true,
      inline: true,
      quiet: false,
      noInfo: true,
      watchContentBase: true,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    };

    webpackDevServer.addDevServerEntrypoints(config, servOpts);
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, servOpts);

    server.listen(8080, 'localhost', () => {
      console.log('dev server listening on port 8080');
    });
  }
}
