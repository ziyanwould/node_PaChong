//不太常用
const fs = require("fs");
const path = require("path");
let files = [path.resolve(__dirname, '../package.json'), path.resolve(__dirname, '../jsconfig.json')];

function parseFile() {
    if (files.length == 0) {
        return;
    }
    let file = files.shift();
    fs.readFile(file, (err, data) => {
        if (err) console.log(err)
        else console.log(data)

        parseFile();
    })
}
//开始处理
parseFile();


// 通过递归的方式可以解决一些简单的异步回调问题。不过对于处理复杂的异步回调还是显得有些无能为力（如需要同步多个异步操作的结果）。
//不推荐