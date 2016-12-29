import path from 'path';
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
   debug: true,
   devtool: 'source-map',
   noInfo: true,
   entry: {
      main: path.resolve(__dirname, 'src/index'),
      vendor: path.resolve(__dirname, 'src/vendor'),
   },
   target: 'web',
   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[chunkhash].js'
   },
   plugins: [

      // Create HTML file with reference to bundled JavaScript
      new HtmlWebpackPlugin({
         template: 'src/index.html',
         inject: true,
         minify: {
            removeComments: true,
            collapseWhitespace: true
         }
      }),

      // Delete duplicate packages when generating bundle
      new webpack.optimize.DedupePlugin(),

      // Minify JS
      new webpack.optimize.UglifyJsPlugin(),

      // CommonsChunk Plugin to create a separate bundle
      // of vendor libs so that they're cached separately.
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor' // syncs with entry: 'vendor' property-name
      }),

      new WebpackMd5Hash(),

      //generate external css file with a hash in the filename
      new ExtractTextPlugin('[name].[contenthash].css')
   ],
   module: {
      loaders: [
         {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
         {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
      ]
   }
}
