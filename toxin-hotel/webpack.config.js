const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pagesLocation = path.join(__dirname, 'src', 'pages');
const pages = fs.readdirSync(pagesLocation)
    .filter(filename => path.extname(filename).toLocaleLowerCase() === '.pug')
    .map(filename => path.parse(filename).name);

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
        pages.map(name => new HtmlWebpackPlugin({
            template: `src/pages/${name}.pug`,
            filename: `${name}.html`,
            chunks: [name]
        }))
    ),
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.pug$/, loader: 'pug-loader', options: { pretty: true }},
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
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