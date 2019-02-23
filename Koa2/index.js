const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const mongoose = require('mongoose')
const { connect, initSchemas } = require('../server/datadbs/init');
//const router = require('../server/routes');

(async() => {
    await connect()

    await initSchemas()

    // const Movie = mongoose.model('Movie')

    // const movies = await Movie.find({})

    // console.log('movies', movies)

    //require('../server/tasks/moves.js')初步获取数据
    // require('../server/tasks/api') 深度加工数据 数据更加详细
     require('../server/tasks/qiniu2.js') //爬到七牛

})()
const app = new Koa();

// app.use(router.routes());
// app.use(router.allowedMethods());

app.use(async(ctx, next) => {
    ctx.body = 'Ziyanwould'
    ctx.type = 'text/html; charset=utf-8'

    console.log(ctx.url)

})

app.listen(4399)