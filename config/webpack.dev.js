const path = require('path')
const logger = require('debug')
const merge = require('lodash/merge')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.base.js')

// Merge with base configuration
//-------------------------------
merge(config, {
    cache: true,
    target: 'web',
    devtool: 'source-map', // eval eval-cheap-module-source-map source-map
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:2002',
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../src/client/client.js')
        ]
    },
    output: {
        publicPath: 'http://localhost:2002/build/',
        libraryTarget: 'var',
        pathinfo: true
    }
})

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.WatchIgnorePlugin([
        path.join(__dirname, '../src/shared')
    ]),
    new webpack.DefinePlugin({
        'process.env.DEV': true,
        'process.env.BROWSER': true,
        'process.env.BLUEBIRD_WARNINGS': '0',
        'process.env.NODE_ENV': JSON.stringify('development')
    })
)

// Run DEV server for hot-reloading
//---------------------------------
const compiler = webpack(config)
const port = 2002

new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
    },
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
        hash: false,
        timings: false,
        version: false,
        chunks: false,
        modules: false,
        children: false,
        chunkModules: false
    }
}).listen(port, 'localhost', function (err, result) {
    if (err) return logger('webpack:error', err);

    logger('webpack:compiler')('Running on port ' + port)
})
