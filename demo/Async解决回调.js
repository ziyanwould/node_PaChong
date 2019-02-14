const { resolve } = require('path');
const r = path =>resolve(__dirname,path)
const util = require('util');
const fs = require('fs');
const readAsync = util.promisify(fs.readFile)

async function init() {
    let data = await readAsync(r('../package.json'))
    data = JSON.parse(data)
    console.log(data.name)
}
init()