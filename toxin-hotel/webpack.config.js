const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlTemplateLocation = path.join(__dirname, 'src', 'pages');
const htmlPages = fs.readdirSync(htmlTemplateLocation)
                    .filter(filename => path.extname(filename).toLocaleLowerCase() === '.pug')
                    .map(filename => {
                        const basename = path.parse(filename).name;
                        return {
                            basename: basename,
                            template: path.join(htmlTemplateLocation, `${basename}.pug`),
                            compiled: `${basename}.html`
                        };
                    });

const config = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/index.js',
    },
    devServer: {
        port: 3000,
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/style.css', })
    ].concat(
        htmlPages.map(page =>
            new HtmlWebpackPlugin({
                template: page.template,
                filename: page.compiled
            })
        )
    ),
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.pug$/, use: ['pug-loader']},
            {
                test: /\.scss$/,
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
    if (argv.mode === 'development') {
    }
    if (argv.mode === 'production') {
    }
    return config;
};