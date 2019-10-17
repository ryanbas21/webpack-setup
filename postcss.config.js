const path = require('path')
const cssnano = require('cssnano')
const purgecss = require('@fullhuman/postcss-purgecss')
const glob = require('glob')

const PATHS = {
    src: path.join(__dirname, 'src'),
}

module.exports = {
    plugins: [
        cssnano({ preset: 'default' }),
        purgecss({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            content: [
                './src/**/*.js',
                './static/**/*.js',
                './static/index.html',
            ],
            whitelist: ['html', 'body'],
        }),
        require('autoprefixer')(),
    ],
}
