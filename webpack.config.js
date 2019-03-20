const path = require("path")
module.exports = env => {
    const mode = env.NODE_ENV
    const outputFilename = {
        development: "flow-editor.js",
        production: "flow-editor.min.js",
    }
    return {
        mode,
        entry: "./src/index.js",
        output: {
            filename: outputFilename[mode],
            path: path.resolve(__dirname, "build"),
            library: "FlowEditor",
            libraryTarget: "umd",
        },
        devtool: "source-map",
    }
}
