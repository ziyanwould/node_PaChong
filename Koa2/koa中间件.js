// const logger = require('koa-logger')
const logger = require('koa-logger');
const koa = require('koa');
const app = new koa();


let mid1 = async(ctx, next) => {
    ctx.body = 'hello'
    await next() //控制权下放，执行下面完了再回来执行别的
    ctx.body = `${ctx.body} 回到第一中间件`

}

let mid2 = async(ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    await next()
}

let mid3 = async(ctx, next) => {
    ctx.body = `${ctx.body} ziyanwould`
    await next()
}

app.use(logger())
app.use(mid1)
app.use(mid2)
app.use(mid3)
app.listen(3666)