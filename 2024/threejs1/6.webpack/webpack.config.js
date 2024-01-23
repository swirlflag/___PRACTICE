const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
            serveIndex: true,
        },
        compress: true, // 모든 항목에 대해 gzip압축 사용
        hot: true, // HRM(새로 고침 안해도 변경된 모듈 자동으로 적용)
        port: 9000, // 접속 포트 설정
    },
};
