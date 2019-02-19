const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const mongoose = require('mongoose')
const { connect, initSchemas } = require('../server/datadbs/init');
(async() => {
    await connect()

    await initSchemas()

    // const Movie = mongoose.model('Movie')

    // const movies = await Movie.find({})

    // console.log('movies', movies)

    //require('../server/tasks/moves.js')初步获取数据
    require('../server/tasks/api')
})()
const app = new Koa()
app.use(async(ctx, next) => {
    ctx.body = 'Ziyanwould'
    ctx.type = 'text/html; charset=utf-8'

    console.log(ctx.url)

})

app.listen(3222)