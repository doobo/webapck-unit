const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
module.exports = {
    entry: {
        "start": __dirname + "/app/start/main.js",//已多次提及的唯一入口文件
        "angular": __dirname + "/app/angular/main.js"
    },
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "[name]/[name].bundle.js",//打包后输出文件的文件名
        //publicPath : '/webpack-unit/'
    },
    module: {
        loaders: [
            {test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/},
            {test: /\.css$/, loader:  ExtractTextPlugin.extract("css-loader")},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
            {test: /\.(png|jpe?g|ico|bmp|gif)$/, loader: 'url-loader?limit=8096&name=./images/[name][hash:8].[ext]'},
            {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'file-loader?limit=8906&mimetype=application/font-woff&name=./font/[name].[ext]'},
            {test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file-loader?name=./font/[name].[ext]'},
        ]
    },
    plugins:  [
        new ExtractTextPlugin("[name].min.css"),
        new webpack.DllReferencePlugin({
            context: 'webpack-unit', // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
            manifest: require('./manifest.json'), // 指定manifest.json
            name: 'angular',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
        })
    ]
}
