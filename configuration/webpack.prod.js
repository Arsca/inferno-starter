const merge = require('lodash/merge')
const logger = require('debug')
const webpack = require('webpack')
const config = require('./webpack.base.js')

// Merge with base configuration
//-------------------------------
merge(config, {
    cache: false,
    target: 'web',
    devtool: 'source-map',
    entry: {
        bundle: './src/client/client.js'
    },
    output: {
        publicPath: '/build/'
    }
})

// Production plugins for old browsers
//------------------------------------
config.module.loaders.forEach(loader => {
    if (loader.loader === 'babel-loader') {
        loader.query.plugins.push(
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-block-scoping",
        "transform-es2015-classes",
        "transform-es2015-computed-properties",
        "transform-es2015-destructuring",
        "transform-es2015-literals",
        "transform-es2015-modules-commonjs",
        "transform-es2015-parameters",
        "transform-es2015-shorthand-properties",
        "transform-es2015-spread",
        "transform-es2015-template-literals"
        )
    }
})

logger('server:webpack')('Environment: Production')

// Save files to disk
//-------------------------------
//config.output.path = path.join(__dirname, '../build')
config.plugins.push(
new webpack.optimize.OccurrenceOrderPlugin(),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin({
    compressor: {
        screw_ie8: true,
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true
    },
    output: {
        comments: false
    }
})
)

// Set some environment variables
//-------------------------------
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        'process.env.NODE_ENV': JSON.stringify('production')
    })
)

// Sanity checks
//-------------------------------
if (config.devtool === 'eval') {
    throw new Error('Using "eval" source-maps may break the build')
}

// Compile everything for PROD
//-------------------------------
const compiler = webpack(config)
compiler.run(function(err, stats) {
    if (err) throw err

    // Output stats
    console.log(stats.toString({
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        children: false,
        chunkModules: false
    }))

    // Write a stats.json for the webpack bundle visualizer
    //writeWebpackStats(stats)

    if (stats.hasErrors()) {
        logger('server:webpackError')(stats.compilation.errors.toString())
    }
    logger('server:webpack')('Finished compiling')
})


/**
 * Writes a stats.json for the webpack bundle visualizer
 * URL: https://chrisbateman.github.io/webpack-visualizer/
 * @param stats
 */
function writeWebpackStats(stats) {
    const { resolve } = require('path')
    const location = resolve(config.output.path, 'stats.json')
    require('fs').writeFileSync(location, JSON.stringify(stats.toJson()))
    logger('server:webpack')(`Wrote stats.json to ${location}`)
}
