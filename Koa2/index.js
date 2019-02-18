const Koa = require('koa')
const app = new Koa()
const { connect } = require('../server/datadbs/init');
(async() => {
    await connect()
})()
app.use(async(ctx, next) => {
    ctx.body = 'Ziyanwould'
    ctx.type = 'text/html; charset=utf-8'

    console.log(ctx.url)

})

app.listen(3222)