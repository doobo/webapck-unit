var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        "start": __dirname + "/app/start/main.js",//已多次提及的唯一入口文件
        "angular": __dirname + "/app/angular/main.js"

    },
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "[name]/bundle.js"//打包后输出文件的文件名
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {test: /\.css$/, loader:  ExtractTextPlugin.extract("css-loader")},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
            {test: /\.(png|jpe?g|ico|bmp|gif)$/, loader: 'file-loader?&limit=1000name=/img/[name].[ext]?[hash]'},
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?limit=1000&mimetype=application/font-woff&name=./../font/[name].[ext]'
            },
            {test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file-loader?name=./../font/[name].[ext]'},
        ]
    },
    plugins:  [
        new ExtractTextPlugin("/css/[name]style.css"),
    ]
}
