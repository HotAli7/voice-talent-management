const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: "development",
    context: path.resolve(__dirname, "assets"),
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, "assets/dist")
    },
    watch: true,
    plugins: [
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /(node_modules|bower_components)/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    /*MiniCssExtractPlugin.loader,*/
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, 'postcss.config.js'),
                            },
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['.js', '.vue', '.css']
    },
}