const cssnano = require('cssnano')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        cssnano({ preset: 'default' }),
        purgecss({
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
