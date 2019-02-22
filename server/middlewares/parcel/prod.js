
const views = require('koa-views')
const server = require('koa-static')
const { resolve } = require('path')
const r = path => resolve(__dirname,path)



export const dev = async app =>{
   

    app.use(server(r('../../../dist')))
    app.use(views(r('../../../dist')),{
        extension:'html'
    })

    app.use(async (ctx) =>{
        await ctx.render('index.html')
    })
}
