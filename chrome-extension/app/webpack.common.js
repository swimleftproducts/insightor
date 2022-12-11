const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')


module.exports = {
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
        options: path.resolve('./src/options/options.tsx'),
        background: path.resolve('./src/background/background.ts'),
        contentScript: path.resolve('./src/contentScript/contentScript.ts')
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx$/,
                exclude: /node_modules/,
            },
            {
                use: 'ts-loader',
                test: /\.ts$/,
                exclude: /node_modules/,
            },
            {
                type: 'asset/resource',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
            },
        ]
    },
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: path.resolve('src/manifest.json'), to: path.resolve('dist') },
            { from: path.resolve('src/assets/icon-32x32.png'), to: path.resolve('dist')}
          ],
        }),
        ...getHtmlPlugins([
            'popup',
            'options',
        ]),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
}

// used for creating multiple chunks, i.e popup.html and options.html
function getHtmlPlugins(chunks){
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}