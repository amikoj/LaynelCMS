module.exports = {
    extensions: ['.css', '.scss'],
    inject: true,
    minimize: true,
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['last 2 versions']
        }),
        require('cssnano')({
            preset: 'default'
        }),
        require('tailwindcss')({
            verbose: true,
            config: './tailwind.config.js',
        })
    ]
}