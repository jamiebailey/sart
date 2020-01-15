const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: path.resolve('node_modules', 'iohook', 'builds'), to: path.resolve('dist', '[name].[ext]') }
        ])
    ],
    externals: [NodeExternals()],
    target: 'node'
};