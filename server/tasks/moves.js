const cp = require('child_process'); //子进程
const {
    resolve
} = require('path');
const r = path => resolve(__dirname, path);

(async () => {
    const script = r('../crawler/paC.js')
    const child = cp.fork(script, [])
    let invoked = true
    child.on('err', err => {
        if (invoked) return
        invoked = true
        console.log(err)
    })

    child.on('exit', code => {
        if (invoked) return
        invoked = false
        let err = code == 0 ? null : new Error('exit code' + code)
        console.log(err)
    })

    child.on('message',data =>{
        let result =  data.result
        console.log(result)
    })
})()

//子程序爬虫脚本