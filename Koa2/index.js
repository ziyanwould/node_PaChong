const Koa = require('koa')
const app = new Koa()

app.use(async(ctx, next) => {
    ctx.body = 'Ziyanwould'
    ctx.type = 'text/html; charset=utf-8'

    console.log(ctx.url)
})

app.listen(3222)