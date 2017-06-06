var webpack = require('webpack')

resolve: {
    modules: [
        "node_modules"
    ]
}

plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false,
        }
    })
]
