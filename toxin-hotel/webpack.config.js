const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pagesLocation = path.join(__dirname, 'src', 'pages');
const walk = location => {
    let results = [];
    const list = fs.readdirSync(location);
    list.forEach(function(file) {
        file = path.join(location, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
};
const pages = walk(pagesLocation)
    .filter(filename => path.extname(filename).toLocaleLowerCase() === '.pug')
    .map(filename => {
        const name = path.parse(filename).name;
        return {
            template: filename,
            filename: `${name}.html`
        }
    });

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
        pages.map(page => new HtmlWebpackPlugin(page))
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