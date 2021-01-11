const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

// Automatic Dependencies Sharing Management (you might not want it)
// and MANUALLY handle every dependency share
const packageJson = require('../package.json')

// Merge consente di mergiare due configs di webpack
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                // TODO manage url in env variable
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies,
        }),
    ]
}

module.exports = merge(commonConfig, devConfig)
