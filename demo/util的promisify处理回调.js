const fs = require("fs");
const util = require("util"); //node 里面自带的
const path = require("path");

util.promisify(fs.readFile)(path.resolve(__dirname, '../package.json'))
    .then(JSON.parse)
    .then(data => {
        console.log(data.name)
    })
    .catch(err => {
        console.log(err)
    })