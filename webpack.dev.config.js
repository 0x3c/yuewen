const path = require("path")

module.exports = {
    entry: ["babel-polyfill",path.join(__dirname, 'src/index.js')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
    },
    mode:"development",
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: path.join(__dirname, 'src')
            }
        ]
    }
}
