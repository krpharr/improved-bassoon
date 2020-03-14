const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
      new WebpackPwaManifest({
        filename: 'manifest.json',
        inject: false,
        fingerprints: false,
        name: "Improved Bassoon Budget Application",
        short_name: "Budget App",
        description: "An application for tracking your budget",
        background_color: "#01579b",
        theme_color: "#ffffff",
        "theme-color": "#ffffff",
        start_url: "/",
        icons: [{
          src: path.resolve("icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("icons")
        }]
      })
    ]
    // add configuration to use babel-loader here


};
module.exports = config;