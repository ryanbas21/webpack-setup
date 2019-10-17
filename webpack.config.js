const webpack = require('webpack')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const Dotenv = require('dotenv-webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = env => ({
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: '/',
        historyApiFallback: true,
        compress: true,
        open: true,
        quiet: true,
        overlay: true,
        hot: true,
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        moduleIds: 'hashed',
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
            components: path.resolve(__dirname, 'src/components/'),
            features: path.resolve(__dirname, 'src/features/'),
            utils: path.resolve(__dirname, 'src/utils'),
        },
        plugins: [
            new DirectoryNamedWebpackPlugin({
                exclude: /node_modules/,
                include: [
                    path.resolve('./src/components'),
                    path.resolve('./src/features'),
                ],
            }),
        ],
    },
    mode:
        process.env.NODE_ENV === 'production'
            ? 'production'
            : process.env.NODE_ENV === 'analyze'
            ? 'production'
            : 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: {
                    loader: 'elm-webpack-loader',
                    options: {},
                },
            },
        ],
    },
    plugins: [
        new DashboardPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: './static/index.html' }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        process.env.NODE_ENV === 'analyze'
            ? new BundleAnalyzerPlugin()
            : a => a,
        new Dotenv(),
        new ManifestPlugin(),
        new OfflinePlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /index\.js|node_modules/,
            // include specific files based on a RegExp
            include: /src/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
    ],
})
