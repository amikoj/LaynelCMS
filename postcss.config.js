module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-pxtorem': {
            onePxTransform: true,
            rootValue: 16,
            unitPrecision: 5,
            propList: ["*"],
            selectorBlackList: [/^\.html/], //排除html样式
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        }
    },
};
