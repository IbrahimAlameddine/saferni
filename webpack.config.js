const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pages = [
  { name: "index", title: "Safarni - Home" },
  { name: "tour-egypt", title: "Safarni - Egypt Tour" },
  { name: "tour-istanbul", title: "Safarni - Istanbul Tour" },
  { name: "register", title: "Safarni - Register" },
  { name: "login", title: "Safarni - Login" },
];

module.exports = {
  mode: "development",

  entry: "./src/js/main.js",

  output: {
    filename: "assets/js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/saferni/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        type: "javascript/auto",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g)$/i,
        type: "asset/resource",
        generator: {
          filename: (pathData) => {
            const imagesDirectory = path.resolve(
              __dirname,
              "src/assets/images",
            );
            const imagePath = path.relative(imagesDirectory, pathData.filename);

            return `assets/images/${imagePath.replace(/\\/g, "/")}`;
          },
        },
      },
    ],
  },

  plugins: pages.map(
    ({ name, title }) =>
      new HtmlWebpackPlugin({
        template: `./src/pages/${name}.html`,
        filename: `${name}.html`,
        title,
      }),
  ),

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
  },
};
