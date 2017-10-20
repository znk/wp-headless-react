const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: './client/index.js',
    output: {
        path: __dirname + '/assets/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2', 'react', 'babili']
                }
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => ([
                                require('autoprefixer')({
                                    browsers: ['last 2 versions', 'ie > 8'],
                                }),
                            ])
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./assets/bundle.css", {allChunks: true})
    ]
};
