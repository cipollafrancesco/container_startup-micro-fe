const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

// REMOTES PRODUCTION DOMAIN
const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
    mode: 'production',
    output: {
        // output template at build-time
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/' // base path in src fetch
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                // Assuming that the remoteEntry.js we'll be inside a /marketing folder
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies,
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig)
