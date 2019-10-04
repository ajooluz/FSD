const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        './src/common.js',
        './src/style.scss'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/common.js',
    },
    devServer: {
        port: 3000,
    },
    plugins: htmlPages.map(page =>
        new HtmlWebpackPlugin({
            template: page.template,
            filename: page.compiled
        })
    ),
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.pug$/, use: ['pug-loader']},
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/[name].css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'sass-loader'
                    }
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