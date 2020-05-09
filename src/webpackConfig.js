const webpack = require('webpack');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

export async function webpackInit(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };
  const config = {
    entry: [path.resolve(__dirname, options.targetDirectory + '/index.ts')],
    mode: options.server ? 'development' : 'production',
    devtool: options.server ? 'cheap-module-eval-source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                ignore: true,
                baseConfig: {
                  extends: [require.resolve('@malopez1578/eslint-config-project-app')],
                },
                useEslintrc: true,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: path.resolve(__dirname, options.targetDirectory),
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          loader: require.resolve('awesome-typescript-loader'),
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          loader: require.resolve('pug-loader'),
        },
        {
          test: /\.scss$/,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            require.resolve('sass-loader'),
          ],
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
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: options.build,
            keep_fnames: options.build,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: options.server,
        }),
      ],
    },
    plugins: [
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
      if (err || stats.hasErrors()) {
        console.error(err);
        process.exit(1);
      }
    });
  }

  if (options.server) {
    let servOpts = {
      contentBase: './',
      open: true,
      stats: 'minimal',
      host: 'localhost',
      compress: true,
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

    server.listen(options.port, 'localhost', () => {
      console.log('dev server listening on port', options.port);
    });
  }
}
