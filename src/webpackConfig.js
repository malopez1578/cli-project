const webpack = require("webpack");
const path = require("path");
const webpackDevServer = require("webpack-dev-server");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PrepackWebpackPlugin = require("prepack-webpack-plugin").default;
const isExtendingEslintConfig = process.env.EXTEND_ESLINT === "true";
const configPrepack = {
  trace: true,
};
export async function webpackInit(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };
  const config = {
    entry: [path.resolve(__dirname, options.targetDirectory + "/index.ts")],
    mode: options.server ? "development" : "production",
    devtool: options.server
      ? "cheap-module-eval-source-map"
      : "inline-source-map",
    module: {
      rules: [
        {
          test: /index.tsx?$/,
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                fix: true,
                eslintPath: require.resolve("eslint"),
                resolvePluginsRelativeTo: __dirname,
                ignore: isExtendingEslintConfig,
                baseConfig: isExtendingEslintConfig
                  ? undefined
                  : {
                      extends: [
                        require.resolve(
                          "../packages/eslint-config-project-app"
                        ),
                      ],
                    },
                useEslintrc: isExtendingEslintConfig,
              },
              loader: require.resolve("eslint-loader"),
            },
          ],
          include: path.resolve(__dirname, options.targetDirectory),
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          loader: require.resolve("awesome-typescript-loader"),
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          loader: require.resolve("pug-loader"),
        },
        {
          test: /\.scss$/,
          use: [
            options.server
              ? require.resolve("style-loader")
              : MiniCssExtractPlugin.loader,
            require.resolve("css-loader"),
            require.resolve("resolve-url-loader"),
            require.resolve("sass-loader"),
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ttf|otf|woff|svg|ogg|mp3|wav|mpe?g)$/i,
          use: [
            {
              loader: require.resolve("file-loader"),
              options: {
                outputPath: "../",
                name: "[path][name].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
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
        template: "./index.pug",
        filename: "index.html",
        inject: options.server ? false : true,
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new MiniCssExtractPlugin({
        filename: "index.css",
      }),
    ],
    output: {
      path: path.resolve(__dirname, options.targetDirectory + "/dist"),
      filename: "index.js",
      libraryTarget: "this",
      publicPath: "./",
    },
  };

  if (options.build) {
    config.plugins.push(new PrepackWebpackPlugin(configPrepack));
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
        process.exit(1);
      }
    });
  }

  if (options.server) {
    let servOpts = {
      contentBase: "./",
      open: true,
      stats: "minimal",
      host: "localhost",
      compress: true,
      overlay: {
        warnings: true,
        errors: true,
      },
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

    server.listen(options.port, "localhost", () => {
      console.log("dev server listening on port", options.port);
    });
  }
}
