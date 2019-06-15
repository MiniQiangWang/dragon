/**
 * Webpack config for production electron main process
 */

import webpack from "webpack";
import merge from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyWebpackPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.config.base";
import CheckNodeEnv from "../internals/scripts/CheckNodeEnv";

CheckNodeEnv("production");

export default merge.smart(baseConfig, {
  devtool: "source-map",

  mode: "production",

  target: "electron-main",

  entry: "./main/app",

  output: {
    filename: "main.prod.js"
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./main/app.html",
        to: "./"
      }
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === "true" ? "server" : "disabled",
      openAnalyzer: process.env.OPEN_ANALYZER === "true"
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG_PROD: true,
      START_MINIMIZED: false
    })
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
});
