//回调处理异步问题
const fs = require("fs");
const path = require("path");

function readFile(cb) {
    fs.readFile(path.resolve(__dirname, '../package.json'), (err, data) => {
        if (err) return cb(err)
        cb(null, data)
    })
}

readFile((err, data) => {
    if (!err) {
        data = JSON.parse(data)
        console.log(data.name)
    }

})