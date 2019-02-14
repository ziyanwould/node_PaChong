const co = require('co')
const fetch = require('node-fetch')

co(function*() {
    const res = yield fetch('https://api.douban.com/v2/movie/1291843')
    const movie = yield res.json()
    const summary = movie.summary
    console.log('summary:', summary);

})

//co是使里面的代码逐步执行的 下面的run方法就是模拟co的执行

function run(generator) {
    const iterator = generator()
    const it = iterator.next()
    const promise = it.value

    promise.then(data => {
        const it2 = iterator.next(data)
        const promise2 = it2.value

        promise2.then(data2 => {
            iterator.next(data2)
        })
    })
}

//执行run
run(function*() {
    const res = yield fetch('https://api.douban.com/v2/movie/1291843') //格式参考api.json
    const movie = yield res.json()
    const summary = movie.summary
    console.log('run_summary:', summary);
})

const arrow = param => ({ param: 'param ' });

console.log('arrow:', arrow().param);