require('babel-register')({
    plugins: ['transform-decorators-legacy']
});
require("./装饰器.js")

//由于现有node还不支持装饰器 需要babel来转译