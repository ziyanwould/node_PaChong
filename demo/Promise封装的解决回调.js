const fs = require("fs");
const path = require("path");
// 封装一个new Promise的函数

function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//调用封装的函数
readFileAsync(path.resolve(__dirname, '../package.json'))
    .then(data => {
        data = JSON.parse(data)
        console.log(data.name)
    })
    .catch(err => {
        console.log(err)
    })



//过渡时期的做法