module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/, // Per i file con ext .js
                exclude: /node_modules/, // Esclusa la folder /node_modules
                use: {
                    loader: 'babel-loader', // Interprete Babel
                    options: {
                        presets: [
                            '@babel/preset-react', // Compatibilità dei .jsx
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime', // Extra funcs come async/await
                        ]
                    }
                }
            },
        ],
    }
}