const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        /*
         指定需要打包的js模块
         或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
         */
        "angular": ['bootstrap/dist/css/bootstrap.css','font-awesome/css/font-awesome.css',
                    './app/jquery/jquery-vendor','angular']
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].min.js",
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
            context: 'webpack-unit', // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
        }),
        /* 跟业务代码一样，该兼容的还是得兼容
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),*/
        new ExtractTextPlugin('[name].min.css'), // 打包css/less的时候会用到ExtractTextPlugin
    ],
    module: {
        loaders: [
            {test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/},
            {test: /\.css$/, loader:  ExtractTextPlugin.extract("css-loader")},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
            {test: /\.(png|jpe?g|ico|bmp|gif)$/, loader: 'url-loader?limit=8096&name=./images/[name][hash:8].[ext]'},
            {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'file-loader?limit=8906&mimetype=application/font-woff&name=./font/[name].[ext]'},
            {test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file-loader?name=./font/[name].[ext]'},
        ]
    }
};