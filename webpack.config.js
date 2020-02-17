const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pkg = require("./package.json");
const libraryName = pkg.name;
const ISPROD = process.env.NODE_ENV === "production";

module.exports = {
  mode: ISPROD ? "production" : "developer",
  // webpack will take the files from ./src/index
  entry: ISPROD ? "./components/index.ts" : "./dev/index",

  // and output it into /dist as bundle.js
  output: {
    path: ISPROD ? path.resolve("lib") : path.join(__dirname, "/dist"),
    filename: ISPROD ? "index.js" : "bundle.js",
    // globalObject: ISPROD ? 'typeof self !== \'undefined\' ? self : this' : undefined,
    library: ISPROD ? libraryName : undefined,
    // libraryTarget: ISPROD ? "commonjs-module" : undefined
  },

  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      "/index.ts",
      "/index.tsx",
      "/index.js",
      "/index.jsx"
    ],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
      // assets: path.resolve(__dirname, "assets")
    }
  },

  module: {
    rules: [
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         fallback: "file-loader",
      //         name: "[name][md5:hash].[ext]",
      //         outputPath: "assets/",
      //         publicPath: "/assets/"
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.*css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }

      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   use: ["file-loader"]
      // },
      // {
      //   test: /\.(pdf|doc|zip)$/,
      //   use: ["file-loader"]
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: "./dev/index.html"
    })
  ],
  externals: ISPROD ? {
    // react: {
    //   commonjs: "react",
    //   commonjs2: "react",
    //   amd: "React",
    //   root: "React"
    // },
    // "react-dom": {
    //   commonjs: "react-dom",
    //   commonjs2: "react-dom",
    //   amd: "ReactDOM",
    //   root: "ReactDOM"
    // },
    // "formik": {
    //   commonjs: "formik",
    //   commonjs2: "formik"
    // }
  }: {}
};
