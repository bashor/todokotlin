// wrap is useful, because declaring variables in module can be already declared
// module creates own lexical environment
;(function (config) {
    // config.mode = 'development'
    // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    //
    // config.plugins = config.plugins || [];
    // config.plugins.push(new BundleAnalyzerPlugin());

    // config.optimization = Object.assign(config.optimization || {},
    //     {
    //         runtimeChunk: 'single',
    //         splitChunks: {
    //             cacheGroups: {
    //                 vendor: {
    //                     test: /[\\/]node_modules[\\/]/,
    //                     name: 'vendors',
    //                     chunks: 'all',
    //                 },
    //             },
    //         }
    //     }
    // );

    const shouldRunServer = config.mode !== "production"
    const serverTaskName = ":server:devServer"
    const serverUrl = 'http://localhost:8081'

    const path = require('path');

    // __dirname = $ROOT/build/js/packages/$PACKAGE_NAME
    // rootProject = $ROOT
    const rootProject = path.resolve(__dirname, '../../../../')
    require('child_process').exec(
        "./gradlew " + serverTaskName,
        {
            "cwd": rootProject
        },
        (err, stdout, stderr) => {
            if (err) {
                console.log("Cannot run " + serverTaskName + " server: " + err);
            }
        }
    )

    const dist = path.resolve(__dirname, rootProject + "/data/public");
    console.log("### dist " + dist)

    if (shouldRunServer) {
        console.log("Running " + serverTaskName + " in background...")

        config.devServer = {
            contentBase: dist,
            // proxy: {
            //     '/': {
            //         target: serverUrl,
            //         secure: false,
            //         bypass: function (req, res, proxyOptions) {
            //             if (req.headers.accept.indexOf('.js') !== -1) {
            //                 return req.headers.accept;
            //             }
            //         }
            //     }
            // }
        }
    }


    config.output = {
        filename: "todokotlin.js",
        path: dist,
        publicPath: ""
    }
})(config);