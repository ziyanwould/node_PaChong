const cp = require('child_process'); //子进程
const { resolve } = require('path');
const r = path => resolve(__dirname, path);

const mongoose = require('mongoose'); //存数据
const Movie = mongoose.model('Movie'); //存数据

(async() => {
    const script = r('../crawler/trailer-list.js')
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

    child.on('message', data => {
        let result = data.result
        console.log('result',result)

        result.forEach(async item => {
            let movie = await Movie.findOne({
                doubanId: item.doubanId
            })
            if (!movie) {
                console.log('item',item)
                movie = new Movie(item)
                await movie.save()
            }
        });

    })
})()

//子程序爬虫脚本