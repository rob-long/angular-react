const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js', // Update to point to the main TypeScript entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Add TypeScript support
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript' // Add TypeScript preset
            ]
          }
        }
      },
      {
        test: /\.css$/, // Add CSS support
        use: ['style-loader', 'css-loader'] // Use style-loader and css-loader
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Add support for image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] // Add TypeScript extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  }
};
