const co = require('co');
const util = require('util');
const path = require('path');
const fs = require('fs');

co(function *(){
    let data =yield util.promisify(fs.readFile)
    (path.resolve(__dirname,'../package.json'))
   
    data = JSON.parse(data)
    console.log('data:', data.name);
    
})
