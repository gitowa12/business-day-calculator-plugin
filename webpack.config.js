const path = require("path");
const KintonePlugin = require("@kintone/webpack-plugin-kintone-plugin");

module.exports = {
  mode: "development",
  entry: {
    desktop: "./src/pages/desktop/index.js",
    config: "./src/pages/config/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "plugin", "js"),
    filename: (pathData) => {
      return pathData.chunk.name === "config" ? "config.js" : "desktop.js";
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/react"] },
          },
          {
            loader: "ts-loader",
            options: { configFile: path.resolve(__dirname, "tsconfig.json") },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
  target: "web",
  plugins: [
    new KintonePlugin({
      manifestJSONPath: "./plugin/manifest.json",
      privateKeyPath: "./private.ppk",
      pluginZipPath: "./dist/plugin.zip",
    }),
  ],
};
