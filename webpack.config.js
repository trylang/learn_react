var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname),
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        app: ["./src/js/root.js"]
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['react-html-attrs'] //添加组件的插件配置
            }
        }, {
            //下面是使用ant-design的配置文件
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    output: {
        path: __dirname,
        filename: "./src/bundle.js"
    },
    // devServer: {
    //     historyApiFallback: true,
    //     // hot: true,
    //     inline: true,
    //     // progress: true,
    //     // outputPath: BUILD_PATH
    // },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        }),
    ],
};