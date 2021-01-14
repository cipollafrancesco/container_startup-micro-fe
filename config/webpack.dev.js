const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

// Automatic Dependencies Sharing Management (you might not want it)
// and MANUALLY handle every dependency share
const packageJson = require('../package.json')

// Merge consente di mergiare due configs di webpack
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')

const SERVER_PORT = 8080

const devConfig = {
    mode: 'development',
    devServer: {
        port: SERVER_PORT,
        historyApiFallback: true // with object doesn't work
    },
    output: {
        publicPath: `http://localhost:${SERVER_PORT}/`
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies,
        }),
    ]
}

module.exports = merge(commonConfig, devConfig)
