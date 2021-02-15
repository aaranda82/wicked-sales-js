require("dotenv/config");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const clientPath = path.join(__dirname, "client/");
const publicPath = path.join(__dirname, "server/public/");

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  entry: clientPath,
  output: {
    path: publicPath,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    contentBase: publicPath,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: process.env.DEV_SERVER_PORT,
    proxy: {
      "/api": `http://localhost:${process.env.PORT}`,
    },
    stats: "minimal",
    watchContentBase: true,
  },
};
