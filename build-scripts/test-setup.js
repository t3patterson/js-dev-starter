// this file is not transpiled, must use commonjs

// Register babel to transpile BEFORE the tests run
var babelRegister = require('babel-register')
babelRegister()

// Disable webpack features that Mocha doesnt understand
require.extensions['.css'] = function(){}
