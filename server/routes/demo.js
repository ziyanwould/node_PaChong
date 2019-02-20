//简单的koa2 API的demo  koa-router适合接口不是很多 处理机制比较复杂的接口
const Router = require('koa-router')
const mongoose = require('mongoose')
    // const Movie = mongoose.model('Movie') 防止初始化没有完毕 可以动态放在路由里面
const router = new Router()



//http://localhost:3222/movies/all
router.get('/movies/all', async(ctx, next) => {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({
        'meta.createdAt': -1
    })
    ctx.body = {
        movies
    }
})

//单条数据接口

//http://localhost:3222/movies/detail/5c6beab34c3b9c04c327ed69
router.get('/movies/detail/:id', async(ctx, next) => {
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id
    const movie = await Movie.findOne({ _id: id })

    ctx.body = {
        movie
    }

})

//router 可以使用中间件  用use  或者在里出入
//暴露出接口
module.exports = router