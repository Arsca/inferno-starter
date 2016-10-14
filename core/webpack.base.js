const path = require('path')
const webpack = require('webpack')
const ExtractCSS = require('extract-text-webpack-plugin')
const sources = (location) => path.join(__dirname, '../src', location)

module.exports = {
    entry: {},
    node: {
        global: true,
        fs: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: sources,
                babelrc: false,
                query: {
                    cacheDirectory: true,
                    presets: [],
                    plugins: [
                        "add-module-exports",
                        "transform-es2015-modules-commonjs",
                        "transform-es2015-destructuring",
                        "transform-object-rest-spread",
                        ["fast-async", {
                            "env": {"dontMapStackTraces": true},
                            "runtimePattern": "index\\.js"
                        }],
                        "inferno"
                    ]
                }
            },
            {
                test: /\.(jpg|png|svg)(\?.+)?$/,
                loader: 'url-loader?limit=100000',
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css?sourceMap', 'sass?sourceMap']),
                include: [sources('assets'), sources('client/components')]
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        sourcePrefix: '',
        path: path.join(__dirname, '../build')
    },

    resolve: {
        alias: {
            'core': path.join(__dirname)
        }
    },

    plugins: [
        new ExtractCSS({ filename: 'bundle.css', allChunks: true })
    ]
};
