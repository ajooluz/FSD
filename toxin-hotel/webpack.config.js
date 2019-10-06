const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/index.js',
    },
    devServer: {
        port: 3000,
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/style.css', }),
    ].concat(
        ['index', 'page'].map(
            name => new HtmlWebpackPlugin({
                template: `src/pages/${name}.pug`,
                filename: `${name}.html`,
                chunks: [name]
            })
        )
    ),
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.pug$/, loader: 'pug-loader', options: { pretty: true }},
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {}
    if (argv.mode === 'production') {}
    return config;
};