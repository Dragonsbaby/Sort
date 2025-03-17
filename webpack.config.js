const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },

    module: {

        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader','less-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: require.resolve('snapsvg/dist/snap.svg.js'),
                use: 'imports-loader?this=>window,fix=>module.exports=0',
            },
        ],
    },
    resolve: {
        alias: {
            snapsvg: 'snapsvg/dist/snap.svg.js',
        },
    },
    // optimization: {
    //     splitChunks: {chunks: "all"}
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ]
};
