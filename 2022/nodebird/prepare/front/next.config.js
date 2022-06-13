
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})

module.exports = withBundleAnalyzer({
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === "production";
        const plugins = [...config.plugins];
        if(prod) {
            // plugins.push()
        }
        return {
            ...config,
            mode: prod ? "production" : "development",
            devtool: prod ? "hidden-source-map" : "eval",
            plugins,
            // module: {
            //     ...config.module,
            //     rules: [
            //         ...config.module.rules,
            //         {

            //         }
            //     ]
            // }
        }
    }
});